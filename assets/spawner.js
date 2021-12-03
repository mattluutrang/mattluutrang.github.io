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
            if (dist(character.x, character.y, potentialX, potentialY) > 50) {
                var possTile = tilemap.getCurrTile(potentialX, potentialY);
                if (possTile !== null && possTile.spawnable) {
                    tile = possTile;
                }
            }
        }
        return tile;
    }
}
/**
 * This class represents the enemy spawner object which spawns enemies randomly
 **/
class EnemySpawner extends Spawner {
    constructor(width, height, spawnableEnemies = ["orc", "skeleton", "chicken"], spawnRates = [0.05, 0.05, 0.05], spawnFrames = [0, 5, 10], mobCapsCounts = [5, 10, 15]) {
        super(width, height);
        this.spawnFrames = spawnFrames;
        this.spawnableEnemies = spawnableEnemies;
        this.spawnRates = spawnRates;
        this.mobCapsCounts = mobCapsCounts;
        this.despawnRange = 250;
        this.minSpawnRate = 0.02;
    }
    spawn(spawnFlags) {
        for (var i = 0; i < spawnFlags.length; i++) {
            if (spawnFlags[i] != 0) {
                if (enemyCounts[i] < this.mobCapsCounts[i]) {
                    if (frameCount % 60 === this.spawnFrames[i]) {
                        var enemy = this.spawnableEnemies[i];
                        if (random() < this.spawnRates[i]) {
                            var tile = this.getSpawnTile();
                            enemies.push(nameToClass(enemy, tile.x, tile.y));
                            enemyCounts[i]++;
                        }
                    }
                    this.manageEnemiesList();
                }
            }
        }
    }
    manageEnemiesList() {
        for (var i = 0; i < enemies.length; i++) {
            if (!enemies[i].isBoss) {
                if (dist(enemies[i].x, enemies[i].y, character.x, character.y) > this.despawnRange) {
                    enemyCounts[enemyNames.indexOf(enemies[i].name)]--;
                    enemies.splice(i, 1);
                }
            }
        }
    }
    decreaseSpawnRates(index, amount) {
        this.spawnRates[index] /= amount;
        if (this.spawnRates[index] < this.minSpawnRate) {
            this.spawnRates[index] = this.minSpawnRate;
        }
    }
}
class BossSpawner extends Spawner {
    constructor(width, height, difficulty = EASY) {
        super(width, height);
        this.spawnableEnemies = ["dragon"];
        this.spawnRates = [1];
        this.maxEnemies = 1;
        this.bossSpawned = false;
    }
    spawn() {
        if (!this.bossSpawned) {
            for (var i = 0; i < this.spawnableEnemies.length; i++) {
                var enemy = this.spawnableEnemies[i];
                if (random() < this.spawnRates[i]) {
                    var tile = this.getSpawnTile();
                    enemies.push(nameToClass(enemy, tile.x, tile.y));
                    console.log("Spawning Dragon")
                    this.bossSpawned = true;
                }
            }
        }
    }
}