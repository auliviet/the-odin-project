//import "./index.css";

export default function about() {
  let container = document.querySelector("#content");
  container.className = "about";
  container.textContent = "";

  let headings = document.createElement("div");
  headings.className = "about__headings";

  const title = document.createElement("h1");
  title.textContent = "The best pizza in town.";
  headings.append(title);

  const subTitle = document.createElement("h2");
  subTitle.textContent = "Since 1991.";
  headings.append(subTitle);

  const paragraph = document.createElement("p");
  paragraph.innerHTML =
    "My journey began in my grandmother’s kitchen in Naples. Every Sunday, I would join her, kneading the dough and learning the secrets of her beloved recipes. Those afternoons were filled with love and the joy of family gathered around the table. <br>Pizzas have always represented special moments for me. A way to connect with loved ones. I strive to recreate that warmth and joy for everyone who walks through our doors. ";
  headings.append(paragraph);

  container.append(headings);
}
