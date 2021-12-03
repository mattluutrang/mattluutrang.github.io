/**
 * This class represents an dragon head used to craft a ship dropped from the final boss
 **/
 class DragonHead {

    constructor(x=0, y=0) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;

        this.name = "dragonhead";

        // bounding box position and dimensions
        this.boundX = this.x + 3.5;
        this.boundY = this.y + 3.5;
        this.boundW = 18;
        this.boundH = 18;
    }

    draw() {
        stroke("#BDBDBD");
        fill("#BDBDBD");
        image(dragonSprites[7].get(0, 2, 14, 11), this.x + 5, this.y + 6);
    }
}