import "./footer.css";

/** Class representing a footer component for the application. */
export default class Footer {
  /** Renders the footer.
   * @returns {HTMLElement} The <footer> element.
   */
  render() {
    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = `
      <p>
        Made with <3 by <a href="https://github.com/Auliviet">Auliviet</a>
      </p>
    `;

    return footer;
  }
}
