// Habit Tracker JavaScript

// Define the weekly habits
const weeklyHabits = [
  {
    id: 'skill-practice',
    text: 'Practice a job-related skill for 15 minutes',
    icon: '📚'
  },
  {
    id: 'job-apply',
    text: 'Apply to one job or program',
    icon: '📝'
  },
  {
    id: 'resume-update',
    text: 'Update resume or portfolio',
    icon: '📄'
  },
  {
    id: 'learning-video',
    text: 'Watch one learning video related to your field',
    icon: '🎥'
  },
  {
    id: 'networking',
    text: 'Reach out to one professional or classmate',
    icon: '🤝'
  },
  {
    id: 'article-reading',
    text: 'Read a short article related to your career',
    icon: '📰'
  },
  {
    id: 'daily-reflection',
    text: 'Reflect on what you learned today',
    icon: '💭'
  }
];

// Load saved habits from localStorage
function loadHabits() {
  const saved = localStorage.getItem('weeklyHabits');
  return saved ? JSON.parse(saved) : {};
}

// Save habits to localStorage
function saveHabits(habits) {
  localStorage.setItem('weeklyHabits', JSON.stringify(habits));
}

// Calculate progress
function calculateProgress(habits) {
  const total = weeklyHabits.length;
  const completed = Object.values(habits).filter(Boolean).length;
  const percentage = Math.round((completed / total) * 100);
  
  return { total, completed, percentage };
}

// Update progress display
function updateProgress() {
  const habits = loadHabits();
  const { total, completed, percentage } = calculateProgress(habits);
  
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  
  if (progressBar && progressText) {
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${completed} of ${total} habits completed (${percentage}%)`;
    
    // Update progress bar color based on completion
    if (percentage === 100) {
      progressBar.style.background = 'linear-gradient(90deg, #27ae60, #2ecc71)';
    } else if (percentage >= 50) {
      progressBar.style.background = 'linear-gradient(90deg, #667eea, #764ba2)';
    } else {
      progressBar.style.background = 'linear-gradient(90deg, #f39c12, #f1c40f)';
    }
  }
  
  updateMotivationMessage(percentage);
}

// Update motivation message based on progress
function updateMotivationMessage(percentage) {
  const motivationMessage = document.getElementById('motivationMessage');
  
  if (!motivationMessage) return;
  
  if (percentage === 100) {
    motivationMessage.textContent = '🎉 Congratulations! You completed all your weekly habits. You\'re building amazing career momentum!';
  } else if (percentage >= 75) {
    motivationMessage.textContent = '🌟 Amazing progress! You\'re almost there. Keep up the excellent work!';
  } else if (percentage >= 50) {
    motivationMessage.textContent = '💪 You\'re doing great! You\'re halfway through your weekly goals. Keep going!';
  } else if (percentage > 0) {
    motivationMessage.textContent = '🚀 Good start! Every step counts. Continue building these valuable habits!';
  } else {
    motivationMessage.textContent = '📌 Small steps lead to big achievements. Every habit you complete brings you closer to your career goals!';
  }
}

// Toggle habit completion
function toggleHabit(habitId) {
  const habits = loadHabits();
  habits[habitId] = !habits[habitId];
  saveHabits(habits);
  updateProgress();
}

// Render habits list
function renderHabits() {
  const habitsList = document.getElementById('habitsList');
  const savedHabits = loadHabits();
  
  if (!habitsList) return;
  
  habitsList.innerHTML = '';
  
  weeklyHabits.forEach(habit => {
    const habitItem = document.createElement('div');
    habitItem.className = 'habit-item';
    
    const isCompleted = savedHabits[habit.id] || false;
    
    habitItem.innerHTML = `
      <label class="habit-label ${isCompleted ? 'completed' : ''}">
        <input 
          type="checkbox" 
          id="${habit.id}" 
          ${isCompleted ? 'checked' : ''}
          class="habit-checkbox"
        />
        <span class="habit-icon">${habit.icon}</span>
        <span class="habit-text">${habit.text}</span>
        <span class="checkmark">✓</span>
      </label>
    `;
    
    // Add event listener to the checkbox
    const checkbox = habitItem.querySelector('.habit-checkbox');
    checkbox.addEventListener('change', () => {
      toggleHabit(habit.id);
      const label = habitItem.querySelector('.habit-label');
      label.classList.toggle('completed');
    });
    
    habitsList.appendChild(habitItem);
  });
}

// Reset all habits
function resetHabits() {
  if (confirm('Are you sure you want to reset all habits for this week? This action cannot be undone.')) {
    localStorage.removeItem('weeklyHabits');
    renderHabits();
    updateProgress();
  }
}

// Initialize the habit tracker
function initHabitTracker() {
  renderHabits();
  updateProgress();
  
  // Setup reset button
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetHabits);
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initHabitTracker);
