import "./playerShips.css";

/** Class representing the ships of a player. */
export default class playerShips {
  /** Creates an instance of playerShips.
   * @param {Object} params - The parameters for the playerShips instance.
   * @param {Array} params.ships - An array of ship objects.
   * @param {boolean} params.isOpponent - Indicates if the ships belong to an opponent.
   */
  constructor({ ships, isOpponent }) {
    this.ships = ships;
    this.isOpponent = isOpponent;
  }

  /** Renders a single ship as a DOM element.
   * @param {Object} ship - The ship object to render.
   * @returns {HTMLElement} The rendered ship element.
   */
  #renderShip(ship) {
    const div = document.createElement("div");
    div.className = "ship";
    div.className += ship.isSunk() ? " sunk" : "";

    for (let i = 0; i < ship.length; i++) {
      const cell = document.createElement("div");
      cell.className = "ship-cell";

      if (this.isOpponent) {
        cell.className += ship.isSunk() ? " hit" : "";
      } else {
        cell.className += i < ship.hits ? " hit" : "";
      }

      div.append(cell);
    }

    return div;
  }

  /** Renders all ships as a DOM section element.
   * @returns {HTMLElement} The section element containing all rendered ships.
   */
  render() {
    const section = document.createElement("section");
    section.className = "player-ships";

    this.ships.forEach((ship) => {
      section.append(this.#renderShip(ship));
    });

    return section;
  }
}
