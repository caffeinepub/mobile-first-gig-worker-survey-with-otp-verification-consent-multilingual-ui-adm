import { useLanguage } from '@/i18n/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import LoginButton from '@/components/Auth/LoginButton';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { LayoutDashboard } from 'lucide-react';
import { useIsCallerAdmin } from '@/hooks/useQueries';

export default function Header() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { data: isAdmin } = useIsCallerAdmin();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/generated/logo.dim_512x512.png" 
            alt="Logo" 
            className="h-10 w-10 object-contain"
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-tight">{t('header.title')}</h1>
            <p className="text-xs text-muted-foreground">{t('header.subtitle')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: '/admin' })}
              className="hidden sm:flex"
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              {t('common.admin')}
            </Button>
          )}
          <LanguageSwitcher />
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
