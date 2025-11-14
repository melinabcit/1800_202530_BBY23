// Career Quiz JavaScript

// Quiz questions with multiple choice options
// Each option maps to a personality type: directive, methodical, innovative, supportive, expressive
const quizData = [
  {
    question: "When you start a new task, what do you usually care about most?",
    options: [
      { text: "Getting everyone organized and moving in the same direction", type: "directive" },
      { text: "Having clear steps and instructions", type: "methodical" },
      { text: "Finding a new or better way to do it", type: "innovative" },
      { text: "Making sure people feel supported and comfortable", type: "supportive" }
    ]
  },
  {
    question: "A friend asks you for help on a project. What do you enjoy doing most?",
    options: [
      { text: "Taking the lead and assigning roles", type: "directive" },
      { text: "Making a checklist and timeline", type: "methodical" },
      { text: "Brainstorming creative or unusual ideas", type: "innovative" },
      { text: "Listening, encouraging, and keeping them calm", type: "supportive" }
    ]
  },
  {
    question: "How do you like to share your ideas?",
    options: [
      { text: "Presenting them clearly in a meeting or group", type: "directive" },
      { text: "Writing them out in a detailed document", type: "methodical" },
      { text: "Showing a sketch, mockup, or demo", type: "innovative" },
      { text: "Telling a story, using humor, or making it inspiring", type: "expressive" }
    ]
  },
  {
    question: "You learn best when:",
    options: [
      { text: "You can try leading or managing real situations", type: "directive" },
      { text: "You can follow examples and practice step-by-step", type: "methodical" },
      { text: "You can explore, experiment, and ask 'what if?'", type: "innovative" },
      { text: "You can discuss with others or explain it to someone else", type: "expressive" }
    ]
  },
  {
    question: "Which sounds the most satisfying?",
    options: [
      { text: "Organizing a team to hit a deadline", type: "directive" },
      { text: "Setting up a system that runs smoothly", type: "methodical" },
      { text: "Designing something new from scratch", type: "innovative" },
      { text: "Helping someone feel more confident or understood", type: "supportive,expressive" }
    ]
  },
  {
    question: "In a group project, you usually:",
    options: [
      { text: "Naturally step into the leader role", type: "directive" },
      { text: "Keep track of tasks, due dates, and details", type: "methodical" },
      { text: "Suggest new tools, layouts, or creative approaches", type: "innovative" },
      { text: "Check in on teammates and help if they're stuck", type: "supportive" }
    ]
  },
  {
    question: "Which type of work makes you tired the fastest?",
    options: [
      { text: "Work where no one listens and there's no leadership", type: "directive" },
      { text: "Work that's chaotic and disorganized", type: "methodical" },
      { text: "Repeating the same thing with no room for new ideas", type: "innovative" },
      { text: "Work where you can't connect with people at all", type: "supportive,expressive" }
    ]
  },
  {
    question: "On a dream workday, you would mostly:",
    options: [
      { text: "Run a project, make decisions, and keep things moving", type: "directive" },
      { text: "Organize data, files, or systems so everything is clear", type: "methodical" },
      { text: "Design, code, write, or invent something creative", type: "innovative,expressive" },
      { text: "Teach, mentor, help clients, or support kids/people", type: "supportive" }
    ]
  }
];

// Quiz state
let currentQuestion = 0;
let answers = {};

// Initialize quiz
function initQuiz() {
  loadAnswers();
  renderQuestion();
  updateProgress();
  updateNavigation();
  
  // Add event listeners
  document.getElementById('nextBtn').addEventListener('click', nextQuestion);
  document.getElementById('prevBtn').addEventListener('click', prevQuestion);
  document.getElementById('submitBtn').addEventListener('click', submitQuiz);
  document.getElementById('deleteBtn').addEventListener('click', deleteAllAnswers);
}

// Render current question
function renderQuestion() {
  const questionsContainer = document.getElementById('quizQuestions');
  questionsContainer.innerHTML = '';
  
  const questionData = quizData[currentQuestion];
  const questionDiv = createQuestionElement(questionData, currentQuestion);
  questionsContainer.appendChild(questionDiv);
}

// Create a question element
function createQuestionElement(questionData, questionNumber) {
  const div = document.createElement('div');
  div.className = 'question-item';
  
  const questionTitle = document.createElement('div');
  questionTitle.className = 'question-text';
  questionTitle.innerHTML = `<strong>Question ${questionNumber + 1} of ${quizData.length}</strong><br>${questionData.question}`;
  
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'question-options';
  
  questionData.options.forEach((option, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option-item';
    
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question_${questionNumber}`;
    input.value = index;
    input.id = `q${questionNumber}_${index}`;
    
    // Check if this option was previously selected
    if (answers[questionNumber] === index) {
      input.checked = true;
    }
    
    input.addEventListener('change', () => {
      saveAnswer(questionNumber, index);
    });
    
    const label = document.createElement('label');
    label.htmlFor = input.id;
    label.textContent = option.text;
    
    optionDiv.appendChild(input);
    optionDiv.appendChild(label);
    optionsContainer.appendChild(optionDiv);
  });
  
  div.appendChild(questionTitle);
  div.appendChild(optionsContainer);
  
  return div;
}

// Save answer
function saveAnswer(questionNumber, value) {
  answers[questionNumber] = parseInt(value);
  localStorage.setItem('careerQuizAnswers', JSON.stringify(answers));
  updateProgress();
  updateNavigation();
}

// Load answers from localStorage
function loadAnswers() {
  const saved = localStorage.getItem('careerQuizAnswers');
  if (saved) {
    answers = JSON.parse(saved);
  }
}

// Update progress bar
function updateProgress() {
  const totalQuestions = quizData.length;
  const answeredQuestions = Object.keys(answers).length;
  const percentage = Math.round((answeredQuestions / totalQuestions) * 100);
  
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  
  progressFill.style.width = percentage + '%';
  progressText.textContent = percentage + '%';
}

// Update navigation buttons
function updateNavigation() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  
  // Show/hide previous button
  if (currentQuestion === 0) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'inline-block';
  }
  
  // Show/hide next and submit buttons
  if (currentQuestion === quizData.length - 1) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
  } else {
    nextBtn.style.display = 'inline-block';
    submitBtn.style.display = 'none';
  }
  
  // Enable/disable next button based on current question answered
  const isAnswered = answers.hasOwnProperty(currentQuestion);
  nextBtn.disabled = !isAnswered;
  submitBtn.disabled = !isAnswered;
}

// Next question
function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    renderQuestion();
    updateProgress();
    updateNavigation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Previous question
function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
    updateProgress();
    updateNavigation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Submit quiz
function submitQuiz() {
  const totalQuestions = quizData.length;
  const answeredQuestions = Object.keys(answers).length;
  
  if (answeredQuestions < totalQuestions) {
    alert(`Please answer all questions before submitting. You have answered ${answeredQuestions} out of ${totalQuestions} questions.`);
    return;
  }
  
  // Calculate results
  calculateResults();
}

// Calculate quiz results
function calculateResults() {
  // Redirect to results page
  window.location.href = 'results.html';
}

// Delete all answers
function deleteAllAnswers() {
  if (confirm('Are you sure you want to delete all your answers? This action cannot be undone.')) {
    answers = {};
    localStorage.removeItem('careerQuizAnswers');
    currentQuestion = 0;
    renderQuestion();
    updateProgress();
    updateNavigation();
  }
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);
