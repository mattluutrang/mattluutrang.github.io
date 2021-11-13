/**
 * This class represents a chunk used for terrain generation
 **/
class Chunk {
    constructor(chunkWidth, chunkHeight, x, y, overrideType = 0) {
        this.width = chunkWidth;
        this.height = chunkHeight;
        this.x = x;
        this.y = y;
        this.chunkId = new p5.Vector(floor(x / width), floor(y / height));
        this.gridSize = 40;
        this.gridDim = new p5.Vector(chunkWidth / this.gridSize, chunkHeight / this.gridSize);
        this.gridOffsetY = this.chunkId.x * (this.gridDim.x);
        this.gridOffsetX = this.chunkId.y * (this.gridDim.y);

        this.noiseMap = [];
        this.overrideType = overrideType;
        this.accentMap = [];
        this.generateOverride();
        this.condensedStringMap = [];
        this.scale2 = 1;
        this.scale = 0.1;
        this.tiles;
        this.generateMap();
    }
    generateOverride() {
        var xRef = 0;
        var yRef = 0;
        var maxDist = 0;
        switch (this.overrideType) {
            case 0:
                for (let i = 0; i < this.gridDim.x; i++) {
                    this.accentMap[i] = [];
                    for (let j = 0; j < this.gridDim.y; j++) {
                        this.accentMap[i][j] = 1;
                    }
                }
                return;
            case 1:
                // One block island case
                xRef = width / 2;
                yRef = height / 2;
                maxDist = dist(xRef, yRef, 0, 0);
                break;
        }
        for (let i = 0; i < this.gridDim.x; i++) {
            this.accentMap[i] = [];
            for (let j = 0; j < this.gridDim.y; j++) {
                let elevation = 1 * dist(i, j, xRef, yRef) / maxDist;
                this.accentMap[i][j] = elevation;
            }
        }
    }
    generateMap() {
        for (let i = 0; i <= this.gridDim.x; i++) {
            this.noiseMap[i] = [];
            this.condensedStringMap[i] = [];
            for (let j = 0; j <= this.gridDim.y; j++) {

                let elevation = noise(this.scale * (this.gridOffsetX + i), this.scale * (this.gridOffsetY + j));
                //elevation *= this.accentMap[i][j];
                this.noiseMap[i][j] = elevation;
                if (elevation > 0.75) {
                    this.condensedStringMap[i][j] = "g"
                }
                else if (elevation > 0.60) {
                    this.condensedStringMap[i][j] = "y"
                }
                else if (elevation > 0.4) {
                    this.condensedStringMap[i][j] = "o"
                }
                else {
                    this.condensedStringMap[i][j] = "w"
                }
            }
        }
        this.tiles = createRealTileset(this.condensedStringMap, this.x, this.y);
        this.tiles.forEach(tile => {
            if (!tile.hasWater && tile.x % 40 == 0 && tile.y % 40 == 0) {
                let rand = Math.random();

                if (rand < 0.02) {
                    // put in tree
                    trees.push(new Tree(tile.x, tile.y))
                }
                else if (rand < 0.04) {
                    // put in stone
                    rocks.push(new Rock(tile.x, tile.y))
                }
            }
        });
    }
    generateMapV2() {
        for (let i = 0; i < this.gridDim.x; i++) {
            this.noiseMap[i] = [];
            this.condensedStringMap[i] = [];
            for (let j = 0; j < this.gridDim.y; j++) {
                let idx = (this.gridOffsetX + i) * 400 + (this.gridOffsetY + j)
                console.log(idx)
                let noiseVal = noiseArray[idx];

                if (noiseVal < 200) {
                    console.log(idx)
                }
                let elevation = (255 - noiseArray[idx]) / 255;
                //elevation *= this.accentMap[i][j];
                this.noiseMap[i][j] = elevation;
                if (elevation > 0.75) {
                    this.condensedStringMap[i][j] = "g"
                }
                else if (elevation > 0.60) {
                    this.condensedStringMap[i][j] = "y"
                }
                else if (elevation > 0.45) {
                    this.condensedStringMap[i][j] = "o"
                }
                else {
                    this.condensedStringMap[i][j] = "w"
                }
            }
        }
        this.tiles = createRealTileset(this.condensedStringMap, this.x, this.y);
        this.tiles.forEach(tile => {
            if (!tile.hasWater && tile.x % 80 == 0 && tile.y % 80 == 0) {
                let rand = Math.random();

                if (rand < 0.04) {
                    // put in tree
                    trees.push(new Tree(tile.x, tile.y))
                }
                else if (rand < 0.08) {
                    // put in stone
                    rocks.push(new Rock(tile.x, tile.y))
                }
            }
        });
    }
    draw() {
        this.tiles.forEach(tile => tile.draw());
    }
}
/**
 * This class represents the game tilemap
 **/
class TileMap {
    constructor(mapWidth, mapHeight, x, y) {
        this.width = mapWidth;
        this.height = mapHeight;
        // We define a chunk as the size of the screen.
        this.chunksDim = [mapWidth / width, mapHeight / height]
        this.x = x;
        this.y = y;
        this.currChunkId = new p5.Vector(floor(x / width), floor(y / height));

        this.chunkDim = [width, height]
        this.chunks = [[]];
        this.n = [[]];
        this.centers = [[]]
        this.wallBounds = [];
        //noiseDetail(8, 0.4)
        this.initializeChunks();
    }
    initializeChunks() {
        let dirs = [-1, 0, 1];
        dirs.forEach(dirX => {
            dirs.forEach(dirY => {
                let chunkX = this.currChunkId.x + dirX;
                let chunkY = this.currChunkId.y + dirY;
                if (chunkX >= 0 && chunkX < this.chunksDim[0] && chunkY >= 0 && chunkY < this.chunksDim[1]) {
                    if (this.chunks[chunkX] == undefined) {
                        this.chunks[chunkX] = [];
                    }
                    if (this.chunks[chunkX][chunkY] == undefined) {
                        this.chunks[chunkX][chunkY] = new Chunk(width, height, chunkX * width, chunkY * height);
                    }
                }
            }
            );
        });
    }
    draw() {
        this.currChunkId.x = floor(character.x / width);
        this.currChunkId.y = floor(character.y / height);
        this.initializeChunks();
        let dirs = [-1, 0, 1];
        dirs.forEach(dirX => {
            dirs.forEach(dirY => {
                let chunkX = this.currChunkId.x + dirX;
                let chunkY = this.currChunkId.y + dirY;
                if (chunkX >= 0 && chunkX < this.chunksDim[0] && chunkY >= 0 && chunkY < this.chunksDim[1]) {
                    if (this.chunks[chunkX] != undefined && this.chunks[chunkX][chunkY] != undefined) {
                        this.chunks[chunkX][chunkY].draw();
                    }
                }
            }
            );
        });
    }
    getSpawnableTile() {
        let chunkX = this.currChunkId.x;
        let chunkY = this.currChunkId.y;
        let tiles = this.chunks[chunkX][chunkY].tiles;
        for (let i = 0; i < tiles.length; i++) {
            if (!tiles[i].hasWater) {
                return tiles[i];
            }
        }
        return null;
    }
    getCurrTile(x, y) {
        let chunkID = new p5.Vector(floor(x / width), floor(y / height));
        if (this.chunks[chunkID.x] != undefined && this.chunks[chunkID.x][chunkID.y] != undefined) {
            let tiles = this.chunks[chunkID.x][chunkID.y].tiles;
            for (let i = 0; i < tiles.length; i++) {
                if (floor(tiles[i].x / 20) == floor(x / 20) && floor(tiles[i].y / 20) == floor(y / 20)) {
                    return tiles[i];
                }
            }
        }
        return null;
    }
}