interface LanguageStrings {
  en: string;
  fr: string;
  ar: string;
}

export interface RegularizationStep {
  title: LanguageStrings;
  options: {
    a: LanguageStrings;
    b: LanguageStrings;
    warning?: LanguageStrings;
  };
  documents?: string[];
}

export interface RegularizationFlow {
  steps: RegularizationStep[];
}

export type RegularizationPath = 
  | 'outsideLibya'
  | 'insideLibya'
  | 'legalEntry'
  | 'illegalEntry';

export type Language = 'en' | 'fr' | 'ar';

export type TranslationKey = keyof typeof import('@/lib/translations').translations.en;