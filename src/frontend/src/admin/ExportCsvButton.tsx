import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useExportSurveyData } from '../hooks/useQueries';
import { useLanguage } from '../i18n/LanguageContext';
import { Category } from '../backend';

export default function ExportCsvButton() {
  const { mutate: exportData, isPending } = useExportSurveyData();
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

  const handleExport = () => {
    exportData(undefined, {
      onSuccess: (surveys) => {
        const headers = [
          'Survey ID',
          'Category',
          'Phone Number',
          'Age',
          'Years of Experience',
          'Mode of Payment',
          'Employer Name',
          'Insurance Type',
          'Panchayat',
          'Block',
          'Serving City',
          'Serving Area',
          'Serving Panchayat',
          'Serving Pincode',
          'OTP Status',
          'Aadhaar Hash',
          'Timestamp',
        ];

        const rows = surveys.map((survey) => [
          survey.id,
          t(getCategoryTranslationKey(survey.category)),
          survey.phoneNumber,
          survey.age.toString(),
          survey.yearsOfExperienceGroup,
          survey.modeOfPayment,
          survey.employerName || '',
          survey.insuranceType || '',
          survey.panchayat,
          survey.block,
          survey.servingCity || '',
          survey.servingArea || '',
          survey.servingPanchayat || '',
          survey.servingPincode || '',
          survey.otpStatus,
          survey.aadhaarHash || '',
          new Date(Number(survey.timestamp) / 1000000).toISOString(),
        ]);

        const csvContent = [
          headers.join(','),
          ...rows.map((row) =>
            row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
          ),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `survey-data-${Date.now()}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    });
  };

  return (
    <Button onClick={handleExport} disabled={isPending} className="w-full">
      <Download className="mr-2 h-4 w-4" />
      {isPending ? 'Exporting...' : 'Export CSV'}
    </Button>
  );
}
