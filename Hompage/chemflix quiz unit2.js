const questions = [
    {
        question: "The correct order of increasing carbon content in solid fuels is:",
        options: [
            "Peat → Wood → Lignite → Bituminous → Anthracite",
            "Wood → Peat → Lignite → Bituminous → Anthracite",
            "Wood → Lignite → Peat → Bituminous → Anthracite",
            "Peat → Lignite → Wood → Bituminous → Anthracite"
        ],
        correct: 1
    },
    {
        question: "Coal is mainly composed of:",
        options: [
            "C, H, O only",
            "C, H, O, N only",
            "C, H, O, N with inorganic matter",
            "C only"
        ],
        correct: 2
    },
    {
        question: "The process of conversion of vegetable matter into coal is called:",
        options: ["Carbonization", "Combustion", "Coalification", "Gasification"],
        correct: 2
    },
    {
        question: "Proximate analysis of coal includes determination of:",
        options: [
            "C, H, O, N",
            "Moisture, ash, volatile matter, fixed carbon",
            "C, H, S, N, O",
            "Ash and sulphur only"
        ],
        correct: 1
    },
    {
        question: "Ultimate analysis of coal is mainly useful for:",
        options: [
            "Commercial grading",
            "Furnace design",
            "Heat balance calculations",
            "Determination of ash"
        ],
        correct: 2
    },
    {
        question: "Moisture in coal is determined by heating the sample at:",
        options: ["700–750°C", "950°C", "110°C", "1000°C"],
        correct: 2
    },
    {
        question: "Moisture present in coal:",
        options: [
            "Increases calorific value",
            "Has no effect on calorific value",
            "Decreases effective calorific value",
            "Increases flame length"
        ],
        correct: 2
    },
    {
        question: "Volatile matter in coal is determined by heating the sample at:",
        options: [
            "110°C for 1 hour",
            "700°C without lid",
            "950°C with lid for 7 minutes",
            "1000°C with air supply"
        ],
        correct: 2
    },
    {
        question: "High volatile matter in coal results in:",
        options: [
            "Short flame",
            "High calorific value",
            "Long smoky flame",
            "Better quality coal"
        ],
        correct: 2
    },
    {
        question: "Ash content in coal is undesirable because:",
        options: [
            "It increases calorific value",
            "It improves combustion",
            "It interferes with air circulation",
            "It increases fixed carbon"
        ],
        correct: 2
    },
    {
        question: "Fixed carbon is calculated as:",
        options: [
            "Moisture + Ash",
            "100 − (Moisture + VM)",
            "100 − (Moisture + VM + Ash)",
            "Ash − Moisture"
        ],
        correct: 2
    },
    {
        question: "Higher fixed carbon in coal indicates:",
        options: [
            "Lower calorific value",
            "Higher volatile matter",
            "Better coal quality",
            "Higher moisture"
        ],
        correct: 2
    },
    {
        question: "In proximate analysis, ash is determined at:",
        options: ["110°C", "950°C", "700–750°C", "1200°C"],
        correct: 2
    },
    {
        question: "During ultimate analysis, carbon is estimated by measuring:",
        options: [
            "CO absorbed in CaCl₂",
            "CO₂ absorbed in KOH",
            "H₂O absorbed in KOH",
            "SO₂ absorbed in NaOH"
        ],
        correct: 1
    },
    {
        question: "Hydrogen content is estimated from the increase in weight of:",
        options: ["KOH tube", "Silica crucible", "CaCl₂ tube", "BaSO₄ precipitate"],
        correct: 2
    },
    {
        question: "44 g of CO₂ corresponds to:",
        options: [
            "44 g of carbon",
            "12 g of carbon",
            "22 g of carbon",
            "6 g of carbon"
        ],
        correct: 1
    },
    {
        question: "18 g of water corresponds to:",
        options: [
            "1 g hydrogen",
            "2 g hydrogen",
            "16 g hydrogen",
            "8 g hydrogen"
        ],
        correct: 1
    },
    {
        question: "Nitrogen in coal is estimated by:",
        options: [
            "Bomb calorimeter",
            "Proximate analysis",
            "Kjeldahl’s method",
            "Dulong’s formula"
        ],
        correct: 2
    },
    {
        question: "Catalyst used in Kjeldahl’s method is:",
        options: [
            "NaOH",
            "HgSO₄ and K₂SO₄",
            "BaCl₂",
            "CaCl₂"
        ],
        correct: 1
    },
    {
        question: "Nitrogen present in coal:",
        options: [
            "Improves calorific value",
            "Is useful in combustion",
            "Has little significance",
            "Increases flame temperature"
        ],
        correct: 2
    },
    {
        question: "Sulphur in coal is estimated by converting it into:",
        options: ["SO₂", "H₂SO₄", "BaSO₄", "SO₃"],
        correct: 2
    },
    {
        question: "Molecular weight of BaSO₄ is:",
        options: ["137", "233", "96", "160"],
        correct: 1
    },
    {
        question: "233 g of BaSO₄ corresponds to:",
        options: [
            "16 g sulphur",
            "32 g sulphur",
            "64 g sulphur",
            "96 g sulphur"
        ],
        correct: 1
    },
    {
        question: "Sulphur in coal is undesirable because:",
        options: [
            "It increases ash",
            "It reduces flame length",
            "It causes corrosion and pollution",
            "It increases fixed carbon"
        ],
        correct: 2
    },
    {
        question: "Oxygen percentage in coal is calculated by:",
        options: [
            "Direct combustion",
            "Kjeldahl’s method",
            "Difference method",
            "Bomb calorimeter"
        ],
        correct: 2
    },
    {
        question: "Lower oxygen content in coal indicates:",
        options: [
            "Lower maturity",
            "Higher calorific value",
            "Poor quality coal",
            "Higher moisture"
        ],
        correct: 1
    },
    {
        question: "Which coal has the highest hardness and carbon content?",
        options: ["Lignite", "Peat", "Bituminous", "Anthracite"],
        correct: 3
    },
    {
        question: "Fixed carbon in coal mainly:",
        options: [
            "Burns in gaseous state",
            "Burns in solid state",
            "Does not burn",
            "Forms ash"
        ],
        correct: 1
    },
    {
        question: "Proximate analysis is mainly used for:",
        options: [
            "Heat balance calculations",
            "Furnace design",
            "Commercial classification",
            "Determining oxygen"
        ],
        correct: 2
    },
    {
        question: "Which constituent directly contributes most to calorific value?",
        options: ["Moisture", "Ash", "Carbon and hydrogen", "Nitrogen"],
        correct: 2
    },
    {
        question: "Fuel is defined as:",
        options: [
            "Any substance that burns in air",
            "A combustible carbonaceous material producing heat economically",
            "A material containing only carbon",
            "Any substance that reacts with oxygen"
        ],
        correct: 1
    },
    {
        question: "During combustion of fuel, carbon and hydrogen combine with oxygen to form:",
        options: [
            "CO and H2",
            "CO2 and H2",
            "CO2 and H2O",
            "CO and H2O"
        ],
        correct: 2
    },
    {
        question: "Fuels obtained directly from nature are called:",
        options: [
            "Secondary fuels",
            "Derived fuels",
            "Primary fuels",
            "Synthetic fuels"
        ],
        correct: 2
    },
    {
        question: "Which of the following is a secondary solid fuel?",
        options: ["Wood", "Coal", "Coke", "Lignite"],
        correct: 2
    },
    {
        question: "Natural gas belongs to which category of fuel?",
        options: [
            "Primary gaseous fuel",
            "Secondary gaseous fuel",
            "Primary liquid fuel",
            "Secondary liquid fuel"
        ],
        correct: 0
    },
    {
        question: "Which of the following is NOT a characteristic of a good fuel?",
        options: [
            "High calorific value",
            "High moisture content",
            "Moderate ignition temperature",
            "Low non-combustible matter"
        ],
        correct: 1
    },
    {
        question: "Calorific value is defined as the heat liberated when:",
        options: [
            "Fuel is partially burnt",
            "Unit mass of fuel is completely burnt",
            "Fuel reacts with nitrogen",
            "Fuel is heated without oxygen"
        ],
        correct: 1
    },
    {
        question: "The unit of calorific value for solid fuels in SI system is:",
        options: ["cal/g", "kcal/kg", "kJ/kg", "J/m³"],
        correct: 2
    },
    {
        question: "Gross calorific value (GCV) includes:",
        options: [
            "Latent heat of steam",
            "Only sensible heat",
            "Heat of ash formation",
            "Heat lost to surroundings"
        ],
        correct: 0
    },
    {
        question: "Net calorific value (NCV) is always:",
        options: [
            "Greater than GCV",
            "Equal to GCV",
            "Less than GCV",
            "Independent of hydrogen content"
        ],
        correct: 2
    },
    {
        question: "Relation between NCV and GCV is:",
        options: [
            "NCV = GCV + latent heat",
            "NCV = GCV − latent heat of steam",
            "GCV = NCV − latent heat",
            "NCV = GCV × latent heat"
        ],
        correct: 1
    },
    {
        question: "In bomb calorimeter, oxygen pressure used is approximately:",
        options: ["1 atm", "5 atm", "10 atm", "25 atm"],
        correct: 3
    },
    {
        question: "The ignition wire used in bomb calorimeter is made of:",
        options: ["Copper", "Iron", "Magnesium", "Nichrome"],
        correct: 2
    },
    {
        question: "Fuse wire correction in bomb calorimeter accounts for heat due to:",
        options: [
            "Cooling of water",
            "Acid formation",
            "Ignition wire combustion",
            "Incomplete combustion"
        ],
        correct: 2
    },
    {
        question: "Sulphur and nitrogen corrections are required because they form:",
        options: [
            "CO and CO2",
            "H2SO4 and HNO3",
            "SO2 and NO2",
            "Salts and ash"
        ],
        correct: 1
    },
    {
        question: "Cooling correction in bomb calorimeter is:",
        options: [
            "Always subtracted",
            "Always added",
            "Ignored",
            "Multiplied by fuel mass"
        ],
        correct: 1
    },
    {
        question: "In NCV calculation, mass of steam formed is taken as:",
        options: [
            "Equal to hydrogen content",
            "Twice the hydrogen content",
            "Nine times hydrogen content",
            "Half of hydrogen content"
        ],
        correct: 2
    },
    {
        question: "Boy’s calorimeter is used to determine calorific value of:",
        options: [
            "Solid fuels",
            "Liquid fuels",
            "Gaseous fuels",
            "All fuels"
        ],
        correct: 2
    },
    {
        question: "In Boy’s calorimeter, NCV is calculated by subtracting:",
        options: [
            "Cooling correction",
            "Fuse wire correction",
            "Latent heat of condensed steam",
            "Acid correction"
        ],
        correct: 2
    },
    {
        question: "Fossil fuels are formed from:",
        options: [
            "Chemical reactions",
            "Living organism remains",
            "Volcanic activity",
            "Atmospheric gases"
        ],
        correct: 1
    }
];

;

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
        const currentTheme = localStorage.getItem('theme') || 'dark';
        body.classList.toggle('light-mode', currentTheme === 'light');
        updateModeIcon(currentTheme);

        modeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            updateModeIcon(theme);
        });

        function updateModeIcon(theme) {
            modeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        }
  