import "./index.css";

export default function credits() {
  let wrapper = document.querySelector("#content-wrapper");
  wrapper.className = "credits";

  let container = document.querySelector("#content");
  container.textContent = "";

  let message = document.createElement("p");
  message.className = "credits__message";
  message.textContent =
    "This website was made possible thanks to the free assets shared by the below creators:";

  let list = document.createElement("ul");
  list.className = "credits__list";

  let creators = [
    {
      name: "Aldward Castillo",
      profileUrl:
        "https://unsplash.com/@aldwardcv31?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    },
    {
      name: "Mariusz Słoński",
      profileUrl:
        "https://unsplash.com/@maledobro?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    },
    {
      name: "Louis Hansel",
      profileUrl:
        "https://unsplash.com/@louishansel?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    },
    {
      name: "Usman Yousaf",
      profileUrl:
        "https://unsplash.com/@usmanyousaf?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    },
  ];

  for (let creator of creators) {
    console.log(creator.name);
    let listItem = document.createElement("li");
    listItem.className = "credits__list-item";
    listItem.innerHTML = `Photo by <a href="${creator.profileUrl}">${creator.name}</a> on <a href="https://unsplash.com">Unsplash</a>`;

    list.append(listItem);
  }

  container.append(message, list);
}
