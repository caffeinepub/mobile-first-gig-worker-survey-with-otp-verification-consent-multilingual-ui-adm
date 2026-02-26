import { useLanguage } from '@/i18n/LanguageContext';
import { Heart } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t bg-card/50 py-6 mt-auto">
      <div className="container px-4">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            {t('footer.copyright')}
            <Heart className="h-3.5 w-3.5 fill-destructive text-destructive" />
            {t('footer.poweredBy')}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:underline"
            >
              {t('footer.caffeineLink')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
