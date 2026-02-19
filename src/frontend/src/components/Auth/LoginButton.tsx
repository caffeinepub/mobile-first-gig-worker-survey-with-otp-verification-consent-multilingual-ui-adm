import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import ProfileSetupModal from './ProfileSetupModal';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const buttonText = loginStatus === 'logging-in' 
    ? t('auth.loggingIn')
    : isAuthenticated 
    ? t('auth.logoutButton')
    : t('auth.loginButton');

  return (
    <>
      <Button
        onClick={handleAuth}
        disabled={disabled}
        variant={isAuthenticated ? 'outline' : 'default'}
        size="sm"
      >
        {buttonText}
      </Button>
      {isAuthenticated && <ProfileSetupModal />}
    </>
  );
}
