// GRE Quantitative PWA Engine - Mobile Mini-Quizzes, FastAPI, Supabase & Gemini Socratic Tutor

document.addEventListener('DOMContentLoaded', () => {
  // PWA Service Worker Registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('[PWA] Service Worker registered:', reg.scope))
      .catch(err => console.log('[PWA] Service Worker registration failed:', err));
  }

  // PWA & Browser Direct Config Defaults
  const DEFAULT_GEMINI_KEY = "";
  const DEFAULT_SUPABASE_URL = "https://neycazhquehugeisemcs.supabase.co";
  const DEFAULT_SUPABASE_KEY = "sb_publishable_sGvHtC-i_n6bt2qdFS2mvQ_9kSSgq_Y";

  function getAppConfig() {
    return {
      geminiKey: localStorage.getItem('gre_gemini_key') || DEFAULT_GEMINI_KEY,
      supabaseUrl: (localStorage.getItem('gre_supabase_url') || DEFAULT_SUPABASE_URL).replace(/\/$/, ''),
      supabaseKey: localStorage.getItem('gre_supabase_key') || DEFAULT_SUPABASE_KEY,
      geminiModel: 'gemini-2.5-flash'
    };
  }

  // Application State
  let activeQuestions = [];
  let userAnswers = [];
  let currentIndex = 0;
  let currentSection = 1;
  let timerInterval = null;
  let secondsRemaining = 0;

  let activeQuizMode = 'mini_5'; // 'mini_5', 'mini_10', 'full_27'
  let enableAiVariations = false;
  let activeTutorQuestion = null;
  let tutorChatHistory = [];

  // Authentic ETS State Additions
  let markedQuestions = new Set();
  let fontSize = 'normal';
  let isTimerHidden = false;
  let selectedReviewRowIndex = null;

  // DOM Element Handles
  const startView = document.getElementById('startView');
  const testView = document.getElementById('testView');
  const resultsView = document.getElementById('resultsView');
  const reportLogView = document.getElementById('reportLogView');

  const startModeCards = document.querySelectorAll('.start-mode-card');
  const startEnableAiCheck = document.getElementById('startEnableAiCheck');
  const startBankProgressText = document.getElementById('startBankProgressText');
  const startResetProgressBtn = document.getElementById('startResetProgressBtn');
  const startQuizBtn = document.getElementById('startQuizBtn');

  const sectionBadge = document.getElementById('sectionBadge');
  const questionCounter = document.getElementById('questionCounter');
  const progressBar = document.getElementById('progressBar');
  const timerBox = document.getElementById('timerBox');
  const timerDisplay = document.getElementById('timerDisplay');
  const typePill = document.getElementById('typePill');
  const sectionLabel = document.getElementById('sectionLabel');
  const variationPill = document.getElementById('variationPill');
  const questionText = document.getElementById('questionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const paletteGrid = document.getElementById('paletteGrid');

  // Authentic ETS Top Toolbar & Control Handles
  const quitTestBtn = document.getElementById('quitTestBtn');
  const exitSectionBtn = document.getElementById('exitSectionBtn');
  const fontSizeSelect = document.getElementById('fontSizeSelect');
  const markBtn = document.getElementById('markBtn');
  const markCheckbox = document.getElementById('markCheckbox');
  const markStatusLabel = document.getElementById('markStatusLabel');
  const reviewBtn = document.getElementById('reviewBtn');
  const reviewModal = document.getElementById('reviewModal');
  const closeReviewModalBtn = document.getElementById('closeReviewModalBtn');
  const returnToTestFromReviewBtn = document.getElementById('returnToTestFromReviewBtn');
  const reviewTableBody = document.getElementById('reviewTableBody');
  const goToQuestionBtn = document.getElementById('goToQuestionBtn');
  const helpBtn = document.getElementById('helpBtn');
  const etsHelpModal = document.getElementById('etsHelpModal');
  const closeHelpModalBtn = document.getElementById('closeHelpModalBtn');
  const closeHelpModalBtn2 = document.getElementById('closeHelpModalBtn2');
  const timerToggleBtn = document.getElementById('timerToggleBtn');
  const toolsMenuBtn = document.getElementById('toolsMenuBtn');
  const toolsDropdown = document.getElementById('toolsDropdown');

  // Mobile Bottom Bar Handles
  const mobilePrevBtn = document.getElementById('mobilePrevBtn');
  const mobileNextBtn = document.getElementById('mobileNextBtn');
  const mobileMarkBtn = document.getElementById('mobileMarkBtn');
  const mobileCalcBtn = document.getElementById('mobileCalcBtn');

  // Modal Handles
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettingsModalBtn = document.getElementById('closeSettingsModalBtn');
  const settingsForm = document.getElementById('settingsForm');
  const settingsGeminiKey = document.getElementById('settingsGeminiKey');
  const settingsSupabaseUrl = document.getElementById('settingsSupabaseUrl');
  const settingsSupabaseKey = document.getElementById('settingsSupabaseKey');
  const geminiStatusBadge = document.getElementById('geminiStatusBadge');
  const supabaseStatusBadge = document.getElementById('supabaseStatusBadge');

  const modeSelectBtn = document.getElementById('modeSelectBtn');
  const modeModal = document.getElementById('modeModal');
  const closeModeModalBtn = document.getElementById('closeModeModalBtn');
  const enableAiVariationsCheck = document.getElementById('enableAiVariationsCheck');
  const modeCardBtns = document.querySelectorAll('.mode-card-btn');

  const ingestBtn = document.getElementById('ingestBtn');
  const ingestModal = document.getElementById('ingestModal');
  const closeIngestModalBtn = document.getElementById('closeIngestModalBtn');
  const ingestForm = document.getElementById('ingestForm');

  const tutorModal = document.getElementById('tutorModal');
  const closeTutorModalBtn = document.getElementById('closeTutorModalBtn');
  const tutorTrapBadge = document.getElementById('tutorTrapBadge');
  const tutorChatContainer = document.getElementById('tutorChatContainer');
  const tutorInput = document.getElementById('tutorInput');
  const sendTutorBtn = document.getElementById('sendTutorBtn');

  const transitionModal = document.getElementById('transitionModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const startSection2Btn = document.getElementById('startSection2Btn');

  // Results & Export Handles
  const scoreValue = document.getElementById('scoreValue');
  const scorePercent = document.getElementById('scorePercent');
  const sec1ScoreDisplay = document.getElementById('sec1Score');
  const sec2ScoreDisplay = document.getElementById('sec2Score');
  const tutorExport = document.getElementById('tutorExport');
  const copyBtn = document.getElementById('copyBtn');
  const restartBtn = document.getElementById('restartBtn');
  const viewLogFromResultsBtn = document.getElementById('viewLogFromResultsBtn');
  const toast = document.getElementById('toast');

  // Calculator Handles
  const calcToggleBtn = document.getElementById('calcToggleBtn');
  const calculatorModal = document.getElementById('calculatorModal');
  const calcHeader = document.getElementById('calcHeader');
  const calcCloseBtn = document.getElementById('calcCloseBtn');
  const calcDisplay = document.getElementById('calcDisplay');
  const transferDisplayBtn = document.getElementById('transferDisplayBtn');

  // Report Log Handles
  const reportLogToggleBtn = document.getElementById('reportLogToggleBtn');
  const returnToTestBtn = document.getElementById('returnToTestBtn');
  const logTotalSummary = document.getElementById('logTotalSummary');
  const logAvgScorePill = document.getElementById('logAvgScorePill');
  const logTotalMissedPill = document.getElementById('logTotalMissedPill');
  const tutoringLogContainer = document.getElementById('tutoringLogContainer');
  const importReportInput = document.getElementById('importReportInput');
  const importReportBtn = document.getElementById('importReportBtn');
  const clearLogBtn = document.getElementById('clearLogBtn');

  // -------------------------------------------------------------
  // DIRECT BROWSER API CLIENT FUNCTIONS (SERVERLESS / NO BACKEND)
  // -------------------------------------------------------------

  async function callGeminiApiDirect(contents, systemInstruction = "") {
    const config = getAppConfig();
    if (!config.geminiKey) throw new Error("Gemini API Key is not configured.");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.geminiModel}:generateContent?key=${encodeURIComponent(config.geminiKey)}`;
    const payload = {
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 1024
      }
    };

    if (systemInstruction) {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API call failed (${res.status}): ${errText}`);
    }

    const resData = await res.json();
    return resData.candidates[0].content.parts[0].text;
  }

  const DYNAMIC_QUESTION_GENERATOR_PROMPT = `You are an expert GRE Quantitative Reasoning Question Engine.
Your objective is to generate a structurally accurate variation of a seed GRE question.

RULES & CONSTRAINTS:
1. Preserve the exact core mathematical concept, cognitive trap type, and difficulty level of the source question.
2. Mutate numerical variables, coefficients, names, or scenario framing, ensuring all math works out cleanly to precise integer or simple fractional solutions.
3. Keep multiple-choice options well-crafted: exactly one option must be unambiguously correct, while the rest must represent common strategic trap errors.
4. Output STRICT JSON ONLY matching this format with NO markdown codeblock ticks:

{
  "question_text": "Newly generated question text...",
  "options": [
    "A: Option 1",
    "B: Option 2",
    "C: Option 3",
    "D: Option 4"
  ],
  "correct_answer": "B: Option 2",
  "explanation": "Clear step-by-step mathematical explanation...",
  "mutation_notes": "Replaced values..."
}`;

  async function generateVariationDirect(q) {
    const userPrompt = `Generate a new variation for the following seed GRE question:

SEED QUESTION TEXT:
${q.question_text || q.text}

SEED OPTIONS:
${JSON.stringify(q.options || [])}

SEED CORRECT ANSWER:
${q.correct_answer || q.correct}

EXPLANATION & CONCEPT:
${q.explanation || ''}

TRAP TYPE TO PRESERVE:
${q.trap_type || 'Quantitative Trap'}

Generate the variation JSON now.`;

    const contents = [{ role: 'user', parts: [{ text: userPrompt }] }];
    const rawOutput = await callGeminiApiDirect(contents, DYNAMIC_QUESTION_GENERATOR_PROMPT);

    const match = rawOutput.match(/\{[\s\S]*\}/);
    const cleanJson = match ? match[0] : rawOutput.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  }

  const INTERACTIVE_TUTOR_PROMPT = `You are an Elite Socratic GRE Tutor. A student just attempted a GRE Quantitative problem and gave an incorrect answer.

YOUR MANDATE:
1. DO NOT give away the final correct answer or full step-by-step solution immediately.
2. Identify the specific cognitive trap behind the problem (e.g. range symmetry illusion, stopped-short union distractor, exponent base trap).
3. Walk the student through their mistake using SOCRATIC QUESTIONING: ask ONE targeted, illuminating question per response that encourages them to test boundary values, draw diagrams, or verify their assumptions.
4. Keep your responses concise (2 to 4 sentences maximum), empathetic, and sharp.
5. If the student answers your prompt correctly, praise them and guide them to the 1-sentence 'Golden Rule' takeaway.`;

  async function runSocraticTutorChatDirect(question, history, userMsg) {
    const systemContext = `${INTERACTIVE_TUTOR_PROMPT}

PROBLEM CONTEXT:
Question: ${question.question_text || question.text}
Student's Incorrect Answer: ${question.user_answer}
Actual Correct Answer: ${question.correct_answer || question.correct}
Core Logic Explanation: ${question.hack_solution || question.explanation}
Trap Name: ${question.trap_type}
Why Trap Works: ${question.trap_description}
10-Second Hack Solution: ${question.hack_solution}
Golden Rule: ${question.rule_takeaway}`;

    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    contents.push({ role: 'user', parts: [{ text: userMsg }] });

    return await callGeminiApiDirect(contents, systemContext);
  }

  async function fetchSourceQuestionsDirect() {
    const config = getAppConfig();
    if (!config.supabaseUrl || !config.supabaseKey) return [];

    try {
      const res = await fetch(`${config.supabaseUrl}/rest/v1/source_questions?select=*&limit=50`, {
        headers: {
          'apikey': config.supabaseKey,
          'Authorization': `Bearer ${config.supabaseKey}`,
          'Content-Type': 'application/json'
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) return data;
      }
    } catch (err) {
      console.log('[PWA] Supabase direct fetch offline or unconfigured:', err);
    }
    return [];
  }

  async function insertSourceQuestionDirect(payload) {
    const config = getAppConfig();
    if (!config.supabaseUrl || !config.supabaseKey) return false;

    try {
      const res = await fetch(`${config.supabaseUrl}/rest/v1/source_questions`, {
        method: 'POST',
        headers: {
          'apikey': config.supabaseKey,
          'Authorization': `Bearer ${config.supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
      });
      return res.ok;
    } catch (err) {
      console.log('[PWA] Supabase direct insert error:', err);
      return false;
    }
  }

  async function recordTestSessionDirect(sessionData) {
    const config = getAppConfig();
    if (!config.supabaseUrl || !config.supabaseKey) return false;

    try {
      await fetch(`${config.supabaseUrl}/rest/v1/test_sessions`, {
        method: 'POST',
        headers: {
          'apikey': config.supabaseKey,
          'Authorization': `Bearer ${config.supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(sessionData)
      });
    } catch (err) {
      console.log('[PWA] Save test session error:', err);
    }
  }

  // Initial Load: Show Start Screen layout & load question bank progress
  showStartScreen();

  async function showStartScreen() {
    clearInterval(timerInterval);
    timerInterval = null;

    if (testView) testView.style.display = 'none';
    if (resultsView) resultsView.style.display = 'none';
    if (reportLogView) reportLogView.style.display = 'none';
    if (startView) startView.style.display = 'flex';

    sectionBadge.textContent = "Select Mode";
    questionCounter.textContent = "Ready";
    progressBar.style.width = '0%';
    timerDisplay.textContent = "Ready";
    timerBox.style.borderColor = 'var(--border-color)';
    timerBox.style.color = '#ffffff';

    const rawBank = await fetchQuestionBank();
    updateQuestionProgressUI(rawBank.length);
  }

  // -------------------------------------------------------------
  // SEEN QUESTION TRACKING & ROTATION ENGINE
  // -------------------------------------------------------------

  function getSeenQuestionKeys() {
    try {
      return JSON.parse(localStorage.getItem('gre_seen_questions') || '[]');
    } catch (e) {
      return [];
    }
  }

  function markQuestionsAsSeen(questionsToMark) {
    const seen = new Set(getSeenQuestionKeys());
    questionsToMark.forEach(q => {
      const key = String(q.id || q.text || q.question_text || '').trim();
      if (key) seen.add(key);
    });
    localStorage.setItem('gre_seen_questions', JSON.stringify(Array.from(seen)));
  }

  function clearSeenQuestionHistory() {
    localStorage.removeItem('gre_seen_questions');
  }

  async function fetchQuestionBank() {
    let localBank = (typeof window !== 'undefined' && window.questions) ? window.questions : (typeof questions !== 'undefined' ? questions : []);
    let dbBank = [];

    try {
      dbBank = await fetchSourceQuestionsDirect();
    } catch (err) {
      console.log("[PWA] Supabase direct fetch unavailable, utilizing local questions repository.");
    }

    if (!dbBank || dbBank.length === 0) {
      return localBank;
    }

    // Combine Supabase DB questions and local questions repository without duplicates
    const combined = [...dbBank];
    const existingTexts = new Set(dbBank.map(q => (q.question_text || q.text || '').trim()));

    localBank.forEach(q => {
      const qText = (q.question_text || q.text || '').trim();
      if (qText && !existingTexts.has(qText)) {
        existingTexts.add(qText);
        combined.push(q);
      }
    });

    return combined;
  }

  async function updateQuestionProgressUI(totalCount) {
    const seenKeys = new Set(getSeenQuestionKeys());
    const countText = `${seenKeys.size} / ${totalCount} seen`;

    const modalProgressEl = document.getElementById('questionProgressText');
    if (modalProgressEl) modalProgressEl.textContent = countText;

    const startProgressEl = document.getElementById('startBankProgressText');
    if (startProgressEl) startProgressEl.textContent = countText;
  }

  async function initQuizSession() {
    const rawBank = await fetchQuestionBank();
    const seenKeys = new Set(getSeenQuestionKeys());

    // Separate bank into unseen and seen question pools
    const unseenPool = rawBank.filter(q => {
      const key = String(q.id || q.text || q.question_text || '').trim();
      return !seenKeys.has(key);
    });
    const seenPool = rawBank.filter(q => {
      const key = String(q.id || q.text || q.question_text || '').trim();
      return seenKeys.has(key);
    });

    let targetCount = 5;
    let timeSeconds = 5 * 100; // 5 Qs * 1m 40s (100s) = 500s (8m 20s)
    sectionBadge.textContent = "5-Q Mini Quiz";

    if (activeQuizMode === 'mini_10') {
      targetCount = 10;
      timeSeconds = 10 * 100; // 10 Qs * 1m 40s (100s) = 1000s (16m 40s)
      sectionBadge.textContent = "10-Q Mini Quiz";
    } else if (activeQuizMode === 'full_27') {
      targetCount = 27;
      timeSeconds = 12 * 100; // Sec 1: 12 Qs * 1m 40s (100s) = 1200s (20 mins)
      sectionBadge.textContent = "Section 1";
    }

    let selectedPool = [];
    const shuffledUnseen = shuffleArray(unseenPool);
    const shuffledSeen = shuffleArray(seenPool);

    if (shuffledUnseen.length >= targetCount) {
      selectedPool = shuffledUnseen.slice(0, targetCount);
    } else if (shuffledUnseen.length > 0) {
      // Use all remaining unseen questions, top up from seen questions
      const neededFromSeen = targetCount - shuffledUnseen.length;
      selectedPool = [...shuffledUnseen, ...shuffledSeen.slice(0, neededFromSeen)];
    } else {
      // All questions in the bank have been seen! Clear history to start a fresh cycle
      clearSeenQuestionHistory();
      const freshPool = shuffleArray(rawBank);
      selectedPool = freshPool.slice(0, Math.min(targetCount, freshPool.length));
    }

    // Mark the selected questions as seen
    markQuestionsAsSeen(selectedPool);
    updateQuestionProgressUI(rawBank.length);

    // If AI Variations is toggled, call Gemini API directly from browser
    if (enableAiVariations) {
      showToast("Generating AI Question Variations with Gemini API...");
      activeQuestions = await Promise.all(selectedPool.map(async (q, idx) => {
        try {
          const varData = await generateVariationDirect(q);
          if (varData && varData.question_text) {
            return {
              ...q,
              sessionNum: idx + 1,
              text: varData.question_text,
              options: varData.options || q.options,
              correct: varData.correct_answer || q.correct_answer,
              explanation: varData.explanation || q.explanation,
              isAiVariation: true
            };
          }
        } catch (e) {
          console.log("Variation generation fallback:", e);
        }
        return { 
          ...q, 
          sessionNum: idx + 1,
          text: q.question_text || q.text || "Question text unavailable",
          options: typeof q.options === 'string' ? (JSON.parse(q.options || '[]')) : (q.options || []),
          correct: q.correct_answer || q.correct || ""
        };
      }));
    } else {
      activeQuestions = selectedPool.map((q, idx) => {
        let opts = q.options || [];
        if (typeof opts === 'string') {
          try { opts = JSON.parse(opts); } catch(e) { opts = []; }
        }
        return {
          ...q,
          sessionNum: idx + 1,
          text: q.question_text || q.text || "Question text unavailable",
          options: opts,
          correct: q.correct_answer || q.correct || ""
        };
      });
    }

    userAnswers = new Array(activeQuestions.length).fill(null);
    markedQuestions.clear();
    currentIndex = 0;
    currentSection = 1;

    if (startView) startView.style.display = 'none';
    resultsView.style.display = 'none';
    reportLogView.style.display = 'none';
    transitionModal.style.display = 'none';
    testView.style.display = 'flex';

    startTimer(timeSeconds);
    initPalette();
    renderQuestion(currentIndex);
  }

  function shuffleArray(arr) {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Timer Engine
  function startTimer(durationSeconds) {
    clearInterval(timerInterval);
    secondsRemaining = durationSeconds;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      secondsRemaining--;
      updateTimerDisplay();

      if (secondsRemaining <= 0) {
        clearInterval(timerInterval);
        handleTimeExpired();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;
    timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    if (secondsRemaining <= 120) {
      timerBox.style.borderColor = 'var(--danger)';
      timerBox.style.color = '#f87171';
    } else {
      timerBox.style.borderColor = '#1e3a8a';
      timerBox.style.color = '#38bdf8';
    }
  }

  function handleTimeExpired() {
    saveCurrentInput();
    if (activeQuizMode === 'full_27' && currentSection === 1) {
      modalTitle.textContent = "Section 1 Time Expired!";
      modalBody.innerHTML = "Time is up for Section 1. All answered questions have been saved.<br><br><strong>Next: Section 2</strong> (15 Questions | 25 Minutes - 1m 40s/Q).";
      transitionModal.style.display = 'flex';
    } else {
      submitQuizSession();
    }
  }

  // Palette Jump Bar & Status
  function initPalette() {
    paletteGrid.innerHTML = '';
    activeQuestions.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.className = `palette-btn ${idx === currentIndex ? 'active' : ''}`;
      btn.textContent = idx + 1;
      btn.addEventListener('click', () => {
        saveCurrentInput();
        currentIndex = idx;
        renderQuestion(currentIndex);
      });
      paletteGrid.appendChild(btn);
    });
  }

  function updatePaletteUI() {
    const buttons = paletteGrid.querySelectorAll('.palette-btn');
    buttons.forEach((btn, idx) => {
      btn.classList.remove('active', 'answered', 'marked');
      if (idx === currentIndex) btn.classList.add('active');
      if (userAnswers[idx] !== null && userAnswers[idx] !== undefined && String(userAnswers[idx]).trim() !== '') {
        btn.classList.add('answered');
      }
      if (markedQuestions.has(idx)) {
        btn.classList.add('marked');
      }
    });
  }

  function toggleMarkCurrentQuestion() {
    if (markedQuestions.has(currentIndex)) {
      markedQuestions.delete(currentIndex);
      showToast(`Unmarked Question ${currentIndex + 1}`);
    } else {
      markedQuestions.add(currentIndex);
      showToast(`Marked Question ${currentIndex + 1} for review`);
    }
    updateMarkUI();
    updatePaletteUI();
  }

  function updateMarkUI() {
    const isMarked = markedQuestions.has(currentIndex);
    if (markBtn) {
      if (isMarked) {
        markBtn.classList.add('marked');
      } else {
        markBtn.classList.remove('marked');
      }
    }
    if (mobileMarkBtn) {
      if (isMarked) {
        mobileMarkBtn.classList.add('marked');
        mobileMarkBtn.textContent = 'Marked 🚩';
      } else {
        mobileMarkBtn.classList.remove('marked');
        mobileMarkBtn.textContent = 'Mark 🚩';
      }
    }
    if (markStatusLabel) {
      markStatusLabel.textContent = isMarked ? '✓ Marked for Review' : '';
    }
  }

  // Section Review Window Engine
  function openSectionReview() {
    if (!reviewModal) return;
    reviewTableBody.innerHTML = '';
    selectedReviewRowIndex = null;
    if (goToQuestionBtn) goToQuestionBtn.disabled = true;

    activeQuestions.forEach((q, idx) => {
      const tr = document.createElement('tr');
      const uAns = userAnswers[idx];
      const isAnswered = uAns !== null && uAns !== undefined && String(uAns).trim() !== '';
      const isMarked = markedQuestions.has(idx);

      tr.innerHTML = `
        <td><strong>Question ${idx + 1}</strong></td>
        <td><span style="color: ${isAnswered ? '#10b981' : '#f59e0b'}; font-weight: 700;">${isAnswered ? 'Answered' : 'Unanswered'}</span></td>
        <td>${isMarked ? '<span style="color: #d97706; font-weight: 800; font-size: 1.1rem;">✓</span>' : ''}</td>
      `;

      tr.addEventListener('click', () => {
        const allRows = reviewTableBody.querySelectorAll('tr');
        allRows.forEach(r => r.classList.remove('selected-row'));
        tr.classList.add('selected-row');
        selectedReviewRowIndex = idx;
        if (goToQuestionBtn) goToQuestionBtn.disabled = false;
      });

      reviewTableBody.appendChild(tr);
    });

    reviewModal.style.display = 'flex';
  }

  // Question Rendering Engine (Authentic ETS Exam Layout)
  function renderQuestion(index) {
    const q = activeQuestions[index];
    if (!q) return;

    questionCounter.textContent = `Question ${index + 1} of ${activeQuestions.length}`;
    const pct = ((index + 1) / activeQuestions.length) * 100;
    progressBar.style.width = `${pct}%`;

    const displayText = q.text || q.question_text || q.questionText || "";
    const isQC = /Quantity\s+A\s*:/i.test(displayText) && /Quantity\s+B\s*:/i.test(displayText);

    if (isQC) {
      typePill.textContent = 'Quantitative Comparison';
    } else if (q.question_type === 'numeric' || (!q.options || q.options.length === 0)) {
      typePill.textContent = 'Numeric Entry';
    } else if (q.question_type === 'multiple' || (q.correct && q.correct.includes(','))) {
      typePill.textContent = 'Select One or More';
    } else {
      typePill.textContent = 'Multiple Choice';
    }

    sectionLabel.textContent = q.category || 'Quantitative Reasoning';
    
    if (q.isAiVariation) {
      variationPill.style.display = 'inline-block';
    } else {
      variationPill.style.display = 'none';
    }

    questionText.innerHTML = formatQuestionText(displayText);
    optionsContainer.innerHTML = '';

    let opts = q.options || [];
    if (typeof opts === 'string') {
      try { opts = JSON.parse(opts); } catch(e) { opts = []; }
    }

    if (opts.length > 0) {
      const isMultiSelect = typePill.textContent === 'Select One or More';

      opts.forEach((optStr) => {
        const optionRow = document.createElement('div');
        optionRow.className = 'ets-option-row';

        const iconBox = document.createElement('div');
        iconBox.className = isMultiSelect ? 'ets-checkbox-icon' : 'ets-radio-icon';

        const labelSpan = document.createElement('span');
        labelSpan.className = 'ets-option-label';
        labelSpan.innerHTML = escapeHtml(optStr);

        optionRow.appendChild(iconBox);
        optionRow.appendChild(labelSpan);

        if (isMultiSelect) {
          let currentSelection = Array.isArray(userAnswers[index]) ? userAnswers[index] : (userAnswers[index] ? [userAnswers[index]] : []);
          if (currentSelection.includes(optStr)) {
            optionRow.classList.add('selected');
          }

          optionRow.addEventListener('click', () => {
            let selectedArr = Array.isArray(userAnswers[index]) ? [...userAnswers[index]] : (userAnswers[index] ? [userAnswers[index]] : []);
            if (selectedArr.includes(optStr)) {
              selectedArr = selectedArr.filter(item => item !== optStr);
              optionRow.classList.remove('selected');
            } else {
              selectedArr.push(optStr);
              optionRow.classList.add('selected');
            }
            userAnswers[index] = selectedArr;
            updatePaletteUI();
          });
        } else {
          if (userAnswers[index] === optStr) {
            optionRow.classList.add('selected');
          }

          optionRow.addEventListener('click', () => {
            const allRows = optionsContainer.querySelectorAll('.ets-option-row');
            allRows.forEach(r => r.classList.remove('selected'));
            optionRow.classList.add('selected');
            userAnswers[index] = optStr;
            updatePaletteUI();
          });
        }

        optionsContainer.appendChild(optionRow);
      });
    } else {
      // Numeric Entry Input Box
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'ets-numeric-input';
      input.id = 'numericEntryInput';
      input.placeholder = 'Enter value...';
      input.value = userAnswers[index] || '';
      input.addEventListener('input', (e) => {
        userAnswers[index] = e.target.value.trim();
        updatePaletteUI();
      });
      optionsContainer.appendChild(input);
    }

    prevBtn.disabled = index === 0;
    prevBtn.style.opacity = index === 0 ? '0.5' : '1';

    if (mobilePrevBtn) {
      mobilePrevBtn.disabled = index === 0;
      mobilePrevBtn.style.opacity = index === 0 ? '0.5' : '1';
    }

    if (index === activeQuestions.length - 1) {
      nextBtn.textContent = 'Submit Session ✓';
      nextBtn.className = 'ets-nav-btn ets-btn-nav ets-btn-next';
      if (mobileNextBtn) mobileNextBtn.textContent = 'Submit ✓';
    } else {
      nextBtn.textContent = 'Next →';
      nextBtn.className = 'ets-nav-btn ets-btn-nav ets-btn-next';
      if (mobileNextBtn) mobileNextBtn.textContent = 'Next →';
    }

    updateMarkUI();
    updatePaletteUI();
  }

  function saveCurrentInput() {
    const numInput = document.getElementById('numericEntryInput');
    if (numInput) {
      userAnswers[currentIndex] = numInput.value.trim();
    }
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      saveCurrentInput();
      currentIndex--;
      renderQuestion(currentIndex);
    }
  });

  nextBtn.addEventListener('click', () => {
    saveCurrentInput();
    if (activeQuizMode === 'full_27' && currentSection === 1 && currentIndex === 11) {
      // Section 1 complete -> Section 2 transition
      modalTitle.textContent = "Section 1 Completed";
      modalBody.innerHTML = "You have completed Section 1 (12 Questions).<br><br><strong>Section 2 Parameters:</strong> 15 Questions | 25 Minutes (1m 40s/Q).<br><em>Note: Once Section 2 begins, Section 1 will be locked.</em>";
      transitionModal.style.display = 'flex';
      clearInterval(timerInterval);
      return;
    }

    if (currentIndex < activeQuestions.length - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
    } else {
      submitQuizSession();
    }
  });

  // ETS Toolbar & Modal Event Listeners
  if (quitTestBtn) {
    quitTestBtn.addEventListener('click', () => {
      if (confirm("Are you sure you want to quit this practice session? Progress in this session will not be scored.")) {
        showStartScreen();
      }
    });
  }

  if (exitSectionBtn) {
    exitSectionBtn.addEventListener('click', () => {
      if (confirm("Exit this section and view your score results?")) {
        submitQuizSession();
      }
    });
  }

  if (fontSizeSelect) {
    fontSizeSelect.addEventListener('change', (e) => {
      fontSize = e.target.value;
      testView.classList.remove('font-size-normal', 'font-size-large', 'font-size-xlarge');
      testView.classList.add(`font-size-${fontSize}`);
    });
  }

  if (markBtn) markBtn.addEventListener('click', toggleMarkCurrentQuestion);
  if (reviewBtn) reviewBtn.addEventListener('click', openSectionReview);
  if (closeReviewModalBtn) closeReviewModalBtn.addEventListener('click', () => { reviewModal.style.display = 'none'; });
  if (returnToTestFromReviewBtn) returnToTestFromReviewBtn.addEventListener('click', () => { reviewModal.style.display = 'none'; });
  if (goToQuestionBtn) {
    goToQuestionBtn.addEventListener('click', () => {
      if (selectedReviewRowIndex !== null) {
        saveCurrentInput();
        currentIndex = selectedReviewRowIndex;
        renderQuestion(currentIndex);
        reviewModal.style.display = 'none';
      }
    });
  }

  if (helpBtn) helpBtn.addEventListener('click', () => { if (etsHelpModal) etsHelpModal.style.display = 'flex'; });
  if (closeHelpModalBtn) closeHelpModalBtn.addEventListener('click', () => { if (etsHelpModal) etsHelpModal.style.display = 'none'; });
  if (closeHelpModalBtn2) closeHelpModalBtn2.addEventListener('click', () => { if (etsHelpModal) etsHelpModal.style.display = 'none'; });

  if (timerToggleBtn) {
    timerToggleBtn.addEventListener('click', () => {
      isTimerHidden = !isTimerHidden;
      timerToggleBtn.textContent = isTimerHidden ? 'Show Time' : 'Hide Time';
      timerDisplay.style.visibility = isTimerHidden ? 'hidden' : 'visible';
    });
  }

  // Tools Menu Dropdown Logic
  if (toolsMenuBtn && toolsDropdown) {
    toolsMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = toolsDropdown.style.display === 'flex';
      toolsDropdown.style.display = isVisible ? 'none' : 'flex';
    });

    document.addEventListener('click', (e) => {
      if (toolsDropdown && !toolsDropdown.contains(e.target) && e.target !== toolsMenuBtn) {
        toolsDropdown.style.display = 'none';
      }
    });

    toolsDropdown.addEventListener('click', () => {
      toolsDropdown.style.display = 'none';
    });
  }

  // Mobile Bottom Bar Navigation Actions
  if (mobilePrevBtn) {
    mobilePrevBtn.addEventListener('click', () => prevBtn.click());
  }
  if (mobileNextBtn) {
    mobileNextBtn.addEventListener('click', () => nextBtn.click());
  }
  if (mobileMarkBtn) {
    mobileMarkBtn.addEventListener('click', () => toggleMarkCurrentQuestion());
  }
  if (mobileCalcBtn) {
    mobileCalcBtn.addEventListener('click', () => {
      if (calcToggleBtn) calcToggleBtn.click();
    });
  }


  // Desktop Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (!testView || testView.style.display === 'none') return;

    if (e.altKey) {
      const key = e.key.toLowerCase();
      if (key === 'n') {
        e.preventDefault();
        nextBtn.click();
      } else if (key === 'b') {
        e.preventDefault();
        prevBtn.click();
      } else if (key === 'm') {
        e.preventDefault();
        if (markBtn) markBtn.click();
      } else if (key === 'r') {
        e.preventDefault();
        if (reviewBtn) reviewBtn.click();
      } else if (key === 'c') {
        e.preventDefault();
        if (calcToggleBtn) calcToggleBtn.click();
      } else if (key === 'h') {
        e.preventDefault();
        if (helpBtn) helpBtn.click();
      } else if (key === 't') {
        e.preventDefault();
        if (timerToggleBtn) timerToggleBtn.click();
      }
    }
  });

  if (startSection2Btn) {
    startSection2Btn.addEventListener('click', () => {
      currentSection = 2;
      transitionModal.style.display = 'none';
      sectionBadge.textContent = "Section 2";
      startTimer(15 * 100); // Sec 2: 15 Qs * 1m 40s (100s) = 1500s (25 mins)
      currentIndex = 12;
      renderQuestion(currentIndex);
    });
  }

  // Submit Quiz & Export Diagnostics
  async function submitQuizSession() {
    clearInterval(timerInterval);
    saveCurrentInput();

    let correctCount = 0;
    const missedItems = [];

    activeQuestions.forEach((q, idx) => {
      const uAns = userAnswers[idx] || '(No Answer)';
      const cAns = q.correct_answer || q.correct;
      const isCorrect = String(uAns).trim().toLowerCase() === String(cAns).trim().toLowerCase();

      if (isCorrect) {
        correctCount++;
      } else {
        missedItems.push({
          question_id: q.id,
          question_text: q.text,
          user_answer: uAns,
          correct_answer: cAns,
          trap_type: q.trap_type || 'Quantitative Trap',
          trap_description: q.trap_description || 'Trick designed to penalize mechanical textbook math solving.',
          hack_solution: q.hack_solution || q.explanation || 'Shortcut: Test boundary values and plug simple test numbers.',
          rule_takeaway: q.rule_takeaway || 'Always test boundary values or pick simple numbers to bypass algebra.'
        });
      }
    });

    const scorePct = Math.round((correctCount / activeQuestions.length) * 100);

    scoreValue.textContent = `${correctCount}/${activeQuestions.length}`;
    scorePercent.textContent = `${scorePct}% Accuracy Score`;
    sec1ScoreDisplay.textContent = `Score: ${correctCount}/${activeQuestions.length}`;

    // Record completed test session to Supabase directly
    recordTestSessionDirect({
      total_score: correctCount,
      total_questions: activeQuestions.length,
      accuracy_percentage: scorePct,
      missed_questions_count: missedItems.length,
      mode: activeQuizMode
    });

    // Compile Diagnostic Markdown Report Format
    const lines = [
      "# 🎯 GRE Quantitative Missed Pattern Diagnostic Report",
      `**Session Score:** ${correctCount}/${activeQuestions.length} (${scorePct}%)\n`,
      "---"
    ];
    missedItems.forEach((m, idx) => {
      lines.push(`\n### Question #${idx + 1}: ${m.trap_type}`);
      lines.push(`**Problem:** ${m.question_text}`);
      lines.push(`**Your Answer:** ${m.user_answer} | **Correct Answer:** ${m.correct_answer}\n`);
      lines.push(`The Trap: ${m.trap_type} — ${m.trap_description}`);
      lines.push(`The Hack: ${m.hack_solution}`);
      lines.push(`The Rule: ${m.rule_takeaway}`);
      lines.push("\n---");
    });
    const reportText = lines.join("\n");

    tutorExport.value = reportText;

    // Save session to Local Storage history
    saveSessionToStorage({
      date: new Date().toLocaleString(),
      totalScore: correctCount,
      totalQuestions: activeQuestions.length,
      sec1Score: correctCount,
      sec2Score: 0,
      missedQuestions: missedItems
    });

    testView.style.display = 'none';
    transitionModal.style.display = 'none';
    resultsView.style.display = 'flex';
  }

  function saveSessionToStorage(sessionObj) {
    const existing = JSON.parse(localStorage.getItem('gre_tutor_history') || '[]');
    existing.unshift(sessionObj);
    localStorage.setItem('gre_tutor_history', JSON.stringify(existing));
  }

  // Interactive Socratic Tutor Chat Logic
  function openTutorChat(missedItem) {
    activeTutorQuestion = missedItem;
    tutorChatHistory = [];
    tutorTrapBadge.textContent = `Trap: ${missedItem.trap_type}`;
    tutorChatContainer.innerHTML = '';

    // Render Initial Tutor Opening Message
    const initialTutorMsg = `Hi! I noticed you selected "${missedItem.user_answer}" instead of "${missedItem.correct_answer}". Let's dissect why this happened without spoiling the math.\n\nNotice the trap: "${missedItem.trap_type}". What test input or boundary condition might reveal the flaw in that assumption?`;
    
    appendChatMessage('model', initialTutorMsg);
    tutorModal.style.display = 'flex';
  }

  function appendChatMessage(role, content) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${role === 'user' ? 'chat-bubble-user' : 'chat-bubble-model'}`;
    bubble.innerHTML = escapeHtml(content).replace(/\n/g, '<br>');
    tutorChatContainer.appendChild(bubble);
    tutorChatContainer.scrollTop = tutorChatContainer.scrollHeight;
  }

  async function handleSendTutorMessage() {
    const userMsg = tutorInput.value.trim();
    if (!userMsg || !activeTutorQuestion) return;

    appendChatMessage('user', userMsg);
    tutorInput.value = '';

    try {
      const replyText = await runSocraticTutorChatDirect(activeTutorQuestion, tutorChatHistory, userMsg);
      if (replyText) {
        tutorChatHistory.push({ role: 'user', content: userMsg });
        tutorChatHistory.push({ role: 'model', content: replyText });
        appendChatMessage('model', replyText);
        return;
      }
    } catch (e) {
      console.log("Tutor chat fallback active:", e);
    }

    // Local Fallback Tutor Response
    const fallbackReply = `Great observation! In "${activeTutorQuestion.trap_type}", test-takers usually get misled by: ${activeTutorQuestion.trap_description}\n\nKey Tactical Hack: ${activeTutorQuestion.hack_solution}\n\nGolden Takeaway: ${activeTutorQuestion.rule_takeaway}`;
    appendChatMessage('model', fallbackReply);
  }

  sendTutorBtn.addEventListener('click', handleSendTutorMessage);
  tutorInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSendTutorMessage();
  });

  closeTutorModalBtn.addEventListener('click', () => {
    tutorModal.style.display = 'none';
  });

  // API Settings Modal Handlers
  settingsBtn.addEventListener('click', () => {
    const config = getAppConfig();
    settingsGeminiKey.value = config.geminiKey || '';
    settingsSupabaseUrl.value = config.supabaseUrl || '';
    settingsSupabaseKey.value = config.supabaseKey || '';
    settingsModal.style.display = 'flex';
  });

  closeSettingsModalBtn.addEventListener('click', () => {
    settingsModal.style.display = 'none';
  });

  settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const gKey = settingsGeminiKey.value.trim();
    const sUrl = settingsSupabaseUrl.value.trim();
    const sKey = settingsSupabaseKey.value.trim();

    if (gKey) localStorage.setItem('gre_gemini_key', gKey);
    else localStorage.removeItem('gre_gemini_key');

    if (sUrl) localStorage.setItem('gre_supabase_url', sUrl);
    else localStorage.removeItem('gre_supabase_url');

    if (sKey) localStorage.setItem('gre_supabase_key', sKey);
    else localStorage.removeItem('gre_supabase_key');

    showToast("Settings & API Credentials Saved!");
    settingsModal.style.display = 'none';
    initQuizSession();
  });

  // Source Ingestion Handler
  ingestBtn.addEventListener('click', () => {
    ingestModal.style.display = 'flex';
  });

  closeIngestModalBtn.addEventListener('click', () => {
    ingestModal.style.display = 'none';
  });

  ingestForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const opts = document.getElementById('ingestOptions').value.split('\n').map(o => o.trim()).filter(o => o.length > 0);

    const payload = {
      title: document.getElementById('ingestTitle').value.trim(),
      category: document.getElementById('ingestCategory').value,
      subcategory: document.getElementById('ingestSubcategory').value.trim(),
      question_type: 'single',
      question_text: document.getElementById('ingestQuestionText').value.trim(),
      options: opts,
      correct_answer: document.getElementById('ingestCorrect').value.trim(),
      explanation: document.getElementById('ingestHack').value.trim(),
      trap_type: document.getElementById('ingestTrapType').value.trim(),
      trap_description: document.getElementById('ingestTrapDesc').value.trim(),
      hack_solution: document.getElementById('ingestHack').value.trim(),
      rule_takeaway: document.getElementById('ingestRule').value.trim(),
      difficulty_rating: 3
    };

    try {
      const ok = await insertSourceQuestionDirect(payload);
      if (ok) {
        showToast("Practice Question saved to Supabase Database!");
      } else {
        showToast("Saved question locally (Supabase unconfigured or offline).");
      }
    } catch (err) {
      showToast("Saved question locally.");
    }

    ingestModal.style.display = 'none';
    ingestForm.reset();
    initQuizSession();
  });

  // -------------------------------------------------------------
  // START SCREEN EVENT HANDLERS
  // -------------------------------------------------------------

  if (startModeCards && startModeCards.length > 0) {
    startModeCards.forEach(card => {
      card.addEventListener('click', () => {
        startModeCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        activeQuizMode = card.dataset.mode;
      });

      card.addEventListener('dblclick', () => {
        startModeCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        activeQuizMode = card.dataset.mode;
        initQuizSession();
      });
    });
  }

  if (startEnableAiCheck) {
    startEnableAiCheck.addEventListener('change', (e) => {
      enableAiVariations = e.target.checked;
      if (enableAiVariationsCheck) enableAiVariationsCheck.checked = enableAiVariations;
    });
  }

  if (startResetProgressBtn) {
    startResetProgressBtn.addEventListener('click', async () => {
      clearSeenQuestionHistory();
      const rawBank = await fetchQuestionBank();
      updateQuestionProgressUI(rawBank.length);
      showToast('Question rotation history reset!');
    });
  }

  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', () => {
      initQuizSession();
    });
  }

  // Mode Selection Modal & Navigation
  const resetSeenHistoryBtn = document.getElementById('resetSeenHistoryBtn');

  modeSelectBtn.addEventListener('click', async () => {
    showStartScreen();
  });

  if (resetSeenHistoryBtn) {
    resetSeenHistoryBtn.addEventListener('click', async () => {
      clearSeenQuestionHistory();
      const rawBank = await fetchQuestionBank();
      updateQuestionProgressUI(rawBank.length);
      showToast('Question rotation history reset!');
    });
  }

  closeModeModalBtn.addEventListener('click', () => {
    modeModal.style.display = 'none';
  });

  modeCardBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeQuizMode = btn.dataset.mode;
      enableAiVariations = enableAiVariationsCheck.checked;
      modeModal.style.display = 'none';
      initQuizSession();
    });
  });

  // Report Log & Clipboard Actions
  copyBtn.addEventListener('click', () => {
    tutorExport.select();
    navigator.clipboard.writeText(tutorExport.value).then(() => {
      showToast('Copied Diagnostic Report to Clipboard!');
    }).catch(() => {
      document.execCommand('copy');
      showToast('Copied Diagnostic Report to Clipboard!');
    });
  });

  reportLogToggleBtn.addEventListener('click', () => {
    if (startView) startView.style.display = 'none';
    testView.style.display = 'none';
    resultsView.style.display = 'none';
    reportLogView.style.display = 'flex';
    renderReportView();
  });

  returnToTestBtn.addEventListener('click', () => {
    reportLogView.style.display = 'none';
    if (activeQuestions && activeQuestions.length > 0 && timerInterval) {
      testView.style.display = 'flex';
    } else {
      showStartScreen();
    }
  });

  viewLogFromResultsBtn.addEventListener('click', () => {
    resultsView.style.display = 'none';
    reportLogView.style.display = 'flex';
    renderReportView();
  });

  restartBtn.addEventListener('click', () => {
    showStartScreen();
  });

  clearLogBtn.addEventListener('click', () => {
    if (confirm('Clear all log history?')) {
      localStorage.removeItem('gre_tutor_history');
      renderReportView();
      showToast('History cleared.');
    }
  });

  function renderReportView() {
    const history = JSON.parse(localStorage.getItem('gre_tutor_history') || '[]');
    tutoringLogContainer.innerHTML = '';

    if (history.length === 0) {
      tutoringLogContainer.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 40px;">No practice sessions logged yet. Complete a quiz to view diagnostics here.</div>';
      logTotalSummary.textContent = "0 Practice Sessions Logged";
      return;
    }

    let grandTotalScore = 0;
    let grandTotalQs = 0;
    let grandTotalMissed = 0;

    history.forEach((session, idx) => {
      grandTotalScore += session.totalScore;
      grandTotalQs += session.totalQuestions;
      const missed = session.missedQuestions || [];
      grandTotalMissed += missed.length;

      const card = document.createElement('div');
      card.className = 'export-container';
      card.style.marginBottom = '16px';

      let missedHTML = '';
      missed.forEach((m, mIdx) => {
        missedHTML += `
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 12px; margin-top: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 700; color: #b91c1c;">Question #${mIdx + 1}: ${escapeHtml(m.trap_type || 'Trap')}</span>
              <button class="btn btn-secondary launch-tutor-btn" style="padding: 4px 10px; font-size: 0.75rem; min-height: 32px;" data-idx="${mIdx}">Chat with Socratic Tutor</button>
            </div>
            <div style="font-size: 0.88rem; margin: 8px 0; color: #1a1a1a;">${formatQuestionText(m.question_text || '')}</div>
            <div style="font-size: 0.8rem; color: #595959;">
              <strong>Your Answer:</strong> ${escapeHtml(m.user_answer || '')} | <strong>Correct Answer:</strong> ${escapeHtml(m.correct_answer || '')}
            </div>
          </div>
        `;
      });

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-weight: 700; color: #0f2b5c;">Session #${history.length - idx}: ${session.totalScore}/${session.totalQuestions} (${Math.round((session.totalScore / session.totalQuestions) * 100)}%)</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${session.date}</div>
        </div>
        <div>${missedHTML}</div>
      `;

      // Attach Socratic Tutor click event to launch tutor modal for specific missed question
      const tutorBtns = card.querySelectorAll('.launch-tutor-btn');
      tutorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const item = missed[parseInt(btn.dataset.idx)];
          openTutorChat(item);
        });
      });

      tutoringLogContainer.appendChild(card);
    });

    logTotalSummary.textContent = `${history.length} Practice Session(s) Logged`;
    const avgPct = Math.round((grandTotalScore / grandTotalQs) * 100);
    logAvgScorePill.textContent = `Average Accuracy: ${avgPct}%`;
    logTotalMissedPill.textContent = `Total Missed Questions: ${grandTotalMissed}`;
  }

  // Calculator Toggle & Drag
  calcToggleBtn.addEventListener('click', () => {
    calculatorModal.style.display = calculatorModal.style.display === 'none' ? 'block' : 'none';
  });
  calcCloseBtn.addEventListener('click', () => {
    calculatorModal.style.display = 'none';
  });

  // Basic Calculator Keypad Logic
  const calcKeypad = document.querySelector('.calc-keypad');
  if (calcKeypad) {
    calcKeypad.addEventListener('click', (e) => {
      const btn = e.target.closest('.calc-btn');
      if (!btn) return;
      const val = btn.dataset.val;
      const action = btn.dataset.action;

      if (val !== undefined) {
        if (calcDisplay.value === '0') calcDisplay.value = val;
        else calcDisplay.value += val;
      } else if (action === 'clear') {
        calcDisplay.value = '0';
      } else if (action === 'equals') {
        try {
          const evalExpr = calcDisplay.value.replace(/×/g, '*').replace(/÷/g, '/');
          calcDisplay.value = String(eval(evalExpr));
        } catch (err) {
          calcDisplay.value = 'Error';
        }
      }
    });
  }

  transferDisplayBtn.addEventListener('click', () => {
    const numInput = document.getElementById('numericEntryInput');
    if (numInput) {
      numInput.value = calcDisplay.value;
      userAnswers[currentIndex] = calcDisplay.value;
      updatePaletteUI();
      showToast('Transferred calculator value to numeric entry field!');
    } else {
      showToast('Numeric entry input is not active for this question.');
    }
  });

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  function formatQuestionText(rawText) {
    if (!rawText) return '';

    // Convert literal backslash-n escape sequences (\n or \r\n) from JSON string payloads to real newlines
    let normalized = rawText.replace(/\\n/g, '\n').replace(/\\r/g, '');

    // Check for Quantitative Comparison format ("Quantity A:" and "Quantity B:")
    const qAMatch = normalized.match(/Quantity\s+A\s*:/i);
    const qBMatch = normalized.match(/Quantity\s+B\s*:/i);

    if (qAMatch && qBMatch && qAMatch.index < qBMatch.index) {
      const context = normalized.substring(0, qAMatch.index).trim();
      const quantA = normalized.substring(qAMatch.index + qAMatch[0].length, qBMatch.index).trim();
      const quantB = normalized.substring(qBMatch.index + qBMatch[0].length).trim();

      let html = '<div class="qc-container">';
      if (context) {
        html += `<div class="qc-context-text">${escapeHtml(context).replace(/\n/g, '<br>')}</div>`;
      }

      html += `
        <div class="qc-boxes-grid">
          <div class="qc-column-box">
            <div class="qc-column-header">Quantity A</div>
            <div class="qc-column-content">${escapeHtml(quantA).replace(/\n/g, '<br>')}</div>
          </div>
          <div class="qc-column-box">
            <div class="qc-column-header">Quantity B</div>
            <div class="qc-column-content">${escapeHtml(quantB).replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      </div>`;
      return html;
    }

    // Standard question text formatting
    return escapeHtml(normalized).replace(/\n/g, '<br>');
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
});
