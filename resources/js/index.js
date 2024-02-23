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
  // Get the guess input value
  const guessValue = guessInput.value;
  // Call the game guess() method with the input value
  try {
    game.guess(guessValue);
    // Update the wordHolderText and guessesText
    wordHolderText.textContent = game.getWordHolderText();
    guessesText.textContent = game.getGuessesText();
    // Clear the guess input field
    guessInput.value = '';
    // Check if the game is over
    if (game.isOver) {
      // Disable the guess input and button
      guessInput.disabled = true;
      guessButton.disabled = true;
      // Show the resetGame button
      resetGame.style.display = 'block';
      // Show a message based on the game result
      if (game.didWin) {
        alert('Congratulations! You won!');
      } else {
        alert('Game over! The word was: ' + game.word);
      }
    }
  } catch (error) {
    // Handle errors
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

