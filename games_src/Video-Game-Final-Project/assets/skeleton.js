/**
 * This class represents the skeleton mob which drops bones
 **/
class Skeleton extends Enemy {
    constructor(x, y, size = 20, health = 10, attack = 0.5, speed = 1) {
        super(x, y, size, health, attack, speed);

        this.state = "left";
        this.direction = "left";
        this.yDirection = "none";
        this.spriteTimer = 0;
        this.turnFrame = 0;

        this.name = "skeleton";

        // bounding box
        this.boundX = x;
        this.boundY = y;
        this.boundW = 12;
        this.boundH = 18;
        this.scale = this.size / 20;

        this.sprites = skeletonSprites;
        this.moveDir = -1;
        this.switchFrame = 40;
        this.targetPos;

        this.hurtTimer = 0;
        this.hurtTimerLength = 60;
        this.seekDistance = 150;
        this.startFrame = frameCount;
    }

    draw() {
        // turn from left to right
        if (this.stopFlag) {
            if (this.state == "left") {
                image(this.sprites[20], this.x, this.y);
            }
            else {
                image(this.sprites[8], this.x, this.y);
            }
        }
        else {
            if (this.hurtTimer > 2 * this.hurtTimerLength / 3) {
                if (this.state == "left2right" || this.state == "right") {
                    image(this.sprites[42], this.x, this.y);
                }
                if (this.state == "right2left" || this.state == "left") {
                    image(this.sprites[46], this.x, this.y);
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
        separation.rotate(this.moveDir * PI / 4);
        separation.normalize();
        separation.mult(this.speed);
        if ((frameCount - this.startFrame) % this.switchFrame == 0) {
            this.moveDir *= -1;
        }
        let prev_state = this.state;
        if (separation.x > 0.1) {
            this.state = "right"
            if (prev_state === "left") {
                this.state = "left2right";
            }
            this.direction = "right";
            this.right = true;
            this.left = false;
        }
        else if (separation.x < -0.1) {
            this.state = "left"
            if (prev_state === "right") {
                this.state = "right2left";
            }
            this.direction = "left";
            this.left = true;
            this.right = false;
        }
        else {
            this.left = false;
            this.right = false;
        }
        if (separation.y > 0.1) {
            this.down = true;
            this.up = false;
        }
        else if (separation.y < -0.1) {
            this.down = false;
            this.up = true;
        }
        else {
            this.up = false;
            this.down = false;
        }
    }



    drawInstructionsScreenSkeleton() {
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

    updateStartInstructionsScreenSkeleton() {
        if (this.x <= 265) {
            this.direction = "right";
        }
        if (this.x >= 340) {
            this.direction = "left";
        }
        if (this.direction == "left") {
            this.x--;
        }
        if (this.direction == "right") {
            this.x++;
        }
    }
}