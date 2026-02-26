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
      // Convert voter ID image to ExternalBlob if present
      let voterIdBlob: ExternalBlob | undefined;
      if (surveyData.voterIdImageFile) {
        const arrayBuffer = await surveyData.voterIdImageFile.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        voterIdBlob = ExternalBlob.fromBytes(bytes);
      }

      const category: Category = Category.banking;

      const aadhaarHash = surveyData.aadhaarNumber
        ? `masked_${surveyData.aadhaarNumber.replace(/\s/g, '').slice(-4)}`
        : undefined;

      const ageNum = parseInt(surveyData.age, 10) || 0;

      await submitMutation.mutateAsync({
        id: surveyId,
        category,
        phoneNumber: surveyData.phoneNumber,
        otp: surveyData.verifiedOtp || '',
        otpStatus: OTPStatus.verified,
        aadhaarHash,
        timestamp: BigInt(Date.now() * 1000000),
        age: BigInt(ageNum),
        yearsOfExperienceGroup: surveyData.yearsOfExperienceGroup,
        modeOfPayment: surveyData.modeOfPayment,
        employerName: surveyData.employerName || undefined,
        insuranceDetails: surveyData.insuranceDetails || undefined,
        panchayat: surveyData.panchayat,
        block: surveyData.block,
        servingCity: surveyData.servingCity || undefined,
        servingArea: surveyData.servingArea || undefined,
        servingPanchayat: surveyData.servingPanchayat || undefined,
        servingPincode: surveyData.servingPincode || undefined,
        educationLevel: surveyData.educationLevel,
        otherEducation: surveyData.otherEducation || undefined,
        monthlyIncome: surveyData.monthlyIncome || surveyData.dailyIncome || '',
        hourlyRate: surveyData.hourlyRate || '0',
        keepsMoneyInAccount: surveyData.keepsMoneyInAccount,
        lifeInsurance: surveyData.lifeInsurance ?? undefined,
        healthInsurance: surveyData.healthInsurance ?? undefined,
        accidentalInsurance: surveyData.accidentalInsurance ?? undefined,
        phoneType: surveyData.smartphoneType,
        usesSmartphone: surveyData.smartphoneType === 'android' || surveyData.smartphoneType === 'ios',
        ownsLaptop: surveyData.ownsLaptop,
        otherDevice: surveyData.otherDevice || 'None',
        ableToDoVideoCall: surveyData.ableToDoVideoCall,
        usesMobileData: surveyData.rechargeType === 'withInternet',
        internetConnection: surveyData.rechargeType || 'Unknown',
        remainingBalance: surveyData.rechargeAmount || '0',
        postpaidAccount: surveyData.postpaidAccount || 'None',
        averageDailyUsage: surveyData.averageDailyUsage || '0',
        usesBankApps: surveyData.usesBankApps,
        usesPaymentApps: surveyData.usesPaymentApps,
        hasTradingAccount: surveyData.hasTradingAccount,
        hasBusinessAccounts: surveyData.hasBusinessAccounts,
        followsRegulations: surveyData.followsRegulations,
        paidDuringCovid: surveyData.paidDuringCovid,
        speaksEnglish: surveyData.languagesSpoken.includes('english'),
        passport: surveyData.passport,
        overseasWork: surveyData.overseasWork,
        incomeTaxPayer: surveyData.incomeTaxPayer,
        pfEsi: surveyData.pfEsi || undefined,
        voterIdImage: voterIdBlob,
        servingState: surveyData.servingState || undefined,
        iosSmartphone: surveyData.smartphoneType === 'ios',
        rechargeType: surveyData.rechargeType || undefined,
        rechargeAmount: surveyData.rechargeAmount || undefined,
        ableToUseApp: surveyData.ableToUseApp ?? undefined,
        mostlyUsedApps: surveyData.mostlyUsedApps || undefined,
        ableToMail: surveyData.ableToMail ?? undefined,
        ableToPayThroughApp: surveyData.ableToPayThroughApp ?? undefined,
        overtimeMoney: surveyData.overtimeMoney || undefined,
        primaryWorkLocation: surveyData.primaryWorkLocation,
        workingDaysLowReason: surveyData.workingDaysLowReason,
        employerGivesAccommodation: surveyData.employerGivesAccommodation,
        insuranceType: surveyData.insuranceType || undefined,
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
        <p className="text-muted-foreground">{t('review.subtitle')}</p>
      </div>

      <Separator />

      {/* Phone Verification Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('review.phoneVerification')}</h3>
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
        <h3 className="text-lg font-semibold">{t('review.captchaLabel')}</h3>
        <div className="space-y-2">
          <Label htmlFor="captcha">
            {num1} + {num2} = ?
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
            <p className="text-sm text-destructive">Incorrect answer. Please try again.</p>
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
            t('review.submitButton')
          )}
        </Button>

        {!surveyData.otpVerified && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please verify your phone number before submitting.
            </AlertDescription>
          </Alert>
        )}

        {submitMutation.isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              An error occurred while submitting. Please try again.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
