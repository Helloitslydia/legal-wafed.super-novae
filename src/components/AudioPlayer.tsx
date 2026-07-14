import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Square, Volume2 } from 'lucide-react';
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

const langTags: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  ar: 'ar',
};

// Le navigateur ne respecte pas toujours utterance.lang avec sa voix par
// défaut (une voix française peut lire le texte anglais) : on choisit donc
// explicitement une voix correspondant à la langue demandée.
function pickVoice(voices: SpeechSynthesisVoice[], language: string): SpeechSynthesisVoice | undefined {
  const target = (langTags[language] ?? language).toLowerCase();
  const prefix = target.split('-')[0];
  const matching = voices.filter((v) => v.lang.toLowerCase().replace('_', '-').startsWith(prefix));
  return (
    matching.find((v) => v.lang.toLowerCase().replace('_', '-') === target) ??
    matching.find((v) => v.default) ??
    matching.find((v) => v.localService) ??
    matching[0]
  );
}

type PlaybackStatus = 'idle' | 'speaking' | 'paused';

export function AudioPlayer({ text, language }: AudioPlayerProps) {
  const [status, setStatus] = useState<PlaybackStatus>('idle');
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const isActiveRef = useRef(false);

  useEffect(() => {
    // Les voix se chargent de façon asynchrone (notamment dans Chrome) :
    // getVoices() peut être vide au premier appel.
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      if (isActiveRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayStop = () => {
    if (status !== 'idle') {
      window.speechSynthesis.cancel();
      isActiveRef.current = false;
      setStatus('idle');
      return;
    }

    // Une seule voix à la fois : un nouveau clic arrête la lecture en cours
    // au lieu d'empiler les lectures.
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langTags[language] ?? langTags.en;
    utterance.rate = 0.95;
    const voice = pickVoice(voicesRef.current, language);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.onend = () => {
      isActiveRef.current = false;
      setStatus('idle');
    };
    utterance.onerror = () => {
      isActiveRef.current = false;
      setStatus('idle');
    };
    isActiveRef.current = true;
    setStatus('speaking');
    window.speechSynthesis.speak(utterance);
  };

  const handlePauseResume = () => {
    if (status === 'speaking') {
      window.speechSynthesis.pause();
      setStatus('paused');
    } else if (status === 'paused') {
      window.speechSynthesis.resume();
      setStatus('speaking');
    }
  };

  return (
    <div className="flex items-center gap-2 shrink-0">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePlayStop}
        aria-label={status === 'idle' ? (listenLabels[language] ?? listenLabels.en) : (stopLabels[language] ?? stopLabels.en)}
        className="rounded-full h-12 w-12 md:h-14 md:w-14 shrink-0 bg-card"
      >
        {status === 'idle' ? (
          <Volume2 className="h-6 w-6 md:h-7 md:w-7" />
        ) : (
          <Square className="h-5 w-5 md:h-6 md:w-6" />
        )}
      </Button>
      {status !== 'idle' && (
        <Button
          variant="outline"
          size="icon"
          onClick={handlePauseResume}
          aria-label={
            status === 'speaking'
              ? (pauseLabels[language] ?? pauseLabels.en)
              : (resumeLabels[language] ?? resumeLabels.en)
          }
          className="rounded-full h-9 w-9 md:h-10 md:w-10 shrink-0 bg-card"
        >
          {status === 'speaking' ? <Pause className="h-4 w-4 md:h-5 md:w-5" /> : <Play className="h-4 w-4 md:h-5 md:w-5" />}
        </Button>
      )}
    </div>
  );
}
