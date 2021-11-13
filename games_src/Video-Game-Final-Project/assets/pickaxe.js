/**
 * This class represents the pickaxe object which is used to mine rock
 **/
class Pickaxe {

    constructor(x=0, y=0) {
        // set the position and dimensions
        this.x = x;
        this.y = y;
        this.w = 25;
        this.h = 25;

        this.name = "pickaxe";
        
        this.boundX = this.x + 7;
        this.boundY = this.y + 7;
        this.boundW = 10;
        this.boundH = 10;
    }

    draw() {
        image(weaponSprites[11], this.x + 7, this.y + 2, 11, 20);
    }
}