/**
 * This class represents the meat object which drops from orcs and is used for healing
 **/
class Meat {

    constructor(x=0, y=0) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;

        this.name = "meat";

        // bounding box position and dimensions
        this.boundX = this.x + 3;
        this.boundY = this.y + 3;
        this.boundW = 20;
        this.boundH = 20;
    }

    draw() {
        stroke("#BDBDBD");
        fill("#BDBDBD");
        image(meatImg, this.x + 3, this.y + 3, 20, 20);
    }
}