import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useSubmitSurvey } from '@/hooks/useQueries';
import { Loader2, AlertCircle } from 'lucide-react';
import { ExternalBlob, Category, OTPStatus } from '@/backend';
import type { SurveyData } from './types';
import PhoneOtpVerification from './components/PhoneOtpVerification';

interface Props {
  surveyData: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
  onSuccess: (surveyId: string) => void;
}

export default function SurveyReviewAndSubmit({ surveyData, updateData, onSuccess }: Props) {
  const { t } = useLanguage();
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);
  const [surveyId] = useState(`survey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const submitMutation = useSubmitSurvey();

  const num1 = 5;
  const num2 = 3;
  const correctAnswer = num1 + num2;

  const handlePhoneChange = (phone: string) => {
    updateData({ phoneNumber: phone });
  };

  const handleVerificationSuccess = (otp: string) => {
    updateData({ otpVerified: true, verifiedOtp: otp });
  };

  const handleSubmit = async () => {
    if (!surveyData.otpVerified) {
      return;
    }

    if (parseInt(captchaAnswer) !== correctAnswer) {
      setCaptchaError(true);
      return;
    }

    setCaptchaError(false);

    try {
      // Convert signature to ExternalBlob if present
      let signatureBlob: ExternalBlob | undefined;
      if (surveyData.signatureData) {
        const base64Data = surveyData.signatureData.split(',')[1];
        const binaryData = atob(base64Data);
        const bytes = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          bytes[i] = binaryData.charCodeAt(i);
        }
        signatureBlob = ExternalBlob.fromBytes(bytes);
      }

      // Map to backend Category enum (simplified mapping)
      const category: Category = Category.banking;

      // Create aadhaar hash (simplified - just mask for now)
      const aadhaarHash = surveyData.aadhaarNumber 
        ? `masked_${surveyData.aadhaarNumber.slice(-4)}`
        : undefined;

      await submitMutation.mutateAsync({
        id: surveyId,
        category,
        phoneNumber: surveyData.phoneNumber,
        otp: surveyData.verifiedOtp || '',
        otpStatus: OTPStatus.verified,
        aadhaarHash,
        digitalSignature: signatureBlob,
        timestamp: BigInt(Date.now() * 1000000),
        age: BigInt(surveyData.age),
        yearsOfExperienceGroup: surveyData.yearsOfExperienceGroup,
        modeOfPayment: surveyData.modeOfPayment,
        employerName: surveyData.employerName,
        insuranceType: surveyData.insuranceType,
        panchayat: surveyData.panchayat,
        block: surveyData.block,
        servingCity: surveyData.servingCity,
        servingArea: surveyData.servingArea,
        servingPanchayat: surveyData.servingPanchayat,
        servingPincode: surveyData.servingPincode,
      });

      onSuccess(surveyId);
    } catch (error: any) {
      console.error('Submit error:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('review.title')}</h2>
        <p className="text-muted-foreground">{t('review.verifyBeforeSubmit')}</p>
      </div>

      <Separator />

      {/* Phone Verification Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('review.phoneVerificationTitle')}</h3>
        <p className="text-sm text-muted-foreground">{t('review.phoneVerificationDesc')}</p>
        
        <PhoneOtpVerification
          phoneNumber={surveyData.phoneNumber}
          onPhoneChange={handlePhoneChange}
          otpVerified={surveyData.otpVerified}
          onVerificationSuccess={handleVerificationSuccess}
          surveyId={surveyId}
        />
      </div>

      <Separator />

      {/* CAPTCHA Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('review.captchaTitle')}</h3>
        <div className="space-y-2">
          <Label htmlFor="captcha">
            {t('review.captchaQuestion')} {num1} + {num2}?
          </Label>
          <Input
            id="captcha"
            type="number"
            inputMode="numeric"
            value={captchaAnswer}
            onChange={(e) => {
              setCaptchaAnswer(e.target.value);
              setCaptchaError(false);
            }}
            placeholder={t('review.captchaPlaceholder')}
            className={captchaError ? 'border-destructive' : ''}
          />
          {captchaError && (
            <p className="text-sm text-destructive">{t('review.captchaError')}</p>
          )}
        </div>
      </div>

      <Separator />

      {/* Submit Button */}
      <div className="space-y-4">
        <Button
          onClick={handleSubmit}
          disabled={!surveyData.otpVerified || submitMutation.isPending}
          className="w-full"
          size="lg"
        >
          {submitMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              {t('review.submitting')}
            </>
          ) : (
            t('common.submit')
          )}
        </Button>

        {!surveyData.otpVerified && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {t('review.verificationRequired')}
            </AlertDescription>
          </Alert>
        )}

        {submitMutation.isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {t('review.submitError')}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
