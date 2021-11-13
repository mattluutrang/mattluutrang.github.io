/**
 * This class represents the spawner object which spawns objects randomly
 **/
class Spawner {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getSpawnTile() {
        var tile;
        while (tile === undefined) {
            var potentialX = Math.floor(Math.random() * this.width) + character.x - 200;
            var potentialY = Math.floor(Math.random() * this.height) + character.y - 200;
            var possTile = tilemap.getCurrTile(potentialX, potentialY);
            if (possTile !== null && possTile.spawnable) {
                tile = possTile;
            }
        }
        return tile;
    }
}
/**
 * This class represents the enemy spawner object which spawns enemies randomly
 **/
class EnemySpawner extends Spawner {
    constructor(width, height, spawnRates, spawnFrame) {
        super(width, height);
        this.spawnFrame = spawnFrame;
        this.spawnableEnemies = ["orc", "skeleton", "chicken"];
        this.spawnRates = [0.05, 0.05, 0.05];
        this.maxEnemies = 20;
        this.despawnRange = 600;
    }
    spawn() {
        if (frameCount % this.spawnFrame === 0) {
            if (enemies.length < this.maxEnemies) {
                for (var i = 0; i < this.spawnableEnemies.length; i++) {
                    var enemy = this.spawnableEnemies[i];
                    if (random() < this.spawnRates[i]) {
                        var tile = this.getSpawnTile();
                        enemies.push(nameToClass(enemy, tile.x, tile.y));
                    }
                }
            }
            this.manageEnemiesList();
        }
    }
    manageEnemiesList() {
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].dead) {
                enemies.splice(i, 1);
            }
            else if (dist(enemies[i].x, enemies[i].y, character.x, character.y) > this.despawnRange) {
                enemies.splice(i, 1);
            }
        }
    }
}