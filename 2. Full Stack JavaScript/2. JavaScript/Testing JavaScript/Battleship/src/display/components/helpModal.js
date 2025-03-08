import "./helpModal.css";

/** Class representing the help modal for the application. */
export default class HelpModal {
  /** Creates a close button for the modal.
   * @param {HTMLElement} modal - The modal element that contains the help content.
   * @returns {HTMLElement} The close button element.
   */
  #closeButton(modal) {
    const closeButton = document.createElement("button");
    closeButton.className = "nav__modal-close";
    closeButton.textContent = "X";

    // Add event listener
    closeButton.addEventListener("click", () => {
      // Hide the modal
      modal.className = "nav__modal hidden";
    });

    return closeButton;
  }

  /** Creates the help content for the modal.
   * @returns {HTMLElement} The paragraph element containing the help instructions.
   */
  #helpContent() {
    const p = document.createElement("p");
    p.className = "nav__modal-content";
    p.innerHTML = `
      In Battleship, two players compete to sink each other's fleet of ships. Each player has a 10x10 grid where they secretly place their ships: one Aircraft Carrier (5 squares), one Battleship (4 squares), one Submarine (3 squares), one Cruiser (3 squares), and two Destroyer (2 squares). Remember, players cannot move their ships once the game starts, and keeping ship placements secret is crucial for strategy. <br>
      <br> 

      Players take turns calling clickon on the opponent's grid to attack their ships. When all parts of a ship are hit, the ship is sunk. <br>
      <br> 

      The game continues until one player sinks all of the opponent's ships, declaring them the winner.  Enjoy the game!
    `;
    return p;
  }

  /** Renders the help modal and its content.
   * @returns {HTMLElement} The modal element containing the close button and help content.
   */
  render() {
    const modal = document.createElement("div");
    modal.role = "dialog";
    modal.className = "nav__modal hidden";
    modal.append(this.#closeButton(modal), this.#helpContent());

    return modal;
  }
}
