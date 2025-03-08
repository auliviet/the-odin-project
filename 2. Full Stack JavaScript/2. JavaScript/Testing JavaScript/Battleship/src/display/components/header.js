import "./header.css";

/** Class representing the homepage header for the application. */
export default class Header {
  /** Creates an instance of the Header class.
   * @param {Display} display - The display instance that manages the rendering of pages.
   */
  constructor(display) {
    this.display = display;
  }

  /** Creates the title element for the header.
   * @returns {HTMLElement} The h1 element containing the game title.
   */
  #title() {
    const h1 = document.createElement("h1");
    h1.className = "header__title";
    h1.textContent = "BATTLE/SHIP";

    return h1;
  }

  /** Creates a row of buttons for player selection.
   * @returns {HTMLElement} A div element containing the player selection buttons.
   */
  #realPlayersButtons() {
    const div = document.createElement("div");
    div.className = "header__buttons-row";

    div.append(this.#playButton());

    return div;
  }

  /** Creates the play button for the header.
   * @returns {HTMLElement} The play button
   */
  #playButton() {
    const button = document.createElement("button");
    button.className = "header__button";
    button.textContent = "PLAY";

    // Add event listeners
    button.addEventListener("click", () => {
      this.display.render("playerSelection");
    });

    return button;
  }

  /** Renders the header element containing the title and player selection buttons.
   * @returns {HTMLElement} The header element with the title and buttons.
   */
  render() {
    const header = document.createElement("header");
    header.append(this.#title(), this.#realPlayersButtons());

    return header;
  }
}
