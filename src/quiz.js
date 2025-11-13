// Career Quiz JavaScript

// All 50 quiz questions organized by page
const quizData = [
  // Page 1 (Questions 1-10)
  [
    "Doing the same task for a long period of time.",
    "Building things and/or repairing them.",
    "Exploring a subject from different points of view.",
    "Finishing one job before you start the next.",
    "Directing people in their activities.",
    "Maintaining a steady pace throughout an activity.",
    "Doing trial runs and applying changes.",
    "Being responsible for organizing an activity and planning something for everyone to do.",
    "Helping people solve their problems.",
    "Being responsible for a project or activity and have to look after many different details to complete it."
  ],
  // Page 2 (Questions 11-20)
  [
    "Learning about scientific topics by reading books, watching TV shows or visiting websites.",
    "Working with tools and machinery.",
    "Working according to prescribed methods.",
    "Solving your own problems and do projects using your own ideas.",
    "Doing a project or other job carefully, one step at a time.",
    "Planning the tasks or activities of others.",
    "Taking charge of things and get them done.",
    "Trying new ways of doing things.",
    "Spending your days working with machines or equipment.",
    "Maintaining equipment or machinery."
  ],
  // Page 3 (Questions 21-30)
  [
    "Working in the field of community services.",
    "Doing activities where you always know what is expected of you.",
    "Speaking with people and listening to them.",
    "Calculating to solve a problem.",
    "Helping people improve their lives.",
    "Working with your hands, doing things such as plumbing repairs, sewing, fixing cars, or wallpapering.",
    "Discovering how things are made and work through reading books, watching television or searching on websites.",
    "Doing an activity where your work is closely checked regularly.",
    "Assisting people when they are sick or in trouble.",
    "Working in a team."
  ],
  // Page 4 (Questions 31-40)
  [
    "Working with materials such as wood, stone, clay, fabric or metal.",
    "Thinking to invent or create.",
    "Leading a committee, an association or a team.",
    "Bringing comfort to others.",
    "Working by following well-established procedures.",
    "Working with tools, equipment or technical instruments.",
    "Having a job in which you are working with machines or things rather than dealing with people.",
    "Being in control of a group rather than just a member.",
    "Cooperating with others.",
    "Working on research projects."
  ],
  // Page 5 (Questions 41-50)
  [
    "Taking responsibility for decisions.",
    "Getting people to do what you want.",
    "Going through evidence to solve problems.",
    "Looking after people.",
    "Doing an activity where you are told what to do and how.",
    "Discussing with people to know their opinions.",
    "Organizing your tasks in your own way.",
    "Working to discover new ideas or things.",
    "Working on one thing at a time.",
    "Doing hobbies on your own, such as building models, gardening, refinishing old furniture, etc."
  ]
];

// Rating options
const ratingOptions = [
  { value: 1, label: "Not interested at all" },
  { value: 2, label: "Slightly interested" },
  { value: 3, label: "Moderately interested" },
  { value: 4, label: "Very interested" },
  { value: 5, label: "Extremely interested" }
];

// Quiz state
let currentPage = 0;
let answers = {};

// Initialize quiz
function initQuiz() {
  loadAnswers();
  renderQuestions();
  updateProgress();
  updateNavigation();
  updatePageIndicator();
  
  // Add event listeners
  document.getElementById('nextBtn').addEventListener('click', nextPage);
  document.getElementById('prevBtn').addEventListener('click', prevPage);
  document.getElementById('submitBtn').addEventListener('click', submitQuiz);
  document.getElementById('deleteBtn').addEventListener('click', deleteAllAnswers);
}

// Render questions for current page
function renderQuestions() {
  const questionsContainer = document.getElementById('quizQuestions');
  questionsContainer.innerHTML = '';
  
  const currentQuestions = quizData[currentPage];
  const startIndex = currentPage * 10;
  
  currentQuestions.forEach((question, index) => {
    const questionNumber = startIndex + index;
    const questionDiv = createQuestionElement(question, questionNumber);
    questionsContainer.appendChild(questionDiv);
  });
}

// Create a question element
function createQuestionElement(questionText, questionNumber) {
  const div = document.createElement('div');
  div.className = 'question-item';
  
  const questionTitle = document.createElement('div');
  questionTitle.className = 'question-text';
  questionTitle.textContent = questionText;
  
  const ratingScale = document.createElement('div');
  ratingScale.className = 'rating-scale';
  
  // Left label
  const leftLabel = document.createElement('div');
  leftLabel.className = 'rating-label left';
  leftLabel.textContent = 'Not interested at all';
  ratingScale.appendChild(leftLabel);
  
  // Rating options
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'rating-options';
  
  ratingOptions.forEach(option => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'rating-option';
    
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question_${questionNumber}`;
    input.value = option.value;
    input.id = `q${questionNumber}_${option.value}`;
    
    // Check if this option was previously selected
    if (answers[questionNumber] === option.value) {
      input.checked = true;
    }
    
    input.addEventListener('change', () => {
      saveAnswer(questionNumber, option.value);
    });
    
    const label = document.createElement('label');
    label.htmlFor = input.id;
    label.textContent = option.label;
    
    optionDiv.appendChild(input);
    optionDiv.appendChild(label);
    optionsContainer.appendChild(optionDiv);
  });
  
  ratingScale.appendChild(optionsContainer);
  
  // Right label
  const rightLabel = document.createElement('div');
  rightLabel.className = 'rating-label right';
  rightLabel.textContent = 'Extremely interested';
  ratingScale.appendChild(rightLabel);
  
  div.appendChild(questionTitle);
  div.appendChild(ratingScale);
  
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
  const totalQuestions = 50;
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
  if (currentPage === 0) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'inline-block';
  }
  
  // Show/hide next and submit buttons
  if (currentPage === quizData.length - 1) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
  } else {
    nextBtn.style.display = 'inline-block';
    submitBtn.style.display = 'none';
  }
  
  // Enable/disable next button based on current page completion
  const startIndex = currentPage * 10;
  const endIndex = startIndex + 10;
  let allAnswered = true;
  
  for (let i = startIndex; i < endIndex; i++) {
    if (!answers.hasOwnProperty(i)) {
      allAnswered = false;
      break;
    }
  }
  
  // Allow navigation even if not all questions are answered (like the original quiz)
  nextBtn.disabled = false;
  submitBtn.disabled = false;
}

// Update page indicator
function updatePageIndicator() {
  const pageIndicator = document.getElementById('pageIndicator');
  pageIndicator.textContent = `Page ${currentPage + 1} of ${quizData.length}`;
}

// Next page
function nextPage() {
  if (currentPage < quizData.length - 1) {
    currentPage++;
    renderQuestions();
    updateProgress();
    updateNavigation();
    updatePageIndicator();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Previous page
function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    renderQuestions();
    updateProgress();
    updateNavigation();
    updatePageIndicator();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Submit quiz
function submitQuiz() {
  const totalQuestions = 50;
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
    renderQuestions();
    updateProgress();
    updateNavigation();
  }
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);
