const boardContainer = document.getElementById("container_board");
const selectDifficolta = document.getElementById("select_difficolta");
const buttonAvvioPartita = document.getElementById("button_start_game");
const flowerCells = [];

buttonAvvioPartita.addEventListener("click", function() {
    const flowersNumber = 16;
    const level = selectDifficolta.value;

    const totalCells = getCellsNumber(level);

    generateGrid(totalCells);

    generateFlowerNumber(flowersNumber, totalCells)
})

/**
 * 
 * @param {string} level 
 */
function getCellsNumber(level) {
    let result;

    if (parseInt(level) === 1) {
            result = 100;
    } else if (parseInt(level) === 2) {
        result = 81;
    } else if (parseInt(level) === 3) {
        result = 49;
    }

    return result;
}

/**
 * 
 * @param {number} cellsNumber 
 */
function generateGrid(cellsNumber) {
    boardContainer.innerHTML = "";

    const cellSize = 100 / Math.sqrt(cellsNumber);
    
    for (let i = 1; i <= cellsNumber; i++) {
        generateSingleCell(i, cellSize);
    }
}

/**
 * 
 * @param {number} flowersNumber 
 */
function generateFlowerNumber(flowersNumber, cellsNumber) {
    while(flowerCells.lenght < flowersNumber) {
        const flowerCellIndex = Math.floor(Math.random * cellsNumber) + 1;
        let indexExistInArray = flowerCells.includes(flowerCellIndex);

        if (!indexExistInArray) {
            flowerCells.push(flowerCellIndex);
        }
    }

    return flowerCells;
}

/* function orderArray() {

} */




/**
 * 
 * @param {number} i
 * @param {number} cellSize 
 */
function generateSingleCell(i, cellSize) {
    const cell = document.createElement("div");
    cell.classList.add("box", "d-flex", "justify-content-center", "align-items-center");
    cell.style.height = `${cellSize}%`;
    cell.style.width = `${cellSize}%`;
    cell.addEventListener("click", () => onSingleCellClick(i, cell /* devo passargli il this che è la cell */));
    
    const cellText = document.createElement("p");
    cellText.classList.add("m-0");
    cellText.textContent = i;

    cell.append(cellText);
    boardContainer.append(cell);
}

/**
 * 
 */
function onSingleCellClick(i) {
    const isFlower = flowerCells.includes(i);

    if(isFlower) {
        this.classList.add("flower");
    } else {
        this.classList.add("clicked");
    }
}