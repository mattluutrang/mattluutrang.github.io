/**
 * This class represents a chicken mob that runs away from the player
 **/
class Chicken extends Enemy {
    constructor(x, y, size = 15, health = 1, attack = 0, speed = 0.2) {
        super(x, y, size, health, attack, speed);
        this.x = x;
        this.y = y;

        this.w = size;
        this.h = size;
        this.name = "chicken";

        this.state = "left";
        this.direction = "left";
        this.yDirection = "none";
        this.spriteTimer = 0;

        this.speed = 1;

        // bounding box
        this.boundX = x;
        this.bounyY = y;
        this.boundW = 12;
        this.boundH = 18;

        this.stopFlag = false;
    }

    // states: left, right, run left, run right

    draw() {
        if (this.stopFlag) {
            image(chickenSprites[5], this.x, this.y, this.w, this.h);
        }
        else {
            if (this.direction == "left") {
                image(chickenSprites[4 + floor(this.spriteTimer / 8) % 4], this.x, this.y, this.w, this.h);

            }
            else if (this.direction == "right") {
                image(chickenSprites[floor(this.spriteTimer / 8) % 4], this.x, this.y, this.w, this.h);
            }
        }

        this.spriteTimer++;
    }

    seekPlayer() {
        let separation = new p5.Vector(this.x - character.x, this.y - character.y);
        separation.normalize();
        separation.mult(this.speed);
        if (separation.x > 0.1) {
            this.state = "right"
            this.direction = "right";
            this.right = true;
            this.left = false;
        }
        else if (separation.x < -0.1) {
            this.state = "left"
            this.direction = "left";
            this.left = true;
            this.right = false;
        }
        else {
            this.left = false;
            this.right = false;
        }
        if (separation.y > 0) {
            this.down = true;
            this.up = false;
        }
        else if (separation.y < 0) {
            this.down = false;
            this.up = true;
        }
        else {
            this.up = false;
            this.down = false;
        }
    }
    // update() {
    //     if (this.direction == "left") {
    //         this.x--;
    //     }
    //     else if (this.direction == "right") {
    //         this.x++;
    //     }
    //     if (this.x >= 300) {
    //         this.direction = "left";
    //     }
    //     if (this.x <= 100) {
    //         this.direction = "right";
    //     }
    //     // update bounding box
    //     this.boundX = this.x;
    //     this.boundY = this.y;
    // }

    drawInstructionsScreenChicken() {
        if (this.direction == "left") {
            image(chickenSprites[4 + floor(this.spriteTimer / 8) % 4], this.x, this.y, this.w, this.h);
        }
        if (this.direction == "right") {
            image(chickenSprites[floor(this.spriteTimer / 8) % 4], this.x, this.y, this.w, this.h);
        }
        if (this.direction == "up") {
            image(chickenSprites[4 + floor(this.spriteTimer / 8) % 4], this.x, this.y, this.w, this.h);
        }
        if (this.direction == "down") {
            image(chickenSprites[floor(this.spriteTimer / 8) % 4], this.x, this.y, this.w, this.h);
        }
        this.spriteTimer++;
    }

    updateInstructionsScreenChicken() {
        if (this.x == 325) {
            this.direction = "up";
        }
        if (this.y == 160) {
            this.direction = "left"
        }
        if (this.x == 75) {
            this.direction = "down";
        }
        if (this.y == 185) {
            this.direction = "right";
            if (this.x == 325) {
                this.direction = "up";
            }
        }
        if (this.direction == "left") {
            this.x--;
        }
        if (this.direction == "right") {
            this.x++;
        }
        if (this.direction == "up") {
            this.y--;
        }
        if (this.direction == "down") {
            this.y++;
        }
    }
}