import { translations } from '@/lib/translations';
import { LanguageSelector } from './LanguageSelector';
import { AudioPlayer } from './AudioPlayer';

interface HeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const t = translations[language];

  return (
    <header className="w-full bg-background/90 backdrop-blur border-b border-border/60 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 md:py-5">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="flex items-center">
            <img
              src="https://0976be0a835bf13886cd1d6009c40e57.cdn.bubble.io/f1784051386598x566759155093209860/abvius-logo.png"
              alt="Logo"
              className="h-7 sm:h-8 md:h-9 w-auto object-contain"
            />
          </div>
          <div className="flex-1 flex justify-center">
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-foreground tracking-tight text-center max-w-[600px] leading-normal">
              {t.title}
            </h1>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <AudioPlayer text={t.title} language={language} />
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
}