// Moteur de lecture vocale (text-to-speech).
//
// La lecture repose en priorité sur l'API VoiceRSS (https://www.voicerss.org),
// un service TTS qui couvre l'anglais, le français et l'arabe avec des voix
// homogènes sur tous les appareils — contrairement à window.speechSynthesis,
// dont les voix dépendent du système (l'arabe est souvent absent, la voix ne
// correspond pas toujours à la langue demandée, et pause/reprise sont
// inconstants selon les navigateurs).
//
// L'API VoiceRSS nécessite une clé (gratuite) exposée via la variable
// d'environnement VITE_VOICERSS_KEY. Sans clé, ou si la requête échoue
// (hors-ligne, quota atteint), on retombe automatiquement sur
// window.speechSynthesis pour que le bouton d'écoute reste fonctionnel.

export type TtsStatus = 'idle' | 'loading' | 'speaking' | 'paused';

export interface TtsHandle {
  pause(): void;
  resume(): void;
  stop(): void;
}

const VOICERSS_ENDPOINT = 'https://api.voicerss.org/';
const VOICERSS_KEY: string | undefined = import.meta.env.VITE_VOICERSS_KEY;

const voicerssLangs: Record<string, string> = {
  en: 'en-us',
  fr: 'fr-fr',
  ar: 'ar-eg',
};

const browserLangTags: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  ar: 'ar',
};

async function fetchVoicerssAudio(text: string, language: string): Promise<Blob> {
  const params = new URLSearchParams({
    key: VOICERSS_KEY ?? '',
    hl: voicerssLangs[language] ?? voicerssLangs.en,
    src: text,
    c: 'MP3',
    f: '44khz_16bit_mono',
  });
  const response = await fetch(`${VOICERSS_ENDPOINT}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`VoiceRSS HTTP ${response.status}`);
  }
  // VoiceRSS répond 200 avec un corps texte ("ERROR ...") quand la clé est
  // invalide ou le quota dépassé : seul le content-type distingue les cas.
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.startsWith('audio/')) {
    throw new Error(await response.text());
  }
  return response.blob();
}

// Les voix du navigateur se chargent de façon asynchrone (notamment dans
// Chrome) : getVoices() peut être vide au premier appel, d'où ce cache
// rafraîchi par l'événement voiceschanged.
let cachedVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener('voiceschanged', () => {
    cachedVoices = window.speechSynthesis.getVoices();
  });
}

// Le navigateur ne respecte pas toujours utterance.lang avec sa voix par
// défaut (une voix française peut lire le texte anglais) : on choisit donc
// explicitement une voix correspondant à la langue demandée.
function pickVoice(language: string): SpeechSynthesisVoice | undefined {
  const target = (browserLangTags[language] ?? language).toLowerCase();
  const prefix = target.split('-')[0];
  const matching = cachedVoices.filter((v) =>
    v.lang.toLowerCase().replace('_', '-').startsWith(prefix)
  );
  return (
    matching.find((v) => v.lang.toLowerCase().replace('_', '-') === target) ??
    matching.find((v) => v.default) ??
    matching.find((v) => v.localService) ??
    matching[0]
  );
}

export function speak(
  text: string,
  language: string,
  onStatus: (status: TtsStatus) => void
): TtsHandle {
  let stopped = false;
  let audio: HTMLAudioElement | null = null;
  let objectUrl: string | null = null;
  let usingBrowserTts = false;

  const releaseAudio = () => {
    if (audio) {
      audio.onended = null;
      audio.onerror = null;
      audio = null;
    }
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      objectUrl = null;
    }
  };

  const finish = () => {
    releaseAudio();
    if (!stopped) {
      onStatus('idle');
    }
  };

  const startBrowserTts = () => {
    usingBrowserTts = true;
    if (!('speechSynthesis' in window)) {
      onStatus('idle');
      return;
    }
    // Une seule voix à la fois : on annule toute lecture en cours au lieu
    // d'empiler les lectures.
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = browserLangTags[language] ?? browserLangTags.en;
    utterance.rate = 0.95;
    const voice = pickVoice(language);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.onend = finish;
    utterance.onerror = finish;
    onStatus('speaking');
    window.speechSynthesis.speak(utterance);
  };

  if (VOICERSS_KEY) {
    onStatus('loading');
    fetchVoicerssAudio(text, language)
      .then((blob) => {
        if (stopped) {
          return;
        }
        objectUrl = URL.createObjectURL(blob);
        audio = new Audio(objectUrl);
        audio.onended = finish;
        audio.onerror = finish;
        return audio.play().then(() => {
          if (!stopped) {
            onStatus('speaking');
          }
        });
      })
      .catch(() => {
        releaseAudio();
        if (!stopped) {
          startBrowserTts();
        }
      });
  } else {
    startBrowserTts();
  }

  return {
    pause() {
      if (stopped) return;
      if (audio) {
        audio.pause();
      } else if (usingBrowserTts) {
        window.speechSynthesis.pause();
      }
      onStatus('paused');
    },
    resume() {
      if (stopped) return;
      if (audio) {
        void audio.play();
      } else if (usingBrowserTts) {
        window.speechSynthesis.resume();
      }
      onStatus('speaking');
    },
    stop() {
      if (stopped) return;
      stopped = true;
      if (audio) {
        audio.pause();
      }
      releaseAudio();
      if (usingBrowserTts) {
        window.speechSynthesis.cancel();
      }
      onStatus('idle');
    },
  };
}
