export interface SurveyData {
  // Step 1
  consentGiven: boolean;
  
  // Step 2 - Phone verification (deferred to final step)
  phoneNumber: string;
  otpVerified: boolean;
  verifiedOtp?: string; // Store the verified OTP for submission
  
  // Step 3
  fullName: string;
  gender?: string;
  age: number;
  educationLevel: string;
  languagesSpoken: string[];
  
  // Step 4
  primaryCategory: string;
  subCategory: string;
  customCategory?: string;
  yearsOfExperienceGroup: string;
  workMode: string;
  
  // Step 5
  workingDaysPerMonth: string;
  workingHoursPerDay: string;
  modeOfPayment: string;
  incomeRange: string;
  receivesPayslip: boolean;
  employerName?: string;
  receivesPFESI: boolean;
  receivesInsurance: boolean;
  insuranceType?: string;
  challenges: string[];
  
  // Step 6
  state: string;
  city: string;
  pincode: string;
  area: string;
  panchayat: string;
  block: string;
  serviceAreaSame: boolean;
  servingCity?: string;
  servingArea?: string;
  servingPanchayat?: string;
  servingPincode?: string;
  
  // Step 7
  aadhaarNumber: string;
  alternativeIdType?: string;
  idImageFile?: File;
  
  // Step 8
  signatureData?: string;
  
  // Step 9
  smartphoneType: string;
  internetAccess: string;
  willingnessApp: string;
  expectedBenefits: string[];
  futureOnboarding: boolean;
}

export const initialSurveyData: SurveyData = {
  consentGiven: false,
  phoneNumber: '',
  otpVerified: false,
  fullName: '',
  age: 0,
  educationLevel: '',
  languagesSpoken: [],
  primaryCategory: '',
  subCategory: '',
  yearsOfExperienceGroup: '',
  workMode: '',
  workingDaysPerMonth: '',
  workingHoursPerDay: '',
  modeOfPayment: '',
  incomeRange: '',
  receivesPayslip: false,
  receivesPFESI: false,
  receivesInsurance: false,
  challenges: [],
  state: '',
  city: '',
  pincode: '',
  area: '',
  panchayat: '',
  block: '',
  serviceAreaSame: true,
  aadhaarNumber: '',
  smartphoneType: '',
  internetAccess: '',
  willingnessApp: '',
  expectedBenefits: [],
  futureOnboarding: false,
};
