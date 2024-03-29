/**
 * This file represents the crafting screen where the player can manage their inventory and craft more items
 **/

let xOffset = 0.0;
let yOffset = 0.0;

let craftingSquares;
let inventorySquares;
let craftingResultSquare;
let squareClicked;
let craftingXButton;
let craftingRecipesButton;

function initCraftingScreenVariables() {
    craftingSquares = [];
    inventorySquares = [];
    craftingResultSquare = null;
    squareClicked = null;

    var craftingLeftSpacer = 75;
    var craftingTopSpacer = 50;
    var craftingSquareWidth = 25;
    var craftingSquareMargin = 5;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            craftingSquares.push(new CraftingSquare(craftingLeftSpacer + (j * (craftingSquareWidth + craftingSquareMargin)), craftingTopSpacer + (i * (craftingSquareWidth + craftingSquareMargin)), i, j));
        }
    }

    var inventoryLeftSpacer = 50;
    var inventoryTopSpacer = 200;
    var craftingSquareWidth = 25;
    var craftingSquareMargin = 5;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 10; j++) {
            inventorySquares.push(new CraftingSquare(inventoryLeftSpacer + (j * (craftingSquareWidth + craftingSquareMargin)), inventoryTopSpacer + (i * (craftingSquareWidth + craftingSquareMargin)), i, j));
        }
    }

    /*
    inventorySquares[0].item = new Anchor(inventorySquares[0].x, inventorySquares[0].y);
    inventorySquares[1].item = new WoodenWall(inventorySquares[1].x, inventorySquares[1].y);
    inventorySquares[2].item = new WoodenWall(inventorySquares[2].x, inventorySquares[2].y);
    inventorySquares[3].item = new WoodenWall(inventorySquares[3].x, inventorySquares[3].y);
    inventorySquares[4].item = new Wheel(inventorySquares[4].x, inventorySquares[4].y);
    inventorySquares[5].item = new Sail(inventorySquares[5].x, inventorySquares[5].y);
    inventorySquares[6].item = new Stick(inventorySquares[6].x, inventorySquares[6].y);
    inventorySquares[7].item = new Stone(inventorySquares[7].x, inventorySquares[7].y);
    inventorySquares[8].item = new DragonHead(inventorySquares[8].x, inventorySquares[8].y);
    inventorySquares[9].item = new Feather(inventorySquares[9].x, inventorySquares[9].y);
    */

    craftingResultSquare = new CraftingSquare(250, 80);
    craftingXButton = new XButton(350, 40);
    // TODO: Replace with book icon button?
    craftingRecipesButton = new Button(180, 140, 80, 20, "#cba56c", "Recipes", 15,);
}

function drawCraftingScreen() {
    sunsetBackground();
    // draw crafting screen background
    stroke('#997949');
    fill('#997949');
    rect(25, 25, 350, 350);

    // draw trash button
    image(trashImg, 343, 343, 15, 15);

    // draw crafting squares
    craftingSquares.forEach(square => square.draw());
    // draw inventory squares
    inventorySquares.forEach(square => square.draw());
    // draw main inventory squares
    mainInventorySquares.forEach(square => square.draw());
    // draw inventory square numbers
    for (let i = 1; i <= 9; i++) {
        stroke(255);
        fill(255);
        strokeWeight(0);
        textSize(5)
        text(i, 58 + ((i - 1) * 30) + 10, 358 - 15);
    }
    // draw crafting result square
    craftingResultSquare.draw();

    // draw crafting screen buttons
    craftingRecipesButton.draw();

    // draw x button
    craftingXButton.draw();

    // draw crafting result arrow
    stroke('#cba56c');
    fill('#cba56c');
    rect(190, 90, 20, 5);
    triangle(210, 85, 210, 100, 220, 92);

    // draw inventory square items
    inventorySquares.forEach(square => {
        if (square.item != null) {
            square.item.draw();
        }
    });
    // draw crafting square items
    craftingSquares.forEach(square => {
        if (square.item != null) {
            square.item.draw();
        }
    });
    // draw main inventory square items
    mainInventorySquares.forEach(square => {
        if (square.item != null) {
            square.item.draw();
        }
    });

    // draw crafting result item
    if (craftingResultSquare.item != null) {
        craftingResultSquare.item.draw();
    }
}

function updateCraftingResult() {
    let craftingGrid = {};
    craftingSquares.forEach(square => {
        let key = square.i + "|" + square.j;
        craftingGrid[key] = square.item;
    });
    // crafing logic, probabably move to a separate function in a separte file later
    let craftResult = getCraftingResult(craftingGrid);
    craftingResultSquare.item = craftResult;
    image(trashImg, 343, 343, 15, 15);
}

function craftingScreenPressedLogic() {
    inventorySquares.forEach(square => {
        let item = square.item;
        if (item != null && mouseX >= item.x && mouseY >= item.y && mouseX <= item.x + item.w && mouseY <= item.y + item.h) {
            squareClicked = square;
            xOffset = mouseX - item.x - item.w;
            yOffset = mouseY - item.y - item.h;
        }
    });
    craftingSquares.forEach(square => {
        let item = square.item;
        if (item != null && mouseX >= item.x && mouseY >= item.y && mouseX <= item.x + item.w && mouseY <= item.y + item.h) {
            squareClicked = square;
            xOffset = mouseX - item.x - item.w;
            yOffset = mouseY - item.y - item.h;
        }
    });
    mainInventorySquares.forEach(square => {
        let item = square.item;
        if (item != null && mouseX >= item.x && mouseY >= item.y && mouseX <= item.x + item.w && mouseY <= item.y + item.h) {
            squareClicked = square;
            xOffset = mouseX - item.x - item.w;
            yOffset = mouseY - item.y - item.h;
        }
    });
    let item = craftingResultSquare.item;
    if (item != null && mouseX >= item.x && mouseY >= item.y && mouseX <= item.x + item.w && mouseY <= item.y + item.h) {
        squareClicked = craftingResultSquare;
        xOffset = mouseX - item.x - item.w;
        yOffset = mouseY - item.y - item.h;

        if (objectiveNum == 1 && item.name == "axe") {
            objectiveNum++;
        }
        if (objectiveNum == 3 && item.name == "pickaxe") {
            objectiveNum++;
        }
        if (objectiveNum == 5 && item.name == "sword") {
            objectiveNum++;
        }
        if (item.name == "ship") {
            gameState = "victory";
        }
    }
}

function craftingScreenReleasedLogic() {
    if (squareClicked != null) {
        // if the item is the crafting result
        if (squareClicked == craftingResultSquare) {
            let itemPlaced = false;
            inventorySquares.forEach(square => {
                if (mouseX >= square.x && mouseY >= square.y && mouseX <= square.x + square.w && mouseY <= square.y + square.h && square.item == null) {
                    square.item = squareClicked.item;
                    squareClicked.item = null;
                    square.item.x = square.x;
                    square.item.y = square.y;
                    itemPlaced = true;
                }
            });
            mainInventorySquares.forEach(square => {
                if (mouseX >= square.x && mouseY >= square.y && mouseX <= square.x + square.w && mouseY <= square.y + square.h && square.item == null) {
                    square.item = squareClicked.item;
                    squareClicked.item = null;
                    square.item.x = square.x;
                    square.item.y = square.y;
                    itemPlaced = true;
                }
            });

            if (!itemPlaced) {
                squareClicked.item.x = squareClicked.x;
                squareClicked.item.y = squareClicked.y;
            }
            else {
                craftingSquares.forEach(square => {
                    square.item = null;
                });
                objectsCrafted++;
            }
        }
        // if the item is any other square
        else {
            let itemPlaced = false;
            craftingSquares.forEach(square => {
                if (mouseX >= square.x && mouseY >= square.y && mouseX <= square.x + square.w && mouseY <= square.y + square.h && square.item == null) {
                    square.item = squareClicked.item;
                    squareClicked.item = null;
                    square.item.x = square.x;
                    square.item.y = square.y;
                    itemPlaced = true;
                    square.pastSquare = squareClicked;
                }
            });
            inventorySquares.forEach(square => {
                if (mouseX >= square.x && mouseY >= square.y && mouseX <= square.x + square.w && mouseY <= square.y + square.h && square.item == null) {
                    square.item = squareClicked.item;
                    squareClicked.item = null;
                    square.item.x = square.x;
                    square.item.y = square.y;
                    itemPlaced = true;
                }
            });
            mainInventorySquares.forEach(square => {
                if (mouseX >= square.x && mouseY >= square.y && mouseX <= square.x + square.w && mouseY <= square.y + square.h && square.item == null) {
                    square.item = squareClicked.item;
                    squareClicked.item = null;
                    square.item.x = square.x;
                    square.item.y = square.y;
                    itemPlaced = true;
                }
            });

            if (!itemPlaced) {
                squareClicked.item.x = squareClicked.x;
                squareClicked.item.y = squareClicked.y;
            }
            updateCraftingResult();

            if (mouseX >= 343 && mouseY >= 343 && mouseX <= 343 + 15 && mouseY <= 343 + 15) {
                squareClicked.item = null;
            }
        }
    }
    squareClicked = null;
}

function craftingScreenDraggedLogic() {
    if (squareClicked != null) {
        squareClicked.item.x = mouseX + xOffset;
        squareClicked.item.y = mouseY + yOffset;
    }
}

function craftingScreenClickedLogic() {
    if (craftingXClicked()) {
        switchToGame();
        prevGameState = "crafting"
        gameState = "game";
    }
    if (craftingRecipesButton.isClicked()) {
        prevGameState = "crafting"
        gameState = "craftingRecipes";
    }
}

function craftingXClicked() {
    if (mouseX >= craftingXButton.x && mouseY >= craftingXButton.y &&
        mouseX <= craftingXButton.x + craftingXButton.w &&
        mouseY <= craftingXButton.y + craftingXButton.h) {
        return true;
    }
    return false;
}

function craftingScreenKeyPressedLogic() {
    // close crafint screen if "e" is pressed
    if (keyCode == 69) {
        switchToGame();
        gameState = "game"
    }
}

function switchToGame() {
    // move crafting square items to past square
    craftingSquares.forEach(square => {
        if (square.item != null) {
            square.pastSquare.item = square.item;
            square.pastSquare.item.x = square.pastSquare.x;
            square.pastSquare.item.y = square.pastSquare.y;
            square.item = null;
        }
    });

    // move main inventoy squares back down
    mainInventorySquares.forEach(square => {
        square.x -= 10;
        square.y += 15;
        if (square.item != null) {
            square.item.x = square.x;
            square.item.y = square.y;
        }
    });
}

class CraftingSquare {

    constructor(x, y, i, j) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;

        this.i = i;
        this.j = j;

        this.item = null;

        this.pastSquare = null;
    }

    draw() {
        stroke('#cba56c');
        fill('#cba56c');
        rect(this.x, this.y, this.w, this.h);
    }
}

class XButton {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 10;
        this.h = 10;
    }

    draw() {
        // draw x button
        stroke('#E55A47');
        fill('#E55A47');
        rect(this.x, this.y, 10, 10);
        // draw x
        stroke(255);
        fill(255);
        textSize(7);
        strokeWeight(0);
        text("X", this.x + 5, this.y + 5);

    }
}

