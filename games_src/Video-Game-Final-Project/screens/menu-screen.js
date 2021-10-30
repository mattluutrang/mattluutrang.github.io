let menuXButton;

function initMenuScreenVariables() {
    menuXButton = new XButton(350, 40);
}

function drawMenuScreen() {
    tiles.forEach(tile => tile.draw());

    // draw menu screen background
    stroke('#5B270B');
    fill('#5B270B');
    rect(25, 25, 350, 350);

    // draw menu borders
    stroke('#DEB887');
    fill('#DEB887');
    rect(25, 25, 350, 5);
    rect(25, 25, 5, 350);
    rect(370, 25, 5, 350);
    rect(25, 370, 350, 5);

    // draw black corner line
    stroke('#B68E65');
    fill('#B68E65');
    strokeWeight(1);
    line(25, 25, 30, 30);
    line(375, 25, 370, 30);
    line(25, 375, 30, 370);
    line(370, 370, 375, 375);

    // draw menu stuff
    stroke(255);
    fill(255);
    textSize(30);
    strokeWeight(0);
    text("Menu", 200, 60);

    // draw buttons
    stroke(0);
    fill(0);
    image(woodImg, 75, 100, 250, 50);
    text("Options", 200, 125);

    // draw buttons
    stroke(0);
    fill(0);
    image(woodImg, 75, 175, 250, 50);
    text("Crafting Recipes", 200, 200);

    // draw buttons
    stroke(0);
    fill(0);
    image(woodImg, 75, 250, 250, 50);
    text("Instructions", 200, 275);

    // draw x button
    menuXButton.draw();
}

function menuScreenClickedLogic() {
    if (menuXClicked()) {
        gameState = "game";
    }
    if (instructionsClicked()) {
        gameState = "instructions";
    }
    if (menuOptionsClicked()) {
        gameState = "options";
    }
    if (craftingRecipesClicked()) {
        gameState = "craftingRecipes";
    }
}

function menuXClicked() {
    if (mouseX >= menuXButton.x && mouseY >= menuXButton.y &&
        mouseX <= menuXButton.x + menuXButton.w &&
        mouseY <= menuXButton.y + menuXButton.h) {
        return true;
    }
    return false;
}

function menuOptionsClicked() {
    if (mouseX >= 75 && mouseY >= 100 &&
        mouseX <= 75 + 250 &&
        mouseY <= 100 + 50) {
        return true;
    }
    return false;
}

function craftingRecipesClicked() {
    if (mouseX >= 75 && mouseY >= 175 &&
        mouseX <= 75 + 250 &&
        mouseY <= 175 + 50) {
        return true;
    }
    return false;
}

function instructionsClicked() {
    if (mouseX >= 75 && mouseY >= 250 &&
        mouseX <= 75 + 250 &&
        mouseY <= 250 + 50) {
        return true;
    }
    return false;
}

function menuScreenKeyPressedLogic() {
    // close menu screen if "m" is pressed
    if (keyCode == 77) {
        gameState = "game"
    }
}