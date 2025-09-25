'use client';

import {
  useConsultation,
  type symptomsInterface,
} from './consultation-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SymptomSchema, SymptomForm } from './schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  X,
  AlertTriangle,
  Activity,
} from 'lucide-react';
import { useState } from 'react';

export function SymptomsPage({
  pageMovement,
}: {
  pageMovement: (step: number) => void;
}) {
  const { state, dispatch } = useConsultation();
  const [generalError, setGeneralError] = useState('');

  const symptomsOptions = [
    { label: 'Fever/High Temperature', value: 'Fever/High Temperature' },
    { label: 'Chest Pain', value: 'Chest Pain' },
    { label: 'Difficulty Breathing', value: 'Difficulty Breathing' },
    { label: 'Severe Headache', value: 'Severe Headache' },
    { label: 'Abdominal Pain', value: 'Abdominal Pain' },
    { label: 'Nausea/Vomiting', value: 'Nausea/Vomiting' },
    { label: 'Diarrhea', value: 'Diarrhea' },
    { label: 'Cough', value: 'Cough' },
    { label: 'Sore Throat', value: 'Sore Throat' },
    { label: 'Fatigue/Weakness', value: 'Fatigue/Weakness' },
    { label: 'Dizziness', value: 'Dizziness' },
    { label: 'Skin Rash', value: 'Skin Rash' },
    { label: 'Joint Pain', value: 'Joint Pain' },
    { label: 'Back Pain', value: 'Back Pain' },
    { label: 'Urinary Problems', value: 'Urinary Problems' },
  ];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SymptomForm>({
    resolver: zodResolver(SymptomSchema),
    defaultValues: {
      name: undefined,
      description: '',
      severity: undefined,
      duration: '',
      frequency: '',
    },
  });

  // ✅ Add Symptom
  const addSymptom = (data: SymptomForm) => {
    const newSymptom: symptomsInterface = {
      symptomId: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      severity: data.severity,
      duration: data.duration,
      frequency: data.frequency,
    };

    dispatch({ type: 'ADD_SYMPTOM', payload: newSymptom });
    reset();
    setGeneralError('');
  };

  const removeSymptom = (id: string) => {
    dispatch({ type: 'REMOVE_SYMPTOM', payload: id });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const handleNext = () => {
    if (state.symptoms.length === 0) {
      setGeneralError('Please add at least one symptom to continue');
      return;
    }
    pageMovement(3);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground text-2xl">
            <Activity className="w-8 h-8 text-primary" />
            Symptoms Assessment
          </CardTitle>
          <CardDescription>
            Please describe your current symptoms in detail.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Add Symptom */}
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Symptom
          </h3>

          <div className="space-y-2">
            <Label htmlFor="description">Symptom Description *</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe your symptom"
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Name / Severity / Duration / Frequency */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Select
                onValueChange={(value) =>
                  setValue('name', value as any, { shouldValidate: true })
                }
              >
                <SelectTrigger
                  className={errors.name ? 'border-destructive' : ''}
                >
                  <SelectValue placeholder="Select Name" />
                </SelectTrigger>
                <SelectContent>
                  {symptomsOptions.map((symptom, index) => (
                    <SelectItem value={symptom.value} key={index}>
                      {symptom.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Severity *</Label>
              <Select
                onValueChange={(value) =>
                  setValue('severity', value as any, { shouldValidate: true })
                }
              >
                <SelectTrigger
                  className={errors.severity ? 'border-destructive' : ''}
                >
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
              {errors.severity && (
                <p className="text-sm text-destructive">
                  {errors.severity.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Duration *</Label>
              <Select
                onValueChange={(value) =>
                  setValue('duration', value as any, { shouldValidate: true })
                }
              >
                <SelectTrigger
                  className={errors.duration ? 'border-destructive' : ''}
                >
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less_than_hour">
                    Less than an hour
                  </SelectItem>
                  <SelectItem value="few_hours">A few hours</SelectItem>
                  <SelectItem value="1 day">1 day</SelectItem>
                  <SelectItem value="few_days">A few days</SelectItem>
                  <SelectItem value="one_week">One week</SelectItem>
                  <SelectItem value="more_than_week">
                    More than a week
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.duration && (
                <p className="text-sm text-destructive">
                  {errors.duration.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Frequency *</Label>
              <Select
                onValueChange={(value) =>
                  setValue('frequency', value as any, { shouldValidate: true })
                }
              >
                <SelectTrigger
                  className={errors.frequency ? 'border-destructive' : ''}
                >
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Intermittent">Intermittent</SelectItem>
                  <SelectItem value="Constant">Constant</SelectItem>
                </SelectContent>
              </Select>
              {errors.frequency && (
                <p className="text-sm text-destructive">
                  {errors.frequency.message}
                </p>
              )}
            </div>
          </div>

          <Button
            className="w-full md:w-auto"
            onClick={handleSubmit(addSymptom)}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Symptom
          </Button>

          {/* Current Symptoms List */}
          {state.symptoms.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Current Symptoms</h3>
              {state.symptoms.map((symptom: any, index: number) => (
                <div
                  key={index}
                  className="p-4 bg-card border border-primary rounded-lg"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{symptom.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {symptom.description}
                      </p>
                      <div className="flex gap-2 mt-1">
                        <Badge className={getSeverityColor(symptom.severity)}>
                          {symptom.severity}
                        </Badge>
                        <Badge variant="outline">
                          Duration: {symptom.duration}
                        </Badge>
                        <Badge variant="outline">
                          Frequency: {symptom.frequency}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSymptom(symptom.symptomId)}
                      className="text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {generalError && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <p className="text-sm text-destructive">{generalError}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => pageMovement(1)}>
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button onClick={handleNext}>
          Next: Follow-up <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
