/**
 * ECE_4525: Final Project: Island Explorer
 * Author: Matthew Luu Trang & Nathan Moeliono
 * Date: 10/29/2021
 *
 * This assignment contains the code for our final project, Island Explorer, which is a top down
 * RPG rougelike game. The player must navigate multiple islands and defeat enemies to collect
 * materials to craft new tools to help him go to other islands. The game is played using the arrow
 * keys and mouse.
 *
 **/

let gameState;
let gameStarted;
let oneDegree;

let byteFont;
function preload() {
  /**
   * Preload all the images, fonts, and sounds
   */
  byteFont = loadFont("assets/fonts/ARCADECLASSIC.TTF");
  preloadImages()
}

function setup() {
  /**
   * Setup variables
   */
  createCanvas(400, 400);
  gameState = "title";
  gameStarted = false;
  oneDegree = PI / 180;

  /**Initialize variables for each screen */
  initTitleScreenVariables();
  initCraftingScreenVariables();
  initGameScreenVariables();
  initMenuScreenVariables();
  initInstructionsScreenVariables();
  initOptionsScreenVariables();
  initCraftingRecipesScreenVariables();
  textFont("Impact");
  textAlign(CENTER, CENTER);
  loadSprites();

  // create the tileset for the map
  createRealTileset();
}

function draw() {
  background(0, 0, 0, 0);
  // draw game screen based on gameState variable
  if (gameState == "title") {
    drawTitleScreen();
  }
  else if (gameState == "startInstructions") {
    drawStartInstructionsScreen();
  }
  else if (gameState == "game") {
    gameStarted = true;
    drawGameScreen();
  }
  else if (gameState == "crafting") {
    drawCraftingScreen();
  }
  else if (gameState == "menu") {
    drawMenuScreen();
  }
  else if (gameState == "instructions") {
    drawInstructionsScreen();
  }
  else if (gameState == "options") {
    drawOptionsScreen();
  }
  else if (gameState == "craftingRecipes") {
    drawCraftingRecipesScreen();
  }

  // additional mouse hover logic
  mouseHover();
}

/********************************
 * mouse and key event handlers
 ********************************/
function mouseHover() {
  if (gameState == "options") {
    optionsScreenMouseHover();
  }
}

function mouseClicked() {
  if (gameState == "title") {
    titleScreenClickedLogic();
  }
  else if (gameState == "startInstructions") {
    startInstructionsScreenClickedLogic();
  }
  else if (gameState == "game") {
    gameScreenClickedLogic();
  }
  else if (gameState == "crafting") {
    craftingScreenClickedLogic();
  }
  else if (gameState == "menu") {
    menuScreenClickedLogic();
  }
  else if (gameState == "instructions") {
    instructionsScreenClickedLogic();
  }
  else if (gameState == "options") {
    optionsScreenClickedLogic();
  }
  else if (gameState == "craftingRecipes") {
    craftingRecipesScreenClickedLogic();
  }

}

function mousePressed() {
  if (gameState == "crafting") {
    craftingScreenPressedLogic();
  }
}

function mouseReleased() {
  if (gameState == "crafting") {
    craftingScreenReleasedLogic();
  }
}

function mouseDragged() {
  if (gameState == "crafting") {
    craftingScreenDraggedLogic();
  }
}

function keyPressed() {
  if (gameState == "game") {
    gameScreenKeyPressedLogic();
  }
  else if (gameState == "crafting") {
    craftingScreenKeyPressedLogic();
  }
  else if (gameState == "menu") {
    menuScreenKeyPressedLogic();
  }
}