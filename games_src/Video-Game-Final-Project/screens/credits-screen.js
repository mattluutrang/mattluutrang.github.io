let creditsXButton;

function initCreditsScreenVariables() {
    creditsXButton = new XButton(350, 40);
}

function drawCreditsScreen() {
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
    text("Credits", 200, 60);

    textSize(15);
    fill(220);
    stroke(220);
    text("Coded by Nathan Moeliono and Matthew Trang <3", 200, 150)
    text("Music", 200, 200)
    textSize(10);
    text("'A Robust Crew' by Darren Curtis", 200, 220)
    text("'Eternal Sleep' by Darren Curtis", 200, 240)
    text("'Island Explorer' by Michelle Hong", 200, 260)

    textSize(15);
    text("Special Thanks to Dr. Hsiao", 200, 300)
    // draw x button
    menuXButton.draw();
}