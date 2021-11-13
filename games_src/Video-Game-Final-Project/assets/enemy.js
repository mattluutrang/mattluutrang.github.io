/**
 * This class represents the enemy interface that the mobs extend
 **/
class Enemy {
    constructor(x, y, size, health, attack, speed) {
        this.x = x;
        this.y = y;
        this.x_delta = 0;
        this.y_delta = 0;
        this.size = size;
        this.health = health;
        this.attack = attack;
        this.attackRange = 10;
        this.seekDistance = 100;
        this.step = new p5.Vector(0, 0);
        this.attacking = false;
        this.hurting = false;
        this.dead = false;
        this.speed = speed;
        this.hurtTimer = 0;
        this.knockBackDir = -1;
        this.up;
        this.down;
        this.left;
        this.right;
    }
    seekPlayer() {
        let separation = new p5.Vector(-this.x + character.x, -this.y + character.y);
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

    updateDelta() {
        if (this.left) {
            this.x_delta = -this.speed;
        }
        if (this.right) {
            this.x_delta = this.speed;
        }
        if (this.up) {
            this.y_delta = -this.speed;
        }
        if (this.down) {
            this.y_delta = this.speed;
        }
    }

    update() {
        let playerDist = dist(this.x, this.y, character.x, character.y)
        if (!this.hurting) {
            if (playerDist < this.attackRange) {
                this.stopMovement();
                this.attacking = true;
                this.startAttack();
            }
            else if (playerDist < this.seekDistance) {
                this.stopFlag = false;
                this.attacking = false;
                this.seekPlayer(this);
            }
            else {
                // completely out of range,
                // TODO: wander state, for now, we just stop
                this.stopFlag = true;
                this.stopMovement();
                this.attacking = false;
            }
        }
        else {
            // stun due to hurt
            if (this.hurtTimer > this.hurtTimerLength - 10) {
                this.knockBack();
            }
            else {
                this.stopMovement();
            }
            this.attacking = false;
        }
        this.updateDelta();
        this.checkTerrainCollision();
        this.boundX = this.x;
        this.boundY = this.y;
    }

    stopMovement() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }

    knockBack() {
        if (this.knockBackDir == -1) {
            this.left = true;
        }
        else if (this.knockBackDir == 1) {
            this.right = true;
        }
    }

    startAttack() {
        // Override this method
    }

    checkTerrainCollision() {
        var collided_x = false;
        var collided_y = false;
        //check x direction collision
        var offset = 1;
        this.boundX += this.x_delta * offset;
        var currTile = tilemap.getCurrTile(this.x + this.x_delta * offset, this.y);
        if (currTile != null) {
            for (var i = 0; i < currTile.collisionBounds.length; i++) {
                var bound = currTile.collisionBounds[i];
                if (checkCollision(this, bound)) {
                    collided_x = true;
                }
            }
        }
        else {
            collided_x = true;
        }
        for (var i = 0; i < tilemap.wallBounds.length; i++) {
            var bound = tilemap.wallBounds[i];
            if (checkCollision(this, bound)) {
                collided_x = true;
            }
        }
        this.boundX -= this.x_delta * offset;
        // check if we will collide if we move in the y direction
        this.boundY += this.y_delta * offset;
        var currTile = tilemap.getCurrTile(this.x, this.y + this.y_delta * offset);
        if (currTile != null) {
            for (var i = 0; i < currTile.collisionBounds.length; i++) {
                var bound = currTile.collisionBounds[i];
                if (checkCollision(this, bound)) {
                    collided_y = true;
                }
            }
        }
        else {
            collided_y = true;
        }
        for (var i = 0; i < tilemap.wallBounds.length; i++) {
            var bound = tilemap.wallBounds[i];
            if (checkCollision(this, bound)) {
                collided_y = true;
            }
        }
        this.boundY -= this.y_delta * offset;
        if (!collided_y && !collided_x) {
            this.y_delta *= 0.707;
            this.x_delta *= 0.707;
        }
        if (!collided_x) {
            this.x += this.x_delta;
        }
        if (!collided_y) {
            this.y += this.y_delta;
        }
        this.y_delta = 0;
        this.x_delta = 0;
        // Now check for bounds
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x > gameWidth - this.boundW) {
            this.x = gameWidth - this.boundW;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        else if (this.y > gameHeight - this.boundH) {
            this.y = gameHeight - this.boundH;
        }
    }
}