/**
 * This class represents the necromancer mob which drops nothing
 **/
class Necromancer extends Enemy {
    constructor(x, y, size = 20, health = 10, attack = 1, speed = 0.5) {
        super(x, y, size, health, attack, speed);

        this.state = "left";
        this.direction = "left";
        this.yDirection = "none";
        this.spriteTimer = 0;
        this.turnFrame = 0;

        this.name = "necromancer";

        // bounding box
        this.boundX = x;
        this.boundY = y;
        this.boundW = 12;
        this.boundH = 18;
        this.scale = this.size / 20;

        this.sprites = necromancerSprites;
        this.moveDir = -1;
        this.switchFrame = 40;
        this.targetPos;

        this.hurtTimer = 0;
        this.hurtTimerLength = 60;
        this.seekDistance = 110;

        this.attackRange = 70;
        this.attackTimer = 0;
        this.attackTimerLength = 90;
    }

    startAttack() {
        let separation = new p5.Vector(-this.x + character.x, -this.y + character.y);
        let angle = separation.heading();
        let prev_state = this.state;
        if (separation.x > 0.1) {
            this.state = "right"
            if (prev_state === "left") {
                this.state = "left2right";
            }
            this.direction = "right";
        }
        else if (separation.x < -0.1) {
            this.state = "left"
            if (prev_state === "right") {
                this.state = "right2left";
            }
            this.direction = "left";
        }
        if (this.attackTimer == 0) {
            projectiles.push(new Fireball(this.x + this.boundW / 2, this.y + this.boundH / 2, angle, this.attack * 2, 1, 10, 0, 60 * 5));
            this.attackTimer = (this.attackTimer + 1) % this.attackTimerLength;
        }
        else {
            this.attackTimer = (this.attackTimer + 1) % this.attackTimerLength;
        }
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
                    image(this.sprites[26], this.x, this.y);
                }
                if (this.state == "right2left" || this.state == "left") {
                    image(this.sprites[30], this.x, this.y);
                }
            }
            else if (this.state == "left2right") {
                image(this.sprites[21 + this.turnFrame], this.x, this.y);
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
                image(this.sprites[17 + this.turnFrame], this.x, this.y);
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
                image(this.sprites[12 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
            }
            // run right
            else if (this.state == "right" && this.direction == "right") {
                image(this.sprites[8 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
            }
            // run in direction faced if not moving left or right
            else if (this.yDirection != "none") {
                if (this.state == "left") {
                    image(this.sprites[12 + floor(this.spriteTimer / 10) % 4], this.x, this.y);

                }
                else if (this.state == "right") {
                    image(this.sprites[8 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
                }
            }
            // stand and face right
            else if (this.state == "right" && this.direction == "none") {
                image(this.sprites[16], this.x, this.y);
            }
            // stand and face left
            else if (this.state == "left" && this.direction == "none") {
                image(this.sprites[20], this.x, this.y);
            }
            // run left if swinging sword to the left and moving right
            else if (this.state == "left" && this.direction == "right") {
                image(this.sprites[12 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
            }
            // run right if swinging sword to the right and moving left
            else if (this.state == "right" && this.direction == "left") {
                image(this.sprites[8 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
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

}