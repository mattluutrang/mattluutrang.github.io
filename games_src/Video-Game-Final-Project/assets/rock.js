/**
 * This class represents the rock object which stone is mined from
 **/
class Rock {

    constructor(x, y) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;

        this.orignalX = x;

        // bounding box position and dimensions
        this.boundX = this.x + 7;
        this.boundY = this.y + 7;
        this.boundW = 20;
        this.boundH = 20;

        this.shakeTimer = 0;
        this.shakeSpeed = 0.4;
        this.shakeLength = 40;

        this.hits = 0;
    }

    draw() {
        stroke("#BDBDBD");
        fill("#BDBDBD");
        image(rockSprite, this.x + 7, this.y + 7, 20, 20);
        if(this.shakeTimer > 0) {
            this.shake();
        }
        if (this.hits == 3) {
            // mine rock objective completed
            rocksMined++;
            if (objectiveNum == 4) {
                objectiveNum++;
            }
            objects.push(new Stone(this.x + 8, this.y + 8));
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
            this.hits++;
            this.x = this.orignalX;
        }
    }
}