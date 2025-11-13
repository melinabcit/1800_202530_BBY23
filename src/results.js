// Career Quiz Results JavaScript

// Personality category definitions with emojis
const personalityCategories = {
  directive: {
    name: "Directive",
    emoji: "🎯",
    description: "You enjoy taking charge, organizing activities, and leading teams. You're comfortable making decisions and directing others to achieve goals efficiently."
  },
  social: {
    name: "Social",
    emoji: "🤝",
    description: "You thrive on helping others and working collaboratively. You find fulfillment in supporting people, solving their problems, and creating positive relationships."
  },
  methodical: {
    name: "Methodical",
    emoji: "📋",
    description: "You prefer structured environments with clear procedures. You excel at following detailed instructions, maintaining organization, and ensuring consistency in your work."
  },
  objective: {
    name: "Objective",
    emoji: "🔬",
    description: "You're analytical and enjoy working with data, science, and technical tasks. You like to understand how things work and solve problems through research and experimentation."
  },
  innovative: {
    name: "Innovative",
    emoji: "💡",
    description: "You're creative and enjoy exploring new ideas. You like to think outside the box, experiment with different approaches, and discover innovative solutions."
  }
};

// Question to category mapping (1-indexed to match quiz)
const questionCategoryMap = {
  1: "methodical", 2: "objective", 3: "innovative", 4: "methodical", 5: "directive",
  6: "methodical", 7: "innovative", 8: "directive", 9: "social", 10: "directive",
  11: "objective", 12: "objective", 13: "methodical", 14: "innovative", 15: "methodical",
  16: "directive", 17: "directive", 18: "innovative", 19: "objective", 20: "objective",
  21: "social", 22: "methodical", 23: "social", 24: "objective", 25: "social",
  26: "objective", 27: "objective", 28: "methodical", 29: "social", 30: "social",
  31: "objective", 32: "innovative", 33: "directive", 34: "social", 35: "methodical",
  36: "objective", 37: "objective", 38: "directive", 39: "social", 40: "objective",
  41: "directive", 42: "directive", 43: "objective", 44: "social", 45: "methodical",
  46: "social", 47: "innovative", 48: "innovative", 49: "methodical", 50: "objective"
};

// Occupations database with match criteria
const occupationsDatabase = [
  { name: "Acting Teachers", education: "N, C, U", description: "Teach acting techniques and dramatic arts to students at various educational levels.", categories: ["social", "innovative"] },
  { name: "Chefs", education: "H", description: "Prepare and cook food in restaurants and other food establishments.", categories: ["innovative", "methodical"] },
  { name: "Curators", education: "U", description: "Manage and care for collections in museums, galleries, and cultural institutions.", categories: ["methodical", "objective"] },
  { name: "Software Developers", education: "U", description: "Design, develop, and maintain software applications and systems.", categories: ["objective", "innovative"] },
  { name: "Project Managers", education: "U", description: "Plan, execute, and oversee projects to ensure they are completed on time and within budget.", categories: ["directive", "methodical"] },
  { name: "Social Workers", education: "U", description: "Help individuals and families cope with problems in their everyday lives.", categories: ["social", "directive"] },
  { name: "Mechanical Engineers", education: "U", description: "Design, develop, build, and test mechanical devices and systems.", categories: ["objective", "innovative"] },
  { name: "Teachers (Elementary)", education: "U", description: "Educate young students in elementary schools across various subjects.", categories: ["social", "methodical"] },
  { name: "Graphic Designers", education: "C, U", description: "Create visual concepts to communicate ideas that inspire and inform consumers.", categories: ["innovative", "objective"] },
  { name: "Nurses (Registered)", education: "U", description: "Provide and coordinate patient care, educate patients about health conditions.", categories: ["social", "methodical"] },
  { name: "Financial Analysts", education: "U", description: "Provide guidance to businesses and individuals making investment decisions.", categories: ["objective", "methodical"] },
  { name: "Marketing Managers", education: "U", description: "Plan and execute marketing strategies to promote products and services.", categories: ["directive", "innovative"] },
  { name: "Electricians", education: "H, C", description: "Install, maintain, and repair electrical systems in buildings and structures.", categories: ["objective", "methodical"] },
  { name: "Human Resources Specialists", education: "U", description: "Recruit, screen, interview, and place workers in organizations.", categories: ["social", "directive"] },
  { name: "Data Scientists", education: "U", description: "Collect, analyze, and interpret large amounts of data to help organizations make decisions.", categories: ["objective", "innovative"] },
  { name: "Event Planners", education: "C, U", description: "Organize and coordinate events such as meetings, conventions, and parties.", categories: ["directive", "social"] },
  { name: "Carpenters", education: "H, C", description: "Construct, install, and repair structures and fixtures made from wood and other materials.", categories: ["objective", "methodical"] },
  { name: "Psychologists", education: "U", description: "Study mental processes and human behavior by observing and recording interactions.", categories: ["social", "objective"] },
  { name: "Architects", education: "U", description: "Design buildings and other structures, considering both aesthetics and functionality.", categories: ["innovative", "objective"] },
  { name: "Sales Managers", education: "U", description: "Direct organizations' sales teams and set sales goals and strategies.", categories: ["directive", "social"] }
];

// Calculate category scores from quiz answers
function calculateCategoryScores() {
  const answers = JSON.parse(localStorage.getItem('careerQuizAnswers') || '{}');
  const categoryScores = {
    directive: 0,
    social: 0,
    methodical: 0,
    objective: 0,
    innovative: 0
  };
  
  const categoryCounts = {
    directive: 0,
    social: 0,
    methodical: 0,
    objective: 0,
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
  const matches = calculateOccupationMatches(categoryScores);
  
  occupationsBody.innerHTML = '';
  
  matches.forEach(occupation => {
    const row = document.createElement('tr');
    row.setAttribute('data-education', occupation.education);
    row.innerHTML = `
      <td class="match-percentage">${occupation.matchPercentage}%</td>
      <td class="occupation-name">${occupation.name}</td>
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
    } else if (firstCat === 'social') {
      insights.push(`Your <strong>Social</strong> orientation shows you excel at helping others. Look for careers in education, healthcare, counseling, or community services.`);
    } else if (firstCat === 'methodical') {
      insights.push(`Your <strong>Methodical</strong> approach means you thrive in structured environments. Consider careers in administration, quality control, or technical fields with clear procedures.`);
    } else if (firstCat === 'objective') {
      insights.push(`Your <strong>Objective</strong> mindset shows you're analytical and detail-oriented. Explore careers in science, technology, engineering, or research.`);
    } else if (firstCat === 'innovative') {
      insights.push(`Your <strong>Innovative</strong> nature means you enjoy creativity and experimentation. Consider careers in design, development, arts, or entrepreneurship.`);
    }
  }

  if (topCategories.length > 1) {
    const [secondCat] = topCategories[1];
    insights.push(`Your secondary strength in <strong>${personalityCategories[secondCat].name}</strong> work complements your primary interest, opening up diverse career paths that combine both elements.`);
  }

  insights.push(`The occupations listed above align with your personality profile. Higher match percentages indicate stronger alignment with your interests and work preferences.`);
  
  insights.push(`Education requirements vary by occupation. Some roles offer multiple entry paths (H=High School, C=College, U=University), giving you flexibility in your career journey.`);

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
function initResults() {
  // Check if quiz was completed
  if (!checkQuizCompletion()) {
    return;
  }

  // Render all sections
  const { scores, topCategories } = renderCategories();
  renderOccupations(scores);
  renderInsights(topCategories);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initResults);
