import { FormEvent, KeyboardEvent, useRef, useState } from 'react';
import { ArrowUp, Mic } from 'lucide-react';
import { translations } from '@/lib/translations';
import { AudioPlayer } from './AudioPlayer';
import { cn } from '@/lib/utils';

interface SituationChatProps {
  language: string;
  options: { key: string; icon: string }[];
  onSelect: (key: string) => void;
}

const SPEECH_LANGS: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  ar: 'ar-LY'
};

// Weighted keyword groups (en/fr/ar) used to match a free-text description
// to one of the regularization paths. Higher weight = more specific phrase.
const KEYWORDS: Record<string, { terms: string[]; weight: number }[]> = {
  foreignWorker: [
    { terms: ['outside libya', 'hors de la libye', 'en dehors de la libye', 'خارج ليبيا'], weight: 3 },
    { terms: ['outside', 'abroad', 'hors', 'dehors', 'خارج', 'à l’étranger', "a l'etranger"], weight: 2 },
    { terms: ['want to work in libya', 'travailler en libye', 'أريد العمل في ليبيا'], weight: 1 }
  ],
  entryLegitimacy: [
    { terms: ['entry legitimacy', 'légitimité d’entrée', "legitimite d'entree", 'شرعية الدخول'], weight: 3 },
    { terms: ['legitimacy', 'légitimité', 'legitimite', 'شرعية'], weight: 2 },
    { terms: ['passport', 'passeport', 'جواز'], weight: 2 },
    { terms: ['correct', 'corriger', 'correction', 'تصحيح'], weight: 1 }
  ],
  initialWork: [
    { terms: ['have my visa', 'j’ai mon visa', "j'ai mon visa", 'لدي تأشيرة'], weight: 3 },
    { terms: ['entering', 'enter libya', 'j’entre', "j'entre", 'entrer en libye', 'أدخل', 'دخول ليبيا'], weight: 2 },
    { terms: ['arriving', 'arriver', 'arrivée', 'وصول'], weight: 1 }
  ],
  changeEmployer: [
    { terms: ['change employer', 'changer d’employeur', "changer d'employeur", 'تغيير صاحب العمل'], weight: 3 },
    { terms: ['new employer', 'nouvel employeur', 'صاحب عمل جديد'], weight: 2 },
    { terms: ['employer', 'employeur', 'صاحب العمل'], weight: 1 }
  ],
  leaveLibya: [
    { terms: ['leave the country', 'quitter le pays', 'مغادرة البلاد'], weight: 3 },
    { terms: ['leave', 'leaving', 'quitter', 'partir', 'مغادرة', 'أغادر', 'أترك'], weight: 2 },
    { terms: ['go home', 'rentrer', 'return', 'العودة'], weight: 1 }
  ],
  workPermitRenewal: [
    { terms: ['renew my work permit', 'renouveler mon permis', 'تجديد تصريح العمل'], weight: 3 },
    { terms: ['renew', 'renewal', 'renouveler', 'renouvellement', 'تجديد'], weight: 2 },
    { terms: ['expired', 'expire', 'expiré', 'انتهت', 'منتهية'], weight: 2 },
    { terms: ['work permit', 'permis de travail', 'تصريح العمل'], weight: 1 },
    { terms: ['residence visa', 'visa de résidence', 'تأشيرة الإقامة'], weight: 1 }
  ]
};

function matchSituation(input: string): string | null {
  const text = input.toLowerCase();
  let bestKey: string | null = null;
  let bestScore = 0;

  for (const [key, groups] of Object.entries(KEYWORDS)) {
    let score = 0;
    for (const { terms, weight } of groups) {
      if (terms.some((term) => text.includes(term))) {
        score += weight;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  }

  return bestKey;
}

export function SituationChat({ language, options, onSelect }: SituationChatProps) {
  const t = translations[language];
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState<'noMatch' | 'micUnsupported' | null>(null);
  const [suggestedKey, setSuggestedKey] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (!text.trim()) return;

    const match = matchSituation(text);
    if (match) {
      setSuggestedKey(match);
      setFeedback(null);
    } else {
      setSuggestedKey(null);
      setFeedback('noMatch');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleDictation = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback('micUnsupported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = SPEECH_LANGS[language] ?? 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join(' ');
      setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
    setFeedback(null);
    setListening(true);
    recognition.start();
  };

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="space-y-8 pt-4 md:pt-10">
      <div className="text-center space-y-3">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight max-w-2xl mx-auto leading-snug">
          {t.chatIntro.title}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          {t.chatIntro.anonymityNotice}{' '}
          {/* NGO name blurred on purpose for the demo */}
          <span aria-hidden="true" className="blur-[5px] select-none font-semibold">
            {t.chatIntro.ngoName}
          </span>
        </p>
        <div className="flex justify-center">
          <AudioPlayer text={t.chatIntro.title} language={language} />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">
          {t.chatIntro.suggestionsLabel}
        </p>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {options.map(({ key, icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={cn(
                'inline-flex max-w-full items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm sm:text-base text-start transition-colors',
                suggestedKey === key
                  ? 'border-primary bg-primary/10 ring-2 ring-primary/40'
                  : 'border-border bg-secondary/50 hover:bg-accent hover:border-foreground/25'
              )}
            >
              <span aria-hidden="true">{icon}</span>
              <span>{t[key]}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="rounded-3xl border border-border bg-card shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent p-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder={t.chatIntro.placeholder}
            className="w-full resize-none bg-transparent px-2 py-1.5 text-base outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={toggleDictation}
              aria-label={listening ? t.chatIntro.stopDictation : t.chatIntro.dictate}
              title={listening ? t.chatIntro.stopDictation : t.chatIntro.dictate}
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors',
                listening
                  ? 'bg-destructive text-destructive-foreground border-transparent animate-pulse'
                  : 'border-border hover:bg-accent'
              )}
            >
              <Mic className="h-5 w-5" />
            </button>
            {listening && (
              <span className="text-sm text-muted-foreground">{t.chatIntro.listening}</span>
            )}
            <button
              type="submit"
              disabled={!text.trim()}
              aria-label={t.chatIntro.send}
              title={t.chatIntro.send}
              className="ms-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </form>

      {feedback === 'micUnsupported' && (
        <p className="text-sm text-destructive text-center max-w-2xl mx-auto">
          {t.chatIntro.micUnsupported}
        </p>
      )}
      {feedback === 'noMatch' && (
        <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
          {t.chatIntro.noMatch}
        </p>
      )}
      {suggestedKey && (
        <p className="text-sm text-foreground font-medium text-center max-w-2xl mx-auto">
          {t.chatIntro.suggestionFound}
        </p>
      )}
    </div>
  );
}
