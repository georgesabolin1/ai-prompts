const supportTestCases = [
  {
    id: 'android-create-folder-error',
    description: 'Bug clair mono-topic : création de dossier impossible sur Twake Workplace Android',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `depuis l'application android twake workplace, je ne peux plus créer de dossier. Quand je fais "Créer" - dossier, j'ai le message : "Vous devez nommer votre dossier si vous voulez le sauvegarder. Vos infos n'ont pas été sauvegardées." Mais je ne peux pas entrer de nom de dossier.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'bug',
          tool_or_product: 'Twake Workplace',
          topic_action: 'create',
          topic_object: 'folder',
          topic_label: 'Twake Workplace : create : folder',
          topic_details: {
            feature_or_page: 'folder creation',
            trigger_action: 'click "Créer" - dossier',
            observed_result: 'cannot enter a folder name',
            error_message: "Vous devez nommer votre dossier si vous voulez le sauvegarder. Vos infos n'ont pas été sauvegardées.",
            platform: 'mobile app',
            os: 'Android'
          },
          user_goal: 'User cannot create a folder in Twake Workplace Android app because the folder name field cannot be entered.',
          blocking_issue: 'yes'
        }
      ]
    }
  },

  {
    id: 'conversational-positive-now-works',
    description: 'Follow-up : problème de connexion résolu + signaux relationnels',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Now it works. Merci. I really like cozy and thought finally found one of the best cloud suite but your promotion was lacking. Wish all good.`,
      previous_analysis_output: {
        user_language: 'English',
        warning_comprehension: 'no',
        segments: [
          {
            segment_type: 'topic',
            matched_historical_topic: 'no',
            id_topic: 1,
            topic_category: 'access_security',
            tool_or_product: 'Twake',
            topic_action: 'log in',
            topic_object: 'account',
            topic_label: 'Twake : log in : account',
            topic_details: {
              access_action: 'log in',
              provided_url: 'samo.mycozy.cloud',
              observed_result: 'Organization server not found',
              error_message: 'Organization server not found'
            },
            user_goal: 'User wants to log in to Twake using samo.mycozy.cloud, but the organization server is not found.',
            blocking_issue: 'yes'
          }
        ]
      },
      conversation_logs: [
        {
          id_topic: 1,
          logs: [
            'User: reports organization server not found when typing samo.mycozy.cloud',
            'Bot: asks user to retry after checking the server address'
          ]
        }
      ],
      attempt_history: [
        {
          action: 'retry after checking the server address',
          suggested_by: 'bot',
          outcome: 'unknown'
        }
      ]
    },
    expectedOutput: {
      user_language: 'English',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'yes',
          id_topic: 1,
          topic_category: 'access_security',
          tool_or_product: 'Twake',
          topic_action: 'log in',
          topic_object: 'account',
          topic_label: 'Twake : log in : account',
          topic_details: {
            access_action: 'log in',
            provided_url: 'samo.mycozy.cloud',
            observed_result: 'Organization server not found',
            error_message: 'Organization server not found'
          },
          user_goal: 'User previously could not log in to Twake using samo.mycozy.cloud because the organization server was not found; the issue now works.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Merci. I really like cozy and thought finally found one of the best cloud suite but your promotion was lacking. Wish all good.`,
          signal_types: ['thanks_neutral', 'positive_feedback', 'communication_feedback', 'closure']
        }
      ]
    }
  },

  {
    id: 'billing-double-charge-cozycloud-easypark',
    description: 'Billing clair : double prélèvement mensuel avec montant, devise et deux libellés',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Je viens de constater que depuis un certain temps je suis prélevé deux fois par mois de 2,99 € une fois au nom de CozyCloud et une autre au nom de Easypark SARL Metz. Pouvez-vous m'expliquer cette anomalie ? Il semble que cela se produit depuis le passage vers Twake.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'billing',
          tool_or_product: 'Twake',
          topic_action: 'explain',
          topic_object: 'double monthly charge',
          topic_label: 'Twake : explain : double monthly charge',
          topic_details: {
            billing_issue_type: 'double charge',
            billing_provider: 'CozyCloud, Easypark SARL Metz',
            amount: '2,99',
            currency: '€',
            billing_date_or_period: 'twice a month; since some time; seems since the switch to Twake',
            observed_result: 'user is charged twice per month',
            additional_context: 'Charges appear once under CozyCloud and once under Easypark SARL Metz.'
          },
          user_goal: 'User wants an explanation for being charged twice per month for 2,99 € under CozyCloud and Easypark SARL Metz.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'multi-topic-service-questions-pass-crash-sync-credentials',
    description: 'Message multi-intentions : feedback, questions produit, bug Twake Pass, identifiants Twake Sync',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `really like your service and it's interface but I decided to downgrade to the free version because there are some limitations and errors that in the end made it useless for me. But I would really like to use your service if these problems were solved.In that regard I have some questions and.comments that I would appreciate you would answer:- I need a service together with my wife where we can share folders and photo albums between two accounts. The shared folders and albums should appear on both accounts. Is this possible with Twake? I don't see this option on my account- I would also like to share calendars between the accounts. Will this be a possibility in the near future?- The Twake Pass app keeps crashing right after login on my Fairphone 4 with /e/os installed. I can see others have the same problem. Is this something that will be solved?- When trying to use the Twake sync app to sync my contacts I simply don't know which credentials to use for logging in. Can you advice on this?- Will there be a Twake mail service in the near future?With these mentioned services and comments in place I would very much like to use your service. It has the possibility of being a strong European alternative to the American big tech companies.`
    },
    expectedOutput: {
      user_language: 'English',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `really like your service and it's interface but I decided to downgrade to the free version because there are some limitations and errors that in the end made it useless for me. But I would really like to use your service if these problems were solved.`,
          signal_types: ['positive_feedback', 'negative_feedback', 'disappointment', 'churn_intent']
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'question_faq',
          tool_or_product: 'Twake',
          topic_action: 'share',
          topic_object: 'folders and photo albums between two accounts',
          topic_label: 'Twake : share : folders and photo albums between two accounts',
          topic_details: {
            feature_or_page: 'shared folders and photo albums',
            observed_result: "user does not see this option on their account",
            expected_result: 'shared folders and albums should appear on both accounts',
            question_intent: 'is_it_possible'
          },
          user_goal: 'User asks whether Twake can share folders and photo albums between two accounts so they appear on both accounts.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 2,
          topic_category: 'question_faq',
          tool_or_product: 'Twake',
          topic_action: 'share',
          topic_object: 'calendars between accounts',
          topic_label: 'Twake : share : calendars between accounts',
          topic_details: {
            feature_or_page: 'calendar sharing',
            question_intent: 'future_availability'
          },
          user_goal: 'User asks whether sharing calendars between accounts will be possible in the near future.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 3,
          topic_category: 'bug',
          tool_or_product: 'Twake Pass',
          topic_action: 'crash',
          topic_object: 'app after login',
          topic_label: 'Twake Pass : crash : app after login',
          topic_details: {
            feature_or_page: 'login',
            trigger_action: 'log in',
            observed_result: 'app keeps crashing right after login',
            platform: 'mobile app',
            os: '/e/os',
            device: 'Fairphone 4',
            additional_context: 'User says others have the same problem.'
          },
          user_goal: 'User reports that Twake Pass crashes right after login on a Fairphone 4 with /e/os installed.',
          blocking_issue: 'yes'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 4,
          topic_category: 'question_faq',
          tool_or_product: 'Twake Sync',
          topic_action: 'log in',
          topic_object: 'credentials for contact sync',
          topic_label: 'Twake Sync : log in : credentials for contact sync',
          topic_details: {
            feature_or_page: 'contact sync',
            access_action: 'log in',
            question_intent: 'how_to',
            observed_result: 'user does not know which credentials to use'
          },
          user_goal: 'User asks which credentials to use to log in to Twake Sync for contact synchronization.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 5,
          topic_category: 'question_faq',
          tool_or_product: 'Twake',
          topic_action: 'provide',
          topic_object: 'mail service',
          topic_label: 'Twake : provide : mail service',
          topic_details: {
            feature_or_page: 'mail service',
            question_intent: 'future_availability'
          },
          user_goal: 'User asks whether a Twake mail service will be available in the near future.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `With these mentioned services and comments in place I would very much like to use your service. It has the possibility of being a strong European alternative to the American big tech companies.`,
          signal_types: ['positive_feedback']
        }
      ]
    }
  },

  {
    id: 'connectors-and-bank-sync-long-term-failures',
    description: 'Connecteurs et synchronisations indisponibles depuis longtemps, demande de rétablissement ou d’information',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `utilisateur de Cozy puis maintenant de Twake depuis plusieurs années, je suis confronté aux situations suivantes :- des connecteurs qui ne fonctionnent plus, certains depuis plusieurs mois (ENSAP), voir années (NETFLIX, NESPRESSO)...- des synchronisations qui ne fonctionnent plus avec le Crédit Agricole ou encore plus récemment avec Total Energies...Pourriez-vous faire le nécessaire pour permettre le rétablissement du fonctionnement nominal de l'application et des connecteurs concernés ? Ou a minima, informer sur la reprise du service dans un délais raisonnable ou bien de l'abandon pur et simple des fonctionnalités.Vous remerciant pour votre appui, je me tiens à votre disposition pour toutes démarches ou informations complémentaires que vous estimeriez utiles au rétablissement de la situation qui m'avait conduit à adopter Cozy Cloud.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'bug',
          tool_or_product: 'Twake',
          topic_action: 'restore',
          topic_object: 'connectors and synchronizations',
          topic_label: 'Twake : restore : connectors and synchronizations',
          topic_details: {
            feature_or_page: 'connectors and synchronizations',
            observed_result: 'connectors and synchronizations no longer work',
            frequency: 'some for several months, some for years',
            affected_scope: 'ENSAP, NETFLIX, NESPRESSO, Crédit Agricole, Total Energies',
            additional_context: 'User asks to either restore nominal operation or inform about service recovery or abandonment.'
          },
          user_goal: 'User wants Twake connectors and synchronizations restored or wants information about service recovery or abandonment.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Vous remerciant pour votre appui, je me tiens à votre disposition pour toutes démarches ou informations complémentaires que vous estimeriez utiles au rétablissement de la situation qui m'avait conduit à adopter Cozy Cloud.`,
          signal_types: ['thanks_neutral', 'positive_feedback']
        }
      ]
    }
  },

  {
    id: 'ios-login-reset-altcha-voiceover',
    description: 'Access/security complexe : login impossible, reset impossible, iOS bêta, VoiceOver et AltCha',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Jusqu'à ce matin j'étais encore connecté sur mon application iOS.J'ai souhaité me déconnecter pour tester le nouveau système… Mais mal m'en a pris… Problème probable avec le nouveau mode de connexions… :J'ai essayé de me connecter avec mon identifiant et mot de passe habituels depuis l'application, depuis le site et ce avec deux navigateurs différents. A chaque fois je reçois invariablement le message "Informations d'identification invalides". J'ai tenté la connexions avec mon nom d'utilisateur, mon adresse courriel, même résultat…J'ai alors essayé de réinitialiser mon mot de passe (alors que mes données sont a priori correctes), mais là encore le système ne reconnaît ni mon courriel de récupération ni même mon numéro de téléphone… m'indiquant en retour qu'aucun compte n'existe avec ce numéro/courriel…Je précise que je suis sous iOS 26.1 bêta et utilise VoiceOver étant non-voyant… ce soucis de connexion pourrait-il être lié au nouveau système d'authentification AltCha et une incompatibilité avec VoiceOver?`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'access_security',
          topic_action: 'log in',
          topic_object: 'account',
          topic_label: 'log in : account',
          topic_details: {
            feature_or_page: 'login',
            pre_problem_state: 'was logged in on the iOS app this morning',
            access_action: 'log in',
            auth_method: 'usual username and password; username; email',
            observed_result: 'user receives invalid credentials message every time',
            error_message: "Informations d'identification invalides",
            platform: 'mobile app; website',
            os: 'iOS 26.1 bêta',
            browser: 'two different browsers',
            additional_context: 'User uses VoiceOver and asks whether the issue could be related to the new AltCha authentication system and VoiceOver incompatibility.'
          },
          tested_action: 'reset password',
          outcome_tested_action: 'failed',
          user_goal: 'User cannot log in from the iOS app, website, or two browsers, and password reset does not recognize their recovery email or phone number.',
          blocking_issue: 'yes'
        }
      ]
    }
  },

  {
    id: 'scroll-checkbox-fixed-and-rename-issue',
    description: 'Follow-up : ancien bug de scroll amélioré puis nouveau bug de renommage',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `lorsque j'utilise l'application et que je veux consulter mes dossiers qui n'apparaissent pas à l'écran (et donc que je scrolle vers le bas), les dossiers se mettent en mode case a cocher et je ne peux pas les ouvrir.(…)Je viens de tester ce soir et cela semble plus facile. Je peux scroller sans que les cases à cocher apparaissent. 🙂 J'ai également remarqué qu'il n'était pas possible de renommer un dossier ou un document depuis l'application.Via le web, on peut renommer mais il faut supprimer le nom du fichier pour y arriver. C'est parfois ennuyant quand on veut juste ajouter une information.`,
      previous_analysis_output: {
        user_language: 'French',
        warning_comprehension: 'no',
        segments: [
          {
            segment_type: 'topic',
            matched_historical_topic: 'no',
            id_topic: 1,
            topic_category: 'bug',
            tool_or_product: 'Twake Drive',
            topic_action: 'scroll',
            topic_object: 'folders',
            topic_label: 'Twake Drive : scroll : folders',
            topic_details: {
              feature_or_page: 'folder list',
              trigger_action: 'scroll down to view folders not visible on screen',
              observed_result: 'folders enter checkbox mode and cannot be opened',
              platform: 'mobile app'
            },
            user_goal: 'User wants to scroll through folders in the Twake Drive mobile app, but folders enter checkbox mode and cannot be opened.',
            blocking_issue: 'no'
          }
        ]
      },
      conversation_logs: [
        {
          id_topic: 1,
          logs: [
            'User: reports folder list enters checkbox mode when scrolling down',
            'Bot: asks user to test again after app update'
          ]
        }
      ],
      attempt_history: [
        {
          action: 'test again after app update',
          suggested_by: 'bot',
          outcome: 'unknown'
        }
      ]
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'yes',
          id_topic: 1,
          topic_category: 'bug',
          tool_or_product: 'Twake Drive',
          topic_action: 'scroll',
          topic_object: 'folders',
          topic_label: 'Twake Drive : scroll : folders',
          topic_details: {
            feature_or_page: 'folder list',
            trigger_action: 'scroll down to view folders not visible on screen',
            observed_result: 'folders enter checkbox mode and cannot be opened',
            platform: 'mobile app',
            additional_context: 'User can now scroll without checkboxes appearing.'
          },
          tested_action: 'test again after app update',
          outcome_tested_action: 'worked',
          user_goal: 'User previously had a folder scrolling issue in Twake Drive mobile app; after testing again, scrolling seems easier and checkboxes no longer appear.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 2,
          topic_category: 'bug',
          tool_or_product: 'Twake Drive',
          topic_action: 'rename',
          topic_object: 'folder or document',
          topic_label: 'Twake Drive : rename : folder or document',
          topic_details: {
            feature_or_page: 'folder and document renaming',
            observed_result: 'cannot rename a folder or document from the app',
            platform: 'mobile app',
            additional_context: 'Via web, renaming is possible but requires deleting the file name first.'
          },
          user_goal: 'User cannot rename a folder or document from the app, while web renaming is possible but inconvenient.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'multi-bug-dark-mode-my-vault-crash-no-screenshot',
    description: 'Multi-bugs : fermetures app, thème sombre illisible, raccourci My Vault cassé, capture impossible',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `J'ai eu plusieurs fois des fermetures de l'application, sans pour autant comprendre pourquoi.La gestion du thème sombre est perfectible, notamment dans la création d'une nouvelle entrée, les boutons "enregistrer" sont écrits en noir sur fond gris foncé, donc quasiment illisibles. Mais je ne peux pas t'illustrer avec une capture d'écran, elles ne sont pas possible.Le raccourci "My vault" dans les réglages rapides ne fonctionne plus. Je l'aimais bien celui-là, il était pratique pour accéder à l'appli rapidement. Et l'appui sur ce raccourci provoque une fermeture d'application.`,
      previous_analysis_output: {
        user_language: 'French',
        warning_comprehension: 'no',
        segments: [
          {
            segment_type: 'topic',
            matched_historical_topic: 'no',
            id_topic: 1,
            topic_category: 'bug',
            tool_or_product: 'Twake Pass',
            topic_action: 'display',
            topic_object: 'dark mode',
            topic_label: 'Twake Pass : display : dark mode',
            topic_details: {
              feature_or_page: 'dark mode',
              observed_result: 'some interface elements are hard to read',
              platform: 'mobile app'
            },
            user_goal: 'User wants to use Twake Pass in dark mode, but some interface elements are hard to read.',
            blocking_issue: 'no'
          }
        ]
      },
      conversation_logs: [
        {
          id_topic: 1,
          logs: [
            'User: reports dark mode display issue in Twake Pass',
            'Bot: asks for a screenshot if possible'
          ]
        }
      ]
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 2,
          topic_category: 'bug',
          tool_or_product: 'Twake Pass',
          topic_action: 'close unexpectedly',
          topic_object: 'app',
          topic_label: 'Twake Pass : close unexpectedly : app',
          topic_details: {
            feature_or_page: 'application',
            observed_result: 'app closes unexpectedly',
            frequency: 'several times'
          },
          user_goal: 'User reports that the Twake Pass app has closed unexpectedly several times.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'yes',
          id_topic: 1,
          topic_category: 'bug',
          tool_or_product: 'Twake Pass',
          topic_action: 'display',
          topic_object: 'dark mode',
          topic_label: 'Twake Pass : display : dark mode',
          topic_details: {
            feature_or_page: 'dark mode; new entry creation',
            observed_result: '"enregistrer" buttons are black on a dark grey background and almost unreadable',
            platform: 'mobile app',
            screenshot_available: 'not possible'
          },
          user_goal: 'User wants to use Twake Pass in dark mode, but save buttons in new entry creation are almost unreadable and screenshots are not possible.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 3,
          topic_category: 'bug',
          tool_or_product: 'Twake Pass',
          topic_action: 'use',
          topic_object: 'My vault shortcut',
          topic_label: 'Twake Pass : use : My vault shortcut',
          topic_details: {
            feature_or_page: 'quick settings My vault shortcut',
            trigger_action: 'press My vault shortcut',
            observed_result: 'shortcut no longer works and causes the app to close',
            expected_result: 'quick access to the app'
          },
          user_goal: 'User wants to access Twake Pass quickly through the My vault quick settings shortcut, but pressing it closes the app.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Je l'aimais bien celui-là, il était pratique pour accéder à l'appli rapidement.`,
          signal_types: ['positive_feedback', 'feature_loss_feedback']
        }
      ]
    }
  },

  {
    id: 'notability-share-to-twake-regression',
    description: 'Bug régressif : partage d’un document depuis Notability vers Twake ne déclenche plus rien',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Depuis le passage à Twake une action est désormais impossible : partager un document (ex une correction écrite au stylet sur le sujet de l activité en utilisant Notability.Auparavant je cliquais sur partager, choisissais Cozy, puis on me demander où je souhaitais enregistrer le doc dans le Cozy.Aujourd’hui quand je clique sur partager, puis Tawke, il ne se passe rien.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'bug',
          tool_or_product: 'Twake',
          topic_action: 'share',
          topic_object: 'document from Notability',
          topic_label: 'Twake : share : document from Notability',
          topic_details: {
            feature_or_page: 'document sharing',
            pre_problem_state: 'before switching to Twake, user clicked share, chose Cozy, and was asked where to save the document',
            trigger_action: 'click share, then Twake',
            observed_result: 'nothing happens',
            expected_result: 'user should be asked where to save the document',
            additional_context: 'Document example is a stylus-written correction in Notability.'
          },
          user_goal: 'User cannot share a document from Notability to Twake because nothing happens after selecting Twake.',
          blocking_issue: 'yes'
        }
      ]
    }
  },

  {
    id: 'ios-voiceover-accessibility-improvements',
    description: 'Demande d’amélioration accessibilité : boutons non étiquetés et navigation retour avec VoiceOver',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `serait-il possible d'améliorer l'accessibilité de l'application Twake Workplace pour iOS en :- étiquetant les boutons : certains ne disposant d'étiquette texte, il est difficile avec VoiceOver (le lecteur d'écran d'Apple) de connaître leur fonction.- ajoutant un moyen, à moins que cela existe déjà et que VoiceOver ne l'ait pas identifié, permettant de revenir à l'écran précédent/l'écran d'accueil de l'application.AMHA, ça ne concerne pas spécifiquement l’AA, l’absence d’étiquette sur les boutons est dans les applis Web.`,
      previous_analysis_output: {
        user_language: 'French',
        warning_comprehension: 'no',
        segments: [
          {
            segment_type: 'topic',
            matched_historical_topic: 'no',
            id_topic: 1,
            topic_category: 'request',
            tool_or_product: 'Twake Workplace',
            topic_action: 'improve',
            topic_object: 'iOS accessibility',
            topic_label: 'Twake Workplace : improve : iOS accessibility',
            topic_details: {
              platform: 'iOS',
              additional_context: 'User uses VoiceOver'
            },
            user_goal: 'User wants Twake Workplace iOS accessibility to be improved for VoiceOver.',
            blocking_issue: 'no'
          }
        ]
      },
      conversation_logs: [
        {
          id_topic: 1,
          logs: [
            'User: asks whether iOS accessibility improvements are planned',
            'Bot: asks which accessibility issues are most blocking'
          ]
        }
      ]
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'yes',
          id_topic: 1,
          topic_category: 'request',
          tool_or_product: 'Twake Workplace',
          topic_action: 'improve',
          topic_object: 'iOS accessibility',
          topic_label: 'Twake Workplace : improve : iOS accessibility',
          topic_details: {
            platform: 'iOS',
            gap_observed: 'some buttons have no text label, making it difficult for VoiceOver users to know their function; user wants a way to return to the previous screen or app home screen',
            additional_context: 'User says the missing button labels are also in web apps and not specifically related to AA.'
          },
          user_goal: 'User wants Twake Workplace accessibility improved by labeling buttons for VoiceOver and adding or clarifying navigation back to the previous or home screen.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'app-create-directory-rename-field-closes',
    description: 'Bug mobile : création de répertoire et renommage impossibles car le champ nom se referme',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Depuis qq temps je n'arrive plus à créer des répertoires ni renommer des fichiers depuis l'appli. Dans les deux cas le champs du nom se referme tout de suite avant que j'ai eu le temps de le renommer. Dans le cas d'un répertoire j'ai ensuite ce message "vous devez nommer votre dossier si vous voulez le sauvegarder..."`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'bug',
          topic_action: 'create',
          topic_object: 'directories',
          topic_label: 'create : directories',
          topic_details: {
            feature_or_page: 'directory creation',
            observed_result: 'name field closes immediately before the user has time to enter a name',
            error_message: 'vous devez nommer votre dossier si vous voulez le sauvegarder...',
            platform: 'mobile app',
            frequency: 'since some time'
          },
          user_goal: 'User cannot create directories from the app because the name field closes immediately before they can enter a name.',
          blocking_issue: 'yes'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 2,
          topic_category: 'bug',
          topic_action: 'rename',
          topic_object: 'files',
          topic_label: 'rename : files',
          topic_details: {
            feature_or_page: 'file renaming',
            observed_result: 'name field closes immediately before the user has time to rename the file',
            platform: 'mobile app',
            frequency: 'since some time'
          },
          user_goal: 'User cannot rename files from the app because the name field closes immediately before they can rename them.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'drive-create-folder-rename-file-app-and-browser',
    description: 'Bug app + navigateur : création de dossier et renommage fichier impossibles depuis une semaine',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Depuis 1 semaine au moins, il m'est impossible de créer un dossier dans le drive, ni même renommer un fichier. Que ce soit depuis l'application ou depuis le navigateur web.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'bug',
          tool_or_product: 'Twake Drive',
          topic_action: 'create',
          topic_object: 'folder',
          topic_label: 'Twake Drive : create : folder',
          topic_details: {
            feature_or_page: 'folder creation',
            observed_result: 'cannot create a folder',
            platform: 'mobile app; web',
            frequency: 'since at least 1 week'
          },
          user_goal: 'User cannot create a folder in Twake Drive from either the app or web browser for at least one week.',
          blocking_issue: 'yes'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 2,
          topic_category: 'bug',
          tool_or_product: 'Twake Drive',
          topic_action: 'rename',
          topic_object: 'file',
          topic_label: 'Twake Drive : rename : file',
          topic_details: {
            feature_or_page: 'file renaming',
            observed_result: 'cannot rename a file',
            platform: 'mobile app; web',
            frequency: 'since at least 1 week'
          },
          user_goal: 'User cannot rename a file in Twake Drive from either the app or web browser for at least one week.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'twake-name-negative-feedback-no-actionable-topic',
    description: 'Feedback négatif sur le changement Cozy vers Twake, sans champ support vraiment exploitable',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Bon, je n'imaginais pas que changer de drive provoquerait tant de questionnements... J'ai l'impression d'être une sorte de crash test pour Twake en réalité. Perso je pense qu'il n'aurait jamais fallu changer de nom car Cozy était parfait, c'était cool et ça marchait. D'ailleurs l'année dernière le drive se lançait sans aucun souci sur les vieux navigateurs du lycée. Je pense donc que ce nouveau nom y est pour quelque chose... Il est dur, froid... c'est sûr que c'est ça.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `Bon, je n'imaginais pas que changer de drive provoquerait tant de questionnements... J'ai l'impression d'être une sorte de crash test pour Twake en réalité. Perso je pense qu'il n'aurait jamais fallu changer de nom car Cozy était parfait, c'était cool et ça marchait. D'ailleurs l'année dernière le drive se lançait sans aucun souci sur les vieux navigateurs du lycée. Je pense donc que ce nouveau nom y est pour quelque chose... Il est dur, froid... c'est sûr que c'est ça.`,
          signal_types: ['negative_feedback', 'disappointment', 'complaint_without_actionable_detail']
        }
      ]
    }
  },

  {
    id: 'twake-desktop-install-microsoft-store-paid-confusion',
    description: 'Question installation TwakeDesktop : redirection Microsoft Store semblant payante',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `J'ai essayé d'installer TwakeDesktop sur l'ordinateur de ma mère mais j'ai dû mal m'y prendre car il m'a été demandé de rechercher l'application dans le Microsoft Store et cela semblait conduire à quelque chose de payant`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'question_faq',
          tool_or_product: 'TwakeDesktop',
          topic_action: 'install',
          topic_object: 'desktop app',
          topic_label: 'TwakeDesktop : install : desktop app',
          topic_details: {
            feature_or_page: 'installation',
            trigger_action: 'install TwakeDesktop',
            observed_result: 'user was asked to search for the app in Microsoft Store and it seemed to lead to something paid',
            question_intent: 'how_to',
            platform: 'desktop app'
          },
          user_goal: 'User wants help installing TwakeDesktop after being redirected to Microsoft Store where it seemed paid.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'switch-account-to-discovery-offer',
    description: 'Billing/request : basculer un compte vers l’offre découverte',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Je viens de créer une instance et je constate que la nouvelle offre est plus avantageuse que l'offre dont je bénéficie actuellement. Actuellement, pas de création de documents avec OnlyOffice possible et le nombre d'appareils est également limité. Pouvez-vous basculer ce compte sur l'offre découverte ?`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'billing',
          topic_action: 'switch',
          topic_object: 'account to discovery plan',
          topic_label: 'switch : account to discovery plan',
          topic_details: {
            offer_or_plan: 'discovery plan',
            billing_issue_type: 'plan change request',
            observed_result: 'current offer is less advantageous than the new offer',
            additional_context: 'Current offer does not allow document creation with OnlyOffice and limits the number of devices.'
          },
          user_goal: 'User wants their account switched to the discovery plan because the new offer is more advantageous.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'password-reset-request-accidental-phone-clicks',
    description: 'Follow-up sécurité : demande de reset finalement expliquée par des clics accidentels sur téléphone',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Je faisais un footing à cette heure, j ai dû laissé mon téléphone déverrouillé dans ma poche et j ai du cliquer n importe où pendant pas mal de temps :/`,
      previous_analysis_output: {
        user_language: 'French',
        warning_comprehension: 'no',
        segments: [
          {
            segment_type: 'topic',
            matched_historical_topic: 'no',
            id_topic: 1,
            topic_category: 'access_security',
            topic_action: 'investigate',
            topic_object: 'unexpected password reset request',
            topic_label: 'investigate : unexpected password reset request',
            topic_details: {
              feature_or_page: 'password reset',
              observed_result: 'user received a password reset request they did not initiate'
            },
            user_goal: 'User wants to understand why they received a password reset request they did not initiate.',
            blocking_issue: 'no'
          }
        ]
      },
      conversation_logs: [
        {
          id_topic: 1,
          logs: [
            'User: says they received a password reset request they did not initiate',
            'Bot: says request came from an IP also used by the mobile app and asks whether someone could have used the phone'
          ]
        }
      ]
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'yes',
          id_topic: 1,
          topic_category: 'access_security',
          topic_action: 'investigate',
          topic_object: 'unexpected password reset request',
          topic_label: 'investigate : unexpected password reset request',
          topic_details: {
            feature_or_page: 'password reset',
            observed_result: 'user received a password reset request they did not initiate',
            additional_context: 'User says they were running at that time and may have left their unlocked phone in their pocket, causing accidental clicks.'
          },
          user_goal: 'User received an unexpected password reset request and now says it may have been caused by accidental clicks on an unlocked phone.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `:/`,
          signal_types: ['disappointment']
        }
      ]
    }
  },

  {
    id: 'bank-postale-retired-bank-feature-churn',
    description: 'Feature loss : connecteur La Banque Postale indisponible puis annonce retraite Banque + churn',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Ces décisions sont tout a fait regrettables. En tant que particulier, je n'aurai aucune utilisation email et chat. Mon utilisation est uniquement Mot de passes, drive et banque. Je vais donc malheureusement devoir chercher une alternative.`,
      previous_analysis_output: {
        user_language: 'French',
        warning_comprehension: 'no',
        segments: [
          {
            segment_type: 'topic',
            matched_historical_topic: 'no',
            id_topic: 1,
            topic_category: 'bug',
            tool_or_product: 'Cozy Banks',
            topic_action: 'use',
            topic_object: 'La Banque Postale connector',
            topic_label: 'Cozy Banks : use : La Banque Postale connector',
            topic_details: {
              feature_or_page: 'La Banque Postale connector',
              observed_result: 'connector is unavailable',
              frequency: 'more than 140 days'
            },
            user_goal: 'User wants to use the La Banque Postale connector, unavailable for more than 140 days.',
            blocking_issue: 'no'
          }
        ]
      },
      conversation_logs: [
        {
          id_topic: 1,
          logs: [
            'User: reports La Banque Postale connector unavailable for more than 140 days',
            'Bot: explains the banking application has been retired'
          ]
        }
      ]
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `Ces décisions sont tout a fait regrettables.`,
          signal_types: ['negative_feedback', 'disappointment', 'feature_loss_feedback']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `En tant que particulier, je n'aurai aucune utilisation email et chat. Mon utilisation est uniquement Mot de passes, drive et banque. Je vais donc malheureusement devoir chercher une alternative.`,
          signal_types: ['negative_feedback', 'churn_intent', 'feature_loss_feedback']
        }
      ]
    }
  },

  {
    id: 'restaurant-review-spam-out-of-scope',
    description: 'Scope boundary : message commercial spam pour restaurant',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `I recently came across your restaurant and was impressed by its charm and quality. I help restaurants like yours collect real customer reviews that enhance visibility, increase bookings, and build lasting trust with diners.`
    },
    expectedOutput: {
      user_language: 'English',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'scope_boundary',
          signal_verbatim: `I recently came across your restaurant and was impressed by its charm and quality. I help restaurants like yours collect real customer reviews that enhance visibility, increase bookings, and build lasting trust with diners.`,
          scope_boundary_type: 'spam_or_commercial'
        }
      ]
    }
  },

  {
    id: 'admin-connectors-not-updated-free-plan-closure',
    description: 'Connecteurs administratifs plus à jour + feedback et clôture polie',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Fidèle client depuis des années de Cozy, j’appréciai cette possibilité de connecteurs aux différents services administratifs... Force est de constater que ce n'est plus votre priorité... les connecteurs que j'utilise ne sont plus à jour et ne fonctionne pas (EDF, ENSAP, IMPOTS, MAIF, APPR...). Les autres offres (cloud, pass...) ne correspondent pas à mes besoins. Merci pour ces quelques années, en vous souhaitant bonne continuation en restant dans cet esprit d'éthique et des respects des droits utilisateurs que défend LINOAGORA. Je reste cependant client de votre offre gratuite.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'bug',
          tool_or_product: 'Cozy',
          topic_action: 'use',
          topic_object: 'administrative connectors',
          topic_label: 'Cozy : use : administrative connectors',
          topic_details: {
            feature_or_page: 'administrative connectors',
            observed_result: 'connectors are not up to date and do not work',
            affected_scope: 'EDF, ENSAP, IMPOTS, MAIF, APPR'
          },
          user_goal: 'User reports that administrative connectors such as EDF, ENSAP, IMPOTS, MAIF, and APPR are not up to date and do not work.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Fidèle client depuis des années de Cozy, j’appréciai cette possibilité de connecteurs aux différents services administratifs... Force est de constater que ce n'est plus votre priorité...`,
          signal_types: ['positive_feedback', 'negative_feedback', 'disappointment', 'feature_loss_feedback']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Les autres offres (cloud, pass...) ne correspondent pas à mes besoins.`,
          signal_types: ['negative_feedback']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Merci pour ces quelques années, en vous souhaitant bonne continuation en restant dans cet esprit d'éthique et des respects des droits utilisateurs que défend LINOAGORA. Je reste cependant client de votre offre gratuite.`,
          signal_types: ['thanks_positive', 'positive_feedback', 'closure']
        }
      ]
    }
  },

  {
    id: 'new-conditions-connector-limit-reconnect-churn',
    description: 'Nouvelles conditions : limite 5 comptes, reconnexions fréquentes, churn potentiel',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Je suis ennuyé par les nouvelles conditions de twake.J'avais pris cozy cloud, parce que cela me permettait de récupérer automatiquement mes papiers (bulletins de salaires, factures, etc). Au début, je pouvais récupérer tout, maintenant plus que 5 comptes. J'ai choisi de vous soutenir depuis des années , au départ cozy, puis twake, mais j'avoue que je suis déçu par l'évolution du service, d'autant qu'il faut que je reconnecte souvent mes comptes.Je me demande donc si je ne vais pas tout rapatrier sur mon compte infomaniak ou ouvri un compte à la poste pour ça.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'request',
          tool_or_product: 'Twake',
          topic_action: 'recover automatically',
          topic_object: 'documents from accounts',
          topic_label: 'Twake : recover automatically : documents from accounts',
          topic_details: {
            feature_or_page: 'automatic document recovery',
            gap_observed: 'user could previously recover everything but now only more than 5 accounts are mentioned as limited',
            additional_context: 'User used Cozy Cloud to automatically recover papers such as salary slips and invoices.'
          },
          user_goal: 'User is dissatisfied that automatic document recovery now appears limited compared with their previous Cozy usage.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 2,
          topic_category: 'bug',
          tool_or_product: 'Twake',
          topic_action: 'reconnect',
          topic_object: 'accounts',
          topic_label: 'Twake : reconnect : accounts',
          topic_details: {
            feature_or_page: 'account connectors',
            observed_result: 'user often has to reconnect their accounts',
            frequency: 'often'
          },
          user_goal: 'User often has to reconnect their accounts in Twake.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Je suis ennuyé par les nouvelles conditions de twake.`,
          signal_types: ['negative_feedback', 'disappointment']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `J'ai choisi de vous soutenir depuis des années , au départ cozy, puis twake, mais j'avoue que je suis déçu par l'évolution du service`,
          signal_types: ['positive_feedback', 'negative_feedback', 'disappointment']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Je me demande donc si je ne vais pas tout rapatrier sur mon compte infomaniak ou ouvri un compte à la poste pour ça.`,
          signal_types: ['churn_intent']
        }
      ]
    }
  },

  {
    id: 'iphone-save-to-twake-bank-links-dropbox-churn',
    description: 'Bug iPhone : impossible d’enregistrer sur Twake + liens banque/impôts + churn Dropbox',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Depuis que c’est Twake et depuis mon iPhone je ne peux plus rien enregistrer sur Twake. Ça marchait très bien avec cozy. Maintenant ca ne marche plus. Idem pour les liens banque, impôts, etc. Je pense que je vais retourner chez Dropbox ce ça marche mieux.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'bug',
          tool_or_product: 'Twake',
          topic_action: 'save',
          topic_object: 'content',
          topic_label: 'Twake : save : content',
          topic_details: {
            feature_or_page: 'saving to Twake',
            pre_problem_state: 'worked very well with Cozy',
            observed_result: 'cannot save anything on Twake',
            os: 'iPhone',
            frequency: 'since it became Twake'
          },
          user_goal: 'User cannot save anything to Twake from their iPhone, although it worked with Cozy.',
          blocking_issue: 'yes'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 2,
          topic_category: 'bug',
          tool_or_product: 'Twake',
          topic_action: 'use',
          topic_object: 'bank and tax links',
          topic_label: 'Twake : use : bank and tax links',
          topic_details: {
            feature_or_page: 'bank and tax links',
            observed_result: 'bank and tax links do not work'
          },
          user_goal: 'User reports that bank and tax links do not work in Twake.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Je pense que je vais retourner chez Dropbox ce ça marche mieux.`,
          signal_types: ['churn_intent', 'negative_feedback']
        }
      ]
    }
  },

  {
    id: 'bank-app-not-working-no-communication-drive-elsewhere',
    description: 'Application Bank inactive, manque de communication, churn stockage drive',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `L'application Bank ne fonctionne plus, il n'y a rien qui l'indique. C'est en faisant une recherche sur le net que j'ai trouvé un message sur un forum. Idem pour les applications free, crédit mutuel et fortuneo. Ça n'a plus aucune utilité donc et pour le drive je vais le stocker ailleurs.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'bug',
          tool_or_product: 'Bank',
          topic_action: 'work',
          topic_object: 'bank app and connectors',
          topic_label: 'Bank : work : bank app and connectors',
          topic_details: {
            feature_or_page: 'Bank application',
            observed_result: 'application no longer works',
            affected_scope: 'Bank application, free, Crédit Mutuel, Fortuneo',
            additional_context: 'User found information only by searching the web and finding a forum message.'
          },
          user_goal: 'User reports that the Bank application and connectors including free, Crédit Mutuel, and Fortuneo no longer work.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `il n'y a rien qui l'indique. C'est en faisant une recherche sur le net que j'ai trouvé un message sur un forum.`,
          signal_types: ['communication_feedback', 'negative_feedback']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Ça n'a plus aucune utilité donc et pour le drive je vais le stocker ailleurs.`,
          signal_types: ['churn_intent', 'negative_feedback', 'feature_loss_feedback']
        }
      ]
    }
  },

  {
    id: 'login-page-followup-wait-and-accessibility-question',
    description: 'Follow-up : page de connexion inutilisable, attente, puis question accessibilité iOS',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `C'est tout à fait ça, c'est la page vers laquelle renvoie également l'application, dois-je en déduire que pour l'instant je ne peut l'utiliser pour me connecter à mon espace ?Si c'est le cas, je vais donc patienter car je l'ai déjà mise à jour.Par ailleurs, savez-vous s'il est prévu des améliorations en matière d'accessibilité pour l'application iOS SVP ?`,
      previous_analysis_output: {
        user_language: 'French',
        warning_comprehension: 'no',
        segments: [
          {
            segment_type: 'topic',
            matched_historical_topic: 'no',
            id_topic: 1,
            topic_category: 'access_security',
            topic_action: 'log in',
            topic_object: 'account',
            topic_label: 'log in : account',
            topic_details: {
              feature_or_page: 'login page',
              observed_result: 'user cannot use the page to log in',
              platform: 'mobile app'
            },
            user_goal: 'User cannot log in because the application redirects to a login page they cannot use.',
            blocking_issue: 'yes'
          }
        ]
      },
      attempt_history: [
        {
          action: 'update the app',
          suggested_by: 'bot',
          outcome: 'failed'
        }
      ]
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'yes',
          id_topic: 1,
          topic_category: 'access_security',
          topic_action: 'log in',
          topic_object: 'account',
          topic_label: 'log in : account',
          topic_details: {
            feature_or_page: 'login page',
            observed_result: 'application redirects to the same page, and user asks whether they cannot use it to log in for now',
            platform: 'mobile app'
          },
          tested_action: 'update the app',
          outcome_tested_action: 'failed',
          user_goal: 'User still cannot log in because the application redirects to the same page, even after updating the app.',
          blocking_issue: 'yes'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Si c'est le cas, je vais donc patienter car je l'ai déjà mise à jour.`,
          signal_types: ['waiting']
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 2,
          topic_category: 'question_faq',
          topic_action: 'improve',
          topic_object: 'iOS app accessibility',
          topic_label: 'improve : iOS app accessibility',
          topic_details: {
            platform: 'iOS',
            question_intent: 'future_availability'
          },
          user_goal: 'User asks whether accessibility improvements are planned for the iOS app.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'subscription-suspension-data-deletion-dropbox',
    description: 'Question abonnement : suspension et suppression des données + churn Dropbox',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Vu que le service ne marche pas pour l’instant et que je n’ai pas de solution à mon problème, si je suspend mon abonnement est ce que ce que j’ai stocké sera supprimé car je vais retourner chez Dropbox ?`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'billing',
          topic_action: 'suspend',
          topic_object: 'subscription',
          topic_label: 'suspend : subscription',
          topic_details: {
            billing_issue_type: 'subscription suspension question',
            observed_result: 'user asks whether stored data will be deleted if they suspend their subscription',
            question_intent: 'is_it_possible',
            additional_context: 'User says the service does not work for now and they have no solution to their problem.'
          },
          user_goal: 'User asks whether stored data will be deleted if they suspend their subscription.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `car je vais retourner chez Dropbox`,
          signal_types: ['churn_intent']
        }
      ]
    }
  },

  {
    id: 'bank-feature-loss-quake-churn',
    description: 'Feature loss Banque : raison principale d’usage, churn Quake/Twake',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `la fonction Banque/ étant la raison pour laquelle j'utilisais Cozy Cloud. Je vais devoir arrêter d'utiliser la plate-forme Quake. De mon point de vue, cette nouvelle offre est dépourvu d'intérêt sans l'hébergement de la fonction Banque. J'ai apprécié l'utilisation de Cozy toutes ces années.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `la fonction Banque/ étant la raison pour laquelle j'utilisais Cozy Cloud. Je vais devoir arrêter d'utiliser la plate-forme Quake. De mon point de vue, cette nouvelle offre est dépourvu d'intérêt sans l'hébergement de la fonction Banque.`,
          signal_types: ['negative_feedback', 'churn_intent', 'feature_loss_feedback']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `J'ai apprécié l'utilisation de Cozy toutes ces années.`,
          signal_types: ['positive_feedback']
        }
      ]
    }
  },

  {
    id: 'banque-populaire-maintenance-nine-months-repair-date',
    description: 'Connecteur Banque Populaire en maintenance depuis 9 mois, demande de date de réparation',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `nous avons choisi votre plateforme pour pouvoir profiter des applications bancaires. Or cela fait plus de 9 mois que le service "banque populaire" est en maintenance. Pourriez-vous nous dire quand cela devra être réparé?`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'bug',
          tool_or_product: 'Twake',
          topic_action: 'repair',
          topic_object: 'Banque Populaire service',
          topic_label: 'Twake : repair : Banque Populaire service',
          topic_details: {
            feature_or_page: 'Banque Populaire banking service',
            observed_result: 'service is in maintenance',
            frequency: 'more than 9 months',
            additional_context: 'User chose the platform to use banking applications.'
          },
          user_goal: 'User wants to know when the Banque Populaire banking service, in maintenance for more than 9 months, will be repaired.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'account-not-recognized-save-papers-premium-page',
    description: 'Compte non reconnu + impossible enregistrer papiers + redirection premium',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `twake ne semble plus reconnaitre mon compte. Je n'arrive plus a enregistrer des papiers... au moment d enregistré un nouveau papier, il me renvoie sur une page d achat de compte premium`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'access_security',
          tool_or_product: 'Twake',
          topic_action: 'recognize',
          topic_object: 'account',
          topic_label: 'Twake : recognize : account',
          topic_details: {
            observed_result: 'Twake no longer seems to recognize the account'
          },
          user_goal: 'User says Twake no longer seems to recognize their account.',
          blocking_issue: 'yes'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 2,
          topic_category: 'bug',
          tool_or_product: 'Twake',
          topic_action: 'save',
          topic_object: 'papers',
          topic_label: 'Twake : save : papers',
          topic_details: {
            feature_or_page: 'saving a new paper',
            trigger_action: 'save a new paper',
            observed_result: 'user is redirected to a premium account purchase page'
          },
          user_goal: 'User cannot save a new paper because Twake redirects them to a premium account purchase page.',
          blocking_issue: 'yes'
        }
      ]
    }
  },

  {
    id: 'mfa-option-not-found',
    description: 'Question FAQ : option MFA introuvable sur compte Twake',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Je ne trouve pas d'option de MFA sur mon compte Twake. Cette option n'est-elle pas proposée ?`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'question_faq',
          tool_or_product: 'Twake',
          topic_action: 'enable',
          topic_object: 'MFA',
          topic_label: 'Twake : enable : MFA',
          topic_details: {
            feature_or_page: 'MFA option',
            observed_result: 'user does not find an MFA option on their account',
            question_intent: 'is_it_possible'
          },
          user_goal: 'User asks whether MFA is available on their Twake account because they cannot find the option.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'phone-only-signup-login-not-exists-no-pass-space',
    description: 'Création compte épouse : identifiant inexistant après déconnexion, signup téléphone, pas d’espace mots de passe',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Mon épouse et moi-même venons de créer un « twake » (je ne comprends pas la différence avec le cozy cloud que j’avais créé pour moi autrefois) bref. Nous avons créé le cozy avec l’identifiant « svitlanabt68 » mais après déconnexion ça ne marche pas, on nous dit que cela n’existe pas.le support me propose de m’aider en marquant l’adresse mail avec laquelle nous avons créé le cozy, mais on ne nous a demandé qu’un numéro de téléphone. De quelle adresse mes mal s’agit-il?Je suis déçu, quand j’avais créé mon cozy cloud, tout était simple. Maintenant il y a des mots anglais, des twake des trucs… En plus lors de la création du « twake » de mon épouse il n’y avais pas d’espace pour la gestion des mots de passe comme sur mon cozy, je voulais avoir un abonnement pour moi et un pour ma femme mais cela me décourage complètement 😦`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'access_security',
          tool_or_product: 'Twake',
          topic_action: 'log in',
          topic_object: 'new account',
          topic_label: 'Twake : log in : new account',
          topic_details: {
            account_context: 'phone-only signup',
            access_action: 'log in after logout',
            auth_method: 'identifier svitlanabt68',
            observed_result: 'user is told the account does not exist',
            error_message: 'cela n’existe pas',
            additional_context: 'Support asks for the email address used to create the Cozy, but user says only a phone number was requested.'
          },
          user_goal: 'User cannot log in after creating a Twake account with identifier svitlanabt68 and phone-only signup context.',
          blocking_issue: 'yes'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 2,
          topic_category: 'bug',
          tool_or_product: 'Twake',
          topic_action: 'access',
          topic_object: 'password management space',
          topic_label: 'Twake : access : password management space',
          topic_details: {
            feature_or_page: 'password management',
            observed_result: 'there was no space for password management during creation of the spouse’s Twake account',
            additional_context: 'User wanted to have one subscription for themselves and one for their wife.'
          },
          user_goal: 'User says the spouse’s new Twake account did not show a password management space unlike their previous Cozy account.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Je suis déçu, quand j’avais créé mon cozy cloud, tout était simple. Maintenant il y a des mots anglais, des twake des trucs…`,
          signal_types: ['negative_feedback', 'disappointment']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `cela me décourage complètement 😦`,
          signal_types: ['disappointment']
        }
      ]
    }
  },

  {
    id: 'missing-pass-wife-digital-adoption-discouraged',
    description: 'Signal fort : absence de Pass réduit l’intérêt et décourage l’adoption par l’épouse',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Si on ne dispose pas du pass, cela perd beaucoup de son intérêt. Imaginez, mon épouse est particlulièrement réfractaire au numérique auquel elle ne comprend rien. Je lui vend cozy cloud, j'arrive sans trop de peine à lui vendre de faire deux comptes et un abonnement pour chaque et au moment décisif, patatra, ça ne marche pas. Outre le fait que j'ai l'air bête, elle est désormais convaincu que le numérique est un "attrappe couil...) et que ce n'est pas fait pour elle...`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `Si on ne dispose pas du pass, cela perd beaucoup de son intérêt.`,
          signal_types: ['negative_feedback', 'feature_loss_feedback']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Je lui vend cozy cloud, j'arrive sans trop de peine à lui vendre de faire deux comptes et un abonnement pour chaque et au moment décisif, patatra, ça ne marche pas.`,
          signal_types: ['negative_feedback', 'disappointment']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `elle est désormais convaincu que le numérique est un "attrappe couil...) et que ce n'est pas fait pour elle...`,
          signal_types: ['negative_feedback', 'disappointment', 'impolite']
        }
      ]
    }
  },

  {
    id: 'sarcastic-positive-subscribe-two-accounts',
    description: 'Signal sarcastique puis intention de prendre deux abonnements',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `je suis vraiment trop content même si c'esst super galère... C'est pour nouis convaicre d'aller chez un hébergeur américain ? ;-) ;-) (…) Bon, je vais prendre un abonnement, pour elle et un pour moi.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `je suis vraiment trop content même si c'esst super galère... C'est pour nouis convaicre d'aller chez un hébergeur américain ? ;-) ;-)`,
          signal_types: ['negative_feedback', 'disappointment']
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'billing',
          topic_action: 'subscribe',
          topic_object: 'two subscriptions',
          topic_label: 'subscribe : two subscriptions',
          topic_details: {
            billing_issue_type: 'subscription intent',
            observed_result: 'user says they will take one subscription for her and one for themselves'
          },
          user_goal: 'User says they will take two subscriptions, one for her and one for themselves.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'new-phone-cannot-login-cozy-account-urgent-proton',
    description: 'Access/security : nouveau téléphone, impossible login compte Cozy via app Twake + urgence/churn',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `I was using Cozy cloud for a lot of years, and recently you change to twake. Now I changed my phone and install twake app and cannot login with my cozy cloud account. What is hapenning? I have also twake pass working but cannot login through phone app. I will change to Proton if you will not manage this immediately`
    },
    expectedOutput: {
      user_language: 'English',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'access_security',
          tool_or_product: 'Twake',
          topic_action: 'log in',
          topic_object: 'Cozy Cloud account',
          topic_label: 'Twake : log in : Cozy Cloud account',
          topic_details: {
            pre_problem_state: 'user used Cozy Cloud for many years and changed phone',
            access_action: 'log in through phone app',
            observed_result: 'cannot log in with Cozy Cloud account',
            platform: 'mobile app',
            additional_context: 'Twake Pass is working.'
          },
          user_goal: 'User cannot log in to the Twake phone app with their Cozy Cloud account after changing phone, while Twake Pass works.',
          blocking_issue: 'yes'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `I will change to Proton if you will not manage this immediately`,
          signal_types: ['churn_intent', 'time_sensitive', 'negative_feedback']
        }
      ]
    }
  },

  {
    id: 'organization-server-not-found-communication-negative',
    description: 'Access/security : organization server not found + manque d’information',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `after using organization server and typing samo.mycozy.cloud it shows error " Organization server not found".You whould at last inform us... Cozy before was way better and really inovative with better protection. Sadly you sell it to other...`
    },
    expectedOutput: {
      user_language: 'English',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'access_security',
          tool_or_product: 'Twake',
          topic_action: 'log in',
          topic_object: 'organization server',
          topic_label: 'Twake : log in : organization server',
          topic_details: {
            access_action: 'use organization server',
            provided_url: 'samo.mycozy.cloud',
            observed_result: 'Organization server not found error is shown',
            error_message: ' Organization server not found'
          },
          user_goal: 'User gets an Organization server not found error after typing samo.mycozy.cloud as organization server.',
          blocking_issue: 'yes'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `You whould at last inform us...`,
          signal_types: ['communication_feedback', 'negative_feedback']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Cozy before was way better and really inovative with better protection. Sadly you sell it to other...`,
          signal_types: ['positive_feedback', 'negative_feedback', 'disappointment']
        }
      ]
    }
  },

  {
    id: 'vague-bugs-no-photo-management',
    description: 'Message vague : quelques bugs + pas de gestion des photos',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `quelques bugs, pas de gestion des photos.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `quelques bugs`,
          signal_types: ['complaint_without_actionable_detail']
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'request',
          topic_action: 'manage',
          topic_object: 'photos',
          topic_label: 'manage : photos',
          topic_details: {
            gap_observed: 'no photo management'
          },
          user_goal: 'User reports that photo management is missing.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'no-connection-to-banks-anymore',
    description: 'Bug bancaire minimal : plus de connexion aux banques',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `No connection to banks anymore`
    },
    expectedOutput: {
      user_language: 'English',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'bug',
          topic_action: 'connect',
          topic_object: 'banks',
          topic_label: 'connect : banks',
          topic_details: {
            feature_or_page: 'bank connections',
            observed_result: 'no connection to banks anymore'
          },
          user_goal: 'User no longer has connection to banks.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'twake-does-not-meet-needs-cancel-subscription',
    description: 'Signal churn simple : Twake ne répond plus aux besoins',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Twake ne répond plus à mes besoins et je vais arrêter mon abonnement.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `Twake ne répond plus à mes besoins et je vais arrêter mon abonnement.`,
          signal_types: ['negative_feedback', 'churn_intent']
        }
      ]
    }
  },

  {
    id: 'features-not-maintained-cancel-subscription',
    description: 'Signal churn : fonctionnalités appréciées non maintenues',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Je vais donc prochainement arrêter mon abonnement vu que les fonctionnalités que j'apprécie dans votre suite ne peuvent plus être maintenues.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `Je vais donc prochainement arrêter mon abonnement vu que les fonctionnalités que j'apprécie dans votre suite ne peuvent plus être maintenues.`,
          signal_types: ['churn_intent', 'feature_loss_feedback', 'negative_feedback']
        }
      ]
    }
  },

  {
    id: 'long-churn-data-terms-not-acceptable',
    description: 'Long signal churn : direction produit, mail/chat inutiles, conditions de données non acceptées',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `La direction que prend cozy depuis que twake et donc linagora sont impliqués ne m'incite pas à rester chez vous trop longtemps. Dans les mois qui viennent je pense récupérer les dernières données encore stockées chez vous c'est à dire plus grand chose et clore mon compte. Je n'ai pas besoin d'une application de mail, j'ai déjà un nom de domaine et les mails associés. Je n'ai pas non plus besoin d'un tchat basé sur matrix puisque j'ai déjà eu élément matrix et que mes besoins ne vont pas au delà de l'utilisation de signal et d'irc. Si le besoin s'en fait sentir je me recréerais un compte matrix. J'ai beaucoup aimé être sur cozy depuis l'époque de la version test. Je j'aimerai pas rester sur twake. J'ai bien conscience que vos impératifs pour continuer à exister exigent certains changements de direction hélas incompatibles avec mon éthique. Je vous souhaite néanmoins bonne route pour la suite qui se déroulera sans moi. J'ai beaucoup aimé Cozy.conditions générales modifiée suite change cozy vers twake. Les conditions de stockage et de traitement des données ne me conviennent plus.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `La direction que prend cozy depuis que twake et donc linagora sont impliqués ne m'incite pas à rester chez vous trop longtemps. Dans les mois qui viennent je pense récupérer les dernières données encore stockées chez vous c'est à dire plus grand chose et clore mon compte.`,
          signal_types: ['negative_feedback', 'churn_intent']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Je n'ai pas besoin d'une application de mail, j'ai déjà un nom de domaine et les mails associés. Je n'ai pas non plus besoin d'un tchat basé sur matrix puisque j'ai déjà eu élément matrix et que mes besoins ne vont pas au delà de l'utilisation de signal et d'irc.`,
          signal_types: ['negative_feedback']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `J'ai beaucoup aimé être sur cozy depuis l'époque de la version test. Je j'aimerai pas rester sur twake.`,
          signal_types: ['positive_feedback', 'negative_feedback', 'churn_intent']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `J'ai bien conscience que vos impératifs pour continuer à exister exigent certains changements de direction hélas incompatibles avec mon éthique. Je vous souhaite néanmoins bonne route pour la suite qui se déroulera sans moi. J'ai beaucoup aimé Cozy.`,
          signal_types: ['positive_feedback', 'negative_feedback', 'closure']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `conditions générales modifiée suite change cozy vers twake. Les conditions de stockage et de traitement des données ne me conviennent plus.`,
          signal_types: ['negative_feedback', 'churn_intent']
        }
      ]
    }
  },

  {
    id: 'ios-app-totally-buggy-vague',
    description: 'Plainte non actionnable : application totalement bugée sur iOS',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Application totalement bugée sur iOS`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `Application totalement bugée sur iOS`,
          signal_types: ['negative_feedback', 'complaint_without_actionable_detail']
        }
      ]
    }
  },

  {
    id: 'not-user-friendly-vs-kdrive-e2ee-tradeoffs',
    description: 'Feedback comparatif : moins user friendly que kDrive, trop de compromis',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Not as user friendly as kDrive. I was lookin for a french open source e2ee alternatives but there are to many trade off...`
    },
    expectedOutput: {
      user_language: 'English',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `Not as user friendly as kDrive. I was lookin for a french open source e2ee alternatives but there are to many trade off...`,
          signal_types: ['negative_feedback', 'disappointment']
        }
      ]
    }
  },

  {
    id: 'all-services-suspended-no-interest',
    description: 'Signal feature loss : services suspendus, mycozy sans intérêt',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Avec tous les services suspendus, mycozy n'a plus aucun intérêt pour moi.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `Avec tous les services suspendus, mycozy n'a plus aucun intérêt pour moi.`,
          signal_types: ['negative_feedback', 'feature_loss_feedback', 'churn_intent']
        }
      ]
    }
  },

  {
    id: 'delete-account-lack-communication',
    description: 'Signal churn : suppression compte et manque de communication',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Donc mycosy ne présente plus aucun intérêt à mes yeux. C'est devenu un simple service cloud et j'en ai déjà d'autres plus performants. Je supprime donc mon compte. Dommage du manque de communication de votre part...`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `Donc mycosy ne présente plus aucun intérêt à mes yeux. C'est devenu un simple service cloud et j'en ai déjà d'autres plus performants. Je supprime donc mon compte.`,
          signal_types: ['negative_feedback', 'churn_intent', 'feature_loss_feedback']
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Dommage du manque de communication de votre part...`,
          signal_types: ['communication_feedback', 'negative_feedback', 'disappointment']
        }
      ]
    }
  },

  {
    id: 'without-bank-no-use',
    description: 'Signal feature loss minimal : sans Bank aucun intérêt',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Sans la gestion de la bank cela ne me sert plus à rien.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `Sans la gestion de la bank cela ne me sert plus à rien.`,
          signal_types: ['negative_feedback', 'feature_loss_feedback', 'churn_intent']
        }
      ]
    }
  },

  {
    id: 'pass-folders-by-theme-request',
    description: 'Demande d’amélioration Twake Pass : dossiers pour ranger les mots de passe par thème',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Serait-il possible d’envisager la création de dossiers pour y ranger les mots de passe par thème ?`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'request',
          topic_action: 'create',
          topic_object: 'folders for passwords by theme',
          topic_label: 'create : folders for passwords by theme',
          topic_details: {
            gap_observed: 'folders to organize passwords by theme'
          },
          user_goal: 'User wants folders to organize passwords by theme.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'google-wallet-payments-refused-direct-payment-question',
    description: 'Billing : paiements Google Wallet refusés, demande paiement direct',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `alors que tout va bien sur mes comptes et que je paie avec mes cartes en réel et sur internet, tous mes paiements par carte via Google Wallet sont refusés. Puis-je payé en direct ?`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'billing',
          topic_action: 'pay',
          topic_object: 'subscription via Google Wallet',
          topic_label: 'pay : subscription via Google Wallet',
          topic_details: {
            billing_issue_type: 'payment refused',
            billing_provider: 'Google Wallet',
            observed_result: 'all card payments via Google Wallet are refused',
            additional_context: 'User says their accounts are fine and card payments work in physical stores and online.'
          },
          user_goal: 'User reports that all card payments via Google Wallet are refused despite their cards working elsewhere.',
          blocking_issue: 'yes'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 2,
          topic_category: 'question_faq',
          topic_action: 'pay',
          topic_object: 'directly',
          topic_label: 'pay : directly',
          topic_details: {
            question_intent: 'is_it_possible'
          },
          user_goal: 'User asks whether they can pay directly instead of via Google Wallet.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'services-not-syncable-without-smartphone-connectors-missing-energy',
    description: 'Multi-intentions : synchronisation smartphone imposée, connecteurs KO, connecteurs énergie manquants, stockage pCloud',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Plein de services non synchronisables sauf avec un smartphone. Je ne mets JAMAIS des accès aussi sensibles sur un smartphone.Plein de connecteurs administratifs essentiels ne fonctionnent plus.Octopus Energie et Alterna Energie ne sont pas proposés alors qu'ils sont les lauréats de l'opération "Energie mins chère ensemble" de Que Choisir.Pour ce qui est du stockage, j'en ai déjà un à vie sur pCloud.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'request',
          topic_action: 'sync',
          topic_object: 'services without smartphone',
          topic_label: 'sync : services without smartphone',
          topic_details: {
            gap_observed: 'many services cannot be synchronized except with a smartphone',
            additional_context: 'User says they never put such sensitive access on a smartphone.'
          },
          user_goal: 'User wants services to be synchronizable without requiring a smartphone.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 2,
          topic_category: 'bug',
          topic_action: 'use',
          topic_object: 'essential administrative connectors',
          topic_label: 'use : essential administrative connectors',
          topic_details: {
            feature_or_page: 'administrative connectors',
            observed_result: 'many essential administrative connectors no longer work'
          },
          user_goal: 'User reports that many essential administrative connectors no longer work.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 3,
          topic_category: 'request',
          topic_action: 'add',
          topic_object: 'Octopus Energie and Alterna Energie connectors',
          topic_label: 'add : Octopus Energie and Alterna Energie connectors',
          topic_details: {
            gap_observed: 'Octopus Energie and Alterna Energie are not offered',
            additional_context: 'User says they are winners of Que Choisir’s "Energie moins chère ensemble" operation.'
          },
          user_goal: 'User wants Octopus Energie and Alterna Energie connectors to be offered.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `Pour ce qui est du stockage, j'en ai déjà un à vie sur pCloud.`,
          signal_types: ['negative_feedback']
        }
      ]
    }
  },

  {
    id: 'notability-followup-ipad-elea-workaround',
    description: 'Follow-up Notability : cas d’usage iPad, ELEA, workaround stockage iOS',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Oui exactement, svt je corrige en classe, sur l iPad, avec le stylet, en mm temps que les élèves, puis j exporte afin de publier ensuite dans elea, ce qui permet aux absents de se mettre à jour dès qu ils peuvent.Cela manque depuis le début de l année. J ai la possibilité de passer par le stockage d iOS mais je préférerai utiliser les outils institutionnels.`,
      previous_analysis_output: {
        user_language: 'French',
        warning_comprehension: 'no',
        segments: [
          {
            segment_type: 'topic',
            matched_historical_topic: 'no',
            id_topic: 1,
            topic_category: 'bug',
            tool_or_product: 'Twake',
            topic_action: 'share',
            topic_object: 'document from Notability',
            topic_label: 'Twake : share : document from Notability',
            topic_details: {
              feature_or_page: 'document sharing',
              trigger_action: 'click share, then Twake',
              observed_result: 'nothing happens',
              expected_result: 'user should be asked where to save the document'
            },
            user_goal: 'User cannot share a document from Notability to Twake because nothing happens after selecting Twake.',
            blocking_issue: 'yes'
          }
        ]
      },
      conversation_logs: [
        {
          id_topic: 1,
          logs: [
            'User: reports sharing a Notability document to Twake does nothing',
            'Bot: asks for more context about the use case'
          ]
        }
      ]
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'yes',
          id_topic: 1,
          topic_category: 'bug',
          tool_or_product: 'Twake',
          topic_action: 'share',
          topic_object: 'document from Notability',
          topic_label: 'Twake : share : document from Notability',
          topic_details: {
            feature_or_page: 'document sharing',
            trigger_action: 'export from iPad after correcting with stylus',
            observed_result: 'sharing to Twake is missing since the beginning of the year',
            expected_result: 'publish exported correction in ELEA so absent students can catch up',
            os: 'iPad',
            additional_context: 'User can use iOS storage as a workaround but would prefer to use institutional tools.'
          },
          tested_action: 'use iOS storage as workaround',
          outcome_tested_action: 'worked',
          user_goal: 'User wants to export stylus corrections from iPad to Twake for ELEA publication; iOS storage works as a workaround but they prefer institutional tools.',
          blocking_issue: 'no'
        }
      ]
    }
  },

  {
    id: 'android-photos-tab-missing-sync-question',
    description: 'Android : onglet Photos absent, impossible lancer synchro photos, bouton Add incompris',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `J'ai aidé mon amie à créer un compte twake, tout fonctionne correctement sur son Mac. Sur le téléphone - Android 15 à jour - nous avons installé l'application Twake par le playstore et connecté le compte. Sur la page d'accueil de l'appli, l'onglet Photos n'est pas présent et nous ne pouvons donc pas demander la synchronisation des photos (le bouton Add ne m'aide pas, je ne sais quelle URL renseigner). Avez-vous une idée de ce que j'ai manqué ?`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'question_faq',
          tool_or_product: 'Twake',
          topic_action: 'sync',
          topic_object: 'photos',
          topic_label: 'Twake : sync : photos',
          topic_details: {
            feature_or_page: 'Photos tab',
            pre_problem_state: 'account works correctly on Mac',
            observed_result: 'Photos tab is not present on the app home page, so photo synchronization cannot be requested',
            platform: 'mobile app',
            os: 'Android 15',
            additional_context: 'App was installed from Play Store and account is connected. The Add button does not help because user does not know which URL to enter.',
            question_intent: 'how_to'
          },
          user_goal: 'User wants to synchronize photos on Twake Android app but the Photos tab is missing and the Add button asks for an unknown URL.',
          blocking_issue: 'yes'
        }
      ]
    }
  },

  {
    id: 'photos-backup-followup-desktop-mac-connectors-feedback',
    description: 'Follow-up Photos : besoin sauvegarder photos puis effacer téléphone + feedback connecteurs Cozy',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Merci pour ces infos même si elles me désolent un peu. - je lui avais justement vendu la fonction de sauvegardes des photos. Aujourd'hui nous avons installé twake desktop sur le mac, donc avec synchro des dossiers, que nous voulons conserver. Son besoin est de sauvegarder les photos sur le compte et de les effacer du téléphone. A titre perso, j'aimais beaucoup les fonctionnalités de Cozy, surtout les connecteurs edf etc qui faisaient arriver les factures directement sur mon pc.`,
      previous_analysis_output: {
        user_language: 'French',
        warning_comprehension: 'no',
        segments: [
          {
            segment_type: 'topic',
            matched_historical_topic: 'no',
            id_topic: 1,
            topic_category: 'question_faq',
            tool_or_product: 'Twake',
            topic_action: 'sync',
            topic_object: 'photos',
            topic_label: 'Twake : sync : photos',
            topic_details: {
              feature_or_page: 'Photos tab',
              observed_result: 'Photos tab is not present on the app home page, so photo synchronization cannot be requested',
              platform: 'mobile app',
              os: 'Android 15'
            },
            user_goal: 'User wants to synchronize photos on Twake Android app but the Photos tab is missing.',
            blocking_issue: 'yes'
          }
        ]
      },
      conversation_logs: [
        {
          id_topic: 1,
          logs: [
            'User: reports Photos tab missing on Android app',
            'Bot: explains photo backup limitations'
          ]
        }
      ]
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'signal',
          signal_verbatim: `Merci pour ces infos même si elles me désolent un peu.`,
          signal_types: ['thanks_neutral', 'disappointment']
        },
        {
          segment_type: 'topic',
          matched_historical_topic: 'yes',
          id_topic: 1,
          topic_category: 'question_faq',
          tool_or_product: 'Twake',
          topic_action: 'sync',
          topic_object: 'photos',
          topic_label: 'Twake : sync : photos',
          topic_details: {
            feature_or_page: 'photo backup',
            observed_result: 'user wants to back up photos to the account and delete them from the phone',
            platform: 'desktop app',
            os: 'Mac',
            additional_context: 'Twake Desktop was installed on Mac with folder synchronization, which user wants to keep.'
          },
          user_goal: 'User wants to back up photos to the Twake account and delete them from the phone while keeping Twake Desktop folder sync on Mac.',
          blocking_issue: 'no'
        },
        {
          segment_type: 'signal',
          signal_verbatim: `A titre perso, j'aimais beaucoup les fonctionnalités de Cozy, surtout les connecteurs edf etc qui faisaient arriver les factures directement sur mon pc.`,
          signal_types: ['positive_feedback', 'feature_loss_feedback']
        }
      ]
    }
  },

  {
    id: 'google-non-payment-after-bank-validation',
    description: 'Billing : relance Google pour non-paiement, validation banque puis paiement refusé',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      latest_user_message: `Je suis relancé par Google pour un non paiement du service Twake auquel je suis abonné (3€/mens). Or j’effectue bien le paiement avec validation auprès de ma banque, mais ensuite, Google affiche un paiement refusé.`
    },
    expectedOutput: {
      user_language: 'French',
      warning_comprehension: 'no',
      segments: [
        {
          segment_type: 'topic',
          matched_historical_topic: 'no',
          id_topic: 1,
          topic_category: 'billing',
          tool_or_product: 'Twake',
          topic_action: 'pay',
          topic_object: 'subscription through Google',
          topic_label: 'Twake : pay : subscription through Google',
          topic_details: {
            billing_issue_type: 'payment refused',
            billing_provider: 'Google',
            offer_or_plan: '3€/month',
            amount: '3',
            currency: '€',
            observed_result: 'Google sends non-payment reminders and displays payment refused after bank validation',
            additional_context: 'User says they do complete the payment with validation from their bank.'
          },
          user_goal: 'User is subscribed to Twake at 3€/month but Google reports non-payment and refuses payment after bank validation.',
          blocking_issue: 'yes'
        }
      ]
    }
  }
];

function formatSupportForClassification(messageData = {}) {
  const latestUserMessage =
    messageData.latest_user_message ??
    messageData.message;

  if (!latestUserMessage) {
    throw new Error(
      `Missing support message. Expected latest_user_message or message. Received keys: ${Object.keys(messageData).join(', ')}`
    );
  }

  const sections = [
    `## USER CONTEXT
Username: ${messageData.username ?? 'unknown'}
Email: ${messageData.email ?? 'unknown'}
User status: ${messageData.user_status ?? 'unknown'}`,

    `## LATEST USER MESSAGE
${latestUserMessage}`
  ];

  if (messageData.previous_analysis_output) {
    sections.push(`## PREVIOUS_ANALYSIS_OUTPUT
${JSON.stringify(messageData.previous_analysis_output, null, 2)}`);
  }

  if (messageData.conversation_logs) {
    sections.push(`## CONVERSATION_LOGS
${JSON.stringify(messageData.conversation_logs, null, 2)}`);
  }

  if (messageData.attempt_history) {
    sections.push(`## ATTEMPT_HISTORY
${JSON.stringify(messageData.attempt_history, null, 2)}`);
  }

  return sections.join('\n\n') + '\n';
}

module.exports = {
  supportTestCases,
  formatSupportForClassification
};
