import Header from "../components/header";

/** Class representing the home page of the application. */
export default class HomePage {
  /** Creates an instance of HomePage.
   * @param {Display} display - The display instance that manages the rendering of pages.
   */
  constructor(display) {
    this.display = display;
  }

  /** Renders the home page.
   * @returns {DocumentFragment} A DocumentFragment containing the rendered home page elements.
   */
  render() {
    const fragment = new DocumentFragment();
    const header = new Header(this.display).render();

    fragment.append(header);
    return fragment;
  }
}
