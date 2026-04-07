/**
 * Global shared assertions for prompt evaluation
 * Each function returns a PromptFoo assertion object
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
 * SUPPORT ASSERTIONS
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
  supportJsonFormatValid,
  categoriesCorrect,
  signalsCorrect,
  subjectRelevant,
  followUpQuestionsRelevant
};
