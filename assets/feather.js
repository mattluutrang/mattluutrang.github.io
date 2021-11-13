/**
 * This class represents the feather object which drops from chickens and is used for crafting recipes
 **/
class Feather {

    constructor(x=0, y=0) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;

        this.name = "feather";

        // bounding box position and dimensions
        this.boundX = this.x + 5;
        this.boundY = this.y + 5;
        this.boundW = 15;
        this.boundH = 15;
    }

    draw() {
        stroke("#BDBDBD");
        fill("#BDBDBD");
        image(featherImg, this.x + 5, this.y + 5, 15, 15);
    }
}