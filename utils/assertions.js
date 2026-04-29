/**
 * Global shared assertions for prompt evaluation
 * Each function returns a PromptFoo assertion object
 */

/**
 * GENERIC ASSERTIONS
 */

function noTranslation() {
  return {
    type: 'llm-rubric',
    value: 'The output is in the same language as the original input. No translation occurred.\nOriginal input: "{{input}}"'
  };
}

function noExtraInfo({ task }) {
  return {
    type: 'llm-rubric',
    value: `You are evaluating whether an AI text-editing assistant followed the "output only" rule.

The assistant was given this task: "${task}"
The original input was: "{{input}}"

PASS if: The output contains ONLY the transformed text — the result of applying the task to the input. Courtesy language, greetings, or polite phrasing that are PART OF the rewritten content itself are acceptable.

FAIL if: The output contains ANY of these:
- A preamble like "Here is the result:", "Sure!", "Certainly!"
- An explanation of what was changed
- A note, caveat, or commentary about the transformation
- The original instruction repeated back
`
  };
}

function meaningPreserved() {
  return {
    type: 'llm-rubric',
    value: `The core meaning of the original text is unchanged. Key information and intent are preserved.\nOriginal input: "{{input}}"`
  };
}

function translationAccurate(targetLanguage) {
  return {
    type: 'llm-rubric',
    value: `The text has been translated to ${targetLanguage}. The meaning is preserved.\nOriginal input: "{{input}}"`
  };
}

/**
 * SUPPORT ASSERTIONS V2
 * For segmented support JSON schema:
 * {
 *   user_language,
 *   warning_comprehension,
 *   segments: [
 *     topic | signal | scope_boundary
 *   ]
 * }
 */

const SUPPORT_COMMON_JS = `
function cleanJsonOutput(rawOutput) {
  let raw = (rawOutput || '').trim();
  raw = raw.replace(/^\\\`\\\`\\\`json\\s*/i, '');
  raw = raw.replace(/^\\\`\\\`\\\`\\s*/i, '');
  raw = raw.replace(/\\s*\\\`\\\`\\\`$/i, '');
  return raw.trim();
}

function parseOutput(output) {
  try {
    return { parsed: JSON.parse(cleanJsonOutput(output)), error: null };
  } catch (e) {
    return { parsed: null, error: e };
  }
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function normalizeString(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\\s+/g, ' ');
}

function getTopics(parsed) {
  return (parsed.segments || []).filter(s => s.segment_type === 'topic');
}

function getSignals(parsed) {
  return (parsed.segments || []).filter(s => s.segment_type === 'signal');
}

function getScopeBoundaries(parsed) {
  return (parsed.segments || []).filter(s => s.segment_type === 'scope_boundary');
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) return acc[key];
    return undefined;
  }, obj);
}

function walk(value, path, visitor) {
  visitor(value, path);

  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, path ? path + '.' + index : String(index), visitor));
  } else if (isPlainObject(value)) {
    Object.entries(value).forEach(([key, val]) => {
      walk(val, path ? path + '.' + key : key, visitor);
    });
  }
}

const ALLOWED_USER_LANGUAGES = ['French', 'English', 'Other', 'Unknown'];
const ALLOWED_WARNING = ['yes', 'no'];
const ALLOWED_SEGMENT_TYPES = ['topic', 'signal', 'scope_boundary'];
const ALLOWED_TOPIC_CATEGORIES = ['billing', 'access_security', 'bug', 'request', 'question_faq', 'other'];
const ALLOWED_MATCHED = ['yes', 'no'];
const ALLOWED_BLOCKING = ['yes', 'no'];
const ALLOWED_OUTCOMES = ['worked', 'failed', 'partially_worked', 'not_tried', 'unclear'];

const ALLOWED_SIGNAL_TYPES = [
  'thanks_neutral',
  'thanks_positive',
  'positive_feedback',
  'negative_feedback',
  'disappointment',
  'churn_intent',
  'waiting',
  'apology',
  'closure',
  'time_sensitive',
  'impolite',
  'complaint_without_actionable_detail',
  'communication_feedback',
  'pricing_feedback',
  'feature_loss_feedback',
  'confirmation_without_new_field'
];

const ALLOWED_SCOPE_BOUNDARY_TYPES = [
  'generic_out_of_scope',
  'non_support_linagora',
  'unrelated_request',
  'spam_or_commercial'
];

const ALLOWED_ROOT_KEYS = [
  'user_language',
  'warning_comprehension',
  'segments'
];

const ALLOWED_TOPIC_KEYS = [
  'segment_type',
  'matched_historical_topic',
  'id_topic',
  'topic_category',
  'tool_or_product',
  'topic_action',
  'topic_object',
  'topic_label',
  'topic_details',
  'tested_action',
  'outcome_tested_action',
  'user_goal',
  'blocking_issue'
];

const ALLOWED_TOPIC_DETAIL_KEYS = [
  'feature_or_page',
  'provided_url',
  'pre_problem_state',
  'observed_result',
  'expected_result',
  'error_message',
  'platform',
  'account_context',
  'frequency',
  'affected_scope',
  'screenshot_available',
  'additional_context',
  'trigger_action',
  'access_action',
  'auth_method',
  'os',
  'device',
  'browser',
  'app_version',
  'server_or_instance',
  'affected_users',
  'video_available',
  'logs_available',
  'billing_issue_type',
  'billing_provider',
  'offer_or_plan',
  'amount',
  'currency',
  'billing_date_or_period',
  'gap_observed',
  'question_intent'
];

const ALLOWED_QUESTION_INTENTS = ['how_to', 'is_it_possible', 'future_availability'];
const ALLOWED_AVAILABILITY_VALUES = ['yes', 'no', 'not possible'];

const FORBIDDEN_EXACT_VALUES = [
  'unknown',
  'iOS device',
  'Android device',
  'mobile device',
  'desktop device',
  'latest version',
  'current version',
  'latest',
  'all documents',
  'all files',
  'all users',
  'only me',
  'default account'
];
`;

function supportJsonFormatValidV2() {
  return {
    type: 'javascript',
    value: `
      ${SUPPORT_COMMON_JS}

      const { parsed, error } = parseOutput(output);

      if (error) {
        return { pass: false, score: 0, reason: 'Output is not valid JSON' };
      }

      if (!isPlainObject(parsed)) {
        return { pass: false, score: 0, reason: 'Output must be a JSON object' };
      }

      for (const key of Object.keys(parsed)) {
        if (!ALLOWED_ROOT_KEYS.includes(key)) {
          return { pass: false, score: 0, reason: 'Invalid root key: ' + key };
        }
      }

      if (!ALLOWED_USER_LANGUAGES.includes(parsed.user_language)) {
        return { pass: false, score: 0, reason: 'Invalid or missing user_language: ' + parsed.user_language };
      }

      if (!ALLOWED_WARNING.includes(parsed.warning_comprehension)) {
        return { pass: false, score: 0, reason: 'warning_comprehension must be "yes" or "no"' };
      }

      if (!Array.isArray(parsed.segments)) {
        return { pass: false, score: 0, reason: 'segments must be an array' };
      }

      if (parsed.segments.length === 0) {
        return { pass: false, score: 0, reason: 'segments must contain at least one segment' };
      }

      return { pass: true, score: 1, reason: 'Support JSON root format is valid' };
    `
  };
}

function supportNoEmptyFields() {
  return {
    type: 'javascript',
    value: `
      ${SUPPORT_COMMON_JS}

      const { parsed, error } = parseOutput(output);

      if (error) {
        return { pass: false, score: 0, reason: 'Output is not valid JSON' };
      }

      const violations = [];

      walk(parsed, '', (value, path) => {
        if (value === null) {
          violations.push(path + ' is null');
        }

        if (typeof value === 'string' && value.trim() === '') {
          violations.push(path + ' is an empty string');
        }

        if (Array.isArray(value) && value.length === 0) {
          violations.push(path + ' is an empty array');
        }

        if (isPlainObject(value) && Object.keys(value).length === 0) {
          violations.push(path + ' is an empty object');
        }
      });

      if (violations.length > 0) {
        return {
          pass: false,
          score: 0,
          reason: 'Empty fields found: ' + violations.slice(0, 12).join('; ')
        };
      }

      return { pass: true, score: 1, reason: 'No empty fields found' };
    `
  };
}

function supportSegmentsFormatValid() {
  return {
    type: 'javascript',
    value: `
      ${SUPPORT_COMMON_JS}

      const { parsed, error } = parseOutput(output);

      if (error) {
        return { pass: false, score: 0, reason: 'Output is not valid JSON' };
      }

      if (!Array.isArray(parsed.segments)) {
        return { pass: false, score: 0, reason: 'segments must be an array' };
      }

      for (let i = 0; i < parsed.segments.length; i++) {
        const segment = parsed.segments[i];

        if (!isPlainObject(segment)) {
          return { pass: false, score: 0, reason: 'Segment ' + i + ' must be an object' };
        }

        if (!ALLOWED_SEGMENT_TYPES.includes(segment.segment_type)) {
          return { pass: false, score: 0, reason: 'Invalid segment_type at segment ' + i + ': ' + segment.segment_type };
        }

        if (segment.segment_type === 'topic') {
          for (const key of Object.keys(segment)) {
            if (!ALLOWED_TOPIC_KEYS.includes(key)) {
              return { pass: false, score: 0, reason: 'Invalid key in topic segment ' + i + ': ' + key };
            }
          }

          if (!ALLOWED_MATCHED.includes(segment.matched_historical_topic)) {
            return { pass: false, score: 0, reason: 'Invalid or missing matched_historical_topic at topic ' + i };
          }

          if (!Number.isInteger(segment.id_topic) || segment.id_topic < 1) {
            return { pass: false, score: 0, reason: 'id_topic must be a positive integer at topic ' + i };
          }

          if (!ALLOWED_TOPIC_CATEGORIES.includes(segment.topic_category)) {
            return { pass: false, score: 0, reason: 'Invalid or missing topic_category at topic ' + i + ': ' + segment.topic_category };
          }

          if (!ALLOWED_BLOCKING.includes(segment.blocking_issue)) {
            return { pass: false, score: 0, reason: 'blocking_issue must be yes/no at topic ' + i };
          }

          if (typeof segment.user_goal !== 'string' || !segment.user_goal.trim()) {
            return { pass: false, score: 0, reason: 'user_goal must be a non-empty string at topic ' + i };
          }

          if (segment.user_goal.length > 240) {
            return { pass: false, score: 0, reason: 'user_goal is too long at topic ' + i + ': ' + segment.user_goal.length + ' chars' };
          }

          if (hasOwn(segment, 'tested_action') !== hasOwn(segment, 'outcome_tested_action')) {
            return { pass: false, score: 0, reason: 'tested_action and outcome_tested_action must appear together at topic ' + i };
          }

          if (hasOwn(segment, 'outcome_tested_action') && !ALLOWED_OUTCOMES.includes(segment.outcome_tested_action)) {
            return { pass: false, score: 0, reason: 'Invalid outcome_tested_action at topic ' + i + ': ' + segment.outcome_tested_action };
          }

          if (hasOwn(segment, 'topic_details')) {
            if (!isPlainObject(segment.topic_details)) {
              return { pass: false, score: 0, reason: 'topic_details must be an object at topic ' + i };
            }

            for (const key of Object.keys(segment.topic_details)) {
              if (!ALLOWED_TOPIC_DETAIL_KEYS.includes(key)) {
                return { pass: false, score: 0, reason: 'Invalid topic_details key at topic ' + i + ': ' + key };
              }
            }

            if (hasOwn(segment.topic_details, 'question_intent') && !ALLOWED_QUESTION_INTENTS.includes(segment.topic_details.question_intent)) {
              return { pass: false, score: 0, reason: 'Invalid question_intent at topic ' + i + ': ' + segment.topic_details.question_intent };
            }

            for (const field of ['screenshot_available', 'video_available', 'logs_available']) {
              if (hasOwn(segment.topic_details, field) && !ALLOWED_AVAILABILITY_VALUES.includes(segment.topic_details[field])) {
                return { pass: false, score: 0, reason: 'Invalid ' + field + ' at topic ' + i + ': ' + segment.topic_details[field] };
              }
            }
          }
        }

        if (segment.segment_type === 'signal') {
          const allowedKeys = ['segment_type', 'signal_verbatim', 'signal_types'];

          for (const key of Object.keys(segment)) {
            if (!allowedKeys.includes(key)) {
              return { pass: false, score: 0, reason: 'Invalid key in signal segment ' + i + ': ' + key };
            }
          }

          if (typeof segment.signal_verbatim !== 'string' || !segment.signal_verbatim.trim()) {
            return { pass: false, score: 0, reason: 'signal_verbatim must be a non-empty string at signal ' + i };
          }

          if (!Array.isArray(segment.signal_types) || segment.signal_types.length === 0) {
            return { pass: false, score: 0, reason: 'signal_types must be a non-empty array at signal ' + i };
          }

          for (const signalType of segment.signal_types) {
            if (!ALLOWED_SIGNAL_TYPES.includes(signalType)) {
              return { pass: false, score: 0, reason: 'Invalid signal_type at signal ' + i + ': ' + signalType };
            }
          }

          const uniqueSignals = [...new Set(segment.signal_types)];

          if (uniqueSignals.length !== segment.signal_types.length) {
            return { pass: false, score: 0, reason: 'Duplicate signal_types at signal ' + i };
          }
        }

        if (segment.segment_type === 'scope_boundary') {
          const allowedKeys = ['segment_type', 'signal_verbatim', 'scope_boundary_type'];

          for (const key of Object.keys(segment)) {
            if (!allowedKeys.includes(key)) {
              return { pass: false, score: 0, reason: 'Invalid key in scope_boundary segment ' + i + ': ' + key };
            }
          }

          if (typeof segment.signal_verbatim !== 'string' || !segment.signal_verbatim.trim()) {
            return { pass: false, score: 0, reason: 'signal_verbatim must be non-empty at scope_boundary ' + i };
          }

          if (!ALLOWED_SCOPE_BOUNDARY_TYPES.includes(segment.scope_boundary_type)) {
            return { pass: false, score: 0, reason: 'Invalid scope_boundary_type at segment ' + i + ': ' + segment.scope_boundary_type };
          }
        }
      }

      return { pass: true, score: 1, reason: 'All segments match expected format' };
    `
  };
}

function supportNoForbiddenGenericValues() {
  return {
    type: 'javascript',
    value: `
      ${SUPPORT_COMMON_JS}

      const { parsed, error } = parseOutput(output);

      if (error) {
        return { pass: false, score: 0, reason: 'Output is not valid JSON' };
      }

      const violations = [];

      walk(parsed, '', (value, path) => {
        if (typeof value !== 'string') return;

        const normalized = normalizeString(value);

        for (const forbidden of FORBIDDEN_EXACT_VALUES) {
          if (normalized === normalizeString(forbidden)) {
            violations.push(path + ' = "' + value + '"');
          }
        }
      });

      if (violations.length > 0) {
        return {
          pass: false,
          score: 0,
          reason: 'Forbidden generic values found: ' + violations.slice(0, 12).join('; ')
        };
      }

      return { pass: true, score: 1, reason: 'No forbidden generic values found' };
    `
  };
}

function supportNoRedundantOrContradictoryFields() {
  return {
    type: 'javascript',
    value: `
      ${SUPPORT_COMMON_JS}

      const { parsed, error } = parseOutput(output);

      if (error) {
        return { pass: false, score: 0, reason: 'Output is not valid JSON' };
      }

      const topics = getTopics(parsed);

      for (let i = 0; i < topics.length; i++) {
        const topic = topics[i];
        const details = topic.topic_details || {};

        if (hasOwn(details, 'pre_problem_state') && hasOwn(details, 'observed_result')) {
          if (normalizeString(details.pre_problem_state) === normalizeString(details.observed_result)) {
            return {
              pass: false,
              score: 0,
              reason: 'pre_problem_state and observed_result must not be identical at topic ' + i
            };
          }
        }

        if (hasOwn(details, 'error_message') && hasOwn(details, 'observed_result')) {
          if (normalizeString(details.error_message) === normalizeString(details.observed_result)) {
            return {
              pass: false,
              score: 0,
              reason: 'error_message and observed_result must not be identical at topic ' + i
            };
          }
        }

        if (hasOwn(topic, 'tested_action') && hasOwn(details, 'trigger_action')) {
          if (normalizeString(topic.tested_action) === normalizeString(details.trigger_action)) {
            return {
              pass: false,
              score: 0,
              reason: 'tested_action and trigger_action must not be identical at topic ' + i
            };
          }
        }

        if (hasOwn(details, 'tested_action') || hasOwn(details, 'outcome_tested_action')) {
          return {
            pass: false,
            score: 0,
            reason: 'tested_action/outcome_tested_action must be segment-level fields, not inside topic_details at topic ' + i
          };
        }

        if (hasOwn(details, 'trigger_action') && topic.topic_category !== 'bug') {
          return {
            pass: false,
            score: 0,
            reason: 'trigger_action should only appear for bug topics at topic ' + i
          };
        }

        if ((hasOwn(details, 'access_action') || hasOwn(details, 'auth_method')) && topic.topic_category !== 'access_security') {
          return {
            pass: false,
            score: 0,
            reason: 'access_action/auth_method should only appear for access_security topics at topic ' + i
          };
        }

        if (hasOwn(details, 'gap_observed') && topic.topic_category !== 'request') {
          return {
            pass: false,
            score: 0,
            reason: 'gap_observed should only appear for request topics at topic ' + i
          };
        }

        if (hasOwn(details, 'question_intent') && topic.topic_category !== 'question_faq') {
          return {
            pass: false,
            score: 0,
            reason: 'question_intent should only appear for question_faq topics at topic ' + i
          };
        }

        const billingFields = [
          'billing_issue_type',
          'billing_provider',
          'offer_or_plan',
          'amount',
          'currency',
          'billing_date_or_period'
        ];

        const hasBillingField = billingFields.some(field => hasOwn(details, field));

        if (hasBillingField && topic.topic_category !== 'billing') {
          return {
            pass: false,
            score: 0,
            reason: 'billing fields should only appear for billing topics at topic ' + i
          };
        }

        if (hasOwn(topic, 'topic_label')) {
          const hasAllLabelParts =
            hasOwn(topic, 'tool_or_product') &&
            hasOwn(topic, 'topic_action') &&
            hasOwn(topic, 'topic_object');

          if (hasAllLabelParts) {
            const expectedLabel = topic.tool_or_product + ' : ' + topic.topic_action + ' : ' + topic.topic_object;

            if (topic.topic_label !== expectedLabel) {
              return {
                pass: false,
                score: 0,
                reason: 'topic_label does not match tool_or_product/topic_action/topic_object at topic ' + i
              };
            }
          }
        }
      }

      return { pass: true, score: 1, reason: 'No redundant or contradictory fields found' };
    `
  };
}

function supportSignalVerbatimExactSubstring() {
  return {
    type: 'javascript',
    value: `
      ${SUPPORT_COMMON_JS}

      const { parsed, error } = parseOutput(output);

      if (error) {
        return { pass: false, score: 0, reason: 'Output is not valid JSON' };
      }

      const inputText =
        typeof context !== 'undefined' &&
        context &&
        context.vars &&
        typeof context.vars.input === 'string'
          ? context.vars.input
          : '';

      if (!inputText) {
        return { pass: true, score: 1, reason: 'No input text available in assertion context; skipped exact substring check' };
      }

      const signalLikeSegments = getSignals(parsed).concat(getScopeBoundaries(parsed));

      for (let i = 0; i < signalLikeSegments.length; i++) {
        const verbatim = signalLikeSegments[i].signal_verbatim;

        if (typeof verbatim !== 'string' || !verbatim.trim()) {
          return { pass: false, score: 0, reason: 'Missing signal_verbatim at signal/scope segment ' + i };
        }

        if (!inputText.includes(verbatim)) {
          return {
            pass: false,
            score: 0,
            reason: 'signal_verbatim is not an exact substring of input: ' + verbatim
          };
        }
      }

      return { pass: true, score: 1, reason: 'All signal_verbatim values are exact substrings' };
    `
  };
}

function supportExpectedStructuredFieldsCorrect(expectedOutput = {}) {
  return {
    type: 'javascript',
    value: `
      ${SUPPORT_COMMON_JS}

      const expected = ${JSON.stringify(expectedOutput)};
      const { parsed, error } = parseOutput(output);

      if (error) {
        return { pass: false, score: 0, reason: 'Output is not valid JSON' };
      }

      function orderedSegmentTypes(obj) {
        return (obj.segments || []).map(s => s.segment_type);
      }

      function orderedTopicValues(obj, field) {
        return (obj.segments || [])
          .filter(s => s.segment_type === 'topic')
          .map(s => s[field])
          .filter(v => v !== undefined);
      }

      function orderedTopicDetailValues(obj, field) {
        return (obj.segments || [])
          .filter(s => s.segment_type === 'topic')
          .map(s => s.topic_details ? s.topic_details[field] : undefined)
          .filter(v => v !== undefined);
      }

      function aggregateSignalTypes(obj) {
        return [
          ...new Set(
            (obj.segments || [])
              .filter(s => s.segment_type === 'signal')
              .flatMap(s => Array.isArray(s.signal_types) ? s.signal_types : [])
          )
        ].sort();
      }

      function orderedScopeTypes(obj) {
        return (obj.segments || [])
          .filter(s => s.segment_type === 'scope_boundary')
          .map(s => s.scope_boundary_type);
      }

      const checks = [
        ['user_language', parsed.user_language, expected.user_language],
        ['warning_comprehension', parsed.warning_comprehension, expected.warning_comprehension],
        ['segment_type order', orderedSegmentTypes(parsed), orderedSegmentTypes(expected)],
        ['topic_category order', orderedTopicValues(parsed, 'topic_category'), orderedTopicValues(expected, 'topic_category')],
        ['id_topic order', orderedTopicValues(parsed, 'id_topic'), orderedTopicValues(expected, 'id_topic')],
        ['matched_historical_topic order', orderedTopicValues(parsed, 'matched_historical_topic'), orderedTopicValues(expected, 'matched_historical_topic')],
        ['blocking_issue order', orderedTopicValues(parsed, 'blocking_issue'), orderedTopicValues(expected, 'blocking_issue')],
        ['outcome_tested_action order', orderedTopicValues(parsed, 'outcome_tested_action'), orderedTopicValues(expected, 'outcome_tested_action')],
        ['question_intent order', orderedTopicDetailValues(parsed, 'question_intent'), orderedTopicDetailValues(expected, 'question_intent')],
        ['scope_boundary_type order', orderedScopeTypes(parsed), orderedScopeTypes(expected)],
        ['aggregate signal_types', aggregateSignalTypes(parsed), aggregateSignalTypes(expected)]
      ];

      for (const [label, actualValue, expectedValue] of checks) {
        if (expectedValue === undefined) continue;

        const actualJson = JSON.stringify(actualValue);
        const expectedJson = JSON.stringify(expectedValue);

        if (actualJson !== expectedJson) {
          return {
            pass: false,
            score: 0,
            reason: label + ' mismatch. Expected ' + expectedJson + ', got ' + actualJson
          };
        }
      }

      return { pass: true, score: 1, reason: 'Structured expected fields are correct' };
    `
  };
}

function supportExpectedFieldsPresent(expectedOutput = {}) {
  return {
    type: 'javascript',
    value: `
      ${SUPPORT_COMMON_JS}

      const expected = ${JSON.stringify(expectedOutput)};
      const { parsed, error } = parseOutput(output);

      if (error) {
        return { pass: false, score: 0, reason: 'Output is not valid JSON' };
      }

      function collectLeafPaths(obj, prefix) {
        const paths = [];

        if (!isPlainObject(obj)) return paths;

        for (const [key, value] of Object.entries(obj)) {
          const path = prefix ? prefix + '.' + key : key;

          if (isPlainObject(value)) {
            paths.push(...collectLeafPaths(value, path));
          } else {
            paths.push(path);
          }
        }

        return paths;
      }

      const expectedSegments = expected.segments || [];
      const actualSegments = parsed.segments || [];

      for (let i = 0; i < expectedSegments.length; i++) {
        const expectedSegment = expectedSegments[i];
        const actualSegment = actualSegments[i];

        if (!actualSegment) {
          return { pass: false, score: 0, reason: 'Missing segment at index ' + i };
        }

        const expectedPaths = collectLeafPaths(expectedSegment, '');

        for (const path of expectedPaths) {
          const expectedValue = getByPath(expectedSegment, path);

          if (
            expectedValue === undefined ||
            expectedValue === null ||
            expectedValue === '' ||
            (Array.isArray(expectedValue) && expectedValue.length === 0)
          ) {
            continue;
          }

          const actualValue = getByPath(actualSegment, path);

          if (
            actualValue === undefined ||
            actualValue === null ||
            actualValue === '' ||
            (Array.isArray(actualValue) && actualValue.length === 0)
          ) {
            return {
              pass: false,
              score: 0,
              reason: 'Expected field missing or empty at segment ' + i + ': ' + path
            };
          }
        }
      }

      return { pass: true, score: 1, reason: 'All expected fields are present' };
    `
  };
}

function supportSemanticCoherenceWithExpected() {
  return {
    type: 'llm-rubric',
    value: `You are evaluating a structured JSON output for a support-message analysis task.

Original formatted input:
{{input}}

Expected reference JSON:
{{expected_output}}

Actual model output:
{{output}}

Evaluate semantic correctness, not exact wording.

PASS if:
- The actual output identifies the same main support topics as the expected JSON.
- Topic categories are semantically appropriate.
- The actual topic_details preserve the same factual information, even if wording differs.
- user_goal summaries are faithful to the user message and do not invent causes.
- Signal segments capture the same support relationship signals, even if segmentation differs.
- Scope boundary segments are used only for genuinely out-of-scope content.
- The output does not invent unsupported product, platform, device, version, account, or scope details.
- Historical topics are matched when the user clearly follows up on a previous topic.
- Resolved topics are marked as no longer blocking when the user says it now works.

FAIL if:
- A concrete topic is missed.
- A vague complaint or churn message is incorrectly turned into a concrete topic.
- A topic category is clearly wrong.
- An unsupported detail is invented.
- The model loses an important explicit constraint, error message, platform, OS, device, amount, provider, or outcome.
- A signal is badly misclassified, such as churn_intent missing when the user explicitly says they will leave.`
  };
}

function supportTriggerVsTestedActionCorrect() {
  return {
    type: 'llm-rubric',
    value: `Evaluate whether the JSON correctly distinguishes trigger_action from tested_action.

Original formatted input:
{{input}}

Expected reference JSON:
{{expected_output}}

Actual model output:
{{output}}

Rules:
- trigger_action is the normal product action that causes the issue.
  Example: "when I click Save, nothing happens" → trigger_action = click Save.
- tested_action is only a troubleshooting, retry, workaround, or verification action explicitly tried by the user.
  Example: "I reinstalled the app but it still fails" → tested_action = reinstall the app, outcome_tested_action = failed.
- A normal failing product action must never be used as tested_action.
- tested_action and outcome_tested_action must be omitted if no troubleshooting, retry, workaround, or verification was actually performed.
- If the user says "I tried it" and attempt_history clearly identifies the prior suggested action, tested_action may refer to that previous suggested action.

PASS if the distinction is respected.
FAIL if trigger_action and tested_action are confused, duplicated, or invented.`
  };
}

function supportNoUnsupportedInference() {
  return {
    type: 'llm-rubric',
    value: `Evaluate whether the JSON output avoids unsupported inference.

Original formatted input:
{{input}}

Expected reference JSON:
{{expected_output}}

Actual model output:
{{output}}

PASS if every extracted field is explicitly supported by:
- latest_user_message,
- previous_analysis_output for matched historical topics,
- conversation_logs,
- attempt_history.

FAIL if the output invents or overgeneralizes any of the following:
- device model,
- app version,
- affected users,
- affected scope,
- platform,
- browser,
- account type,
- screenshot/video/log availability,
- cause of the issue,
- action tested by the user,
- outcome of an action.

Especially fail if it outputs generic placeholders such as:
"iOS device", "mobile device", "latest version", "all documents", "only me", or "unknown".`
  };
}

function supportUserGoalCoherent() {
  return {
    type: 'llm-rubric',
    value: `Evaluate whether each topic.user_goal is coherent and useful.

Original formatted input:
{{input}}

Actual model output:
{{output}}

PASS if:
- Each user_goal is in English.
- Each user_goal summarizes the corresponding topic accurately.
- Each user_goal is concise and useful for internal support routing.
- Each user_goal does not include unsupported causes, emotions, greetings, or marketing feedback.
- If a topic is resolved, the user_goal states the resolved status without contradiction.

FAIL if:
- user_goal contradicts topic_details.
- user_goal keeps saying the issue is unresolved even though the user says it now works.
- user_goal adds a cause not stated by the user.
- user_goal mixes unrelated signal feedback into the support topic.`
  };
}

function supportTopicSignalBoundaryCorrect() {
  return {
    type: 'llm-rubric',
    value: `Evaluate whether the output correctly separates topic, signal, and scope_boundary segments.

Original formatted input:
{{input}}

Expected reference JSON:
{{expected_output}}

Actual model output:
{{output}}

Definitions:
- topic = actionable support item: bug, access/security issue, billing issue, request, or concrete question.
- signal = feedback, thanks, disappointment, churn intent, urgency, waiting, apology, closure, or non-actionable complaint.
- scope_boundary = outside Linagora/Twake/Cozy support scope.

PASS if:
- Concrete support issues are represented as topics.
- Pure feedback or churn without actionable support detail remains signal.
- Out-of-scope spam or unrelated requests are scope_boundary.
- Statements like "I cannot provide a screenshot" enrich topic_details instead of becoming a signal.

FAIL if:
- Vague dissatisfaction is incorrectly turned into a topic.
- A real bug/request/question is only classified as signal.
- Out-of-scope content is treated as a support topic.
- A topic detail is duplicated as a separate signal.`
  };
}

/**
 * LEGACY SUPPORT ASSERTIONS
 * Kept for older prompts if needed.
 * Do not use these for the segmented support schema.
 */

function supportJsonFormatValid() {
  return {
    type: 'javascript',
    value: `
      function cleanJsonOutput(rawOutput) {
        let raw = (rawOutput || '').trim();
        raw = raw.replace(/^\\\`\\\`\\\`json\\s*/i, '');
        raw = raw.replace(/^\\\`\\\`\\\`\\s*/i, '');
        raw = raw.replace(/\\s*\\\`\\\`\\\`$/i, '');
        return raw.trim();
      }

      let parsed;
      try {
        parsed = JSON.parse(cleanJsonOutput(output));
      } catch (e) {
        return { pass: false, score: 0, reason: 'Output is not valid JSON' };
      }

      const allowedCategories = ['feature_request', 'bug_report', 'question', 'other'];
      const allowedSignals = ['blocking_issue', 'time_sensitive', 'churn_risk'];

      if (!Array.isArray(parsed.categories)) {
        return { pass: false, score: 0, reason: 'categories must be an array' };
      }

      if (parsed.categories.length === 0) {
        return { pass: false, score: 0, reason: 'categories must contain at least one value' };
      }

      for (const cat of parsed.categories) {
        if (!allowedCategories.includes(cat)) {
          return { pass: false, score: 0, reason: 'Invalid category: ' + cat };
        }
      }

      const uniqueCategories = [...new Set(parsed.categories)];
      if (uniqueCategories.length !== parsed.categories.length) {
        return { pass: false, score: 0, reason: 'categories must not contain duplicates' };
      }

      if (!Array.isArray(parsed.signals)) {
        return { pass: false, score: 0, reason: 'signals must be an array' };
      }

      for (const signal of parsed.signals) {
        if (!allowedSignals.includes(signal)) {
          return { pass: false, score: 0, reason: 'Invalid signal: ' + signal };
        }
      }

      const uniqueSignals = [...new Set(parsed.signals)];
      if (uniqueSignals.length !== parsed.signals.length) {
        return { pass: false, score: 0, reason: 'signals must not contain duplicates' };
      }

      if (typeof parsed.subject !== 'string' || !parsed.subject.trim()) {
        return { pass: false, score: 0, reason: 'subject must be a non-empty string' };
      }

      if (!Array.isArray(parsed.follow_up_questions)) {
        return { pass: false, score: 0, reason: 'follow_up_questions must be an array' };
      }

      if (parsed.follow_up_questions.length > 1) {
        return { pass: false, score: 0, reason: 'follow_up_questions must contain at most 2 questions' };
      }

      for (const q of parsed.follow_up_questions) {
        if (typeof q !== 'string' || !q.trim()) {
          return { pass: false, score: 0, reason: 'Each follow-up question must be a non-empty string' };
        }
      }

      return { pass: true, score: 1, reason: 'Support JSON format is valid' };
    `
  };
}

function categoriesCorrect(expectedCategories = []) {
  return {
    type: 'javascript',
    value: `
      function cleanJsonOutput(rawOutput) {
        let raw = (rawOutput || '').trim();
        raw = raw.replace(/^\\\`\\\`\\\`json\\s*/i, '');
        raw = raw.replace(/^\\\`\\\`\\\`\\s*/i, '');
        raw = raw.replace(/\\s*\\\`\\\`\\\`$/i, '');
        return raw.trim();
      }

      let parsed;
      try {
        parsed = JSON.parse(cleanJsonOutput(output));
      } catch (e) {
        return { pass: false, score: 0, reason: 'Output is not valid JSON' };
      }

      const actual = Array.isArray(parsed.categories) ? parsed.categories : [];
      const expected = ${JSON.stringify(expectedCategories)};

      const actualSorted = [...actual].sort();
      const expectedSorted = [...expected].sort();

      const pass = JSON.stringify(actualSorted) === JSON.stringify(expectedSorted);

      return {
        pass,
        score: pass ? 1 : 0,
        reason: 'Expected categories: ' + JSON.stringify(expectedSorted) + ', got: ' + JSON.stringify(actualSorted)
      };
    `
  };
}

function signalsCorrect(expectedSignals = []) {
  return {
    type: 'javascript',
    value: `
      function cleanJsonOutput(rawOutput) {
        let raw = (rawOutput || '').trim();
        raw = raw.replace(/^\\\`\\\`\\\`json\\s*/i, '');
        raw = raw.replace(/^\\\`\\\`\\\`\\s*/i, '');
        raw = raw.replace(/\\s*\\\`\\\`\\\`$/i, '');
        return raw.trim();
      }

      let parsed;
      try {
        parsed = JSON.parse(cleanJsonOutput(output));
      } catch (e) {
        return { pass: false, score: 0, reason: 'Output is not valid JSON' };
      }

      const actual = Array.isArray(parsed.signals) ? parsed.signals : [];
      const expected = ${JSON.stringify(expectedSignals)};

      const actualSorted = [...actual].sort();
      const expectedSorted = [...expected].sort();

      const pass = JSON.stringify(actualSorted) === JSON.stringify(expectedSorted);

      return {
        pass,
        score: pass ? 1 : 0,
        reason: 'Expected signals: ' + JSON.stringify(expectedSorted) + ', got: ' + JSON.stringify(actualSorted)
      };
    `
  };
}

function subjectRelevant(expectedSubject) {
  return {
    type: 'llm-rubric',
    value: `Evaluate whether the JSON field "subject" is a short, grammatically correct, relevant noun phrase for the main support topic.

Expected subject reference: "${expectedSubject}"

PASS if:
- the subject is relevant to the same issue(s)
- it is concise
- it is grammatically correct
- it is written in the same language as the user message
- it behaves like a ticket title or tracking subject
- it does not unnecessarily repeat the category name
- the wording does not need to be identical, but it must clearly cover the same main issue(s)`
  };
}

function followUpQuestionsRelevant(expectedQuestions = []) {
  return {
    type: 'llm-rubric',
    value: `Evaluate whether the JSON field "follow_up_questions" is appropriate for this support message.

Expected follow-up intent:
${expectedQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n') || 'No follow-up question expected.'}

PASS if:
- the output contains either zero or one follow-up question
- if no question is expected, an empty list is appropriate
- if a question is expected, the output contains one genuinely useful question
- the question focuses on the first main issue in the message
- the question is the most useful first question a human support agent would ask to move the case forward
- the question is specific, non-redundant, and operationally useful
- the question is written in the same language as the user message
- in French, the question uses vouvoiement

FAIL if:
- more than one follow-up question is returned
- a question is missing when clarification is clearly needed
- the question is vague, redundant, generic, or low-value
- the question focuses on a secondary issue instead of the first main issue
- the question does not help support or engineering progress on the case
- in French, the wording uses tutoiement`
  };
}

module.exports = {
  noTranslation,
  noExtraInfo,
  meaningPreserved,
  translationAccurate,

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
  supportTopicSignalBoundaryCorrect,

  supportJsonFormatValid,
  categoriesCorrect,
  signalsCorrect,
  subjectRelevant,
  followUpQuestionsRelevant
};
