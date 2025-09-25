'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  'Welcome',
  'Patient Info',
  'Symptoms',
  'Follow-up',
  'Summary',
];

export function ProgressIndicator({
  currentStep,
  totalSteps,
}: ProgressIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Step {currentStep + 1} of {totalSteps}: {stepLabels[currentStep]}
        </h2>
        <div className="text-sm text-muted-foreground">
          {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
        </div>
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors',
                index < currentStep
                  ? 'bg-primary border-primary text-primary-foreground'
                  : index === currentStep
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'bg-background border-primary text-muted-foreground'
              )}
            >
              {index < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  'h-0.5 w-12 transition-colors',
                  index < currentStep ? 'bg-primary' : 'bg-border'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
