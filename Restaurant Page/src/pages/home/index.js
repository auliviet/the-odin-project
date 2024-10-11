import "./index.css";

export default function home() {
    let container = document.querySelector("#content");
    container.className = "home";
    container.textContent = "";


    let headings = document.createElement("div");
    headings.className = "home__headings";


    const title = document.createElement("h1");
    title.textContent = "The Krusty Krab";
    headings.append(title);

    const subTitle = document.createElement("h2");
    subTitle.textContent = "Come spend your money here!";
    headings.append(subTitle);

    container.append(headings);
}
