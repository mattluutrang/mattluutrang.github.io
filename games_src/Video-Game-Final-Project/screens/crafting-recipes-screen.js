/**
 * This file represents the crafting recipes screen where the user can paginate through the different crafting recipes
 **/

let craftingRecipesXButton;
let craftingPageIndex;

function initCraftingRecipesScreenVariables() {
    craftingRecipesXButton = new XButton(350, 40);
    craftingPageIndex = 0;
}

function drawCraftingRecipesScreen() {
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

    // draw craftingRecipes stuff
    stroke(255);
    fill(255);
    textSize(30);
    strokeWeight(0);
    text("Crafting Recipes", 200, 60);

    image(craftingImgs[craftingPageIndex], 100, 100, 200, 100);
    image(craftingImgs[craftingPageIndex + 1], 100, 218, 200, 100);

    // draw left button
    stroke(0);
    fill(0);
    if (craftingPageIndex > 0) {
        image(woodImg, 140, 330, 50, 20);
        rect(160, 337.5, 20, 5);
        triangle(160, 332.5, 160, 347.5, 150, 339.5);
    }
    // draw right button
    if (craftingPageIndex < craftingImgs.length - 2) {
        image(woodImg, 210, 330, 50, 20);
        rect(220, 337.5, 20, 5);
        triangle(240, 332.5, 240, 347.5, 250, 339.5);
    }

    // draw x button
    craftingRecipesXButton.draw();
}

function craftingRecipesScreenClickedLogic() {
    if (craftingRecipeXClicked()) {
        gameState = "menu"
    }
    if (leftButtonClicked() && craftingPageIndex > 0) {
        craftingPageIndex -= 2;
    }
    if (rightButtonClicked() && craftingPageIndex < craftingImgs.length - 2) {
        craftingPageIndex += 2;
    }
}

function leftButtonClicked() {
    if (mouseX >= 160 && mouseY >= 330 &&
        mouseX <= 160 + 50 &&
        mouseY <= 330 + 20) {
        return true;
    }
    return false;
}

function rightButtonClicked() {
    if (mouseX >= 220 && mouseY >= 330 &&
        mouseX <= 220 + 50 &&
        mouseY <= 330 + 20) {
        return true;
    }
    return false;
}

function craftingRecipeXClicked() {
    if (mouseX >= menuXButton.x && mouseY >= menuXButton.y &&
        mouseX <= menuXButton.x + menuXButton.w &&
        mouseY <= menuXButton.y + menuXButton.h) {
        return true;
    }
    return false;
}