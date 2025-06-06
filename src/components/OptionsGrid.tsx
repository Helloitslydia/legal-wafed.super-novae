import { translations } from '@/lib/translations';
import { OptionCard } from './OptionCard';
import { useOptions } from '@/hooks/useOptions';
import { RegularizationFlow } from './RegularizationFlow';
import { VisaEntryInfo } from './VisaEntryInfo';
import { EmployerChangeFlow } from './EmployerChangeFlow';
import { VisaRenewalFlow } from './VisaRenewalFlow';
import { LeavingLibyaFlow } from './LeavingLibyaFlow';
import { ForeignWorkerFlow } from './ForeignWorkerFlow';
import { WorkPermitRenewalFlow } from './WorkPermitRenewalFlow';
import { EntryLegitimacyFlow } from './EntryLegitimacyFlow';

interface OptionsGridProps {
  language: string;
}

export function OptionsGrid({ language }: OptionsGridProps) {
  const { options, selectedOption, handleOptionClick, handleBack } = useOptions();
  const t = translations[language];

  if (selectedOption === 'initialWork') {
    return <VisaEntryInfo language={language} onBack={handleBack} />;
  }

  if (selectedOption === 'changeEmployer') {
    return <EmployerChangeFlow language={language} onBack={handleBack} />;
  }

  if (selectedOption === 'leaveLibya') {
    return <LeavingLibyaFlow language={language} onBack={handleBack} />;
  }

  if (selectedOption === 'workPermitRenewal') {
    return <WorkPermitRenewalFlow language={language} onBack={handleBack} />;
  }

  if (selectedOption === 'foreignWorker') {
    return <ForeignWorkerFlow language={language} onBack={handleBack} />;
  }

  if (selectedOption === 'entryLegitimacy') {
    return <EntryLegitimacyFlow language={language} onBack={handleBack} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6">
      {options.map(({ key, icon }) => (
        <OptionCard
          key={key}
          icon={icon}
          text={t[key]}
          notice={undefined}
          language={language}
          onClick={() => handleOptionClick(key)}
        />
      ))}
    </div>
  );
}