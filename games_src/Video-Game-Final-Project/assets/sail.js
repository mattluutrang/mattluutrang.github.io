/**
 * This class represents the sail object which is used to craft a ship
 **/
class Sail {

    constructor(x=0, y=0) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;

        this.name = "sail";

        // bounding box position and dimensions
        this.boundX = this.x + 5;
        this.boundY = this.y + 5;
        this.boundW = 15;
        this.boundH = 15;
    }

    draw() {
        stroke("#BDBDBD");
        fill("#BDBDBD");
        image(sailImg, this.x + 5, this.y + 5, 15, 15);
    }
}