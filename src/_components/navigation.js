export default class Navigation {
  constructor({ currentConditions } = {}) {
    this.precipprob =
      currentConditions == null ? null : currentConditions.precipprob;
  }

  #isUmbrellaNeeded() {
    if (this.precipprob == null) {
      return "";
    } else if (this.precipprob === 0) {
      return "No";
    } else if (this.precipprob > 0 && this.precipprob < 30) {
      return "Probably";
    } else {
      return "Yes";
    }
  }

  #title() {
    return `
      <h1 class="nav__logo">
        Do I need an umbrella? 
        <span class="nav__umbrella-required">${this.#isUmbrellaNeeded()}</span>
      </h1>
    `;
  }

  #units() {
    return `
      <input 
        form="search"
        type="radio" 
        id="celsius" 
        name="units" 
        value="celsius" 
        class="nav__units selected"
      />
      <label for="celsius">ºC</label>

      <input 
        type="radio" 
        id="fahrenheit" 
        name="units" 
        value="fahrenheit" 
        class="nav__units" 
      />
      <label for="fahrenheit">ºF</label>
    `;
  }

  render() {
    return `
      <nav>
        ${this.#title()}
        ${this.#units()}
      </nav>
    `;
  }
}
