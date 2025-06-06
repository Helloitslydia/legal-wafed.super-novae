import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AudioPlayer } from './AudioPlayer';
import { translations } from '@/lib/translations';

interface LeavingLibyaFlowProps {
  language: string;
  onBack: () => void;
}

export function LeavingLibyaFlow({ language, onBack }: LeavingLibyaFlowProps) {
  const [step, setStep] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const t = translations[language].leavingLibyaFlow;
  
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      setShowWarning(false);
    }
  };

  const handleResidenceVisa = (hasVisa: boolean) => {
    if (hasVisa) {
      setStep(2);
      setShowWarning(false);
    } else {
      setStep(4);
    }
  };

  const handleEmployerDeclaration = (hasDeclaration: boolean) => {
    if (hasDeclaration) {
      setStep(3);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <Card className="p-6 md:p-8">
      <div className="space-y-6">
        {step === 1 && (
          <>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">
                {t.residenceVisa.question}
              </h2>
              <AudioPlayer text={t.residenceVisa.question} language={language} />
            </div>

            <div className="space-y-4">
              {['yes', 'no'].map((option) => (
                <Card
                  key={option}
                  className="p-4 md:p-6 hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => handleResidenceVisa(option === 'yes')}
                >
                  <div className="flex items-start gap-4">
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
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">
                {t.employerDeclaration.question}
              </h2>
              <AudioPlayer text={t.employerDeclaration.question} language={language} />
            </div>

            <div className="space-y-4">
              {['yes', 'no'].map((option) => (
                <Card
                  key={option}
                  className="p-4 md:p-6 hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => handleEmployerDeclaration(option === 'yes')}
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
                          {t.employerDeclaration.warning}
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

        {step === 3 && (
          <div className="space-y-4">
            <Card className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-xl md:text-2xl font-semibold">
                    {t.exitVisa.message}
                  </p>
                </div>
                <AudioPlayer text={t.exitVisa.message} language={language} />
              </div>
            </Card>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <Card className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-xl md:text-2xl font-semibold">
                    {t.residenceVisa.noVisaMessage}
                  </p>
                </div>
                <AudioPlayer text={t.residenceVisa.noVisaMessage} language={language} />
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
              {translations[language].previous}
            </Button>
          ) : (
            <Button
              onClick={onBack}
              className="text-base"
            >
              {translations[language].home}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}