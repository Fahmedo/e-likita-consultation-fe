'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useConsultation } from './consultation-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MessageSquare,
  Mail,
  Phone,
  Smartphone,
} from 'lucide-react';
import { FollowUpFormData, followUpSchema } from './schemas';

export function FollowUpPage({
  pageMovement,
}: {
  pageMovement: (step: number) => void;
}) {
  const { state, dispatch } = useConsultation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FollowUpFormData>({
    resolver: zodResolver(followUpSchema),
    defaultValues: state.followUp, // prefill from context
  });

  const onSubmit = (data: FollowUpFormData) => {
    dispatch({ type: 'UPDATE_FOLLOW_UP', payload: data });
    pageMovement(4); // go to summary
  };

  const contactMethods = [
    {
      value: 'email',
      label: 'Email',
      icon: Mail,
      description: 'Receive updates via email',
    },
    {
      value: 'phone',
      label: 'Phone Call',
      icon: Phone,
      description: 'Direct phone consultation',
    },
    {
      value: 'sms',
      label: 'SMS/Text',
      icon: Smartphone,
      description: 'Text message updates',
    },
  ];

  const urgencyLevels = [
    {
      value: 'low',
      label: 'Low Priority',
      description: 'Routine follow-up within 1-2 weeks',
    },
    {
      value: 'medium',
      label: 'Medium Priority',
      description: 'Follow-up within 2-3 days',
    },
    {
      value: 'high',
      label: 'High Priority',
      description: 'Urgent follow-up within 24 hours',
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground text-2xl">
            <Calendar className="w-8 h-8 text-primary" />
            Follow-up Preferences
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Let us know how and when you'd like to receive follow-up care and
            updates about your consultation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Preferred Contact Method *
            </h3>
            <RadioGroup
              value={watch('preferredContactMethod')}
              onValueChange={(value) =>
                setValue('preferredContactMethod', value as any)
              }
              className="space-y-3"
            >
              {contactMethods.map((method) => (
                <div
                  key={method.value}
                  className="flex items-start space-x-3 p-3 rounded-lg border border-primary hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={method.value} id={method.value} />
                  <div className="flex items-start gap-3 flex-1">
                    <method.icon className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <Label
                        htmlFor={method.value}
                        className="font-medium cursor-pointer"
                      >
                        {method.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
            {errors.preferredContactMethod && (
              <p className="text-sm text-destructive">
                {errors.preferredContactMethod.message}
              </p>
            )}
          </div>

          {/* Preferred Time */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preferred Contact Time *</h3>
            <Select
              value={watch('preferredTime')}
              onValueChange={(value) => setValue('preferredTime', value as any)}
            >
              <SelectTrigger
                className={errors.preferredTime ? 'border-destructive' : ''}
              >
                <SelectValue placeholder="Select your preferred time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">
                  Morning (8:00 AM - 12:00 PM)
                </SelectItem>
                <SelectItem value="afternoon">
                  Afternoon (12:00 PM - 5:00 PM)
                </SelectItem>
                <SelectItem value="evening">
                  Evening (5:00 PM - 8:00 PM)
                </SelectItem>
                <SelectItem value="anytime">
                  Anytime during business hours
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.preferredTime && (
              <p className="text-sm text-destructive">
                {errors.preferredTime.message}
              </p>
            )}
          </div>

          {/* Urgency Level */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Urgency Level *</h3>
            <RadioGroup
              value={watch('urgency')}
              onValueChange={(value) => setValue('urgency', value as any)}
              className="space-y-3"
            >
              {urgencyLevels.map((level) => (
                <div
                  key={level.value}
                  className="flex items-start space-x-3 p-3 rounded-lg border border-primary hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={level.value} id={level.value} />
                  <div className="flex-1">
                    <Label
                      htmlFor={level.value}
                      className="font-medium cursor-pointer"
                    >
                      {level.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {level.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
            {errors.urgency && (
              <p className="text-sm text-destructive">
                {errors.urgency.message}
              </p>
            )}
          </div>

          {/* Additional Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Notes</h3>
            <Textarea
              {...register('additionalNotes')}
              placeholder="Share any additional concerns, questions, or specific requests..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => pageMovement(2)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          className="flex items-center gap-2"
          onClick={handleSubmit(onSubmit)}
        >
          Review Summary
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
