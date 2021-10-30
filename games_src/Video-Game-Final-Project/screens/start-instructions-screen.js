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
    text("Welcome to Island Explorer!", 200, 100);
    text("You are stranded on an island with seemingly no way off.", 200, 115);
    text("Fend off enemies and collect resources to unlock crafting recipes.", 200, 130);
    text("Once you have crafted enough materials, craft a boat to get off the island.", 200, 145);

    // draw controls header
    stroke(255);
    fill(255);
    textSize(25);
    strokeWeight(0);
    text("Controls", 200, 180);

    // play button
    image(woodImg, 200, 325, 50, 20);
    stroke(0);
    fill("#f5712a")
    strokeWeight(1);
    textSize(12);
    text("PLAY", 225, 185 + 150);

    // play button
    image(woodImg, 150, 325, 50, 20);
    stroke(0);
    fill("#f5712a")
    strokeWeight(1);
    textSize(12);
    text("OPTIONS", 175, 185 + 150);
    // draw controls image
    image(keyboardLayoutImg, 75, 210, 250, 100);
}

function startInstructionsScreenClickedLogic() {
    if (playClicked()) {
        gameState = "game"
    }
    if (optionsClicked()) {
        gameState = "options"
    }
}

function optionsClicked() {
    if (mouseX >= 150 && mouseY >= 325 &&
        mouseX <= 150 + 50 &&
        mouseY <= 325 + 30) {
        return true;
    }
    return false;
}

function playClicked() {
    if (mouseX >= 200 && mouseY >= 325 &&
        mouseX <= 200 + 50 &&
        mouseY <= 325 + 30) {
        return true;
    }
    return false;
}