import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AudioPlayer } from './AudioPlayer';
import { translations } from '@/lib/translations';
import { Language } from '@/types';

interface EmployerChangeFlowProps {
  language: Language;
  onBack: () => void;
}

export function EmployerChangeFlow({ language, onBack }: EmployerChangeFlowProps) {
  const [step, setStep] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const t = translations[language as keyof typeof translations].changeEmployerFlow;
  
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      setShowWarning(false);
    }
  };

  const getCurrentQuestion = () => {
    switch (step) {
      case 1:
        return t.laborOfficeApproval;
      case 2:
        return t.potentialEmployer;
      case 3:
        return t.previousEmployer;
      default:
        return null;
    }
  };

  const handleAnswer = (isYes: boolean) => {
    if (isYes) {
      if (step < 3) {
        setStep(step + 1);
        setShowWarning(false);
      } else {
        setStep(4); // Success state
      }
    } else {
      setShowWarning(true);
    }
  };

  const question = getCurrentQuestion();

  return (
    <Card className="p-6 md:p-8">
      <div className="space-y-6">
        {step <= 3 && question && (
          <>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">
                {question.question}
              </h2>
              <AudioPlayer text={question.question} language={language} />
            </div>

            <div className="space-y-4">
              {['yes', 'no'].map((option) => (
                <Card
                  key={option}
                  className="p-4 md:p-6 hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => handleAnswer(option === 'yes')}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="text-base md:text-lg font-medium group-hover:text-primary transition-colors">
                        {option === 'yes' 
                          ? (language === 'ar' ? 'نعم' : language === 'fr' ? 'Oui' : 'Yes')
                          : (language === 'ar' ? 'لا' : language === 'fr' ? 'Non' : 'No')}
                      </p>
                      {option === 'no' && showWarning && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {question.warning}
                        </p>
                      )}
                    </div>
                    <AudioPlayer
                      text={option === 'yes' 
                        ? (language === 'ar' ? 'نعم' : language === 'fr' ? 'Oui' : 'Yes')
                        : (language === 'ar' ? 'لا' : language === 'fr' ? 'Non' : 'No')}
                      language={language}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Card className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-xl md:text-2xl font-semibold text-green-600">
                    {t.success}
                  </p>
                </div>
                <AudioPlayer text={t.success} language={language} />
              </div>
            </Card>
          </div>
        )}

        <div className="flex justify-between">
          {step > 1 ? (
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="text-base"
            >
              {translations[language as keyof typeof translations].previous}
            </Button>
          ) : (
            <Button
              onClick={onBack}
              className="text-base"
            >
              {translations[language as keyof typeof translations].home}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}