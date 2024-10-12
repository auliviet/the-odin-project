import "./index.css";

export default function about() {
  let wrapper = document.querySelector("#content-wrapper");
  wrapper.className = "about";

  let container = document.querySelector("#content");
  container.textContent = "";

  let headings = document.createElement("div");
  headings.className = "about__content";

  const title = document.createElement("h1");
  title.className = "about__title";
  title.innerHTML = "The best pizza in town.<br>Since 1991.";
  headings.append(title);

  const paragraph = document.createElement("p");
  paragraph.className = "about__description";
  paragraph.innerHTML =
    "My journey began in my grandmother’s kitchen in Naples. Every Sunday, I would join her, kneading the dough and learning the secrets of her beloved recipes. Those afternoons were filled with love and the joy of family gathered around the table. <br>Pizzas have always represented special moments for me. A way to connect with loved ones. I strive to recreate that warmth and joy for everyone who walks through our doors. ";
  headings.append(paragraph);

  let imageWrapper = document.createElement("div");
  imageWrapper.className = "about__image-wrapper";

  container.append(headings, imageWrapper);
}
