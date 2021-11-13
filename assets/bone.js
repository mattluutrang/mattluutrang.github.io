/**
 * This class represents a bone which drops from skeletons and is used for craft recipes
 **/
class Bone {

    constructor(x=0, y=0) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;

        this.name = "bone";

        // bounding box position and dimensions
        this.boundX = this.x + 3;
        this.boundY = this.y + 3;
        this.boundW = 20;
        this.boundH = 20;
    }

    draw() {
        stroke("#BDBDBD");
        fill("#BDBDBD");
        image(boneImg, this.x + 3, this.y + 3, 20, 20);
    }
}