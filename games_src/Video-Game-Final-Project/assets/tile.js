/**
 * This class represents the tile bounding box
 **/
class TileBoundingBox {
    constructor(x, y, width, height) {
        this.boundX = x;
        this.boundY = y;
        this.boundW = width;
        this.boundH = height;
    }
}
/**
 * This class represents the tile object used in the tileset
 **/
class Tile {
    constructor(x, y, imageIndex, hasWater = false) {
        this.x = x;
        this.y = y;
        // Weird lines were appearing when the w and h were only 20
        this.w = 20.5;
        this.h = 20.5;

        this.imageIndex = imageIndex;
        this.string = mapNumToBeachTileString(imageIndex);
        this.hasWater = hasWater;
        this.spawnable = !hasWater;
        this.image = beachTileSprites[imageIndex];
        this.collisionBounds = [];
        this.calculateCollisionBounds();
    }

    draw() {
        image(this.image, this.x, this.y, this.w, this.h);
    }
    calculateCollisionBounds() {
        var waterIdxs = [];
        if (this.string.length === 4) {
            waterIdxs = indexes(this.string, 'w');
        }
        else if (this.string.length === 3) {
            let tempIdxs = indexes(this.string, 'w');
            if (tempIdxs[0] == undefined) {
                waterIdxs = [];
            }
            else if (tempIdxs[0] == 1) {
                waterIdxs = [0, 1];
            }
            else if (tempIdxs[0] == 2) {
                waterIdxs = [2, 3];
            }
        }
        else if (this.string.length === 2) {
            let tempIdxs = indexes(this.string, 'w');
            if (tempIdxs[0] == undefined) {
                waterIdxs = [];
            }
            else if (tempIdxs[0] == 0) {
                waterIdxs = [0, 2];
            }
            else if (tempIdxs[0] == 1) {
                waterIdxs = [1, 3];
            }
        }
        else if (this.string.length === 1) {
            if (this.string === 'w') {
                waterIdxs = [0, 1, 2, 3];
            }
        }

        for (var i = 0; i < waterIdxs.length; i++) {
            var idx = waterIdxs[i];
            var x = this.x + (idx % 2) * this.w / 2;
            var y = this.y + Math.floor(idx / 2) * this.h / 2;
            this.collisionBounds.push(new TileBoundingBox(x, y, this.w / 2, this.h / 2));
        }
    }
}