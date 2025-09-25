'use client';

import { ConsultationProvider } from './consultation-context';
import { ProgressIndicator } from './progress-indicator';
import { Header } from './header';
import { WelcomePage } from './welcome-page';
import { useState } from 'react';
import { PatientInfoPage } from './patient-info-page';
import { SymptomsPage } from './symptoms-page';
import { FollowUpPage } from './follow-up-page';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './schemas';
import { SummaryPage } from './summary-page';

export function ConsultationLayout() {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({ resolver: zodResolver(schema) });
  return (
    <ConsultationProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <ProgressIndicator currentStep={currentStep} totalSteps={5} />
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
              <div className="mt-8">
                {currentStep === 0 && (
                  <WelcomePage pageMovement={setCurrentStep} />
                )}
                {currentStep === 1 && (
                  <PatientInfoPage pageMovement={setCurrentStep} />
                )}
                {currentStep === 2 && (
                  <SymptomsPage pageMovement={setCurrentStep} />
                )}
                {currentStep === 3 && (
                  <FollowUpPage pageMovement={setCurrentStep} />
                )}
                {currentStep === 4 && (
                  <SummaryPage pageMovement={setCurrentStep} />
                )}
              </div>
            </form>
          </FormProvider>
        </main>
      </div>
    </ConsultationProvider>
  );
}
