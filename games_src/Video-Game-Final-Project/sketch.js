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
var tilemap;
let currRandom;

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
  let seeds = [0, 1, 2, 42]
  currRandom = seeds[Math.floor(Math.random() * seeds.length)]
  randomSeed(currRandom);
  noiseSeed(currRandom);
  createCanvas(400, 400);
  gameState = "title";
  //gameState = "detailedInstructions";
  gameStarted = false;
  oneDegree = PI / 180;

  /**Initialize variables for each screen */
  loadSprites();
  initTitleScreenVariables();
  initCraftingScreenVariables();
  initGameScreenVariables();
  initMenuScreenVariables();
  initInstructionsScreenVariables();
  initOptionsScreenVariables();
  initCraftingRecipesScreenVariables();
  initStartInstructionsScreenVariables();
  initDetailedInstructionsScreenVariables();
  initGameOverScreenVariables();
  initVictoryScreenVariables();
  textFont("Impact");
  textAlign(CENTER, CENTER);
}

function draw() {
  // draw game screen based on gameState
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
  else if (gameState == "detailedInstructions") {
    drawDetailedInstructionsScreen();
  }
  else if (gameState == "gameOver") {
    drawGameOverScreen();
  }
  else if (gameState == "victory") {
    drawVictoryScreen();
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
  else if (gameState == "detailedInstructions") {
    detailedInstructionsScreenClickedLogic();
  }
  else if (gameState == "gameOver") {
    gameOverScreenClickedLogic();
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