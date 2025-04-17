// Stylesheet
import "../assets/styles.css";

// Pages
import HomePage from "./pages/homePage";
import PlayerSelectionPage from "./pages/playerSelectionPage";
import GamePage from "./pages/gamePage";

// Global components
import Navigation from "./components/navigation";
import Footer from "./components/footer";

/** Class used to display the game. */
export default class Display {
  /**
   * Initializes the Display class with the game instance and sets up the pages.
   * @param {Game} game - The game instance to be displayed.
   */
  constructor(game) {
    this.game = game;
    this.currentPage = null;
    this.pages = {
      home: new HomePage(this),
      playerSelection: new PlayerSelectionPage(this),
      placeShip: null,
      game: new GamePage(this),
    };

    this.render("home");
  }

  /**
   * Renders the specified page.
   * @param {string} page - The name of the page to render.
   */
  render(page) {
    this.currentPage = this.pages[page];

    const body = document.querySelector("body");

    const nav = new Navigation().render();
    const footer = new Footer().render();
    const main = document.createElement("main");
    main.append(this.currentPage.render());

    // Check if the current page exists and remove it
    if (this.currentPage) {
      body.innerHTML = "";
    }

    body.append(nav, main, footer);
    body.className = this.currentPage.constructor.name.toLowerCase();
  }
}
