// Profile Page JavaScript
import { auth, db } from "/src/firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

// Check authentication and load profile
function initProfile() {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is logged in
      await loadUserInfo(user);
      await loadQuizHistory(user);
    } else {
      // User is not logged in
      showLoginRequired();
    }
  });
}

// Load user information
async function loadUserInfo(user) {
  const userInfoCard = document.getElementById('userInfoCard');
  
  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};
    
    userInfoCard.innerHTML = `
      <div class="user-info-item">
        <span class="user-info-label">👤 Name:</span>
        <span class="user-info-value">${userData.name || user.displayName || 'N/A'}</span>
      </div>
      <div class="user-info-item">
        <span class="user-info-label">✉️ Email:</span>
        <span class="user-info-value">${user.email}</span>
      </div>
      <div class="user-info-item">
        <span class="user-info-label">🏫 School:</span>
        <span class="user-info-value">${userData.school || 'N/A'}</span>
      </div>
      <div class="user-info-item">
        <span class="user-info-label">🌍 Country:</span>
        <span class="user-info-value">${userData.country || 'N/A'}</span>
      </div>
    `;
  } catch (error) {
    console.error("Error loading user info:", error);
    userInfoCard.innerHTML = `
      <div class="user-info-item">
        <span class="user-info-label">👤 Name:</span>
        <span class="user-info-value">${user.displayName || 'N/A'}</span>
      </div>
      <div class="user-info-item">
        <span class="user-info-label">✉️ Email:</span>
        <span class="user-info-value">${user.email}</span>
      </div>
    `;
  }
}

// Load quiz history (up to 3 most recent)
async function loadQuizHistory(user) {
  const historyGrid = document.getElementById('historyGrid');
  const noHistory = document.getElementById('noHistory');
  
  try {
    // Query the user's quiz results, ordered by timestamp, limit to 3
    const resultsRef = collection(db, "users", user.uid, "quizResults");
    const q = query(resultsRef, orderBy("timestamp", "desc"), limit(3));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // No quiz history
      historyGrid.style.display = 'none';
      noHistory.style.display = 'block';
      return;
    }
    
    // Display history
    historyGrid.style.display = 'grid';
    noHistory.style.display = 'none';
    historyGrid.innerHTML = '';
    
    querySnapshot.forEach((doc) => {
      const result = doc.data();
      const card = createHistoryCard(result, doc.id);
      historyGrid.appendChild(card);
    });
    
  } catch (error) {
    console.error("Error loading quiz history:", error);
    historyGrid.innerHTML = '<p style="color: #666;">Unable to load quiz history. Please try again later.</p>';
  }
}

// Create a history card
function createHistoryCard(result, resultId) {
  const card = document.createElement('div');
  card.className = 'history-card';
  
  // Format date
  const date = result.timestamp ? new Date(result.timestamp.toDate()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : 'Unknown date';
  
  // Get top categories
  const categories = result.topCategories || [];
  const categoriesHTML = categories.map(cat => {
    const categoryName = cat[0] || cat.category || 'Unknown';
    const score = cat[1] || cat.score || 0;
    return `<span class="category-badge">${categoryName} <span class="category-score">(${score}%)</span></span>`;
  }).join('');
  
  card.innerHTML = `
    <div class="history-date">📅 ${date}</div>
    <div class="history-categories">
      <div class="history-category-title">Top Categories:</div>
      <div>${categoriesHTML || '<span style="color: #999;">No data</span>'}</div>
    </div>
  `;
  
  // Add click handler to view full results
  card.addEventListener('click', () => {
    // Store the result ID and redirect to results page
    localStorage.setItem('viewResultId', resultId);
    localStorage.setItem('viewResultData', JSON.stringify(result));
    window.location.href = 'results.html';
  });
  
  return card;
}

// Show login required message
function showLoginRequired() {
  const container = document.querySelector('.profile-container');
  container.innerHTML = `
    <div class="login-required">
      <h2>Login Required</h2>
      <p>You need to be logged in to view your profile and quiz history.</p>
      <div class="action-buttons">
        <a href="login.html" class="btn btn-primary">Log In</a>
        <a href="index.html" class="btn btn-secondary">Back to Home</a>
      </div>
    </div>
  `;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initProfile);
