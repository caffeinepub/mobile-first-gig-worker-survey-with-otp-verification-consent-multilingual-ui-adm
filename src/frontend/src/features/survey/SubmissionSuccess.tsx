import { useLanguage } from '@/i18n/LanguageContext';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, Printer } from 'lucide-react';

export default function SubmissionSuccess() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const search = useSearch({ from: '/success' }) as { id?: string };
  const surveyId = search.id || 'N/A';

  const handlePrint = () => {
    window.print();
  };

  const handleNewSurvey = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-16">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">{t('success.title')}</CardTitle>
          <CardDescription>{t('success.message')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{t('success.surveyId')}:</span>
              <span className="font-mono text-sm">{surveyId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{t('success.timestamp')}:</span>
              <span className="text-sm">{new Date().toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handlePrint} className="flex-1">
              <Printer className="h-4 w-4 mr-2" />
              {t('success.printAck')}
            </Button>
          </div>

          <Button onClick={handleNewSurvey} className="w-full">
            {t('success.newSurvey')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
