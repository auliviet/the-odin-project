// Stylesheets
import "./global.css";

// Components
import Display from "./_components/_display";

// Content
// import { getWeather } from "./_services/promises";
import { getWeather } from "./_services/async";

// Main
const weather = getWeather();
weather.then(console.log, alert);

const body = document.querySelector("body");
body.innerHTML = `
  ${new Display().render(weather)}
`;

// Events
let button = document.querySelector("button");
let input = document.querySelector("input");
button.addEventListener("click", (event) => {
  event.preventDefault();
  getWeather(input.value).then(console.log);
});
