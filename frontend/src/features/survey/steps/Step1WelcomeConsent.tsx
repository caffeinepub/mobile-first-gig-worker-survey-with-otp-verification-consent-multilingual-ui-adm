import React, { useState } from 'react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Shield, CreditCard } from 'lucide-react';
import type { SurveyData } from '../types';

interface Step1Props {
  data: SurveyData;
  updateData: (updates: Partial<SurveyData>) => void;
  onNext: () => void;
}

export default function Step1WelcomeConsent({ data, updateData, onNext }: Step1Props) {
  const { t } = useLanguage();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [tokenTermsOpen, setTokenTermsOpen] = useState(false);

  const canProceed = data.consentGiven;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <img src="/assets/generated/logo.dim_512x512.png" alt="Logo" className="h-16 w-16 rounded-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{t('step1.title')}</h2>
        <p className="text-muted-foreground text-sm">{t('step1.purpose')}</p>
      </div>

      {/* Section A: General Survey Consent */}
      <div className="border border-border rounded-lg p-4 space-y-3 bg-card">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            checked={data.consentGiven}
            onCheckedChange={(checked) => updateData({ consentGiven: !!checked })}
            className="mt-1"
          />
          <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
            I agree to participate in the Unorganised Worker Survey and allow my information to be used for research and platform communication purposes.
          </Label>
        </div>

        {/* Survey Privacy Notice Collapsible */}
        <Collapsible open={privacyOpen} onOpenChange={setPrivacyOpen}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors w-full text-left"
            >
              <Shield className="h-4 w-4 flex-shrink-0" />
              <span>Survey Privacy Notice</span>
              {privacyOpen ? <ChevronUp className="h-4 w-4 ml-auto" /> : <ChevronDown className="h-4 w-4 ml-auto" />}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-3 p-4 bg-muted/50 rounded-md text-xs space-y-3 text-muted-foreground leading-relaxed">
              <div>
                <p className="font-semibold text-foreground mb-1">Data Usage</p>
                <p>The information you provide in this survey will be used solely for research purposes and to improve platform services for unorganised workers. Your data helps us understand the needs and challenges of workers in the informal sector.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Consent</p>
                <p>By participating in this survey, you voluntarily consent to the collection and processing of your personal information as described in this notice. You may withdraw your consent at any time by contacting us.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Storage & Security</p>
                <p>Your data is stored securely on encrypted servers. We implement industry-standard security measures to protect your information from unauthorized access, disclosure, or misuse. Data is retained only as long as necessary for the stated purposes.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Non-Employment Disclaimer</p>
                <p>Participation in this survey does not constitute an employment offer, guarantee of employment, or any form of employment contract. This survey is purely for research and platform development purposes.</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Section B: Priority Token Option */}
      <div className="border border-border rounded-lg p-4 space-y-3 bg-card">
        <div className="flex items-start gap-3">
          <Checkbox
            id="priorityToken"
            checked={data.priorityTokenOptIn}
            onCheckedChange={(checked) =>
              updateData({ priorityTokenOptIn: !!checked, paymentTermsConfirmed: false })
            }
            className="mt-1"
          />
          <Label htmlFor="priorityToken" className="text-sm leading-relaxed cursor-pointer">
            I would like to purchase the Priority Token{' '}
            <span className="text-muted-foreground">(Optional)</span>
          </Label>
        </div>

        {/* Token Terms & Conditions Collapsible */}
        <Collapsible open={tokenTermsOpen} onOpenChange={setTokenTermsOpen}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors w-full text-left"
            >
              <CreditCard className="h-4 w-4 flex-shrink-0" />
              <span>Terms & Conditions – Priority Token / नियम एवं शर्तें – प्राथमिकता टोकन</span>
              {tokenTermsOpen ? <ChevronUp className="h-4 w-4 ml-auto" /> : <ChevronDown className="h-4 w-4 ml-auto" />}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-3 p-4 bg-muted/50 rounded-md text-xs space-y-3 text-muted-foreground leading-relaxed">
              <p className="font-bold text-foreground text-sm">Terms & Conditions – Priority Token</p>
              <p className="font-bold text-foreground text-sm">नियम एवं शर्तें – प्राथमिकता टोकन</p>

              <div className="space-y-1">
                <p>The Priority Token is optional and not mandatory for survey participation.</p>
                <p className="text-foreground/70">प्राथमिकता टोकन वैकल्पिक है और सर्वेक्षण के लिए अनिवार्य नहीं है।</p>
              </div>
              <div className="space-y-1">
                <p>The base service fee is ₹100. GST will be charged extra as per applicable law.</p>
                <p className="text-foreground/70">मूल सेवा शुल्क ₹100 है। लागू कानून के अनुसार अतिरिक्त जीएसटी लिया जाएगा।</p>
              </div>
              <div className="space-y-1">
                <p>The total payable amount is ₹118 (₹100 + 18% GST).</p>
                <p className="text-foreground/70">कुल देय राशि ₹118 है (₹100 + 18% जीएसटी)।</p>
              </div>
              <div className="space-y-1">
                <p>The Priority Token does not guarantee employment, government benefits, or job placement.</p>
                <p className="text-foreground/70">यह टोकन रोजगार, सरकारी लाभ या नौकरी की कोई गारंटी नहीं देता है।</p>
              </div>
              <div className="space-y-1">
                <p>The token provides priority communication and early updates regarding platform services.</p>
                <p className="text-foreground/70">यह टोकन प्लेटफ़ॉर्म सेवाओं से संबंधित प्राथमिक सूचना और शीघ्र अपडेट प्रदान करता है।</p>
              </div>
              <div className="space-y-1">
                <p>Purchase of this token does not create any employment contract.</p>
              </div>

              {/* Refund Policy */}
              <div className="border-t border-border pt-3 mt-3">
                <p className="font-bold text-foreground text-sm">🔁 Refund Policy</p>
                <p className="font-bold text-foreground text-sm">🔁 धनवापसी नीति</p>
              </div>
              <div className="space-y-1">
                <p>The service fee is generally non-refundable once payment is successfully processed.</p>
                <p className="text-foreground/70">भुगतान सफल होने के बाद सेवा शुल्क सामान्यतः वापस नहीं किया जाएगा।</p>
              </div>
              <div className="space-y-1">
                <p>Refunds may be considered only in the following cases:</p>
                <ul className="list-disc list-inside ml-2 space-y-0.5">
                  <li>Duplicate payment</li>
                  <li>Technical payment failure where service was not issued</li>
                  <li>Incorrect amount charged due to system error</li>
                </ul>
                <p className="text-foreground/70">धनवापसी केवल निम्न परिस्थितियों में विचार की जाएगी:</p>
                <ul className="list-disc list-inside ml-2 space-y-0.5 text-foreground/70">
                  <li>दो बार भुगतान हो जाना</li>
                  <li>तकनीकी त्रुटि के कारण सेवा जारी न होना</li>
                  <li>सिस्टम त्रुटि के कारण गलत राशि कटना</li>
                </ul>
              </div>
              <div className="space-y-1">
                <p>Refund requests must be submitted within 7 days of payment with valid proof.</p>
                <p className="text-foreground/70">धनवापसी के लिए भुगतान के 7 दिनों के भीतर प्रमाण सहित अनुरोध करना आवश्यक है।</p>
              </div>
              <div className="space-y-1">
                <p>Approved refunds will be processed within 7–15 working days to the original payment method.</p>
                <p className="text-foreground/70">स्वीकृत धनवापसी 7–15 कार्य दिवसों के भीतर मूल भुगतान माध्यम में की जाएगी।</p>
              </div>
              <div className="space-y-1">
                <p>No refund will be granted on the basis of non-selection, non-employment, or change of personal decision.</p>
                <p className="text-foreground/70">चयन न होने, रोजगार न मिलने या व्यक्तिगत निर्णय बदलने के आधार पर धनवापसी नहीं की जाएगी।</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Payment Section - only shown when token is selected */}
        {data.priorityTokenOptIn && (
          <div className="mt-4 p-4 border border-primary/30 rounded-lg bg-primary/5 space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Priority Token Payment
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base Service Fee</span>
                <span className="font-medium">₹100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="font-medium">₹18</span>
              </div>
              <div className="flex justify-between border-t border-border pt-1 mt-1">
                <span className="font-semibold">Total Payable</span>
                <span className="font-bold text-primary">₹118</span>
              </div>
            </div>

            {/* Mandatory confirmation checkbox before payment */}
            <div className="flex items-start gap-3 pt-2 border-t border-border">
              <Checkbox
                id="paymentTerms"
                checked={data.paymentTermsConfirmed}
                onCheckedChange={(checked) => updateData({ paymentTermsConfirmed: !!checked })}
                className="mt-1"
              />
              <Label htmlFor="paymentTerms" className="text-xs leading-relaxed cursor-pointer">
                ✔ I confirm that I understand the payment terms and refund policy.<br />
                <span className="text-muted-foreground">✔ मैं भुगतान की शर्तों और धनवापसी नीति को समझता/समझती हूँ।</span>
              </Label>
            </div>

            <Button
              type="button"
              className="w-full"
              disabled={!data.paymentTermsConfirmed}
              onClick={() => {
                alert('Payment gateway integration coming soon. Total: ₹118');
              }}
            >
              Proceed to Pay ₹118
            </Button>
          </div>
        )}
      </div>

      {!data.consentGiven && (
        <p className="text-sm text-destructive">{t('step1.consentRequired')}</p>
      )}

      <Button
        onClick={onNext}
        disabled={!canProceed}
        className="w-full"
        size="lg"
      >
        {t('common.continue')}
      </Button>
    </div>
  );
}
