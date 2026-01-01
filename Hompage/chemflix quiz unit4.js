// Unit 4 Quiz - Analytical Chemistry
console.log('Unit 4 Quiz initialized');

// Quiz data for Unit 4
const quizData = [
    {
        question: "What is the principle behind spectrophotometry?",
        options: [
            "Absorption of light by molecules",
            "Emission of light by atoms",
            "Scattering of light by particles",
            "Reflection of light by surfaces"
        ],
        correct: 0,
        explanation: "Spectrophotometry measures the absorption of light by molecules at specific wavelengths."
    },
    {
        question: "Which technique is used to separate mixtures based on different boiling points?",
        options: ["Chromatography", "Distillation", "Crystallization", "Filtration"],
        correct: 1,
        explanation: "Distillation separates components based on their different boiling points."
    },
    {
        question: "What does HPLC stand for?",
        options: [
            "High Performance Liquid Chromatography",
            "High Pressure Liquid Chromatography",
            "High Precision Liquid Chromatography",
            "High Purity Liquid Chromatography"
        ],
        correct: 0,
        explanation: "HPLC stands for High Performance Liquid Chromatography, a powerful analytical technique."
    },
    {
        question: "In titration, what is the equivalence point?",
        options: [
            "When the indicator changes color",
            "When equal moles of acid and base react",
            "When the pH is 7",
            "When the reaction starts"
        ],
        correct: 1,
        explanation: "The equivalence point is when stoichiometrically equal amounts of reactants have been mixed."
    },
    {
        question: "What is the mobile phase in chromatography?",
        options: [
            "The stationary support material",
            "The sample being analyzed",
            "The solvent that moves through the system",
            "The detector used for analysis"
        ],
        correct: 2,
        explanation: "The mobile phase is the solvent that carries the sample through the chromatographic system."
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Check email verification first
function checkEmailVerification() {
    const auth = window.firebaseAuth;
    
    if (auth && auth.currentUser) {
        if (!auth.currentUser.emailVerified) {
            alert('Please verify your email before taking quizzes.');
            window.location.href = '../chemflix-registration.html';
            return false;
        }
    } else {
        alert('Please log in to take quizzes.');
        window.location.href = '../chemflix-registration.html';
        return false;
    }
    return true;
}

// Load current question
function loadQuestion() {
    const questionData = quizData[currentQuestion];
    
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('total-questions').textContent = quizData.length;
    document.getElementById('question-text').textContent = questionData.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });
    
    selectedAnswer = null;
    document.getElementById('next-btn').disabled = true;
}

// Select an option
function selectOption(index) {
    selectedAnswer = index;
    
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        option.classList.remove('selected');
        if (i === index) {
            option.classList.add('selected');
        }
    });
    
    document.getElementById('next-btn').disabled = false;
}

// Move to next question
function nextQuestion() {
    if (selectedAnswer === null) return;
    
    const questionData = quizData[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    // Show correct/incorrect answers
    options.forEach((option, index) => {
        if (index === questionData.correct) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && index !== questionData.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Check if answer is correct
    if (selectedAnswer === questionData.correct) {
        score++;
    }
    
    // Show explanation
    setTimeout(() => {
        alert(questionData.explanation);
        
        currentQuestion++;
        
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

// Show final results
function showResults() {
    document.querySelector('.quiz-content').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';
    
    document.getElementById('score').textContent = score;
    document.getElementById('total').textContent = quizData.length;
    
    const percentage = (score / quizData.length) * 100;
    let message = '';
    
    if (percentage >= 80) {
        message = '🎉 Outstanding! You have mastered analytical chemistry concepts.';
    } else if (percentage >= 60) {
        message = '👍 Well done! Review the analytical techniques you missed.';
    } else {
        message = '📚 Keep practicing! Study Unit 4 materials on analytical methods.';
    }
    
    document.getElementById('performance-message').textContent = message;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing Unit 4 quiz');
    
    // Check email verification first
    if (checkEmailVerification()) {
        loadQuestion();
    }
    
    // Initialize next button
    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
        nextBtn.onclick = nextQuestion;
    }
});

// Also initialize immediately if DOM is already loaded
if (document.readyState !== 'loading') {
    console.log('DOM already loaded, initializing immediately');
    
    if (checkEmailVerification()) {
        loadQuestion();
    }
    
    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
        nextBtn.onclick = nextQuestion;
    }
}