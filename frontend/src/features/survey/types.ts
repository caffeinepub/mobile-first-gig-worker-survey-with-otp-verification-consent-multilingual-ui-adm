export interface SurveyData {
  // Step 1 - Consent
  consentGiven: boolean;
  priorityTokenOptIn: boolean;
  paymentTermsConfirmed: boolean;

  // Step 2 - Phone/OTP (deferred)
  phoneNumber: string;
  otp: string;
  otpVerified: boolean;
  verifiedOtp: string;

  // Step 3 - Basic Details
  fullName: string;
  gender: string;
  age: string;
  educationLevel: string;
  otherEducation: string;
  languagesSpoken: string[];

  // Step 4 - Worker Category
  primaryCategory: string;
  subCategory: string;
  customSubCategory: string;
  yearsOfExperienceGroup: string;
  workMode: string;

  // Step 5 - Work & Income
  workingDaysPerMonth: string;
  workingDaysLowReason: string;
  workingHoursPerDay: string;
  modeOfPayment: string;
  dailyIncome: string;
  monthlyIncome: string;
  hourlyRate: string;
  hasBenefits: boolean;
  employerName: string;
  insuranceType: string;
  insuranceDetails: string;
  pfEsi: string;
  challenges: string[];
  primaryWorkLocation: string;
  customPrimaryWorkLocation: string;
  overtimeMoney: string;

  // Step 6 - Address & Service Area
  residentialState: string;
  city: string;
  pincode: string;
  area: string;
  panchayat: string;
  block: string;
  sameServiceLocation: string;
  servingState: string;
  servingCity: string;
  servingArea: string;
  servingPanchayat: string;
  servingPincode: string;
  employerGivesAccommodation: string;

  // Step 7 - Identity
  aadhaarNumber: string;
  alternativeIdType: string;
  voterIdImageFile?: File;
  idImageFile?: File;

  // Step 8 - Additional
  smartphoneType: string;
  rechargeType: string;
  rechargeAmount: string;
  ableToUseApp: boolean | null;
  mostlyUsedApps: string;
  ableToMail: boolean | null;
  ableToPayThroughApp: boolean | null;
  expectedBenefits: string[];
  futureOnboarding: boolean;

  // Backend-mapped fields
  keepsMoneyInAccount: boolean;
  lifeInsurance: boolean | null;
  healthInsurance: boolean | null;
  accidentalInsurance: boolean | null;
  usesSmartphone: boolean;
  ownsLaptop: boolean;
  otherDevice: string;
  ableToDoVideoCall: boolean;
  usesMobileData: boolean;
  internetConnection: string;
  remainingBalance: string;
  postpaidAccount: string;
  averageDailyUsage: string;
  usesBankApps: boolean;
  usesPaymentApps: boolean;
  hasTradingAccount: boolean;
  hasBusinessAccounts: boolean;
  followsRegulations: boolean;
  paidDuringCovid: boolean;
  speaksEnglish: boolean;
  passport: boolean;
  overseasWork: boolean;
  incomeTaxPayer: boolean;
  iosSmartphone: boolean | null;
  otherSubcategorySpecify: string;
}

export const initialSurveyData: SurveyData = {
  consentGiven: false,
  priorityTokenOptIn: false,
  paymentTermsConfirmed: false,

  phoneNumber: '',
  otp: '',
  otpVerified: false,
  verifiedOtp: '',

  fullName: '',
  gender: '',
  age: '',
  educationLevel: '',
  otherEducation: '',
  languagesSpoken: [],

  primaryCategory: '',
  subCategory: '',
  customSubCategory: '',
  yearsOfExperienceGroup: '',
  workMode: '',

  workingDaysPerMonth: '',
  workingDaysLowReason: '',
  workingHoursPerDay: '',
  modeOfPayment: '',
  dailyIncome: '',
  monthlyIncome: '',
  hourlyRate: '',
  hasBenefits: false,
  employerName: '',
  insuranceType: '',
  insuranceDetails: '',
  pfEsi: '',
  challenges: [],
  primaryWorkLocation: '',
  customPrimaryWorkLocation: '',
  overtimeMoney: '',

  residentialState: '',
  city: '',
  pincode: '',
  area: '',
  panchayat: '',
  block: '',
  sameServiceLocation: '',
  servingState: '',
  servingCity: '',
  servingArea: '',
  servingPanchayat: '',
  servingPincode: '',
  employerGivesAccommodation: '',

  aadhaarNumber: '',
  alternativeIdType: '',

  smartphoneType: '',
  rechargeType: '',
  rechargeAmount: '',
  ableToUseApp: null,
  mostlyUsedApps: '',
  ableToMail: null,
  ableToPayThroughApp: null,
  expectedBenefits: [],
  futureOnboarding: false,

  keepsMoneyInAccount: false,
  lifeInsurance: null,
  healthInsurance: null,
  accidentalInsurance: null,
  usesSmartphone: false,
  ownsLaptop: false,
  otherDevice: '',
  ableToDoVideoCall: false,
  usesMobileData: false,
  internetConnection: '',
  remainingBalance: '',
  postpaidAccount: '',
  averageDailyUsage: '',
  usesBankApps: false,
  usesPaymentApps: false,
  hasTradingAccount: false,
  hasBusinessAccounts: false,
  followsRegulations: false,
  paidDuringCovid: false,
  speaksEnglish: false,
  passport: false,
  overseasWork: false,
  incomeTaxPayer: false,
  iosSmartphone: null,
  otherSubcategorySpecify: '',
};
