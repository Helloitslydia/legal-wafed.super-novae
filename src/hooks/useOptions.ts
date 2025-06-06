import { useCallback, useState } from 'react';
import { RegularizationPath } from '@/types';

export function useOptions() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const options = [
    { key: 'foreignWorker', icon: '📝' },
    { key: 'entryLegitimacy', icon: '📋' },
    { key: 'initialWork', icon: '🏢' },
    { key: 'changeEmployer', icon: '👥' },
    { key: 'workPermitRenewal', icon: '📄' },
    { key: 'leaveLibya', icon: '✈️' }
  ];

  const handleOptionClick = useCallback((key: string) => {
    setSelectedOption(key);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedOption(null);
  }, []);

  return { 
    options, 
    selectedOption,
    handleOptionClick,
    handleBack
  };
}