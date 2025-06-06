import { Card } from '@/components/ui/card';
import { AudioPlayer } from './AudioPlayer';
import { translations } from '@/lib/translations';
import { Button } from './ui/button';

interface VisaEntryInfoProps {
  language: string;
  onBack: () => void;
}

export function VisaEntryInfo({ language, onBack }: VisaEntryInfoProps) {
  const t = translations[language];

  return (
    <Card className="p-6 md:p-8">
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">
            {t.visaEntry.title}
          </h2>
          <AudioPlayer text={t.visaEntry.title} language={language} />
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-base md:text-lg mb-4">
                {t.visaEntry.description}
              </p>
              <ul className="list-disc list-inside space-y-2">
                {t.visaEntry.steps.map((step, index) => (
                  <li key={index} className="text-base">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
            <AudioPlayer text={t.visaEntry.description} language={language} />
          </div>
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