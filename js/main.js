const boardContainer = document.getElementById("container_board");
const selectDifficolta = document.getElementById("select_difficolta");
const buttonAvvioPartita = document.getElementById("button_start_game");
let flowerCells = [];

buttonAvvioPartita.addEventListener("click", function() {
    const flowersNumber = 16;
    const level = parseInt(selectDifficolta.value);

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

    if (level === 1) {
            result = 100;
    } else if (level === 2) {
        result = 81;
    } else if (level === 3) {
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

    while(flowerCells.length < flowersNumber) {
        const flowerCellIndex = generateRandomNum(1, cellsNumber);
        let indexExistInArray = flowerCells.includes(flowerCellIndex);

        if (!indexExistInArray) {
            flowerCells.push(flowerCellIndex);
        }
    }

    console.log("Questo è il vettore delle flowerCells", orderArray(flowerCells));
    console.log("Questo è la lunghezza del vettore delle flowerCells", flowerCells.length);

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
    cell.addEventListener("click", onSingleCellClick);

    const cellText = document.createElement("p");
    cellText.classList.add("m-0");
    cellText.textContent = i;

    cell.append(cellText);
    boardContainer.append(cell);
}

/**
 * 
 */
function onSingleCellClick(event) {
    const i = parseInt(event.target.innerText);
    const isFlower = flowerCells.includes(i);
    let clickedCellsNumber = document.querySelectorAll(".clicked").length;
    const totalCells = document.querySelectorAll(".box").length;
    const allCells = document.querySelectorAll(".box");
    const safeCells = totalCells - flowerCells.length;

    if(isFlower) {
        this.classList.add("flower");
        
        setOverlayLose(clickedCellsNumber);
        displayAllFlowerCells(totalCells, allCells);
    } else {
        this.classList.add("clicked");
        clickedCellsNumber = document.querySelectorAll(".clicked").length;

        if(clickedCellsNumber ===  safeCells) {
            setOverlayWin(clickedCellsNumber);
            displayAllFlowerCells(totalCells, allCells);
        }
    }
}

function setOverlayLose(clickedCellsNumber) {
    const overlay = document.createElement("div");
    overlay.classList.add("container_overlay");

    const overlayText = document.createElement("p");
    overlayText.classList.add("m-0");
    overlayText.textContent = `La partita è terminata, hai perso totalizzando ${clickedCellsNumber} punti!`;
    
    overlay.append(overlayText);
    boardContainer.append(overlay);
}

function setOverlayWin(clickedCellsNumber) {
    const overlay = document.createElement("div");
    overlay.classList.add("container_overlay", "container_overlay_win");

    const overlayText = document.createElement("p");
    overlayText.classList.add("m-0");
    overlayText.textContent = `La partita è terminata, hai vinto totalizzando ${clickedCellsNumber} punti!`;
    
    overlay.append(overlayText);
    boardContainer.append(overlay);
}

function displayAllFlowerCells(totalCells, allCells) {
    for (let i = 0; i < totalCells; i++) {
        const singleCell = allCells[i];

       for (let i = 0; i < flowerCells.length; i++) {
           const indexFlower = flowerCells[i];
           
           if(parseInt(singleCell.textContent) === indexFlower) {
               singleCell.classList.add("flower")
           }
       }
    }
}


/**
 * 
 * @param {number} minNumber - numero minimo da cui partire
 * @param {number} maxNumber - numero massimo possibile 
 * @returns {number}
 */
function generateRandomNum(minNumber = 1, maxNumber = 10) {
    const numRandom = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);

    return numRandom;
}


function orderArray(array) {

const arrayOrdinato = array.sort((a, b) => a - b);

return arrayOrdinato;
}