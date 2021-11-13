/**
 * This file represents the starting insctrucions screen that appears right after the title screen
 **/

let startInstructionsBubblesLeft;
let startInstructionsBubblesRight;

let startInstructionsOrc;
let startInstructionsSkeleton;

function initStartInstructionsScreenVariables() {
    startInstructionsBubblesLeft = new Bubbles(387.5, 400);
    startInstructionsBubblesRight = new Bubbles(12.5, 400);
    startInstructionsOrc = new Orc(61, 175);
    startInstructionsSkeleton = new Skeleton(339, 175);
}

function drawStartInstructionsScreen() {
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
    text("Instructions", 200, 60);

    // draw instructions stuff
    stroke(200);
    fill(200);
    textSize(9);
    strokeWeight(0);
    text("Welcome to Island Explorer!", 200, 90);
    text("You are stranded on an island with seemingly no way off.", 200, 105);
    text("Fend off enemies and collect resources to unlock crafting recipes.", 200, 120);
    text("Once you have crafted enough materials, craft a boat to get off the island.", 200, 135);

    // draw controls header
    stroke(255);
    fill(255);
    textSize(25);
    strokeWeight(0);
    text("Controls", 200, 190);

    // options button
    image(woodImg, 125, 325, 75, 20);
    stroke(0);
    fill("#f5712a")
    strokeWeight(1);
    textSize(12);
    text("OPTIONS", 162.5, 185 + 150);

    // more Instructions button
    image(woodImg, 175, 150, 50, 20);
    stroke(0);
    fill("#f5712a")
    strokeWeight(1);
    textSize(12);
    text("More", 200, 160);

    // play button
    image(woodImg, 200, 325, 75, 20);
    stroke(0);
    fill("#f5712a")
    strokeWeight(1);
    textSize(12);
    text("PLAY", 237.5, 185 + 150);

    // draw controls image
    image(keyboardLayoutImg, 75, 210, 250, 100);

    if (startInstructionsOrc.direction == "left") {
        image(meatImg, 61, 175, 15, 15);
    }
    else {
        image(meatImg, 132, 175, 15, 15);
    }
    if (startInstructionsSkeleton.direction == "left") {
        image(meatImg, 266, 177, 15, 15);
    }
    else {
        image(meatImg, 340, 177, 15, 15);
    }

    startInstructionsOrc.drawInstructionsScreenOrc();
    startInstructionsOrc.updateStartInstructionsScreenOrc();
    startInstructionsSkeleton.drawInstructionsScreenSkeleton();
    startInstructionsSkeleton.updateStartInstructionsScreenSkeleton();

    startInstructionsBubblesLeft.draw(true);
    startInstructionsBubblesRight.draw(true);
}

function startInstructionsScreenClickedLogic() {
    if (playClicked()) {
        gameState = "game";
    }
    if (optionsClicked()) {
        gameState = "options";
    }
    if (moreClicked()) {
        gameState = "detailedInstructions";
    }
}

function optionsClicked() {
    if (mouseX >= 125 && mouseY >= 325 &&
        mouseX <= 125 + 75 &&
        mouseY <= 325 + 20) {
        return true;
    }
    return false;
}

function playClicked() {
    if (mouseX >= 200 && mouseY >= 325 &&
        mouseX <= 200 + 75 &&
        mouseY <= 325 + 20) {
        return true;
    }
    return false;
}

function moreClicked() {
    if (mouseX >= 175 && mouseY >= 150 &&
        mouseX <= 175 + 50 &&
        mouseY <= 150 + 20) {
        return true;
    }
    return false;
}