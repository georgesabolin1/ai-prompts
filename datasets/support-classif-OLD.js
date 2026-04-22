const supportTestCasesOLD = [
  {
    id: 'app-crashes-dark-theme-my-vault-shortcut',
    description: 'Support message reporting multiple app issues: crashes, dark theme readability issue, and broken My Vault shortcut',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `J'ai eu plusieurs fois des fermetures de l'application, sans pour autant comprendre pourquoi.

La gestion du thème sombre est perfectible, notamment dans la création d'une nouvelle entrée, les boutons "enregistrer" sont écrits en noir sur fond gris foncé, donc quasiment illisibles. Mais je ne peux pas t'illustrer avec une capture d'écran, elles ne sont pas possible.

Le raccourci "My vault" dans les réglages rapides ne fonctionne plus. Je l'aimais bien celui-là, il était pratique pour accéder à l'appli rapidement. Et l'appui sur ce raccourci provoque une fermeture d'application.`
    },
    expectedOutput: {
      categories: ['bug_report', 'feature_request'],
      signals: ['blocking_issue'],
      subject: 'fermetures de l’application, raccourci My Vault et lisibilité du mode sombre',
      follow_up_questions: [
        'Pouvez-vous préciser à quel moment les fermetures de l’application se produisent le plus souvent, en dehors du raccourci My Vault ?',
        'Pouvez-vous indiquer le modèle de votre appareil ainsi que la version de l’application et du système d’exploitation que vous utilisez ?'
      ]
    }
  },
  {
    id: 'scroll-checkbox-rename-folder-document',
    description: 'Support message about scrolling triggering checkboxes and inability to rename folders or documents',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `lorsque j'utilise l'application et que je veux consulter mes dossiers qui n'apparaissent pas à l'écran (et donc que je scrolle vers le bas), les dossiers se mettent en mode case a cocher et je ne peux pas les ouvrir.(…)Je viens de tester ce soir et cela semble plus facile. Je peux scroller sans que les cases à cocher apparaissent. 🙂 J'ai également remarqué qu'il n'était pas possible de renommer un dossier ou un document depuis l'application.Via le web, on peut renommer mais il faut supprimer le nom du fichier pour y arriver. C'est parfois ennuyant quand on veut juste ajouter une information.`
    },
    expectedOutput: {
      categories: ['bug_report', 'feature_request'],
      signals: [],
      subject: 'défilement des dossiers et renommage des dossiers et documents',
      follow_up_questions: [
        'Pouvez-vous préciser sur quel appareil et quel système d’exploitation vous rencontrez ces problèmes ?',
        'Le problème de renommage concerne-t-il tous les dossiers et documents, ou seulement certains cas ?'
      ]
    }
  },
  {
    id: 'cannot-create-folder-or-rename-files-app',
    description: 'Support message about being unable to create folders or rename files from the app',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Depuis qq temps je n'arrive plus à créer des répertoires ni renommer des fichiers depuis l'appli. Dans les deux cas le champs du nom se referme tout de suite avant que j'ai eu le temps de le renommer. Dans le cas d'un répertoire j'ai ensuite ce message "vous devez nommer votre dossier si vous voulez le sauvegarder..." `
    },
    expectedOutput: {
      categories: ['bug_report'],
      signals: ['blocking_issue'],
      subject: 'création de dossiers et renommage de fichiers dans l’application',
      follow_up_questions: [
        'Pouvez-vous indiquer le modèle de votre appareil ainsi que la version de l’application et du système d’exploitation que vous utilisez ?'
      ]
    }
  },
  {
    id: 'cannot-create-folder-or-rename-files-app-web',
    description: 'Support message about being unable to create folders or rename files from both app and web',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Depuis 1 semaine au moins, il m'est impossible de créer un dossier dans le drive, ni même renommer un fichier. Que ce soit depuis l'application ou depuis le navigateur web.`
    },
    expectedOutput: {
      categories: ['bug_report'],
      signals: ['blocking_issue'],
      subject: 'création de dossiers et renommage de fichiers sur l’application et le web',
      follow_up_questions: [
        'Pouvez-vous préciser quels navigateurs et quels appareils vous utilisez lorsque ce problème se produit ?'
      ]
    }
  },
  {
    id: 'android-cannot-name-folder',
    description: 'Support message about being unable to create a folder on Twake Workplace Android',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `depuis l'application android twake workplace, je ne peux plus créer de dossier. Quand je fais "Créer" - dossier, j'ai le message : "Vous devez nommer votre dossier si vous voulez le sauvegarder. Vos infos n'ont pas été sauvegardées." Mais je ne peux pas entrer de nom de dossier.`
    },
    expectedOutput: {
      categories: ['bug_report'],
      signals: ['blocking_issue'],
      subject: 'création de dossier sur Twake Workplace Android',
      follow_up_questions: [
        'Pouvez-vous indiquer le modèle de votre appareil Android ainsi que la version de l’application utilisée ?'
      ]
    }
  },
  {
    id: 'complaint-about-twake-name-change',
    description: 'Support message expressing dissatisfaction about the Cozy to Twake renaming',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Bon, je n'imaginais pas que changer de drive provoquerait tant de questionnements... J'ai l'impression d'être une sorte de crash test pour Twake en réalité. Perso je pense qu'il n'aurait jamais fallu changer de nom car Cozy était parfait, c'était cool et ça marchait. D'ailleurs l'année dernière le drive se lançait sans aucun souci sur les vieux navigateurs du lycée. Je pense donc que ce nouveau nom y est pour quelque chose... Il est dur, froid... c'est sûr que c'est ça.`
    },
    expectedOutput: {
      categories: ['other'],
      signals: [],
      subject: 'changement de nom de Cozy vers Twake',
      follow_up_questions: []
    }
  },
  {
    id: 'twake-desktop-microsoft-store-paid',
    description: 'Support message asking for help installing Twake Desktop from Microsoft Store',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `J'ai essayé d'installer TwakeDesktop sur l'ordinateur de ma mère mais j'ai dû mal m'y prendre car il m'a été demandé de rechercher l'application dans le Microsoft Store et cela semblait conduire à quelque chose de payant`
    },
    expectedOutput: {
      categories: ['question'],
      signals: [],
      subject: 'installation de Twake Desktop depuis le Microsoft Store',
      follow_up_questions: []
    }
  },
  {
    id: 'family-sharing-pass-crashes-sync-mail-questions',
    description: 'Support message mixing product questions, feature requests and a crash on Twake Pass',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `really like your service and it's interface but I decided to downgrade to the free version because there are some limitations and errors that in the end made it useless for me. But I would really like to use your service if these problems were solved.In that regard I have some questions and.comments that I would appreciate you would answer:- I need a service together with my wife where we can share folders and photo albums between two accounts. The shared folders and albums should appear on both accounts. Is this possible with Twake? I don't see this option on my account- I would also like to share calendars between the accounts. Will this be a possibility in the near future?- The Twake Pass app keeps crashing right after login on my Fairphone 4 with /e/os installed. I can see others have the same problem. Is this something that will be solved?- When trying to use the Twake sync app to sync my contacts I simply don't know which credentials to use for logging in. Can you advice on this?- Will there be a Twake mail service in the near future?With these mentioned services and comments in place I would very much like to use your service. It has the possibility of being a strong European alternative to the American big tech companies.`
    },
    expectedOutput: {
      categories: ['question', 'bug_report', 'feature_request'],
      signals: ['blocking_issue', 'churn_risk'],
      subject: 'account sharing, Twake Pass crashes, and service questions',
      follow_up_questions: [
        'Would you like us to prioritize the Twake Pass crash issue first, or your questions about sharing and synchronization features?',
        'Could you confirm which Twake Pass version you are using on your Fairphone 4 with /e/OS?'
      ]
    }
  },
  {
    id: 'connectors-and-syncs-broken',
    description: 'Support message about broken connectors and syncs over several months',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `utilisateur de Cozy puis maintenant de Twake depuis plusieurs années, je suis confronté aux situations suivantes :- des connecteurs qui ne fonctionnent plus, certains depuis plusieurs mois (ENSAP), voir années (NETFLIX, NESPRESSO)...- des synchronisations qui ne fonctionnent plus avec le Crédit Agricole ou encore plus récemment avec Total Energies...Pourriez-vous faire le nécessaire pour permettre le rétablissement du fonctionnement nominal de l'application et des connecteurs concernés ? Ou a minima, informer sur la reprise du service dans un délais raisonnable ou bien de l'abandon pur et simple des fonctionnalités.Vous remerciant pour votre appui, je me tiens à votre disposition pour toutes démarches ou informations complémentaires que vous estimeriez utiles au rétablissement de la situation qui m'avait conduit à adopter Cozy Cloud.`
    },
    expectedOutput: {
      categories: ['bug_report'],
      signals: ['blocking_issue'],
      subject: 'connecteurs et synchronisations qui ne fonctionnent plus',
      follow_up_questions: []
    }
  },
  {
    id: 'switch-account-to-discovery-offer',
    description: 'Support message asking to switch to a more advantageous offer',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Je viens de créer une instance et je constate que la nouvelle offre est plus avantageuse que l'offre dont je bénéficie actuellement. Actuellement, pas de création de documents avec OnlyOffice possible et le nombre d'appareils est également limité. Pouvez-vous basculer ce compte sur l'offre découverte ?`
    },
    expectedOutput: {
      categories: ['question'],
      signals: [],
      subject: 'basculement de compte vers l’offre découverte',
      follow_up_questions: []
    }
  },
  {
    id: 'suspicious-password-reset-request',
    description: 'Support message about a suspicious password reset request and possible accidental phone interaction',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `– Bonjour, j’ai reçu une demande de réinitialisation du mot de passe, mais ça n’est pas moi qui ai fait la demande ;– heu, je viens de vérifier, la demande provient d’une IP depuis laquelle je vois également des connections de l’application mobile à votre compte. Est-ce que quelqu’un utiliserait votre téléphone à votre insu ?– Je faisais un footing à cette heure, j ai dû laissé mon téléphone déverrouillé dans ma poche et j ai du cliquer n importe où pendant pas mal de temps :/`
    },
    expectedOutput: {
      categories: ['question', 'other'],
      signals: ['blocking_issue'],
      subject: 'demande de réinitialisation de mot de passe et activité suspecte sur le compte',
      follow_up_questions: []
    }
  },
  {
    id: 'bank-app-retired-user-disappointed',
    description: 'Support message expressing dissatisfaction about the retirement of the banking application',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `– Cela fait plus de 140 jours (grosso modo depuis la transition vers Twake) que le connecteur La Banque Postale est indisponible. (…) Cela fera bientôt 4 ans que je suis un client de l'offre cozy, et l'application Banks est le service que je souhaite pouvoir utiliser.– désolé, l’application Banque est partie à la retraite. Mais Twake toussa !– Ces décisions sont tout a fait regrettables. En tant que particulier, je n'aurai aucune utilisation email et chat. Mon utilisation est uniquement Mot de passes, drive et banque. Je vais donc malheureusement devoir chercher une alternative.`
    },
    expectedOutput: {
      categories: ['other', 'bug_report'],
      signals: ['churn_risk'],
      subject: 'arrêt de l’application Banque et conséquences sur votre usage',
      follow_up_questions: []
    }
  },
  {
    id: 'restaurant-review-spam',
    description: 'Promotional message unrelated to support',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `I recently came across your restaurant and was impressed by its charm and quality. I help restaurants like yours collect real customer reviews that enhance visibility, increase bookings, and build lasting trust with diners.`
    },
    expectedOutput: {
      categories: ['other'],
      signals: [],
      subject: 'promotional message unrelated to support',
      follow_up_questions: []
    }
  },
  {
    id: 'double-billing-anomaly',
    description: 'Support message about double monthly billing',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Je viens de constater que depuis un certain temps je suis prélevé deux fois par mois de 2,99 € une fois au nom de CozyCloud et une autre au nom de Easypark SARL Metz. Pouvez-vous m'expliquer cette anomalie ? Il semble que cela se produit depuis le passage vers Twake.`
    },
    expectedOutput: {
      categories: ['question', 'bug_report'],
      signals: ['blocking_issue'],
      subject: 'double prélèvement mensuel depuis le passage vers Twake',
      follow_up_questions: []
    }
  },
  {
    id: 'connectors-no-longer-priority-free-plan',
    description: 'Support message about broken connectors and no longer matching needs',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Fidèle client depuis des années de Cozy, j’appréciai cette possibilité de connecteurs aux différents services administratifs... Force est de constater que ce n'est plus votre priorité... les connecteurs que j'utilise ne sont plus à jour et ne fonctionne pas (EDF, ENSAP, IMPOTS, MAIF, APPR...). Les autres offres (cloud, pass...) ne correspondent pas à mes besoins. Merci pour ces quelques années, en vous souhaitant bonne continuation en restant dans cet esprit d'éthique et des respects des droits utilisateurs que défend LINOAGORA. Je reste cependant client de votre offre gratuite.`
    },
    expectedOutput: {
      categories: ['other', 'bug_report'],
      signals: [],
      subject: 'connecteurs qui ne fonctionnent plus et évolution du service',
      follow_up_questions: []
    }
  },
  {
    id: 'twake-conditions-and-limited-connectors-disappointment',
    description: 'Support message about disappointment with Twake conditions and reduced connectors',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Je suis ennuyé par les nouvelles conditions de twake.J'avais pris cozy cloud, parce que cela me permettait de récupérer automatiquement mes papiers (bulletins de salaires, factures, etc). Au début, je pouvais récupérer tout, maintenant plus que 5 comptes. J'ai choisi de vous soutenir depuis des années , au départ cozy, puis twake, mais j'avoue que je suis déçu par l'évolution du service, d'autant qu'il faut que je reconnecte souvent mes comptes.Je me demande donc si je ne vais pas tout rapatrier sur mon compte infomaniak ou ouvri un compte à la poste pour ça.`
    },
    expectedOutput: {
      categories: ['other', 'bug_report'],
      signals: ['churn_risk'],
      subject: 'nouvelles conditions de Twake et connecteurs limités',
      follow_up_questions: []
    }
  },
  {
    id: 'iphone-cannot-save-anything-and-connectors-broken',
    description: 'Support message about inability to save on iPhone and broken links/connectors',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Depuis que c’est Twake et depuis mon iPhone je ne peux plus rien enregistrer sur Twake. Ça marchait très bien avec cozy. Maintenant ca ne marche plus. Idem pour les liens banque, impôts, etc. Je pense que je vais retourner chez Dropbox ce ça marche mieux.`
    },
    expectedOutput: {
      categories: ['bug_report'],
      signals: ['blocking_issue', 'churn_risk'],
      subject: 'enregistrement sur Twake depuis l’iPhone et liens qui ne fonctionnent plus',
      follow_up_questions: [
        'Pouvez-vous préciser le modèle de votre iPhone ainsi que la version d’iOS et de l’application Twake utilisées ?'
      ]
    }
  },
  {
    id: 'bank-app-no-longer-works-no-communication',
    description: 'Support message about Bank app no longer working and no clear communication',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `L'application Bank ne fonctionne plus, il n'y a rien qui l'indique. C'est en faisant une recherche sur le net que j'ai trouvé un message sur un forum. Idem pour les applications free, crédit mutuel et fortuneo. Ça n'a plus aucune utilité donc et pour le drive je vais le stocker ailleurs.`
    },
    expectedOutput: {
      categories: ['bug_report', 'other'],
      signals: ['blocking_issue', 'churn_risk'],
      subject: 'application Bank et connecteurs qui ne fonctionnent plus',
      follow_up_questions: []
    }
  },
  {
    id: 'ios-login-invalid-credentials-voiceover-altcha',
    description: 'Support message about inability to login after new auth system, with VoiceOver and iOS beta context',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Jusqu'à ce matin j'étais encore connecté sur mon application iOS.J'ai souhaité me déconnecter pour tester le nouveau système… Mais mal m'en a pris… Problème probable avec le nouveau mode de connexions… :J'ai essayé de me connecter avec mon identifiant et mot de passe habituels depuis l'application, depuis le site et ce avec deux navigateurs différents. A chaque fois je reçois invariablement le message "Informations d'identification invalides". J'ai tenté la connexions avec mon nom d'utilisateur, mon adresse courriel, même résultat…J'ai alors essayé de réinitialiser mon mot de passe (alors que mes données sont a priori correctes), mais là encore le système ne reconnaît ni mon courriel de récupération ni même mon numéro de téléphone… m'indiquant en retour qu'aucun compte n'existe avec ce numéro/courriel…Je précise que je suis sous iOS 26.1 bêta et utilise VoiceOver étant non-voyant… ce soucis de connexion pourrait-il être lié au nouveau système d'authentification AltCha et une incompatibilité avec VoiceOver?`
    },
    expectedOutput: {
      categories: ['bug_report', 'question'],
      signals: ['blocking_issue'],
      subject: 'problèmes de connexion au compte et compatibilité avec VoiceOver',
      follow_up_questions: [
        'Pouvez-vous confirmer si le problème se produit aussi depuis un appareil ou navigateur sans VoiceOver ?'
      ]
    }
  },
  {
    id: 'ios-accessibility-follow-up-question',
    description: 'Support follow-up asking whether the iOS app can currently be used and whether accessibility improvements are planned',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `C'est tout à fait ça, c'est la page vers laquelle renvoie également l'application, dois-je en déduire que pour l'instant je ne peut l'utiliser pour me connecter à mon espace ?Si c'est le cas, je vais donc patienter car je l'ai déjà mise à jour.Par ailleurs, savez-vous s'il est prévu des améliorations en matière d'accessibilité pour l'application iOS SVP ?`
    },
    expectedOutput: {
      categories: ['question', 'feature_request'],
      signals: [],
      subject: 'utilisation actuelle de l’application iOS et améliorations d’accessibilité',
      follow_up_questions: []
    }
  },
  {
    id: 'suspend-subscription-data-deletion-question',
    description: 'Support question about whether stored data will be deleted if subscription is suspended',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Vu que le service ne marche pas pour l’instant et que je n’ai pas de solution à mon problème, si je suspend mon abonnement est ce que ce que j’ai stocké sera supprimé car je vais retourner chez Dropbox ?`
    },
    expectedOutput: {
      categories: ['question'],
      signals: ['blocking_issue', 'churn_risk'],
      subject: 'suppression éventuelle des données en cas de suspension de l’abonnement',
      follow_up_questions: []
    }
  },
  {
    id: 'bank-function-no-longer-useful-stop-platform',
    description: 'Support message saying the bank function was the main reason for using Cozy/Twake',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `la fonction Banque/ étant la raison pour laquelle j'utilisais Cozy Cloud. Je vais devoir arrêter d'utiliser la plate-forme Quake. De mon point de vue, cette nouvelle offre est dépourvu d'intérêt sans l'hébergement de la fonction Banque. J'ai apprécié l'utilisation de Cozy toutes ces années.`
    },
    expectedOutput: {
      categories: ['other'],
      signals: ['churn_risk'],
      subject: 'absence de fonction Banque dans votre usage du service',
      follow_up_questions: []
    }
  },
  {
    id: 'banque-populaire-maintenance-9-months',
    description: 'Support question about Banque Populaire service being in maintenance for over 9 months',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `nous avons choisi votre plateforme pour pouvoir profiter des applications bancaires. Or cela fait plus de 9 mois que le service "banque populaire" est en maintenance. Pourriez-vous nous dire quand cela devra être réparé?`
    },
    expectedOutput: {
      categories: ['question', 'bug_report'],
      signals: ['blocking_issue'],
      subject: 'maintenance prolongée du service Banque Populaire',
      follow_up_questions: []
    }
  },
  {
    id: 'account-not-recognized-premium-page',
    description: 'Support message about Twake not recognizing the account and redirecting to premium purchase page',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `twake ne semble plus reconnaitre mon compte. Je n'arrive plus a enregistrer des papiers... au moment d enregistré un nouveau papier, il me renvoie sur une page d achat de compte premium`
    },
    expectedOutput: {
      categories: ['bug_report'],
      signals: ['blocking_issue'],
      subject: 'compte non reconnu et redirection vers une offre premium',
      follow_up_questions: []
    }
  },
  {
    id: 'mfa-option-missing',
    description: 'Support question about missing MFA option',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Je ne trouve pas d'option de MFA sur mon compte Twake. Cette option n'est-elle pas proposée ?`
    },
    expectedOutput: {
      categories: ['question'],
      signals: [],
      subject: 'option MFA sur votre compte Twake',
      follow_up_questions: []
    }
  },
  {
    id: 'account-creation-confusion-pass-missing',
    description: 'Support message about confusion between Cozy and Twake, account creation, login issues, and missing password manager',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Mon épouse et moi-même venons de créer un « twake » (je ne comprends pas la différence avec le cozy cloud que j’avais créé pour moi autrefois) bref. Nous avons créé le cozy avec l’identifiant « svitlanabt68 » mais après déconnexion ça ne marche pas, on nous dit que cela n’existe pas.le support me propose de m’aider en marquant l’adresse mail avec laquelle nous avons créé le cozy, mais on ne nous a demandé qu’un numéro de téléphone. De quelle adresse mes mal s’agit-il?Je suis déçu, quand j’avais créé mon cozy cloud, tout était simple. Maintenant il y a des mots anglais, des twake des trucs… En plus lors de la création du « twake » de mon épouse il n’y avais pas d’espace pour la gestion des mots de passe comme sur mon cozy, je voulais avoir un abonnement pour moi et un pour ma femme mais cela me décourage complètement 😦`
    },
    expectedOutput: {
      categories: ['question', 'bug_report'],
      signals: ['blocking_issue'],
      subject: 'création de compte Twake, problèmes de connexion et absence de gestion des mots de passe',
      follow_up_questions: [
        'Pouvez-vous confirmer si le compte a été créé uniquement avec un numéro de téléphone, sans adresse e-mail associée ?'
      ]
    }
  },
  {
    id: 'pass-missing-no-interest-for-wife',
    description: 'Support message expressing frustration because Twake Pass is missing and adoption failed for spouse',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Si on ne dispose pas du pass, cela perd beaucoup de son intérêt. Imaginez, mon épouse est particlulièrement réfractaire au numérique auquel elle ne comprend rien. Je lui vend cozy cloud, j'arrive sans trop de peine à lui vendre de faire deux comptes et un abonnement pour chaque et au moment décisif, patatra, ça ne marche pas. Outre le fait que j'ai l'air bête, elle est désormais convaincu que le numérique est un "attrappe couil...) et que ce n'est pas fait pour elle...`
    },
    expectedOutput: {
      categories: ['other'],
      signals: ['churn_risk'],
      subject: 'absence de Twake Pass et difficultés d’adoption',
      follow_up_questions: []
    }
  },
  {
    id: 'happy-after-difficulties-will-subscribe',
    description: 'Positive support message after difficulties, announcing intention to subscribe',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `je suis vraiment trop content même si c'esst super galère... C'est pour nouis convaicre d'aller chez un hébergeur américain ? ;-) ;-) (…) Bon, je vais prendre un abonnement, pour elle et un pour moi.`
    },
    expectedOutput: {
      categories: ['other'],
      signals: [],
      subject: 'retour positif malgré les difficultés rencontrées',
      follow_up_questions: []
    }
  },
  {
    id: 'changed-phone-cannot-login-cozy-account',
    description: 'Support message about being unable to login on the phone app after changing phone',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `I was using Cozy cloud for a lot of years, and recently you change to twake. Now I changed my phone and install twake app and cannot login with my cozy cloud account. What is hapenning? I have also twake pass working but cannot login through phone app. I will change to Proton if you will not manage this immediately`
    },
    expectedOutput: {
      categories: ['bug_report', 'question'],
      signals: ['blocking_issue', 'churn_risk'],
      subject: 'login to the Twake app after changing phone',
      follow_up_questions: [
        'Could you confirm which phone model, operating system version, and Twake app version you are using?'
      ]
    }
  },
  {
    id: 'organization-server-not-found',
    description: 'Support message about organization server not found after entering a custom Cozy domain',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `after using organization server and typing samo.mycozy.cloud it shows error " Organization server not found".You whould at last inform us... Cozy before was way better and really inovative with better protection. Sadly you sell it to other...`
    },
    expectedOutput: {
      categories: ['bug_report', 'other'],
      signals: ['blocking_issue'],
      subject: 'Organization server not found with a mycozy.cloud domain',
      follow_up_questions: []
    }
  },
  {
    id: 'now-it-works-positive-feedback',
    description: 'Positive message confirming the issue is fixed',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Now it works. Merci. I really like cozy and thought finally found one of the best cloud suite but your promotion was lacking. Wish all good.`
    },
    expectedOutput: {
      categories: ['other'],
      signals: [],
      subject: 'positive feedback after the issue was resolved',
      follow_up_questions: []
    }
  },
  {
    id: 'bugs-and-no-photo-management',
    description: 'Short support message mentioning bugs and lack of photo management',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `quelques bugs, pas de gestion des photos.`
    },
    expectedOutput: {
      categories: ['bug_report', 'feature_request'],
      signals: [],
      subject: 'quelques bugs et absence de gestion des photos',
      follow_up_questions: [
        'Pouvez-vous préciser quels bugs vous rencontrez en priorité ?'
      ]
    }
  },
  {
    id: 'no-bank-connections-anymore',
    description: 'Short support message about no bank connections anymore',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `No connection to banks anymore`
    },
    expectedOutput: {
      categories: ['bug_report'],
      signals: ['blocking_issue'],
      subject: 'loss of bank connections',
      follow_up_questions: [
        'Could you specify which bank connections are no longer working?'
      ]
    }
  },
  {
    id: 'stop-subscription-does-not-meet-needs',
    description: 'Support message stating Twake no longer meets the user needs and subscription will be stopped',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Twake ne répond plus à mes besoins et je vais arrêter mon abonnement.`
    },
    expectedOutput: {
      categories: ['other'],
      signals: ['churn_risk'],
      subject: 'intention d’arrêter votre abonnement',
      follow_up_questions: []
    }
  },
  {
    id: 'stop-subscription-missing-features',
    description: 'Support message stating appreciated features can no longer be maintained and subscription will stop',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Je vais donc prochainement arrêter mon abonnement vu que les fonctionnalités que j'apprécie dans votre suite ne peuvent plus être maintenues.`
    },
    expectedOutput: {
      categories: ['other'],
      signals: ['churn_risk'],
      subject: 'intention d’arrêter votre abonnement en raison des fonctionnalités non maintenues',
      follow_up_questions: []
    }
  },
  {
    id: 'ethical-disagreement-close-account',
    description: 'Support message about ethical disagreement with Twake direction and intent to close account',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `La direction que prend cozy depuis que twake et donc linagora sont impliqués ne m'incite pas à rester chez vous trop longtemps. Dans les mois qui viennent je pense récupérer les dernières données encore stockées chez vous c'est à dire plus grand chose et clore mon compte. Je n'ai pas besoin d'une application de mail, j'ai déjà un nom de domaine et les mails associés. Je n'ai pas non plus besoin d'un tchat basé sur matrix puisque j'ai déjà eu élément matrix et que mes besoins ne vont pas au delà de l'utilisation de signal et d'irc. Si le besoin s'en fait sentir je me recréerais un compte matrix. J'ai beaucoup aimé être sur cozy depuis l'époque de la version test. Je j'aimerai pas rester sur twake. J'ai bien conscience que vos impératifs pour continuer à exister exigent certains changements de direction hélas incompatibles avec mon éthique. Je vous souhaite néanmoins bonne route pour la suite qui se déroulera sans moi. J'ai beaucoup aimé Cozy.conditions générales modifiée suite change cozy vers twake. Les conditions de stockage et de traitement des données ne me conviennent plus.`
    },
    expectedOutput: {
      categories: ['other'],
      signals: ['churn_risk'],
      subject: 'désaccord avec l’évolution de Twake et intention de clôturer votre compte',
      follow_up_questions: []
    }
  },
  {
    id: 'ios-app-totally-bugged',
    description: 'Short support message about iOS app being totally bugged',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Application totalement bugée sur iOS`
    },
    expectedOutput: {
      categories: ['bug_report'],
      signals: ['blocking_issue'],
      subject: 'application iOS totalement bugée',
      follow_up_questions: [
        'Pouvez-vous préciser les principaux dysfonctionnements rencontrés sur l’application iOS ?'
      ]
    }
  },
  {
    id: 'not-user-friendly-vs-kdrive',
    description: 'Support message comparing Twake negatively to kDrive',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Not as user friendly as kDrive. I was lookin for a french open source e2ee alternatives but there are to many trade off...`
    },
    expectedOutput: {
      categories: ['other', 'feature_request'],
      signals: [],
      subject: 'usability compared with kDrive',
      follow_up_questions: []
    }
  },
  {
    id: 'service-suspended-no-longer-useful',
    description: 'Support message stating the service is no longer useful with suspended services',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Avec tous les services suspendus, mycozy n'a plus aucun intérêt pour moi.`
    },
    expectedOutput: {
      categories: ['other'],
      signals: ['churn_risk'],
      subject: 'perte d’intérêt du service',
      follow_up_questions: []
    }
  },
  {
    id: 'no-interest-delete-account-lack-of-communication',
    description: 'Support message about deleting account due to lack of communication and reduced value',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Donc mycosy ne présente plus aucun intérêt à mes yeux. C'est devenu un simple service cloud et j'en ai déjà d'autres plus performants. Je supprime donc mon compte. Dommage du manque de communication de votre part...`
    },
    expectedOutput: {
      categories: ['other'],
      signals: ['churn_risk'],
      subject: 'suppression de compte et manque de communication',
      follow_up_questions: []
    }
  },
  {
    id: 'without-bank-management-no-use',
    description: 'Support message saying service is useless without bank management',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Sans la gestion de la bank cela ne me sert plus à rien.`
    },
    expectedOutput: {
      categories: ['other'],
      signals: ['churn_risk'],
      subject: 'absence de gestion bancaire dans votre usage du service',
      follow_up_questions: []
    }
  },
  {
    id: 'folders-for-passwords-by-theme',
    description: 'Feature request asking for folders to organize passwords by theme',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Serait-il possible d’envisager la création de dossiers pour y ranger les mots de passe par thème ?`
    },
    expectedOutput: {
      categories: ['feature_request'],
      signals: [],
      subject: 'dossiers pour organiser les mots de passe par thème',
      follow_up_questions: []
    }
  },
  {
    id: 'improve-ios-accessibility',
    description: 'Feature request asking to improve accessibility of Twake Workplace for iOS',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `serait-il possible d'améliorer l'accessibilité de l'application Twake Workplace pour iOS en :- étiquetant les boutons : certains ne disposant d'étiquette texte, il est difficile avec VoiceOver (le lecteur d'écran d'Apple) de connaître leur fonction.- ajoutant un moyen, à moins que cela existe déjà et que VoiceOver ne l'ait pas identifié, permettant de revenir à l'écran précédent/l'écran d'accueil de l'application.AMHA, ça ne concerne pas spécifiquement l’AA, l’absence d’étiquette sur les boutons est dans les applis Web.`
    },
    expectedOutput: {
      categories: ['feature_request'],
      signals: [],
      subject: 'accessibilité de Twake Workplace sur iOS',
      follow_up_questions: []
    }
  },
  {
    id: 'google-wallet-payments-refused',
    description: 'Support message about Google Wallet card payments being refused and asking about direct payment',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `alors que tout va bien sur mes comptes et que je paie avec mes cartes en réel et sur internet, tous mes paiements par carte via Google Wallet sont refusés. Puis-je payé en direct ?`
    },
    expectedOutput: {
      categories: ['question', 'bug_report'],
      signals: ['blocking_issue'],
      subject: 'paiements refusés via Google Wallet et possibilité de payer en direct',
      follow_up_questions: []
    }
  },
  {
    id: 'connectors-only-on-smartphone-and-missing-energy-providers',
    description: 'Support message about sensitive services only syncable on smartphone and missing energy connectors',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Plein de services non synchronisables sauf avec un smartphone. Je ne mets JAMAIS des accès aussi sensibles sur un smartphone.Plein de connecteurs administratifs essentiels ne fonctionnent plus.Octopus Energie et Alterna Energie ne sont pas proposés alors qu'ils sont les lauréats de l'opération "Energie mins chère ensemble" de Que Choisir.Pour ce qui est du stockage, j'en ai déjà un à vie sur pCloud.`
    },
    expectedOutput: {
      categories: ['bug_report', 'feature_request'],
      signals: ['blocking_issue'],
      subject: 'connecteurs qui ne fonctionnent plus et absence de certains services énergie',
      follow_up_questions: []
    }
  },
  {
    id: 'cannot-share-document-to-twake-after-transition',
    description: 'Support message about inability to share a document to Twake after the transition',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Depuis le passage à Twake une action est désormais impossible : partager un document (ex une correction écrite au stylet sur le sujet de l activité en utilisant Notability.Auparavant je cliquais sur partager, choisissais Cozy, puis on me demander où je souhaitais enregistrer le doc dans le Cozy.Aujourd’hui quand je clique sur partager, puis Tawke, il ne se passe rien.`
    },
    expectedOutput: {
      categories: ['bug_report'],
      signals: ['blocking_issue'],
      subject: 'partage d’un document vers Twake depuis Notability',
      follow_up_questions: [
        'Pouvez-vous préciser sur quel appareil et quelle version d’iOS ce partage ne fonctionne plus ?'
      ]
    }
  },
  {
    id: 'ipad-workflow-sharing-missing-since-start-year',
    description: 'Follow-up support message explaining the missing iPad export and publication workflow',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Oui exactement, svt je corrige en classe, sur l iPad, avec le stylet, en mm temps que les élèves, puis j exporte afin de publier ensuite dans elea, ce qui permet aux absents de se mettre à jour dès qu ils peuvent.Cela manque depuis le début de l année. J ai la possibilité de passer par le stockage d iOS mais je préférerai utiliser les outils institutionnels.`
    },
    expectedOutput: {
      categories: ['bug_report'],
      signals: ['blocking_issue'],
      subject: 'absence du partage vers Twake dans votre workflow sur iPad',
      follow_up_questions: []
    }
  },
  {
    id: 'android-no-photos-tab',
    description: 'Support message about missing Photos tab on Android app and inability to set up photo sync',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `J'ai aidé mon amie à créer un compte twake, tout fonctionne correctement sur son Mac. Sur le téléphone - Android 15 à jour - nous avons installé l'application Twake par le playstore et connecté le compte. Sur la page d'accueil de l'appli, l'onglet Photos n'est pas présent et nous ne pouvons donc pas demander la synchronisation des photos (le bouton Add ne m'aide pas, je ne sais quelle URL renseigner). Avez-vous une idée de ce que j'ai manqué ?`
    },
    expectedOutput: {
      categories: ['question', 'bug_report'],
      signals: [],
      subject: 'absence de l’onglet Photos sur l’application Android',
      follow_up_questions: []
    }
  },
  {
    id: 'photo-backup-need-and-cozy-features-missed',
    description: 'Support follow-up about photo backup needs and missing Cozy features',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Merci pour ces infos même si elles me désolent un peu. - je lui avais justement vendu la fonction de sauvegardes des photos. Aujourd'hui nous avons installé twake desktop sur le mac, donc avec synchro des dossiers, que nous voulons conserver. Son besoin est de sauvegarder les photos sur le compte et de les effacer du téléphone. A titre perso, j'aimais beaucoup les fonctionnalités de Cozy, surtout les connecteurs edf etc qui faisaient arriver les factures directement sur mon pc.`
    },
    expectedOutput: {
      categories: ['other', 'feature_request'],
      signals: [],
      subject: 'besoin de sauvegarde des photos et fonctionnalités Cozy qui vous manquent',
      follow_up_questions: []
    }
  },
  {
    id: 'google-relance-payment-refused',
    description: 'Support message about Google reporting non-payment despite bank validation',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Je suis relancé par Google pour un non paiement du service Twake auquel je suis abonné (3€/mens). Or j’effectue bien le paiement avec validation auprès de ma banque, mais ensuite, Google affiche un paiement refusé.`
    },
    expectedOutput: {
      categories: ['bug_report', 'question'],
      signals: ['blocking_issue'],
      subject: 'paiement Twake refusé malgré la validation par votre banque',
      follow_up_questions: []
    }
  }
];
