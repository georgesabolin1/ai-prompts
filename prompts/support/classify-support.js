const TEST_LIMIT = 5;

const { buildMessages } = require('../../utils/prompts');
const { SUPPORT_SYSTEM_INSTRUCTIONS } = require('../system_prompts');

const {
  supportJsonFormatValidV2,
  supportNoEmptyFields,
  supportSegmentsFormatValid,
  supportNoForbiddenGenericValues,
  supportNoRedundantOrContradictoryFields,
  supportSignalVerbatimExactSubstring,
  supportExpectedStructuredFieldsCorrect,
  supportExpectedFieldsPresent,
  supportSemanticCoherenceWithExpected,
  supportTriggerVsTestedActionCorrect,
  supportNoUnsupportedInference,
  supportUserGoalCoherent,
  supportTopicSignalBoundaryCorrect
} = require('../../utils/assertions');

const {
  supportTestCases,
  formatSupportForClassification
} = require('../../datasets/support-classification-testcases');

const task = 'Analyze a support message and return a structured support classification.';

const USE_LLM_ASSERTIONS = true;

function buildAssertions(testCase) {
  const deterministicAssertions = [
    { ...supportJsonFormatValidV2(), weight: 3 },
    { ...supportNoEmptyFields(), weight: 2 },
    { ...supportSegmentsFormatValid(), weight: 3 },
    { ...supportNoForbiddenGenericValues(), weight: 2 },
    { ...supportNoRedundantOrContradictoryFields(), weight: 2 },
    { ...supportSignalVerbatimExactSubstring(), weight: 1 },
    { ...supportExpectedStructuredFieldsCorrect(testCase.expectedOutput), weight: 4 },
    { ...supportExpectedFieldsPresent(testCase.expectedOutput), weight: 2 }
  ];

/*
  const llmAssertions = [
    { ...supportSemanticCoherenceWithExpected(), weight: 4 },
    { ...supportTriggerVsTestedActionCorrect(), weight: 2 },
    { ...supportNoUnsupportedInference(), weight: 3 },
    { ...supportUserGoalCoherent(), weight: 2 },
    { ...supportTopicSignalBoundaryCorrect(), weight: 3 }
  ];

  return USE_LLM_ASSERTIONS
    ? [...deterministicAssertions, ...llmAssertions]
    : deterministicAssertions;
*/

  return deterministicAssertions;
}

module.exports = {
  id: 'classify-support',
  description: 'Analyze support messages and return a structured segmented support classification',
  version: '2.0.0',

  messages: buildMessages({
    task,
    system_instruction: SUPPORT_SYSTEM_INSTRUCTIONS
  }),

  tests: supportTestCases.slice(0, TEST_LIMIT).map(testCase => ({
    description: testCase.description,
    threshold: 0.85,
    vars: {
      input: formatSupportForClassification(testCase.input),
      expected_output: JSON.stringify(testCase.expectedOutput, null, 2)
    },
    assert: buildAssertions(testCase)
  }))
};
