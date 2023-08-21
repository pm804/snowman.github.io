const newLocal = 'Kiosk';
const words = [
    'JAZZY',
    'KIOSK',
    'MIRTH',
    'NUGDE',
    'PIQUE',
    'QUIRK',
    'RUMBA',
    'SPOUT',
    'TRYST',
    'UNZIP',
    'VEXED',
    'WALTZ',
    'XEROX',
    'YACHT',
    'ZILCH',
    'ADEPT',
    'BRAWL',
    'CRISP'
]; 
const maxWrongGuesses; 
wordToGuess; 
guessedLetters; 
maxWrongGuesses; 
imageCount; 

function selectRandomWord() {
    return words[Math.floor(Math.random()*words.length)]; 
}
function initializeGame(){
    wordToGuess = selectRandomWord(); 
    guessedLetters = Array(wordToGuess.length).fill('_'); 
    wrongGuesses = 0; 
    //Update the word display
    updateWordDisplay(); 
    updateMeltingSnowmanGraphic(); 

    // Remove any previously generated buttons 
    const lettersContainer = document.querySelector(.'letters'); 
    while (lettersContainer.firstChild){
        lettersContainers.removeChild(lettersContainers.firstChild); 
    }
    //generate the letter buttons 
    for (let i=0; i<26; i++){
        const letter= String.fromCharCode(65+i); 
        const button = document.createElement('button'); 
        button.innerText = letter; 
        button.addEventListener('click', function () { handleGuess(letter); }); 
        lettersContainer.appendChild(button); 
    }
    //clear any previous win/lose message
    const messageContainer = document.querySelector('.message'); 
    messageContainer.innerText=''; 
}

function updateWordDisplay(){
    const wordContainer = document.querySelector(.'word'); 
    wordContainer.innerText = guessedLetters.join(' '); 
}
function handleGuess(letter){
    //if the letter has already been guessed, do nothing 
    if(guessedLetters.includes(letter)){
        return;
    }
    
    //add the letter to the list of guessed letters 
    guessedLetters.foreach((gussedLetter, index)=> {
        if(wordToGuess[index] === letter){
            guessedLetters[index] = letter; 
        }
    }); 

    /*if the letter is not in the hidden word, increment the wrong 
        guesses count and update the graphic */
    if(!wordToGuess.includes(letter)){
        wrongGuesses++; 
        updateMeltingSnowmanGraphic(); 
    }
    updateWordDisplay(); 
    checkWinOrLose(); 
}
function updateMeltingSnowmanGraphic(){
    const meltingSnowmanContainer = document.querySelector('.MeltingSnowman'); 
    meltingSnowmanContainer.innerHTML = `<img src="pilarmaldonado/code/Snowman Game/snowmangraphics/MeltingSnowman${imageCount}.png" alt="MeltingSnowman ${imageCount}" > `; 
    imageCount++; 
}

function checkWinOrLose(){
    if (guessedLetters.join(' ')===wordToGuess){
        const messageContainer - document.querySelector('.message'); 
        messageContainer.innerText = 'You win!'; 
        const letterButtons = document.querySelectorAll('.letters button'); 
        letterButtons.forEach(button =>{
            button.disabled = true; 
            button.removeEventListener('click', handleGuess);
        }); 
    } else if (wrongGuesses >= maxWrongGuesses) {
        const messageContainer = document.querySelector('.message'); 
        messageContainer.innerText = `You lose! The word was "${wordToGuess}".`; 
        const meltingSnowmanContainer= document.querySelector('.MeltingSnowman'); 
        meltingSnowmanContainer.innerHTML = `<img src="images/gameover.png" alt="gameover!">`; 
        const letterButtons = document.querySelectorAll('.letters button'); 
        lettersButtons.forEach(button =>{
            button.disabled = true; 
            button.removeEventListener('click', handleGuess); 
        }); 
    }

}
//initialize the game when the page loads 
window.addEventListener('load', initializeGame); 
