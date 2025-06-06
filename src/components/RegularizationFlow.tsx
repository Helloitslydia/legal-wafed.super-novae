import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { translations } from '@/lib/translations';
import { RegularizationPath } from '@/types';
import { AudioPlayer } from './AudioPlayer';
import { RegularizationSteps } from './RegularizationSteps';

interface RegularizationFlowProps {
  language: string;
  onBack: () => void;
}

export function RegularizationFlow({ language, onBack }: RegularizationFlowProps) {
  const [path, setPath] = useState<RegularizationPath | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const t = translations[language];

  const handleOptionSelect = (option: RegularizationPath) => {
    setPath(option);
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const renderInitialOptions = () => (
    <RegularizationSteps
      path="outsideLibya"
      language={language}
      onNext={handleNext}
      onBack={onBack}
    />
  );

  return (
    <div className="space-y-6">
      {!path ? renderInitialOptions() : null}
    </div>
  );
}