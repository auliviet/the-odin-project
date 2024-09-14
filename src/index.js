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

async function Weather(location, units) {
  display.loading();
  try {
    const weather = await getWeather(location, units);
    display.refresh(weather, units);
    addEvents();
  } catch (error) {
    console.error(error);
  }
}

// Events
function addEvents() {
  let button = document.querySelector("button");
  let location = document.querySelector("#location");
  let units = document.querySelectorAll("input[name='units']");

  button.addEventListener("click", search);

  units.forEach((unit) => {
    unit.addEventListener("click", search);
  });

  function search(event) {
    let unit = document.querySelector("input[name='units']:checked");
    event.preventDefault();
    Weather(location.value, unit.value);
  }
}
