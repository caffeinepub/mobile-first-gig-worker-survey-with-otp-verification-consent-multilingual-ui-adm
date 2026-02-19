import { useState, useEffect } from 'react';
import { useGetCallerUserProfile, useSaveCallerUserProfile } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useLanguage } from '@/i18n/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ProfileSetupModal() {
  const { identity } = useInternetIdentity();
  const { t } = useLanguage();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const saveMutation = useSaveCallerUserProfile();
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    setOpen(showProfileSetup);
  }, [showProfileSetup]);

  const handleSave = async () => {
    if (!name.trim()) return;
    
    try {
      await saveMutation.mutateAsync({ name: name.trim() });
      setOpen(false);
      setName('');
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{t('auth.profileSetup')}</DialogTitle>
          <DialogDescription>{t('auth.enterName')}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('step3.fullName')}</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('auth.namePlaceholder')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && name.trim()) {
                  handleSave();
                }
              }}
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={!name.trim() || saveMutation.isPending}
            className="w-full"
          >
            {saveMutation.isPending ? t('common.loading') : t('auth.saveProfile')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
