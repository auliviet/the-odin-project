import Navigation from "./navigation";
import Search from "./search";
import WeatherToday from "./weatherToday";
import WeatherForecast from "./weatherForecast";

export default class Display {
  static refresh(data) {
    const main = document.querySelector("main");
    main.innerHTML = `
      ${new WeatherToday(data).render()}
      ${new WeatherForecast(data).render()}
    `;
  }
  static render(data) {
    return `
      ${new Navigation(data).render()}
      ${new Search(data).render()}
      <main>
        ${new WeatherToday(data).render()}
        ${new WeatherForecast(data).render()}
      </main>
    `;
  }
}
