import "./index.css";

export default function home() {
  let wrapper = document.querySelector("#content-wrapper");
  wrapper.className = "home";

  const container = document.querySelector("#content");
  container.textContent = "";

  const headings = document.createElement("div");
  headings.className = "home__headings";

  const title = document.createElement("h1");
  title.textContent = "Good times. Great pizza.";
  headings.append(title);

  const address = document.createElement("h2");
  address.innerHTML = "125 George Street, Sydney, NSW <br>Australia";
  headings.append(address);

  container.append(headings);
}
