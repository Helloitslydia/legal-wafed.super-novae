import { Button } from '@/components/ui/button';
import { translations } from '@/lib/translations';

interface FlowNavigationProps {
  language: string;
  onHome?: () => void;
  onPrevious?: () => void;
}

export function FlowNavigation({ language, onHome, onPrevious }: FlowNavigationProps) {
  const t = translations[language as keyof typeof translations];

  return (
    <div className="grid grid-cols-3 items-center">
      <div className="justify-self-start">
        {onPrevious && (
          <Button onClick={onPrevious} variant="outline" className="text-base">
            {t.previous}
          </Button>
        )}
      </div>
      <div className="justify-self-center">
        {onHome && (
          <Button onClick={onHome} className="text-base">
            {t.home}
          </Button>
        )}
      </div>
    </div>
  );
}
