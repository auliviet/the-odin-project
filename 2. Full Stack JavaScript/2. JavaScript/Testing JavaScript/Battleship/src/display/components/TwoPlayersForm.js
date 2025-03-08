import "./TwoPlayersForm.css";

/** Class representing the form for two players. */
export default class TwoPlayersForm {
  /**
   * Creates an instance of TwoPlayerForm.
   * @param {Display} display - The display object to render the game.
   */
  constructor(display) {
    this.display = display;
    this.player1Name = null;
    this.player2Name = null;
  }

  /**
   * Creates the player name input field and its label.
   * @param {Number} playerID The ID of the player (1 or 2)
   * @returns {HTMLElement} The label element containing the input field for the player's name.
   */
  #playerName(playerID) {
    const label = document.createElement("label");
    label.for = `player${playerID}-name`;
    label.textContent = `Player ${playerID} name:`;
    label.className = "player-form__name";

    const input = document.createElement("input");
    input.type = "text";
    input.name = `player${playerID}-name`;
    input.id = `player${playerID}-name`;
    input.required = true;

    // Add event listener to enable/disable the start button
    input.addEventListener("input", () => {
      this.startButton.disabled =
        !this.player1Name.value.trim() || !this.player2Name.value.trim(); // Disable if either input is empty
    });

    // Store the reference of the input
    if (playerID === 1) {
      this.player1Name = input;
    } else {
      this.player2Name = input;
    }

    label.append(input);

    return label;
  }

  /**
   * Creates the submit button for the form.
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
      const player2Name = this.player2Name.value;

      // Update the Game obect
      this.display.game.player1.name = player1Name;
      this.display.game.player2.name = player2Name;

      // Display the next page
      this.display.render("game");
    });

    return startButton;
  }

  /**
   * Renders the complete form for two players.
   * @returns {HTMLElement} The form element containing the player names input and start button.
   */
  render() {
    const form = document.createElement("form");
    form.method = "post";
    form.className = "player-form two-players";

    form.append(this.#playerName(1), this.#playerName(2), this.#startButton());

    return form;
  }
}
