'use client';

import { Heart, Phone, Mail } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                e-Likita Hospital
              </h1>
              <p className="text-sm text-muted-foreground">
                Consultation Assistant
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+234 800 123 4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>help@elikita.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
