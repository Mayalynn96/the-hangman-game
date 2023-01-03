//1. Create a Pool of words ✔
//  - Create a var with an array ✔
var wordPool = ["salmon", "bear", "oven", "televison", "chewing", "drinking", "hiking", "christmas", "tabletop", "sunflower", "hangman", "playing", "computer", "anaconda", "zebra", "snowboarding", "skiing", "mountain", "ocean", "forest", "concert", "handmade", "wife", "husband", "lion", "broccoli", "potatoes", "lemon", "steak", "hermit", "bathroom", "livingroom", "uranus", "saturn", "jupiter", "mars", "venus", "pluto", "aquarius", "scorpio", "virgo", "sagitarius", "piscies", "taurus", "leo", "gemini", "libra", "cancer", "capricorn", "aries", "stars", "planets", "moon", "galaxy", "purple", "pink", "halloween", "birthday", "spring", "summer", "winter", "automn"];

var timerEl = document.querySelector("#timer");
var playEl = document.querySelector("#play");
var wordEl = document.querySelector("#word");
var startBtn = document.querySelector("#start");
var resetBtn = document.querySelector("#scoreReset");
var letterEl = document.querySelector("#letter");
var alphabetEl = document.querySelector("#alphabet")
var timerInterval;
var timeTotal = 60;
var timeLeft = timeTotal;
var randomWord;
var maskedWord = [];
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//6. When a game is done ✔
//  - scores will be kept ✔
//  - scores will be saved localy ✔

var wins = localStorage.getItem("wins");
var winsEl = document.querySelector("#wins");
winsEl.textContent = "Your wins: " + (localStorage.getItem("wins"));

var losses = localStorage.getItem("losses");
var lossesEl = document.querySelector("#losses");
lossesEl.textContent = "Your losses: " + (localStorage.getItem("losses"));

//  - Have it reset the scores when the user presses the reset score button
resetBtn.addEventListener("click", function() {
    wins = 0;
    localStorage.setItem("wins", wins);
    winsEl.textContent = "Your wins: " + (localStorage.getItem("wins"));
    losses = 0;
    localStorage.setItem("losses", losses);
    lossesEl.textContent = "Your losses: " + (localStorage.getItem("losses"));
});

//  - have it start when the user presses the start button ✔
startBtn.addEventListener("click", function() {
    // When start button is pressed
    if(timeLeft === timeTotal) {
        randomizer();  
        letterEl.textContent = "Go!";
        alphabetEl.textContent = alphabet.join(" ");
        wordEl.textContent = maskedWord.join(" ");
        startBtn.textContent = "restart";
        playEl.textContent = "Press restart to play again";
        timerEl.textContent = "You have " + timeLeft + " seconds left."; 
        // to avoid counter going crazy if pressed to quickly in a row
        timeLeft = timeTotal - 1;  
        return countdown(); 
    // When restart button is pressed
    } else {
        clearInterval(timerInterval);
        alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        alphabetEl.textContent = alphabet.join(" ");
        timeLeft = timeTotal;
        timerEl.textContent = "You have " + timeLeft + " seconds left.";
        startBtn.textContent = "start";  
        playEl.textContent = "Press start to play";
        wordEl.textContent = "Ready?"
        maskedWord = [];
        return;
    }

  });

//2. Create a countdown ✔  
// function to countdown 
function countdown() {
    if(timeLeft === timeTotal-1) {
        timerInterval = setInterval(function() {
            timeLeft--;
            timerEl.textContent = "You have " + timeLeft + " seconds left.";
            //5. if time runs out before word is found ✔
            //  - cut time off the timer ✔
            //  - winning or loosing message shows up + score kept ✔
            if(timeLeft <= 0) {
                clearInterval(timerInterval);
                timerEl.textContent = "You have 0 seconds left.";
                wordEl.textContent = randomWord;
                letterEl.textContent = "You ran out of time!"
                losses++;
                localStorage.setItem("losses", losses);
                lossesEl.textContent = "Your losses: " + (localStorage.getItem("losses"));
                return;
            //6. if word is found before time runs out ✔
            //  - have it stop the timer when all letter are found ✔
            //  - winning or loosing message shows up + score kept ✔
            } else if(!maskedWord.includes("_")){
                letterEl.textContent = "You won!"
                wins++;
                localStorage.setItem("wins", wins);
                winsEl.textContent = "Your wins: " + (localStorage.getItem("wins"));
                return clearInterval(timerInterval);
            }
        }, 1000)
    } else {
        return clearInterval(timerInterval);
    }
}


//3. create a randomizer that gives us a random word ✔
//  - turn each letter in the word to a undescore ✔
function randomizer() {
    maskedWord = [];
    randomWord = wordPool[Math.floor(Math.random() * wordPool.length)];
    for(var i = 0; i < randomWord.length; i++) {
        maskedWord.push("_");
    }
}

//4. on keyEvent.key if the letter is correct ✔
//  - have it fill in the letter pressed on the keyboard if it's in the word or remove 5 seconds from the timer if it's not✔
var key;

function letterInWord() {
    for(var i = 0; i < randomWord.length; i++) {
        if(randomWord[i] === key) {
            maskedWord.splice([i], 1, randomWord[i]);
            wordEl.textContent = maskedWord.join(" ");
        } 
    }
    if(!randomWord.includes(key)){
        timeLeft = timeLeft - 5;
    }
}

//  - marks the letter pressed as already used so the user can keep track
function letterUsed() {
    for(var i = 0; i < alphabet.length; i++) {
        if(alphabet[i] === key.toUpperCase()) {
            alphabet.splice([i], 1, "_");
            alphabetEl.textContent = alphabet.join(" ");
            return;
        }
    }
}

// registers when a key is pressed and returns the function letterUsed and letterInWord if counter is started, over 0 and there is still letters to discover
document.addEventListener("keydown", keydownAction);

function keydownAction(event) {
    key = event.key.toLowerCase();
    if(timeLeft < timeTotal && timeLeft > 0 && maskedWord.includes("_")) {
        letterEl.textContent = key;
        letterUsed();
        return letterInWord();
    }
}
