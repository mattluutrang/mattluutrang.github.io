class Tile {
    constructor(x, y, imageIndex) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        
        this.image = beachTileSprites[imageIndex];
    }

    draw() {
        image(this.image, this.x, this.y, this.w, this.h);
    }
}