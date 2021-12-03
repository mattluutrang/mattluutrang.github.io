/**
 * This class represents the ghost mob which drops nothing
 **/
class Ghost extends Enemy {
    constructor(x, y, size = 20, health = 15, attack = 1.5, speed = 1.15) {
        super(x, y, size, health, attack, speed);
        this.state = "left";
        this.direction = "left";
        this.yDirection = "none";
        this.spriteTimer = 0;
        this.turnFrame = 0;
        this.name = "ghost";

        // bounding box
        this.boundX = x;
        this.boundY = y;
        this.boundW = 12;
        this.boundH = 18;
        this.scale = this.size / 20;

        this.sprites = ghostSprites;
        this.moveDir = -1;
        this.switchFrame = 40;
        this.targetPos;

        this.hurtTimer = 0;
        this.hurtTimerLength = 60;
        this.startFrame = frameCount;
        this.hiding = false;
        this.hidingFrame = 0;
        this.seekDistance = 120;
        this.attackDistance = 0;
        this.baseAttack = this.attack;
    }

    draw() {
        // turn from left to right
        if (this.stopFlag) {
            if (this.state == "left") {
                image(this.sprites[7], this.x, this.y);
            }
            else {
                image(this.sprites[3], this.x, this.y);
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
            else if (this.hiding) {
                if (this.state == "right") {
                    image(this.sprites[39 + this.hidingFrame], this.x, this.y);
                }
                else {
                    image(this.sprites[43 + this.hidingFrame], this.x, this.y);
                }
                if (this.hidingFrame < 4) {
                    if (floor(this.spriteTimer / 3) % 8 == 0) {
                        this.hidingFrame++;
                    }
                }
            }
            else if (this.state == "left2right") {
                image(this.sprites[29 + this.turnFrame], this.x, this.y);
                if (floor(this.spriteTimer / 3) % 4 == 0) {
                    this.turnFrame++;
                }
                if (this.turnFrame >= 3) {
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
                if (this.turnFrame >= 3) {
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
    }
    seekPlayer() {
        let separation = new p5.Vector(-this.x + character.x, -this.y + character.y);
        separation.normalize();
        separation.mult(this.speed);
        let canSeek = true;
        let char_state = character.state;
        if (separation.x > 0.0) {
            if (char_state == "left") {
                // we cannot move
                canSeek = false;
            }
        }
        else if (separation.x < 0.0) {
            if (char_state == "right") {
                canSeek = false;
            }
        }
        if (canSeek) {
            this.hiding = false;
            super.seekPlayer();
            this.attack = this.baseAttack;
        }
        else {
            this.hiding = true;
            this.stopMovement();
            this.attack = 0;
        }
    }
}