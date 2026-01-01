console.log('ChemFlix Quiz script loaded');

// Check if user is authenticated and email is verified
function checkEmailVerification() {
    // Check if Firebase is loaded
    if (typeof firebase === 'undefined') {
        console.log('Firebase not loaded yet, retrying...');
        setTimeout(checkEmailVerification, 1000);
        return;
    }
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('User is signed in:', user.uid);
            console.log('Email verified:', user.emailVerified);
            
            if (!user.emailVerified) {
                // Redirect to registration page with message
                alert('Please verify your email before accessing ChemFlix content. Check your inbox for the verification link.');
                window.location.href = '../chemflix-registration.html';
                return;
            }
            
            console.log('User verified, quiz access granted');
            
        } else {
            // Check for test user in localStorage
            const testUser = localStorage.getItem('chemflix_user');
            if (testUser) {
                try {
                    const userData = JSON.parse(testUser);
                    if (userData.emailVerified) {
                        console.log('Test user found, allowing quiz access');
                        return;
                    }
                } catch (error) {
                    console.error('Error parsing test user data:', error);
                }
            }
            
            console.log('No user signed in, redirecting to registration...');
            window.location.href = '../chemflix-registration.html';
        }
    });
}

const questions = [
    {
        "question": "What is the fundamental chemical cause of water hardness?",
        "options": ["High concentration of sodium and potassium salts", "High concentration of dissolved gases like CO2 and O2", "High concentration of divalent metallic cations like Ca2+ and Mg2+", "Presence of organic pollutants"],
        "correct": 2
    },
    {
        "question": "Which of the following classes of compounds is the primary cause of temporary (carbonate) hardness in water?",
        "options": ["Calcium and magnesium chlorides", "Calcium and magnesium sulfates", "Calcium and magnesium bicarbonates", "Sodium and potassium nitrates"],
        "correct": 2
    },
    {
        "question": "The primary difference between temporary and permanent hardness is that temporary hardness can be removed by:",
        "options": ["Filtration through activated charcoal", "Simple boiling of the water", "Addition of strong acid", "Ion-exchange (Zeolite) process"],
        "correct": 1
    },
    {
        "question": "The standard unit in which the hardness of water is most commonly expressed globally is:",
        "options": ["grams per litre (g/L)", "moles per litre (mol/L)", "parts per million (ppm) of CaCO3 equivalent", "pH unit"],
        "correct": 2
    },
    {
        "question": "In the calculation of water hardness, the conversion factor for an ion 'X' to its CaCO3 equivalent is the ratio of:",
        "options": ["Molar mass of CaCO3 to Molar mass of X", "Equivalent weight of X to Equivalent weight of CaCO3", "Equivalent weight of CaCO3 to Equivalent weight of X", "Valence of X to Valence of CaCO3"],
        "correct": 2
    },
    {
        "question": "A water sample contains 20 mg/L of Ca2+. What is the hardness contributed by Ca2+ in mg/L of CaCO3 equivalent? (Atomic weights: Ca = 40, C = 12, O = 16)",
        "options": ["20 mg/L", "40 mg/L", "50 mg/L", "100 mg/L"],
        "correct": 2
    },
    {
        "question": "If a water sample contains 95 mg/L of MgCl2, what is its hardness in terms of CaCO3 equivalent? (Molecular weight of MgCl2 = 95)",
        "options": ["47.5 ppm", "95 ppm", "100 ppm", "200 ppm"],
        "correct": 2
    },
    {
        "question": "Which indicator is most commonly used in the EDTA complexometric titration for determining water hardness?",
        "options": ["Phenolphthalein", "Methyl Orange", "Eriochrome Black T (EBT)", "Starch solution"],
        "correct": 2
    },
    {
        "question": "In the EDTA titration method, the pH of the water sample is maintained at approximately 10 using:",
        "options": ["HCl solution", "NaOH solution", "Ammonia-Ammonium chloride buffer", "Acetic acid solution"],
        "correct": 2
    },
    {
        "question": "The color change observed at the end point of an EDTA titration using EBT indicator is:",
        "options": ["Colorless to Pink", "Wine red to Steel blue", "Blue to Colorless", "Yellow to Red"],
        "correct": 1
    },
    {
        "question": "EDTA (Ethylenediaminetetraacetic acid) is a hexadentate ligand. In water analysis, it forms stable complexes with:",
        "options": ["Monovalent cations like Na+", "Divalent cations like Ca2+ and Mg2+", "Anions like Cl- and SO42-", "Dissolved organic matter"],
        "correct": 1
    },
    {
        "question": "The principle of the Zeolite process for water softening involves:",
        "options": ["Physical filtration of suspended solids", "Chemical precipitation of salts", "Ion exchange where Ca2+/Mg2+ are replaced by Na+", "Neutralization of acidity"],
        "correct": 2
    },
    {
        "question": "When a zeolite bed becomes exhausted and loses its softening capacity, it can be regenerated by passing a solution of:",
        "options": ["Dilute Sulphuric acid", "Brine (Sodium chloride solution)", "Calcium hydroxide", "Potassium permanganate"],
        "correct": 1
    },
    {
        "question": "A major disadvantage of the Zeolite process compared to the Ion-exchange (Resin) process is that it:",
        "options": ["Is very expensive", "Cannot remove acidity/alkalinity and does not exchange anions", "Requires high temperature", "Produces very acidic water"],
        "correct": 1
    },
    {
        "question": "The Ion-exchange (Demineralization) process uses cation and anion exchange resins to produce water that is effectively:",
        "options": ["Sterilized and bacteria-free", "De-ionized or distilled quality water", "Harder than the original sample", "Highly carbonated"],
        "correct": 1
    }
];

let quizQuestions = [];
let questionIndex = 0;
let score = 0;

function startQuiz() {
    console.log('Starting ChemFlix quiz');
    let num = Number(document.getElementById("num-questions").value);
    let error = document.getElementById("error");

    if (num < 1 || num > 20) {
        error.textContent = "Enter a number between 1 and 10";
        return;
    }

    error.textContent = "";
    quizQuestions = questions.sort(() => Math.random() - 0.5).slice(0, num);
    questionIndex = 0;
    score = 0;

    document.getElementById("setup").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    showQuestion();
}

function showQuestion() {
    console.log('Showing question', questionIndex + 1);
    let q = quizQuestions[questionIndex];
    document.getElementById("progress").textContent = `Question ${questionIndex + 1} of ${quizQuestions.length}`;
    document.getElementById("question").textContent = q.question;
    document.getElementById("feedback").style.display = "none";
    document.getElementById("next-btn").style.display = "none";

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((option, i) => {
        let btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(i, btn);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected, button) {
    console.log('Answer selected:', selected);
    let correct = quizQuestions[questionIndex].correct;
    let feedback = document.getElementById("feedback");
    let buttons = document.querySelectorAll("#options button");

    buttons.forEach(b => b.disabled = true);

    setTimeout(() => {
        if (selected === correct) {
            button.classList.add("correct");
            feedback.innerHTML = `
                <div class="feedback-text">
                    <strong>Excellent!</strong> You got it right!
                </div>
                <div class="explanation">
                    <strong>Explanation:</strong> ${quizQuestions[questionIndex].options[correct]} is the correct answer because it represents the most accurate scientific principle for this question.
                </div>
            `;
            feedback.className = "feedback correct";
            score++;
        } else {
            button.classList.add("wrong");
            buttons[correct].classList.add("correct");
            feedback.innerHTML = `
                <div class="feedback-text">
                    <strong>Not quite right.</strong> The correct answer is: <strong>${quizQuestions[questionIndex].options[correct]}</strong>
                </div>
                <div class="explanation">
                    <strong>Explanation:</strong> ${quizQuestions[questionIndex].options[correct]} is the correct answer because it represents the most accurate scientific principle for this question.
                </div>
            `;
            feedback.className = "feedback wrong";
        }

        feedback.style.display = "block";

        if (questionIndex < quizQuestions.length - 1) {
            document.getElementById("next-btn").style.display = "block";
        } else {
            setTimeout(showResult, 3000);
        }
    }, 200);
}

function nextQuestion() {
    console.log('Moving to next question');
    questionIndex++;
    showQuestion();
}

function showResult() {
    console.log('Showing final results');
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    let percentage = Math.round((score / quizQuestions.length) * 100);

    let resultMessage = "";
    let resultClass = "";
    
    if (percentage >= 90) {
        resultMessage = "🎉 Outstanding! You're a chemistry expert!";
        resultClass = "excellent";
    } else if (percentage >= 80) {
        resultMessage = "🌟 Great job! You have a solid understanding!";
        resultClass = "good";
    } else if (percentage >= 70) {
        resultMessage = "👍 Good work! Keep studying to improve!";
        resultClass = "average";
    } else if (percentage >= 60) {
        resultMessage = "📚 Not bad! Review the topics and try again!";
        resultClass = "below-average";
    } else {
        resultMessage = "💪 Keep practicing! Chemistry takes time to master!";
        resultClass = "needs-improvement";
    }

    document.getElementById("final-score").innerHTML = `
        <div class="score-display ${resultClass}">
            <div class="score-number">${score}/${quizQuestions.length}</div>
            <div class="score-percentage">${percentage}%</div>
        </div>
        <div class="result-message">${resultMessage}</div>
    `;
}

function restartQuiz() {
    console.log('Restarting quiz');
    document.getElementById("result").style.display = "none";
    document.getElementById("setup").style.display = "block";
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing ChemFlix quiz');
    
    // Check email verification first
    checkEmailVerification();

    // Initialize next button
    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
        nextBtn.onclick = nextQuestion;
    }
});

// Also initialize immediately if DOM is already loaded
if (document.readyState !== 'loading') {
    console.log('DOM already loaded, initializing immediately');
    
    // Check email verification first
    checkEmailVerification();

    // Initialize next button
    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
        nextBtn.onclick = nextQuestion;
    }
}

