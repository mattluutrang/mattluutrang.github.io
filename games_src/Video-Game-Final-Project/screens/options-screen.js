/**
 * This file represents the options screen where the user can change the game's difficulty
 **/


let optionsXButton;
let optionsDragon;
let optionsChicken;
let optionsSkeleton;
let optionsBoat;
let optionsSoundSlider;
let optionsScreenShown;

function initOptionsScreenVariables() {
    optionsXButton = new XButton(350, 40);
    optionsChicken = new Chicken(280, 110, 25);
    optionsSkeleton = new Skeleton(288, 190, 40);
    optionsDragon = new Dragon(288, 265, 40);
    optionsBoat = new p5.Vector(110, 110);
    optionsEasyButton = new Button(75, 100, 250, 50, "white", "Easy", 30, "green", playerFont, woodImg);
    optionsMediumButton = new Button(75, 175, 250, 50, "white", "Medium", 30, "yellow", playerFont, woodImg);
    optionsHardButton = new Button(75, 250, 250, 50, "white", "Hard", 30, "red", playerFont, woodImg);
    //optionsSoundSlider = new Slider(150, 325, 0, 100, 50, ["white", "blue", "red"], 175);
    optionsScreenShown = false;
    optionsSoundSlider = createSlider(0, 100, 100);
    optionsSoundSlider.hide();
}

function drawOptionsScreen() {
    if (!optionsScreenShown) {
        optionsSoundSlider.show();
        optionsScreenShown = true;
    }
    // draw wave background
    stroke("#639bff");
    fill("#639bff");
    rect(0, 0, 400, 400);

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
    optionsEasyButton.draw();
    optionsMediumButton.draw();
    optionsHardButton.draw();

    // draw enemies
    optionsDragon.draw();
    optionsSkeleton.draw();
    optionsChicken.draw();
    // draw x button
    optionsXButton.draw();

    // draw the selector boat
    image(boatSprites[0], optionsBoat.x, optionsBoat.y, 30);

    // Draw sound slider stuff
    textSize(20);
    optionsSoundSlider.position(150, 325);
    text("Sound", optionsSoundSlider.x - 40, optionsSoundSlider.y + 10);
    //optionsSoundSlider.draw();
    let soundSliderValue = optionsSoundSlider.value();
    outputVolume(0.01 * soundSliderValue);

    if (!gameStarted) {
        startInstructionsBubblesLeft.draw(true);
        startInstructionsBubblesRight.draw(true);
    }
}

function optionsScreenClickedLogic() {
    if (difficultyOptionClicked() || optionXClicked()) {
        optionsScreenShown = false;
        optionsSoundSlider.hide();
        if (gameStarted) {
            gameState = "menu"
        }
        else {
            gameState = "startInstructions"
        }
    }
}

function difficultyOptionClicked() {
    // Set difficulty based on constants set in constants.js
    if (optionsEasyButton.isClicked()) {
        difficulty = EASY;
        return true;
    }
    if (optionsMediumButton.isClicked()) {
        difficulty = MEDIUM;
        return true;
    }
    if (optionsHardButton.isClicked()) {
        difficulty = HARD;
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
    if (optionsEasyButton.isHovered()) {
        optionsBoat.y = 108;
        optionsChicken.stopFlag = false;
    }
    else {
        optionsChicken.stopFlag = true;
    }
    if (optionsMediumButton.isHovered()) {
        optionsBoat.y = 183;
        optionsSkeleton.stopFlag = false;
    }
    else {
        optionsSkeleton.stopFlag = true;
    }
    if (optionsHardButton.isHovered()) {
        optionsBoat.y = 258;
        optionsDragon.stopFlag = false;
    }
    else {
        optionsDragon.stopFlag = true;
    }
}