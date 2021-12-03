/**
 * This file contains the fireball class as well as other projectiles. The fireball class extends
 * from the projectile class. The swordbeam class extends from the projectile class.
 */
class Projectile {
    constructor(x, y, speed = 1, angle = 0, size = 20, owner = 0, attack = 1) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.angle = angle;
        this.owner = owner;
        this.attack = attack;
        this.size = size;
        this.width = size;
        this.height = size / 2;
        // bounding box
        this.hitCharacter = false;
        this.active = true;
    }
    draw() {
        // override this
    }
    update() {
        this.move();
        this.checkCollision();
    }
    move() {
        this.x += this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);
    }
    isOutOfBounds() {
        return this.x > character.x + width + this.width || this.x < character.x - width - this.width || this.y > character.y + height + this.height || this.y < character.y - height - this.height;
    }
    checkCollision() {
        if (this.isOutOfBounds() || this.hitCharacter) {
            this.active = false;
            return;
        }
        else {
            let distance = dist(this.x, this.y, character.x + character.boundW / 2, character.y + character.boundH / 2);
            if (distance < 10) {
                this.hitCharacter = true;
            }
            else {
                this.hitCharacter = false;
            }
            return;
        }
    }
    projectileCollision(bounds) {
        this.boundX = this.x - this.size / 2;
        this.boundY = this.y - this.size / 2;
        if (checkCollision(this, bounds)) {
            this.active = false;
        }
    }
}

class Fireball extends Projectile {
    constructor(x, y, angle = 0, attack = 4, speed = 1, size = 10, owner = 0, duration = -1) {
        super(x, y, speed, angle, size * 3.4, owner, attack);
        this.spriteTimer = frameCount % fireballSprites.length;
        this.size = size;
        this.boundW = size;
        this.boundH = size / 2;
        this.duration = duration;
    }
    draw() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        image(fireballSprites[this.spriteTimer], -this.width / 1.4, -this.height / 2, this.width, this.height);
        //image(fireballSprites[this.spriteTimer], this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        pop();
    }
    update() {
        this.spriteTimer = frameCount % fireballSprites.length;
        if (this.duration > 0) {
            this.duration--;
            if (this.duration == 0) {
                this.active = false;
            }
        }
        super.update();
    }
}


class SwordBeam extends Projectile {
    constructor(x, y, angle = 0, attack = character.attack * 2, speed = 1.5, size = 10, owner = 1) {
        super(x, y, speed, angle, size * 3.4, owner, attack);
        this.size = size;
        this.boundW = size;
        this.boundH = size / 2;
    }
    draw() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        fill(0);
        arc(0, 0, 10, 10, -HALF_PI, HALF_PI);
        fill(125);
        arc(0, 0, 5, 8, -HALF_PI, HALF_PI);
        pop();
    }
    update() {
        super.update();
    }
    checkCollision() {
        if (this.isOutOfBounds() || this.hitCharacter) {
            this.active = false;
            return;
        }
        else {
            for (let i = 0; i < enemies.length; i++) {
                let distance = dist(this.x, this.y, enemies[i].x + enemies[i].boundW / 2, enemies[i].y + enemies[i].boundH / 2);
                if (distance < 10) {
                    enemies[i].wasHit(this.attack);
                    this.hitCharacter = true;
                }
            }
            return;
        }
    }
}
