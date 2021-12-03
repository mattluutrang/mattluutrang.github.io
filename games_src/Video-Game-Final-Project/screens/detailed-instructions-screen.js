/**
 * This file represents the detailed instructions screen that displays the game's more specific gameplay mechanics
 **/

let detailedInstructionsXButton;
let detailedInstructionsWoodenWall;
let detailedInstructionsBoat;
let detailedInstructionsTree;
let detailedInstructionsRock;

function initDetailedInstructionsScreenVariables() {
    detailedInstructionsXButton = new XButton(350, 40);
    detailedInstructionsWoodenWall = new WoodenWall(330, 252);
    detailedInstructionsBoat = new Boat(100, 350, 15, true);
    detailedInstructionsTree = new Tree(90, 105);
    detailedInstructionsRock = new Rock(315, 95);
}

function drawDetailedInstructionsScreen() {
    // draw wave background
    stroke("#639bff");
    fill("#639bff");
    rect(0, 0, 400, 400);


    // draw instructkion screen background
    stroke('#5B270B');
    fill('#5B270B');
    rect(25, 25, 350, 350);

    // draw instructkion borders
    stroke('#DEB887');
    fill('#DEB887');
    rect(25, 25, 350, 5);
    rect(25, 25, 5, 350);
    rect(370, 25, 5, 350);
    rect(25, 370, 350, 5);

    // draw corner line
    stroke('#B68E65');
    fill('#B68E65');
    strokeWeight(1);
    line(25, 25, 30, 30);
    line(375, 25, 370, 30);
    line(25, 375, 30, 370);
    line(370, 370, 375, 375);

    // draw instructions stuff
    stroke(255);
    fill(255);
    textSize(30);
    strokeWeight(0);
    text("Detailed Instructions", 200, 60);


    var inst_strs = [
        "Use a tool by pressing the spacebar",
        "Use a pickaxe to mine rocks",
        "Use an axe to chopdown trees",
        "Swing any tool to attack enemies",
        "Press 'x' to drop any item",
        "Press 'x' to place a wooden wall as a barrier",
        "Press 'z' to eat meat and restore health",
        "Craft a ship and place it to get off the island and win",
    ]
    let startX = 200;
    let startY = 90;
    stroke(200);
    fill(200);
    textSize(12);
    strokeWeight(0);
    for (var i = 0; i < inst_strs.length; i++) {
        text(inst_strs[i], startX, startY + 35 * i);
    }
    image(weaponSprites[11], 310, 110);
    image(weaponSprites[6], 310, 150);
    image(weaponSprites[1], 310, 188);
    detailedInstructionsWoodenWall.draw();
    image(meatImg, 310, 290);


    detailedInstructionsBoat.draw();
    detailedInstructionsBoat.update();
    detailedInstructionsBoat.checkBorders();

    if (!gameStarted) {
        startInstructionsBubblesLeft.draw(true);
        startInstructionsBubblesRight.draw(true);
    }

    if (detailedInstructionsTree.shakeTimer == 0) {
        detailedInstructionsTree.shakeTimer = detailedInstructionsTree.shakeLength;
    }
    if (detailedInstructionsRock.shakeTimer == 0) {
        detailedInstructionsRock.shakeTimer = detailedInstructionsRock.shakeLength;
    }

    detailedInstructionsXButton.draw();
}

function detailedInstructionsScreenClickedLogic() {
    if (detailedInstructionsXClicked()) {
        if (gameStarted) {
            gameState = "instructions";
        }
        else {
            gameState = "startInstructions";
        }
    }
}

function detailedInstructionsXClicked() {
    if (mouseX >= detailedInstructionsXButton.x && mouseY >= detailedInstructionsXButton.y &&
        mouseX <= detailedInstructionsXButton.x + detailedInstructionsXButton.w &&
        mouseY <= detailedInstructionsXButton.y + detailedInstructionsXButton.h) {
        return true;
    }
    return false;
}