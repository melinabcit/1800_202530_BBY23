// Career Quiz Results JavaScript
import { auth, db } from "/src/firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, deleteDoc, doc, getDocs, query, orderBy, limit, Timestamp } from "firebase/firestore";

// Personality category definitions with emojis and improved result text
const personalityCategories = {
  directive: {
    name: "Directive",
    emoji: "🧭",
    description: "You chose many answers about leading, organizing, and making decisions. This suggests you have a Directive style. You enjoy taking charge, setting goals, and keeping things on track. You're comfortable being responsible and guiding others.",
    careers: [
      "Project Coordinator",
      "Human Resources Assistant",
      "Hospitality Supervisor",
      "Marketing Coordinator",
      "Aviation Operations Specialist"
    ]
  },
  methodical: {
    name: "Methodical",
    emoji: "📋",
    description: "You chose many answers about structure, checklists, and clear steps. This suggests you have a Methodical style. You like predictable systems, detailed instructions, and finishing tasks one by one. Accuracy and consistency matter to you.",
    careers: [
      "Administrative Assistant",
      "Accounting Assistant",
      "Data Analyst",
      "Medical Laboratory Assistant",
      "Pharmacy Technician"
    ]
  },
  innovative: {
    name: "Innovative",
    emoji: "💡",
    description: "You chose many answers about changing things, experimenting, and creativity. This suggests you have an Innovative style. You enjoy solving problems in new ways and working with ideas, technology, or design. You adapt well to change and enjoy challenges.",
    careers: [
      "Web Developer / Software Developer",
      "UX/UI Designer",
      "Graphic Designer",
      "Industrial Designer",
      "Data Analyst"
    ]
  },
  supportive: {
    name: "Supportive",
    emoji: "🤝",
    description: "You chose many answers about helping others, supporting people, and caring about feelings. This suggests you have a Supportive style. You like roles where you can listen, encourage, teach, or care for others. Teamwork and human connection are important to you.",
    careers: [
      "Early Childhood Educator Assistant",
      "Community Service Worker",
      "Health Care Assistant",
      "Social Services Worker",
      "Customer Support Specialist"
    ]
  },
  expressive: {
    name: "Expressive",
    emoji: "🎨",
    description: "You chose many answers about sharing ideas, creativity, and communication. This suggests you have an Expressive style. You enjoy presenting, telling stories, designing, or performing. You often bring energy and personality into your work.",
    careers: [
      "Acting Teacher",
      "Social Media Manager",
      "Broadcast Journalist",
      "Graphic Designer",
      "Marketing Coordinator"
    ]
  }
};

// Quiz questions data (matching quiz.js)
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

// Occupations database with match criteria
const occupationsDatabase = [
  { 
    name: "Acting Teacher", 
    education: "N, C, U", 
    description: "Teaches acting skills to students in schools or studios.",
    matchPercentage: 99,
    jobBankUrl: "https://www.jobbank.gc.ca/browsejobs?q=Acting+teacher",
    categories: ["expressive", "supportive"]
  },
  { 
    name: "Chefs", 
    education: "H", 
    description: "Prepare meals, plan menus, and manage kitchen operations.",
    matchPercentage: 98,
    jobBankUrl: "https://www.jobbank.gc.ca/browsejobs?q=Chef",
    categories: ["innovative", "methodical"]
  },
  { 
    name: "Graphic Designer", 
    education: "C", 
    description: "Creates visual designs for brands, products, and media.",
    matchPercentage: 96,
    jobBankUrl: "https://www.jobbank.gc.ca/browsejobs?q=Graphic+Designer",
    categories: ["expressive", "innovative"]
  },
  { 
    name: "Web Developer", 
    education: "C", 
    description: "Builds websites and applications using code + design.",
    matchPercentage: 95,
    jobBankUrl: "https://www.jobbank.gc.ca/browsejobs?q=Web+Developer",
    categories: ["innovative", "methodical"]
  },
  { 
    name: "Early Childhood Educator Assistant", 
    education: "C", 
    description: "Supports children with learning, routines, and play.",
    matchPercentage: 94,
    jobBankUrl: "https://www.jobbank.gc.ca/browsejobs?q=Early+Childhood+Educator",
    categories: ["supportive", "methodical"]
  },
  { 
    name: "Marketing Coordinator", 
    education: "C, U", 
    description: "Helps plan campaigns, content, and promotional activities.",
    matchPercentage: 93,
    jobBankUrl: "https://www.jobbank.gc.ca/browsejobs?q=Marketing",
    categories: ["expressive", "directive"]
  },
  { 
    name: "Administrative Assistant", 
    education: "H, C", 
    description: "Organizes office tasks, schedules, and communications.",
    matchPercentage: 91,
    jobBankUrl: "https://www.jobbank.gc.ca/browsejobs?q=Administrative+Assistant",
    categories: ["methodical", "supportive"]
  },
  { 
    name: "IT Support Technician", 
    education: "C", 
    description: "Fixes computer, network, and software issues.",
    matchPercentage: 90,
    jobBankUrl: "https://www.jobbank.gc.ca/browsejobs?q=IT+support",
    categories: ["methodical", "supportive"]
  },
  { 
    name: "Sales Associate", 
    education: "N, H", 
    description: "Helps customers, explains products, and supports sales.",
    matchPercentage: 89,
    jobBankUrl: "https://www.jobbank.gc.ca/browsejobs?q=Sales",
    categories: ["expressive", "supportive"]
  },
  { 
    name: "Community Service Worker", 
    education: "C", 
    description: "Supports individuals and families in community programs.",
    matchPercentage: 88,
    jobBankUrl: "https://www.jobbank.gc.ca/browsejobs?q=Community+Service+Worker",
    categories: ["supportive", "directive"]
  }
];

// Calculate category scores from quiz answers
function calculateCategoryScores() {
  const answers = JSON.parse(localStorage.getItem('careerQuizAnswers') || '{}');
  const categoryScores = {
    directive: 0,
    supportive: 0,
    methodical: 0,
    expressive: 0,
    innovative: 0
  };

  // Process each answer
  for (let i = 0; i < quizData.length; i++) {
    const answerIndex = answers[i];
    if (answerIndex !== undefined && quizData[i].options[answerIndex]) {
      const selectedOption = quizData[i].options[answerIndex];
      const types = selectedOption.type.split(',');
      
      // Add score for each type (multiple types can be scored)
      types.forEach(type => {
        type = type.trim();
        if (categoryScores.hasOwnProperty(type)) {
          categoryScores[type]++;
        }
      });
    }
  }

  // Convert counts to percentages based on maximum possible score
  const maxScore = quizData.length;
  const percentageScores = {};
  for (const category in categoryScores) {
    percentageScores[category] = Math.round((categoryScores[category] / maxScore) * 100);
  }

  return percentageScores;
}

// Get top categories sorted by score
function getTopCategories(scores) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3); // Top 3 categories
}

// Calculate occupation matches based on category scores
function calculateOccupationMatches(categoryScores) {
  const matches = occupationsDatabase.map(occupation => {
    let matchScore = 0;
    let categoryCount = 0;

    occupation.categories.forEach(category => {
      matchScore += categoryScores[category] || 0;
      categoryCount++;
    });

    // Average match score
    const averageMatch = categoryCount > 0 ? Math.round(matchScore / categoryCount) : 0;
    
    return {
      ...occupation,
      matchPercentage: averageMatch
    };
  });

  // Sort by match percentage (descending)
  return matches.sort((a, b) => b.matchPercentage - a.matchPercentage);
}

// Render personality categories
function renderCategories() {
  const scores = calculateCategoryScores();
  const topCategories = getTopCategories(scores);
  const categoriesGrid = document.getElementById('categoriesGrid');
  
  categoriesGrid.innerHTML = '';
  
  topCategories.forEach(([categoryKey, score]) => {
    const category = personalityCategories[categoryKey];
    const careersHtml = category.careers.map(career => `<li>${career}</li>`).join('');
    
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
      <span class="category-emoji">${category.emoji}</span>
      <h3>${category.name}</h3>
      <div class="category-score">${score}% Match</div>
      <p>${category.description}</p>
      <div style="margin-top: 15px;">
        <strong>Careers that often match this style include:</strong>
        <ul style="text-align: left; margin-top: 8px;">
          ${careersHtml}
        </ul>
      </div>
    `;
    categoriesGrid.appendChild(card);
  });

  return { scores, topCategories };
}

// Render occupations table
function renderOccupations(categoryScores) {
  const occupationsBody = document.getElementById('occupationsBody');
  
  occupationsBody.innerHTML = '';
  
  occupationsDatabase.forEach(occupation => {
    const row = document.createElement('tr');
    row.setAttribute('data-education', occupation.education);
    row.innerHTML = `
      <td class="match-percentage">${occupation.matchPercentage}%</td>
      <td class="occupation-name">
        <a href="${occupation.jobBankUrl}" target="_blank" rel="noopener noreferrer">${occupation.name}</a>
      </td>
      <td class="education-level">${occupation.education}</td>
      <td class="occupation-description">${occupation.description}</td>
    `;
    occupationsBody.appendChild(row);
  });

  // Setup education filters
  setupFilters();
}

// Setup education level filters
function setupFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const rows = document.querySelectorAll('.occupations-table tbody tr');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter rows
      rows.forEach(row => {
        const education = row.getAttribute('data-education');
        
        if (filter === 'all') {
          row.classList.remove('hidden');
        } else {
          // Check if education contains any of the filter levels
          const filterLevels = filter.split(',');
          const educationLevels = education.split(',').map(e => e.trim());
          const matches = filterLevels.some(level => educationLevels.includes(level));
          
          if (matches) {
            row.classList.remove('hidden');
          } else {
            row.classList.add('hidden');
          }
        }
      });
    });
  });
}

// Render career insights
function renderInsights(topCategories) {
  const insightsGrid = document.getElementById('insightsGrid');
  const nextStepsElem = document.getElementById('nextSteps');
  
  const insights = [];
  
  // Generate insights based on top categories
  if (topCategories.length > 0) {
    const [firstCat] = topCategories[0];
    const category = personalityCategories[firstCat];
    
    if (firstCat === 'directive') {
      insights.push(`Your <strong>Directive</strong> strength indicates you're a natural leader. Consider roles where you can manage teams, organize projects, and make important decisions.`);
    } else if (firstCat === 'supportive') {
      insights.push(`Your <strong>Supportive</strong> orientation shows you excel at helping others. Look for careers in education, healthcare, counseling, or community services.`);
    } else if (firstCat === 'methodical') {
      insights.push(`Your <strong>Methodical</strong> approach means you thrive in structured environments. Consider careers in administration, quality control, or technical fields with clear procedures.`);
    } else if (firstCat === 'expressive') {
      insights.push(`Your <strong>Expressive</strong> mindset shows you're creative and communicative. Explore careers in arts, design, writing, marketing, or public speaking.`);
    } else if (firstCat === 'innovative') {
      insights.push(`Your <strong>Innovative</strong> nature means you enjoy creativity and experimentation. Consider careers in design, development, arts, or entrepreneurship.`);
    }
  }

  if (topCategories.length > 1) {
    const [secondCat] = topCategories[1];
    insights.push(`Your secondary strength in <strong>${personalityCategories[secondCat].name}</strong> work complements your primary interest, opening up diverse career paths that combine both elements.`);
  }

  insights.push(`The occupations listed above align with your personality profile. Higher match percentages indicate stronger alignment with your interests and work preferences.`);
  
  insights.push(`Education requirements vary by occupation. Some roles offer multiple entry paths (N=No formal education, H=High School, C=College, U=University), giving you flexibility in your career journey.`);

  // Render insights
  insightsGrid.innerHTML = '';
  insights.forEach(insight => {
    const card = document.createElement('div');
    card.className = 'insight-card';
    card.innerHTML = `<p>${insight}</p>`;
    insightsGrid.appendChild(card);
  });

  // Set next steps
  nextStepsElem.innerHTML = `
    Explore the occupations that interest you most by researching their specific requirements, day-to-day tasks, and career prospects. 
    Consider talking to professionals in these fields, exploring relevant educational programs, or seeking internship opportunities to gain hands-on experience.
  `;
}

// Check if quiz has been completed
function checkQuizCompletion() {
  const answers = JSON.parse(localStorage.getItem('careerQuizAnswers') || '{}');
  const requiredQuestions = quizData.length; // 8 questions
  if (Object.keys(answers).length < requiredQuestions) {
    // Redirect to quiz if not completed
    window.location.href = 'quiz.html';
    return false;
  }
  return true;
}

// Initialize results page
async function initResults() {
  // Check if quiz was completed
  if (!checkQuizCompletion()) {
    return;
  }

  // Render all sections
  const { scores, topCategories } = renderCategories();
  renderOccupations(scores);
  renderInsights(topCategories);
  
  // Save results to Firebase if user is logged in
  await saveResultsToFirebase(scores, topCategories);
}

// Save quiz results to Firebase (with FIFO queue - keep only 3 most recent)
async function saveResultsToFirebase(categoryScores, topCategories) {
  // Check if Firebase auth is available
  if (!auth) {
    console.log("Firebase auth not available. Results not saved to cloud.");
    return;
  }
  
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // Check if viewing a saved result
        const viewResultId = localStorage.getItem('viewResultId');
        if (viewResultId) {
          // User is viewing a saved result, don't save again
          localStorage.removeItem('viewResultId');
          return;
        }
        
        // Prepare result data
        const resultData = {
          timestamp: Timestamp.now(),
          categoryScores: categoryScores,
          topCategories: topCategories,
          answers: JSON.parse(localStorage.getItem('careerQuizAnswers') || '{}')
        };
        
        // Reference to user's quiz results collection
        const resultsRef = collection(db, "users", user.uid, "quizResults");
        
        // Add new result
        await addDoc(resultsRef, resultData);
        console.log("Quiz result saved successfully!");
        
        // Implement FIFO queue: Keep only 3 most recent results
        const q = query(resultsRef, orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        
        // If more than 3 results, delete the oldest ones
        if (querySnapshot.size > 3) {
          const resultsArray = [];
          querySnapshot.forEach((doc) => {
            resultsArray.push({ id: doc.id, timestamp: doc.data().timestamp });
          });
          
          // Sort by timestamp descending and keep only first 3
          resultsArray.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
          
          // Delete results beyond the 3 most recent
          for (let i = 3; i < resultsArray.length; i++) {
            await deleteDoc(doc(db, "users", user.uid, "quizResults", resultsArray[i].id));
            console.log(`Deleted old result: ${resultsArray[i].id}`);
          }
        }
        
      } catch (error) {
        console.error("Error saving quiz results:", error);
      }
    }
  });
}


// Initialize when page loads
document.addEventListener('DOMContentLoaded', initResults);
