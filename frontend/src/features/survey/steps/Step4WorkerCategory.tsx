import React from 'react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SurveyData } from '../types';
import { primaryCategories, subCategoriesByPrimary, experienceGroups, workModes } from '../options';

interface Step4Props {
  data: SurveyData;
  onChange: (updates: Partial<SurveyData>) => void;
}

export default function Step4WorkerCategory({ data, onChange }: Step4Props) {
  const { t } = useLanguage();

  const currentSubCategories = data.primaryCategory
    ? (subCategoriesByPrimary[data.primaryCategory] || [])
    : [];

  const isSubCategoryOther = data.subCategory === 'Other (Specify)';

  const handlePrimaryCategoryChange = (value: string) => {
    onChange({ primaryCategory: value, subCategory: '', customSubCategory: '' });
  };

  const handleSubCategoryChange = (value: string) => {
    onChange({ subCategory: value, customSubCategory: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">{t('workerCategoryTitle')}</h2>
        <p className="text-muted-foreground text-sm mt-1">{t('workerCategorySubtitle')}</p>
      </div>

      {/* Primary Category */}
      <div className="space-y-2">
        <Label htmlFor="primaryCategory" className="font-medium">
          Primary Category <span className="text-destructive">*</span>
        </Label>
        <Select value={data.primaryCategory} onValueChange={handlePrimaryCategoryChange}>
          <SelectTrigger id="primaryCategory">
            <SelectValue placeholder="Select primary category" />
          </SelectTrigger>
          <SelectContent>
            {primaryCategories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sub-Category - only shown when primary category is selected */}
      {data.primaryCategory && currentSubCategories.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="subCategory" className="font-medium">
            Sub-Category <span className="text-destructive">*</span>
          </Label>
          <Select value={data.subCategory} onValueChange={handleSubCategoryChange}>
            <SelectTrigger id="subCategory">
              <SelectValue placeholder="Select sub-category" />
            </SelectTrigger>
            <SelectContent>
              {currentSubCategories.map((sub) => (
                <SelectItem key={sub} value={sub}>
                  {sub}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Custom sub-category input when "Other (Specify)" is selected */}
      {isSubCategoryOther && (
        <div className="space-y-2">
          <Label htmlFor="customSubCategory" className="font-medium">
            Please specify your sub-category <span className="text-destructive">*</span>
          </Label>
          <Input
            id="customSubCategory"
            value={data.customSubCategory}
            onChange={(e) => onChange({ customSubCategory: e.target.value })}
            placeholder="Enter your specific role or sub-category"
          />
        </div>
      )}

      {/* Years of Experience */}
      <div className="space-y-2">
        <Label htmlFor="experience" className="font-medium">
          {t('yearsOfExperience')} <span className="text-destructive">*</span>
        </Label>
        <Select
          value={data.yearsOfExperienceGroup}
          onValueChange={(value) => onChange({ yearsOfExperienceGroup: value })}
        >
          <SelectTrigger id="experience">
            <SelectValue placeholder={t('selectExperience')} />
          </SelectTrigger>
          <SelectContent>
            {experienceGroups.map((group) => (
              <SelectItem key={group.value} value={group.value}>
                {group.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Work Mode */}
      <div className="space-y-3">
        <Label className="font-medium">
          {t('workMode')} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={data.workMode}
          onValueChange={(value) => onChange({ workMode: value })}
          className="space-y-2"
        >
          {workModes.map((mode) => (
            <div key={mode.value} className="flex items-center space-x-2">
              <RadioGroupItem value={mode.value} id={`workMode-${mode.value}`} />
              <Label htmlFor={`workMode-${mode.value}`} className="cursor-pointer">
                {t(mode.labelKey)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
