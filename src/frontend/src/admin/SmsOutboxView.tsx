import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useGetSMSPayloads } from '@/hooks/useQueries';
import { ArrowLeft, Search } from 'lucide-react';

export default function SmsOutboxView() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [phoneFilter, setPhoneFilter] = useState('');
  const { data: payloads } = useGetSMSPayloads(phoneFilter || null);

  const sortedPayloads = payloads ? [...payloads].sort((a, b) => Number(b.timestamp - a.timestamp)) : [];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate({ to: '/admin' })} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.back')}
        </Button>
        <h1 className="text-3xl font-bold">{t('admin.smsOutbox')}</h1>
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
          <CardTitle>{t('admin.smsOutbox')}</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedPayloads.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('step2.phoneLabel')}</TableHead>
                    <TableHead>{t('admin.messageType')}</TableHead>
                    <TableHead>{t('admin.message')}</TableHead>
                    <TableHead>{t('admin.timestamp')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPayloads.map((payload, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{payload.phoneNumber}</TableCell>
                      <TableCell>
                        <Badge variant={payload.messageType === 'otp' ? 'default' : 'secondary'}>
                          {payload.messageType}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{payload.message}</TableCell>
                      <TableCell>{new Date(Number(payload.timestamp) / 1000000).toLocaleString()}</TableCell>
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
