import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Printer, RotateCcw } from 'lucide-react';

interface SubmissionSuccessProps {
  surveyId: string;
  phoneNumber: string;
  onNewSurvey: () => void;
}

export default function SubmissionSuccess({ surveyId, phoneNumber, onNewSurvey }: SubmissionSuccessProps) {
  const { t } = useLanguage();

  const timestamp = new Date().toLocaleString('en-IN', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            {t('success.title')}
          </h1>
          <p className="text-muted-foreground">
            Thank you for completing the <strong>Unorganised Worker Survey</strong>. Your response has been recorded successfully.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('success.surveyId')}</span>
              <span className="font-mono font-medium">{surveyId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{phoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('success.submittedAt')}</span>
              <span className="font-medium">{timestamp}</span>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground">
          An acknowledgement has been queued for <strong>Unorganised Worker Survey</strong>.
        </p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 flex items-center gap-2"
            onClick={() => window.print()}
          >
            <Printer className="h-4 w-4" />
            {t('success.acknowledgement')}
          </Button>
          <Button
            className="flex-1 flex items-center gap-2"
            onClick={onNewSurvey}
          >
            <RotateCcw className="h-4 w-4" />
            {t('success.newSurvey')}
          </Button>
        </div>
      </div>
    </div>
  );
}
