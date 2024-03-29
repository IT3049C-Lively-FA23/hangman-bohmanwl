const { rest } = require("lodash");

// START + DIFFICULTY SELECTION
const startWrapper = document.getElementById(`startWrapper`);
const difficultySelectForm = document.getElementById(`difficultySelect`);
const difficultySelect = document.getElementById(`difficulty`);

// GAME
const gameWrapper = document.getElementById(`gameWrapper`);
const guessesText = document.getElementById(`guesses`);
const wordHolderText = document.getElementById(`wordHolder`);

// GUESSING FORM
const guessForm = document.getElementById(`guessForm`);
const guessInput = document.getElementById(`guessInput`);

// GAME RESET BUTTON
const resetGame = document.getElementById(`resetGame`);

// CANVAS
let canvas = document.getElementById(`hangmanCanvas`);

// The following Try-Catch Block will catch the errors thrown
try {
  // Instantiate a game Object using the Hangman class.
  const game = new Hangman();
  // add a submit Event Listener for the to the difficultySelectionForm
  difficultySelectForm.addEventListener(`submit`, function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the difficulty input
    const difficulty = difficultySelect.value;

    // Call the game start() method
    game.start(difficulty, function () {
      // Callback function:
      // 1. Hide the startWrapper
      startWrapper.style.display = 'none';
      // 2. Show the gameWrapper
      gameWrapper.style.display = 'block';
      // 3. Set the wordHolderText
      wordHolderText.textContent = game.getWordHolderText();
      // 4. Set the guessesText
      guessesText.textContent = game.getGuessesText();
    });
  });

  // add a submit Event Listener to the guessForm
  guessForm.addEventListener(`submit`, function (e) {
    e.preventDefault();
  //    get the guess input
    const guessInput = guessInput.value;
  //    call the game guess() method
    try{
        game.guess(guessInput);
  //    set the wordHolderText to the game.getHolderText
        wordHolderText.textContent = game.getWordHolderText();
  //    set the guessesText to the game.getGuessesText
        guessesText.textContent = game.getGuessesText();
  //    clear the guess input field
        guessInput.value = '';
  // Given the Guess Function calls either the checkWin or the onWrongGuess methods
  // the value of the isOver and didWin would change after calling the guess() function.
  // Check if the game isOver:
      if(game.isOver){
  //      1. disable the guessInput
        guessInput.disabled = true;
  //      2. disable the guessButton
        guessButton.disabled = true;
  //      3. show the resetGame button
        resetGame.style.display = 'block';
  // if the game is won or lost, show an alert.
        if (game.didWin) {
          alert('Youve won!');
        }else{
          alert('You Lost! The word was: ' + game.word);
        }
      }
    }catch (error){
      console.error(error);
      alert(error.message);
    }
  });  

  // add a click Event Listener to the resetGame button
  resetGame.addEventListener(`click`, function (e) {
    game.resetGame();
  //    show the startWrapper
    startWrapper.style.display = 'block';
  //    hide the gameWrapper
    gameWrapper.style.display = 'none';
});
} catch (error) {
  console.error(error);
  alert(error);
}
