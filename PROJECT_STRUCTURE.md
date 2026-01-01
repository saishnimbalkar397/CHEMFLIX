# ChemFlix Project Structure

```
ChemFlix/
├── 📄 Main Files
│   ├── chemflix-registration.html    # Main registration/login page
│   ├── index.html                    # Landing page
│   ├── app.js                        # Main application logic
│   ├── styles.css                    # Main stylesheet
│   ├── theme-fix.css                 # Theme system
│   ├── simple-theme.js               # Theme manager
│   ├── README.md                     # Project documentation
│   ├── LICENSE                       # MIT license
│   └── .gitignore                    # Git ignore rules
│
├── 🎨 Assets
│   └── assets/
│       └── ChemflixHompage.png       # Homepage image
│       └── chemflix-logo.png         # Logo image (add your logo here)
│
├── ⚙️ Configuration
│   └── config/
│       └── firebase.js               # Firebase configuration
│
├── 🏠 Homepage & Learning Content
│   └── Hompage/
│       ├── chemflix homepage.html    # Main dashboard
│       ├── chemflix homepage.css     # Homepage styles
│       ├── chemflix homepage.js      # Homepage logic
│       ├── chemflix quiz.html        # Main quiz system
│       ├── chemflix quiz.css         # Quiz styles
│       ├── chemflix quiz.js          # Quiz logic
│       ├── chemflix unit1.html       # Unit 1 content
│       ├── chemflix unit1.css        # Unit 1 styles
│       ├── chemflix unit1.js         # Unit 1 logic
│       ├── chemflix unit2.html       # Unit 2 content
│       ├── chemflix unit2.css        # Unit 2 styles
│       ├── chemflix unit3.html       # Unit 3 content
│       ├── chemflix unit3.css        # Unit 3 styles
│       ├── chemflix unit3.js         # Unit 3 logic
│       ├── chemflix unit4.html       # Unit 4 content
│       ├── chemflix unit4.css        # Unit 4 styles
│       ├── chemflix quiz unit2.html  # Unit 2 quiz
│       ├── chemflix quiz unit2.css   # Unit 2 quiz styles
│       ├── chemflix quiz unit2.js    # Unit 2 quiz logic
│       ├── chemflix quiz unit3.html  # Unit 3 quiz
│       ├── chemflix quiz unit3.css   # Unit 3 quiz styles
│       ├── chemflix quiz unit3.js    # Unit 3 quiz logic
│       └── theme-manager.js          # Legacy theme manager
│
└── 📚 Flashcards
    └── Flashcards/
        └── chemflix flashcards.html  # Study flashcards
```

## 🎯 Main Entry Points

1. **Start Here**: `chemflix-registration.html` - User registration and login
2. **Homepage**: `Hompage/chemflix homepage.html` - Main dashboard after login
3. **Learning**: Navigate through Unit 1-4 for course content
4. **Quizzes**: Take unit-specific quizzes for assessment
5. **Flashcards**: Quick study materials for revision

## 🚀 Features

- ✅ Firebase Authentication with Email Verification
- ✅ Dark/Light Theme Toggle
- ✅ Interactive Quizzes with Feedback
- ✅ Unit-wise Chemistry Content
- ✅ Responsive Design
- ✅ Professional UI/UX
- ✅ Logo Integration
- ✅ Progress Tracking

## 🔧 Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase (Authentication + Firestore)
- **Styling**: Custom CSS with Theme System
- **Icons**: Emoji-based for better compatibility