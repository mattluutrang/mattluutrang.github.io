/**
 * This class represents bubbles used for animation
 **/
class Bubbles {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.particles = [];
        this.bubbleTimer = 0;
    }

    draw(collided) {
        for (let i = 0; i < 2; i++) {
            this.particles.push(new BubbleParticle(random(this.x - 2,this.x + 2), random(this.y - 2,this.y + 2)));
        }
        this.bubbleTimer = 40;
        for (var i=0; i < this.particles.length; i++) {
            if ((this.particles[i].timeLeft > 0) && (this.particles[i].position.y < 400)) {
                this.particles[i].draw();
                this.particles[i].move();
            }
            else {
                this.particles.splice(i, 1);
            }
        }
        if (this.bubbleTimer > 0) {
            this.bubbleTimer--;
        }
    }
}

// Bubble particle class
class BubbleParticle {

    constructor(x, y) {
        this.position = new p5.Vector(x, y);
        this.velocity = new p5.Vector(random(-0.05, 0.05), random(-0.5, -2));
        this.size = random(1, 2);
        this.position.y -= (18 - this.size);
        this.c1 = this.monteCarlo();
        this.timeLeft = 255;
    }

    monteCarlo() {
        var v1 = random(150, 255);
        var v2 = random(150, 255);
        while (v2 > v1) {
            v1 = random(150, 255);
            v2 = random(150, 255);
        }
        return(v1);
    };

    move() {
        this.position.add(this.velocity);
        if (this.velocity.y <= 0.005) {
            this.velocity.add(new p5.Vector(0, 0.005));
        }
        if (this.timeLeft > 0.01) {
            this.timeLeft--;
        }
    }

    draw() {
        noStroke();
        fill(this.c1, this.c1, this.c1, this.timeLeft);
        ellipse(this.position.x, this.position.y, this.size, this.size*2);
    };
}