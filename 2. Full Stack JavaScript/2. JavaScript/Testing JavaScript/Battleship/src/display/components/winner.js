import "./winner.css";

/** Class representing the winner of the game and the reset button. */
export default class Winner {
  /** Create a Winner instance.
   * @param {string} winnerName - The name of the winner.
   */
  constructor(winnerName) {
    this.winner = winnerName;
  }

  /** Render the winner section.
   * @returns {HTMLElement} The section element containing the winner's name and reset button.
   */
  render() {
    const section = document.createElement("section");
    section.className = "game-winner";

    const title = document.createElement("h2");
    title.textContent = `${this.winner.toUpperCase()} WINS`;

    section.append(title, this.#resetButton());

    return section;
  }

  /** Create a reset button.
   * @returns {HTMLElement} The button element for resetting.
   */
  #resetButton() {
    const button = document.createElement("button");
    button.textContent = "REPLAY";

    return button;
  }
}
