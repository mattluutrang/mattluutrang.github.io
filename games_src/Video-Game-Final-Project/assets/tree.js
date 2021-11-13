/**
 * This class represents a tree object which sticks are mined from
 **/
class Tree {

    constructor(x, y) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;

        this.originalX = x;

        // bounding box position and dimensions
        this.boundX = this.x + 7;
        this.boundY = this.y + 7;
        this.boundW = 40;
        this.boundH = 40;

        this.shakeTimer = 0;
        this.shakeSpeed = 0.4;
        this.shakeLength = 40;

        this.hits = 0;
    }

    draw() {

        stroke("#BDBDBD");
        fill("#BDBDBD");
        image(treeSprite, this.x + 7, this.y + 7, 40, 40);
        if(this.shakeTimer > 0) {
            this.shake();
        }
        if (this.hits == 3) {
            objects.push(new Stick(this.x + 25, this.y + 25));
        }
    }

    shake() {
        if (this.shakeTimer < this.shakeLength / 4) {
            this.x += this.shakeSpeed;
        }
        else if (this.shakeTimer < 2 * this.shakeLength / 4) {
            this.x -= this.shakeSpeed;
        }
        else if (this.shakeTimer < 3 * this.shakeLength / 4) {
            this.x += this.shakeSpeed;
        }
        else {
            this.x -= this.shakeSpeed;
        }
         
        this.shakeTimer--;
        if (this.shakeTimer == 0) {
            this.x = this.originalX;
            this.hits++;
        }
    }
}