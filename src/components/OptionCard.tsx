import { Card } from '@/components/ui/card';
import { AudioPlayer } from '@/components/AudioPlayer';
import { MouseEvent } from 'react';

interface OptionCardProps {
  icon: string;
  text: string;
  notice?: string;
  language: string;
  onClick: () => void;
}

export function OptionCard({ icon, text, notice, language, onClick }: OptionCardProps) {
  const handleAudioClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      className="group cursor-pointer transition-colors hover:border-foreground/25 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 flex-1 w-full">
            <span className="flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary text-2xl md:text-3xl">
              {icon}
            </span>
            <span className="text-base sm:text-lg md:text-xl font-medium flex-1 text-start">
              {text}
            </span>
          </div>
          <div 
            className="ml-auto w-full sm:w-auto flex justify-end"
            onClick={handleAudioClick}
          >
            <AudioPlayer text={text} language={language} />
          </div>
        </div>
        {notice && (
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground text-start">
              {notice}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}