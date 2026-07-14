import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AudioPlayer } from './AudioPlayer';
import { translations } from '@/lib/translations';
import { Language } from '@/types';

interface WorkPermitRenewalFlowProps {
  language: Language;
  onBack: () => void;
}

export function WorkPermitRenewalFlow({ language, onBack }: WorkPermitRenewalFlowProps) {
  const [step, setStep] = useState('initial');
  const t = translations[language as keyof typeof translations].workPermitRenewalFlow;

  const renderStep = () => {
    const renderChoices = (yesAction: () => void, noAction: () => void, noMessage?: string) => (
      <div className="space-y-4">
        {['yes', 'no'].map((option) => (
          <Card
            key={option}
            className="p-4 md:p-6 cursor-pointer group transition-colors hover:border-primary/40 hover:bg-accent/40"
            onClick={() => option === 'yes' ? yesAction() : noAction()}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-base md:text-lg font-medium group-hover:text-primary transition-colors">
                  {option === 'yes' 
                    ? (language === 'ar' ? 'نعم' : language === 'fr' ? 'Oui' : 'Yes')
                    : (language === 'ar' ? 'لا' : language === 'fr' ? 'Non' : 'No')}
                </p>
                {option === 'no' && noMessage && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {noMessage}
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
    );

    switch (step) {
      case 'initial':
        return (
          <>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">{t.initialQuestion.question}</h2>
              <AudioPlayer text={t.initialQuestion.question} language={language} />
            </div>
            {renderChoices(
              () => setStep('residenceRenewal'),
              () => setStep('newJobOffer')
            )}
          </>
        );

      case 'residenceRenewal':
        return (
          <>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">{t.residenceRenewal.question}</h2>
              <AudioPlayer text={t.residenceRenewal.question} language={language} />
            </div>
            {renderChoices(
              () => setStep('residenceSuccess'),
              () => setStep('residenceWarning')
            )}
          </>
        );

      case 'newJobOffer':
        return (
          <>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">{t.initialQuestion.warning}</h2>
              <AudioPlayer text={t.initialQuestion.warning} language={language} />
            </div>
            {renderChoices(
              () => setStep('laborApproval'),
              () => setStep('noJobOffer'),
              t.initialQuestion.noJobOffer
            )}
          </>
        );

      case 'laborApproval':
        return (
          <>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">{t.laborApproval.question}</h2>
              <AudioPlayer text={t.laborApproval.question} language={language} />
            </div>
            {renderChoices(
              () => setStep('contract'),
              () => setStep('noLaborApproval'),
              t.laborApproval.warning
            )}
          </>
        );

      case 'contract':
        return (
          <>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">{t.contract.question}</h2>
              <AudioPlayer text={t.contract.question} language={language} />
            </div>
            {renderChoices(
              () => setStep('fees'),
              () => setStep('noContract'),
              t.contract.warning
            )}
          </>
        );

      case 'fees':
        return (
          <>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">{t.fees.question}</h2>
              <AudioPlayer text={t.fees.question} language={language} />
            </div>
            {renderChoices(
              () => setStep('success'),
              () => setStep('noFees'),
              t.fees.warning
            )}
          </>
        );

      case 'residenceSuccess':
      case 'success':
        return (
          <div className="space-y-4">
            <Card className="p-4 md:p-6 border-green-200 bg-green-50">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-medium text-green-800 leading-relaxed">
                    {step === 'residenceSuccess' ? t.residenceRenewal.success : t.fees.success}
                  </p>
                </div>
                <AudioPlayer 
                  text={step === 'residenceSuccess' ? t.residenceRenewal.success : t.fees.success}
                  language={language}
                />
              </div>
            </Card>
          </div>
        );

      case 'residenceWarning':
        return (
          <div className="space-y-4">
            <Card className="p-4 md:p-6 border-amber-200 bg-amber-50">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-medium text-amber-900 leading-relaxed">
                    {t.residenceRenewal.warning}
                  </p>
                </div>
                <AudioPlayer text={t.residenceRenewal.warning} language={language} />
              </div>
            </Card>
          </div>
        );

      case 'noJobOffer':
      case 'noLaborApproval':
      case 'noContract':
      case 'noFees':
        return (
          <div className="space-y-4">
            <Card className="p-4 md:p-6 border-amber-200 bg-amber-50">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-medium text-amber-900 leading-relaxed">
                    {step === 'noJobOffer' ? t.initialQuestion.noJobOffer :
                     step === 'noLaborApproval' ? t.laborApproval.warning :
                     step === 'noContract' ? t.contract.warning :
                     t.fees.warning}
                  </p>
                </div>
                <AudioPlayer 
                  text={step === 'noJobOffer' ? t.initialQuestion.noJobOffer :
                        step === 'noLaborApproval' ? t.laborApproval.warning :
                        step === 'noContract' ? t.contract.warning :
                        t.fees.warning}
                  language={language}
                />
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="p-6 md:p-8">
      <div className="space-y-6">
        {renderStep()}
        <div className="flex justify-between">
          <Button
            onClick={onBack}
            className="text-base"
          >
            {translations[language as keyof typeof translations].home}
          </Button>
          {!['residenceSuccess', 'success', 'residenceWarning', 'noJobOffer', 'noLaborApproval', 'noContract', 'noFees'].includes(step) && (
            <Button
              onClick={() => setStep('initial')}
              variant="outline"
              className="text-base"
            >
              {translations[language as keyof typeof translations].previous}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}