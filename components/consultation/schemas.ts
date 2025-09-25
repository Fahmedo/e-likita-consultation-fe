import { z } from 'zod';

export const SymptomSchema = z.object({
  description: z.string(),
  name: z.string().min(1, 'Symptom description is required'),
  severity: z.enum(['mild', 'moderate', 'severe'], {
    required_error: 'Severity is required',
  }),
  duration: z.string().min(1, 'Duration is required'),
  frequency: z.string().min(1, 'Frequency is required'),
});

export type SymptomForm = z.infer<typeof SymptomSchema>;

export const patientSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Email is invalid'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  address: z.string().min(1, 'Address is required'),
  emergencyContactName: z.string().min(1, 'Emergency contact is required'),
  emergencyContactPhone: z.string().min(1, 'Emergency phone is required'),
  medicalHistory: z.array(z.string()).min(1, 'Medical history is required'),
  currentMedications: z.string().optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;

export const followUpSchema = z.object({
  preferredContactMethod: z.enum(['email', 'phone', 'sms'], {
    required_error: 'Contact method is required',
  }),
  preferredTime: z.enum(['morning', 'afternoon', 'evening', 'anytime'], {
    required_error: 'Preferred time is required',
  }),
  urgency: z.enum(['low', 'medium', 'high'], {
    required_error: 'Urgency level is required',
  }),
  additionalNotes: z.string().optional(),
});

export type FollowUpFormData = z.infer<typeof followUpSchema>;
export const schema = z.object({
  patient: patientSchema,
  symptoms: z.array(SymptomSchema).min(1, 'At least one symptom is required'),
  followUp: followUpSchema,
});
