// consultation-context.tsx
import { createContext, useReducer, useContext } from 'react';

export type patientInfoInterface = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
};
export type symptomsInterface = {
  symptomId?: string;
  description: string;
  name: string;
  duration: string;
  severity: string;
  frequency: string;
};
export type followupInterface = {
  preferredContactMethod: string;
  preferredTime: string;
  urgency: string;
  additionalNotes: string;
};

export type initialStateInterface = {
  patientInfo: patientInfoInterface;
  symptoms: symptomsInterface;
  followUp: followupInterface;
};
const initialState = {
  patientInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  },
  symptoms: [],
  followUp: {
    preferredContactMethod: '',
    preferredTime: '',
    urgency: '',
    additionalNotes: '',
  },
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'UPDATE_PATIENT_INFO':
      return {
        ...state,
        patientInfo: { ...state.patientInfo, ...action.payload },
      };
    case 'UPDATE_FOLLOW_UP':
      return {
        ...state,
        followUp: { ...state.followUp, ...action.payload },
      };
    case 'ADD_SYMPTOM':
      return {
        ...state,
        symptoms: [...state.symptoms, action.payload],
      };
    case 'REMOVE_SYMPTOM':
      return {
        ...state,
        symptoms: state.symptoms.filter(
          (s: any) => s.symptomId !== action.payload
        ),
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const ConsultationContext = createContext<any>(null);

export function ConsultationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ConsultationContext.Provider value={{ state, dispatch }}>
      {children}
    </ConsultationContext.Provider>
  );
}

export const useConsultation = () => useContext(ConsultationContext);
