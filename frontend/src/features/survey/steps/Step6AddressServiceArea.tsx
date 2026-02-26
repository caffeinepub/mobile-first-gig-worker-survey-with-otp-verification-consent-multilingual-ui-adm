import React from 'react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SurveyData } from '../types';
import { indianStates } from '../options';

interface Step6Props {
  data: SurveyData;
  onChange: (updates: Partial<SurveyData>) => void;
}

export default function Step6AddressServiceArea({ data, onChange }: Step6Props) {
  const { t } = useLanguage();

  const isDifferentServiceLocation = data.sameServiceLocation === 'no';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">{t('addressTitle')}</h2>
        <p className="text-muted-foreground text-sm mt-1">{t('addressSubtitle')}</p>
      </div>

      {/* Residential State */}
      <div className="space-y-2">
        <Label htmlFor="residentialState" className="font-medium">
          {t('residentialState')} <span className="text-destructive">*</span>
        </Label>
        <Select
          value={data.residentialState}
          onValueChange={(value) => onChange({ residentialState: value })}
        >
          <SelectTrigger id="residentialState">
            <SelectValue placeholder={t('selectState')} />
          </SelectTrigger>
          <SelectContent>
            {indianStates.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="city" className="font-medium">
          {t('city')} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="city"
          value={data.city}
          onChange={(e) => onChange({ city: e.target.value })}
          placeholder={t('enterCity')}
        />
      </div>

      {/* Pincode */}
      <div className="space-y-2">
        <Label htmlFor="pincode" className="font-medium">
          {t('pincode')}
        </Label>
        <Input
          id="pincode"
          value={data.pincode}
          onChange={(e) => onChange({ pincode: e.target.value })}
          placeholder={t('enterPincode')}
          maxLength={6}
        />
      </div>

      {/* Area */}
      <div className="space-y-2">
        <Label htmlFor="area" className="font-medium">
          {t('area')}
        </Label>
        <Input
          id="area"
          value={data.area}
          onChange={(e) => onChange({ area: e.target.value })}
          placeholder={t('enterArea')}
        />
      </div>

      {/* Panchayat */}
      <div className="space-y-2">
        <Label htmlFor="panchayat" className="font-medium">
          {t('panchayat')}
        </Label>
        <Input
          id="panchayat"
          value={data.panchayat}
          onChange={(e) => onChange({ panchayat: e.target.value })}
          placeholder={t('enterPanchayat')}
        />
      </div>

      {/* Block */}
      <div className="space-y-2">
        <Label htmlFor="block" className="font-medium">
          {t('block')}
        </Label>
        <Input
          id="block"
          value={data.block}
          onChange={(e) => onChange({ block: e.target.value })}
          placeholder={t('enterBlock')}
        />
      </div>

      {/* Same Service Location */}
      <div className="space-y-3">
        <Label className="font-medium">
          {t('sameServiceLocation')} <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={data.sameServiceLocation}
          onValueChange={(value) =>
            onChange({
              sameServiceLocation: value,
              servingState: '',
              servingCity: '',
              servingArea: '',
              servingPanchayat: '',
              servingPincode: '',
              employerGivesAccommodation: '',
            })
          }
          className="flex gap-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="sameLocation-yes" />
            <Label htmlFor="sameLocation-yes" className="cursor-pointer">
              {t('yes')}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="sameLocation-no" />
            <Label htmlFor="sameLocation-no" className="cursor-pointer">
              {t('no')}
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Service Location Fields - only when different */}
      {isDifferentServiceLocation && (
        <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
          <h3 className="font-semibold text-foreground">{t('serviceAreaDetails')}</h3>

          {/* Serving State */}
          <div className="space-y-2">
            <Label htmlFor="servingState" className="font-medium">
              {t('servingState')} <span className="text-destructive">*</span>
            </Label>
            <Select
              value={data.servingState}
              onValueChange={(value) => onChange({ servingState: value })}
            >
              <SelectTrigger id="servingState">
                <SelectValue placeholder={t('selectState')} />
              </SelectTrigger>
              <SelectContent>
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Serving City */}
          <div className="space-y-2">
            <Label htmlFor="servingCity" className="font-medium">
              {t('servingCity')}
            </Label>
            <Input
              id="servingCity"
              value={data.servingCity}
              onChange={(e) => onChange({ servingCity: e.target.value })}
              placeholder={t('enterCity')}
            />
          </div>

          {/* Serving Area */}
          <div className="space-y-2">
            <Label htmlFor="servingArea" className="font-medium">
              {t('servingArea')}
            </Label>
            <Input
              id="servingArea"
              value={data.servingArea}
              onChange={(e) => onChange({ servingArea: e.target.value })}
              placeholder={t('enterArea')}
            />
          </div>

          {/* Serving Panchayat */}
          <div className="space-y-2">
            <Label htmlFor="servingPanchayat" className="font-medium">
              {t('servingPanchayat')}
            </Label>
            <Input
              id="servingPanchayat"
              value={data.servingPanchayat}
              onChange={(e) => onChange({ servingPanchayat: e.target.value })}
              placeholder={t('enterPanchayat')}
            />
          </div>

          {/* Serving Pincode */}
          <div className="space-y-2">
            <Label htmlFor="servingPincode" className="font-medium">
              {t('servingPincode')}
            </Label>
            <Input
              id="servingPincode"
              value={data.servingPincode}
              onChange={(e) => onChange({ servingPincode: e.target.value })}
              placeholder={t('enterPincode')}
              maxLength={6}
            />
          </div>

          {/* Does employer provide free accommodation? */}
          <div className="space-y-3 pt-2 border-t border-border">
            <Label className="font-medium">
              Does employer provide free accommodation?
            </Label>
            <RadioGroup
              value={data.employerGivesAccommodation}
              onValueChange={(value) => onChange({ employerGivesAccommodation: value })}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="accommodation-yes" />
                <Label htmlFor="accommodation-yes" className="cursor-pointer">
                  {t('yes')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="accommodation-no" />
                <Label htmlFor="accommodation-no" className="cursor-pointer">
                  {t('no')}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      )}
    </div>
  );
}
