import "./weatherForecast.css";

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
        <div class="weather-forecast__item-icon">
          <span class=${data.icon}></span>
        </div>
        <div class="weather-forecast__item-info">
          <p class="weather-forecast__item-date">
            ${date.getDate()}/${date.getMonth()}
          </p>
          <p class="weather-forecast__item-temp">
            ${Math.round(data.tempmin)}º - ${Math.round(data.tempmax)}º
          </p>
        </div>
      </div>
    `;
  }

  render() {
    return `
      
      <div class="weather-forecast large">
        ${this.#title()}
        <div class="weather-forecast__container">
          ${this.forecast.map((forecast) => this.#forecast(forecast)).join("")}
        </div>
      </div>
    `;
  }
}
