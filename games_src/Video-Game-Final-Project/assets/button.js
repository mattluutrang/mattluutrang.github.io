/**
 * This class represents an button that can be clicked on 
 **/
class Button {
    constructor(x, y, width, height, fill, text, textSize, textFill = "black", textFont = "Arial", img = null) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.fill = fill;
        this.textSize = textSize;
        this.textFill = textFill;
        this.textFont = textFont;
        this.img = img;
    }
    draw() {
        textSize(this.textSize);
        //textFont(this.textFont);
        if (this.img === null) {
            fill(this.fill);
            rect(this.x, this.y, this.width, this.height);
            fill(this.textFill);
            text(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
        }
        else {
            image(this.img, this.x, this.y, this.width, this.height);
            fill(this.textFill);
            text(this.text, this.x + (this.width / 2), this.y + (this.height / 2));
        }
    }
    isClicked() {
        if (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y && mouseY <= this.y + this.height) {
            return true;
        }
        else {
            return false;
        }
    }
    isHovered() {
        return this.isClicked();
    }
}