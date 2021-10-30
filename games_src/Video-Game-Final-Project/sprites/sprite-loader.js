/**
 * This file handles the loading in of images and the creation of sprite arrays for each different
 * aspect of the project
 */
let mHeroImg;
let dragonImg;
let orcImg;
let skeletonImg;
let weaponsImg;
let beachTilesetImg;
let forestObjectsImg;
let rpgOutsideObjectsImg;
let keyboardLayoutImg;
let craftingRecipeImg;
let chickenImg;

let woodImg;

let characterSprites = [];
let weaponSprites = [];
let beachTileSprites = [];
let forestObjectSprites = [];
let rpgOutsideObjectSprites = [];
let treeSprites = [];
let dragonSprites = [];
let orcSprites = [];
let skeletonSprites = [];
let chickenSprites = [];
let boatSprites = [];
let fancyBoatSprites = [];

function preloadImages() {
    mHeroImg = loadImage('./sprites/mHero_.png');
    dragonImg = loadImage('./sprites/dragon_.png');
    orcImg = loadImage('./sprites/orc_.png');
    skeletonImg = loadImage('./sprites/skeleton_.png');
    weaponsImg = loadImage('./sprites/weapons_.png');
    beachTilesetImg = loadImage('./sprites/Beach Tileset.png');
    forestObjectsImg = loadImage('./sprites/forestDecoration_0.png');
    rpgOutsideObjectsImg = loadImage('./sprites/rpg_outside_objects.png');
    keyboardLayoutImg = loadImage('./sprites/keyboard-layout.png');
    craftingRecipeImg = loadImage('./sprites/crafting_recipe.png');
    chickenImg = loadImage('./sprites/chicken.png');
    woodImg = loadImage('./sprites/wood.png');
}

function loadSprites() {
    loadMHeroSprites();
    loadWeaponsSprites();
    loadBeachTileSprites();
    loadForestObjectSprites();
    loadRpgOutsideObjectSprites();
    loadDragonSprites();
    loadChickenSprites();
    loadOrcSprites();
    loadSkeletonSprites();
}

function loadMHeroSprites() {
    let left = 6;
    let top = 6;
    let spriteWidth = 12;
    let spriteHeight = 18;
    let rowSpacer = 24;
    let columnSpacer = 24;

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 8; j++) {
            characterSprites.push(mHeroImg.get(left + (columnSpacer * j), top + (rowSpacer * i), spriteWidth, spriteHeight));
        }
    }
}

function loadSkeletonSprites() {
    let left = 6;
    let top = 6;
    let spriteWidth = 12;
    let spriteHeight = 18;
    let rowSpacer = 24;
    let columnSpacer = 24;

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 8; j++) {
            skeletonSprites.push(skeletonImg.get(left + (columnSpacer * j), top + (rowSpacer * i), spriteWidth, spriteHeight));
        }
    }
}

function loadOrcSprites() {
    let left = 6;
    let top = 6;
    let spriteWidth = 12;
    let spriteHeight = 18;
    let rowSpacer = 24;
    let columnSpacer = 24;

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 8; j++) {
            orcSprites.push(orcImg.get(left + (columnSpacer * j), top + (rowSpacer * i), spriteWidth, spriteHeight));
        }
    }
}

function loadDragonSprites() {
    let left = 4;
    let top = 4;
    let spriteWidth = 17;
    let spriteHeight = 21;
    let rowSpacer = 24;
    let columnSpacer = 24;

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 8; j++) {
            dragonSprites.push(dragonImg.get(left + (rowSpacer * j), top + (columnSpacer * i), spriteWidth, spriteHeight));
        }
    }
}

function loadWeaponsSprites() {
    let left = 1;
    let top = 2;
    let spriteWidth = 11;
    let spriteHeight = 20;
    let rowSpacer = 12;
    let columnSpacer = 24;

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            weaponSprites.push(weaponsImg.get(left + (rowSpacer * j), top + (columnSpacer * i), spriteWidth, spriteHeight));
        }
    }
}

function loadBeachTileSprites() {
    let spriteWidth = 32;

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 18; j++) {
            beachTileSprites.push(beachTilesetImg.get(j * spriteWidth, (i + 2) * spriteWidth, spriteWidth, spriteWidth));
        }
    }

    treeSprites.push(beachTilesetImg.get(32 * 4, 0, spriteWidth, spriteWidth * 2));
    treeSprites.push(beachTilesetImg.get(32 * 5, 0, spriteWidth, spriteWidth * 2));
    boatSprites.push(beachTilesetImg.get(32 * 6, 0, spriteWidth, spriteWidth));
    boatSprites.push(beachTilesetImg.get(32 * 7, 0, spriteWidth, spriteWidth));
}

function loadForestObjectSprites() {
    let left = 6;
    let top = 6;
    let spriteWidth = 12;
    let spriteHeight = 18;
    let rowSpacer = 24;
    let columnSpacer = 24;

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 8; j++) {
            forestObjectSprites.push(forestObjectsImg.get(left + (columnSpacer * j), top + (rowSpacer * i), spriteWidth, spriteHeight));
        }
    }
}


function loadRpgOutsideObjectSprites() {
    let left = 53;
    let top = 150;
    let spriteWidth = 40;
    let spriteHeight = 40;

    rpgOutsideObjectSprites.push(rpgOutsideObjectsImg.get(left, top, spriteWidth, spriteHeight));
    rpgOutsideObjectSprites.push(rpgOutsideObjectsImg.get(93, 642, 50, 50));
}

function loadChickenSprites() {
    let left = 65;
    let top = 50;
    let spriteWidth = 15;
    let spriteHeight = 15;
    let rowSpacer = 16;
    let columnSpacer = 16;

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 4; j++) {
            chickenSprites.push(chickenImg.get(left + (rowSpacer * j), top + (columnSpacer * i), spriteWidth, spriteHeight));
        }
    }
}
