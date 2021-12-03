/**
 * This class represents the dragon "boss" mob, which is the final boss in the game and drops a
 * dragon head
 **/
class Dragon extends Enemy {
    constructor(x, y, size = 24, health = 40, attack = 2.5, speed = 1) {
        super(x, y, size, health, attack, speed);
        this.x = x;
        this.y = y;
        this.size = size;

        this.name = 'dragon';

        this.state = "left";
        this.direction = "left";
        this.yDirection = "none";
        this.spriteTimer = 0;
        this.turnFrame = 0;


        this.scale = this.size / 20;
        // bounding box
        this.boundX = x;
        this.boundY = y;
        this.boundW = 17 * this.scale;
        this.boundH = 21 * this.scale;

        this.sprites = dragonSprites;
        this.hurtTimer = 0;
        this.hurtTimerLength = 30;
        this.moveDir = 1;
        this.switchFrame = 40;
        this.targetPos = new p5.Vector(character.x, character.y);
        this.isBoss = true;
        this.chargeCounter = 0;
        this.seekDistance = 140;
        this.startFrame = frameCount;
        this.prev_state = "left";
    }

    draw() {
        if (this.stopFlag) {
            if (this.state == "left") {
                image(this.sprites[20], this.x, this.y, this.boundW, this.boundH);
            }
            else {
                image(this.sprites[0], this.x, this.y, this.boundW, this.boundH);
            }
        }
        else {
            if (this.hurtTimer > 2 * this.hurtTimerLength / 3) {
                if (this.state == "left2right" || this.state == "right") {
                    image(this.sprites[42], this.x, this.y, this.boundW, this.boundH);
                }
                if (this.state == "right2left" || this.state == "left") {
                    image(this.sprites[46], this.x, this.y, this.boundW, this.boundH);
                }
            }
            // turn from left to right
            else if (this.state == "left2right") {
                image(this.sprites[29 + this.turnFrame], this.x, this.y, this.boundW, this.boundH);
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
                image(this.sprites[25 + this.turnFrame], this.x, this.y, this.boundW, this.boundH);
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
                image(this.sprites[20 + floor(this.spriteTimer / 10) % 4], this.x, this.y, this.boundW, this.boundH);
            }
            // run right
            else if (this.state == "right" && this.direction == "right") {
                image(this.sprites[16 + floor(this.spriteTimer / 10) % 4], this.x, this.y, this.boundW, this.boundH);
            }
            // run in direction faced if not moving left or right
            else if (this.yDirection != "none") {
                if (this.state == "left") {
                    image(this.sprites[20 + floor(this.spriteTimer / 10) % 4], this.x, this.y, this.boundW, this.boundH);

                }
                else if (this.state == "right") {
                    image(this.sprites[16 + floor(this.spriteTimer / 10) % 4], this.x, this.y, this.boundW, this.boundH);
                }
            }
            // stand and face right
            else if (this.state == "right" && this.direction == "none") {
                image(this.sprites[24], this.x, this.y, this.boundW, this.boundH);
            }
            // stand and face left
            else if (this.state == "left" && this.direction == "none") {
                image(this.sprites[28], this.x, this.y, this.boundW, this.boundH);
            }
            // run left if swinging sword to the left and moving right
            else if (this.state == "left" && this.direction == "right") {
                image(this.sprites[20 + floor(this.spriteTimer / 10) % 4], this.x, this.y, this.boundW, this.boundH);
            }
            // run right if swinging sword to the right and moving left
            else if (this.state == "right" && this.direction == "left") {
                image(this.sprites[16 + floor(this.spriteTimer / 10) % 4], this.x, this.y, this.boundW, this.boundH);
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

    update() {
        let playerDist = dist(this.x, this.y, character.x, character.y)
        if (!this.hurting) {
            if (playerDist < this.attackRange) {
            }
            else if (playerDist < this.seekDistance) {
                this.speed = 1.8;
            }
            else {
                // completely out of range,
                // TODO: wander state, for now, we just stop
                // this.stopFlag = true;
                // this.stopMovement();
                this.speed = 1;
            }
        }
        super.update();
    }
    seekPlayer() {
        if ((frameCount - this.startFrame) % this.switchFrame == 1) {
            this.targetPos = new p5.Vector(character.x, character.y);
            let separation = new p5.Vector(-this.x + this.targetPos.x, -this.y + this.targetPos.y);
            //this.targetPos.add(separation);
            separation.normalize();
            let angle = separation.heading();
            if (this.moveDir === 1) {
                this.switchFrame = 60;
                this.moveDir = 0;
                this.chargeCounter = (this.chargeCounter + 1) % 3;
                projectiles.push(new Fireball(this.x + this.boundW / 2, this.y + this.boundH / 2, angle, 2, this.speed, 15, 0, 60 * 3));
                if (this.chargeCounter == 0) {
                    let oneDegree = PI / 180;
                    projectiles.push(new Fireball(this.x + this.boundW / 2, this.y + this.boundH / 2, angle + oneDegree * 20, 2, this.speed, 15, 0, 60 * 3));
                    projectiles.push(new Fireball(this.x + this.boundW / 2, this.y + this.boundH / 2, angle - oneDegree * 20, 2, this.speed, 15, 0, 60 * 3));
                }
            }
            else {
                this.switchFrame = 60;
                this.moveDir = 1;
                this.prev_state = this.state;
                if (separation.x > 0.0) {
                    this.state = "right"
                    this.direction = "right";
                }
                else if (separation.x < 0.0) {
                    this.state = "left"
                    this.direction = "left";
                }
            }
        }
        if (this.moveDir === 1) {
            let separation = new p5.Vector(-this.x + this.targetPos.x, -this.y + this.targetPos.y);
            separation.normalize();
            if (separation.x > 0.1) {
                this.right = true;
                this.left = false;
            }
            else if (separation.x < 0.1) {
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
        if (this.moveDir === 0) {
            this.stopMovement();
        }
    }
}