import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  text: string;
  language: string;
}

const listenLabels: Record<string, string> = {
  en: 'Listen',
  fr: 'Écouter',
  ar: 'استمع',
};

export function AudioPlayer({ text, language }: AudioPlayerProps) {
  const handlePlay = () => {
    // Une seule voix à la fois : un nouveau clic arrête la lecture en cours
    // au lieu d'empiler les lectures.
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : 'ar';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handlePlay}
      aria-label={listenLabels[language] ?? listenLabels.en}
      className="rounded-full h-12 w-12 md:h-14 md:w-14 shrink-0"
    >
      <Volume2 className="h-6 w-6 md:h-7 md:w-7" />
    </Button>
  );
}
