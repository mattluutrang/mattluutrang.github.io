/**
 * This file represents the title screen that the game starts with
 **/

// only need to update the y coordinates of each ball in wave

class Wave {
    constructor(amplitude, period, color, length = height) {
        this.startAngle = 0;
        this.amplitude = amplitude;
        this.period = period;
        this.color = color;
        this.length = length + 30;
        this.angleVel = (TWO_PI / this.period) * 5;
    }

    update() {
        this.startAngle -= TWO_PI / this.period;
    }

    draw() {
        var a = this.startAngle;
        strokeWeight(2);
        stroke(this.color);
        fill(this.color);
        for (var x = 0; x < width; x += 1) {
            var y = this.amplitude * sin(a);
            line(x, y, x, y + this.length);
            a += this.angleVel;
        }
    }
}

let titleWave;
let boids = [];
let titleCharacter;
let startGameAnimation;
let startTime;
let turnRate;
let playButton;
let waveHeight;
let boat;
let noiseA;

function initTitleScreenVariables() {
    titleWave = [new Wave(3, 180, color("blue")), new Wave(10, 200, color('#639bff')),];
    // Add an initial set of boids into the system
    for (let i = 0; i < 15; i++) {
        boids[i] = new Boid(random(width), random(height - 200), 3.5);
    }
    titleCharacter = new Character(width / 2, 300);
    titleCharacter.direction = "none"
    startGameAnimation = false;
    playButton = new Button(150, 200, 100, 40, "#E5CD6C", "Play", 20, "#f5712a", byteFont);
    waveHeight = 7.2 * height / 8;
    boat = new Boat(30, 6.6 * height / 8, 40, true, 0.25);
    noiseA = 700;
    startTime = frameCount;
}

function drawGameStartAnimation() {
    if (waveHeight > -10) {
        waveHeight -= height / 60;
    }
    else {
        gameState = "startInstructions";
    }
}

function drawClouds() {
    // sky
    noStroke();
    var n1 = noiseA;
    for (var x = 0; x <= 400; x += 4) {
        var n2 = 0;
        for (var y = 0; y <= 150; y += 4) {
            var c = 255 * noise(n1, n2);
            if (c > 150) {
                fill(c + 30, c + 10, c, 200);
                circle(x, y, 10)
                //rect(x, y, 12, 12, 12);
            }
            n2 += 0.05; // step size in noise
        }
        n1 += 0.02; // step size in noise
    }
    noiseA -= 0.002;  // speed of clouds
}
function drawTitleBackground() {
    // draw sky background (change to gradient image later)
    stroke('#ADD8E6');
    //let c1 = color("#ADD8E6")
    let c2 = color("#eb8c3d");
    let c1 = color("#3ebfea");
    strokeWeight(1);
    setGradient(0, 0, width, height, c1, c2, Y_AXIS);
    drawClouds();
    fill("#e0a31f");
    // draw island
    bezier(50, height, 250, 250, 150, 250, 350, height);

    // draw trees
    image(treeSprites[0], 210, 250, 32, 64);
    titleCharacter.draw();
    if (random(1) < 0.02) {
        if (titleCharacter.state === "left") {
            titleCharacter.state = "right";
        }
        else {
            titleCharacter.state = "left";
        }
    }
    if (random(1) < 0.01) {
        if (titleCharacter.state === "left" && titleCharacter.x > width / 2 - 8) {
            titleCharacter.x -= 2;
        }
        else if (titleCharacter.state === "right" && titleCharacter.x < width / 2 + 8) {
            titleCharacter.x += 2;
        }
    }
    for (let i = 0; i < boids.length; i++) {
        boids[i].run(boids);
    }
    // draw water
    fill("#639bff");
    push();
    translate(0, waveHeight);
    titleWave[0].update();
    titleWave[0].draw();
    titleWave[1].update();
    titleWave[1].draw();
    pop();

    if (startGameAnimation) {
        drawGameStartAnimation();
    }
    else {
        boat.draw();
        boat.update();
        boat.checkBorders();
    }
}
function drawTitleBoxes() {
    // draw title box
    stroke("#E5CD6C");
    fill("#E5CD6C");
    rect(50, 50, 300, 50);

    textFont(byteFont);
    // draw title text
    textSize(30);
    strokeWeight(0);
    stroke(255);
    fill("#f5712a");
    text("Island Explorer", width / 2, 75);

    // draw creator names
    textSize(10);
    strokeWeight(0);
    stroke(255);
    fill(255);
    text("Nathan   Moeliono", width / 2, 380);
    text("Matthew   Trang", width / 2, 390);

    // // draw play button
    // stroke("#E5CD6C");
    // fill("#E5CD6C");
    // rect(150, 200, 100, 40);

    // // draw title text
    // textSize(20);
    // strokeWeight(0);
    // stroke(255);
    // fill(255);
    // text("Play", width / 2, 225);
    playButton.draw();
}
// TODO: Make this look a lot better
function drawTitleScreen() {
    drawTitleBackground();
    if (!startGameAnimation) {
        drawTitleBoxes();
    }
}

function titleScreenClickedLogic() {
    if (playButton.isClicked()) {
        if (!startGameAnimation) {
            startGameAnimation = true;
            startTime = frameCount;
        }
    }
}