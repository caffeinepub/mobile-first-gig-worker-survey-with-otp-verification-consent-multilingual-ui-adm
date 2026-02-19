import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function AccessDeniedScreen() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle>{t('admin.accessDenied')}</CardTitle>
          <CardDescription>{t('admin.accessDeniedMessage')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate({ to: '/' })} className="w-full">
            {t('admin.backToSurvey')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
