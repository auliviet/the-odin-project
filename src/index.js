// Stylesheets
import "./global.css";

// Components
import Display from "./_components/_display";

// Content
// import { getWeather } from "./_services/promises";
import { getWeather } from "./_services/async";

// Main
const display = new Display();
const body = document.querySelector("body");
body.innerHTML = display.render();
addEvents();

async function Weather(location) {
  display.loading();
  try {
    const weather = await getWeather(location);
    display.refresh(weather);
    addEvents();
    console.log(weather);
  } catch (error) {
    console.error(error);
  }
}

// Events
function addEvents() {
  let button = document.querySelector("button");
  let input = document.querySelector("#location");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(input.value);
    Weather(input.value);
  });
}
