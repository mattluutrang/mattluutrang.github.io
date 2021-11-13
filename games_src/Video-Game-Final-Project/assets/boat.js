/**
 * This class represents a boat used for animation
 **/
class Boat {
    constructor(x, y, size = 20, fancy = false, speed = 1) {
        this.x = x;
        this.y = y;
        this.size = size;

        this.state = "right";
        this.speed = speed;

        // bounding box
        this.boundX = x;
        this.boundY = y;
        this.boundW = 12;
        this.boundH = 18;
        this.scale = this.size / 20;

        if (fancy) {
            this.sprites = fancyBoatSprites;
        }
        else {
            this.sprites = boatSprites;
        }
    }
    draw() {
        // run left
        if (this.state == "right") {
            image(this.sprites[0], this.x, this.y, this.size, this.size);
        }
        // run right
        else if (this.state == "left") {
            image(this.sprites[1], this.x, this.y, this.size, this.size);
        }
        else if (this.state == "up") {
            image(this.sprites[2], this.x, this.y);
        }
        else if (this.state == "down") {
            image(this.sprites[3], this.x, this.y);
        }
    }
    update() {
        if (this.state == "right") {
            this.x += this.speed;
        }
        else if (this.state == "left") {
            this.x -= this.speed;
        }
        else if (this.state == "up") {
            this.y -= this.speed;
        }
        else if (this.state == "down") {
            this.y += this.speed;
        }
    }
    checkBorders() {
        if (this.x > width + this.size) {
            this.x = -this.size;
        }
        else if (this.x < -this.size) {
            this.x = width + this.size;
        }
    }
}