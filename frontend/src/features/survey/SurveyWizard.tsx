import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
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
import Step8AdditionalInputs from './steps/Step8AdditionalInputs';
import SurveyReviewAndSubmit from './SurveyReviewAndSubmit';
import SubmissionSuccess from './SubmissionSuccess';

const TOTAL_STEPS = 8;

export default function SurveyWizard() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [surveyData, setSurveyData] = useState<SurveyData>(initialSurveyData);
  const [showReview, setShowReview] = useState(false);
  const [submittedSurveyId, setSubmittedSurveyId] = useState<string | null>(null);

  const { saveDraft, loadDraft, clearDraft, hasDraft } = useDraftSurvey();
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    if (hasDraft()) {
      setShowResume(true);
    }
  }, [hasDraft]);

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
        return true;
      case 3:
        return !!(
          surveyData.fullName &&
          surveyData.age &&
          parseInt(surveyData.age) > 0 &&
          surveyData.educationLevel &&
          (surveyData.educationLevel !== 'other' || surveyData.otherEducation)
        );
      case 4:
        return !!(
          surveyData.primaryCategory &&
          surveyData.subCategory &&
          surveyData.yearsOfExperienceGroup &&
          surveyData.workMode &&
          (surveyData.subCategory !== 'Other (Specify)' || surveyData.customSubCategory)
        );
      case 5:
        return !!(
          surveyData.workingDaysPerMonth &&
          surveyData.workingHoursPerDay &&
          surveyData.modeOfPayment &&
          surveyData.primaryWorkLocation
        );
      case 6:
        return !!(
          surveyData.residentialState &&
          surveyData.city &&
          surveyData.sameServiceLocation &&
          (surveyData.sameServiceLocation === 'yes' || surveyData.servingState)
        );
      case 7:
        return !!surveyData.aadhaarNumber;
      case 8:
        return !!(surveyData.smartphoneType);
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

      toast.success(t('draft.savedConfirmation'), {
        duration: 2000,
        position: 'bottom-right',
      });

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
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      saveDraft({ step: prevStep, data: surveyData });

      toast.success(t('draft.savedConfirmation'), {
        duration: 2000,
        position: 'bottom-right',
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitSuccess = (surveyId: string) => {
    clearDraft();
    setSubmittedSurveyId(surveyId);
  };

  const handleNewSurvey = () => {
    setSurveyData(initialSurveyData);
    setCurrentStep(1);
    setShowReview(false);
    setSubmittedSurveyId(null);
  };

  // Show success screen after submission
  if (submittedSurveyId) {
    return (
      <SubmissionSuccess
        surveyId={submittedSurveyId}
        phoneNumber={surveyData.phoneNumber}
        onNewSurvey={handleNewSurvey}
      />
    );
  }

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
        return <Step1WelcomeConsent data={surveyData} updateData={updateData} onNext={handleNext} />;
      case 2:
        return <Step2PhoneDeferredNotice data={surveyData} updateData={updateData} />;
      case 3:
        return <Step3BasicDetails data={surveyData} updateData={updateData} />;
      case 4:
        return <Step4WorkerCategory data={surveyData} onChange={updateData} />;
      case 5:
        return <Step5WorkIncome data={surveyData} onChange={updateData} />;
      case 6:
        return <Step6AddressServiceArea data={surveyData} onChange={updateData} />;
      case 7:
        return <Step7IdentityOptional data={surveyData} updateData={updateData} />;
      case 8:
        return <Step8AdditionalInputs data={surveyData} updateData={updateData} />;
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

              {!showReview && (
                <div className="flex gap-3 mt-8 pt-6 border-t">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      {t('common.back')}
                    </Button>
                  )}

                  {/* Step 1 has its own Next button inside the component */}
                  {currentStep !== 1 && (
                    <Button
                      onClick={handleNext}
                      disabled={!canContinue()}
                      className="flex-1"
                    >
                      {currentStep === TOTAL_STEPS ? t('common.reviewSubmit') : t('common.continue')}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              )}

              {showReview && (
                <div className="flex gap-3 mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    {t('common.back')}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
