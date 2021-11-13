/**
 * This class represents the wheel object which is used to craft a ship
 **/
class Wheel {

    constructor(x=0, y=0) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;

        this.name = "wheel";

        // bounding box position and dimensions
        this.boundX = this.x + 3.5;
        this.boundY = this.y + 3.5;
        this.boundW = 18;
        this.boundH = 18;
    }

    draw() {
        stroke("#BDBDBD");
        fill("#BDBDBD");
        image(wheelImg, this.x + 3.5, this.y + 3.5, 18, 18);
    }
}