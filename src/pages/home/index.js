import "./index.css";

export default function home() {
  const container = document.querySelector("#content");
  container.className = "home";
  container.textContent = "";

  const headings = document.createElement("div");
  headings.className = "home__headings";

  const title = document.createElement("h1");
  title.textContent = "Good times. Great pizza.";
  headings.append(title);

  const address = document.createElement("h2");
  address.textContent = "125 George Street, Sydney, NSW";
  headings.append(address);

  const country = document.createElement("h2");
  container.textContent = "Australia";
  headings.append(country);

  container.append(headings);
}
