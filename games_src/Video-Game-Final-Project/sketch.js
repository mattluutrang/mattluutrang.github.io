/**
 * ECE_4525: Final Project: Island Explorer
 * Author: Matthew Luu Trang & Nathan Moeliono
 * Date: 10/29/2021
 *
 * This assignment contains the code for our final project, Island Explorer, which is a top down
 * RPG rougelike game. The player must navigate multiple islands and defeat enemies to collect
 * materials to craft new tools to help him go to other islands. The game is played using the arrow
 * keys and mouse. The keyboard buttons 1-9 are used to change the item that the character is
 * holding, and the z button is used to apply the effect of the item, while the x button is used to
 * throw or place the item.
 *
 **/

let gameState;
let prevGameState;
let gameStarted;
let oneDegree;
var tilemap;
let currRandom;
let seeds = [0, 1, 2, 42]

let byteFont;
let playerFont;
function preload() {
  /**
   * Preload all the images, fonts, and sounds
   */
  byteFont = loadFont("assets/fonts/ARCADECLASSIC.TTF");
  playerFont = loadFont("assets/fonts/PressStart2P-vaV7.ttf");
  preloadImages();
  preloadSounds();
}

function setup() {
  /**
   * Setup variables
   */
  currRandom = seeds[Math.floor(Math.random() * seeds.length)]
  randomSeed(currRandom);
  noiseSeed(currRandom);
  createCanvas(400, 400);
  gameState = "title";
  prevGameState = "title";
  //gameState = "victory";
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
  initStatsScreenVariables();
  initCreditsScreenVariables();
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

  // additional game logic, such as mouse hover logic
  mouseHover();
  playBGM();
  textFont("Arial");
}

function playBGM() {
  /**
   * Play background music based on gameState
   */
  if (gameState == "title") {
    if (!themeSong.isPlaying()) {
      themeSong.loop();
    }
    deathSong.stop();
    victorySong.stop();
  }
  else if (gameState == "gameOver") {
    if (!deathSong.isPlaying()) {
      deathSong.loop();
    }
    themeSong.stop();
  }
  else if (gameState == "victory") {
    if (!victorySong.isPlaying()) {
      victorySong.loop();
    }
    themeSong.stop();
  }
  else {
    if (!themeSong.isPlaying()) {
      themeSong.loop();
    }
    deathSong.stop();
    victorySong.stop();
  }
}

/********************************
 * mouse and key event handlers
 ********************************/
function mouseHover() {
  /**
   * If the mouse is hovering, call state specific mouse hover logic
   */
  if (gameState == "options") {
    optionsScreenMouseHover();
  }
}

function mouseClicked() {
  /**
   * If the mouse is clicked, call state specific mouse click logic
   */
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
  else if (gameState == "victory") {
    victoryScreenClickedLogic();
  }

}

function mousePressed() {
  /**
   * If the mouse is pressed, call state specific mouse pressed logic
   */
  if (gameState == "crafting") {
    craftingScreenPressedLogic();
  }
}

function mouseReleased() {
  /**
   * If the mouse is released, call state specific mouse released logic
   */
  if (gameState == "crafting") {
    craftingScreenReleasedLogic();
  }
}

function mouseDragged() {
  /**
   * If the mouse is dragged, call state specific mouse dragged logic
   */
  if (gameState == "crafting") {
    craftingScreenDraggedLogic();
  }
}

function keyPressed() {
  /**
   * If a key is pressed, call state specific key pressed logic
   */
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