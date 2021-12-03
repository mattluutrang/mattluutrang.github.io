// Factory function:
// returns the object based on the name given
function nameToClass(name, x, y) {
    if (name == "stick") {
        return new Stick(x, y);
    }
    else if (name == "stone") {
        return new Stone(x, y);
    }
    else if (name == "sword") {
        return new Sword(x, y);
    }
    else if (name == "axe") {
        return new Axe(x, y);
    }
    else if (name == "pickaxe") {
        return new Pickaxe(x, y);
    }
    else if (name == "wooden-wall") {
        return new WoodenWall(x, y, 20);
    }
    else if (name == "meat") {
        return new Meat(x, y);
    }
    else if (name == "skeleton") {
        return new Skeleton(x, y);
    }
    else if (name == "orc") {
        return new Orc(x, y);
    }
    else if (name == "chicken") {
        return new Chicken(x, y);
    }
    else if (name == "bone") {
        return new Bone(x, y);
    }
    else if (name == "wheel") {
        return new Wheel(x, y);
    }
    else if (name == "feather") {
        return new Feather(x, y);
    }
    else if (name == "sail") {
        return new Sail(x, y);
    }
    else if (name == "anchor") {
        return new Anchor(x, y);
    }
    else if (name == "ship") {
        return new Ship(x, y);
    }
    else if (name == "dragon") {
        return new Dragon(x, y);
    }
    else if (name == "necromancer") {
        return new Necromancer(x, y);
    }
    else if (name == "ghost") {
        return new Ghost(x, y);
    }
    else if (name == "dragonhead") {
        return new DragonHead(x, y);
    }
    else {
        console.error("Unknown name: " + name);
    }
}

function isTool(name) {
    return name == "sword" || name == "axe" || name == "pickaxe";
}

function isWall(name) {
    return name == "wooden-wall";
}

function toolToImageIndex(tool) {
    if (tool == "sword") {
        return 1;
    }
    else if (tool == "axe") {
        return 6;
    }
    else if (tool == "pickaxe") {
        return 11;
    }
    return 0;
}