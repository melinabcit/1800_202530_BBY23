// Career Quiz Results JavaScript
import { auth, db } from "/src/firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, deleteDoc, doc, getDocs, query, orderBy, limit, Timestamp } from "firebase/firestore";

// Personality category definitions with emojis
const personalityCategories = {
  directive: {
    name: "Directive",
    emoji: "🧭",
    description: "Directive people enjoy taking charge, organizing tasks, and leading others. They like clear goals, planning, and keeping everything on track. They prefer to make decisions quickly and take responsibility for outcomes."
  },
  methodical: {
    name: "Methodical",
    emoji: "📋",
    description: "Methodical people like structure, step-by-step processes, and predictable environments. They prefer working with rules, instructions, and well-defined tasks. They enjoy accuracy and consistency."
  },
  innovative: {
    name: "Innovative",
    emoji: "💡",
    description: "Innovative people enjoy exploring new ideas, solving problems creatively, and experimenting. They adapt easily to change and enjoy challenges that require original thinking."
  },
  supportive: {
    name: "Supportive",
    emoji: "🤝",
    description: "Supportive people enjoy helping others, working in teams, and making people feel welcome. They enjoy teaching, caring, and service roles."
  },
  expressive: {
    name: "Expressive",
    emoji: "🎨",
    description: "Expressive people enjoy communication, creativity, and presenting ideas. They thrive in writing, design, arts, speaking, and inspiring others."
  }
};

// Question to category mapping (1-indexed to match quiz)
const questionCategoryMap = {
  1: "methodical", 2: "supportive", 3: "innovative", 4: "methodical", 5: "directive",
  6: "methodical", 7: "innovative", 8: "directive", 9: "supportive", 10: "directive",
  11: "expressive", 12: "expressive", 13: "methodical", 14: "innovative", 15: "methodical",
  16: "directive", 17: "directive", 18: "innovative", 19: "expressive", 20: "expressive",
  21: "supportive", 22: "methodical", 23: "supportive", 24: "expressive", 25: "supportive",
  26: "expressive", 27: "expressive", 28: "methodical", 29: "supportive", 30: "supportive",
  31: "expressive", 32: "innovative", 33: "directive", 34: "supportive", 35: "methodical",
  36: "expressive", 37: "expressive", 38: "directive", 39: "supportive", 40: "expressive",
  41: "directive", 42: "directive", 43: "expressive", 44: "supportive", 45: "methodical",
  46: "supportive", 47: "innovative", 48: "innovative", 49: "methodical", 50: "expressive"
};

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
  
  const categoryCounts = {
    directive: 0,
    supportive: 0,
    methodical: 0,
    expressive: 0,
    innovative: 0
  };

  // Sum scores for each category
  for (let i = 0; i < 50; i++) {
    const questionNum = i;
    const category = questionCategoryMap[questionNum + 1];
    const answer = answers[questionNum];
    
    if (answer && category) {
      categoryScores[category] += answer;
      categoryCounts[category]++;
    }
  }

  // Calculate average scores (normalized to percentage)
  const averageScores = {};
  for (const category in categoryScores) {
    if (categoryCounts[category] > 0) {
      // Average score out of 5, converted to percentage
      averageScores[category] = Math.round((categoryScores[category] / (categoryCounts[category] * 5)) * 100);
    } else {
      averageScores[category] = 0;
    }
  }

  return averageScores;
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
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
      <span class="category-emoji">${category.emoji}</span>
      <h3>${category.name}</h3>
      <div class="category-score">${score}% Match</div>
      <p>${category.description}</p>
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
  if (Object.keys(answers).length < 50) {
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
