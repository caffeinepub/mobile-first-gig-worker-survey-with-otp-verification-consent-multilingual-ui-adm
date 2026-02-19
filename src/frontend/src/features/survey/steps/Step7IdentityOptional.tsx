import { useLanguage } from '@/i18n/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SurveyData } from '../types';

interface Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

export default function Step7IdentityOptional({ data, updateData }: Props) {
  const { t } = useLanguage();

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 12);
    updateData({ aadhaarNumber: value });
  };

  const formatAadhaar = (value: string) => {
    return value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('step7.title')}</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="aadhaarNumber">{t('step7.aadhaarNumber')}</Label>
          <Input
            id="aadhaarNumber"
            type="text"
            inputMode="numeric"
            maxLength={14}
            value={formatAadhaar(data.aadhaarNumber || '')}
            onChange={handleAadhaarChange}
            placeholder={t('step7.aadhaarPlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="alternativeId">{t('step7.alternativeId')} ({t('common.optional')})</Label>
          <Select value={data.alternativeIdType} onValueChange={(value) => updateData({ alternativeIdType: value })}>
            <SelectTrigger id="alternativeId">
              <SelectValue placeholder={t('step7.alternativeIdPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="voter">{t('step7.alternativeIdVoter')}</SelectItem>
              <SelectItem value="pan">{t('step7.alternativeIdPan')}</SelectItem>
              <SelectItem value="driving">{t('step7.alternativeIdDriving')}</SelectItem>
              <SelectItem value="ration">{t('step7.alternativeIdRation')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="idImage">{t('step7.uploadIdImage')} ({t('common.optional')})</Label>
          <Input
            id="idImage"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                updateData({ idImageFile: file });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
