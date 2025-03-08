import "./OnePlayerForm.css";

/** Class representing the form for one-player. */
export default class OnePlayerForm {
  #DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];

  /** Creates a new OnePlayerForm component.
   * @param {Display} display - The display object to render the game.
   */
  constructor(display) {
    this.display = display;
  }

  /** Renders the complete form for one player.
   * @returns {HTMLElement} The form element containing the player name input, difficulty selection, and start button.
   */
  render() {
    const form = document.createElement("form");
    form.method = "post";
    form.className = "player-form one-player";

    form.append(
      this.#playerName(),
      /*
        Re-add when difficuluty is available
      */
      //this.#difficulty(),
      this.#startButton()
    );

    return form;
  }

  /** Creates the player name input field and its label.
   * @returns {HTMLElement} The label element containing the input field for the player's name.
   */
  #playerName() {
    const label = document.createElement("label");
    label.for = "player1-name";
    label.textContent = "Your name:";
    label.className = "player-form__name";

    const input = document.createElement("input");
    input.type = "text";
    input.name = "player1-name";
    input.id = "player1-name";
    input.required = true;

    // Add event listener to enable/disable the start button
    input.addEventListener("input", () => {
      this.startButton.disabled = !input.value.trim(); // Disable if empty
    });

    // Store the reference of the inout
    this.player1Name = input;

    label.append(input);

    return label;
  }

  /** Creates the difficulty selection spinner and its label.
   * @returns {HTMLElement} The div element containing the difficulty selection UI.
   */
  #difficulty() {
    const div = document.createElement("div");
    div.textContent = "Difficulty:";
    div.className = "player-form__difficulty";

    const difficultySpinner = document.createElement("div");
    difficultySpinner.className = "player-form__difficulty-spinner";

    // Create the Previous button
    const previousButton = document.createElement("button");
    previousButton.type = "button";
    previousButton.textContent = "<";
    previousButton.addEventListener("click", () => {
      let currentDifficultyIndex = this.#DIFFICULTIES.indexOf(
        difficultyValue.textContent
      );
      if (currentDifficultyIndex === 0) {
        difficultyValue.textContent =
          this.#DIFFICULTIES[this.#DIFFICULTIES.length - 1];
      } else {
        difficultyValue.textContent =
          this.#DIFFICULTIES[currentDifficultyIndex - 1];
      }
    });

    // Create the Next button
    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.textContent = ">";
    nextButton.addEventListener("click", () => {
      let currentDifficultyIndex = this.#DIFFICULTIES.indexOf(
        difficultyValue.textContent
      );
      difficultyValue.textContent =
        this.#DIFFICULTIES[
          (currentDifficultyIndex + 1) % this.#DIFFICULTIES.length
        ];
    });

    // Show the current difficulty
    const difficultyValue = document.createElement("div");
    difficultyValue.id = "player-form__difficulty-value";
    difficultyValue.textContent = this.#DIFFICULTIES[0];

    // Store the reference of the difficulty
    this.difficulty = difficultyValue;

    difficultySpinner.append(previousButton, difficultyValue, nextButton);

    div.append(difficultySpinner);

    return div;
  }

  /** Creates the submit button for the form.
   * @returns {HTMLElement} The input element representing the start button.
   */
  #startButton() {
    const startButton = document.createElement("input");
    startButton.type = "submit";
    startButton.value = "START";
    startButton.disabled = true;

    // Store the reference of the startButton
    this.startButton = startButton;

    // Add event listeners
    startButton.addEventListener("click", (event) => {
      event.preventDefault();

      // Get the values from the form
      const player1Name = this.player1Name.value;
      /*
        Re-add when difficulty is ready
      */
      //const difficulty = this.#DIFFICULTIES.indexOf(
      //  this.difficulty.textContent
      //);

      // Update the Game obect
      this.display.game.player1.name = player1Name;
      /*
        Re-add when difficulty is ready
      */
      // this.display.game.difficulty = difficulty;

      // Display the next page
      this.display.render("game");
    });

    return startButton;
  }
}
