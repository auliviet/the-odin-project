# John's Dough

[The Oding Project](https://www.theodinproject.com): Restaurant Page.
Exercise as part of the Full-stack JavaScript curriculum on working with Webpack.

## Preview link

[Github Pages](https://auliviet.github.io/the-odin-project/restaurant-page/)

## Project Overview

John's Dough is a page for an hypthetical restaurant that claims serving the best pizzas in town since 1991. It is a Single Page Application where the content of the different pages is fetched by calling different JavaScript functions and rendering the content on the page.

This project offers the below functionalities:

- The website has four pages: Home, Menu, About and Credits. When the user navigates to one of these pages, the content is refreshed but the URL remains the same.
- Each page has its own JavaScript function, CSS stylesheet and assets, each in its own file.
- Webpack is used to bundle the content (HTML, CSS, JavaScript, fonts and images) for production.

## Instructions

The full set of instructions can be found at [The Odin Project ](https://www.theodinproject.com/lessons/node-path-javascript-restaurant-page).

- Use NPM to create a new project and install Webpack
- Create a src and dist directory with the following contents:
  -- An index.js file in src.
  -- An index.html file in src.
- Create a webpack.config.js with the right rules to bundle the different pages and assets.
- Create a .gitignore file in the root of your project. It should contain node_modules and dist on separate lines.
- Set up an HTML skeleton inside of src/index.html. Inside the body, add a <header> element that contains a <nav> with buttons (not links!) for different “tabs” (for example buttons for “Home”, “Menu” or “About” etc). Below the <header>, add a single <div id="content">.
- Create the different pages by using JavaScript to update the content of the #content div.
- Add JavaScript functions for the tabbed navigation.

## Future enhancements

- Add page title
