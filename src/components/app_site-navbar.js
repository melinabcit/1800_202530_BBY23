// Import specific functions from the Firebase Auth SDK
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "/src/firebaseConfig.js";
import { logoutUser } from "/src/authentication.js";

class SiteNavbar extends HTMLElement {
  constructor() {
    super();
    this.renderNavbar();
    this.renderAuthControls();
  }

  renderNavbar() {
    this.innerHTML = `
    <!-- Navbar: single source of truth -->
    <nav class="navbar">
      <div class="navbar-brand">
        <a href="index.html" class="brand-link">
          <img
            src="images/study.png"
            class="brand-logo"
            alt="Pathfinder logo"
          />
          <span class="brand-text">Pathfinder</span>
        </a>
      </div>
      <ul class="navbar-menu">
        <li><a href="index.html">Home</a></li>
        <li><a href="quiz.html">Quiz</a></li>
        <li><a href="results.html">Results</a></li>
        <li><a href="index.html#careers">Careers</a></li>
        <li><a href="index.html#how">FAQ</a></li>
        <li><a href="index.html#about">About</a></li>
      </ul>
      <div
        id="authControls"
        class="auth-controls"
      >
        <!-- populated by JS -->
      </div>
    </nav>
        `;
  }
  renderAuthControls() {
    const authControls = this.querySelector("#authControls");

    // Initialize with invisible placeholder to maintain layout space
    authControls.innerHTML = `<div class="btn btn-auth" style="visibility: hidden; min-width: 80px;">Log out</div>`;

    onAuthStateChanged(auth, (user) => {
      let updatedAuthControl;
      if (user) {
        updatedAuthControl = `<button class="btn btn-auth" id="signOutBtn" type="button">Log out</button>`;
        authControls.innerHTML = updatedAuthControl;
        const signOutBtn = authControls.querySelector("#signOutBtn");
        signOutBtn?.addEventListener("click", logoutUser);
      } else {
        updatedAuthControl = `<a class="btn btn-auth" id="loginBtn" href="/login.html">Log in</a>`;
        authControls.innerHTML = updatedAuthControl;
      }
    });
  }
}

customElements.define("site-navbar", SiteNavbar);
