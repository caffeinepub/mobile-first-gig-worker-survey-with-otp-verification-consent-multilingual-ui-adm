import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useGetAllSurveys, useGetVerificationStats, useGetCompletionStats } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, CheckCircle, XCircle, TrendingUp, FileText } from 'lucide-react';
import ExportCsvButton from './ExportCsvButton';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const { t } = useLanguage();
  const { data: surveys = [], isLoading: surveysLoading } = useGetAllSurveys();
  const { data: verificationStats, isLoading: statsLoading } = useGetVerificationStats();
  const { data: completionStats, isLoading: completionLoading } = useGetCompletionStats();

  const isLoading = surveysLoading || statsLoading || completionLoading;

  const totalSubmissions = Number(completionStats?.total ?? surveys.length);
  const verifiedCount = Number(verificationStats?.verified ?? 0);
  const unverifiedCount = Number(verificationStats?.unverified ?? 0);
  const completionRate = completionStats?.rate
    ? Math.round(completionStats.rate * 100)
    : totalSubmissions > 0
    ? Math.round((verifiedCount / totalSubmissions) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Unorganised Worker Survey – Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Survey analytics and management
            </p>
          </div>
          <div className="flex gap-2">
            <ExportCsvButton />
            <Link to="/admin/otp-logs">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                OTP Logs
              </Button>
            </Link>
            <Link to="/admin/sms-outbox">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                SMS Outbox
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? '...' : totalSubmissions}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {isLoading ? '...' : verifiedCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unverified</CardTitle>
              <XCircle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {isLoading ? '...' : unverifiedCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? '...' : `${completionRate}%`}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Submissions */}
        {!isLoading && surveys.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {surveys.slice(-10).reverse().map((survey) => (
                  <div
                    key={survey.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground">{survey.id}</span>
                      <span className="text-foreground">{survey.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {survey.category}
                      </Badge>
                      <Badge
                        variant={survey.otpStatus === 'verified' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {survey.otpStatus}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {isLoading && (
          <div className="text-center py-12 text-muted-foreground">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}
