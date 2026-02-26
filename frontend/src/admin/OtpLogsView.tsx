import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useGetOTPLogs } from '@/hooks/useQueries';
import { ArrowLeft, Search } from 'lucide-react';

export default function OtpLogsView() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [phoneFilter, setPhoneFilter] = useState('');
  const { data: logs } = useGetOTPLogs(phoneFilter || null);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/admin' })} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </Button>
        <h1 className="text-3xl font-bold">{t('admin.otpLogs')}</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="phoneFilter" className="sr-only">
                {t('admin.phoneFilter')}
              </Label>
              <Input
                id="phoneFilter"
                type="tel"
                value={phoneFilter}
                onChange={(e) => setPhoneFilter(e.target.value)}
                placeholder={t('admin.phonePlaceholder')}
              />
            </div>
            <Button variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('admin.otpLogs')}</CardTitle>
        </CardHeader>
        <CardContent>
          {logs && logs.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('step2.phoneLabel')}</TableHead>
                    <TableHead>{t('admin.timestamp')}</TableHead>
                    <TableHead>{t('admin.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{log.phoneNumber}</TableCell>
                      <TableCell>{new Date(Number(log.timestamp) / 1000000).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={log.success ? 'default' : 'destructive'}>
                          {log.success ? t('admin.success') : t('admin.failed')}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">{t('admin.noData')}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
