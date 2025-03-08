import "./playerShips.css";

export default class playerShips {
  constructor({ ships, isOpponent }) {
    this.ships = ships;
    this.isOpponent = isOpponent;
  }

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

  render() {
    const section = document.createElement("section");
    section.className = "player-ships";

    this.ships.forEach((ship) => {
      section.append(this.#renderShip(ship));
    });

    return section;
  }
}
