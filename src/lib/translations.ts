export const translations = {
  en: {
    title: "Foreign Workers in Libya - Regularization",
    home: "Home",
    previous: "Previous",
    languages: {
      en: "English",
      fr: "French",
      ar: "Arabic"
    },
    regularize: "Regularize",
    foreignWorker: "I am a foreign worker outside Libya and I want to work in Libya",
    entryLegitimacy: "Entry legitimacy correction for workers in Libya",
    initialWork: "I have my visa and I'm entering Libya", 
    changeEmployer: "I work in Libya and I want to change employer",
    leaveLibya: "I work in Libya and I want to leave the country",
    workPermitRenewal: "I work in Libya and want to renew my work permit and residence visa",
    visaRenewalNotice: "The residence visa renewal request must be submitted 60 days before expiration. For work permits, if it expires, it must be renewed. If not, the visa is cancelled.",
    workPermitRenewalFlow: {
      initialQuestion: {
        question: "Your sponsoring employer must submit a work permit renewal application through the Wafed platform. After the submission of the work permit renewal, did you receive a positive response?",
        warning: "You need to obtain a new job offer from a sponsoring employer. Have you obtained a new job offer?",
        noJobOffer: "Note that you need a job offer to continue the procedure."
      },
      residenceRenewal: {
        question: "You can now submit the application for the residence renewal. Have you submitted the residence renewal application within 60 days before its expiration, via your sponsoring employer through the Wafed platform?",
        success: "The competent authority is in charge of the renewal request.",
        warning: "Please check your status with your employer."
      },
      laborApproval: {
        question: "Have you obtain the approval of the Ministry of Labour to work in Libya?",
        warning: "Note that to proceed you need the MoL approval."
      },
      contract: {
        question: "Have you concluded the new work contract?",
        warning: "Note that to proceed you need to sign a new contract."
      },
      fees: {
        question: "Have you paid the fees and the irregular residence fines, determined by the Passports Department, for each month exceeded?",
        warning: "Make sure to pay all relevant fees and fines to obtain a legal status.",
        success: "Yes, I paid the fees and irregular residence fines. Congratulations! Make sure that your sponsor has completed all these steps through the Wafed Platform. Now you can apply for the residence visa."
      }
    },
    regularizationOptions: {
      outsideLibya: "I am a foreign worker outside Libya and I want to work in Libya"
    },
    foreignWorkerFlow: {
      title: "I am a foreign worker outside Libya and I want to work in Libya (Category A)",
      jobOffer: {
        question: "You must obtain a job offer from:\n\n- A government agency, or\n\n- A company licensed to work in Libya, or\n\n- A citizen with a licensed individual activity (commercial, craft, or professional).\n\nDo you have a job offer?",
        yes: "Yes",
        no: "No",
        noMessage: "You must obtain a job offer. Register on the Wafed platform to search for offers."
      },
      employerApproval: {
        message: "Once the offer is accepted, the employer will request a copy of your passport for a work authorization. This authorization includes approval to work in Libya.",
        question: "Have you received employer approval?",
        warning: "You must wait for employer approval."
      },
      preliminaryAgreement: {
        message: "A copy will be sent to the Libyan embassy in your country. You must:\n- Sign a preliminary agreement provided by the employer.\n- Obtain an entry visa for work.",
        question: "Have you obtained the entry visa?",
        warning: "Wait to sign the preliminary agreement with the employer to obtain the visa."
      },
      entryTime: {
        question: "Did you enter Libya within 45 days of obtaining the visa?",
        warning: "Your visa has expired. You must restart the procedure from the beginning."
      },
      finalContract: {
        message: "Within 90 days of entry:\nYou must conclude the final contract and pay the fees.",
        question: "Has your employer sent you the final contract?",
        refusalMessage: "The employer has refused to finalize the contract.\nTwo options:\n- Leave the country and restart the procedure.\n- Find a new offer.",
        newOfferQuestion: "Have you obtained a new offer?",
        leaveMessage: "You must leave the country and start a new procedure from the beginning.",
        approvalQuestion: "Have you received approval?",
        residenceMessage: "You can now apply for residence.",
        instructions: "Sign the contract.\nThe employer will pay the fees.\nYou will obtain the residence permit.",
        permitQuestion: "Have you obtained the residence permit?",
        success: "Congratulations, you are a regular worker."
      }
    },
    entryLegitimacyFlow: {
      title: "I work in Libya and I have obtained or renewed my passport. I want to correct my entry legitimacy (Category C)",
      initialInfo: {
        message: "Before starting, you should know:\n\n- This procedure is not a guaranteed right and depends on the competent authorities.\n- It assumes that you entered Libya legally with the approval of the authorities.\n- If rejected, you will have to leave the country.",
        question: "Do you understand this and wish to continue with the procedure?",
        no: "You are not interested in this procedure."
      },
      documents: {
        message: "This procedure must be carried out by your sponsoring employer.\nYou must provide them with:\n\n- A valid passport (more than 6 months)\n- Your old passport\n- A recent medical certificate",
        question: "Have you provided all documents to your employer?",
        warning: "Please gather and submit all documents to begin the procedure."
      },
      submission: {
        message: "The employer will submit the entry legitimacy correction request.",
        question: "Has the request been accepted by the authorities?",
        success: "Congratulations! You must now complete the residence procedures by following the procedure for renewing the residence visa.",
        failure: "You must leave the country and apply for an entry visa by following the procedure for a foreign worker residing outside Libya who wishes to work in Libya."
      }
    },
    success: "Everything is in order. Congratulations!",
    hasVisa: {
      question: "Do you have a valid visa?",
      yes: "Yes, I have a valid visa",
      no: "No, I don't have a visa",
      warning: "You must obtain a valid visa before proceeding"
    },
    finalContract: {
      question: "Have you received the final contract from your employer?",
      yes: "Yes, I have received the final contract",
      no: "No, I haven't received the final contract yet",
      warning: "You must receive the final contract from your employer before proceeding"
    },
    visaEntry: {
      title: "Entry into Libya",
      description: "You must enter Libya within 45 days of obtaining the visa. This entry visa is valid for 90 days from the date of entry, during which the following steps must be completed:",
      steps: [
        "The employer must finalize a permanent employment contract with you and pay all required fees.",
        "You must obtain residence visa for employment purposes."
      ]
    },
    changeEmployerFlow: {
      laborOfficeApproval: {
        question: "Have you obtained approval from the Labor Office?",
        warning: "You must obtain approval from the Labor Office."
      },
      potentialEmployer: {
        question: "Have you submitted a request to the potential employer?",
        warning: "You must obtain a request from the potential employer."
      },
      previousEmployer: {
        question: "Have you provided a statement from your previous employer confirming no pending obligations?",
        warning: "You must provide a statement from your previous employer confirming no pending obligations."
      },
      success: "Everything is in order for you to change employers."
    },
    visaRenewalFlow: {
      jobOffer: {
        question: "Do you have a new job offer from a sponsoring employer?",
        warning: "You must have a new job offer from a sponsoring employer."
      },
      laborApproval: {
        question: "Have you obtained approval from the Ministry of Labor to work in Libya?",
        warning: "You must obtain approval from the Ministry of Labor to work in Libya."
      },
      contract: {
        question: "Have you finalized a new employment contract and paid the required fees?",
        warning: "You must finalize a new employment contract and pay the required fees."
      },
      visaStatus: {
        question: "Has your visa already expired, or is your visa still valid for at least 2 months?",
        expired: "My visa has already expired",
        valid: "My visa is still valid",
        warning: "Everything is in order, but you must pay fines for irregular stay, determined by the Passport Department, for each month of overstay.",
        success: "Everything is in order.",
        residenceQuestion: "Do you have a residence visa?",
        residenceYes: "Yes, I have a residence visa",
        residenceNo: "No, I don't have a residence visa",
        residenceWarning: "You must obtain a residence visa"
      }
    },
    leavingLibyaFlow: {
      residenceVisa: {
        question: "Do you have a residence visa?",
        noVisaMessage: "No, I am not legally residing in Libya, and I cannot obtain or renew a residence visa.\nSo you can apply for the Voluntary Return Programme.\nTo register for the Voluntary return Programme, please contact the International Organisation for Migration (IOM)"
      },
      employerDeclaration: {
        question: "Have you obtained an exit visa?",
        warning: "You must obtain your exit visa before leaving the territory"
      },
      exitVisa: {
        message: "Very well, you must leave within 30 days of the exit visa issuance date."
      }
    }
  },
  fr: {
    title: "Travailleurs Etrangers en Libye - Régularisation",
    home: "Accueil",
    previous: "Précédent",
    languages: {
      en: "Anglais",
      fr: "Français",
      ar: "Arabe"
    },
    regularize: "Se régulariser",
    foreignWorker: "Je suis un travailleur étranger en dehors de la Libye et je souhaite travailler en Libye",
    entryLegitimacy: "Je travaille en Libye et j'ai obtenu ou renouvelé mon passeport, et je souhaite corriger la légitimité d'entrée dans le pays",
    initialWork: "J'ai mon visa et j'entre en Libye",
    changeEmployer: "Je travaille en Libye et je souhaite changer d'employeur",
    leaveLibya: "Je travaille en Libye et je souhaite quitter le pays",
    workPermitRenewal: "Je travaille en Libye et je souhaite renouveler mon permis de travail et mon visa de résidence",
    visaRenewalNotice: "La demande de renouvellement du visa de résidence doit être soumise 60 jours avant son expiration. Pour le permis travail, s'il expire, il doit être renouvelé. Si ce n'est pas le cas, le visa est annulé",
    workPermitRenewalFlow: {
      initialQuestion: {
        question: "Votre employeur sponsor doit soumettre une demande de renouvellement de permis de travail via la plateforme Wafed. Après la soumission du renouvellement du permis de travail, avez-vous reçu une réponse positive ?",
        warning: "Vous devez obtenir une nouvelle offre d'emploi d'un employeur sponsor. Avez-vous obtenu une nouvelle offre d'emploi ?",
        noJobOffer: "Notez que vous avez besoin d'une offre d'emploi pour continuer la procédure."
      },
      residenceRenewal: {
        question: "Vous pouvez maintenant soumettre la demande de renouvellement de résidence. Avez-vous soumis la demande de renouvellement de résidence dans les 60 jours avant son expiration, via votre employeur sponsor sur la plateforme Wafed ?",
        success: "L'autorité compétente est en charge de la demande de renouvellement.",
        warning: "Veuillez vérifier votre statut auprès de votre employeur."
      },
      laborApproval: {
        question: "Avez-vous obtenu l'approbation du Ministère du Travail pour travailler en Libye ?",
        warning: "Notez que pour continuer, vous avez besoin de l'approbation du Ministère du Travail."
      },
      contract: {
        question: "Avez-vous conclu le nouveau contrat de travail ?",
        warning: "Notez que pour continuer, vous devez signer un nouveau contrat."
      },
      fees: {
        question: "Avez-vous payé les frais et les amendes de séjour irrégulier, déterminés par le Département des Passeports, pour chaque mois dépassé ?",
        warning: "Assurez-vous de payer tous les frais et amendes pertinents pour obtenir un statut légal.",
        success: "Oui, j'ai payé les frais et les amendes de séjour irrégulier. Félicitations ! Assurez-vous que votre sponsor a complété toutes ces étapes via la plateforme Wafed. Vous pouvez maintenant faire la demande de visa de résidence."
      }
    },
    regularizationOptions: {
      outsideLibya: "Je suis un travailleur étranger à l'extérieur de la Libye et je souhaite travailler en Libye"
    },
    foreignWorkerFlow: {
      title: "Je suis un travailleur étranger hors de Libye et je veux travailler en Libye (Catégorie A)",
      jobOffer: {
        question: "Vous devez obtenir une offre d'emploi de :\n\n- Une agence gouvernementale, ou\n\n- Une entreprise agréée pour travailler en Libye, ou\n\n- Un citoyen avec une activité individuelle agréée (commerciale, artisanale ou professionnelle).\n\nAvez-vous une offre d'emploi ?",
        yes: "Oui",
        no: "Non",
        noMessage: "Vous devez obtenir une offre d'emploi. Inscrivez-vous sur la plateforme Wafed pour chercher des offres."
      },
      employerApproval: {
        message: "Une fois l'offre acceptée, l'employeur demandera une copie de votre passeport pour une autorisation de travail. Cette autorisation comprend l'approbation pour travailler en Libye.",
        question: "Avez-vous reçu l'approbation de l'employeur ?",
        warning: "Vous devez attendre l'approbation de l'employeur."
      },
      preliminaryAgreement: {
        message: "Une copie sera envoyée à l'ambassade de Libye dans votre pays. Vous devez :\n- Signer un accord préliminaire fourni par l'employeur.\n- Obtenir un visa d'entrée pour travail.",
        question: "Avez-vous obtenu le visa d'entrée ?",
        warning: "Attendez de signer l'accord préliminaire avec l'employeur pour obtenir le visa."
      },
      entryTime: {
        question: "Êtes-vous entré en Libye dans les 45 jours après obtention du visa ?",
        warning: "Votre visa a expiré. Vous devez recommencer la procédure depuis le début."
      },
      finalContract: {
        message: "Dans les 90 jours suivant l'entrée :\nVous devez conclure le contrat définitif et payer les frais.",
        question: "Votre employeur vous a-t-il envoyé le contrat final ?",
        refusalMessage: "L'employeur a refusé de finaliser le contrat.\nDeux options :\n- Quitter le pays et recommencer la procédure.\n- Trouver une nouvelle offre.",
        newOfferQuestion: "Avez-vous obtenu une nouvelle offre ?",
        leaveMessage: "Vous devez quitter le pays et recommencer une nouvelle procédure depuis le début.",
        approvalQuestion: "Avez-vous reçu l'approbation ?",
        residenceMessage: "Vous pouvez maintenant demander la résidence.",
        instructions: "Signez le contrat.\nL'employeur paiera les frais.\nVous obtiendrez le titre de séjour.",
        permitQuestion: "Avez-vous obtenu le titre de séjour ?",
        success: "Félicitations, vous êtes un travailleur régulier."
      }
    },
    entryLegitimacyFlow: {
      title: "Je travaille en Libye et j'ai obtenu ou renouvelé mon passeport. Je souhaite corriger la légitimité d'entrée dans le pays (Catégorie C)",
      initialInfo: {
        message: "Avant de commencer, vous devez savoir :\n\n- Cette procédure n'est pas un droit garanti et dépend des autorités compétentes.\n- Elle suppose que vous êtes entré légalement en Libye avec l'approbation des autorités.\n- En cas de rejet, vous devrez quitter le pays.",
        question: "Comprenez-vous cela et souhaitez-vous continuer la procédure ?",
        no: "Vous n'êtes pas intéressé par cette procédure."
      },
      documents: {
        message: "Cette procédure doit être réalisée par votre employeur sponsor.\nVous devez lui fournir :\n\n- Un passeport valide (plus de 6 mois)\n- Votre ancien passeport\n- Un certificat médical récent",
        question: "Avez-vous fourni tous les documents à votre employeur ?",
        warning: "Veuillez rassembler et transmettre tous les documents pour débuter la procédure."
      },
      submission: {
        message: "L'employeur soumettra la demande de correction de la légalité d'entrée.",
        question: "La demande a-t-elle été acceptée par les autorités ?",
        success: "Félicitations ! Vous devez maintenant compléter les procédures de résidence en suivant la procédure de renouvellement du visa de résidence.",
        failure: "Vous devez quitter le pays et faire une demande de visa d'entrée en suivant la procédure pour un travailleur étranger résidant hors de Libye qui souhaite travailler en Libye."
      }
    },
    success: "Tout est en règle. Félicitations !",
    hasVisa: {
      question: "Avez-vous un visa valide ?",
      yes: "Oui, j'ai un visa valide",
      no: "Non, je n'ai pas de visa",
      warning: "Vous devez obtenir un visa valide avant de continuer"
    },
    finalContract: {
      question: "Avez-vous reçu le contrat final de votre employeur ?",
      yes: "Oui, j'ai reçu le contrat final",
      no: "Non, je n'ai pas encore reçu le contrat final",
      warning: "Vous devez recevoir le contrat final de votre employeur avant de continuer"
    },
    visaEntry: {
      title: "Entrée en Libye",
      description: "Vous devez entrer en Libye dans les 45 jours suivant l'obtention du visa. Ce visa d'entrée est valable 90 jours, période durant laquelle les étapes suivantes doivent être réalisées :",
      steps: [
        "L'employeur doit finaliser un contrat de travail permanent avec vous et payer tous les frais requis.",
        "Vous devez obtenir un visa de résidence à des fins professionnelles."
      ]
    },
    changeEmployerFlow: {
      laborOfficeApproval: {
        question: "Avez-vous obtenu l'approbation de l'Office du travail ?",
        warning: "Vous devez obtenir l'approbation de l'Office du travail."
      },
      potentialEmployer: {
        question: "Avez-vous soumis une demande à l'employeur potentiel ?",
        warning: "Vous devez obtenir une demande de l'employeur potentiel."
      },
      previousEmployer: {
        question: "Avez-vous fourni une déclaration de l'ancien employeur confirmant l'absence d'obligations en suspens ?",
        warning: "Vous devez fournir une déclaration de l'ancien employeur confirmant l'absence d'obligations en suspens."
      },
      success: "Tout est en règle pour que vous changiez d'employeur."
    },
    visaRenewalFlow: {
      jobOffer: {
        question: "Avez-vous une nouvelle offre d'emploi d'un employeur sponsor ?",
        warning: "Vous devez avoir une nouvelle offre d'emploi d'un employeur sponsor."
      },
      laborApproval: {
        question: "Avez-vous obtenu l'approbation du ministère du Travail pour exercer un emploi en Libye ?",
        warning: "Vous devez obtenir l'approbation du ministère du Travail pour exercer un emploi en Libye."
      },
      contract: {
        question: "Avez-vous finalisé un nouveau contrat de travail et payé les frais requis ?",
        warning: "Vous devez finaliser un nouveau contrat de travail et payer les frais requis."
      },
      visaStatus: {
        question: "Votre visa a-t-il déjà expiré, ou votre visa est-il encore valide pendant au moins 2 mois ?",
        expired: "Mon visa a déjà expiré",
        valid: "Mon visa est encore valide",
        warning: "Tout est en règle, mais vous devez régler des amendes pour séjour irrégulier, déterminées par le Département des passeports, pour chaque mois de dépassement.",
        success: "Tout est en règle.",
        residenceQuestion: "Avez-vous un visa de résidence ?",
        residenceYes: "Oui, j'ai un visa de résidence",
        residenceNo: "Non, je n'ai pas de visa de résidence",
        residenceWarning: "Vous devez obtenir un visa de résidence"
      }
    },
    leavingLibyaFlow: {
      residenceVisa: {
        question: "Avez-vous un visa de résidence ?",
        noVisaMessage: "Non, je ne réside pas légalement en Libye et je ne peux pas obtenir ou renouveler un visa de résidence.\nVous pouvez donc postuler au Programme de Retour Volontaire.\nPour vous inscrire au Programme de Retour Volontaire, veuillez contacter l'Organisation Internationale pour les Migrations (OIM)"
      },
      employerDeclaration: {
        question: "Avez-vous obtenu un visa de sortie ?",
        warning: "Vous devez obtenir votre visa de sortie, avant de quitter le territoire"
      },
      exitVisa: {
        message: "Très bien, vous devez partir dans les 30 jours suivant la date de délivrance du visa de sortie."
      }
    }
  },
  ar: {
    title: "العمال الأجانب في ليبيا - التسوية",
    home: "الرئيسية",
    previous: "السابق",
    languages: {
      en: "الإنجليزية",
      fr: "الفرنسية",
      ar: "العربية"
    },
    regularize: "تسوية الوضع",
    foreignWorker: "أنا عامل أجنبي خارج ليبيا وأريد العمل في ليبيا",
    entryLegitimacy: "تصحيح شرعية الدخول للعاملين في ليبيا",
    initialWork: "لدي تأشيرة وأدخل ليبيا",
    changeEmployer: "أعمل في ليبيا وأريد تغيير صاحب العمل",
    leaveLibya: "أعمل في ليبيا وأريد مغادرة البلاد",
    workPermitRenewal: "أعمل في ليبيا وأريد تجديد تصريح العمل وتأشيرة الإقامة",
    visaRenewalNotice: "يجب تقديم طلب تجديد تأشيرة الإقامة قبل 60 يوماً من انتهائها. بالنسبة لتصريح العمل، إذا انتهت صلاحيته، يجب تجديده. إذا لم يتم ذلك، تُلغى التأشيرة",
    workPermitRenewalFlow: {
      initialQuestion: {
        question: "يجب على صاحب العمل الكفيل تقديم طلب تجديد تصريح العمل عبر منصة وافد. بعد تقديم طلب تجديد تصريح العمل، هل تلقيت رداً إيجابياً؟",
        warning: "تحتاج إلى الحصول على عرض عمل جديد من صاحب عمل كفيل. هل حصلت على عرض عمل جديد؟",
        noJobOffer: "لاحظ أنك تحتاج إلى عرض عمل للمتابعة في الإجراءات."
      },
      residenceRenewal: {
        question: "يمكنك الآن تقديم طلب تجديد الإقامة. هل قدمت طلب تجديد الإقامة قبل 60 يوماً من انتهائها، عبر صاحب العمل الكفيل على منصة وافد؟",
        success: "السلطة المختصة مسؤولة عن طلب التجديد.",
        warning: "يرجى التحقق من وضعك مع صاحب العمل."
      },
      laborApproval: {
        question: "هل حصلت على موافقة وزارة العمل للعمل في ليبيا؟",
        warning: "لاحظ أنك تحتاج إلى موافقة وزارة العمل للمتابعة."
      },
      contract: {
        question: "هل أبرمت عقد العمل الجديد؟",
        warning: "لاحظ أنك تحتاج إلى توقيع عقد جديد للمتابعة."
      },
      fees: {
        question: "هل دفعت الرسوم وغرامات الإقامة غير النظامية، التي يحددها قسم الجوازات، عن كل شهر تجاوز؟",
        warning: "تأكد من دفع جميع الرسوم والغرامات ذات الصلة للحصول على وضع قانوني.",
        success: "نعم، دفعت الرسوم وغرامات الإقامة غير النظامية. تهانينا! تأكد من أن كفيلك قد أكمل جميع هذه الخطوات عبر منصة وافد. يمكنك الآن التقدم بطلب تأشيرة الإقامة."
      }
    },
    regularizationOptions: {
      outsideLibya: "أنا عامل أجنبي خارج ليبيا وأريد العمل في ليبيا"
    },
    foreignWorkerFlow: {
      title: "أنا عامل أجنبي خارج ليبيا وأريد العمل في ليبيا (الفئة أ)",
      jobOffer: {
        question: "يجب عليك الحصول على عرض عمل من:\n\n- جهة حكومية، أو\n\n- شركة مرخصة للعمل في ليبيا، أو\n\n- مواطن لديه نشاط فردي مرخص (تجاري أو حرفي أو مهني).\n\nهل لديك عرض عمل؟",
        yes: "نعم",
        no: "لا",
        noMessage: "يجب عليك الحصول على عرض عمل. سجل في منصة وافد للبحث عن العروض."
      },
      employerApproval: {
        message: "بمجرد قبول العرض، سيطلب صاحب العمل نسخة من جواز سفرك للحصول على تصريح عمل. يتضمن هذا التصريح الموافقة على العمل في ليبيا.",
        question: "هل تلقيت موافقة صاحب العمل؟",
        warning: "يجب عليك انتظار موافقة صاحب العمل."
      },
      preliminaryAgreement: {
        message: "سيتم إرسال نسخة إلى السفارة الليبية في بلدك. يجب عليك:\n- توقيع اتفاق أولي يقدمه صاحب العمل.\n- الحصول على تأشيرة دخول للعمل.",
        question: "هل حصلت على تأشيرة الدخول؟",
        warning: "انتظر توقيع الاتفاق الأولي مع صاحب العمل للحصول على التأشيرة."
      },
      entryTime: {
        question: "هل دخلت ليبيا خلال 45 يوماً من الحصول على التأشيرة؟",
        warning: "انتهت صلاحية تأشيرتك. يجب عليك إعادة بدء الإجراءات من البداية."
      },
      finalContract: {
        message: "خلال 90 يوماً من الدخول:\nيجب عليك إبرام العقد النهائي ودفع الرسوم.",
        question: "هل أرسل لك صاحب العمل العقد النهائي؟",
        refusalMessage: "رفض صاحب العمل إتمام العقد.\nخياران:\n- مغادرة البلاد وإعادة بدء الإجراءات.\n- البحث عن عرض جديد.",
        newOfferQuestion: "هل حصلت على عرض جديد؟",
        leaveMessage: "يجب عليك مغادرة البلاد وإعادة بدء إجراء جديد من البداية.",
        approvalQuestion: "هل تلقيت الموافقة؟",
        residenceMessage: "يمكنك الآن التقدم بطلب الإقامة.",
        instructions: "وقع العقد.\nسيدفع صاحب العمل الرسوم.\nستحصل على تصريح الإقامة.",
        permitQuestion: "هل حصلت على تصريح الإقامة؟",
        success: "تهانينا، أنت الآن عامل نظامي."
      }
    },
    entryLegitimacyFlow: {
      title: "أعمل في ليبيا وحصلت على جواز سفر جديد أو جددته. أريد تصحيح شرعية دخولي إلى البلاد (الفئة ج)",
      initialInfo: {
        message: "قبل البدء، يجب أن تعرف:\n\n- هذا الإجراء ليس حقاً مضموناً ويعتمد على السلطات المختصة.\n- يفترض أنك دخلت ليبيا بشكل قانوني بموافقة السلطات.\n- في حالة الرفض، سيتعين عليك مغادرة البلاد.",
        question: "هل تفهم هذا وترغب في متابعة الإجراء؟",
        no: "أنت غير مهتم بهذا الإجراء."
      },
      documents: {
        message: "يجب أن يتم هذا الإجراء من قبل صاحب العمل الكفيل.\nيجب عليك تزويده بـ:\n\n- جواز سفر صالح (أكثر من 6 أشهر)\n- جواز سفرك القديم\n- شهادة طبية حديثة",
        question: "هل قدمت جميع المستندات لصاحب العمل؟",
        warning: "يرجى جمع وتقديم جميع المستندات لبدء الإجراء."
      },
      submission: {
        message: "سيقدم صاحب العمل طلب تصحيح شرعية الدخول.",
        question: "هل تمت الموافقة على الطلب من قبل السلطات؟",
        success: "تهانينا! يجب عليك الآن إكمال إجراءات الإقامة باتباع إجراءات تجديد تأشيرة الإقامة.",
        failure: "يجب عليك مغادرة البلاد والتقدم بطلب تأشيرة دخول باتباع إجراءات العامل الأجنبي المقيم خارج ليبيا الذي يرغب في العمل في ليبيا."
      }
    },
    success: "كل شيء في النظام. تهانينا!",
    hasVisa: {
      question: "هل لديك تأشيرة صالحة؟",
      yes: "نعم، لدي تأشيرة صالحة",
      no: "لا، ليس لدي تأشيرة",
      warning: "يجب عليك الحصول على تأشيرة صالحة قبل المتابعة"
    },
    finalContract: {
      question: "هل استلمت العقد النهائي من صاحب العمل؟",
      yes: "نعم، استلمت العقد النهائي",
      no: "لا، لم أستلم العقد النهائي بعد",
      warning: "يجب عليك استلام العقد النهائي من صاحب العمل قبل المتابعة"
    },
    visaEntry: {
      title: "الدخول إلى ليبيا",
      description: "يجب عليك دخول ليبيا خلال 45 يوماً من الحصول على التأشيرة. تأشيرة الدخولتأشيرة الدخول هذه صالحة لمدة 90 يومًا من تاريخ الدخول.ه يجب خلالها إتمام الخطوات التالية:",
      steps: [
        "يجب على صاحب العمل إنهاء عقد عمل دائم معك ودفع جميع الرسوم المطلوبة.",
        "يجب عليك الحصول على تأشيرة إقامة لغرض العمل."
      ]
    },
    changeEmployerFlow: {
      laborOfficeApproval: {
        question: "هل حصلت على موافقة مكتب العمل؟",
        warning: "يجب عليك الحصول على موافقة مكتب العمل."
      },
      potentialEmployer: {
        question: "هل قدمت طلباً إلى صاحب العمل المحتمل؟",
        warning: "يجب عليك الحصول على طلب من صاحب العمل المحتمل."
      },
      previousEmployer: {
        question: "هل قدمت إفادة من صاحب العمل السابق تؤكد عدم وجود التزامات معلقة؟",
        warning: "يجب عليك تقديم إفادة من صاحب العمل السابق تؤكد عدم وجود التزامات معلقة."
      },
      success: "كل شيء في النظام لتغيير صاحب العمل."
    },
    visaRenewalFlow: {
      jobOffer: {
        question: "هل لديك عرض عمل جديد من صاحب عمل كفيل؟",
        warning: "يجب أن يكون لديك عرض عمل جديد من صاحب عمل كفيل."
      },
      laborApproval: {
        question: "هل حصلت على موافقة وزارة العمل للعمل في ليبيا؟",
        warning: "يجب عليك الحصول على موافقة وزارة العمل للعمل في ليبيا."
      },
      contract: {
        question: "هل أنهيت عقد العمل الجديد ودفعت الرسوم المطلوبة؟",
        warning: "يجب عليك إنهاء عقد العمل الجديد ودفع الرسوم المطلوبة."
      },
      visaStatus: {
        question: "هل انتهت صلاحية تأشيرتك بالفعل، أم ما زالت صالحة لمدة شهرين على الأقل؟",
        expired: "انتهت صلاحية تأشيرتي بالفعل",
        valid: "تأشيرتي ما زالت صالحة لمدة شهرين على الأقل",
        warning: "كل شيء في النظام، ولكن يجب عليك دفع غرامات الإقامة غير النظامية، التي يحددها قسم الجوازات، عن كل شهر تجاوز.",
        success: "كل شيء في النظام.",
        residenceQuestion: "هل لديك تأشيرة إقامة؟",
        residenceYes: "نعم، لدي تأشيرة إقامة",
        residenceNo: "لا، ليس لدي تأشيرة إقامة",
        residenceWarning: "يجب عليك الحصول على تأشيرة إقامة"
      }
    },
    leavingLibyaFlow: {
      residenceVisa: {
        question: "هل لديك تأشيرة إقامة؟",
        noVisaMessage: "لا، أنا لا أقيم بشكل قانوني في ليبيا، ولا يمكنني الحصول على تأشيرة إقامة أو تجديدها.\nلذلك يمكنك التقدم لبرنامج العودة الطوعية.\nللتسجيل في برنامج العودة الطوعية، يرجى الاتصال بالمنظمة الدولية للهجرة"
      },
      employerDeclaration: {
        question: "هل حصلت على تأشيرة خروج؟",
        warning: "يجب عليك الحصول على تأشيرة الخروج قبل مغادرة الأراضي"
      },
      exitVisa: {
        message: "حسناً، يجب عليك المغادرة خلال 30 يوماً من تاريخ إصدار تأشيرة الخروج."
      }
    }
  }
};