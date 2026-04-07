const { buildMessages } = require('../../utils/prompts');
const { SCRIBE_SYSTEM_INSTRUCTIONS } = require('../system_prompts');
const { noTranslation, noExtraInfo } = require('../../utils/assertions');

const task = 'Change the tone to be ironical.';

module.exports = {
  id: 'change-tone-ironical',
  description: 'Change tone to ironical',
  version: '1.0.0',

  messages: buildMessages({ task, system_instruction: SCRIBE_SYSTEM_INSTRUCTIONS }),

  tests: [
    {
      description: 'Change tone to ironical - French direct input',
      vars: {
        input: "Envoyez-moi le rapport demain. J'ai besoin des chiffres de vente aussi."
      },
      assert: [
        noTranslation(),
        noExtraInfo({ task }),
        {
          type: 'llm-rubric',
          value: 'The tone is ironical. The tone may be informal.'
        }
      ]
    }
  ]
};
