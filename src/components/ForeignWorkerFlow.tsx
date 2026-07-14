import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AudioPlayer } from './AudioPlayer';
import { translations } from '@/lib/translations';
import { Language } from '@/types';

interface ForeignWorkerFlowProps {
  language: Language;
  onBack: () => void;
}

export function ForeignWorkerFlow({ language, onBack }: ForeignWorkerFlowProps) {
  const [step, setStep] = useState('jobOffer');
  const [showWarning, setShowWarning] = useState(false);
  const t = translations[language as keyof typeof translations].foreignWorkerFlow;

  const handlePrevious = () => {
    switch (step) {
      case 'jobOffer':
        onBack();
        break;
      case 'employerApproval':
        setStep('jobOffer');
        break;
      case 'preliminaryAgreement':
        setStep('employerApproval');
        break;
      case 'entryTime':
        setStep('preliminaryAgreement');
        break;
      case 'finalContract':
        setStep('entryTime');
        break;
      case 'newOffer':
        setStep('finalContract');
        break;
      case 'approval':
        setStep('newOffer');
        break;
      case 'permit':
        setStep('finalContract');
        break;
      default:
        setStep('jobOffer');
    }
    setShowWarning(false);
  };

  const renderQuestion = () => {
    const renderChoices = (yesAction: () => void, noAction: () => void, warning?: string) => (
      <div className="space-y-4">
        {['yes', 'no'].map((option) => (
          <Card
            key={option}
            className="p-4 md:p-5 cursor-pointer group transition-colors hover:border-foreground/25 hover:bg-accent/40"
            onClick={() => option === 'yes' ? yesAction() : noAction()}
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
                {option === 'no' && showWarning && warning && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {warning}
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
      case 'jobOffer':
        return (
          <>
            <div className="flex items-start gap-4 rounded-3xl border bg-card p-5 md:p-6 shadow-sm">
              <div className="flex-1 space-y-3">
                <p className="text-card-foreground text-base whitespace-pre-line">{t.jobOffer.instruction}</p>
                <h2 className="text-lg md:text-xl font-semibold leading-relaxed text-card-foreground">{t.jobOffer.question}</h2>
              </div>
              <AudioPlayer text={`${t.jobOffer.instruction}\n\n${t.jobOffer.question}`} language={language} />
            </div>
            {renderChoices(
              () => setStep('employerApproval'),
              () => {
                setShowWarning(true);
              },
              t.jobOffer.noMessage
            )}
          </>
        );

      case 'employerApproval':
        return (
          <>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-3xl border bg-card p-5 md:p-6 shadow-sm">
                <p className="flex-1 text-card-foreground text-base">{t.employerApproval.message}</p>
                <AudioPlayer text={t.employerApproval.message} language={language} />
              </div>
            </div>
            <div className="flex items-start justify-between gap-4 rounded-3xl bg-secondary p-5 md:p-6 mt-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold leading-relaxed text-secondary-foreground">{t.employerApproval.question}</h2>
              <AudioPlayer text={t.employerApproval.question} language={language} />
            </div>
            {renderChoices(
              () => setStep('preliminaryAgreement'),
              () => {
                setShowWarning(true);
              },
              t.employerApproval.warning
            )}
          </>
        );

      case 'preliminaryAgreement':
        return (
          <>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-3xl border bg-card p-5 md:p-6 shadow-sm">
                <p className="flex-1 text-card-foreground text-base whitespace-pre-line">{t.preliminaryAgreement.message}</p>
                <AudioPlayer text={t.preliminaryAgreement.message} language={language} />
              </div>
            </div>
            <div className="flex items-start justify-between gap-4 rounded-3xl bg-secondary p-5 md:p-6 mt-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold leading-relaxed text-secondary-foreground">{t.preliminaryAgreement.question}</h2>
              <AudioPlayer text={t.preliminaryAgreement.question} language={language} />
            </div>
            {renderChoices(
              () => setStep('entryTime'),
              () => {
                setShowWarning(true);
              },
              t.preliminaryAgreement.warning
            )}
          </>
        );

      case 'entryTime':
        return (
          <>
            <div className="flex items-start justify-between gap-4 rounded-3xl bg-secondary p-5 md:p-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold leading-relaxed text-secondary-foreground">{t.entryTime.question}</h2>
              <AudioPlayer text={t.entryTime.question} language={language} />
            </div>
            {renderChoices(
              () => setStep('finalContract'),
              () => {
                setShowWarning(true);
                setStep('jobOffer');
              },
              t.entryTime.warning
            )}
          </>
        );

      case 'finalContract':
        return (
          <>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-3xl border bg-card p-5 md:p-6 shadow-sm">
                <p className="flex-1 text-card-foreground text-base whitespace-pre-line">{t.finalContract.message}</p>
                <AudioPlayer text={t.finalContract.message} language={language} />
              </div>
            </div>
            <div className="flex items-start justify-between gap-4 rounded-3xl bg-secondary p-5 md:p-6 mt-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold leading-relaxed text-secondary-foreground">{t.finalContract.question}</h2>
              <AudioPlayer text={t.finalContract.question} language={language} />
            </div>
            {renderChoices(
              () => setStep('permit'),
              () => {
                setShowWarning(true);
                setStep('newOffer');
              }
            )}
          </>
        );

      case 'newOffer':
        return (
          <>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-3xl border bg-card p-5 md:p-6 shadow-sm">
                <p className="flex-1 text-card-foreground text-base whitespace-pre-line">{t.finalContract.refusalMessage}</p>
                <AudioPlayer text={t.finalContract.refusalMessage} language={language} />
              </div>
            </div>
            <div className="flex items-start justify-between gap-4 rounded-3xl bg-secondary p-5 md:p-6 mt-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold leading-relaxed text-secondary-foreground">{t.finalContract.newOfferQuestion}</h2>
              <AudioPlayer text={t.finalContract.newOfferQuestion} language={language} />
            </div>
            {renderChoices(
              () => setStep('approval'),
              () => {
                setShowWarning(true);
                setStep('jobOffer');
              },
              t.finalContract.leaveMessage
            )}
          </>
        );

      case 'approval':
        return (
          <>
            <div className="flex items-start justify-between gap-4 rounded-3xl bg-secondary p-5 md:p-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold leading-relaxed text-secondary-foreground">{t.finalContract.approvalQuestion}</h2>
              <AudioPlayer text={t.finalContract.approvalQuestion} language={language} />
            </div>
            {renderChoices(
              () => {
                setShowWarning(false);
                setStep('success');
              },
              () => {
                setShowWarning(true);
                setStep('jobOffer');
              },
              t.finalContract.leaveMessage
            )}
          </>
        );

      case 'permit':
        return (
          <>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-3xl border bg-card p-5 md:p-6 shadow-sm">
                <p className="flex-1 text-card-foreground text-base whitespace-pre-line">{t.finalContract.instructions}</p>
                <AudioPlayer text={t.finalContract.instructions} language={language} />
              </div>
            </div>
            <div className="flex items-start justify-between gap-4 rounded-3xl bg-secondary p-5 md:p-6 mt-6">
              <h2 className="flex-1 text-lg md:text-xl font-semibold leading-relaxed text-secondary-foreground">{t.finalContract.permitQuestion}</h2>
              <AudioPlayer text={t.finalContract.permitQuestion} language={language} />
            </div>
            {renderChoices(
              () => setStep('success'),
              () => {
                setShowWarning(true);
              }
            )}
          </>
        );

      case 'success':
        return (
          <div className="space-y-4">
            <Card className="p-5 md:p-6 border-transparent bg-secondary shadow-none">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-medium text-secondary-foreground leading-relaxed">
                    {t.finalContract.success}
                  </p>
                </div>
                <AudioPlayer text={t.finalContract.success} language={language} />
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <Card className="border-0 bg-transparent p-0 shadow-none">
      <div className="space-y-6">
        {renderQuestion()}
        <div className="flex justify-between">
          <Button
            onClick={onBack}
            className="text-base"
          >
            {translations[language as keyof typeof translations].home}
          </Button>
          <Button
            onClick={handlePrevious}
            variant="outline"
            className="text-base"
          >
            {translations[language as keyof typeof translations].previous}
          </Button>
        </div>
      </div>
    </Card>
  );
}