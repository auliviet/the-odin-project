import { getWeather } from "../_services/async";

export default class Search {
  constructor({ location = null } = {}) {
    this.location = location;
  }

  #input() {
    return `
      <input 
        type="text" 
        id="location" 
        name="location" 
        value="${this.location != null ? this.location : ""}">
      </input>
    `;
  }

  #submit() {
    return `
      <button type="submit" class="form__submit">Submit</button>
    `;
  }

  render() {
    return `
      <form class="search" id="search">
        ${this.#input()}
        ${this.#submit()}
      </form>
    `;
  }
}
