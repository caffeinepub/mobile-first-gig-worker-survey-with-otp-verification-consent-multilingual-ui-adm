import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import LanguageSwitcher from '../LanguageSwitcher';
import LoginButton from '../Auth/LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import { Link } from '@tanstack/react-router';
import { LayoutDashboard } from 'lucide-react';

export default function Header() {
  const { t } = useLanguage();
  const { identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="/assets/generated/logo.dim_512x512.png"
            alt="Logo"
            className="h-9 w-9 rounded-full object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <h1 className="text-base font-bold text-foreground leading-tight truncate">
              Unorganised Worker Survey
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {t('header.subtitle')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {identity && isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-muted"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">{t('common.admin')}</span>
            </Link>
          )}
          <LanguageSwitcher />
          <LoginButton />
        </div>
      </div>
    </header>
  );
}
