/**
 * This file contains useful utility functions for methods in the game, that have been reused from
 * other projects.
 */


function gen_area_noise(x, y, width, height, k) {
    translate(x, y);
    var greenColor = color("#074728")
    var brownColor = color("#e7ba7f")
    for (var i = 0; i < width; i += k) {
        for (var j = 0; j < height; j += k) {
            var c = noise(0.008 * i, 0.008 * j);
            fill(lerpColor(brownColor, greenColor, c));
            noStroke();
            rect(i, j, k, k);
        }
    }
}

function setGradient(x, y, w, h, c1, c2, axis) {
    /**
     * Method to create a gradient from two colors
     *
     * Credit to:
     * https://p5js.org/examples/color-linear-gradient.html
     */
    noFill();

    if (axis === Y_AXIS) {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else if (axis === X_AXIS) {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}

function sunsetBackground() {
    /**
     * Method to create a sunset background
     */
    let c2 = color("#eb8c3d");
    let c1 = color("#3ebfea");
    strokeWeight(1);
    setGradient(0, 0, width, height, c1, c2, Y_AXIS);
}

function indexes(source, find) {
    /**
     * Method to find the indexes of a value in an array
     * Credit to:
     * https://stackoverflow.com/
     */
    if (!source) {
        return [];
    }
    // if find is empty string return all indexes.
    if (!find) {
        // or shorter arrow function:
        // return source.split('').map((_,i) => i);
        return source.split('').map(function (_, i) { return i; });
    }
    var result = [];
    for (i = 0; i < source.length; ++i) {
        // If you want to search case insensitive use
        // if (source.substring(i, i + find.length).toLowerCase() == find) {
        if (source.substring(i, i + find.length) == find) {
            result.push(i);
        }
    }
    return result;
}