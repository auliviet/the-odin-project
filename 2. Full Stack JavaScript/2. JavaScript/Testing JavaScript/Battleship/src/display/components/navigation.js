import HelpModal from "./helpModal";

import "./navigation.css";

/** Class representing a navigation component for the application. */
export default class Navigation {
  /** Create the logo.
   * @returns {HTMLElement} The <h1> element representing the logo.
   */
  #logo() {
    const logo = document.createElement("h1");
    logo.className = "nav__logo";
    logo.textContent = "BATTLE/SHIP";

    return logo;
  }

  /** Creates a help button element for the application.
   * @returns {HTMLElement} The <button> element representing the help button.
   */
  #help() {
    const fragment = new DocumentFragment();

    // Create the button
    const helpButton = document.createElement("button");
    helpButton.className = "nav__help";
    helpButton.textContent = "?Help";

    // Create the modal
    const helpModal = new HelpModal().render();

    // Add event listener
    helpButton.addEventListener("click", () => {
      helpModal.className = "nav__modal";
    });

    fragment.append(helpButton, helpModal);

    return fragment;
  }

  /** Renders the navigation bar.
   * @returns {HTMLElement} The <nav> element containing the logo and help button.
   */
  render() {
    const nav = document.createElement("nav");
    nav.className = "nav";
    nav.append(this.#logo(), this.#help());

    return nav;
  }
}
