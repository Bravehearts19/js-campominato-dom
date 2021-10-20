const boardContainer = document.getElementById("container_board");
const selectDifficolta = document.getElementById("select_difficolta");
const buttonAvvioPartita = document.getElementById("button_start_game");
let flowerCells = [];

buttonAvvioPartita.addEventListener("click", function() {
    const flowersNumber = 16;
    const level = selectDifficolta.value;

    const totalCells = getCellsNumber(level);

    generateGrid(totalCells);

    flowerCells = generateFlowerNumber(flowersNumber, totalCells);
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
 * @param {number} cellsNumber
 */
function generateFlowerNumber(flowersNumber, cellsNumber) {
    let flowerCells = [];

    while(flowerCells.lenght < flowersNumber) {
        const flowerCellIndex = Math.floor(Math.random * cellsNumber) + 1;
        let indexExistInArray = flowerCells.includes(flowerCellIndex);

        if (indexExistInArray === false) {
            flowerCells.push(flowerCellIndex);
        }
    }

    console.log(flowersNumber, flowersNumber.length);
    return flowerCells;
}


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
    /* cell.addEventListener("click", () => onSingleCellClick(i, cell )); */
    cell.addEventListener("click", function(i) {
        const isFlower = flowerCells.includes(i);

        if(isFlower) {
            this.classList.add("flower");
        } else {
            this.classList.add("clicked");
        }
    });

    const cellText = document.createElement("p");
    cellText.classList.add("m-0");
    cellText.textContent = i;

    cell.append(cellText);
    boardContainer.append(cell);
}

/**
 * 
 */
/* function onSingleCellClick(i) {
    const isFlower = flowerCells.includes(i);

    if(isFlower) {
        this.classList.add("flower");
    } else {
        this.classList.add("clicked");
    }
} */