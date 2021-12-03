/**
 * This class represents the enemy interface that the mobs extend from. It contains the base logic for
 * seeking, wandering, and attacking. Each mob can override these methods to have their own unique behavior.
 **/

class Enemy {
    constructor(x, y, size, health, attack, speed) {
        this.x = x;
        this.y = y;
        this.x_delta = 0;
        this.y_delta = 0;
        this.size = size;
        // health will increase with difficulty
        this.health = health + 2 * difficulty;
        // Attack will increase with the difficulty
        this.attack = attack + difficulty;
        this.attackRange = 10;
        this.seekDistance = 100;
        this.step = new p5.Vector(0, 0);
        this.attacking = false;
        this.hurting = false;
        this.dead = false;
        this.speed = speed;
        this.hurtTimer = 0;
        this.knockBackDir = -1;
        this.wanderDist = 0;
        this.wanderDir = 0;
        this.up;
        this.down;
        this.left;
        this.right;
    }
    wasHit(attack) {
        /**
         * If this mob was hit
         */
        if (this.hurtTimer == 0) {
            this.hurting = true;
            this.hurtTimer = this.hurtTimerLength;
            this.health -= attack;
            if (this.health <= 0) {
                if (this.name == "orc") {
                    objects.push(new Meat(this.x, this.y));
                }
                else if (this.name == "skeleton") {
                    objects.push(new Bone(this.x, this.y));
                }
                if (this.name == "chicken") {
                    if (Math.random() < 0.25) {
                        objects.push(new Meat(this.x, this.y));
                    }
                    else {
                        objects.push(new Feather(this.x, this.y));
                    }
                }
            }
            this.stopMovement();
            if (character.state == "left" || character.state == "right2left") {
                this.knockBackDir = -1;
            }
            else if (character.state == "right" || character.state == "left2right") {
                this.knockBackDir = 1;
            }
        }
    }
    seekPlayer() {
        let separation = new p5.Vector(-this.x + character.x, -this.y + character.y);
        separation.normalize();
        separation.mult(this.speed);
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

    wander() {
        if (this.wanderDist <= 0) {
            this.wanderDist = random(10, 20);
            let prevDir = this.wanderDir;
            this.wanderDir = int(random(9));
            // while (this.wanderDir === UP || this.wanderDir === DOWN) {
            //     // TODO: Fix up and down animation and then this can be removed
            //     this.wanderDir = int(random(9));
            // }
            if (this.wanderDir === LEFT || this.wanderDir === UP_LEFT || this.wanderDir === DOWN_LEFT) {
                this.direction = "left";
                if (prevDir === RIGHT || prevDir === UP_RIGHT || prevDir === DOWN_RIGHT) {
                    this.state = "right2left";
                }
                else {
                    this.state = "left";
                }
            }
            if (this.wanderDir === RIGHT || this.wanderDir === UP_RIGHT || this.wanderDir === DOWN_RIGHT) {
                this.direction = "right";
                if (prevDir === LEFT || prevDir === UP_LEFT || prevDir === DOWN_LEFT) {
                    this.state = "left2right";
                }
                else {
                    this.state = "right";
                }
            }
            else if (this.wanderDir === STOP) {
                this.direction = "none";
                this.yDirection = "none";
            }
            else {
                // we are going straight up or straight down, just randomly choose a way to face
                this.yDirection = "up";
            }
            this.turnFrame = 0;
        }
        else {
            this.wanderDist -= 1;
            switch (this.wanderDir) {
                case LEFT:
                    this.stopMovement();
                    this.left = true;
                    break;
                case RIGHT:
                    this.stopMovement();
                    this.right = true;
                    break;
                case UP:
                    this.stopMovement();
                    this.up = true;
                    break;
                case DOWN:
                    this.stopMovement();
                    this.down = true;
                    break;
                case UP_LEFT:
                    this.stopMovement();
                    this.up = true;
                    this.left = true;
                    break;
                case UP_RIGHT:
                    this.stopMovement();
                    this.up = true;
                    this.right = true;
                    break;
                case DOWN_LEFT:
                    this.stopMovement();
                    this.down = true;
                    this.left = true;
                    break;
                case DOWN_RIGHT:
                    this.stopMovement();
                    this.down = true;
                    this.right = true;
                    break;
                case STOP:
                    this.stopMovement();
                    break;
            }
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
                // completely out of range, wander
                this.wander();
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