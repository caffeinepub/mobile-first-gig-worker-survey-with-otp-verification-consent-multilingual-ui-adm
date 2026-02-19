import { useLanguage } from '@/i18n/LanguageContext';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import MultiSelect from '../components/MultiSelect';
import type { SurveyData } from '../types';

interface Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

const benefitOptions = [
  { value: 'higherIncome', labelKey: 'step9.benefitHigherIncome' },
  { value: 'regularWork', labelKey: 'step9.benefitRegularWork' },
  { value: 'insurance', labelKey: 'step9.benefitInsurance' },
  { value: 'skillTraining', labelKey: 'step9.benefitSkillTraining' },
];

export default function Step9AdditionalInputs({ data, updateData }: Props) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('step9.title')}</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <Label>{t('step9.smartphoneType')}</Label>
          <RadioGroup
            value={data.smartphoneType}
            onValueChange={(value) => updateData({ smartphoneType: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="android" id="android" />
              <Label htmlFor="android" className="font-normal cursor-pointer">
                {t('step9.smartphoneAndroid')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="feature" id="feature" />
              <Label htmlFor="feature" className="font-normal cursor-pointer">
                {t('step9.smartphoneFeature')}
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>{t('step9.internetAccess')}</Label>
          <RadioGroup
            value={data.internetAccess}
            onValueChange={(value) => updateData({ internetAccess: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily" className="font-normal cursor-pointer">
                {t('step9.internetDaily')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sometimes" id="sometimes" />
              <Label htmlFor="sometimes" className="font-normal cursor-pointer">
                {t('step9.internetSometimes')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rare" id="rare" />
              <Label htmlFor="rare" className="font-normal cursor-pointer">
                {t('step9.internetRare')}
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>{t('step9.willingnessApp')}</Label>
          <RadioGroup
            value={data.willingnessApp}
            onValueChange={(value) => updateData({ willingnessApp: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="willYes" />
              <Label htmlFor="willYes" className="font-normal cursor-pointer">
                {t('common.yes')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="willNo" />
              <Label htmlFor="willNo" className="font-normal cursor-pointer">
                {t('common.no')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="maybe" id="willMaybe" />
              <Label htmlFor="willMaybe" className="font-normal cursor-pointer">
                {t('common.maybe')}
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>{t('step9.expectedBenefits')}</Label>
          <MultiSelect
            options={benefitOptions.map(opt => ({ value: opt.value, label: t(opt.labelKey) }))}
            selected={data.expectedBenefits}
            onChange={(values) => updateData({ expectedBenefits: values })}
            placeholder={t('step9.expectedBenefits')}
          />
        </div>

        <div className="space-y-3">
          <Label>{t('step9.futureOnboarding')}</Label>
          <RadioGroup
            value={data.futureOnboarding ? 'yes' : 'no'}
            onValueChange={(value) => updateData({ futureOnboarding: value === 'yes' })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="onboardYes" />
              <Label htmlFor="onboardYes" className="font-normal cursor-pointer">
                {t('common.yes')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="onboardNo" />
              <Label htmlFor="onboardNo" className="font-normal cursor-pointer">
                {t('common.no')}
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
