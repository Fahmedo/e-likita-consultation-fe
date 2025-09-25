'use client';

import { useEffect, useState } from 'react';
import { useConsultation } from './consultation-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  Calendar,
  Users,
  Check,
  BriefcaseMedical,
} from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';
import { PatientFormData, patientSchema } from './schemas';

export function PatientInfoPage({
  pageMovement,
}: {
  pageMovement: (step: number) => void;
}) {
  const { state, dispatch } = useConsultation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formData = state.patientInfo;

  const medicalHistoryOptions = [
    { label: 'Diabetes', value: 'Diabetes' },
    { label: 'Hypertension', value: 'Hypertension' },
    { label: 'Asthma', value: 'Asthma' },
    { label: 'Heart Disease', value: 'Heart Disease' },
    { label: 'Known Allergies', value: 'Known Allergies' },
    { label: 'None', value: 'None' },
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    dispatch({
      type: 'UPDATE_PATIENT_INFO',
      payload: { [field]: value },
    });
  };

  const validateForm = () => {
    const result = patientSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) newErrors[err.path[0].toString()] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      pageMovement(2);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground text-2xl">
            <User className="w-8 h-8 text-primary" />
            Patient Information
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Please provide your personal information for the consultation. All
            information is kept confidential.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName ?? ''}
                  onChange={(e) =>
                    handleInputChange('firstName', e.target.value)
                  }
                  placeholder="Enter your first name"
                  className={errors.firstName ? 'border-destructive' : ''}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName ?? ''}
                  onChange={(e) =>
                    handleInputChange('lastName', e.target.value)
                  }
                  placeholder="Enter your last name"
                  className={errors.lastName ? 'border-destructive' : ''}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email ?? ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber ?? ''}
                  onChange={(e) =>
                    handleInputChange('phoneNumber', e.target.value)
                  }
                  placeholder="+234 800 123 4567"
                  className={errors.phoneNumber ? 'border-destructive' : ''}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-destructive">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                type="tel"
                value={formData.address ?? ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="enter your address"
                className={errors.address ? 'border-destructive' : ''}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.phoneNumber}</p>
              )}
            </div>
          </div>

          {/* Personal Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth ?? ''}
                  onChange={(e) =>
                    handleInputChange('dateOfBirth', e.target.value)
                  }
                  className={errors.dateOfBirth ? 'border-destructive' : ''}
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-destructive">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  value={formData.gender ?? ''}
                  onValueChange={(value) => handleInputChange('gender', value)}
                >
                  <SelectTrigger
                    className={errors.gender ? 'border-destructive' : ''}
                  >
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-destructive">{errors.gender}</p>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Users className="w-4 h-4" />
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">
                  Emergency Contact Name *
                </Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName ?? ''}
                  onChange={(e) =>
                    handleInputChange('emergencyContactName', e.target.value)
                  }
                  placeholder="Full name of emergency contact"
                  className={
                    errors.emergencyContactName ? 'border-destructive' : ''
                  }
                />
                {errors.emergencyContactName && (
                  <p className="text-sm text-destructive">
                    {errors.emergencyContactName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">
                  Emergency Contact Phone *
                </Label>
                <Input
                  id="emergencyContactPhone"
                  type="tel"
                  value={formData.emergencyContactPhone ?? ''}
                  onChange={(e) =>
                    handleInputChange('emergencyContactPhone', e.target.value)
                  }
                  placeholder="+234 800 123 4567"
                  className={
                    errors.emergencyContactPhone ? 'border-destructive' : ''
                  }
                />
                {errors.emergencyContactPhone && (
                  <p className="text-sm text-destructive">
                    {errors.emergencyContactPhone}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Medication History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <BriefcaseMedical className="w-4 h-4" />
              Addtional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Medical History *</Label>
                <Command className="rounded-lg border border-primary">
                  <CommandList>
                    <CommandGroup>
                      {medicalHistoryOptions.map((option) => (
                        <CommandItem
                          key={option.value}
                          onSelect={() => {
                            const prev = formData?.medicalHistory ?? [];
                            const exists = prev.includes(option.value);
                            handleInputChange(
                              'medicalHistory',
                              exists
                                ? prev.filter((v: string) => v !== option.value)
                                : [...prev, option.value]
                            );
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              formData?.medicalHistory?.includes(option.value)
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
                {errors.medicalHistory && (
                  <p className="text-sm text-destructive">
                    {errors.medicalHistory}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentMedications">Current Medication </Label>

                <Textarea
                  id="currentMedications"
                  value={formData.currentMedications ?? ''}
                  onChange={(e) =>
                    handleInputChange('currentMedications', e.target.value)
                  }
                  placeholder="Current Medication"
                  className={
                    errors.currentMedications
                      ? 'border-destructive h-full'
                      : ' h-full'
                  }
                />
                {errors.currentMedications && (
                  <p className="text-sm text-destructive">
                    {errors.currentMedications}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => pageMovement(0)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={() => handleNext()}
          className="flex items-center gap-2"
        >
          Next: Symptoms
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
