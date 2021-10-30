let condensedTileset;
let expandedTileset;
let tiles = [];


// create the tileset map
// because of the way our tile assets work,
// the tileset must be expanded first as so:
// x x x 
// o o o
// turns to 
// x - x - x
// - - - - -
// o - o - o
// the gaps are then filled in with the correct tiles
function createRealTileset() {
    condensedTileset = [
        ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
        ['w', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'w'],
        ['w', 'o', 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'o', 'w'],
        ['w', 'o', 'y', 'g', 'g', 'g', 'g', 'g', 'y', 'o', 'w'],
        ['w', 'o', 'y', 'g', 'g', 'g', 'g', 'g', 'y', 'o', 'w'],
        ['w', 'o', 'y', 'g', 'g', 'g', 'g', 'g', 'y', 'o', 'w'],
        ['w', 'o', 'y', 'g', 'g', 'g', 'g', 'g', 'y', 'o', 'w'],
        ['w', 'o', 'y', 'g', 'g', 'g', 'g', 'g', 'y', 'o', 'w'],
        ['w', 'o', 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'o', 'w'],
        ['w', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'w'],
        ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
    ];
    expandedTileset = [];
    // init empty expanded tileset
    let placeholder = [];
    for (let i = 0; i < condensedTileset[0].length * 2 - 1; i++) {
        placeholder.push("*");
    }

    for (let i = 0; i < condensedTileset.length * 2 - 1; i++) {
        expandedTileset.push(placeholder.slice());
    }

    // put condensed tileset onto expanded tilseset
    for (let i = 0; i < condensedTileset.length; i++) {
        for (let j = 0; j < condensedTileset[0].length; j++) {
            expandedTileset[i * 2][j * 2] = condensedTileset[i][j];
        }
    }

    // fill in the gaps in expanded tileset
    for (let i = 0; i < expandedTileset.length; i++) {
        for (let j = 0; j < expandedTileset[0].length; j++) {
            // if i is odd and j is even, we are at a ud intersetcion
            if (i % 2 != 0 && j % 2 == 0) {
                // if top and bottom tiles are the same, the intersecting tile will also be the same
                if (expandedTileset[i - 1][j] == expandedTileset[i + 1][j]) {
                    expandedTileset[i][j] = expandedTileset[i - 1][j];
                }
                else {
                    expandedTileset[i][j] = 'v' + expandedTileset[i - 1][j] + expandedTileset[i + 1][j];
                }
            }
            // if i is even and j is odd, we are at a lr intersection
            else if (i % 2 == 0 && j % 2 != 0) {
                // if left and right tiles are the same, the intersecting tile will also be the same
                if (expandedTileset[i][j - 1] == expandedTileset[i][j + 1]) {
                    expandedTileset[i][j] = expandedTileset[i][j - 1];
                }
                else {
                    expandedTileset[i][j] = expandedTileset[i][j - 1] + expandedTileset[i][j + 1];
                }
            }
            // if i and j are odd, we are at a corner tile
            else if (i % 2 != 0 && j % 2 != 0) {
                // if all corner tiles are the same, the intersecting tile will also be the same
                if (expandedTileset[i - 1][j - 1] == expandedTileset[i - 1][j + 1] &&
                    expandedTileset[i - 1][j - 1] == expandedTileset[i - 1][j - 1] &&
                    expandedTileset[i - 1][j - 1] == expandedTileset[i + 1][j + 1] &&
                    expandedTileset[i - 1][j - 1] == expandedTileset[i + 1][j - 1]) {
                    expandedTileset[i][j] = expandedTileset[i - 1][j + 1];
                }
                else {
                    expandedTileset[i][j] = expandedTileset[i - 1][j - 1] + 
                                            expandedTileset[i - 1][j + 1] + 
                                            expandedTileset[i + 1][j - 1] +
                                            expandedTileset[i + 1][j + 1];
                }
            }
        }
    }
    
    // print out for testing
    for (let i = 0; i < expandedTileset.length; i++) {
        let str = "";
        for (let j = 0; j < expandedTileset[0].length; j++) {
            str += expandedTileset[i][j] + ","
        }
    }

    for (let i = 0; i < expandedTileset.length; i++) {
        for (let j = 0; j < expandedTileset[0].length; j++) {
            let imageIndex = stringToBeachTileIndex(expandedTileset[i][j]);
            tiles.push(new Tile(j * 20, i * 20, imageIndex));
        }
    }

    
    for (let i = 0; i < condensedTileset.length; i++) {
        let str = "";
        for (let j = 0; j < condensedTileset[0].length; j++) {
            str += condensedTileset[i][j] + ","
        }
    }
}

// map the tile string to the correct asset index
function stringToBeachTileIndex(str) {
    if (str == 'y') {
        return 0;
    }
    if (str == 'w') {
        return 1;
    }
    if (str == 'o') {
        return 3;
    }
    if (str == 'g') {
        return 4;
    }
    if (str == 'wwwo') {
        return 19;
    }
    if (str == 'vwo' || str == "wwoo") {
        return 20;
    }
    if (str == 'wwow') {
        return 21;
    }
    if (str == 'ooow') {
        return 22;
    }
    if (str == 'oowo') {
        return 23;
    }
    if (str == 'oooy') {
        return 25;
    }
    if (str == 'voy' || str == 'ooyy') {
        return 26;
    }
    if (str == 'ooyo') {
        return 27;
    }
    if (str == 'yyyo') {
        return 28;
    }
    if (str == 'yyoy') {
        return 29;
    }
    if (str == 'yyyg') {
        return 31;
    }
    if (str == 'vyg' || str =='yygg') {
        return 32;
    }
    if (str == 'yygy') {
        return 33;
    }
    if (str == 'gggy') {
        return 34;
    }
    if (str == 'ggyg') {
        return 35;
    }
    if (str == 'wo' || str == 'wowo') {
        return 37;
    }
    if (str == 'ow' || str == 'owow') {
        return 39;
    }
    if (str == 'owoo') {
        return 40;
    }
    if (str == 'wooo') {
        return 41;
    }
    if (str == 'oy' || str == 'oyoy') {
        return 43;
    }
    if (str == 'yo' || str == 'yoyo') {
        return 45;
    }
    if (str == 'yoyy') {
        return 46;
    }
    if (str == 'oyyy') {
        return 47;
    }
    if (str == 'yg' || str == 'ygyg') {
        return 49;
    }
    if (str == 'gy' || str == 'gygy') {
        return 51;
    }
    if (str == 'gygg') {
        return 52;
    }
    if (str == 'yggg') {
        return 53;
    }
    if (str == 'woww') {
        return 55;
    }
    if (str == 'vow' || str == 'ooww') {
        return 56;
    }
    if (str == 'owww') {
        return 57;
    }
    if (str == 'owwo') {
        return 58;
    }
    if (str == 'woow') {
        return 59;
    }
    if (str == 'oyoo') {
        return 61;
    }
    if (str == 'vyo' || str == 'yyoo') {
        return 62;
    }
    if (str == 'yooo') {
        return 63;
    }
    if (str == 'yooy') {
        return 64;
    }
    if (str == 'oyyo') {
        return 65;
    }
    if (str == 'ygyy') {
        return 67;
    }
    if (str == 'vgy' || str == 'ggyy') {
        return 68;
    }
    if (str == 'gyyy') {
        return 69;
    }
    if (str == 'gyyg') {
        return 70;
    }
    if (str == 'yggy') {
        return 71;
    }
    // not found
    return 2;
}