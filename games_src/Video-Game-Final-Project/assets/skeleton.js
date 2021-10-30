class Skeleton {
    constructor(x, y, size = 20) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.state = "left";
        this.direction = "left";
        this.yDirection = "none";
        this.spriteTimer = 0;
        this.turnFrame = 0;

        this.speed = 1;

        // bounding box
        this.boundX = x;
        this.boundY = y;
        this.boundW = 12;
        this.boundH = 18;
        this.scale = this.size / 20;

        this.sprites = skeletonSprites;
    }


    draw() {
        // turn from left to right

        if (this.stopFlag) {
            image(this.sprites[20], this.x, this.y);
        }
        else {

            if (this.state == "left2right") {
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
    }

}