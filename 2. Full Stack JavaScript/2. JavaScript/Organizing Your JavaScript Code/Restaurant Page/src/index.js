// Stylesheets
import "./style.css";

// Pages
import home from "./pages/home";
import menu from "./pages/menu";
import about from "./pages/about";
import credits from "./pages/credits";

// Event listeners
let buttons = document.querySelectorAll("button");

for (let button of buttons) {
  let id = button.id;

  switch (id) {
    case "home":
      button.addEventListener("click", home);
      break;

    case "menu":
      button.addEventListener("click", menu);
      break;

    case "about":
      button.addEventListener("click", about);
      break;

    default:
      break;
  }
}

let credtsLink = document.querySelector(".credits");
credtsLink.addEventListener("click", credits);

home();
