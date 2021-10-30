class Character {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.state = "left";
        this.direction = "left";
        this.yDirection = "none";
        this.spriteTimer = 0;
        this.turnFrame = 0;

        this.speed = 1;

        // bounding box 
        this.boundX = x;
        this.bounyY = y;
        this.boundW = 12;
        this.boundH = 18;

        // weapon variables
        this.weaponX = this.x + 5;
        this.weaponY = this.y + 5;
 
        this.swingTimer = 160;
        this.swingSpeed = 5;
    }

    // states: left, right, left to right, right to left

    // 16, 17, 18, 19 = run right
    // 20, 21, 22, 23 = run left
    // 24 = stationary right
    // 25, 26, 27 = right to left
    // 28 = stationary left
    // 29, 30, 31 = left to right

    draw() {
        // turn from left to right
        if (this.state == "left2right") {
            image(characterSprites[29 + this.turnFrame], this.x, this.y);
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
            image(characterSprites[25 + this.turnFrame], this.x, this.y);
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
        if (mainInventorySquares[inventorySelected].item != null && mainInventorySquares[inventorySelected].item.name == "sword") {
            if (this.swingTimer < 160) {
                push();
                if (this.state == "left" || this.state == "right2left") {
                    translate(this.x - 4, this.y + 10);
                    rotate(oneDegree * (360 - (this.swingTimer % 360)));
                }
                else if (this.state == "right" || this.state == "left2right") {
                    translate(this.x + 16, this.y + 10);
                    rotate(oneDegree * (this.swingTimer % 360));
                }
                image(weaponSprites[1], -3, -13, 7, 14);
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
    
    update() {
        // if left-arrow key is pressed, move character to the left
        if (keyIsDown(LEFT_ARROW)) {
            // update player position based on speed and direction
            this.x -= this.speed;
            this.direction = "left";

            if (this.state == "right" && this.swingTimer == 160) {
                this.state = "right2left";
                this.turnFrame  = 0;
            }
            else if (this.state == "left2right" && this.swingTimer == 160) {
                this.state = "right2left";
                this.turnFrame  = 3 - this.turnFrame;
            }
        }
        // if right-arrow key is pressed, move character to the right
        else if (keyIsDown(RIGHT_ARROW)) {
            // update player position based on speed and direction
            this.x += this.speed;
            this.direction = "right";
            
            if (this.state == "left" && this.swingTimer == 160) {
                this.state = "left2right";
                this.turnFrame  = 0;
            }
            else if (this.state == "right2left" && this.swingTimer == 160) {
                this.state = "left2right";
                this.turnFrame  = 3 - this.turnFrame;
            }
        }
        else {
            this.direction = "none";
        }
        // if up-arrow key is pressed, move character up
        if (keyIsDown(UP_ARROW)) {
            // update player position based on speed and direction
            this.y -= this.speed;
            this.yDirection = "up";
        }
        // if right-arrow key is pressed, move character down
        else if (keyIsDown(DOWN_ARROW)) {
            // update player position based on speed and direction
            this.y += this.speed;
            this.yDirection = "down";
        }
        else {
            this.yDirection = "none";
        }

        // update bounding box
        this.boundX = this.x;
        this.boundY = this.y;
    } 
}