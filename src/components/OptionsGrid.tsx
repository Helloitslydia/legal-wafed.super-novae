import { useOptions } from '@/hooks/useOptions';
import { SituationChat } from './SituationChat';
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
    <SituationChat
      language={language}
      options={options}
      onSelect={handleOptionClick}
    />
  );
}