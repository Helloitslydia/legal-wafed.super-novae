import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps {
  text: string;
  language: string;
}

export function AudioPlayer({ text, language }: AudioPlayerProps) {
  const handlePlay = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : 'ar';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Button 
      variant="outline" 
      size="icon"
      onClick={handlePlay}
      className="rounded-full h-12 w-12 md:h-14 md:w-14 shrink-0"
    >
      <Volume2 className="h-6 w-6 md:h-7 md:w-7" />
    </Button>
  );
}