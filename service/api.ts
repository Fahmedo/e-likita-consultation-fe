import { toast } from 'sonner';
import API from './axios';

const baseUrl = 'http://localhost:3001/api/v1';

export const postConsultation = async (payload: any): Promise<any> => {
  const { data } = await API.post(`${baseUrl}/consultations`, payload);
  toast.success('Consultation submitted successfully!');
  return data;
};
