let craftingRecipesXButton;

function initCraftingRecipesScreenVariables() {
    craftingRecipesXButton = new XButton(350, 40);
}

function drawCraftingRecipesScreen() {
    tiles.forEach(tile => tile.draw());

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

    image(craftingRecipeImg, 100, 100, 200, 100);
    //image(craftingRecipeImg, 100, 225, 200, 100);

    // draw x button
    craftingRecipesXButton.draw();
}

function craftingRecipesScreenClickedLogic() {
    if (craftingRecipeXClicked()) {
        gameState = "menu"
    }
}

function craftingRecipeXClicked() {
    if (mouseX >= menuXButton.x && mouseY >= menuXButton.y && 
        mouseX <= menuXButton.x + menuXButton.w &&
        mouseY <= menuXButton.y + menuXButton.h) {
        return true;
    }
    return false;
}