import { useLanguage } from '@/i18n/LanguageContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Info } from 'lucide-react';
import type { SurveyData } from '../types';

interface Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
}

export default function Step1WelcomeConsent({ data, updateData }: Props) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('step1.title')}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t('step1.purpose')}
        </p>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="consent"
            checked={data.consentGiven}
            onCheckedChange={(checked) => updateData({ consentGiven: checked as boolean })}
          />
          <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
            {t('step1.consentLabel')}
          </Label>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-primary">
              <Info className="h-4 w-4 mr-1" />
              {t('step1.viewPrivacy')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>{t('step1.privacyTitle')}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6 text-left">
                {/* Section 1: Free Worker Survey Participation */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t('step1.privacySection1Title')}
                  </h3>
                  <ol className="space-y-2 list-decimal list-inside text-sm text-muted-foreground">
                    <li>{t('step1.privacySection1Point1')}</li>
                    <li>{t('step1.privacySection1Point2')}</li>
                    <li>{t('step1.privacySection1Point3')}</li>
                    <li>{t('step1.privacySection1Point4')}</li>
                    <li>{t('step1.privacySection1Point5')}</li>
                    <li>{t('step1.privacySection1Point6')}</li>
                    <li>{t('step1.privacySection1Point7')}</li>
                    <li>{t('step1.privacySection1Point8')}</li>
                  </ol>
                  <p className="text-sm font-medium text-foreground pl-5">
                    ✔ {t('step1.privacySection1Point9')}
                  </p>
                </div>

                {/* Section 2: Optional Priority Token */}
                <div className="space-y-3 pt-4 border-t">
                  <h3 className="text-lg font-semibold text-foreground">
                    {t('step1.privacySection2Title')}
                  </h3>
                  <ol className="space-y-2 list-decimal list-inside text-sm text-muted-foreground">
                    <li>{t('step1.privacySection2Point1')}</li>
                    <li>{t('step1.privacySection2Point2')}</li>
                    <li>{t('step1.privacySection2Point3')}</li>
                    <li>{t('step1.privacySection2Point4')}</li>
                    <li>{t('step1.privacySection2Point5')}</li>
                    <li>{t('step1.privacySection2Point6')}</li>
                    <li>{t('step1.privacySection2Point7')}</li>
                    <li>{t('step1.privacySection2Point8')}</li>
                    <li>{t('step1.privacySection2Point9')}</li>
                  </ol>
                  <p className="text-sm font-medium text-foreground pl-5">
                    ✔ {t('step1.privacySection2Point10')}
                  </p>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {!data.consentGiven && (
        <p className="text-sm text-destructive">{t('step1.consentRequired')}</p>
      )}
    </div>
  );
}
