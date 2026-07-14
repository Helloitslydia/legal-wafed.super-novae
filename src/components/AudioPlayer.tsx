import { useEffect, useRef, useState } from 'react';
import { Loader2, Pause, Play, Square, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { speak, TtsHandle, TtsStatus } from '@/lib/tts';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  text: string;
  language: string;
  /** 'compact' : petit bouton discret à intégrer au fil du texte (ex. titre). */
  size?: 'default' | 'compact';
}

const listenLabels: Record<string, string> = {
  en: 'Listen',
  fr: 'Écouter',
  ar: 'استمع',
};

const stopLabels: Record<string, string> = {
  en: 'Stop',
  fr: 'Arrêter',
  ar: 'إيقاف',
};

const pauseLabels: Record<string, string> = {
  en: 'Pause',
  fr: 'Pause',
  ar: 'إيقاف مؤقت',
};

const resumeLabels: Record<string, string> = {
  en: 'Resume',
  fr: 'Reprendre',
  ar: 'متابعة',
};

export function AudioPlayer({ text, language, size = 'default' }: AudioPlayerProps) {
  const [status, setStatus] = useState<TtsStatus>('idle');
  const handleRef = useRef<TtsHandle | null>(null);

  useEffect(() => {
    return () => {
      handleRef.current?.stop();
    };
  }, []);

  const handlePlayStop = () => {
    if (status !== 'idle') {
      handleRef.current?.stop();
      handleRef.current = null;
      return;
    }
    handleRef.current = speak(text, language, setStatus);
  };

  const handlePauseResume = () => {
    if (status === 'speaking') {
      handleRef.current?.pause();
    } else if (status === 'paused') {
      handleRef.current?.resume();
    }
  };

  const compact = size === 'compact';

  return (
    <div className="flex items-center gap-2 shrink-0">
      <Button
        variant={compact ? 'ghost' : 'outline'}
        size="icon"
        onClick={handlePlayStop}
        disabled={status === 'loading'}
        aria-label={status === 'idle' ? (listenLabels[language] ?? listenLabels.en) : (stopLabels[language] ?? stopLabels.en)}
        className={cn(
          'rounded-full shrink-0',
          compact
            ? 'h-8 w-8 text-muted-foreground hover:text-foreground'
            : 'h-12 w-12 md:h-14 md:w-14 bg-card'
        )}
      >
        {status === 'loading' ? (
          <Loader2 className={cn('animate-spin', compact ? 'h-4 w-4' : 'h-6 w-6 md:h-7 md:w-7')} />
        ) : status === 'idle' ? (
          <Volume2 className={compact ? 'h-4 w-4' : 'h-6 w-6 md:h-7 md:w-7'} />
        ) : (
          <Square className={compact ? 'h-3.5 w-3.5' : 'h-5 w-5 md:h-6 md:w-6'} />
        )}
      </Button>
      {(status === 'speaking' || status === 'paused') && (
        <Button
          variant={compact ? 'ghost' : 'outline'}
          size="icon"
          onClick={handlePauseResume}
          aria-label={
            status === 'speaking'
              ? (pauseLabels[language] ?? pauseLabels.en)
              : (resumeLabels[language] ?? resumeLabels.en)
          }
          className={cn(
            'rounded-full shrink-0',
            compact
              ? 'h-8 w-8 text-muted-foreground hover:text-foreground'
              : 'h-9 w-9 md:h-10 md:w-10 bg-card'
          )}
        >
          {status === 'speaking' ? (
            <Pause className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4 md:h-5 md:w-5'} />
          ) : (
            <Play className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4 md:h-5 md:w-5'} />
          )}
        </Button>
      )}
    </div>
  );
}
