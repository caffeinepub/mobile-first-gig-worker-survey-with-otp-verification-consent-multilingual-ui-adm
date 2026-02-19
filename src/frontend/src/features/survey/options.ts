export const categories = [
  { value: 'homeServices', labelKey: 'categories.homeServices' },
  { value: 'personalCare', labelKey: 'categories.personalCare' },
  { value: 'deliveryLogistics', labelKey: 'categories.deliveryLogistics' },
  { value: 'repairServices', labelKey: 'categories.repairServices' },
  { value: 'skilledFreelancers', labelKey: 'categories.skilledFreelancers' },
  { value: 'construction', labelKey: 'categories.construction' },
  { value: 'others', labelKey: 'categories.others' },
];

export const subCategories: Record<string, { value: string; labelKey: string }[]> = {
  homeServices: [
    { value: 'electrician', labelKey: 'subCategories.electrician' },
    { value: 'plumber', labelKey: 'subCategories.plumber' },
    { value: 'cleaner', labelKey: 'subCategories.cleaner' },
    { value: 'painter', labelKey: 'subCategories.painter' },
  ],
  personalCare: [
    { value: 'salonAtHome', labelKey: 'subCategories.salonAtHome' },
    { value: 'massageTherapist', labelKey: 'subCategories.massageTherapist' },
  ],
  deliveryLogistics: [
    { value: 'bikeDelivery', labelKey: 'subCategories.bikeDelivery' },
    { value: 'autoDriver', labelKey: 'subCategories.autoDriver' },
  ],
  repairServices: [
    { value: 'mobileRepair', labelKey: 'subCategories.mobileRepair' },
    { value: 'laptopRepair', labelKey: 'subCategories.laptopRepair' },
    { value: 'applianceRepair', labelKey: 'subCategories.applianceRepair' },
  ],
  skilledFreelancers: [
    { value: 'photographer', labelKey: 'subCategories.photographer' },
    { value: 'tutor', labelKey: 'subCategories.tutor' },
  ],
  construction: [
    { value: 'constructionWorker', labelKey: 'subCategories.constructionWorker' },
    { value: 'dailyWageWorker', labelKey: 'subCategories.dailyWageWorker' },
  ],
  others: [],
};

export const languages = [
  { value: 'english', labelKey: 'languages.english' },
  { value: 'hindi', labelKey: 'languages.hindi' },
  { value: 'bengali', labelKey: 'languages.bengali' },
  { value: 'tamil', labelKey: 'languages.tamil' },
  { value: 'telugu', labelKey: 'languages.telugu' },
  { value: 'marathi', labelKey: 'languages.marathi' },
  { value: 'gujarati', labelKey: 'languages.gujarati' },
  { value: 'kannada', labelKey: 'languages.kannada' },
  { value: 'malayalam', labelKey: 'languages.malayalam' },
  { value: 'punjabi', labelKey: 'languages.punjabi' },
];

export const indianStates = [
  { value: 'andhraPradesh', labelKey: 'states.andhraPradesh' },
  { value: 'arunachalPradesh', labelKey: 'states.arunachalPradesh' },
  { value: 'assam', labelKey: 'states.assam' },
  { value: 'bihar', labelKey: 'states.bihar' },
  { value: 'chhattisgarh', labelKey: 'states.chhattisgarh' },
  { value: 'goa', labelKey: 'states.goa' },
  { value: 'gujarat', labelKey: 'states.gujarat' },
  { value: 'haryana', labelKey: 'states.haryana' },
  { value: 'himachalPradesh', labelKey: 'states.himachalPradesh' },
  { value: 'jharkhand', labelKey: 'states.jharkhand' },
  { value: 'karnataka', labelKey: 'states.karnataka' },
  { value: 'kerala', labelKey: 'states.kerala' },
  { value: 'madhyaPradesh', labelKey: 'states.madhyaPradesh' },
  { value: 'maharashtra', labelKey: 'states.maharashtra' },
  { value: 'manipur', labelKey: 'states.manipur' },
  { value: 'meghalaya', labelKey: 'states.meghalaya' },
  { value: 'mizoram', labelKey: 'states.mizoram' },
  { value: 'nagaland', labelKey: 'states.nagaland' },
  { value: 'odisha', labelKey: 'states.odisha' },
  { value: 'punjab', labelKey: 'states.punjab' },
  { value: 'rajasthan', labelKey: 'states.rajasthan' },
  { value: 'sikkim', labelKey: 'states.sikkim' },
  { value: 'tamilNadu', labelKey: 'states.tamilNadu' },
  { value: 'telangana', labelKey: 'states.telangana' },
  { value: 'tripura', labelKey: 'states.tripura' },
  { value: 'uttarPradesh', labelKey: 'states.uttarPradesh' },
  { value: 'uttarakhand', labelKey: 'states.uttarakhand' },
  { value: 'westBengal', labelKey: 'states.westBengal' },
  { value: 'delhi', labelKey: 'states.delhi' },
];
