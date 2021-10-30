let inventorySelected = 0;
let mainInventorySquares = [];

let character;

let inventoryButton;
let menuButton;

let objects = [];
let enemies = [];

function initGameScreenVariables() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            objects.push(new Stone(100 + j * 15, 100 + i * 30));
        }
        for (let j = 5; j < 10; j++) {
            objects.push(new Stick(100 + j * 15, 100 + i * 30));
        }
    }

    let inventoryLeftSpacer = 56;
    let inventoryTopSpacer = 353;
    let squareWidth = 25;
    let squareMargin = 5;
    for (let i = 0; i < 9; i++) {
        mainInventorySquares.push(new CraftingSquare(inventoryLeftSpacer + (i * (squareWidth + squareMargin)), inventoryTopSpacer));
    }

    mainInventorySquares[0].item = new Sword(mainInventorySquares[0].x, mainInventorySquares[0].y);
    mainInventorySquares[1].item = new Stone(mainInventorySquares[1].x, mainInventorySquares[1].y);
    mainInventorySquares[2].item = new Stick(mainInventorySquares[2].x, mainInventorySquares[2].y);

    inventoryButton = new InventoryButton(335, 353);
    menuButton = new MenuButton(335, 368);

    character = new Character(200, 300);

    enemies.push(new Chicken(200, 250, 15));


}

function drawGameScreen() {
    // draw ocean background (this will change)
    stroke('#ADD8E6');
    fill('#ADD8E6');
    rect(0, 0, 400, 400);
    tiles.forEach(tile => tile.draw());

    objects.forEach(object => object.draw());


    enemies.forEach(enemy => enemy.draw());
    enemies.forEach(enemy => enemy.update());


    ////////// CHARACTER LOGIC //////////////
    // draw character
    character.draw();
    character.update();


    if (character.swordSwingTimer > 0) {
        character.swordSwingTimer--;
    }

    ///////////////////////////////////////

    // draw inventory bar
    stroke('#997949');
    fill('#997949');
    rect(50, 350, 280, 31);

    // draw selected inventory border
    stroke('#EAC35C');
    fill('#EAC35C');
    let inventoryLeftSpacer = 56;
    let inventoryTopSpacer = 353;
    let squareWidth = 25;
    let squareMargin = 5;
    rect(inventoryLeftSpacer + (inventorySelected * (squareWidth + squareMargin)) - 1, inventoryTopSpacer - 1, squareWidth + 2, squareWidth + 2);

    // draw inventory squares
    mainInventorySquares.forEach(square => {
        square.draw();
        if (square.item != null) {
            square.item.draw();
        }
    });
    // draw inventory square numbers
    for (let i = 1; i <= 9; i++) {
        stroke(255);
        fill(255);
        strokeWeight(0);
        textSize(5)
        text(i, 58 + ((i - 1) * 30), 358);
    }

    // draw "to inventory" button
    inventoryButton.draw();
    // draw "to menu" button
    menuButton.draw();

    ////////////// GAME LOGIC HERE ////////////

    detectCollisions();
}

function detectCollisions() {
    function checkCollision(box1, box2) {
        return (box1.boundX < box2.boundX + box2.boundW &&
            box1.boundX + box1.boundW > box2.boundX &&
            box1.boundY < box2.boundY + box2.boundH &&
            box1.boundY + box1.boundH > box2.boundY);
    }

    objects = objects.filter(object => {
        let collided = checkCollision(object, character);

        // add to inventory
        if (collided) {
            let mainInventorySpotFound = false;
            // put into first main invenory spot open
            for (let i = 0; i < 9; i++) {
                if (mainInventorySquares[i].item == null) {
                    mainInventorySquares[i].item = nameToClass(object.name, mainInventorySquares[i].x, mainInventorySquares[i].y);
                    mainInventorySpotFound = true;
                    break;
                }
            }
            // if no spots availabe, put into inventory
            let inventorySpotFound = false;
            if (!mainInventorySpotFound) {
                for (let i = 0; i < 40; i++) {
                    if (inventorySquares[i].item == null) {
                        inventorySquares[i].item = nameToClass(object.name, inventorySquares[i].x, inventorySquares[i].y);
                        inventorySpotFound = true;
                        break;
                    }
                }
            }
            if (!mainInventorySpotFound && !inventorySpotFound) {
                alert("No inventory available");
            }
        }

        return !collided;
    });
}

function gameScreenKeyPressedLogic() {
    // select inventory based on num pressed
    if (keyCode >= 49 && keyCode <= 57) {
        inventorySelected = keyCode - 49;
    }
    // swing sword if spacebar is pressed
    if (keyCode == 32 && character.swingTimer == 160) {
        character.swingTimer = 0;
    }
    // switch to crafting inventory if "e" is pressed
    if (keyCode == 69) {
        switchToCrafting();
        gameState = "crafting"
    }
    // switch to menu screen if "m" is pressed
    if (keyCode == 77) {
        gameState = "menu"
    }
    // drop item if "x" is pressed
    if (keyCode == 88) {
        if (mainInventorySquares[inventorySelected].item != null) {
            let droppedItem = mainInventorySquares[inventorySelected].item;
            mainInventorySquares[inventorySelected].item = null;
     
            if (character.direction == "left") {
                objects.push(nameToClass(droppedItem.name, character.x - 20, character.y));
            }
            if (character.direction == "right") {
                objects.push(nameToClass(droppedItem.name, character.x + 10, character.y));
            }
            if (character.direction == "none") {
                if (character.state == "left") {
                    objects.push(nameToClass(droppedItem.name, character.x - 20, character.y));
                }
                if (character.state == "right") {
                    objects.push(nameToClass(droppedItem.name, character.x + 10, character.y)); 
                }
            }
        }
    }
}

function gameScreenClickedLogic() {
    let i = 0;
    mainInventorySquares.forEach(square => {
        if (mouseX >= square.x && mouseY >= square.y && mouseX <= square.x + square.w && mouseY <= square.y + square.h) {
            inventorySelected = i;
        }
        i++;
    });

    if (mouseX >= inventoryButton.x && mouseY >= inventoryButton.y && mouseX <= inventoryButton.x + inventoryButton.w && mouseY <= inventoryButton.y + inventoryButton.h) {
        switchToCrafting();
        gameState = "crafting";
    }
    if (mouseX >= menuButton.x && mouseY >= menuButton.y && mouseX <= menuButton.x + menuButton.w && mouseY <= menuButton.y + menuButton.h) {
        gameState = "menu";
    }
}

function switchToCrafting() {
    mainInventorySquares.forEach(square => {
        square.x += 10;
        square.y -= 15;
        if (square.item != null) {
            square.item.x = square.x;
            square.item.y = square.y;
        }
    });

    craftingResultSquare.item = null;
}

class InventoryButton {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.w = 40;
        this.h = 10;
    }

    draw() {
        // draw button
        stroke('#997949');
        fill('#997949');
        rect(this.x, this.y, this.w, this.h);

        // draw text
        strokeWeight(0);
        stroke(255);
        fill(255);
        textFont('arial')
        text("Inventory (e)", this.x + this.w / 2, this.y + this.h / 2)
    }
}

class MenuButton {

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.w = 40;
        this.h = 10;
    }

    draw() {
        // draw button
        stroke('#997949');
        fill('#997949');
        rect(this.x, this.y, this.w, this.h);

        // draw text
        stroke(255);
        fill(255);
        text("Menu (m)", this.x + this.w / 2, this.y + this.h / 2);
    }
}
