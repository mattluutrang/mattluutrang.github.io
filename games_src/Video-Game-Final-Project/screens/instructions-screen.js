/**
 * This file represents the instructions screen that displays the game's instructions and controls
 **/

let instructionsXButton;
let instructionsOrc;
let instructinosChicken;

function initInstructionsScreenVariables() {
    instructionsXButton = new XButton(350, 40);
    instructionsOrc = new Orc(75, 160);
    instructionsChicken = new Chicken(75, 180);
}

function drawInstructionsScreen() {

    tilemap.draw();
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
    text("Instructions", 200, 60);

    // draw instructions stuff
    stroke(200);
    fill(200);
    textSize(9);
    strokeWeight(0);
    text("Welcome to Island Explorer!", 200, 85);
    text("You are stranded on an island with seemingly no way off.", 200, 100);
    text("Fend off enemies and collect resources to unlock crafting recipes.", 200, 115);
    text("Once you have crafted enough materials, craft a boat to get off the island.", 200, 130);

    // more Instructions button
    image(woodImg, 175, 140, 50, 20);
    stroke(0);
    fill("#f5712a")
    strokeWeight(1);
    textSize(12);
    text("More", 200, 150);

    // draw controls header
    stroke(240);
    fill(240);
    textSize(25);
    strokeWeight(0);
    text("Controls", 200, 220);

    // draw controls image
    image(keyboardLayoutImg, 75, 250, 250, 100);

    instructionsOrc.drawInstructionsScreenOrc();
    instructionsOrc.updateInstructionsScreenOrc();
    instructionsChicken.drawInstructionsScreenChicken();
    instructionsChicken.updateInstructionsScreenChicken();

    // draw x button
    instructionsXButton.draw();
}

function instructionsScreenClickedLogic() {
    if (instructionXClicked()) {
        gameState = "menu";
    }
    if (instructionsMoreClicked()) {
        gameState = "detailedInstructions";
    }
}

function instructionXClicked() {
    if (mouseX >= menuXButton.x && mouseY >= menuXButton.y &&
        mouseX <= menuXButton.x + menuXButton.w &&
        mouseY <= menuXButton.y + menuXButton.h) {
        return true;
    }
    return false;
}

function instructionsMoreClicked() {
    if (mouseX >= 175 && mouseY >= 140 &&
        mouseX <= 175 + 50 &&
        mouseY <= 140 + 20) {
        return true;
    }
    return false;
}