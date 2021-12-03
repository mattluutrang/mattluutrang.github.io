/**
 * This file represents the game over screen which appears when the player has lots all their health
 **/

let deadTwitchTimer;
const deadTwitchTimerLength = 60;
let deadX;
let deadY;

let gameOverOrc1;
let gameOverOrc2;

function initGameOverScreenVariables() {
    deadTwitchTimer = 0;
    deadX = 185;
    deadY = 285;
    gameOverOrc1 = new Orc(260, 280);
    gameOverOrc1.stopFlag = true;
    gameOverOrc2 = new Orc(140, 280);
    gameOverOrc2.stopFlag = true;
    gameOverOrc2.state = "right";
}

function drawGameOverScreen() {
    stroke(40);
    fill(40);
    rect(0, 0, 400, 400);

    stroke("#ffffe0");
    fill("#ffffe0");
    triangle(200, -20, 100, 300, 300, 300);

    stroke("#ffffa3");
    fill("#ffffa3");
    ellipse(200, 300, 200, 50);

    stroke("white");
    fill("red");
    textSize(60);
    text("GAME OVER", 200, 75);

    let w = 18;
    let h = 11;
    let mul = 2;
    image(deadMHeroImg, deadX, deadY, w * mul, h * mul);

    gameOverOrc1.draw();
    gameOverOrc2.draw();
    if (deadTwitchTimer < 5) {
        deadX--;
    }
    else if (deadTwitchTimer < 10) {
        deadX++;
    }
    if (deadTwitchTimer >= 15 && deadTwitchTimer < 20) {
        gameOverOrc1.y++;
    }
    if (deadTwitchTimer >= 20 && deadTwitchTimer < 25) {
        gameOverOrc1.y--;
    }
    if (deadTwitchTimer >= 30 && deadTwitchTimer < 35) {
        gameOverOrc2.y++;
    }
    if (deadTwitchTimer >= 35 && deadTwitchTimer < 40) {
        gameOverOrc2.y--;
    }

    if (deadTwitchTimer == 0) {
        deadTwitchTimer = deadTwitchTimerLength
    }
    if (deadTwitchTimer > 0) {
        deadTwitchTimer--;
    }

    // Play Again button
    image(woodImg, 170, 350, 60, 20);
    stroke(0);
    fill("#f5712a")
    strokeWeight(1);
    textSize(12);
    text("Play Again", 200, 360);
}

function gameOverScreenClickedLogic() {
    if (playAgainClicked()) {
        gameState = "game";
        currRandom = seeds[Math.floor(Math.random() * seeds.length)];
        randomSeed(currRandom);
        noiseSeed(currRandom);
        initCraftingScreenVariables();
        initGameScreenVariables();
    }
}

function playAgainClicked() {
    if (mouseX >= 170 && mouseY >= 350 &&
        mouseX <= 170 + 60 &&
        mouseY <= 350 + 20) {
        return true;
    }
    return false;
}
