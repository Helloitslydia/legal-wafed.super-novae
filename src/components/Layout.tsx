import { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
  language: string;
  onLanguageChange: (language: string) => void;
}

export function Layout({ children, language, onLanguageChange }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-background ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header 
        language={language}
        onLanguageChange={onLanguageChange}
      />
      <main className="container mx-auto px-4 py-6 md:py-10 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}