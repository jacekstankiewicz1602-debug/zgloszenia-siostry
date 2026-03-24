export interface FormValues {
  id: string;
  createdAt: string;
  
  // Section 1: Contact
  participantPhone: string;
  parentPhone: string;
  emergencyName: string;
  emergencyPhone: string;
  email: string;
  address: string;

  // Section 2: Health
  hasChronicConditions: boolean;
  hasAllergies: boolean;
  takesMedication: boolean;
  specialNeeds: string;
  diet: string;
  dietDetails: string;

  // Section 3: Consents
  consentMedical: boolean;
  consentPhotos: boolean;
  consentActivities: boolean;

  // Section 4: Additional
  reasonToAttend: string;
  tShirtSize: string;
  campExperience: boolean;
  notes: string;
}
