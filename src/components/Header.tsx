import { ArrowLeft } from 'lucide-react';
import { translations } from '@/lib/translations';
import { LanguageSelector } from './LanguageSelector';
import { AudioPlayer } from './AudioPlayer';
import { Button } from './ui/button';

interface HeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const t = translations[language];

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12"
              asChild
            >
              <a 
                href="https://tandem-project.super-novae.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowLeft className="h-6 w-6" />
              </a>
            </Button>
            <img 
              src="//af394c170e9ffeadce0ce4575f7674d3.cdn.bubble.io/f1687853232507x652947107625050400/logo%20SN.png" 
              alt="Logo"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            />
          </div>
          <div className="flex-1 flex justify-center">
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-primary text-center max-w-[600px] leading-normal">
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