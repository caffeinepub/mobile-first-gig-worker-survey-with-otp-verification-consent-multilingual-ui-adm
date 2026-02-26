import { useLanguage } from '@/i18n/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import MultiSelect from '../components/MultiSelect';
import type { SurveyData } from '../types';

interface Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

export default function Step8AdditionalInputs({ data, updateData }: Props) {
  const { t } = useLanguage();

  const benefitOptions = [
    { value: 'fairWages', labelKey: 'step9.benefitFairWages' },
    { value: 'timely', labelKey: 'step9.benefitTimely' },
    { value: 'insurance', labelKey: 'step9.benefitInsurance' },
    { value: 'training', labelKey: 'step9.benefitTraining' },
    { value: 'flexibility', labelKey: 'step9.benefitFlexibility' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('step9.title')}</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>{t('step9.smartphoneType')}</Label>
          <RadioGroup
            value={data.smartphoneType}
            onValueChange={(value) => updateData({ smartphoneType: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="android" id="phone-android" />
              <Label htmlFor="phone-android" className="font-normal cursor-pointer">
                {t('step9.smartphoneYes')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ios" id="phone-ios" />
              <Label htmlFor="phone-ios" className="font-normal cursor-pointer">
                {t('step9.smartphoneYesIos')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="basic" id="phone-basic" />
              <Label htmlFor="phone-basic" className="font-normal cursor-pointer">
                {t('step9.smartphoneBasic')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="phone-none" />
              <Label htmlFor="phone-none" className="font-normal cursor-pointer">
                {t('step9.smartphoneNo')}
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rechargeType">{t('step9.rechargeType')}</Label>
          <Select
            value={data.rechargeType || ''}
            onValueChange={(value) => updateData({ rechargeType: value })}
          >
            <SelectTrigger id="rechargeType">
              <SelectValue placeholder={t('step9.selectRechargeType')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="callingOnly">{t('step9.rechargeCallingOnly')}</SelectItem>
              <SelectItem value="withInternet">{t('step9.rechargeWithInternet')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rechargeAmount">{t('step9.rechargeAmount')}</Label>
          <Input
            id="rechargeAmount"
            value={data.rechargeAmount || ''}
            onChange={(e) => updateData({ rechargeAmount: e.target.value })}
            placeholder={t('step9.rechargeAmountPlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <Label>{t('step9.ableToUseApp')}</Label>
          <RadioGroup
            value={data.ableToUseApp === true ? 'yes' : data.ableToUseApp === false ? 'no' : ''}
            onValueChange={(value) => {
              const boolValue = value === 'yes';
              updateData({
                ableToUseApp: boolValue,
                mostlyUsedApps: boolValue ? data.mostlyUsedApps : '',
                ableToMail: boolValue ? data.ableToMail : null,
                ableToPayThroughApp: boolValue ? data.ableToPayThroughApp : null,
              });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="app-yes" />
              <Label htmlFor="app-yes" className="font-normal cursor-pointer">
                {t('step9.willingnessYes')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="app-no" />
              <Label htmlFor="app-no" className="font-normal cursor-pointer">
                {t('step9.willingnessNo')}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {data.ableToUseApp === true && (
          <div className="ml-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mostlyUsedApps">{t('step9.mostlyUsedApps')}</Label>
              <Input
                id="mostlyUsedApps"
                value={data.mostlyUsedApps || ''}
                onChange={(e) => updateData({ mostlyUsedApps: e.target.value })}
                placeholder={t('step9.mostlyUsedAppsPlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label>{t('step9.ableToMail')}</Label>
              <RadioGroup
                value={data.ableToMail === true ? 'yes' : data.ableToMail === false ? 'no' : ''}
                onValueChange={(value) => updateData({ ableToMail: value === 'yes' })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="mail-yes" />
                  <Label htmlFor="mail-yes" className="font-normal cursor-pointer">
                    {t('common.yes')}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="mail-no" />
                  <Label htmlFor="mail-no" className="font-normal cursor-pointer">
                    {t('common.no')}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>{t('step9.ableToPayThroughApp')}</Label>
              <RadioGroup
                value={data.ableToPayThroughApp === true ? 'yes' : data.ableToPayThroughApp === false ? 'no' : ''}
                onValueChange={(value) => updateData({ ableToPayThroughApp: value === 'yes' })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="pay-yes" />
                  <Label htmlFor="pay-yes" className="font-normal cursor-pointer">
                    {t('common.yes')}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="pay-no" />
                  <Label htmlFor="pay-no" className="font-normal cursor-pointer">
                    {t('common.no')}
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>{t('step9.expectedBenefits')}</Label>
          <MultiSelect
            options={benefitOptions.map((opt) => ({ value: opt.value, label: t(opt.labelKey) }))}
            selected={data.expectedBenefits}
            onChange={(values) => updateData({ expectedBenefits: values })}
            placeholder={t('step9.expectedBenefits')}
          />
        </div>

        <div className="space-y-2">
          <Label>{t('step9.futureOnboarding')}</Label>
          <RadioGroup
            value={data.futureOnboarding ? 'yes' : 'no'}
            onValueChange={(value) => updateData({ futureOnboarding: value === 'yes' })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="onboard-yes" />
              <Label htmlFor="onboard-yes" className="font-normal cursor-pointer">
                {t('common.yes')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="onboard-no" />
              <Label htmlFor="onboard-no" className="font-normal cursor-pointer">
                {t('common.no')}
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
