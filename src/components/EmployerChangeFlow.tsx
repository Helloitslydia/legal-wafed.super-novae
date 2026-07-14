import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { AudioPlayer } from './AudioPlayer';
import { FlowNavigation } from './FlowNavigation';
import { FlowWarning } from './FlowWarning';
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
    <Card className="border-0 bg-transparent p-0 shadow-none">
      <div className="space-y-6">
        {step <= 3 && question && (
          <>
            <div className="flex items-start justify-between gap-4 rounded-3xl bg-secondary p-5 md:p-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold leading-relaxed text-secondary-foreground">
                {question.question}
              </h2>
              <AudioPlayer text={question.question} language={language} />
            </div>

            <div className="space-y-4">
              {['yes', 'no'].map((option) => (
                <Card
                  key={option}
                  className="p-4 md:p-5 cursor-pointer group transition-colors hover:border-foreground/25 hover:bg-accent/40"
                  onClick={() => handleAnswer(option === 'yes')}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="shrink-0 text-base md:text-lg font-bold transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    >
                      →
                    </span>
                    <div className="flex-1">
                      <p className="text-base md:text-lg font-medium group-hover:text-primary transition-colors">
                        {option === 'yes' 
                          ? (language === 'ar' ? 'نعم' : language === 'fr' ? 'Oui' : 'Yes')
                          : (language === 'ar' ? 'لا' : language === 'fr' ? 'Non' : 'No')}
                      </p>
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

            {showWarning && (
              <FlowWarning message={question.warning} language={language} />
            )}
          </>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Card className="p-5 md:p-6 border-transparent bg-secondary shadow-none">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-medium text-secondary-foreground leading-relaxed">
                    {t.success}
                  </p>
                </div>
                <AudioPlayer text={t.success} language={language} />
              </div>
            </Card>
          </div>
        )}

        <FlowNavigation
          language={language}
          onHome={onBack}
          onPrevious={step > 1 ? handlePrevious : undefined}
        />
      </div>
    </Card>
  );
}