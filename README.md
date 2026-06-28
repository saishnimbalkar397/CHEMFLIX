# ChemFlix - Chemistry Learning Platform

A comprehensive chemistry learning platform designed specifically for engineering students at PCCOE (Pimpri Chinchwad College of Engineering).

## 🧪 Features

- **User Authentication**: Firebase-powered registration and login with email verification
- **Interactive Quizzes**: Unit-wise chemistry quizzes with instant feedback
- **Flashcards**: Study cards for quick revision
- **Dark/Light Theme**: Toggle between themes for comfortable studying
- **Responsive Design**: Works on desktop and mobile devices
- **Progress Tracking**: Monitor your learning progress

## 🎯 Target Audience

- Engineering students studying chemistry
- PCCOE students preparing for internal and summative assessments
- Anyone interested in learning chemistry concepts





### Registration Page
- Clean, professional registration/login interface
- Email verification system
- Theme toggle support

### Homepage
- User dashboard with course navigation
- Unit-wise content organization
- User avatar and profile management

### Quiz System
- Interactive multiple-choice questions
- Instant feedback with explanations
- Professional UI with green/red color coding

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase Authentication & Firestore
- **Styling**: Custom CSS with dark/light theme support
- **Icons**: Emoji-based icons for better UX

## 📚 Course Content

### Unit 1: Water Technology
### Unit 2: Fuel And Combustion
### Unit 3: Corrosion and Corrosion Science
### Unit 4: Chemistry Of Polymers And Novel Carbon Compounds

## 🔧 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/chemflix.git
   cd chemflix
   ```

2. Set up Firebase:
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Update Firebase config in `config/firebase.js`

3. Run locally:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

4. Open `http://localhost:8000` in your browser

## 📁 Project Structure

```
chemflix/
├── index.html                 # Landing page
├── chemflix-registration.html # Registration/Login
├── app.js                     # Main application logic
├── styles.css                 # Main stylesheet
├── theme-fix.css             # Theme system
├── simple-theme.js           # Theme manager
├── config/
│   └── firebase.js           # Firebase configuration
├── Hompage/
│   ├── chemflix homepage.html
│   ├── chemflix quiz.html
│   ├── chemflix quiz.js
│   └── [other unit files]
└── Flashcards/
    └── [flashcard files]
```

## 🎨 Theme System

ChemFlix supports both dark and light themes:
- **Dark Mode**: Default theme with dark backgrounds
- **Light Mode**: Clean white theme for daytime study
- **Persistent**: Theme preference saved across sessions

## 🔐 Authentication Features

- Email/password registration
- Email verification required
- Secure Firebase authentication
- User profile management
- Session persistence

## 🧪 Quiz Features

- Multiple choice questions
- Instant feedback
- Color-coded answers (green for correct, red for incorrect)
- Explanations for each answer
- Progress tracking
- Unit-wise organization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 👨‍💻 Author

Saish Nimbalkar
- GitHub: [@saishnimbalkar397](https://github.com/saishnimbalkar397)
- Email:saishnim03@gmail.com

## 🙏 Acknowledgments

- PCCOE for the educational framework
- Firebase for backend services
- All contributors and testers




**Made with ❤️ for chemistry students**
