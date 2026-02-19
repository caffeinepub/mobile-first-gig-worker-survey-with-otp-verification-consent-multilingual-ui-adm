import { useLanguage } from '@/i18n/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import MultiSelect from '../components/MultiSelect';
import type { SurveyData } from '../types';

interface Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

const challengeOptions = [
  { value: 'lowIncome', labelKey: 'step5.challengeLowIncome' },
  { value: 'noStability', labelKey: 'step5.challengeNoStability' },
  { value: 'paymentDelays', labelKey: 'step5.challengePaymentDelays' },
  { value: 'healthRisks', labelKey: 'step5.challengeHealthRisks' },
  { value: 'noBenefits', labelKey: 'step5.challengeNoBenefits' },
];

export default function Step5WorkIncome({ data, updateData }: Props) {
  const { t } = useLanguage();

  const isDailyWage = data.workMode === 'dailyWage';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('step5.title')}</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="workingDays">{t('step5.workingDays')}</Label>
          <Input
            id="workingDays"
            type="number"
            inputMode="numeric"
            min="0"
            max="31"
            value={data.workingDaysPerMonth}
            onChange={(e) => updateData({ workingDaysPerMonth: e.target.value })}
            placeholder={t('step5.workingDaysPlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workingHours">{t('step5.workingHours')}</Label>
          <Input
            id="workingHours"
            type="number"
            inputMode="numeric"
            min="0"
            max="24"
            value={data.workingHoursPerDay}
            onChange={(e) => updateData({ workingHoursPerDay: e.target.value })}
            placeholder={t('step5.workingHoursPlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="modeOfPayment">{t('step5.modeOfPayment')}</Label>
          <Select value={data.modeOfPayment} onValueChange={(value) => updateData({ modeOfPayment: value })}>
            <SelectTrigger id="modeOfPayment">
              <SelectValue placeholder={t('step5.selectPaymentMode')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">{t('step5.paymentCash')}</SelectItem>
              <SelectItem value="bankTransfer">{t('step5.paymentBankTransfer')}</SelectItem>
              <SelectItem value="digitalWallet">{t('step5.paymentDigitalWallet')}</SelectItem>
              <SelectItem value="cheque">{t('step5.paymentCheque')}</SelectItem>
              <SelectItem value="other">{t('step5.paymentOther')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="incomeRange">
            {isDailyWage ? t('step5.incomeRangeDaily') : t('step5.incomeRange')}
          </Label>
          <Select value={data.incomeRange} onValueChange={(value) => updateData({ incomeRange: value })}>
            <SelectTrigger id="incomeRange">
              <SelectValue placeholder={isDailyWage ? t('step5.incomeRangeDaily') : t('step5.incomeRange')} />
            </SelectTrigger>
            <SelectContent>
              {isDailyWage ? (
                <>
                  <SelectItem value="200-500">{t('step5.incomeDaily200_500')}</SelectItem>
                  <SelectItem value="500-1000">{t('step5.incomeDaily500_1000')}</SelectItem>
                  <SelectItem value="1000-1500">{t('step5.incomeDaily1000_1500')}</SelectItem>
                  <SelectItem value="1500-2000">{t('step5.incomeDaily1500_2000')}</SelectItem>
                  <SelectItem value="2000+">{t('step5.incomeDaily2000Plus')}</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="below5k">{t('step5.incomeBelow5k')}</SelectItem>
                  <SelectItem value="5k-10k">{t('step5.income5k_10k')}</SelectItem>
                  <SelectItem value="10k-20k">{t('step5.income10k_20k')}</SelectItem>
                  <SelectItem value="20k-30k">{t('step5.income20k_30k')}</SelectItem>
                  <SelectItem value="above30k">{t('step5.incomeAbove30k')}</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>{t('step5.benefits')}</Label>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="payslip"
                  checked={data.receivesPayslip}
                  onCheckedChange={(checked) => {
                    updateData({ 
                      receivesPayslip: checked as boolean,
                      employerName: checked ? data.employerName : undefined
                    });
                  }}
                />
                <Label htmlFor="payslip" className="font-normal cursor-pointer">
                  {t('step5.benefitPayslip')}
                </Label>
              </div>
              {data.receivesPayslip && (
                <div className="ml-6 space-y-2">
                  <Label htmlFor="employerName">{t('step5.employerName')}</Label>
                  <Input
                    id="employerName"
                    value={data.employerName || ''}
                    onChange={(e) => updateData({ employerName: e.target.value })}
                    placeholder={t('step5.employerNamePlaceholder')}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="pfesi"
                checked={data.receivesPFESI}
                onCheckedChange={(checked) => updateData({ receivesPFESI: checked as boolean })}
              />
              <Label htmlFor="pfesi" className="font-normal cursor-pointer">
                {t('step5.benefitPFESI')}
              </Label>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="insurance"
                  checked={data.receivesInsurance}
                  onCheckedChange={(checked) => {
                    updateData({ 
                      receivesInsurance: checked as boolean,
                      insuranceType: checked ? data.insuranceType : undefined
                    });
                  }}
                />
                <Label htmlFor="insurance" className="font-normal cursor-pointer">
                  {t('step5.benefitInsurance')}
                </Label>
              </div>
              {data.receivesInsurance && (
                <div className="ml-6 space-y-2">
                  <Label htmlFor="insuranceType">{t('step5.insuranceType')}</Label>
                  <Select 
                    value={data.insuranceType || ''} 
                    onValueChange={(value) => updateData({ insuranceType: value })}
                  >
                    <SelectTrigger id="insuranceType">
                      <SelectValue placeholder={t('step5.selectInsuranceType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">{t('step5.insuranceHealth')}</SelectItem>
                      <SelectItem value="life">{t('step5.insuranceLife')}</SelectItem>
                      <SelectItem value="accident">{t('step5.insuranceAccident')}</SelectItem>
                      <SelectItem value="other">{t('step5.insuranceOther')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>{t('step5.challenges')}</Label>
          <MultiSelect
            options={challengeOptions.map(opt => ({ value: opt.value, label: t(opt.labelKey) }))}
            selected={data.challenges}
            onChange={(values) => updateData({ challenges: values })}
            placeholder={t('step5.challenges')}
          />
        </div>
      </div>
    </div>
  );
}
