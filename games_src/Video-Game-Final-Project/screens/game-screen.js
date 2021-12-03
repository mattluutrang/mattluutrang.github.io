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
let projectiles;
let swordbeams;
let spawnFlags;
let reduceFlags;
let killCounts;
let targetKillCounts;
let enemyCounts;
let reduceKillCounts;
let enemyNames;
let trees;
let rocks;
let gameHeight = 2000;
let gameWidth = 2000;
let enemySpawner;
let hardEnemySpawner;
let enemiesKilled = 0;
let spawnBoss;
let difficulty = EASY;

let objectiveNum = 0;
let objectiveStrings = [];

// stats
let treesChopped;
let rocksMined;
let objectsCrafted;
let meatEaten;
let bossKilled;

function initGameScreenVariables() {
    inventorySelected = 0;
    mainInventorySquares = [];
    objects = [];
    enemies = [];
    // chicken, skeleton, orc, necromancer, ghost
    enemyNames = ['chicken', 'skeleton', 'orc', 'necromancer', 'ghost'];
    killCounts = [0, 0, 0, 0, 0];
    spawnFlags = [1, 0, 0, 0, 0];
    reduceFlags = [0, 0, 0, 0, 0];
    enemyCounts = [0, 0, 0, 0, 0];
    targetKillCounts = [5, 5, 5, 5, 5];
    mobCapsCounts = [15, 5, 5, 5, 5];
    reduceKillCounts = [20, 10, 20, 5, 5];
    reduceAmounts = [2, 4, 2, 3, 3];
    projectiles = [];
    swordbeams = [];
    trees = [];
    rocks = [];
    spawnBoss = false;
    bossKilled = false;

    let inventoryLeftSpacer = 56;
    let inventoryTopSpacer = 353;
    let squareWidth = 25;
    let squareMargin = 5;
    for (let i = 0; i < 9; i++) {
        mainInventorySquares.push(new CraftingSquare(inventoryLeftSpacer + (i * (squareWidth + squareMargin)), inventoryTopSpacer));
    }

    /*
    mainInventorySquares[0].item = new Sword(mainInventorySquares[0].x, mainInventorySquares[0].y);
    mainInventorySquares[0].item = new Sword(mainInventorySquares[0].x, mainInventorySquares[0].y);
    mainInventorySquares[0].item = new Sword(mainInventorySquares[0].x, mainInventorySquares[0].y);
    mainInventorySquares[1].item = new Ship(mainInventorySquares[1].x, mainInventorySquares[1].y);
    mainInventorySquares[2].item = new Anchor(mainInventorySquares[2].x, mainInventorySquares[2].y);
    mainInventorySquares[3].item = new Axe(mainInventorySquares[3].x, mainInventorySquares[3].y);
    mainInventorySquares[4].item = new Pickaxe(mainInventorySquares[4].x, mainInventorySquares[4].y);
    mainInventorySquares[5].item = new WoodenWall(mainInventorySquares[5].x, mainInventorySquares[5].y);
    mainInventorySquares[6].item = new Meat(mainInventorySquares[6].x, mainInventorySquares[6].y);
    */

    inventoryButton = new InventoryButton(335, 353);
    menuButton = new MenuButton(335, 368);

    tilemap = new TileMap(gameWidth, gameHeight, 500, 500);

    // figure out where to spawn a player
    var spawnTile = tilemap.getSpawnableTile();
    character = new Character(spawnTile.x, spawnTile.y);
    enemySpawner = new EnemySpawner(width, height, enemyNames, [0.25, 0.15, 0.18, 0.18, 0.18], [0, 5, 10, 15, 20], mobCapsCounts);
    bossSpawner = new BossSpawner(width, height);
    enemiesKilled = 0;

    objectiveNum = 0;

    // GOD MODE
    /*
    objectiveNum = 5;
    character.speed = 10;
    character.attack = 1;
    character.health = 100;
    enemySpawner = new EnemySpawner(width, height, enemyNames, [0.4, 0.4, 0.4, 0.4, 0.4], [0, 5, 10, 15, 20]);
    */

    objectiveStrings.push("Pick up materials on the ground")
    objectiveStrings.push("Craft an axe")
    objectiveStrings.push("Mine a tree using the axe")
    objectiveStrings.push("Craft a pickaxe")
    objectiveStrings.push("Mine a rock using the pickaxe")
    objectiveStrings.push("Craft a sword")
    objectiveStrings.push("Kill 5 chickens")
    objectiveStrings.push("Kill 5 skeletons")
    objectiveStrings.push("Kill 5 orcs")
    objectiveStrings.push("Kill 5 necromancers")
    objectiveStrings.push("Kill 5 ghosts")
    objectiveStrings.push("Kill the dragon")
    objectiveStrings.push("Get resources to craft a ship!")

    // add intitial starting objects
    objects.push(new Stone(character.x + 20, character.y + 10));
    objects.push(new Stone(character.x - 20, character.y - 10));
    objects.push(new Stone(character.x - 40, character.y + 10));
    objects.push(new Stone(character.x + 0, character.y - 30));
    objects.push(new Stone(character.x + 10, character.y + 20));
    objects.push(new Stick(character.x - 20, character.y + 10));
    objects.push(new Stick(character.x + 20, character.y - 10));

    // init stats
    treesChopped = 0;
    rocksMined = 0;
    objectsCrafted = 0;
    meatEaten = 0;
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

    // draw objective bar
    fill(0, 0, 0, 150);
    rect(50, 10, 300, 50);

    textSize(15);
    fill(255);
    text(objectiveStrings[objectiveNum], 200, 35);
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

    // draw enemies
    enemies.forEach(enemy => enemy.draw());
    enemies.forEach(enemy => {
        enemy.update();
        if (enemy.health <= 0) {
            enemiesKilled += 1;
            killCounts[enemyNames.indexOf(enemy.name)]++;
            enemyCounts[enemyNames.indexOf(enemy.name)]--;
            if (enemy.name == "dragon" && objectiveNum == 11) {
                objectiveNum++;
                objects.push(new DragonHead(enemy.x, enemy.y));
                bossKilled = true;
                for (let i = 0; i < killCounts.length; i++) {
                    enemySpawner.decreaseSpawnRates(i, 2);
                }
            }
        }
    });
    enemies = enemies.filter(enemy => enemy.health > 0);

    projectiles.forEach(projectile => projectile.draw());
    projectiles.forEach(projectile => {
        projectile.update();
    });
    projectiles = projectiles.filter(projectile => projectile.active);

    swordbeams.forEach(beam => beam.draw());
    swordbeams.forEach(beam => {
        beam.update();
    });
    swordbeams = swordbeams.filter(beam => beam.active);

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
    // Update the spawn flags
    for (let i = 0; i < killCounts.length - 1; i++) {
        if (i == 0) {
            objectiveStrings[6 + i] = "Kill " + (5 - killCounts[i]) + " chickens";
        }
        if (i == 1) {
            objectiveStrings[6 + i] = "Kill " + (5 - killCounts[i]) + " skeletons";
        }
        if (i == 2) {
            objectiveStrings[6 + i] = "Kill " + (5 - killCounts[i]) + " orcs";
        }
        if (i == 3) {
            objectiveStrings[6 + i] = "Kill " + (5 - killCounts[i]) + " necromancers";
        }
        if (killCounts[i] >= targetKillCounts[i]) {
            if (objectiveNum == 6 + i) {
                objectiveNum++;
            }
            spawnFlags[i + 1] = 1
        }
    }
    objectiveStrings[6 + 4] = "Kill " + (5 - killCounts[4]) + " ghosts";
    if (killCounts[killCounts.length - 1] >= targetKillCounts[killCounts.length - 1]) {
        if (objectiveNum == 6 + 4) {
            objectiveNum++;
        }
        if (!spawnBoss) {
            bossEntranceSoundEffect.play();
        }
        spawnBoss = true;
    }

    // Once every 10 seconds, check if we should update the spawn rates once a certain amount of each enemies have been killed
    if (frameCount % 600 == 0) {
        for (let i = 0; i < killCounts.length; i++) {
            if (killCounts[i] >= reduceKillCounts[i]) {
                reduceFlags[i]++;
                if (reduceFlags[i] == 1) {
                    enemySpawner.decreaseSpawnRates(i, reduceAmounts[i]);
                }
            }
        }
    }

    if (spawnBoss) {
        bossSpawner.spawn();
    }
    enemySpawner.spawn(spawnFlags);
    detectCollisions();

    // if collected all objects, increase objective number
    if (objectiveNum == 0 && objects.length == 0) {
        objectiveNum++;
    }
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
                pickupSoundEffect.play();
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
                    hurtSoundEffect.play();
                    if (character.health <= 0) {
                        gameState = "gameOver";
                    }
                }
            }
        }
    });

    projectiles.forEach(projectile => {
        if (projectile.hitCharacter) {
            if (projectile.attack != 0) {
                if (character.enemyCollisionTimer == 0) {
                    character.enemyCollisionTimer = character.enemyCollisionTimerLength;
                    character.health -= projectile.attack;
                    hurtSoundEffect.play();
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
    if (keyCode == 32 && character.swingTimer == 160 && isTool(mainInventorySquares[inventorySelected].item.name)) {
        character.swingTimer = 0;
        swingSoundEffect.play();
    }
    // attempt to use selected item if "z" is pressed
    if (keyCode == 90) {
        if (mainInventorySquares[inventorySelected].item != null) {
            let selectedItem = mainInventorySquares[inventorySelected].item;
            if (selectedItem.name == "meat") {
                meatEaten++;
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
    // throw sword beam if "c" is pressed
    if (keyCode == 67 && character.swordBeamTimer == 0 && mainInventorySquares[inventorySelected].item.name == "sword" && character.swingTimer == 160) {
        character.swordBeamTimer = character.swordBeamTimerMax;
        character.swingTimer = 0;
        swingSoundEffect.play();
        if (character.direction == "left") {
            swordbeams.push(new SwordBeam(character.x - 30, character.y + 8, PI));
        }
        if (character.direction == "right") {
            swordbeams.push(new SwordBeam(character.x + 30, character.y + 8, 0));
        }
        if (character.direction == "none") {
            if (character.state == "left") {
                swordbeams.push(new SwordBeam(character.x - 30, character.y + 8, PI));
            }
            if (character.state == "right") {
                swordbeams.push(new SwordBeam(character.x + 30, character.y + 8, 0));
            }
        }
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
