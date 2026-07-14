import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { AudioPlayer } from './AudioPlayer';
import { FlowNavigation } from './FlowNavigation';
import { FlowWarning } from './FlowWarning';
import { translations } from '@/lib/translations';
import { Language } from '@/types';

interface EntryLegitimacyFlowProps {
  language: Language;
  onBack: () => void;
}

export function EntryLegitimacyFlow({ language, onBack }: EntryLegitimacyFlowProps) {
  const [step, setStep] = useState('initialInfo');
  const t = translations[language as keyof typeof translations].entryLegitimacyFlow;

  const handlePrevious = () => {
    switch (step) {
      case 'initialInfo':
        onBack();
        break;
      case 'documents':
        setStep('initialInfo');
        break;
      case 'submission':
        setStep('documents');
        break;
      default:
        onBack();
    }
  };

  const renderStep = () => {
    const renderChoices = (yesAction: () => void, noAction: () => void, noMessage?: string) => (
      <>
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

        {noMessage && (
          <FlowWarning message={noMessage} language={language} />
        )}
      </>
    );

    switch (step) {
      case 'initialInfo':
        return (
          <>
            <div className="flex items-start gap-4 rounded-3xl border bg-card p-5 md:p-6 shadow-sm">
              <div className="flex-1 space-y-3">
                <p className="text-card-foreground text-base whitespace-pre-line">{t.initialInfo.message}</p>
                <h2 className="text-lg md:text-xl font-semibold leading-relaxed text-card-foreground">{t.initialInfo.question}</h2>
              </div>
              <AudioPlayer text={`${t.initialInfo.message}\n\n${t.initialInfo.question}`} language={language} />
            </div>
            {renderChoices(
              () => setStep('documents'),
              () => onBack(),
              t.initialInfo.no
            )}
          </>
        );

      case 'documents':
        return (
          <>
            <div className="flex items-start gap-4 rounded-3xl border bg-card p-5 md:p-6 shadow-sm">
              <div className="flex-1 space-y-3">
                <p className="text-card-foreground text-base whitespace-pre-line">{t.documents.message}</p>
                <h2 className="text-lg md:text-xl font-semibold leading-relaxed text-card-foreground">{t.documents.question}</h2>
              </div>
              <AudioPlayer text={`${t.documents.message}\n\n${t.documents.question}`} language={language} />
            </div>
            {renderChoices(
              () => setStep('submission'),
              () => onBack(),
              t.documents.warning
            )}
          </>
        );

      case 'submission':
        return (
          <>
            <div className="flex items-start gap-4 rounded-3xl border bg-card p-5 md:p-6 shadow-sm">
              <div className="flex-1 space-y-3">
                <p className="text-card-foreground text-base whitespace-pre-line">{t.submission.message}</p>
                <h2 className="text-lg md:text-xl font-semibold leading-relaxed text-card-foreground">{t.submission.question}</h2>
              </div>
              <AudioPlayer text={`${t.submission.message}\n\n${t.submission.question}`} language={language} />
            </div>
            {renderChoices(
              () => setStep('success'),
              () => setStep('failure')
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
                    {t.submission.success}
                  </p>
                </div>
                <AudioPlayer text={t.submission.success} language={language} />
              </div>
            </Card>
          </div>
        );

      case 'failure':
        return (
          <div className="space-y-4">
            <Card className="p-5 md:p-6 border-transparent bg-amber-50 shadow-none">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-medium text-amber-900 leading-relaxed">
                    {t.submission.failure}
                  </p>
                </div>
                <AudioPlayer text={t.submission.failure} language={language} />
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <Card className="border-0 bg-transparent p-0 shadow-none">
      <div className="space-y-6">
        {renderStep()}
        <FlowNavigation
          language={language}
          onHome={onBack}
          onPrevious={handlePrevious}
        />
      </div>
    </Card>
  );
}