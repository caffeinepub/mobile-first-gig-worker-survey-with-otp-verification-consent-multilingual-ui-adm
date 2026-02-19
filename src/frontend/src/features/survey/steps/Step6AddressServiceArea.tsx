import { useLanguage } from '@/i18n/LanguageContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { indianStates } from '../options';
import type { SurveyData } from '../types';

interface Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

export default function Step6AddressServiceArea({ data, updateData }: Props) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('step6.title')}</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-3">{t('step6.residentialAddress')}</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="state">{t('step6.state')}</Label>
              <Select value={data.state} onValueChange={(value) => updateData({ state: value })}>
                <SelectTrigger id="state">
                  <SelectValue placeholder={t('step6.statePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {t(state.labelKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">{t('step6.city')}</Label>
              <Input
                id="city"
                value={data.city}
                onChange={(e) => updateData({ city: e.target.value })}
                placeholder={t('step6.cityPlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">{t('step6.pincode')}</Label>
              <Input
                id="pincode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={data.pincode}
                onChange={(e) => updateData({ pincode: e.target.value })}
                placeholder={t('step6.pincodePlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">{t('step6.area')}</Label>
              <Input
                id="area"
                value={data.area}
                onChange={(e) => updateData({ area: e.target.value })}
                placeholder={t('step6.areaPlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="panchayat">{t('step6.panchayat')}</Label>
              <Input
                id="panchayat"
                value={data.panchayat}
                onChange={(e) => updateData({ panchayat: e.target.value })}
                placeholder={t('step6.panchayatPlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="block">{t('step6.block')}</Label>
              <Input
                id="block"
                value={data.block}
                onChange={(e) => updateData({ block: e.target.value })}
                placeholder={t('step6.blockPlaceholder')}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label>{t('step6.serviceAreaSame')}</Label>
          <RadioGroup
            value={data.serviceAreaSame ? 'yes' : 'no'}
            onValueChange={(value) => updateData({ serviceAreaSame: value === 'yes' })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="serviceYes" />
              <Label htmlFor="serviceYes" className="font-normal cursor-pointer">
                {t('common.yes')}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="serviceNo" />
              <Label htmlFor="serviceNo" className="font-normal cursor-pointer">
                {t('common.no')}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {!data.serviceAreaSame && (
          <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="servingCity">{t('step6.servingCity')}</Label>
              <Input
                id="servingCity"
                value={data.servingCity || ''}
                onChange={(e) => updateData({ servingCity: e.target.value })}
                placeholder={t('step6.servingCityPlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="servingArea">{t('step6.servingArea')}</Label>
              <Input
                id="servingArea"
                value={data.servingArea || ''}
                onChange={(e) => updateData({ servingArea: e.target.value })}
                placeholder={t('step6.servingAreaPlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="servingPanchayat">{t('step6.servingPanchayat')}</Label>
              <Input
                id="servingPanchayat"
                value={data.servingPanchayat || ''}
                onChange={(e) => updateData({ servingPanchayat: e.target.value })}
                placeholder={t('step6.servingPanchayatPlaceholder')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="servingPincode">{t('step6.servingPincode')}</Label>
              <Input
                id="servingPincode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={data.servingPincode || ''}
                onChange={(e) => updateData({ servingPincode: e.target.value })}
                placeholder={t('step6.servingPincodePlaceholder')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
