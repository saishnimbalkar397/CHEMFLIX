const questions = [
    {
        question: "Corrosion is defined as:",
        options: [
            "Formation of alloys",
            "Destruction of metal by chemical or electrochemical reaction",
            "Mechanical wear of metals",
            "Purification of metal"
        ],
        correct: 1
    },
    {
        question: "The natural tendency of a pure metal to revert back to its ore is due to:",
        options: [
            "Reduction",
            "Stability of pure metal",
            "Higher energy state of metal",
            "Mechanical stress"
        ],
        correct: 2
    },
    {
        question: "Which of the following is NOT a consequence of corrosion?",
        options: [
            "Loss of efficiency",
            "Increased life of equipment",
            "Plant shutdown",
            "Accidents and hazards"
        ],
        correct: 1
    },
    {
        question: "Based on environment, corrosion is classified into:",
        options: [
            "Uniform and non-uniform",
            "Dry and wet",
            "Chemical and mechanical",
            "Metallic and non-metallic"
        ],
        correct: 1
    },
    {
        question: "Dry corrosion occurs due to reaction between metal and:",
        options: [
            "Electrolyte",
            "Atmospheric gases",
            "Water only",
            "Acids"
        ],
        correct: 1
    },
    {
        question: "Electrochemical corrosion requires:",
        options: [
            "High temperature",
            "Vacuum",
            "Electrolyte",
            "Absence of oxygen"
        ],
        correct: 2
    },
    {
        question: "Oxidative corrosion occurs due to:",
        options: [
            "Hydrogen",
            "Oxygen",
            "Nitrogen",
            "Carbon dioxide"
        ],
        correct: 1
    },
    {
        question: "Which metal is rapidly attacked by oxygen at low temperature?",
        options: ["Iron", "Copper", "Sodium", "Silver"],
        correct: 2
    },
    {
        question: "Which metals are NOT oxidized at high temperature?",
        options: [
            "Fe, Cu",
            "Ag, Au, Pt",
            "Zn, Al",
            "Mg, Ca"
        ],
        correct: 1
    },
    {
        question: "According to Pilling–Bedworth rule, corrosion depends on:",
        options: [
            "Electrode potential",
            "Volume ratio of oxide to metal",
            "Atomic weight",
            "Density of metal"
        ],
        correct: 1
    },
    {
        question: "Porous oxide films are formed by metals like:",
        options: [
            "Al, Cr",
            "Fe, Cu",
            "Li, Na, Mg",
            "Ag, Au"
        ],
        correct: 2
    },
    {
        question: "Which oxide film is unstable?",
        options: [
            "Fe2O3",
            "Al2O3",
            "Ag2O",
            "Cr2O3"
        ],
        correct: 2
    },
    {
        question: "Volatile oxide films are formed by:",
        options: ["Iron", "Copper", "Molybdenum", "Aluminium"],
        correct: 2
    },
    {
        question: "Which gas forms a protective film on silver?",
        options: ["SO2", "CO2", "Cl2", "H2S"],
        correct: 2
    },
    {
        question: "Hydrogen embrittlement occurs at:",
        options: [
            "High temperature",
            "Low temperature",
            "Very high pressure",
            "Vacuum"
        ],
        correct: 1
    },
    {
        question: "Hydrogen attack generally occurs at:",
        options: [
            "Low temperature",
            "Room temperature",
            "High temperature",
            "Freezing conditions"
        ],
        correct: 2
    },
    {
        question: "Wet corrosion involves:",
        options: [
            "Only oxidation",
            "Electrochemical reactions",
            "Mechanical erosion",
            "Thermal degradation"
        ],
        correct: 1
    },
    {
        question: "In electrochemical corrosion, oxidation occurs at:",
        options: ["Cathode", "Anode", "Electrolyte", "Metal surface"],
        correct: 1
    },
    {
        question: "Reduction occurs at:",
        options: ["Anode", "Cathode", "Metal surface", "Electrolyte"],
        correct: 1
    },
    {
        question: "Hydrogen evolution mechanism occurs in:",
        options: [
            "Neutral medium with oxygen",
            "Alkaline medium",
            "Acidic medium without oxygen",
            "Dry atmosphere"
        ],
        correct: 2
    },
    {
        question: "Oxygen absorption mechanism occurs in:",
        options: [
            "Acidic medium without oxygen",
            "Neutral or alkaline medium with oxygen",
            "Dry atmosphere",
            "Vacuum"
        ],
        correct: 1
    },
    {
        question: "In hydrogen evolution mechanism, cathodic area is:",
        options: [
            "Larger than anode",
            "Equal to anode",
            "Smaller than anode",
            "Absent"
        ],
        correct: 2
    },
    {
        question: "In oxygen absorption mechanism, cathodic area is:",
        options: [
            "Smaller",
            "Equal",
            "Larger",
            "Inactive"
        ],
        correct: 2
    },
    {
        question: "Galvanic corrosion occurs when:",
        options: [
            "Same metals are joined",
            "Two dissimilar metals are connected in electrolyte",
            "Metal is heated",
            "Metal is stressed"
        ],
        correct: 1
    },
    {
        question: "In galvanic corrosion, which metal corrodes?",
        options: [
            "More noble metal",
            "Cathodic metal",
            "More anodic metal",
            "Less active metal"
        ],
        correct: 2
    },
    {
        question: "Pitting corrosion is characterized by:",
        options: [
            "Uniform attack",
            "Surface discoloration",
            "Localized cavities",
            "Intergranular cracks"
        ],
        correct: 2
    },
    {
        question: "Intergranular corrosion occurs at:",
        options: [
            "Surface only",
            "Grain boundaries",
            "Entire metal",
            "Weld joints only"
        ],
        correct: 1
    },
    {
        question: "Season cracking occurs in:",
        options: ["Steel", "Aluminium", "Brass", "Copper"],
        correct: 2
    },
    {
        question: "Erosion corrosion is caused by:",
        options: [
            "Static fluids",
            "Turbulent flow",
            "Vacuum",
            "Electroplating"
        ],
        correct: 1
    },
    {
        question: "Water line corrosion occurs due to:",
        options: [
            "Uniform aeration",
            "Differential aeration",
            "High temperature",
            "Low pH"
        ],
        correct: 1
    },
    {
        question: "Soil corrosion is mainly due to:",
        options: [
            "Dry soil",
            "Microorganisms and moisture",
            "High temperature",
            "Vacuum"
        ],
        correct: 1
    },
    {
        question: "Which soil causes more corrosion?",
        options: ["Sandy soil", "Dry soil", "Clay soil", "Rocky soil"],
        correct: 2
    },
    {
        question: "Higher oxidation potential means:",
        options: [
            "Less corrosion",
            "More anodic behavior",
            "More cathodic behavior",
            "No corrosion"
        ],
        correct: 1
    },
    {
        question: "Higher over-voltage results in:",
        options: [
            "Faster corrosion",
            "Slower corrosion",
            "No effect",
            "Metal dissolution"
        ],
        correct: 1
    },
    {
        question: "Corrosion is severe when:",
        options: [
            "Anode area > cathode area",
            "Cathode area > anode area",
            "Both areas equal",
            "No contact"
        ],
        correct: 1
    },
    {
        question: "Impure metals corrode faster because:",
        options: [
            "Higher density",
            "Formation of galvanic cells",
            "Higher melting point",
            "Uniform structure"
        ],
        correct: 1
    },
    {
        question: "Smaller grain size results in:",
        options: [
            "Lower corrosion",
            "No corrosion",
            "Higher corrosion",
            "Passivation"
        ],
        correct: 2
    },
    {
        question: "Non-porous oxide films are formed by:",
        options: ["Na", "Mg", "Al", "K"],
        correct: 2
    },
    {
        question: "Increase in temperature causes corrosion rate to:",
        options: ["Decrease", "Stop", "Increase", "Remain same"],
        correct: 2
    },
    {
        question: "Chloride ions:",
        options: [
            "Form protective films",
            "Destroy protective films",
            "Prevent corrosion",
            "Neutralize acids"
        ],
        correct: 1
    },
    {
        question: "Cathodic protection protects metal by making it act as:",
        options: ["Anode", "Cathode", "Electrolyte", "Oxide"],
        correct: 1
    },
    {
        question: "Sacrificial anode protection uses:",
        options: [
            "Noble metals",
            "More anodic metals",
            "Non-metals",
            "Insoluble anodes"
        ],
        correct: 1
    },
    {
        question: "Which metal is commonly used as sacrificial anode?",
        options: ["Cu", "Ag", "Zn", "Sn"],
        correct: 2
    },
    {
        question: "Impressed current cathodic protection requires:",
        options: [
            "No power source",
            "External power source",
            "Only zinc anodes",
            "Vacuum"
        ],
        correct: 1
    },
    {
        question: "Anodic protection is applicable to:",
        options: [
            "All metals",
            "Active metals",
            "Passive metals",
            "Non-metals"
        ],
        correct: 2
    },
    {
        question: "Galvanizing is coating of iron with:",
        options: ["Tin", "Copper", "Zinc", "Nickel"],
        correct: 2
    },
    {
        question: "Tinning is preferred for:",
        options: [
            "Roofing sheets",
            "Food containers",
            "Pipelines",
            "Marine hulls"
        ],
        correct: 1
    },
    {
        question: "Anodic coatings are preferred because:",
        options: [
            "They are decorative",
            "They are noble",
            "They protect even when damaged",
            "They are cheaper"
        ],
        correct: 2
    },
    {
        question: "Electroplating deposits metal using:",
        options: [
            "AC current",
            "DC current",
            "Magnetic field",
            "Heat"
        ],
        correct: 1
    }
];


let quizQuestions = [];
let questionIndex = 0;
let score = 0;


function startQuiz() {
    let num = Number(document.getElementById("num-questions").value);
    let error = document.getElementById("error");

    if (num < 1 || num > 10) {
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
    let q = quizQuestions[questionIndex];

    document.getElementById("progress").textContent =
        `Question ${questionIndex + 1} of ${quizQuestions.length}`;

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
    let correct = quizQuestions[questionIndex].correct;
    let feedback = document.getElementById("feedback");
    let buttons = document.querySelectorAll("#options button");

    buttons.forEach(b => b.disabled = true);

    if (selected === correct) {
        button.classList.add("correct");
        feedback.textContent = "Correct!";
        score++;
    } else {
        button.classList.add("wrong");
        buttons[correct].classList.add("correct");
        feedback.textContent =
            "Wrong! Correct answer: " + quizQuestions[questionIndex].options[correct];
    }

    feedback.style.display = "block";

    if (questionIndex < quizQuestions.length - 1) {
        document.getElementById("next-btn").style.display = "block";
    } else {
        setTimeout(showResult, 2000);
    }
}

// Next Question
function nextQuestion() {
    questionIndex++;
    showQuestion();
}

// Show Result
function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    let num = Number(document.getElementById("num-questions").value);
    let percentage = (score / num ) * 100;

    document.getElementById("final-score").textContent =
        `You scored ${score} out of ${quizQuestions.length} 
          Percentage: ${percentage}%`;
       
}

// Restart Quiz
function restartQuiz() {
    document.getElementById("result").style.display = "none";
    document.getElementById("setup").style.display = "block";
}

document.getElementById("next-btn").onclick = nextQuestion;


//toggle
 const modeToggle = document.getElementById('modeToggle');
        const body = document.body;

        // Check for saved mode preference
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'enabled') {
            body.classList.add('dark-mode');
            modeToggle.textContent = '☀️';
        }

        modeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                modeToggle.textContent = '☀️';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                modeToggle.textContent = '🌙';
                localStorage.setItem('darkMode', 'disabled');
            }
        });



    
  