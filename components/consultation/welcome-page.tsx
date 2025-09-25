'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Heart, Shield, Clock, Users } from 'lucide-react';
import { useConsultation } from './consultation-context';

export function WelcomePage({
  pageMovement,
}: {
  pageMovement: (step: number) => void;
}) {
  const { state, dispatch } = useConsultation();

  const features = [
    {
      icon: Heart,
      title: 'Professional Care',
      description: 'Connect with qualified healthcare professionals',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health information is protected and confidential',
    },
    {
      icon: Clock,
      title: 'Quick Assessment',
      description: 'Get preliminary health assessment in minutes',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Access to medical experts and follow-up care',
    },
  ];

  return (
    <div className="space-y-8">
      <Card className="bg-card ">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground text-balance">
            Welcome to e-Likita Hospital Consultation
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground text-pretty">
            Get professional medical consultation from the comfort of your home.
            Our secure platform connects you with qualified healthcare
            professionals.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-pretty">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-2">
              Before You Begin
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Have your medical history and current medications ready</li>
              <li>• Ensure you have a stable internet connection</li>
              <li>• Set aside 10-15 minutes to complete the consultation</li>
              <li>• Have emergency contact information available</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => pageMovement(1)}
              size="lg"
              className="px-8 py-3 text-lg"
            >
              Start Consultation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
