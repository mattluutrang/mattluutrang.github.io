let optionsXButton;
let optionsDragon;
let optionsChicken;
let optionsSkeleton;
let optionsBoat;

function initOptionsScreenVariables() {
    optionsXButton = new XButton(350, 40);
    optionsChicken = new Chicken(280, 110, 25);
    optionsSkeleton = new Skeleton(288, 190, 40);
    optionsDragon = new Dragon(288, 265, 40);
    optionsBoat = new p5.Vector(110, 110);
}

function drawOptionsScreen() {
    if (gameStarted) {
        tiles.forEach(tile => tile.draw());
    }

    // draw instruction screen background
    stroke('#5B270B');
    fill('#5B270B');
    rect(25, 25, 350, 350);

    // draw instruction borders
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

    // draw options stuff
    stroke(255);
    fill(255);
    textSize(30);
    strokeWeight(0);
    text("Options", 200, 60);

    // draw buttons
    stroke("green");
    fill("green");
    image(woodImg, 75, 100, 250, 50);
    text("Easy", 200, 125);

    // draw buttons
    stroke("yellow");
    fill("yellow");
    image(woodImg, 75, 175, 250, 50);
    text("Medium", 200, 200);

    // draw buttons
    stroke("red");
    fill("red");
    image(woodImg, 75, 250, 250, 50);
    text("Hard", 200, 275);
    // draw dragon
    optionsDragon.draw();
    optionsSkeleton.draw();
    optionsChicken.draw();
    // draw x button
    optionsXButton.draw();

    // draw the selector boat
    image(boatSprites[0], optionsBoat.x, optionsBoat.y, 30)
}

function optionsScreenClickedLogic() {
    if (difficultyOptionClicked() || optionXClicked()) {
        if (gameStarted) {
            gameState = "menu"
        }
        else {
            gameState = "startInstructions"
        }
    }
}

function difficultyOptionClicked() {
    if (mouseX >= 75 && mouseY >= 100 &&
        mouseX <= 75 + 250 &&
        mouseY <= 100 + 50) {
        return true;
    }
    if (mouseX >= 75 && mouseY >= 175 &&
        mouseX <= 75 + 250 &&
        mouseY <= 175 + 50) {
        return true;
    }
    if (mouseX >= 75 && mouseY >= 250 &&
        mouseX <= 75 + 250 &&
        mouseY <= 250 + 50) {
        return true;
    }
    return false;
}

function optionXClicked() {
    if (mouseX >= menuXButton.x && mouseY >= menuXButton.y &&
        mouseX <= menuXButton.x + menuXButton.w &&
        mouseY <= menuXButton.y + menuXButton.h) {
        return true;
    }
    return false;
}

function optionsScreenMouseHover() {
    if (mouseX >= 75 && mouseY >= 100 &&
        mouseX <= 75 + 250 &&
        mouseY <= 100 + 50) {
        optionsBoat.y = 108;
        optionsChicken.stopFlag = false;
    }
    else {
        optionsChicken.stopFlag = true;
    }
    if (mouseX >= 75 && mouseY >= 175 &&
        mouseX <= 75 + 250 &&
        mouseY <= 175 + 50) {
        optionsBoat.y = 183;
        optionsSkeleton.stopFlag = false;
    }
    else {
        optionsSkeleton.stopFlag = true;
    }
    if (mouseX >= 75 && mouseY >= 250 &&
        mouseX <= 75 + 250 &&
        mouseY <= 250 + 50) {
        optionsBoat.y = 258;
        optionsDragon.stopFlag = false;
    }
    else {
        optionsDragon.stopFlag = true;
    }
}