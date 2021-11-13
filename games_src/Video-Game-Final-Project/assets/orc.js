/**
 * This class represents the orc mob which trys to attack the player
 **/
class Orc extends Enemy {
    constructor(x, y, size = 20, health = 20, attack = 1, speed = 0.8) {
        super(x, y, size, health, attack, speed);
        this.state = "left";
        this.direction = "left";
        this.yDirection = "none";
        this.spriteTimer = 0;
        this.turnFrame = 0;

        this.name = "orc";

        // bounding box
        this.boundX = x;
        this.boundY = y;
        this.boundW = 12;
        this.boundH = 18;
        this.scale = this.size / 20;

        this.sprites = orcSprites;

        this.hurtTimer = 0;
        this.hurtTimerLength = 60;
    }
    draw() {
        push();
        if (this.stopFlag) {
            if (this.state == "left") {
                image(this.sprites[4], this.x, this.y);
            }
            else {
                image(this.sprites[0], this.x, this.y);
            }
        }
        else {
            if (this.hurtTimer > 2 * this.hurtTimerLength / 3) {
                if (this.state == "left2right" || this.state == "right") {
                    image(this.sprites[34], this.x, this.y);
                }
                if (this.state == "right2left" || this.state == "left") {
                    image(this.sprites[38], this.x, this.y);
                }
            }
            // turn from left to right
            else if (this.state == "left2right") {
                image(this.sprites[29 + this.turnFrame], this.x, this.y);
                if (floor(this.spriteTimer / 3) % 4 == 0) {
                    this.turnFrame++;
                }
                if (this.turnFrame == 3) {
                    this.state = "right";
                    this.spriteTimer = 0;
                }
            }
            // turn from right to left
            else if (this.state == "right2left") {
                image(this.sprites[25 + this.turnFrame], this.x, this.y);
                if (floor(this.spriteTimer / 3) % 4 == 0) {
                    this.turnFrame++;
                }
                if (this.turnFrame == 3) {
                    this.state = "left";
                    this.spriteTimer = 0;
                }
            }
            // run left
            else if (this.state == "left" && this.direction == "left") {
                image(this.sprites[20 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
            }
            // run right
            else if (this.state == "right" && this.direction == "right") {
                image(this.sprites[16 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
            }
            // run in direction faced if not moving left or right
            else if (this.yDirection != "none") {
                if (this.state == "left") {
                    image(this.sprites[20 + floor(this.spriteTimer / 10) % 4], this.x, this.y);

                }
                else if (this.state == "right") {
                    image(this.sprites[16 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
                }
            }
            // stand and face right
            else if (this.state == "right" && this.direction == "none") {
                image(this.sprites[24], this.x, this.y);
            }
            // stand and face left
            else if (this.state == "left" && this.direction == "none") {
                image(this.sprites[28], this.x, this.y);
            }
            // run left if swinging sword to the left and moving right
            else if (this.state == "left" && this.direction == "right") {
                image(this.sprites[20 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
            }
            // run right if swinging sword to the right and moving left
            else if (this.state == "right" && this.direction == "left") {
                image(this.sprites[16 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
            }
        }
        this.spriteTimer++;
        if (this.hurtTimer > 0) {
            this.hurtTimer--;
        }
        else {
            this.hurting = false;
        }
        pop();
    }

    drawInstructionsScreenOrc() {
        if (this.direction == "left") {
            image(this.sprites[20 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
        }
        if (this.direction == "right") {
            image(this.sprites[16 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
        }
        if (this.direction == "up") {
            image(this.sprites[20 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
        }
        if (this.direction == "down") {
            image(this.sprites[16 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
        }
        this.spriteTimer++;
    }

    updateStartInstructionsScreenOrc() {
        if (this.x <= 60) {
            this.direction = "right";
        }
        if (this.x >= 135) {
            this.direction = "left";
        }
        if (this.direction == "left") {
            this.x--;
        }
        if (this.direction == "right") {
            this.x++;
        }
    }


    updateInstructionsScreenOrc() {
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