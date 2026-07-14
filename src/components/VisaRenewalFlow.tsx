import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AudioPlayer } from './AudioPlayer';
import { translations } from '@/lib/translations';

interface VisaRenewalFlowProps {
  language: string;
  onBack: () => void;
}

export function VisaRenewalFlow({ language, onBack }: VisaRenewalFlowProps) {
  const [step, setStep] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const [showResidenceQuestion, setShowResidenceQuestion] = useState(false);
  const t = translations[language].visaRenewalFlow;
  
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      setShowWarning(false);
    }
  };

  const getCurrentQuestion = () => {
    switch (step) {
      case 1:
        return t.jobOffer;
      case 2:
        return t.laborApproval;
      case 3:
        return t.contract;
      case 4:
        return t.visaStatus;
      default:
        return null;
    }
  };

  const handleAnswer = (isYes: boolean) => {
    if (isYes) {
      if (step < 4) {
        setStep(step + 1);
        setShowWarning(false);
      }
    } else {
      setShowWarning(true);
    }
  };

  const handleVisaStatus = (isExpired: boolean) => {
    if (isExpired) {
      setStep(5);
      setShowWarning(true);
    } else {
      setShowResidenceQuestion(true);
    }
  };

  const handleResidenceAnswer = (hasResidence: boolean) => {
    if (hasResidence) {
      setStep(5);
      setShowWarning(false);
      setShowResidenceQuestion(false);
    } else {
      setShowWarning(true);
    }
  };

  const question = getCurrentQuestion();

  if (showResidenceQuestion) {
    return (
      <Card className="border-0 bg-transparent p-0 shadow-none">
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4 rounded-3xl bg-secondary p-5 md:p-6">
            <h2 className="flex-1 text-lg md:text-xl font-semibold leading-relaxed text-secondary-foreground">
              {t.visaStatus.residenceQuestion}
            </h2>
            <AudioPlayer text={t.visaStatus.residenceQuestion} language={language} />
          </div>

          <div className="space-y-4">
            {['residenceYes', 'residenceNo'].map((option) => (
              <Card
                key={option}
                className="p-4 md:p-5 cursor-pointer group transition-colors hover:border-foreground/25 hover:bg-accent/40"
                onClick={() => handleResidenceAnswer(option === 'residenceYes')}
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
                      {t.visaStatus[option]}
                    </p>
                    {option === 'residenceNo' && showWarning && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t.visaStatus.residenceWarning}
                      </p>
                    )}
                  </div>
                  <AudioPlayer
                    text={t.visaStatus[option]}
                    language={language}
                  />
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              onClick={() => {
                setShowResidenceQuestion(false);
                setShowWarning(false);
              }}
              className="text-base"
            >
              {translations[language].previous}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

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
          <>
            <div className="flex items-start justify-between gap-4 rounded-3xl bg-secondary p-5 md:p-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold leading-relaxed text-secondary-foreground">
                {t.visaStatus.question}
              </h2>
              <AudioPlayer text={t.visaStatus.question} language={language} />
            </div>

            <div className="space-y-4">
              {[
                { key: 'expired', text: t.visaStatus.expired },
                { key: 'valid', text: t.visaStatus.valid }
              ].map((option) => (
                <Card
                  key={option.key}
                  className="p-4 md:p-5 cursor-pointer group transition-colors hover:border-foreground/25 hover:bg-accent/40"
                  onClick={() => handleVisaStatus(option.key === 'expired')}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="text-base md:text-lg font-medium group-hover:text-primary transition-colors">
                        {option.text}
                      </p>
                    </div>
                    <AudioPlayer text={option.text} language={language} />
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <Card className={`p-5 md:p-6 border-transparent shadow-none ${showWarning ? 'bg-amber-50' : 'bg-secondary'}`}>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className={`text-lg md:text-xl font-medium leading-relaxed ${showWarning ? 'text-amber-900' : 'text-secondary-foreground'}`}>
                    {showWarning ? t.visaStatus.warning : t.visaStatus.success}
                  </p>
                </div>
                <AudioPlayer 
                  text={showWarning ? t.visaStatus.warning : t.visaStatus.success} 
                  language={language} 
                />
              </div>
            </Card>
          </div>
        )}

        <div className="flex justify-between">
          <Button
            onClick={onBack}
            className="text-base"
          >
            {translations[language].home}
          </Button>
          {step > 1 && (
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="text-base"
            >
              {translations[language].previous}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}