/**
 * This class represents an button
 **/
class Button {
    constructor(x, y, width, height, fill, text, textSize, textFill = "black", textFont = "Impact") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.fill = fill;
        this.textSize = textSize;
        this.textFill = textFill;
        this.textFont = textFont;
    }
    draw() {
        fill(this.fill);
        rect(this.x, this.y, this.width, this.height);
        fill(this.textFill);
        textSize(this.textSize);
        textFont(this.textFont);
        text(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
    }
    isClicked() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) {
            return true;
        }
        else {
            return false;
        }
    }
}