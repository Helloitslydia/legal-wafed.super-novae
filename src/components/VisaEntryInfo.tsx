import { Card } from '@/components/ui/card';
import { AudioPlayer } from './AudioPlayer';
import { FlowNavigation } from './FlowNavigation';
import { translations } from '@/lib/translations';

interface VisaEntryInfoProps {
  language: string;
  onBack: () => void;
}

export function VisaEntryInfo({ language, onBack }: VisaEntryInfoProps) {
  const t = translations[language];

  return (
    <Card className="border-0 bg-transparent p-0 shadow-none">
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4 rounded-3xl bg-secondary p-5 md:p-6">
          <h2 className="flex-1 text-lg md:text-xl font-semibold leading-relaxed text-secondary-foreground">
            {t.visaEntry.title}
          </h2>
          <AudioPlayer text={t.visaEntry.title} language={language} />
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4 rounded-3xl bg-secondary p-5 md:p-6 text-secondary-foreground">
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

        <FlowNavigation language={language} onHome={onBack} />
      </div>
    </Card>
  );
}