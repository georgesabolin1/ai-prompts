const SUPPORT_LABELS = [
  { id: 'feature_request', description: 'The user asks for a new feature, an improvement, or a product change.' },
  { id: 'bug_report', description: 'The user reports broken, incorrect, failing, or unexpected behavior.' },
  { id: 'question', description: 'The user asks how the product works or requests help using it.' },
  { id: 'other', description: 'The message does not clearly fit the other support categories.' },
];

const SUPPORT_SIGNALS = [
  { id: 'blocking_issue', description: 'The problem prevents or seriously hinders normal use of the service or a key feature.' },
  { id: 'time_sensitive', description: 'The message indicates urgency because of a deadline, an imminent need, or a short time window.' },
  { id: 'churn_risk', description: 'The user suggests they may stop using the service, cancel, switch provider, or leave because of the issue.' },
];

const availableLabels = SUPPORT_LABELS.map(l => `- '${l.id}' : ${l.description}`).join('\n');
const availableSignals = SUPPORT_SIGNALS.map(s => `- '${s.id}' : ${s.description}`).join('\n');


const supportTestCases = [

  {
    id: 'multi-bug-crashes-darkmode-vault',
    description: '3 bugs distincts : fermetures app, thème sombre illisible, raccourci My Vault cassé',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `J'ai eu plusieurs fois des fermetures de l'application, sans pour autant comprendre pourquoi. La gestion du thème sombre est perfectible, notamment dans la création d'une nouvelle entrée, les boutons "enregistrer" sont écrits en noir sur fond gris foncé, donc quasiment illisibles. Mais je ne peux pas t'illustrer avec une capture d'écran, elles ne sont pas possible. Le raccourci "My vault" dans les réglages rapides ne fonctionne plus. Je l'aimais bien celui-là, il était pratique pour accéder à l'appli rapidement. Et l'appui sur ce raccourci provoque une fermeture d'application.`
    },
    expectedOutput: {
      global_mode: 'structured_support',
      satisfaction: 'negative',
      time_sensitive: 'no',
      topics: [
        {
          topic_label: 'App : dark mode',
          topic_category: 'bug',
          matched_historical_topic: 'no',
          topic_status: 'active',
          display_order: 1,
          context_anchor: 'thème sombre, création nouvelle entrée, boutons "enregistrer"',
          context_anchor_complete: 'yes',
          user_goal: 'read save buttons in dark mode',
          user_goal_complete: 'yes',
          gap_observed: '',
          gap_observed_complete: 'n/a',
          failure_step: 'dark mode, new entry creation > save buttons unreadable (black text on dark grey)',
          failure_step_complete: 'yes',
          environment_context: '',
          environment_context_status: 'missing',
          bug_scope: '',
          bug_scope_status: 'missing',
          blocking_issue: 'no',
          enough_information: 'no',
          solution_type_available: 'no',
          main_response_type: 'ask_info',
          next_step: 'wait_for_user'
        },
        {
          topic_label: 'App : My Vault shortcut',
          topic_category: 'bug',
          matched_historical_topic: 'no',
          topic_status: 'active',
          display_order: 2,
          context_anchor: 'My Vault, réglages rapides',
          context_anchor_complete: 'yes',
          user_goal: 'use My Vault shortcut to open the app',
          user_goal_complete: 'yes',
          gap_observed: '',
          gap_observed_complete: 'n/a',
          failure_step: 'tap My Vault shortcut > app crashes',
          failure_step_complete: 'yes',
          environment_context: '',
          environment_context_status: 'missing',
          bug_scope: '',
          bug_scope_status: 'missing',
          blocking_issue: 'no',
          enough_information: 'no',
          solution_type_available: 'no',
          main_response_type: 'ask_info',
          next_step: 'wait_for_user'
        }
      ]
    }
  },

  {
    id: 'scroll-checkboxes-rename-app-web',
    description: 'Scroll cases à cocher (résolu) + renommage impossible app + renommage web partiel',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `lorsque j'utilise l'application et que je veux consulter mes dossiers qui n'apparaissent pas à l'écran (et donc que je scrolle vers le bas), les dossiers se mettent en mode case a cocher et je ne peux pas les ouvrir.(…)Je viens de tester ce soir et cela semble plus facile. Je peux scroller sans que les cases à cocher apparaissent. 🙂 J'ai également remarqué qu'il n'était pas possible de renommer un dossier ou un document depuis l'application. Via le web, on peut renommer mais il faut supprimer le nom du fichier pour y arriver. C'est parfois ennuyant quand on veut juste ajouter une information.`
    },
    expectedOutput: {
      global_mode: 'structured_support',
      satisfaction: 'neutral',
      time_sensitive: 'no',
      topics: [
        {
          topic_label: 'App : rename',
          topic_category: 'bug',
          matched_historical_topic: 'no',
          topic_status: 'active',
          display_order: 1,
          context_anchor: 'application, renommer dossier ou document',
          context_anchor_complete: 'yes',
          user_goal: 'rename a folder or document from the app',
          user_goal_complete: 'yes',
          gap_observed: '',
          gap_observed_complete: 'n/a',
          failure_step: 'rename from app > not possible',
          failure_step_complete: 'yes',
          environment_context: '',
          environment_context_status: 'missing',
          bug_scope: '',
          bug_scope_status: 'missing',
          blocking_issue: 'no',
          enough_information: 'no',
          solution_type_available: 'no',
          main_response_type: 'ask_info',
          next_step: 'wait_for_user'
        },
        {
          topic_label: 'Web : rename',
          topic_category: 'bug',
          matched_historical_topic: 'no',
          topic_status: 'active',
          display_order: 2,
          context_anchor: 'web, renommer fichier',
          context_anchor_complete: 'yes',
          user_goal: 'rename a file without deleting the current name',
          user_goal_complete: 'yes',
          gap_observed: '',
          gap_observed_complete: 'n/a',
          failure_step: 'rename via web > must delete full filename to rename, cannot append',
          failure_step_complete: 'yes',
          environment_context: 'web',
          environment_context_status: 'limited',
          bug_scope: '',
          bug_scope_status: 'missing',
          blocking_issue: 'no',
          enough_information: 'no',
          solution_type_available: 'no',
          main_response_type: 'ask_info',
          next_step: 'wait_for_user'
        }
      ]
    }
  },

  {
    id: 'create-folder-rename-field-closes',
    description: 'Création répertoire + renommage impossible, champ se referme immédiatement avec message erreur',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Depuis qq temps je n'arrive plus à créer des répertoires ni renommer des fichiers depuis l'appli. Dans les deux cas le champs du nom se referme tout de suite avant que j'ai eu le temps de le renommer. Dans le cas d'un répertoire j'ai ensuite ce message "vous devez nommer votre dossier si vous voulez le sauvegarder..."`
    },
    expectedOutput: {
      global_mode: 'structured_support',
      satisfaction: 'negative',
      time_sensitive: 'no',
      topics: [
        {
          topic_label: 'App : create/rename',
          topic_category: 'bug',
          matched_historical_topic: 'no',
          topic_status: 'active',
          display_order: 1,
          context_anchor: 'application, création répertoire, renommage fichier',
          context_anchor_complete: 'yes',
          user_goal: 'create a folder and rename files from the app',
          user_goal_complete: 'yes',
          gap_observed: '',
          gap_observed_complete: 'n/a',
          failure_step: 'enter folder/file name > name field closes immediately, error: "vous devez nommer votre dossier"',
          failure_step_complete: 'yes',
          environment_context: '',
          environment_context_status: 'missing',
          bug_scope: 'always',
          bug_scope_status: 'limited',
          blocking_issue: 'no',
          enough_information: 'no',
          solution_type_available: 'no',
          main_response_type: 'ask_info',
          next_step: 'wait_for_user'
        }
      ]
    }
  },

  {
    id: 'cannot-create-folder-drive-app-web-1week',
    description: 'Impossible de créer dossier dans Drive ni renommer, app et web, depuis 1 semaine',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Depuis 1 semaine au moins, il m'est impossible de créer un dossier dans le drive, ni même renommer un fichier. Que ce soit depuis l'application ou depuis le navigateur web.`
    },
    expectedOutput: {
      global_mode: 'structured_support',
      satisfaction: 'negative',
      time_sensitive: 'yes',
      topics: [
        {
          topic_label: 'Drive : create/rename',
          topic_category: 'bug',
          matched_historical_topic: 'no',
          topic_status: 'active',
          display_order: 1,
          context_anchor: 'Drive',
          context_anchor_complete: 'yes',
          user_goal: 'create a folder and rename files in Drive',
          user_goal_complete: 'yes',
          gap_observed: '',
          gap_observed_complete: 'n/a',
          failure_step: '',
          failure_step_complete: 'no',
          environment_context: 'app + web',
          environment_context_status: 'limited',
          bug_scope: 'always',
          bug_scope_status: 'limited',
          blocking_issue: 'no',
          enough_information: 'no',
          solution_type_available: 'no',
          main_response_type: 'ask_info',
          next_step: 'wait_for_user'
        }
      ]
    }
  },

  {
    id: 'android-twake-cannot-create-folder-error-message',
    description: 'Android Twake Workplace : création dossier impossible avec message erreur précis',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `depuis l'application android twake workplace, je ne peux plus créer de dossier. Quand je fais "Créer" - dossier, j'ai le message : "Vous devez nommer votre dossier si vous voulez le sauvegarder. Vos infos n'ont pas été sauvegardées." Mais je ne peux pas entrer de nom de dossier.`
    },
    expectedOutput: {
      global_mode: 'structured_support',
      satisfaction: 'negative',
      time_sensitive: 'no',
      topics: [
        {
          topic_label: 'App : create folder',
          topic_category: 'bug',
          matched_historical_topic: 'no',
          topic_status: 'active',
          display_order: 1,
          context_anchor: 'application Android Twake Workplace, Créer > dossier',
          context_anchor_complete: 'yes',
          user_goal: 'create a folder from the Android app',
          user_goal_complete: 'yes',
          gap_observed: '',
          gap_observed_complete: 'n/a',
          failure_step: 'tap Créer > dossier > cannot enter folder name, error: "Vous devez nommer votre dossier si vous voulez le sauvegarder"',
          failure_step_complete: 'yes',
          environment_context: 'Android',
          environment_context_status: 'limited',
          bug_scope: '',
          bug_scope_status: 'missing',
          blocking_issue: 'no',
          enough_information: 'no',
          solution_type_available: 'no',
          main_response_type: 'ask_info',
          next_step: 'wait_for_user'
        }
      ]
    }
  },

  {
    id: 'rant-cozy-twake-name-change',
    description: 'Rant sur changement de nom Cozy→Twake, aucune action support actionnable',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `Bon, je n'imaginais pas que changer de drive provoquerait tant de questionnements... J'ai l'impression d'être une sorte de crash test pour Twake en réalité. Perso je pense qu'il n'aurait jamais fallu changer de nom car Cozy était parfait, c'était cool et ça marchait. D'ailleurs l'année dernière le drive se lançait sans aucun souci sur les vieux navigateurs du lycée. Je pense donc que ce nouveau nom y est pour quelque chose... Il est dur, froid... c'est sûr que c'est ça.`
    },
    expectedOutput: {
      global_mode: 'conversational',
      satisfaction: 'negative',
      time_sensitive: 'no',
      topics: []
    }
  },

  {
    id: 'english-multi-questions-sharing-crash-sync-mail',
    description: 'EN — 5 topics : partage dossiers, partage calendriers, crash Twake Pass, sync contacts, Twake mail',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `really like your service and it's interface but I decided to downgrade to the free version because there are some limitations and errors that in the end made it useless for me. But I would really like to use your service if these problems were solved. In that regard I have some questions and comments that I would appreciate you would answer: - I need a service together with my wife where we can share folders and photo albums between two accounts. The shared folders and albums should appear on both accounts. Is this possible with Twake? I don't see this option on my account - I would also like to share calendars between the accounts. Will this be a possibility in the near future? - The Twake Pass app keeps crashing right after login on my Fairphone 4 with /e/os installed. I can see others have the same problem. Is this something that will be solved? - When trying to use the Twake sync app to sync my contacts I simply don't know which credentials to use for logging in. Can you advice on this? - Will there be a Twake mail service in the near future?`
    },
    expectedOutput: {
      global_mode: 'structured_support',
      satisfaction: 'negative',
      time_sensitive: 'no',
      topics: [
        {
          topic_label: 'Drive : folder sharing',
          topic_category: 'question_faq',
          matched_historical_topic: 'no',
          topic_status: 'active',
          display_order: 1,
          context_anchor: 'folders, photo albums',
          context_anchor_complete: 'yes',
          user_goal: 'share folders and photo albums between two accounts',
          user_goal_complete: 'yes',
          gap_observed: '',
          gap_observed_complete: 'n/a',
          failure_step: '',
          failure_step_complete: 'n/a',
          environment_context: '',
          environment_context_status: 'n/a',
          bug_scope: '',
          bug_scope_status: 'n/a',
          blocking_issue: 'no',
          enough_information: 'yes',
          solution_type_available: 'no',
          main_response_type: 'acknowledgement',
          next_step: 'handover'
        },
        {
          topic_label: 'Calendar : sharing',
          topic_category: 'question_faq',
          matched_historical_topic: 'no',
          topic_status: 'active',
          display_order: 2,
          context_anchor: 'calendars',
          context_anchor_complete: 'yes',
          user_goal: 'share calendars between two accounts',
          user_goal_complete: 'yes',
          gap_observed: '',
          gap_observed_complete: 'n/a',
          failure_step: '',
          failure_step_complete: 'n/a',
          environment_context: '',
          environment_context_status: 'n/a',
          bug_scope: '',
          bug_scope_status: 'n/a',
          blocking_issue: 'no',
          enough_information: 'yes',
          solution_type_available: 'no',
          main_response_type: 'acknowledgement',
          next_step: 'handover'
        },
        {
          topic_label: 'Twake Pass : crash',
          topic_category: 'bug',
          matched_historical_topic: 'no',
          topic_status: 'active',
          display_order: 3,
          context_anchor: 'Twake Pass app',
          context_anchor_complete: 'yes',
          user_goal: 'use Twake Pass after login',
          user_goal_complete: 'yes',
          gap_observed: '',
          gap_observed_complete: 'n/a',
          failure_step: 'login to Twake Pass > app crashes immediately',
          failure_step_complete: 'yes',
          environment_context: 'Fairphone 4 + /e/os',
          environment_context_status: 'complete',
          bug_scope: 'always',
          bug_scope_status: 'limited',
          blocking_issue: 'yes',
          enough_information: 'yes',
          solution_type_available: 'no',
          main_response_type: 'acknowledgement',
          next_step: 'handover'
        },
        {
          topic_label: 'Twake Sync : credentials',
          topic_category: 'question_faq',
          matched_historical_topic: 'no',
          topic_status: 'active',
          display_order: 4,
          context_anchor: 'Twake Sync app, login',
          context_anchor_complete: 'yes',
          user_goal: 'know which credentials to use to sync contacts',
          user_goal_complete: 'yes',
          gap_observed: '',
          gap_observed_complete: 'n/a',
          failure_step: '',
          failure_step_complete: 'n/a',
          environment_context: '',
          environment_context_status: 'n/a',
          bug_scope: '',
          bug_scope_status: 'n/a',
          blocking_issue: 'no',
          enough_information: 'yes',
          solution_type_available: 'no',
          main_response_type: 'acknowledgement',
          next_step: 'handover'
        },
        {
          topic_label: 'Twake : mail service',
          topic_category: 'question_faq',
          matched_historical_topic: 'no',
          topic_status: 'active',
          display_order: 5,
          context_anchor: 'Twake mail',
          context_anchor_complete: 'yes',
          user_goal: 'know if a Twake mail service is planned',
          user_goal_complete: 'yes',
          gap_observed: '',
          gap_observed_complete: 'n/a',
          failure_step: '',
          failure_step_complete: 'n/a',
          environment_context: '',
          environment_context_status: 'n/a',
          bug_scope: '',
          bug_scope_status: 'n/a',
          blocking_issue: 'no',
          enough_information: 'yes',
          solution_type_available: 'no',
          main_response_type: 'acknowledgement',
          next_step: 'handover'
        }
      ]
    }
  },

  {
    id: 'connectors-broken-sync-failing',
    description: 'Connecteurs cassés (ENSAP, Netflix, Nespresso) + sync bancaire KO (CA, Total Energies)',
    input: {
      username: 'unknown',
      email: 'unknown',
      user_status: 'unknown',
      message: `utilisateur de Cozy puis maintenant de Twake depuis plusieurs années, je suis confronté aux situations suivantes : - des connecteurs qui ne fonctionnent plus, certains depuis plusieurs mois (ENSAP), voir années (NETFLIX, NESPRESSO)... - des synchronisations qui ne fonctionnent plus avec le Crédit Agricole ou encore plus récemment avec Total Energies... Pourriez-vous faire le nécessaire pour permettre le rétablissement du fonctionnement nominal de l'application et des connecteurs concernés ? Ou a minima, informer sur la reprise du service dans un délais raisonnable ou bien de l'abandon pur et simple des fonctionnalités. Vous remerciant pour votre appui, je me tiens à votre disposition pour toutes démarches ou informations complémentaires que vous estimeriez utiles au rétablissement de la situation qui m'avait conduit à adopter Cozy Cloud.`
    },
    expectedOutput: {
      global_mode: 'structured_support',
      satisfaction: 'negative',
      time_sensitive: 'no',
      topics: [
        {
          topic_label: 'Connectors : broken',
          topic_category: 'bug',
          matched_historical_topic: 'no',
          topic_status: 'active',
          display_order: 1,
          context_anchor: 'connecteurs ENSAP, NETFLIX, NESPRESSO',
          context_anchor_complete: 'yes',
          user_goal: 'restore working connectors (ENSAP, Netflix, Nespresso)',
          user_goal_complete: 'yes',
          gap_observed: '',
          gap_observed_complete: 'n/a',
          failure_step: 'connectors ENSAP, Netflix, Nespresso > no longer working',
          failure_step_complete: 'yes',
          environment_context: '',
          environment_context_status: 'missing',
          bug_scope: 'always',
          bug_scope_status: 'limited',
          blocking_issue: 'no',
          enough_information: 'no',
          solution_type_available: 'no',
          main_response_type: 'ask_info',
          next_step: 'wait_for_user'
        },
        {
          topic_label: 'Sync : bank connectors',
          topic_category: 'bug',
          matched_historical_topic: 'no',
          topic_status: 'active',
          display_order: 2,
          context_anchor: 'synchronisation Crédit Agricole, Total Energies',
          context_anchor_complete: 'yes',
          user_goal: 'restore bank sync with Crédit Agricole and Total Energies',
          user_goal_complete: 'yes',
          gap_observed: '',
          gap_observed_complete: 'n/a',
          failure_step: 'sync Crédit Agricole, Total Energies > no longer working',
          failure_step_complete: 'yes',
          environment_context: '',
          environment_context_status: 'missing',
          bug_scope: 'always',
          bug_scope_status: 'limited',
          blocking_issue: 'no',
          enough_information: 'no',
          solution_type_available: 'no',
          main_response_type: 'ask_info',
          next_step: 'wait_for_user'
        }
      ]
    }
  }

];
function formatSupportForClassification(messageData) {
  return `## USER CONTEXT
Username: ${messageData.username}
Email: ${messageData.email}
User status: ${messageData.user_status}

## SUPPORT MESSAGE
${messageData.message}

`;
}
//## AVAILABLE CATEGORIES
//##${availableLabels}

//## AVAILABLE SIGNALS
//##${availableSignals}
module.exports = {
  supportTestCases,
  availableLabels,
  availableSignals,
  formatSupportForClassification,
  SUPPORT_LABELS,
  SUPPORT_SIGNALS
};
