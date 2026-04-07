const TEST_LIMIT = 10;

const { buildMessages } = require('../../utils/prompts');
const { SUPPORT_SYSTEM_INSTRUCTIONS } = require('../system_prompts');
const {
  supportJsonFormatValid,
  categoriesCorrect,
  signalsCorrect,
  subjectRelevant,
  followUpQuestionsRelevant
} = require('../../utils/assertions');
const {
  supportTestCases,
  formatSupportForClassification
} = require('../../datasets/support-classification-testcases');

const task = 'Analyze a support message and return a structured support classification.';

module.exports = {
  id: 'classify-support',
  description: 'Analyze support messages and return a structured classification',
  version: '1.0.0',

  messages: buildMessages({
    task,
    system_instruction: SUPPORT_SYSTEM_INSTRUCTIONS
  }),

tests: supportTestCases.slice(0, TEST_LIMIT).map(testCase => ({
  description: testCase.description,
  threshold: 0.8,
  vars: {
    input: formatSupportForClassification(testCase.input),
    expected_output: JSON.stringify(testCase.expectedOutput, null, 2)
  },
  assert: [
    { ...supportJsonFormatValid(), weight: 3 },
    { ...categoriesCorrect(testCase.expectedOutput.categories), weight: 3 },
    { ...signalsCorrect(testCase.expectedOutput.signals), weight: 1 },
    { ...subjectRelevant(testCase.expectedOutput.subject), weight: 2 },
    { ...followUpQuestionsRelevant(testCase.expectedOutput.follow_up_questions), weight: 3 }
  ]
}))
};
