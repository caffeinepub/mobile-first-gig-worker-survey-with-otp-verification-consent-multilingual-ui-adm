import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useGenerateOTP, useVerifyOTP } from '@/hooks/useQueries';
import { CheckCircle2, AlertCircle, Loader2, Info } from 'lucide-react';
import type { SurveyData } from '../types';

interface Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

const RESEND_COOLDOWN = 60;

export default function Step2PhoneOtp({ data, updateData }: Props) {
  const { t } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber || '');
  const [otp, setOtp] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const [displayedOtp, setDisplayedOtp] = useState<string | null>(null);
  const [currentPhone, setCurrentPhone] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const generateMutation = useGenerateOTP();
  const verifyMutation = useVerifyOTP();

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Clear displayed OTP when phone number changes
  useEffect(() => {
    const normalized = normalizePhone(phoneNumber);
    if (normalized !== currentPhone) {
      setDisplayedOtp(null);
      setOtpRequested(false);
      setOtp('');
    }
  }, [phoneNumber, currentPhone]);

  const normalizePhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      return cleaned.slice(2);
    }
    return cleaned;
  };

  const isValidPhone = (phone: string): boolean => {
    const normalized = normalizePhone(phone);
    return normalized.length === 10;
  };

  const handleRequestOtp = async () => {
    if (!isValidPhone(phoneNumber)) {
      setMessage({ type: 'error', text: t('step2.invalidPhone') });
      return;
    }

    const normalized = normalizePhone(phoneNumber);
    setMessage(null);

    try {
      const generatedOtp = await generateMutation.mutateAsync(normalized);
      setOtpRequested(true);
      setDisplayedOtp(generatedOtp);
      setCurrentPhone(normalized);
      setCooldown(RESEND_COOLDOWN);
      updateData({ phoneNumber: normalized });
      setMessage({ type: 'success', text: t('step2.otpSent') });
    } catch (error: any) {
      const errorMsg = error.message?.includes('Rate limit') 
        ? t('step2.rateLimitError')
        : error.message || t('common.error');
      setMessage({ type: 'error', text: errorMsg });
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;

    setMessage(null);
    const surveyId = `survey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    try {
      const isValid = await verifyMutation.mutateAsync({
        phoneNumber: normalizePhone(phoneNumber),
        otp,
        surveyId,
      });

      if (isValid) {
        updateData({ otpVerified: true, phoneNumber: normalizePhone(phoneNumber) });
        setMessage({ type: 'success', text: t('step2.otpVerified') });
      } else {
        setMessage({ type: 'error', text: t('step2.otpFailed') });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || t('step2.otpFailed') });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('step2.title')}</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">{t('step2.phoneLabel')}</Label>
          <div className="flex gap-2">
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={t('step2.phonePlaceholder')}
              disabled={data.otpVerified}
              className="flex-1"
            />
            {!otpRequested && !data.otpVerified && (
              <Button
                onClick={handleRequestOtp}
                disabled={!isValidPhone(phoneNumber) || generateMutation.isPending}
              >
                {generateMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  t('step2.requestOtp')
                )}
              </Button>
            )}
          </div>
        </div>

        {otpRequested && !data.otpVerified && (
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            {displayedOtp && (
              <Alert className="border-blue-500/50 bg-blue-500/10">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="space-y-2">
                  <div className="text-blue-600 font-medium">
                    {t('step2.otpDisplayLabel')}
                  </div>
                  <div className="text-2xl font-mono font-bold text-blue-700 tracking-wider">
                    {displayedOtp}
                  </div>
                  <div className="text-sm text-blue-600/80">
                    {t('step2.otpDisplayNote')}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="otp">{t('step2.otpLabel')}</Label>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                onComplete={handleVerifyOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || verifyMutation.isPending}
                className="flex-1"
              >
                {verifyMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {t('step2.verify')}
              </Button>
              <Button
                variant="outline"
                onClick={handleRequestOtp}
                disabled={cooldown > 0 || generateMutation.isPending}
              >
                {cooldown > 0 ? `${cooldown}s` : t('common.resend')}
              </Button>
            </div>
          </div>
        )}

        {data.otpVerified && (
          <Alert className="border-green-500/50 bg-green-500/10">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              {t('step2.otpVerified')}
            </AlertDescription>
          </Alert>
        )}

        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
            {message.type === 'error' ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
