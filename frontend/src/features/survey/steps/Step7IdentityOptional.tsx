import { useLanguage } from '@/i18n/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import type { SurveyData } from '../types';

interface Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

export default function Step7IdentityOptional({ data, updateData }: Props) {
  const { t } = useLanguage();

  const formatAadhaar = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const parts = digits.match(/.{1,4}/g) || [];
    return parts.join(' ').substring(0, 14);
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value);
    updateData({ aadhaarNumber: formatted });
  };

  const handleVoterIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateData({ voterIdImageFile: file });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('step7.title')}</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="aadhaar">{t('step7.aadhaarLabel')}</Label>
          <Input
            id="aadhaar"
            value={data.aadhaarNumber}
            onChange={handleAadhaarChange}
            placeholder={t('step7.aadhaarPlaceholder')}
            maxLength={14}
          />
          <p className="text-xs text-muted-foreground">{t('step7.aadhaarNote')}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="alternativeId">{t('step7.alternativeId')}</Label>
          <Select
            value={data.alternativeIdType || ''}
            onValueChange={(value) => updateData({ alternativeIdType: value })}
          >
            <SelectTrigger id="alternativeId">
              <SelectValue placeholder={t('step7.selectIdType')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="voter">{t('step7.idVoter')}</SelectItem>
              <SelectItem value="pan">{t('step7.idPan')}</SelectItem>
              <SelectItem value="driving">{t('step7.idDriving')}</SelectItem>
              <SelectItem value="ration">{t('step7.idRation')}</SelectItem>
              <SelectItem value="other">{t('step7.idOther')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="voterIdImage">{t('step7.uploadVoterId')}</Label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('voterIdImage')?.click()}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {data.voterIdImageFile ? data.voterIdImageFile.name : t('step7.uploadButton')}
            </Button>
            <input
              id="voterIdImage"
              type="file"
              accept="image/*"
              onChange={handleVoterIdUpload}
              className="hidden"
            />
          </div>
          <p className="text-xs text-muted-foreground">{t('step7.voterIdNote')}</p>
        </div>

        {data.alternativeIdType && (
          <div className="space-y-2">
            <Label htmlFor="idImage">{t('step7.uploadId')}</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('idImage')?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                {data.idImageFile ? data.idImageFile.name : t('step7.uploadButton')}
              </Button>
              <input
                id="idImage"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) updateData({ idImageFile: file });
                }}
                className="hidden"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
