import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { OptionsGrid } from '@/components/OptionsGrid';

export default function App() {
  const [language, setLanguage] = useState('fr');

  return (
    <Layout language={language} onLanguageChange={setLanguage}>
      <OptionsGrid language={language} />
    </Layout>
  );
}