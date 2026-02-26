import React from 'react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { SurveyData } from '../types';
import { paymentModes, challengeOptions, primaryWorkLocationOptions } from '../options';

interface Step5Props {
  data: SurveyData;
  onChange: (updates: Partial<SurveyData>) => void;
}

const dailyIncomeRanges = [
  { value: 'below_300', label: 'Below ₹300' },
  { value: '300_500', label: '₹300 – ₹500' },
  { value: '500_800', label: '₹500 – ₹800' },
  { value: '800_1200', label: '₹800 – ₹1,200' },
  { value: 'above_1200', label: 'Above ₹1,200' },
];

const monthlyIncomeRanges = [
  { value: 'below_5000', label: 'Below ₹5,000' },
  { value: '5000_10000', label: '₹5,000 – ₹10,000' },
  { value: '10000_15000', label: '₹10,000 – ₹15,000' },
  { value: '15000_25000', label: '₹15,000 – ₹25,000' },
  { value: 'above_25000', label: 'Above ₹25,000' },
];

const insuranceTypes = [
  { value: 'health', label: 'Health Insurance' },
  { value: 'life', label: 'Life Insurance' },
  { value: 'accident', label: 'Accidental Insurance' },
  { value: 'esic', label: 'ESIC' },
  { value: 'other', label: 'Other' },
];

export default function Step5WorkIncome({ data, onChange }: Step5Props) {
  const { t } = useLanguage();

  const workingDaysNum = parseInt(data.workingDaysPerMonth, 10);
  const showLowDaysReason = !isNaN(workingDaysNum) && workingDaysNum < 20 && data.workingDaysPerMonth !== '';

  const isWorkLocationOther = data.primaryWorkLocation === 'Other (Specify)';

  const handleChallengeToggle = (value: string) => {
    const current = data.challenges || [];
    if (current.includes(value)) {
      onChange({ challenges: current.filter((c) => c !== value) });
    } else {
      onChange({ challenges: [...current, value] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">{t('workIncomeTitle')}</h2>
        <p className="text-muted-foreground text-sm mt-1">{t('workIncomeSubtitle')}</p>
      </div>

      {/* Working Days Per Month */}
      <div className="space-y-2">
        <Label htmlFor="workingDays" className="font-medium">
          {t('workingDaysPerMonth')} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="workingDays"
          type="number"
          min="0"
          max="31"
          value={data.workingDaysPerMonth}
          onChange={(e) => onChange({ workingDaysPerMonth: e.target.value })}
          placeholder="e.g. 22"
        />
      </div>

      {/* Conditional: Reason for less than 20 days */}
      {showLowDaysReason && (
        <div className="space-y-2">
          <Label htmlFor="lowDaysReason" className="font-medium">
            Reason for working less than 20 days <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <Textarea
            id="lowDaysReason"
            value={data.workingDaysLowReason}
            onChange={(e) => onChange({ workingDaysLowReason: e.target.value })}
            placeholder="Please describe why you work less than 20 days per month..."
            rows={3}
          />
        </div>
      )}

      {/* Working Hours Per Day */}
      <div className="space-y-2">
        <Label htmlFor="workingHours" className="font-medium">
          {t('workingHoursPerDay')} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="workingHours"
          type="number"
          min="1"
          max="24"
          value={data.workingHoursPerDay}
          onChange={(e) => onChange({ workingHoursPerDay: e.target.value })}
          placeholder="e.g. 8"
        />
      </div>

      {/* Where do you primarily work? */}
      <div className="space-y-3">
        <Label className="font-medium">
          Where do you primarily work? <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={data.primaryWorkLocation}
          onValueChange={(value) => onChange({ primaryWorkLocation: value, customPrimaryWorkLocation: '' })}
          className="space-y-2"
        >
          {primaryWorkLocationOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`workLocation-${option}`} />
              <Label htmlFor={`workLocation-${option}`} className="cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {isWorkLocationOther && (
          <Input
            value={data.customPrimaryWorkLocation}
            onChange={(e) => onChange({ customPrimaryWorkLocation: e.target.value })}
            placeholder="Please specify your primary work location"
            className="mt-2"
          />
        )}
      </div>

      {/* Mode of Payment */}
      <div className="space-y-2">
        <Label htmlFor="paymentMode" className="font-medium">
          {t('modeOfPayment')} <span className="text-destructive">*</span>
        </Label>
        <Select
          value={data.modeOfPayment}
          onValueChange={(value) => onChange({ modeOfPayment: value })}
        >
          <SelectTrigger id="paymentMode">
            <SelectValue placeholder={t('selectPaymentMode')} />
          </SelectTrigger>
          <SelectContent>
            {paymentModes.map((mode) => (
              <SelectItem key={mode.value} value={mode.value}>
                {t(mode.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Income - Daily or Monthly based on work mode */}
      {(data.workMode === 'daily_wage' || data.workMode === 'piece_rate') && (
        <div className="space-y-2">
          <Label htmlFor="dailyIncome" className="font-medium">
            {t('dailyIncomeRange')} <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.dailyIncome}
            onValueChange={(value) => onChange({ dailyIncome: value })}
          >
            <SelectTrigger id="dailyIncome">
              <SelectValue placeholder={t('selectIncomeRange')} />
            </SelectTrigger>
            <SelectContent>
              {dailyIncomeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {(data.workMode === 'monthly_salary' || data.workMode === 'contract' || data.workMode === 'self_employed') && (
        <div className="space-y-2">
          <Label htmlFor="monthlyIncome" className="font-medium">
            {t('monthlyIncomeRange')} <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.monthlyIncome}
            onValueChange={(value) => onChange({ monthlyIncome: value })}
          >
            <SelectTrigger id="monthlyIncome">
              <SelectValue placeholder={t('selectIncomeRange')} />
            </SelectTrigger>
            <SelectContent>
              {monthlyIncomeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Benefits */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="hasBenefits"
            checked={data.hasBenefits}
            onCheckedChange={(checked) => onChange({ hasBenefits: !!checked })}
          />
          <Label htmlFor="hasBenefits" className="font-medium cursor-pointer">
            {t('hasBenefits')}
          </Label>
        </div>

        {data.hasBenefits && (
          <div className="ml-6 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="employerName" className="font-medium">
                {t('employerName')}
              </Label>
              <Input
                id="employerName"
                value={data.employerName}
                onChange={(e) => onChange({ employerName: e.target.value })}
                placeholder={t('enterEmployerName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insuranceType" className="font-medium">
                {t('insuranceType')}
              </Label>
              <Select
                value={data.insuranceType}
                onValueChange={(value) => onChange({ insuranceType: value })}
              >
                <SelectTrigger id="insuranceType">
                  <SelectValue placeholder={t('selectInsuranceType')} />
                </SelectTrigger>
                <SelectContent>
                  {insuranceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Challenges */}
      <div className="space-y-3">
        <Label className="font-medium">{t('challenges')}</Label>
        <div className="space-y-2">
          {challengeOptions.map((challenge) => (
            <div key={challenge.value} className="flex items-center gap-2">
              <Checkbox
                id={`challenge-${challenge.value}`}
                checked={(data.challenges || []).includes(challenge.value)}
                onCheckedChange={() => handleChallengeToggle(challenge.value)}
              />
              <Label htmlFor={`challenge-${challenge.value}`} className="cursor-pointer">
                {t(challenge.labelKey)}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
