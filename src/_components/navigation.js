export default class Navigation {
  constructor({ currentConditions: { precip } }) {
    this.precip = precip;
  }

  #isUmbrellaNeeded() {
    if (this.precip === 0) {
      return "No";
    } else if (this.precip > 0 && this.precip < 5) {
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
