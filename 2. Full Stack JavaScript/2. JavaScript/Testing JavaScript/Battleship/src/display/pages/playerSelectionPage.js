import OnePlayerForm from "../components/OnePlayerForm";

/** Class representing the Player Selection page of the application. */
export default class PlayerSelectionPage {
  /** Creates an instance of PlayerSelectionPage.
   * @param {Display} display The display object used to manage the game state and rendering.
   */
  constructor(display) {
    this.display = display;
  }

  /** Renders the player selection page, including navigation and the appropriate player form.
   * @returns {DocumentFragment} A document fragment containing the navigation and the player form.
   */
  render() {
    const fragment = new DocumentFragment();
    let form = null;

    // Render the correct form based on the number of players.
    form = new OnePlayerForm(this.display).render();

    fragment.append(form);
    return fragment;
  }
}
