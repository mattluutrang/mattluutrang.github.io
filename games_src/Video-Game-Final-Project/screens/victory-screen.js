/**
 * This file represents the victory screen that appears when the character wins
 **/

let victoryWave;
let victoryWaveHeight;
let victoryBoids = [];
let victoryCharacter;
let startVictoryTime;
let victoryBoat;
let victoryOrc;

function initVictoryScreenVariables() {
    victoryWave = [new Wave(3, 180, color("blue")), new Wave(10, 200, color('#639bff')),];
    // Add an initial set of victoryBoids into the system
    for (let i = 0; i < 15; i++) {
        victoryBoids[i] = new Boid(random(width), random(height - 200), 3.5);
    }
    victoryCharacter = new Character(width / 2, 300);
    victoryOrc = new Orc(width / 2 - 6, 300);
    victoryOrc.stopFlag = true;
    victoryCharacter.direction = "none"
    playButton = new Button(150, 200, 100, 40, "#E5CD6C", "Play", 20, "#f5712a", byteFont);
    victoryWaveHeight = 7.2 * height / 8;
    victoryBoat = new Boat(140, 6.6 * height / 8, 40, true, 0.25);
    startVictoryTime = frameCount;
}

function drawVictoryBackground() {
    // draw sky background (change to gradient image later)
    stroke('#ADD8E6');
    //let c1 = color("#ADD8E6")
    let c1 = color("#eb8c3d");
    let c2 = color("#3ebfea");
    strokeWeight(1);
    setGradient(0, 0, width, height, c1, c2, Y_AXIS);
    drawClouds();
    fill("#e0a31f");
    // draw island
    bezier(50, height, 250, 250, 150, 250, 350, height);

    // draw trees
    image(treeSprites[0], 210, 250, 32, 64);
    if (random(1) < 0.05) {
        if (victoryCharacter.state === "left") {
            victoryCharacter.state = "right";
        }
        else {
            victoryCharacter.state = "left";
        }
        if (victoryOrc.state === "left") {
            victoryOrc.state = "right";
        }
        else {
            victoryOrc.state = "left";
        }
    }
    for (let i = 0; i < victoryBoids.length; i++) {
        victoryBoids[i].run(victoryBoids);
    }
    // draw water
    fill("#639bff");
    push();
    translate(0, victoryWaveHeight);
    victoryWave[0].update();
    victoryWave[0].draw();
    victoryWave[1].update();
    victoryWave[1].draw();
    pop();

    victoryBoat.draw();
    victoryBoat.update();
    if (victoryBoat.x >= width / 2 - 7) {
        if (victoryBoat.x <= width / 2 + 1) {
            victoryCharacter.y++;
        }
        else {
            victoryCharacter.x += victoryBoat.speed;
        }
        if (victoryBoat.x >= width / 2 + 30) {
            victoryOrc.draw();
            if (frameCount % 30 >= 15) {
                textSize(30);
                strokeWeight(0);
                stroke(255);
                fill("#f5712a");
                text("!", width / 2, 285);
            }
        }
    }

    victoryCharacter.draw();
}
function drawVictoryBoxes() {
    // draw victory box
    stroke("#E5CD6C");
    fill("#E5CD6C");
    rect(50, 50, 300, 50);

    textFont(byteFont);
    // draw victory text
    textSize(30);
    strokeWeight(0);
    stroke(255);
    fill("#f5712a");
    text("Victory", width / 2, 75);

    textFont("Impact")
}
// TODO: Make this look a lot better
function drawVictoryScreen() {
    drawVictoryBackground();
    drawVictoryBoxes();
}

// function victoryScreenClickedLogic() {
//     if (playButton.isClicked()) {
//         if (!startGameAnimation) {
//             startGameAnimation = true;
//             startTime = frameCount;
//         }
//     }
// }