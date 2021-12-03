let statsXButton;

function initStatsScreenVariables() {
    statsXButton = new XButton(350, 40);
}
function drawStatsScreen() {
    // draw menu screen background
    stroke('#5B270B');
    fill('#5B270B');
    rect(25, 25, 350, 350);

    // draw menu borders
    stroke('#DEB887');
    fill('#DEB887');
    rect(25, 25, 350, 5);
    rect(25, 25, 5, 350);
    rect(370, 25, 5, 350);
    rect(25, 370, 350, 5);

    // draw black corner line
    stroke('#B68E65');
    fill('#B68E65');
    strokeWeight(1);
    line(25, 25, 30, 30);
    line(375, 25, 370, 30);
    line(25, 375, 30, 370);
    line(370, 370, 375, 375);

    // draw menu stuff
    //textFont(playerFont);
    stroke(255);
    fill(255);
    textSize(30);
    strokeWeight(0);
    text("Stats", 200, 60);

    let totalKills = 0;

    let killsStr = "Enemies killed: " + enemiesKilled;
    let treesStr = "Trees chopped: " + treesChopped;
    let rocksStr = "Rocks mined: " + rocksMined;
    let craftsStr = "Objects crafted: " + objectsCrafted;
    let meatStr = "Meat eaten: " + meatEaten;
    let objectivesStr = "Objectives completed: " + objectiveNum;

    textSize(15);
    fill(220);
    stroke(220);
    text(killsStr, 200, 100);
    text(treesStr, 200, 130);
    text(rocksStr, 200, 160);
    text(craftsStr, 200, 190);
    text(meatStr, 200, 220);
    text(objectivesStr, 200, 250);

    // draw x button
    menuXButton.draw();
}