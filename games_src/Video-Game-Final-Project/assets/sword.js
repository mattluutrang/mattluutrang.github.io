/**
 * This class represents the sword object which is used for attacking mobs
 **/
class Sword {

    constructor(x=0, y=0) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;

        this.name = "sword";
        
        this.boundX = this.x + 7;
        this.boundY = this.y + 7;
        this.boundW = 10;
        this.boundH = 10;
    }

    draw() {
        image(weaponSprites[1], this.x + 7, this.y + 2, 11, 20);
    }
}