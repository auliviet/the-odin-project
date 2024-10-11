import "./index.css";

export default function menu() {
    let container = document.querySelector("#content");
    container.className = "menu"
    container.textContent = "";

    let menuList1 = [
        {name: "Krabby Patty", price: "1.25"},
        {name: "Krabby Patty w/ sea cheese", price: "1.50"},
        {name: "Double Krabby Patty", price: "2.00"},
        {name: "Double Krabby Patty w/ sea cheese", price: "2.25"},
        {name: "Tripe Krabby Patty", price: "3.00"},
        {name: "Tripe Krabby Patty w/ sea cheese", price: "3.25"},
        {name: "Small Coral Bits", price: "1.00"},
        {name: "Medium Coral Bits", price: "1.25"},
        {name: "Large Coral Bits", price: "1.50"},
        {name: "Kelp Rings", price: "1.50"},
        {name: "Salty Sauce", price: "0.50"},
    ]

    let menuList2 = [
        {name: "Krabby Meal", price: "3.50"},
        {name: "Double Krabby Meal", price: "3.75"},
        {name: "Triple Krabby Meal", price: "4.00"},
        {name: "Salty Sea Dog", price: "1.25"},
        {name: "Footlong", price: "2.00"},
        {name: "Sailors Surprise", price: "3.00"},
        {name: "Golden Loaf", price: "2.00"},
        {name: "Golden Loaf w/ sauce", price: "2.50"},
        {name: "Kelp Shake", price: "2.00"},
        {name: "Small Seafoam Soda", price: "1.00"},
        {name: "Medium Seafoam Soda", price: "1.25"},
        {name: "Large Seafoam Soda", price: "1.50"},
    ]

    let menuWrapper = document.createElement("div");
    menuWrapper.className = "menu__wrapper";
    container.append(menuWrapper);

    let menuHeadings = document.createElement("h1");
    menuHeadings.className = "menu__headings";
    menuHeadings.textContent = "The Galley Grub";
    menuWrapper.append(menuHeadings);

    let menuLeftColumn = document.createElement("div");
    menuLeftColumn.className = "menu__left";
    createMenuColumn(menuList1, menuLeftColumn);
    menuWrapper.append(menuLeftColumn);

    let menuRightColumn = document.createElement("div");
    menuRightColumn.className = "menu__right";
    createMenuColumn(menuList2, menuRightColumn);
    menuWrapper.append(menuRightColumn);

    function createMenuColumn(array, container) {
        for (let item of array) {
            let menuRow = document.createElement("div");
            menuRow.className = "menu__row";

            let menuItem = document.createElement("p");
            menuItem.className = "menu__row-item";
            menuItem.textContent = item.name.toUpperCase();
            menuRow.append(menuItem);

            let menuPrice = document.createElement("p");
            menuPrice.className = "menu__row-price";
            menuPrice.textContent = `$${item.price}`;
            menuRow.append(menuPrice);
            
            container.append(menuRow);
        }
    }

}