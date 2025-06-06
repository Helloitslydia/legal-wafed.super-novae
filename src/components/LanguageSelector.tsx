import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { translations } from '@/lib/translations';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const flags = {
  en: '🇬🇧',
  fr: '🇫🇷',
  ar: '🇱🇾'
};

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="h-12 w-12 md:h-14 md:w-14 rounded-full shrink-0 text-2xl md:text-3xl"
        >
          {flags[currentLanguage]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {Object.keys(translations).map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => onLanguageChange(lang)}
            className={`${currentLanguage === lang ? 'bg-accent' : ''} px-4 py-3 text-base`}
          >
            <span className="mr-2 text-lg">{flags[lang]}</span>
            {translations[currentLanguage].languages[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}