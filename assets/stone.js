/**
 * This class represents the stone object which is used for crafting
 **/
class Stone {

    constructor(x=0, y=0) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;

        this.name = "stone";

        // bounding box position and dimensions
        this.boundX = this.x + 7;
        this.boundY = this.y + 7;
        this.boundW = 10;
        this.boundH = 10;
    }

    draw() {
        stroke("#BDBDBD");
        fill("#BDBDBD");
        image(rpgOutsideObjectSprites[0], this.x + 7, this.y + 7, 10, 10);
    }
}