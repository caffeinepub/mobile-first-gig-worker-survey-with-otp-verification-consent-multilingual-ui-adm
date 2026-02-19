import React from 'react';
import { useGetCategoryAnalytics, useGetVerificationStats, useGetCompletionStats } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { FileText, MessageSquare, BarChart3 } from 'lucide-react';
import ExportCsvButton from './ExportCsvButton';
import { useLanguage } from '../i18n/LanguageContext';
import { Category } from '../backend';

export default function AdminDashboard() {
  const { data: categoryData, isLoading: categoryLoading } = useGetCategoryAnalytics();
  const { data: verificationStats, isLoading: verificationLoading } = useGetVerificationStats();
  const { data: completionStats, isLoading: completionLoading } = useGetCompletionStats();
  const { t } = useLanguage();

  const getCategoryTranslationKey = (category: Category): string => {
    switch (category) {
      case Category.banking:
        return 'categories.banking';
      case Category.insurance:
        return 'categories.insurance';
      case Category.aadhaar:
        return 'categories.aadhaar';
      default:
        return category;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Survey analytics and management</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completionLoading ? '...' : completionStats?.total.toString() || '0'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {verificationLoading ? '...' : verificationStats?.verified.toString() || '0'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unverified</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {verificationLoading ? '...' : verificationStats?.unverified.toString() || '0'}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completionLoading
                  ? '...'
                  : `${Math.round((completionStats?.rate || 0) * 100)}%`}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {categoryLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : (
              <div className="space-y-4">
                {categoryData?.map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="font-medium capitalize">
                      {t(getCategoryTranslationKey(category))}
                    </span>
                    <span className="text-2xl font-bold">{count.toString()}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                OTP Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View OTP verification attempts and success rates
              </p>
              <Link to="/admin/otp-logs">
                <Button variant="outline" className="w-full">
                  View Logs
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                SMS Outbox
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View SMS message payloads sent to users
              </p>
              <Link to="/admin/sms-outbox">
                <Button variant="outline" className="w-full">
                  View Messages
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Export Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Download all survey data as CSV
              </p>
              <ExportCsvButton />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
