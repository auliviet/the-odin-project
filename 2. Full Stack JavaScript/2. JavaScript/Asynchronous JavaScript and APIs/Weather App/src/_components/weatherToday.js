import "./weatherToday.css";

export default class WeatherToday {
  constructor({ currentConditions, forecast }) {
    this.currentConditions = currentConditions;
    this.currentDate = new Date(forecast[1].datetime);
  }

  #title() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `
      <h2 class="weather-today__title large">
        ${days[this.currentDate.getDay()]}, 
        ${this.currentDate.getDate()} 
        ${months[this.currentDate.getMonth()]} 
        ${this.currentDate.getFullYear()}
      </h2> 
    `;
  }
  #heroInfos() {
    return `
      <div class="weather-today__hero">
        <div class="weather-today__hero-icon">
          <span class=${this.currentConditions.icon}></span>
        </div>
        <div class="weather-today__hero-infos">
          <h3 class="weather-today__hero-temp">
            ${Math.round(this.currentConditions.temp)}º
          </h3>
          <h4 class="weather-today__hero-conditions">
            ${this.currentConditions.conditions}
          </h4>
        </div>
      </div> 
    `;
  }

  #keyStats() {
    return `
      <div class="weather-today__key-stats">
        <div class="weather-today__stat">
          <h4>
            Chance of rain
          </h4>
          <p>
            ${Math.round(this.currentConditions.precipprob)}%
          </p>
        </div>
        <div class="weather-today__stat">
          <h4>
            Humidity
          </h4>
          <p>
            ${Math.round(this.currentConditions.humidity)}%
          </p>
        </div>
        <div class="weather-today__stat">
          <h4>
            Sunrise
          </h4>
          <p>
            ${this.currentConditions.sunrise.slice(0, 5)}
          </p>
        </div>
        <div class="weather-today__stat">
          <h4>
            Sunset
          </h4>
          <p>
            ${this.currentConditions.sunset.slice(0, 5)}
          </p>
        </div>
      </div>
    `;
  }
  render() {
    return `
      <div class="weather-today">
        ${this.#title()}
        <div class="weather-today__container">
          ${this.#heroInfos()}
          ${this.#keyStats()}
        </div>
      </div>
    `;
  }
}
