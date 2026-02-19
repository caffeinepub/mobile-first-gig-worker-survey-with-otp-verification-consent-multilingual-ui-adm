import { ReactNode } from 'react';
import { useIsCallerAdmin } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import AccessDeniedScreen from '@/components/AccessDeniedScreen';
import { Loader2 } from 'lucide-react';

interface AdminRouteGuardProps {
  children: ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading } = useIsCallerAdmin();

  if (!identity) {
    return <AccessDeniedScreen />;
  }

  if (isLoading) {
    return (
      <div className="container max-w-md mx-auto px-4 py-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDeniedScreen />;
  }

  return <>{children}</>;
}
