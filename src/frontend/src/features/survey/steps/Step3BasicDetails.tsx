import { useLanguage } from '@/i18n/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languages } from '../options';
import MultiSelect from '../components/MultiSelect';
import type { SurveyData } from '../types';

interface Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

export default function Step3BasicDetails({ data, updateData }: Props) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('step3.title')}</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t('step3.fullName')}</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            placeholder={t('step3.fullNamePlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">{t('step3.gender')} ({t('common.optional')})</Label>
          <Select value={data.gender} onValueChange={(value) => updateData({ gender: value })}>
            <SelectTrigger id="gender">
              <SelectValue placeholder={t('step3.gender')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{t('step3.genderMale')}</SelectItem>
              <SelectItem value="female">{t('step3.genderFemale')}</SelectItem>
              <SelectItem value="other">{t('step3.genderOther')}</SelectItem>
              <SelectItem value="preferNot">{t('step3.genderPreferNot')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">{t('step3.age')}</Label>
          <Input
            id="age"
            type="number"
            inputMode="numeric"
            min="18"
            max="100"
            value={data.age || ''}
            onChange={(e) => updateData({ age: parseInt(e.target.value) || 0 })}
            placeholder={t('step3.agePlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="education">{t('step3.education')}</Label>
          <Select value={data.educationLevel} onValueChange={(value) => updateData({ educationLevel: value })}>
            <SelectTrigger id="education">
              <SelectValue placeholder={t('step3.education')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">{t('step3.educationNone')}</SelectItem>
              <SelectItem value="school">{t('step3.educationSchool')}</SelectItem>
              <SelectItem value="diploma">{t('step3.educationDiploma')}</SelectItem>
              <SelectItem value="graduate">{t('step3.educationGraduate')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{t('step3.languages')}</Label>
          <MultiSelect
            options={languages.map(lang => ({ value: lang.value, label: t(lang.labelKey) }))}
            selected={data.languagesSpoken}
            onChange={(values) => updateData({ languagesSpoken: values })}
            placeholder={t('step3.selectLanguages')}
          />
        </div>
      </div>
    </div>
  );
}
