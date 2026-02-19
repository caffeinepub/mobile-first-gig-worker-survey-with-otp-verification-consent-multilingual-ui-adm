import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { LanguageProvider } from './i18n/LanguageContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import SurveyWizard from './features/survey/SurveyWizard';
import SubmissionSuccess from './features/survey/SubmissionSuccess';
import AdminDashboard from './admin/AdminDashboard';
import OtpLogsView from './admin/OtpLogsView';
import SmsOutboxView from './admin/SmsOutboxView';
import AdminRouteGuard from './admin/AdminRouteGuard';

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SurveyWizard,
});

const successRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/success',
  component: SubmissionSuccess,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <AdminRouteGuard>
      <AdminDashboard />
    </AdminRouteGuard>
  ),
});

const otpLogsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/otp-logs',
  component: () => (
    <AdminRouteGuard>
      <OtpLogsView />
    </AdminRouteGuard>
  ),
});

const smsOutboxRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/sms-outbox',
  component: () => (
    <AdminRouteGuard>
      <SmsOutboxView />
    </AdminRouteGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  successRoute,
  adminRoute,
  otpLogsRoute,
  smsOutboxRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </ThemeProvider>
  );
}
