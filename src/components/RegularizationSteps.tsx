import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AudioPlayer } from './AudioPlayer';
import { regularizationFlows } from '@/data/regularizationFlows';
import { translations } from '@/lib/translations';

interface RegularizationStepsProps {
  path: 'outsideLibya';
  language: string;
  onNext?: () => void;
  onBack: () => void;
}

export function RegularizationSteps({ path, language, onBack }: RegularizationStepsProps) {
  const flow = regularizationFlows[path];
  const [showVisa, setShowVisa] = useState(false);
  const [showResidenceVisa, setShowResidenceVisa] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const t = translations[language];

  const handleOptionSelect = () => {
    setShowResidenceVisa(true);
  };

  const handleResidenceVisaAnswer = (hasResidenceVisa: boolean) => {
    if (hasResidenceVisa) {
      setShowVisa(true);
      setShowResidenceVisa(false);
    } else {
      setShowWarning(true);
    }
  };

  const handleVisaAnswer = (hasVisa: boolean) => {
    if (hasVisa) {
      setShowContract(true);
      setShowVisa(false);
    } else {
      setShowWarning(true);
    }
  };

  const handleContractAnswer = (hasContract: boolean) => {
    if (hasContract) {
      setShowContract(false);
      setShowSuccess(true);
    } else {
      setShowWarning(true);
    }
  };

  if (showSuccess) {
    return (
      <Card className="p-6 md:p-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-lg md:text-xl font-medium text-green-800 leading-relaxed">
                {t.success}
              </p>
            </div>
            <AudioPlayer text={t.success} language={language} />
          </div>

          <div className="flex justify-between">
            <Button onClick={onBack} className="text-base">
              {t.home}
            </Button>
            <Button
              onClick={() => {
                setShowResidenceVisa(false);
                setShowWarning(false);
              }}
              variant="outline"
              className="text-base"
            >
              {t.previous}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (showResidenceVisa) {
    return (
      <Card className="p-6 md:p-8">
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">{t.leavingLibyaFlow.residenceVisa.question}</h2>
            <AudioPlayer text={t.leavingLibyaFlow.residenceVisa.question} language={language} />
          </div>

          <div className="space-y-4">
            {['yes', 'no'].map((option) => (
              <Card
                key={option}
                className="p-4 md:p-6 cursor-pointer group transition-colors hover:border-primary/40 hover:bg-accent/40"
                onClick={() => handleResidenceVisaAnswer(option === 'yes')}
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
                        {t.visaStatus.residenceWarning}
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

          <div className="flex justify-between">
            <Button onClick={onBack} className="text-base">
              {t.home}
            </Button>
            <Button
              onClick={() => {
                setShowResidenceVisa(false);
                setShowWarning(false);
              }}
              variant="outline"
              className="text-base"
            >
              {t.previous}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (showContract) {
    return (
      <Card className="p-6 md:p-8">
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">{t.finalContract.question}</h2>
            <AudioPlayer text={t.finalContract.question} language={language} />
          </div>

          <div className="space-y-4">
            {['yes', 'no'].map((option) => (
              <Card
                key={option}
                className="p-4 md:p-6 cursor-pointer group transition-colors hover:border-primary/40 hover:bg-accent/40"
                onClick={() => handleContractAnswer(option === 'yes')}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="text-base md:text-lg font-medium group-hover:text-primary transition-colors">
                      {t.finalContract[option]}
                    </p>
                    {option === 'no' && showWarning && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t.finalContract.warning}
                      </p>
                    )}
                  </div>
                  <AudioPlayer
                    text={t.finalContract[option]}
                    language={language}
                  />
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-between">
            <Button onClick={onBack} className="text-base">
              {t.home}
            </Button>
            <Button
              onClick={() => {
                setShowContract(false);
                setShowVisa(true);
                setShowWarning(false);
              }}
              variant="outline"
              className="text-base"
            >
              {t.previous}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (showVisa) {
    return (
      <Card className="p-6 md:p-8">
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-semibold">{t.hasVisa.question}</h2>
            <AudioPlayer text={t.hasVisa.question} language={language} />
          </div>

          <div className="space-y-4">
            {['yes', 'no'].map((option) => (
              <Card
                key={option}
                className="p-4 md:p-6 cursor-pointer group transition-colors hover:border-primary/40 hover:bg-accent/40"
                onClick={() => handleVisaAnswer(option === 'yes')}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="text-base md:text-lg font-medium group-hover:text-primary transition-colors">
                      {t.hasVisa[option]}
                    </p>
                    {option === 'no' && showWarning && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t.hasVisa.warning}
                      </p>
                    )}
                  </div>
                  <AudioPlayer
                    text={t.hasVisa[option]}
                    language={language}
                  />
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-between">
            <Button onClick={onBack} className="text-base">
              {t.home}
            </Button>
            <Button
              onClick={() => setShowVisa(false)}
              variant="outline"
              className="text-base"
            >
              {t.previous}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8">
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">{flow.steps[0].title[language]}</h2>
          <AudioPlayer text={flow.steps[0].title[language]} language={language} />
        </div>

        <div className="space-y-4">
          <Card
            className="p-4 md:p-6 cursor-pointer group transition-colors hover:border-primary/40 hover:bg-accent/40"
            onClick={handleOptionSelect}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-base md:text-lg font-medium group-hover:text-primary transition-colors">
                  {flow.steps[0].options.a[language]}
                </p>
              </div>
              <AudioPlayer
                text={flow.steps[0].options.a[language]}
                language={language}
              />
            </div>
          </Card>
          <Card
            className="p-4 md:p-6 cursor-pointer group transition-colors hover:border-primary/40 hover:bg-accent/40"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-base md:text-lg font-medium group-hover:text-primary transition-colors">
                  {flow.steps[0].options.b[language]}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {flow.steps[0].options.warning[language]}
                </p>
              </div>
              <AudioPlayer
                text={flow.steps[0].options.b[language]}
                language={language}
              />
            </div>
          </Card>
        </div>

        <div className="flex justify-between">
          <Button onClick={onBack} className="text-base">
            {t.home}
          </Button>
        </div>
      </div>
    </Card>
  );
}