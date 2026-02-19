import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type SurveyData, initialSurveyData } from './types';
import { useDraftSurvey } from './draft/useDraftSurvey';
import ResumeDraftDialog from './ResumeDraftDialog';
import ProgressIndicator from './components/ProgressIndicator';
import Step1WelcomeConsent from './steps/Step1WelcomeConsent';
import Step2PhoneDeferredNotice from './steps/Step2PhoneDeferredNotice';
import Step3BasicDetails from './steps/Step3BasicDetails';
import Step4WorkerCategory from './steps/Step4WorkerCategory';
import Step5WorkIncome from './steps/Step5WorkIncome';
import Step6AddressServiceArea from './steps/Step6AddressServiceArea';
import Step7IdentityOptional from './steps/Step7IdentityOptional';
import Step8Signature from './steps/Step8Signature';
import Step9AdditionalInputs from './steps/Step9AdditionalInputs';
import SurveyReviewAndSubmit from './SurveyReviewAndSubmit';

const TOTAL_STEPS = 9;

export default function SurveyWizard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData>(initialSurveyData);
  const [showReview, setShowReview] = useState(false);
  
  const { saveDraft, loadDraft, clearDraft, hasDraft } = useDraftSurvey();
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    if (hasDraft()) {
      setShowResume(true);
    }
  }, []);

  const handleResume = () => {
    const draft = loadDraft();
    if (draft) {
      setSurveyData(draft.data);
      setCurrentStep(draft.step);
    }
    setShowResume(false);
  };

  const handleStartOver = () => {
    clearDraft();
    setShowResume(false);
  };

  const updateData = (updates: Partial<SurveyData>) => {
    setSurveyData((prev) => ({ ...prev, ...updates }));
  };

  const canContinue = (): boolean => {
    switch (currentStep) {
      case 1:
        return surveyData.consentGiven;
      case 2:
        return true; // No longer requires OTP verification at this step
      case 3:
        return !!(surveyData.fullName && surveyData.age > 0 && surveyData.educationLevel);
      case 4:
        return !!(
          surveyData.primaryCategory &&
          surveyData.subCategory &&
          surveyData.yearsOfExperienceGroup &&
          surveyData.workMode &&
          (surveyData.primaryCategory !== 'others' || surveyData.customCategory)
        );
      case 5:
        return !!(
          surveyData.workingDaysPerMonth &&
          surveyData.workingHoursPerDay &&
          surveyData.modeOfPayment &&
          surveyData.incomeRange
        );
      case 6:
        return !!(
          surveyData.state &&
          surveyData.city &&
          surveyData.pincode &&
          surveyData.area &&
          surveyData.panchayat &&
          surveyData.block &&
          (surveyData.serviceAreaSame || (surveyData.servingCity && surveyData.servingArea && surveyData.servingPanchayat && surveyData.servingPincode))
        );
      case 7:
        return !!surveyData.aadhaarNumber;
      case 8:
        return !!surveyData.signatureData;
      case 9:
        return !!(
          surveyData.smartphoneType &&
          surveyData.internetAccess &&
          surveyData.willingnessApp
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!canContinue()) return;
    
    if (currentStep < TOTAL_STEPS) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      saveDraft({ step: nextStep, data: surveyData });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowReview(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (showReview) {
      setShowReview(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitSuccess = (surveyId: string) => {
    clearDraft();
    navigate({ to: '/success', search: { id: surveyId } });
  };

  const renderStep = () => {
    if (showReview) {
      return (
        <SurveyReviewAndSubmit
          surveyData={surveyData}
          updateData={updateData}
          onSuccess={handleSubmitSuccess}
        />
      );
    }

    switch (currentStep) {
      case 1:
        return <Step1WelcomeConsent data={surveyData} updateData={updateData} />;
      case 2:
        return <Step2PhoneDeferredNotice data={surveyData} updateData={updateData} />;
      case 3:
        return <Step3BasicDetails data={surveyData} updateData={updateData} />;
      case 4:
        return <Step4WorkerCategory data={surveyData} updateData={updateData} />;
      case 5:
        return <Step5WorkIncome data={surveyData} updateData={updateData} />;
      case 6:
        return <Step6AddressServiceArea data={surveyData} updateData={updateData} />;
      case 7:
        return <Step7IdentityOptional data={surveyData} updateData={updateData} />;
      case 8:
        return <Step8Signature data={surveyData} updateData={updateData} />;
      case 9:
        return <Step9AdditionalInputs data={surveyData} updateData={updateData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <ResumeDraftDialog
        open={showResume}
        onResume={handleResume}
        onStartOver={handleStartOver}
      />
      
      <div 
        className="min-h-[calc(100vh-8rem)] py-8 px-4"
        style={{
          backgroundImage: 'url(/assets/generated/pattern.dim_1600x1600.png)',
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="container max-w-2xl mx-auto">
          <ProgressIndicator currentStep={showReview ? TOTAL_STEPS + 1 : currentStep} totalSteps={TOTAL_STEPS} />
          
          <Card className="mt-6 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              {renderStep()}
              
              <div className="flex gap-3 mt-8 pt-6 border-t">
                {(currentStep > 1 || showReview) && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    {t('common.back')}
                  </Button>
                )}
                
                {!showReview && (
                  <Button
                    onClick={handleNext}
                    disabled={!canContinue()}
                    className="flex-1"
                  >
                    {currentStep === TOTAL_STEPS ? t('review.title') : t('common.continue')}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
