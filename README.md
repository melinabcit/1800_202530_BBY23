# PathFinder

## Overview

PathFinder is a client-side JavaScript web application that helps students discover and explore career paths through personalized career assessments. The app provides a comprehensive career quiz that identifies user personality types and matches them with suitable occupations based on their interests, skills, and work preferences. Users can take quizzes, view detailed results with BCIT program recommendations, track career development habits, and manage their profile with quiz history.

Developed for the COMP 1800 course, this project applies User-Centred Design practices and agile project management, and demonstrates integration with Firebase backend services for user authentication and data storage.

---

## Features

- Take a comprehensive 50-question career assessment quiz
- Receive personalized results based on five personality categories (Directive, Social, Methodical, Objective, Innovative)
- View matching occupations filtered by education level requirements
- Get BCIT program recommendations tailored to matching careers
- Track weekly career development habits with a habit tracker
- Save and view quiz result history in user profile
- User authentication with Firebase
- Responsive design for desktop and mobile

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Backend**: Firebase Authentication and Firestore
- **Database**: Firestore
- **UI Framework**: Bootstrap 5

---

## Usage

1. Open your browser and visit `http://localhost:3000` (or run with `npm run dev`).
2. Create an account or log in to access the application.
3. Navigate to the Quiz page to take the 50-question career assessment.
4. Answer all questions honestly based on your interests and work preferences.
5. Submit the quiz to view your personalized results, including:
   - Your personality category breakdown
   - Matching occupations with education requirements
   - BCIT program recommendations
   - Career insights and next steps
6. Visit the Habit Tracker page to track weekly career development habits.
7. Check your Profile page to view your quiz history and account information.

---

## Project Structure

```
1800_202530_BBY23/
├── src/
│   ├── components/          # Web components (navbar, footer)
│   ├── styles/              # CSS stylesheets
│   ├── quiz.js              # Quiz functionality
│   ├── results.js           # Results page logic
│   ├── profile.js           # Profile page logic
│   ├── habit-tracker.js     # Habit tracker functionality
│   ├── authentication.js    # User authentication
│   ├── firebase.js          # Firebase integration
│   └── firebaseConfig.js    # Firebase configuration
├── images/                  # Image assets
├── index.html               # Landing page
├── quiz.html                # Career quiz page
├── results.html             # Quiz results page
├── profile.html             # User profile page
├── habit-tracker.html       # Habit tracker page
├── login.html               # Login page
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

---

## Contributors

- **Hazen1Yang** - (Hazen) BCIT CST Student
- **Gamecoder3D** - (Matthew V.) BCIT CST Student who loves videogames. Fun fact: my favorite color is orange.
- **Vincent** - BCIT CST Student with a passion for outdoor adventures and user-friendly applications. Fun fact: Loves solving Rubik's Cubes in under a minute.
- **Melina Bazrafkan** - BCIT CST Student with a passion for outdoor adventures and user-friendly applications. Fun fact: Loves solving Rubik's Cubes in under a minute.

---

## Acknowledgments

- Career quiz questions and personality categories adapted from established career assessment frameworks.
- Code snippets were adapted from resources such as [Stack Overflow](https://stackoverflow.com/) and [MDN Web Docs](https://developer.mozilla.org/).
- Icons sourced from [FontAwesome](https://fontawesome.com/) and emoji icons.
- BCIT program information sourced from [BCIT official website](https://www.bcit.ca/).

---

## Limitations and Future Work

### Limitations

- Limited to five personality categories; more detailed assessments could provide deeper insights.
- Career matching is based on self-reported interests and does not include skills testing.
- BCIT program recommendations are manually curated and may not cover all available programs.
- Accessibility features can be further improved.

### Future Work

- Integrate with job market APIs to show real-time career demand and salary data.
- Add more detailed career information including required skills and typical career paths.
- Implement social features allowing users to connect with professionals in their fields of interest.
- Expand program recommendations to include other educational institutions beyond BCIT.
- Add video testimonials from professionals in various career fields.
- Create a dark mode for better usability in low-light conditions.
- Implement advanced analytics to track user progress over time.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
