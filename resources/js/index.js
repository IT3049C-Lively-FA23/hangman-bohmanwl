// Instantiate a game Object using the Hangman class.
const game = new Hangman(canvas);

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
  // get the guess input value
  const guessInputValue = guessInput.value;
  // call the game guess() method
  try {
    game.guess(guessInputValue);
    // set the wordHolderText to the game.getHolderText
    wordHolderText.textContent = game.getWordHolderText();
    // set the guessesText to the game.getGuessesText
    guessesText.textContent = game.getGuessesText();
    // clear the guess input field
    guessInput.value = '';
    // Check if the game isOver:
    if (game.isOver) {
      // 1. disable the guessInput
      guessInput.disabled = true;
      // 2. disable the guessButton
      guessSubmitButton.disabled = true;
      // 3. show the resetGame button
      resetGame.style.display = 'block';
      // if the game is won or lost, show an alert.
      if (game.didWin) {
        alert('Youve won!');
      } else {
        alert('You Lost! The word was: ' + game.word);
      }
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});  

// add a click Event Listener to the resetGame button
resetGame.addEventListener(`click`, function (e) {
  // Reset the game
  game.reset();
  // show the startWrapper
  startWrapper.style.display = 'block';
  // hide the gameWrapper
  gameWrapper.style.display = 'none';
});

