// Stylesheets
import "./global.css";

// Components
import Display from "./_components/_display";

// Content
// import { getWeather } from "./_services/promises";
import { getWeather } from "./_services/async";

// Main
const weather = getWeather()
  .then((response) => {
    console.log(response);
    return response;
  })
  .then((response) => {
    const body = document.querySelector("body");
    body.innerHTML = `
      ${Display.render(response)}
    `;
  })
  .then(() => {
    // Events
    let button = document.querySelector("button");
    let input = document.querySelector("#location");
    button.addEventListener("click", (event) => {
      event.preventDefault();
      getWeather(input.value).then((response) => {
        Display.refresh(response);
      });
    });
  })
  .catch((error) => {
    alert(error);
  });
