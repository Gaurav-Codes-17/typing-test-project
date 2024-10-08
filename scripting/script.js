//words array

const words = [
  "abridge",
  "abundant",
  "academic",
  "accelerate",
  "acceptance",
  "accountable",
  "acquire",
  "adventure",
  "aesthetic",
  "affirm",
  "allegiance",
  "allure",
  "amazing",
  "analyze",
  "ancient",
  "animate",
  "annex",
  "apparent",
  "applaud",
  "appreciate",
  "architecture",
  "arrange",
  "astonish",
  "atmosphere",
  "authentic",
  "balance",
  "bizarre",
  "blazing",
  "brilliant",
  "candid",
  "cascade",
  "challenge",
  "chaotic",
  "charmed",
  "classic",
  "clarity",
  "coherent",
  "collaborate",
  "communicate",
  "compel",
  "concept",
  "contribute",
  "courage",
  "creative",
  "cryptic",
  "curiosity",
  "delight",
  "deviate",
  "dynamic",
  "elevate",
  "enigma",
  "enrich",
  "enthusiastic",
  "evolve",
  "exceed",
  "excite",
  "explore",
  "faithful",
  "fascinate",
  "favorable",
  "feature",
  "flexible",
  "friction",
  "generate",
  "genuine",
  "grateful",
  "harmony",
  "historic",
  "honor",
  "impact",
  "improve",
  "innovate",
  "inspire",
  "integrate",
  "interact",
  "journey",
  "keen",
  "legend",
  "leverage",
  "logical",
  "magnify",
  "maintain",
  "melancholy",
  "mysterious",
  "navigate",
  "optimize",
  "outcome",
  "paradox",
  "participate",
  "pattern",
  "perception",
  "precise",
  "predict",
  "progress",
  "pursue",
  "reflect",
  "resolve",
  "reveal",
  "savor",
  "select",
  "serene",
  "simplify",
  "strategic",
  "succeed",
  "synthesize",
  "tangible",
  "tease",
  "transform",
  "unique",
  "utility",
  "validate",
  "vivid",
  "wonder",
  "worry",
  "yield",
  "zealous",
  "zenith",
  "adapt",
  "adopt",
  "advocate",
  "anticipate",
  "compose",
  "conclude",
  "demonstrate",
  "derive",
  "discern",
  "envision",
  "essential",
  "evident",
  "experience",
  "facilitate",
  "formulate",
  "gratify",
  "imagine",
  "initiate",
  "inspire",
  "investigate",
  "manage",
  "motivate",
  "observe",
  "optimize",
  "organize",
  "participate",
  "persist",
  "promote",
  "realize",
  "relish",
  "resonate",
  "revise",
  "simplify",
  "synthesize",
  "tackle",
  "unveil",
  "vibrate",
  "visualize",
];

//selecting the elements

const paraContainer = document.querySelector(".para-container");
const typingOptions = document.querySelectorAll(".timing");
const time = document.querySelector(".timer");
const start = document.querySelector("#button");
const input = document.querySelector(".input");
const wpmSpan = document.querySelector(".wpm");
const mistakeSpan = document.querySelector(".mistake");
const restart = document.querySelector(".restart-icon");
const display = document.querySelector(".game-over");
//variable declaration section
let selectedOption = typingOptions[1];
let letterIndex = 0;
let timer = 30;
time.innerText = timer;
let mistake = 0;
let selectedWord = null
let wpm = 0
  let wordsPM = null;
let isFunctionExecuted = false
let span = document.createElement("span");
span.classList.add("para");


//function section
function randomWordsGenerator() {
  for (let i = 0; i < words.length; i++) {
    let randomWords = Math.floor(Math.random() * words.length);
    let randomWord = words[randomWords];
    span.textContent += randomWord + " ";
    paraContainer.appendChild(span);
  }
  span.innerHTML = `
      <span class="letter">
      ${paraContainer.innerText.split("").join('</span><span class="letter">')}
        </span>`;
}

function typingOption() {
  typingOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      // Remove the 'selected' class from all options
      typingOptions.forEach((opt) => {
        opt.classList.remove("selected");
      });

      // Add the 'selected' class to the clicked option
      e.target.classList.add("selected");
      selectedOption = e.target.textContent.split("s").splice(0, 1);
      timer = selectedOption;
      time.innerText = timer;
    });
  });
}
let runtimer = null

function setTimer() {
  runtimer = setInterval(() => {
    if (selectedOption !== null && timer > 0) {
      timer--;
      time.innerHTML = timer;
      
      if (timer === 0) {
        time.classList.remove("blink")
        clearInterval(runtimer);
        display.classList.remove("display");
        calculateMistakeAndWpm();
        gameOver();
      }
    }
    if (timer <= 4 && timer > 0) {
      time.style.color = "red"
      time.classList.add("blink")
    }else{
      time.style.color = "rgb(228, 190, 55)"
    }
    }, 1000);
  }
  

paraContainer.addEventListener("click", () => {
  input.focus();
});

function playGame() {
  document.addEventListener("keydown", (e) => {
  if (!isFunctionExecuted) {
    setTimer()
    isFunctionExecuted = true
  }
    input.focus();

    typingOptions.forEach((opt) => {
      opt.disabled = true;
    })
  })
  input.addEventListener("input", () => {
    let characters = span.querySelectorAll("span");
    let inputValue = input.value.split("")[letterIndex];

    if (inputValue == null) {
      letterIndex--
    
      characters[letterIndex].classList.remove("incorrect" , "correct");
    }else{
      
    if (characters[letterIndex].innerText == inputValue) {
      characters[letterIndex].classList.add("correct");
    } else {
      characters[letterIndex].classList.add("incorrect");
    }
    letterIndex++;
    }

  });
  
}


function calculateMistakeAndWpm(){
  const characters = span.querySelectorAll("span");

  for (let i = 0; i < characters.length; i++) {
    if (characters[i].classList.contains("incorrect")) {
      mistake++;
    }
    if (characters[i].classList.contains("correct")) {
      wordsPM++;
    }
  }

  typingOptions.forEach((opt) => {
    if (opt.classList.contains("selected")) {
      selectedWord = opt.innerText.split('s').splice(0 , 1)
      wpm = calculateWPM(wordsPM, selectedWord);
    }
  })

  wpmSpan.innerText = wpm
  mistakeSpan.innerText = mistake
  
  
}

function calculateWPM(totalCharactersTyped, timeInSeconds) {
  let timeInMinutes = timeInSeconds / 60;

  if (timeInMinutes > 0) {
    let wpm = Math.round(totalCharactersTyped / 5 / timeInMinutes);
    return wpm;
  } else {
    console.error("Invalid time value:", timeInSeconds);
    return "N/A"; // Return an appropriate fallback value
  }
}


const gameOver = () => {
  input.disabled = true;
  typingOptions.forEach((opt) => {
    opt.disabled = true;
  })
};


function restartGame(){
  restart.addEventListener("click", () => {
    time.style.color = "rgb(228, 190, 55)"
    setTimer();
    display.classList.add("display")
    input.value = "";
    letterIndex = 0;
    mistake = 0
    wpm = 0
    wordsPM = null
    timer = selectedOption
    time.innerText = timer
    isFunctionExecuted = false
    span = document.createElement("span");
    span.classList.add("para");
    paraContainer.innerHTML = "";
    randomWordsGenerator();
    typingOption();   
    input.focus();
    typingOptions.forEach((opt) => {
      opt.disabled = false
    })
    input.disabled = false;
    clearInterval(runtimer)
  })
  
}

restartGame()
typingOption();
randomWordsGenerator();

playGame();