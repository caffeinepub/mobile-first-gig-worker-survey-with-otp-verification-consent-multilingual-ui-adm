import { useLanguage } from '@/i18n/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { categories, subCategories } from '../options';
import type { SurveyData } from '../types';

interface Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

export default function Step4WorkerCategory({ data, updateData }: Props) {
  const { t } = useLanguage();

  const handleCategoryChange = (value: string) => {
    updateData({ primaryCategory: value, subCategory: '', customCategory: '' });
  };

  const availableSubCategories = data.primaryCategory ? subCategories[data.primaryCategory] || [] : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('step4.title')}</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="primaryCategory">{t('step4.primaryCategory')}</Label>
          <Select value={data.primaryCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger id="primaryCategory">
              <SelectValue placeholder={t('step4.selectCategory')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {t(cat.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {data.primaryCategory && data.primaryCategory !== 'others' && availableSubCategories.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="subCategory">{t('step4.subCategory')}</Label>
            <Select value={data.subCategory} onValueChange={(value) => updateData({ subCategory: value })}>
              <SelectTrigger id="subCategory">
                <SelectValue placeholder={t('step4.selectSubCategory')} />
              </SelectTrigger>
              <SelectContent>
                {availableSubCategories.map((sub) => (
                  <SelectItem key={sub.value} value={sub.value}>
                    {t(sub.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {data.primaryCategory === 'others' && (
          <div className="space-y-2">
            <Label htmlFor="customCategory">{t('step4.customCategory')}</Label>
            <Input
              id="customCategory"
              value={data.customCategory || ''}
              onChange={(e) => updateData({ customCategory: e.target.value, subCategory: 'custom' })}
              placeholder={t('step4.customCategoryPlaceholder')}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="yearsOfExperienceGroup">{t('step4.yearsExperience')}</Label>
          <Select value={data.yearsOfExperienceGroup} onValueChange={(value) => updateData({ yearsOfExperienceGroup: value })}>
            <SelectTrigger id="yearsOfExperienceGroup">
              <SelectValue placeholder={t('step4.selectExperience')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">{t('step4.experience1_5')}</SelectItem>
              <SelectItem value="6-8">{t('step4.experience6_8')}</SelectItem>
              <SelectItem value="9-10">{t('step4.experience9_10')}</SelectItem>
              <SelectItem value="11-15">{t('step4.experience11_15')}</SelectItem>
              <SelectItem value="16-20">{t('step4.experience16_20')}</SelectItem>
              <SelectItem value="20+">{t('step4.experience20Plus')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>{t('step4.workMode')}</Label>
          <RadioGroup value={data.workMode} onValueChange={(value) => updateData({ workMode: value })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="selfEmployed" id="selfEmployed" />
              <Label htmlFor="selfEmployed" className="font-normal cursor-pointer">
                {t('step4.workModeSelfEmployed')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="apps" id="apps" />
              <Label htmlFor="apps" className="font-normal cursor-pointer">
                {t('step4.workModeApps')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="contractor" id="contractor" />
              <Label htmlFor="contractor" className="font-normal cursor-pointer">
                {t('step4.workModeContractor')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dailyWage" id="dailyWage" />
              <Label htmlFor="dailyWage" className="font-normal cursor-pointer">
                {t('step4.workModeDailyWage')}
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
