class Stick {

    constructor(x=0, y=0) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;

        this.name = "stick";

        // bounding box position and dimensions
        this.boundX = this.x + 7;
        this.boundY = this.y + 7;
        this.boundW = 10;
        this.boundH = 10;
    }

    draw() {
        stroke("#635341");
        fill("#635341");
        image(rpgOutsideObjectSprites[1], this.x + 7, this.y + 7, 10, 10);
    }
}