const INITIAL_GRID_SIZE = 16;
const MAX_GRID_SIZE = 100;

function createCanvas() {
// Create the playable area for the game based on the size of the window

    // Get the size of the window
    let min = document.documentElement.clientHeight;
    let max = document.documentElement.clientWidth;

    // Define the minimum playable area
    if (min > max) {
        min = document.documentElement.clientWidth;
    }

    // Apply styles to the HTML
    document.querySelector(".container").style.height = `${min - 100}px`;
    document.querySelector(".container").style.width = `${min - 100}px`;

}


function createGrid(gridSize) {
// Create a grid on the HTML page of X by X cells, X being the gridSize
let container = document.querySelector(".container");

    for (let i = 0; i < gridSize; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
        }
        
        // Add each row to the container
        container.appendChild(row);
    }

    // Create event listeners for all cells on the page
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", (event) => {
            colorOnHover(event);
        });
    });
}

function flushGrid() {
// Delete an existing grid on the page
    let rows = document.querySelectorAll(".row");
    
    rows.forEach((row) => row.remove());
}


function colorOnHover(event) {
// Change the background color of a cell when hovered over

    // If the cell is empty, add a color to it
    if (!event.target.style.backgroundColor) {
        // Select a random RGB value
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
    
        // Update the background color of the cell
        event.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        event.target.style.opacity = ".1";
    }

    // Else, increase the opacity by 10%
    else {
        let opacity = +event.target.style.opacity;
        opacity += .1;
        event.target.style.opacity = opacity;
    }
}


function getPlayerGridSize () {
// Ask the user to select the size of the grid

    let playerGridSize = parseInt(prompt("How many squares per side?"));

    // Ensure the input is valid
    if (isNaN(playerGridSize)) {
        alert("Please enter a number");
        getPlayerGridSize();
    }
    else if (playerGridSize < 1 || playerGridSize > 100) {
        alert("Please enter a number between 1 and 100");
        getPlayerGridSize();
    }
    else {
    // If input is valid, delete the existing content and generate a new grid with the user input.
        flushGrid();
        createGrid(playerGridSize);
    }

}

// Create the grid on the screen
createCanvas();
createGrid(INITIAL_GRID_SIZE);

//Create envent listener on the restart button
let restart = document.getElementById("restart");
restart.addEventListener("click", getPlayerGridSize);