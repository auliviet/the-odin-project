import "./index.css";

import mrKrab from "./mrKrab.png"

export default function about() {
    let container = document.querySelector("#content");
    container.className = "about";
    container.textContent = "";

    let mrKrabImg = new Image();
    mrKrabImg.src = mrKrab;
    container.append(mrKrabImg);

    let headings = document.createElement("div");
    headings.className = "about__headings";
    
    const title = document.createElement("h1");
    title.textContent = "The Krusty Krab";
    headings.append(title);

    const subTitle = document.createElement("h2");
    subTitle.textContent = "Come spend your money here!";
    headings.append(subTitle);

    const paragraph = document.createElement("p");
    paragraph.textContent = "The Krusty Krab is a fast food restaurant founded and owned by Eugene H. Krabs. It is also the most popular and best known restaurant in Bikini Bottom. Famous for its Krabby Patty burgers, with its secret recipe."
    headings.append(paragraph);

    container.append(headings);
}
