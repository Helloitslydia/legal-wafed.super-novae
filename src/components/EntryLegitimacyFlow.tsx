import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AudioPlayer } from './AudioPlayer';
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
      case 'initialInfo':
        return (
          <>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <p className="flex-1 text-base whitespace-pre-line">{t.initialInfo.message}</p>
                <AudioPlayer text={t.initialInfo.message} language={language} />
              </div>
            </div>
            <div className="flex items-start justify-between gap-4 mt-6">
              <h2 className="text-xl md:text-2xl font-semibold">{t.initialInfo.question}</h2>
              <AudioPlayer text={t.initialInfo.question} language={language} />
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
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <p className="flex-1 text-base whitespace-pre-line">{t.documents.message}</p>
                <AudioPlayer text={t.documents.message} language={language} />
              </div>
            </div>
            <div className="flex items-start justify-between gap-4 mt-6">
              <h2 className="text-xl md:text-2xl font-semibold">{t.documents.question}</h2>
              <AudioPlayer text={t.documents.question} language={language} />
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
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <p className="flex-1 text-base whitespace-pre-line">{t.submission.message}</p>
                <AudioPlayer text={t.submission.message} language={language} />
              </div>
            </div>
            <div className="flex items-start justify-between gap-4 mt-6">
              <h2 className="text-xl md:text-2xl font-semibold">{t.submission.question}</h2>
              <AudioPlayer text={t.submission.question} language={language} />
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
            <Card className="p-4 md:p-6 border-green-200 bg-green-50">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-lg md:text-xl font-medium text-green-800 leading-relaxed">
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
            <Card className="p-4 md:p-6 border-amber-200 bg-amber-50">
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