export default class WeatherForecast {
  constructor({ forecast }) {
    this.forecast = forecast.slice(1, 8);
  }

  #title() {
    return `
      <h2 class="weather-forecast__title">
        Weekly forecast
      </h2> 
    `;
  }

  #forecast(data) {
    let date = new Date(data.datetime);

    return `
      <div class="weather-forecast__item">
        <img 
          class="weather-forecast__item-icon" 
          src="_assets/icons/${data.icon}.svg" 
          alt="${data.icon} icon"
        />
        <p class="weather-forecast__item-date">
          ${date.getDate()}/${date.getMonth()}
        </p>
        <p class="weather-forecast__item-temp">
          ${Math.round(data.tempmin)}º - ${Math.round(data.tempmax)}º
        </p>
      </div>
    `;
  }

  render() {
    return `
      ${this.#title()}
      <div class="weather-forecast">
        ${this.forecast.map((forecast) => this.#forecast(forecast)).join("")}
      </div>
    `;
  }
}
