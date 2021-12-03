/**
 * Takes in a craftingGrid and returns the Object that the crafting grid can craft if possible
 */
function getCraftingResult(craftingGrid) {
    

    if (listToGridCheck(null, "stone", null, null, "stone", null, null, "stick", null, craftingGrid)) {
        return new Sword(250, 80);
    }
    if (listToGridCheck(null, "stone", "stone", null, "stick", null, null, "stick", null, craftingGrid)) {
        return new Axe(250, 80);
    }
    if (listToGridCheck("stone", "stone", "stone", null, "stick", null, null, "stick", null, craftingGrid)) {
        return new Pickaxe(250, 80);
    }
    if (listToGridCheck("stick", "stick", null, "stick", "stick", null, null, null, null, craftingGrid) || 
        listToGridCheck(null, "stick", "stick", null, "stick", "stick", null, null, null, craftingGrid) || 
        listToGridCheck(null, null, null, "stick", "stick", null, "stick", "stick", null, craftingGrid) || 
        listToGridCheck(null, null, null, null, "stick", "stick", null, "stick", "stick", craftingGrid)) {
        return new WoodenWall(250, 80);
    }
    if (listToGridCheck("bone", "stick", "bone", "stick", "stone", "stick", "bone", "stick", "bone", craftingGrid)) {
        return new Wheel(250, 80);
    }
    if (listToGridCheck("feather", "feather", "feather", "feather", "feather", "feather", "feather", "feather", "feather", craftingGrid)) {
        return new Sail(250, 80);
    }
    if (listToGridCheck(null, "stone", null, "bone", "stone", "bone", "stone", "stone", "stone", craftingGrid)) {
        return new Anchor(250, 80);
    }
    if (listToGridCheck("dragonhead", "sail", null, "wheel", "stick", "anchor", "wooden-wall", "wooden-wall", "wooden-wall", craftingGrid)) {
        return new Ship(250, 80);
    }

    return null;
}

/**
 * Helper function that takes in the items as parameters and checks the craftingGrid
 */
function listToGridCheck(item00, item01, item02, item10, item11, item12, item20, item21, item22, craftingGrid) {
    if ((item00 == null && craftingGrid["0|0"] != null) || (item00 != null && (craftingGrid["0|0"] == null || craftingGrid["0|0"].name != item00))) {
        return false;
    }
    if ((item01 == null && craftingGrid["0|1"] != null) || (item01 != null && (craftingGrid["0|1"] == null || craftingGrid["0|1"].name != item01))) {
        return false;
    }
    if ((item02 == null && craftingGrid["0|2"] != null) || (item02 != null && (craftingGrid["0|2"] == null || craftingGrid["0|2"].name != item02))) {
        return false;
    }
    if ((item10 == null && craftingGrid["1|0"] != null) || (item10 != null && (craftingGrid["1|0"] == null || craftingGrid["1|0"].name != item10))) {
        return false;
    }
    if ((item11 == null && craftingGrid["1|1"] != null) || (item11 != null && (craftingGrid["1|1"] == null || craftingGrid["1|1"].name != item11))) {
        return false;
    }
    if ((item12 == null && craftingGrid["1|2"] != null) || (item12 != null && (craftingGrid["1|2"] == null || craftingGrid["1|2"].name != item12))) {
        return false;
    }
    if ((item20 == null && craftingGrid["2|0"] != null) || (item20 != null && (craftingGrid["2|0"] == null || craftingGrid["2|0"].name != item20))) {
        return false;
    }
    if ((item21 == null && craftingGrid["2|1"] != null) || (item21 != null && (craftingGrid["2|1"] == null || craftingGrid["2|1"].name != item21))) {
        return false;
    }
    if ((item22 == null && craftingGrid["2|2"] != null) || (item22 != null && (craftingGrid["2|2"] == null || craftingGrid["2|2"].name != item22))) {
        return false;
    }
    return true;
}