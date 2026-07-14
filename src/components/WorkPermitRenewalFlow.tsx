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
            className="p-4 md:p-5 cursor-pointer group transition-colors hover:border-foreground/25 hover:bg-accent/40"
            onClick={() => option === 'yes' ? yesAction() : noAction()}
          >
            <div className="flex items-center gap-4">
              <span
                className="h-6 w-6 shrink-0 rounded-full border-2 border-border bg-card transition-colors group-hover:border-secondary-foreground/60"
                aria-hidden="true"
              />
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
            <div className="flex items-start gap-4 rounded-3xl border bg-card p-5 md:p-6">
              <div className="flex-1 space-y-4">
                <p className="text-card-foreground text-base">{t.initialQuestion.instruction}</p>
                <h2 className="text-lg md:text-xl font-semibold leading-relaxed text-card-foreground">{t.initialQuestion.question}</h2>
              </div>
              <AudioPlayer text={`${t.initialQuestion.instruction}\n\n${t.initialQuestion.question}`} language={language} />
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
            <div className="flex items-start gap-4 rounded-3xl border bg-card p-5 md:p-6">
              <div className="flex-1 space-y-4">
                <p className="text-card-foreground text-base">{t.residenceRenewal.instruction}</p>
                <h2 className="text-lg md:text-xl font-semibold leading-relaxed text-card-foreground">{t.residenceRenewal.question}</h2>
              </div>
              <AudioPlayer text={`${t.residenceRenewal.instruction}\n\n${t.residenceRenewal.question}`} language={language} />
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
            <div className="flex items-start gap-4 rounded-3xl border bg-card p-5 md:p-6">
              <div className="flex-1 space-y-4">
                <p className="text-card-foreground text-base">{t.initialQuestion.newOfferInstruction}</p>
                <h2 className="text-lg md:text-xl font-semibold leading-relaxed text-card-foreground">{t.initialQuestion.newOfferQuestion}</h2>
              </div>
              <AudioPlayer text={`${t.initialQuestion.newOfferInstruction}\n\n${t.initialQuestion.newOfferQuestion}`} language={language} />
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
            <div className="flex items-start justify-between gap-4 rounded-3xl bg-secondary p-5 md:p-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold leading-relaxed text-secondary-foreground">{t.laborApproval.question}</h2>
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
            <div className="flex items-start justify-between gap-4 rounded-3xl bg-secondary p-5 md:p-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold leading-relaxed text-secondary-foreground">{t.contract.question}</h2>
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
            <div className="flex items-start justify-between gap-4 rounded-3xl bg-secondary p-5 md:p-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold leading-relaxed text-secondary-foreground">{t.fees.question}</h2>
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
            <Card className="p-5 md:p-6 border-transparent bg-secondary shadow-none">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-medium text-secondary-foreground leading-relaxed">
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
            <Card className="p-5 md:p-6 border-transparent bg-amber-50 shadow-none">
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
            <Card className="p-5 md:p-6 border-transparent bg-amber-50 shadow-none">
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
    <Card className="border-0 bg-transparent p-0 shadow-none">
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