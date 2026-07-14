import { Card } from '@/components/ui/card';
import { AudioPlayer } from './AudioPlayer';

interface FlowWarningProps {
  message: string;
  language: string;
}

export function FlowWarning({ message, language }: FlowWarningProps) {
  return (
    <Card className="p-5 md:p-6 border-transparent bg-amber-50 shadow-none">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <p className="text-base md:text-lg font-medium text-amber-900 leading-relaxed">
            {message}
          </p>
        </div>
        <AudioPlayer text={message} language={language} />
      </div>
    </Card>
  );
}
