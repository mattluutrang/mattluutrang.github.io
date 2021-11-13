/**
 * This class represents the playable character
 **/
class Character {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.y_delta = 0;
        this.x_delta = 0;

        this.state = "left";
        this.direction = "left";
        this.yDirection = "none";
        this.spriteTimer = 0;
        this.turnFrame = 0;

        this.speed = 2;

        // bounding box
        this.boundX = x;
        this.boundY = y;
        this.boundW = 12;
        this.boundH = 18;

        // weapon variables
        this.weaponX = this.x + 5;
        this.weaponY = this.y + 5;

        this.weaponBoundX = this;
        this.weaponBoundY = this.weaponY;
        this.weaponBoundW = 20;
        this.weaponBoundH = 20;

        this.swingTimer = 160;
        this.swingSpeed = 5;
        this.health = 8;

        this.enemyCollisionTimer = 0;
        this.enemyCollisionTimerLength = 60;
    }

    // states: left, right, left to right, right to left

    // 16, 17, 18, 19 = run right
    // 20, 21, 22, 23 = run left
    // 24 = stationary right
    // 25, 26, 27 = right to left
    // 28 = stationary left
    // 29, 30, 31 = left to right

    draw() {
        if (this.enemyCollisionTimer > 2 * this.enemyCollisionTimerLength / 3) {
            if (this.state == "left2right" || this.state == "right") {
                image(characterSprites[34], this.x, this.y);
            }
            if (this.state == "right2left" || this.state == "left") {
                image(characterSprites[38], this.x, this.y);
            }
        }
        // turn from left to right
        else if (this.state == "left2right") {
            if (characterSprites[29 + this.turnFrame] != null) {
                image(characterSprites[29 + this.turnFrame], this.x, this.y);
            }
            else {
                console.log("Error at frame" + this.turnFrame);
                this.turnFrame = 0;
                image(characterSprites[25 + this.turnFrame], this.x, this.y);
            }
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
            if (characterSprites[25 + this.turnFrame] != null) {
                image(characterSprites[25 + this.turnFrame], this.x, this.y);
            }
            else {
                console.log("Error at frame" + this.turnFrame);
                this.turnFrame = 0;
                image(characterSprites[25 + this.turnFrame], this.x, this.y);
            }
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
            image(characterSprites[20 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
        }
        // run right
        else if (this.state == "right" && this.direction == "right") {
            image(characterSprites[16 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
        }
        // run in direction faced if not moving left or right
        else if (this.yDirection != "none") {
            if (this.state == "left") {
                image(characterSprites[20 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
            }
            else if (this.state == "right") {
                image(characterSprites[16 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
            }
        }
        // stand and face right
        else if (this.state == "right" && this.direction == "none") {
            image(characterSprites[24], this.x, this.y);
        }
        // stand and face left
        else if (this.state == "left" && this.direction == "none") {
            image(characterSprites[28], this.x, this.y);
        }
        // run left if swinging sword to the left and moving right
        else if (this.state == "left" && this.direction == "right") {
            image(characterSprites[20 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
        }
        // run right if swinging sword to the right and moving left
        else if (this.state == "right" && this.direction == "left") {
            image(characterSprites[16 + floor(this.spriteTimer / 10) % 4], this.x, this.y);
        }


        this.spriteTimer++;

        // draw weapon
        if (mainInventorySquares[inventorySelected].item != null && isTool(mainInventorySquares[inventorySelected].item.name)) {
            if (this.swingTimer < 160) {
                // check bounding box collisions
                let weaponsBounds = new WeaponBounds(this.x - 16, this.y)
                if (this.state == "left" || this.state == "right2left") {
                    weaponsBounds = new WeaponBounds(this.x - 16, this.y);
                }
                else if (this.state == "right" || this.state == "left2right") {
                    weaponsBounds = new WeaponBounds(this.x + 15, this.y);
                }
                if (mainInventorySquares[inventorySelected].item.name == "axe") {
                    trees.forEach(tree => {
                        if (checkCollision(tree, weaponsBounds)) {
                            if (tree.shakeTimer == 0) {
                                tree.shakeTimer = tree.shakeLength;
                            }
                        }
                    });
                }
                if (mainInventorySquares[inventorySelected].item.name == "pickaxe") {
                    rocks.forEach(rock => {
                        if (checkCollision(rock, weaponsBounds)) {
                            if (rock.shakeTimer == 0) {
                                rock.shakeTimer = rock.shakeLength;
                            }
                        }
                    });
                }

                enemies.forEach(enemy => {
                    if (checkCollision(enemy, weaponsBounds)) {
                        if (enemy.hurtTimer == 0) {
                            enemy.hurting = true;
                            enemy.hurtTimer = enemy.hurtTimerLength;
                            enemy.health -= 5;
                            if (enemy.health <= 0) {
                                if (enemy.name == "orc") {
                                    objects.push(new Meat(enemy.x, enemy.y));
                                }
                                else if (enemy.name == "skeleton") {
                                    objects.push(new Bone(enemy.x, enemy.y));
                                }
                                if (enemy.name == "chicken") {
                                    objects.push(new Feather(enemy.x, enemy.y));
                                }
                            }
                            enemy.stopMovement();
                            if (this.state == "left" || this.state == "right2left") {
                                //enemy.x -= 10;
                                enemy.knockBackDir = -1;
                            }
                            else if (this.state == "right" || this.state == "left2right") {
                                //enemy.x += 10;
                                enemy.knockBackDir = 1;
                            }
                        }
                    }
                });

                // draw weapons
                push();
                if (this.state == "left" || this.state == "right2left") {
                    translate(this.x - 4, this.y + 10);
                    scale(-1, 1)
                    rotate(oneDegree * (this.swingTimer % 360));
                }
                else if (this.state == "right" || this.state == "left2right") {
                    translate(this.x + 16, this.y + 10);
                    rotate(oneDegree * (this.swingTimer % 360));
                }
                let weaponImgIndex = toolToImageIndex(mainInventorySquares[inventorySelected].item.name);
                image(weaponSprites[weaponImgIndex], -3, -13, 7, 14);
                pop();
                this.swingTimer += this.swingSpeed;
            }
        }
        else {
            if (this.swingTimer < 160) {
                this.swingTimer += this.swingSpeed;
            }
        }
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
    update(canCollide = false) {
        // if left-arrow key is pressed, move character to the left
        if (keyIsDown(LEFT_ARROW)) {
            // update player position based on speed and direction
            this.x_delta = -this.speed;
            this.direction = "left";

            if (this.state == "right" && this.swingTimer == 160) {
                this.state = "right2left";
                this.turnFrame = 0;
            }
            else if (this.state == "left2right" && this.swingTimer == 160) {
                this.state = "right2left";
                this.turnFrame = 3 - this.turnFrame;
            }
        }
        // if right-arrow key is pressed, move character to the right
        else if (keyIsDown(RIGHT_ARROW)) {
            // update player position based on speed and direction
            this.x_delta = this.speed;
            this.direction = "right";

            if (this.state == "left" && this.swingTimer == 160) {
                this.state = "left2right";
                this.turnFrame = 0;
            }
            else if (this.state == "right2left" && this.swingTimer == 160) {
                this.state = "left2right";
                this.turnFrame = 3 - this.turnFrame;
            }
        }
        else {
            this.direction = "none";
        }
        // if up-arrow key is pressed, move character up
        if (keyIsDown(UP_ARROW)) {
            // update player position based on speed and direction
            this.y_delta = -this.speed;
            this.yDirection = "up";
        }
        // if right-arrow key is pressed, move character down
        else if (keyIsDown(DOWN_ARROW)) {
            // update player position based on speed and direction
            this.y_delta = this.speed;
            this.yDirection = "down";
        }
        else {
            this.yDirection = "none";
        }
        if (canCollide) {
            this.checkTerrainCollision();
        }
        else {
            this.x += this.x_delta;
            this.y += this.y_delta;
            this.x_delta = 0;
            this.y_delta = 0;
        }
        // update bounding box
        this.boundX = this.x;
        this.boundY = this.y;

        if (this.enemyCollisionTimer > 0) {
            this.enemyCollisionTimer--;
        }
    }
}

class WeaponBounds {
    constructor(x, y) {
        this.boundX = x;
        this.boundY = y;
        this.boundW = 15;
        this.boundH = 20;
    }
}