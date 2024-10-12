import "./index.css";

export default function menu() {
  let wrapper = document.querySelector("#content-wrapper");
  wrapper.className = "menu";

  let container = document.querySelector("#content");
  container.textContent = "";

  let menuList = [
    {
      name: "Pepperoni",
      image: "assets/img/pepperoni.png",
      price: "$15",
      ingredients: "tomato base, mozarella, mild pepperoni, oregano",
    },
    {
      name: "Cheesy garlic",
      image: "assets/img/cheesy-garlic.png",
      price: "$14",
      ingredients: "garlic base, extra mozarella",
    },
    {
      name: "Margarita",
      image: "assets/img/margarita.png",
      price: "$15",
      ingredients: "tomato base, extra mozarella",
    },
    {
      name: "Tomato & basil",
      image: "assets/img/tomato-basil.png",
      price: "$15",
      ingredients: "garlic base, mozarella, fresh tomato",
    },
    {
      name: "Prosciutto",
      image: "assets/img/prosciutto.png",
      price: "$18",
      ingredients: "tomato base, mozarella, prosciutto, arugula",
    },
    {
      name: "Napoli",
      image: "assets/img/napoli.png",
      price: "$16",
      ingredients: "tomato base, mozarella, anchovies, cappers",
    },
  ];

  menuList.forEach((item) => {
    let menuItem = document.createElement("div");
    menuItem.className = "menu__item";

    let imageContainer = document.createElement("div");
    imageContainer.className = "menu__item-image-container";

    let picture = document.createElement("img");
    picture.className = "menu__item-image";
    picture.src = item.image;
    imageContainer.append(picture);

    menuItem.append(imageContainer);

    let menuInformation = document.createElement("div");
    menuInformation.className = "menu__item-information";

    let name = document.createElement("h3");
    name.className = "menu__item-name";
    name.textContent = item.name;
    menuInformation.append(name);

    let price = document.createElement("p");
    price.className = "menu__item-price";
    price.textContent = item.price;
    menuInformation.append(price);

    let ingredients = document.createElement("p");
    ingredients.className = "menu__item-ingredients";
    ingredients.textContent = item.ingredients;
    menuInformation.append(ingredients);

    menuItem.append(menuInformation);

    container.append(menuItem);
  });
}
