'use client';

import { useConsultation } from './consultation-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Activity,
  Calendar,
  FileText,
  ArrowLeft,
  Send,
  Download,
} from 'lucide-react';
import { on } from 'events';
import usePost from '@/service/usePost';
import { toast } from 'sonner';
import Loader from './loader';
import { baseUrl } from '@/service/environment';

export function SummaryPage({
  pageMovement,
}: {
  pageMovement: (step: number) => void;
}) {
 
  const { state } = useConsultation();
  const { makeRequest, isLoading, isSuccess } = usePost(`${baseUrl}/consultations`, 'POST');

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'severe':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSubmit = () => {
    const payload = {
      ...state.patientInfo,
      symptoms: state.symptoms,
      followUp: state.followUp,
    };
    makeRequest(payload);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="space-y-6">
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <FileText className="w-5 h-5 text-primary" />
              Consultation Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please review the information below before submitting your
              consultation request.
            </p>
          </CardContent>
        </Card>

        {/* Patient Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5 text-primary" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <li>
                <strong>Name:</strong> {state.patientInfo.firstName}{' '}
                {state.patientInfo.lastName}
              </li>
              <li>
                <strong>Email:</strong> {state.patientInfo.email}
              </li>
              <li>
                <strong>Phone:</strong> {state.patientInfo.phoneNumber}
              </li>
              <li>
                <strong>Date of Birth:</strong> {state.patientInfo.dateOfBirth}
              </li>
              <li>
                <strong>Gender:</strong> {state.patientInfo.gender}
              </li>
              <li className="md:col-span-2">
                <strong>Address:</strong> {state.patientInfo.address}
              </li>
              <li className="md:col-span-2">
                <strong>Emergency Contact:</strong>{' '}
                {state.patientInfo.emergencyContactName} (
                {state.patientInfo.emergencyContactPhone})
              </li>
            </ul>
          </CardContent>
        </Card>

        <Separator />

        {/* Symptoms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="w-5 h-5 text-primary" />
              Symptoms
            </CardTitle>
          </CardHeader>
          <CardContent>
            {state.symptoms.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No symptoms provided.
              </p>
            ) : (
              <div className="space-y-3">
                {state.symptoms.map((s: any, idx: number) => (
                  <div
                    key={s.symptomId || idx}
                    className="p-3 border rounded-md bg-muted/30"
                  >
                    <p className="font-medium">
                      {idx + 1}. {s.name} — {s.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge className={getSeverityColor(s.severity)}>
                        Severity: {s.severity}
                      </Badge>
                      <Badge variant="outline">Duration: {s.duration}</Badge>
                      <Badge variant="outline">Frequency: {s.frequency}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Separator />

        {/* Follow-Up */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-primary" />
              Follow-Up Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <li>
                <strong>Preferred Contact:</strong>{' '}
                {state.followUp.preferredContactMethod}
              </li>
              <li>
                <strong>Time:</strong> {state.followUp.preferredTime}
              </li>
              <li>
                <strong>Frequency:</strong> {state.followUp.frequency}
              </li>
              {state.followUp.additionalNotes && (
                <li className="md:col-span-2">
                  <strong>Notes:</strong> {state.followUp.additionalNotes}
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => pageMovement(3)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          {isSuccess ? (
            <Button
              type="submit"
              className="flex items-center gap-2"
              onClick={() => window.print()}
            >
              <Download className="w-4 h-4" />
              Download a copy
            </Button>
          ) : (
            <Button
              type="submit"
              className="flex items-center gap-2"
              onClick={handleSubmit}
            >
              <Send className="w-4 h-4" />
              Submit Consultation
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
