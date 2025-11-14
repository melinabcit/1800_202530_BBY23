# PathFinder

## Overview

PathFinder is a client-side JavaScript web application that helps students discover and explore career paths through personalized career assessments. The app provides a comprehensive career quiz that identifies user personality types and matches them with suitable occupations based on their interests, skills, and work preferences. Users can take quizzes, view detailed results with BCIT program recommendations, track career development habits, and manage their profile with quiz history.

Developed for the COMP 1800 course, this project applies User-Centred Design practices and agile project management, and demonstrates integration with Firebase backend services for user authentication and data storage.

---

## Features

- Take a comprehensive 8-question career assessment quiz
- Receive personalized results based on five personality categories (Directive, Methodical, Innovative, Supportive, Expressive)
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

1. Open your browser and visit `http://localhost:5173` (or run with `npm run dev`).
2. Create an account or log in to access the application.
3. Navigate to the Quiz page to take the 8-question career assessment.
4. Answer all questions honestly based on your interests and work preferences.
5. Submit the quiz to view your personalized results, including:
   - Your personality category breakdown
   - Matching occupations with education requirements
   - BCIT program recommendations
   - Career insights and next steps
6. Visit the Habit Tracker page to track weekly career development habits.
7. Check your Profile page to view your quiz history and account information.

---

## Personality Categories

The quiz assesses five distinct personality categories that reflect different work preferences and interests:

### 🧭 Directive
Directive people enjoy taking charge, organizing tasks, and leading others. They like clear goals, planning, and keeping everything on track. They prefer to make decisions quickly and take responsibility for outcomes.

### 📋 Methodical
Methodical people like structure, step-by-step processes, and predictable environments. They prefer working with rules, instructions, and well-defined tasks. They enjoy finishing one thing before starting another and value accuracy and consistency.

### 💡 Innovative
Innovative people enjoy exploring new ideas, solving problems creatively, and experimenting. They prefer work that involves imagination, analysis, or technology. They adapt to change easily and enjoy challenges that require original thinking.

### 🤝 Supportive
Supportive people enjoy helping others, working in teams, and making people feel welcome. They are patient, understanding, and enjoy roles involving teaching, caring, or customer service.

### 🎨 Expressive
Expressive people enjoy communication, creativity, and presenting ideas. They do well in roles involving writing, speaking, design, or arts. They enjoy inspiring others and thinking outside the box.

---

## Sample Career Matches

Based on quiz results, users receive personalized occupation recommendations. Here are some example careers included in the system:

| Match | Occupation | Education | Description | JobBank Link |
|-------|-----------|-----------|-------------|--------------|
| 99% | Acting Teacher | N/C/U | Teaches acting skills to students in schools or studios | [View Jobs](https://www.jobbank.gc.ca/browsejobs?q=Acting+teacher) |
| 98% | Chef | H | Prepares meals, plans menus, and runs kitchen operations | [View Jobs](https://www.jobbank.gc.ca/browsejobs?q=Chef) |
| 96% | Graphic Designer | C | Creates visual designs for brands, websites, and media | [View Jobs](https://www.jobbank.gc.ca/browsejobs?q=Graphic+Designer) |
| 95% | Web Developer | C | Builds websites and web applications using code + design | [View Jobs](https://www.jobbank.gc.ca/browsejobs?q=Web+Developer) |
| 94% | Early Childhood Educator Assistant | C | Supports children in learning, play, and daily routines | [View Jobs](https://www.jobbank.gc.ca/browsejobs?q=Early+Childhood+Educator) |
| 93% | Marketing Coordinator | C/U | Helps plan campaigns, social media, and promotional materials | [View Jobs](https://www.jobbank.gc.ca/browsejobs?q=Marketing) |
| 91% | Administrative Assistant | H/C | Organizes office tasks, schedules, and communication | [View Jobs](https://www.jobbank.gc.ca/browsejobs?q=Administrative+Assistant) |
| 90% | IT Support Technician | C | Helps customers fix hardware and software problems | [View Jobs](https://www.jobbank.gc.ca/browsejobs?q=IT+support) |
| 89% | Sales Associate | N/H | Helps customers, explains products, and supports purchases | [View Jobs](https://www.jobbank.gc.ca/browsejobs?q=Sales) |
| 88% | Community Service Worker | C | Supports individuals and families through local programs | [View Jobs](https://www.jobbank.gc.ca/browsejobs?q=Community+Service+Worker) |

**Education Levels:** N = No formal education required, H = High school, C = College, U = University

*Note: The system includes 30+ occupations across various fields including technology, business, healthcare, trades, and creative industries.*

---

## BCIT Program Recommendations

The application provides tailored BCIT program recommendations based on matching career results:

### 💻 Computing & Web Development
- [Computer Systems Technology (CST) - Diploma](https://www.bcit.ca/programs/computer-systems-technology-diploma-full-time-5500dipma/)
- [New Media Design & Web Development - Diploma](https://www.bcit.ca/programs/new-media-design-and-web-development-diploma-full-time-6525dipma/)
- [Front-End Web Developer Programs](https://www.bcit.ca/study/computing-it/programs/)
- [User Experience (UX) Design - Certificate](https://www.bcit.ca/programs/user-experience-design-associate-certificate/)

### 💼 Business, Marketing & Administration
- [Marketing Management - Diploma](https://www.bcit.ca/programs/marketing-management-diploma-full-time-6422dipma/)
- [Business Administration - Diploma](https://www.bcit.ca/programs/business-administration-diploma-full-time-630adm/)
- [Office Administrator with Technology (OAT) - Certificate](https://www.bcit.ca/programs/office-administrator-with-technology-program-oat-certificate-full-time-6998cert/)
- [Global Supply Chain Management - Diploma](https://www.bcit.ca/programs/global-supply-chain-management-diploma-full-time-7475dipma/)

### 🎨 Design & Creative Arts
- [Digital Arts, Media & Design - Bachelor](https://www.bcit.ca/programs/bachelor-of-digital-arts-media-and-design-full-time-8200bbed/)
- [Graphic Design - Associate Certificate](https://www.bcit.ca/programs/graphic-design-associate-certificate-part-time-695acert/)
- [Broadcast & Online Journalism - Diploma](https://www.bcit.ca/programs/broadcast-and-online-journalism-diploma-full-time-6405dipma/)

### 🧑‍🏫 Education & Community Support
- [Early Childhood Education (ECE) Assistant - Certificate](https://www.bcit.ca/programs/early-childhood-education-assistant-certificate/)
- [Social Services Worker - Certificate](https://www.bcit.ca/programs/social-services-worker-certificate/)
- [Nonprofit Management - Associate Certificate](https://www.bcit.ca/programs/nonprofit-management-associate-certificate-part-time-6310acert/)

### 🖥️ IT & Technical Support
- [IT Services Professional Program](https://www.bcit.ca/programs/it-services-professional-program/)
- [Network Administration & Security](https://www.bcit.ca/study/computing-it/programs/)
- [Computer Information Technology (CIT) - Diploma](https://www.bcit.ca/programs/computer-information-technology-diploma-full-time-5510dipma/)

### 🍳 Culinary Arts
- [Culinary Arts - Diploma](https://www.bcit.ca/programs/culinary-arts-diploma-full-time-660adipma/)
- [Professional Cook Training](https://www.bcit.ca/programs/professional-cook-training/)
- [Baking & Pastry Arts](https://www.bcit.ca/programs/baking-and-pastry-arts-660bbcert/)

### ✈️ Aviation & Operations
- [Aviation Management and Operations - Diploma](https://www.bcit.ca/programs/aviation-management-and-operations-diploma-full-time-1175dipma/)
- [Airport Operations - Associate Certificate](https://www.bcit.ca/programs/airport-operations-associate-certificate-part-time-1070acert/)

For more BCIT programs, visit: [https://www.bcit.ca/study/](https://www.bcit.ca/study/)

---

## Habit Tracker

The application includes a weekly habit tracker to support career development:

**Weekly Habits for Career Growth:**
1. Practice a job-related skill for 15 minutes
2. Apply to one job or program
3. Update resume or portfolio
4. Watch one learning video related to your field
5. Reach out to one professional or classmate
6. Read a short article related to your career
7. Reflect on what you learned today

**Features:**
- Interactive checkboxes for daily tracking
- Progress saved with localStorage
- Weekly reset functionality
- Clean, modern, mobile-friendly design

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
