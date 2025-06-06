import { RegularizationFlow } from '@/types';

export const regularizationFlows: Record<string, RegularizationFlow> = {
  outsideLibya: {
    steps: [
      {
        title: {
          en: 'Step 1: As a Foreigner who wants to work in Libya, you must first receive a job offer (contract) from an employer in Libya',
          fr: 'Étape 1 : En tant qu\'étranger souhaitant travailler en Libye, vous devez d\'abord recevoir une offre d\'emploi (contrat) d\'un employeur en Libye',
          ar: 'الخطوة 1: كأجنبي يرغب في العمل في ليبيا، يجب عليك أولاً الحصول على عرض عمل (عقد) من صاحب عمل في ليبيا'
        },
        options: {
          a: {
            en: 'I already have an employment contract from a Libyan Employer',
            fr: 'J\'ai déjà un contrat de travail avec un employeur libyen',
            ar: 'لدي بالفعل عقد عمل من صاحب عمل ليبي'
          },
          b: {
            en: 'I do not have a contract yet',
            fr: 'Je n\'ai pas encore de contrat de travail',
            ar: 'ليس لدي عقد عمل بعد'
          },
          warning: {
            en: 'Please note that in order to obtain a work visa, you need to have an employment contract first',
            fr: 'Veuillez noter que pour obtenir un visa de travail, vous devez d\'abord avoir un contrat de travail',
            ar: 'يرجى ملاحظة أنه للحصول على تأشيرة عمل، يجب أن يكون لديك عقد عمل أولاً'
          }
        }
      }
      // Additional steps will be added here...
    ]
  }
};