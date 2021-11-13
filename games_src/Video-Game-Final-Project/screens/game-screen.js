/**
 * This file represents the game screen where the main game happens
 **/

let inventorySelected;
let mainInventorySquares;

let character;

let inventoryButton;
let menuButton;

let objects;
let enemies;
let trees;
let rocks;
let gameHeight = 2000;
let gameWidth = 2000;
let enemySpawner;

function initGameScreenVariables() {

    inventorySelected = 0;
    mainInventorySquares = [];
    objects = [];
    enemies = [];
    trees = [];
    rocks = [];

    let inventoryLeftSpacer = 56;
    let inventoryTopSpacer = 353;
    let squareWidth = 25;
    let squareMargin = 5;
    for (let i = 0; i < 9; i++) {
        mainInventorySquares.push(new CraftingSquare(inventoryLeftSpacer + (i * (squareWidth + squareMargin)), inventoryTopSpacer));
    }

    mainInventorySquares[0].item = new Sword(mainInventorySquares[0].x, mainInventorySquares[0].y);
    mainInventorySquares[1].item = new Ship(mainInventorySquares[1].x, mainInventorySquares[1].y);
    mainInventorySquares[2].item = new Anchor(mainInventorySquares[2].x, mainInventorySquares[2].y);
    mainInventorySquares[3].item = new Axe(mainInventorySquares[3].x, mainInventorySquares[3].y);
    mainInventorySquares[4].item = new Pickaxe(mainInventorySquares[4].x, mainInventorySquares[4].y);
    mainInventorySquares[5].item = new WoodenWall(mainInventorySquares[5].x, mainInventorySquares[5].y);
    mainInventorySquares[6].item = new Meat(mainInventorySquares[6].x, mainInventorySquares[6].y);

    inventoryButton = new InventoryButton(335, 353);
    menuButton = new MenuButton(335, 368);

    tilemap = new TileMap(gameWidth, gameHeight, 500, 500);

    // figure out where to spawn a player
    var spawnTile = tilemap.getSpawnableTile();
    character = new Character(spawnTile.x, spawnTile.y);
    enemySpawner = new EnemySpawner(width, height, 0.5, 30);
}

function drawGameUI() {
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

    drawHealth(character.health);
}

function drawHealth(health) {
    // draw health
    if (health >= 2) {
        image(rpgIconSprites[0], 12, 352, 10, 10);
    }
    else if (health > 0) {
        image(rpgIconSprites[1], 12, 352, 10, 10);
    }
    else if (health <= 0) {
        image(rpgIconSprites[2], 12, 352, 10, 10);
    }
    if (health >= 4) {
        image(rpgIconSprites[0], 27, 352, 10, 10);
    }
    else if (health > 2) {
        image(rpgIconSprites[1], 27, 352, 10, 10);
    }
    else if (health <= 2) {
        image(rpgIconSprites[2], 27, 352, 10, 10);
    }
    if (health >= 6) {
        image(rpgIconSprites[0], 12, 367, 10, 10);
    }
    else if (health > 4) {
        image(rpgIconSprites[1], 12, 367, 10, 10);
    }
    else if (health <= 4) {
        image(rpgIconSprites[2], 12, 367, 10, 10);
    }
    if (health >= 8) {
        image(rpgIconSprites[0], 27, 367, 10, 10);
    }
    else if (health > 6) {
        image(rpgIconSprites[1], 27, 367, 10, 10);
    }
    else if (health <= 6) {
        image(rpgIconSprites[2], 27, 367, 10, 10);
    }
}

function drawGameScreen() {
    // draw ocean background (this will change)
    //stroke('#254d86');
    fill('#254d86');
    //fill('black');
    rect(0, 0, 400, 400);
    push();
    // translate the screen so that the character is in the middle
    translate(width / 2 - character.x, height / 2 - character.y);
    //tiles.forEach(tile => tile.draw());
    noStroke();
    tilemap.draw();

    // draw randomly generated assets
    trees.forEach(tree => tree.draw());
    rocks.forEach(rock => rock.draw());

    trees = trees.filter(tree => tree.hits < 3);
    rocks = rocks.filter(rock => rock.hits < 3);

    objects.forEach(object => object.draw());


    enemies.forEach(enemy => enemy.draw());
    enemies.forEach(enemy => enemy.update());
    enemies = enemies.filter(enemy => enemy.health > 0);


    ////////// CHARACTER LOGIC //////////////
    // draw character
    character.draw();
    character.update(true);


    if (character.swordSwingTimer > 0) {
        character.swordSwingTimer--;
    }
    pop();

    /////////// DRAW GAME UI //////////////
    drawGameUI();

    ////////////// GAME LOGIC HERE ////////////
    enemySpawner.spawn();
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
        if (isWall(object.name)) {

        }
        else {
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
                    // TODO:Make custom message instead of alert
                    //alert("No inventory available");

                }
            }
            return !collided;
        }
        return true;

    });

    enemies.forEach(enemy => {
        if (checkCollision(enemy, character)) {
            if (enemy.attack != 0) {
                if (character.enemyCollisionTimer == 0) {
                    character.enemyCollisionTimer = character.enemyCollisionTimerLength;
                    character.health -= enemy.attack;
                    if (character.health <= 0) {
                        gameState = "gameOver";
                    }
                }
            }
        }
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
    // attempt to use selected item if "z" is pressed
    if (keyCode == 90) {
        if (mainInventorySquares[inventorySelected].item != null) {
            let selectedItem = mainInventorySquares[inventorySelected].item;
            if (selectedItem.name == "meat") {
                character.health += 2;
                if (character.health > 8) {
                    character.health = 8;
                }
                mainInventorySquares[inventorySelected].item = null;
            }
        }
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
                objects.push(nameToClass(droppedItem.name, character.x - 30, character.y));
            }
            if (character.direction == "right") {
                objects.push(nameToClass(droppedItem.name, character.x + 15, character.y));
            }
            if (character.direction == "none") {
                if (character.state == "left") {
                    objects.push(nameToClass(droppedItem.name, character.x - 30, character.y));
                }
                if (character.state == "right") {
                    objects.push(nameToClass(droppedItem.name, character.x + 15, character.y));
                }
            }
            let droppedObj = objects[objects.length - 1]
            if (droppedObj.name == "wooden-wall") {
                droppedObj.placed = true;
                let tile = tilemap.getCurrTile(droppedObj.x, droppedObj.y);
                //Technically need to make it so that we can't just place anywhere
                // droppedObj.x = tile.x;
                // droppedObj.y = tile.y;
                tilemap.wallBounds.push(new TileBoundingBox(droppedObj.x, droppedObj.y, droppedObj.size, droppedObj.size));
                tile.spawnable = false;
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
