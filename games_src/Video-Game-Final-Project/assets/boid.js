/**
 * This class represents the boid object that is used in the title and victory screens
 */

class Boid {
    /**
     * This class contains the boiding behavior and logic for our project. The code was modified
     * from the code at https://p5js.org/examples/hello-p5-flocking.html, with additional
     *
     */
    constructor(x, y, size = 5) {
        this.acceleration = createVector(0, 0);
        this.velocity = p5.Vector.random2D();
        this.angle = this.velocity.heading();
        this.position = createVector(x, y);
        this.r = 3.0;
        this.maxspeed = 3;    // Maximum speed
        this.maxforce = 0.05; // Maximum steering force
        this.size = size;
        this.scale_factor = size / 10;

        this.wrap_around = false;
        this.bottom_border = height - 200;
    }

    run(boids) {
        this.flock(boids);
        this.update();
        this.borders();
        this.draw();
    }

    // Forces go into acceleration
    applyForce(force) {
        this.acceleration.add(force);
    }

    // We accumulate a new acceleration each time based on three rules
    flock(boids) {
        let sep = this.separate(boids); // Separation
        let ali = this.align(boids);    // Alignment
        let coh = this.cohesion(boids); // Cohesion
        // Arbitrarily weight these forces
        sep.mult(2.5);
        ali.mult(1.0);
        coh.mult(1.0);
        // Add the force vectors to acceleration
        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);
    }

    // Method to update location
    update() {
        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        // Reset acceleration to 0 each cycle
        this.acceleration.mult(0);
        this.angle = this.velocity.heading();
    }

    // A method that calculates and applies a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    seek(target) {
        let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
        // Normalize desired and scale to maximum speed
        desired.normalize();
        desired.mult(this.maxspeed);
        // Steering = Desired minus Velocity
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce); // Limit to maximum steering force
        return steer;
    }

    draw() {
        /**
         * This method was changed from the sample in the p5js website, to instead draw a birdlike
         * object
         */
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle - PI / 2);
        scale(this.scale_factor)
        fill(127, 200);
        //triangle(0, 10, -5, -5, 5, -5);
        beginShape();
        vertex(0, 10);
        vertex(-10, -5);
        vertex(0, 0);
        vertex(10, -5);
        endShape();
        pop();
    }

    // Wraparound
    borders() {
        if (this.wrap_around) {
            if (this.position.x < -this.r) this.position.x = width + this.r;
            if (this.position.y < -this.r) this.position.y = height + this.r;
            if (this.position.x > width + this.r) this.position.x = -this.r;
            if (this.position.y > this.bottom_border) this.position.y = -this.r;
        }
        else {
            if (this.position.x > width + this.r || this.position.x < -this.r) this.velocity.x = -this.velocity.x;
            if (this.position.y > this.bottom_border || this.position.y < -this.r) this.velocity.y = -this.velocity.y;
        }
    }

    // Separation
    // Method checks for nearby boids and steers away
    separate(boids) {
        let desiredseparation = 25.0;
        let steer = createVector(0, 0);
        let count = 0;
        // For every boid in the system, check if it's too close
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position, boids[i].position);
            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                let diff = p5.Vector.sub(this.position, boids[i].position);
                diff.normalize();
                diff.div(d); // Weight by distance
                steer.add(diff);
                count++; // Keep track of how many
            }
        }
        // Average -- divide by how many
        if (count > 0) {
            steer.div(count);
        }

        // As long as the vector is greater than 0
        if (steer.mag() > 0) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.normalize();
            steer.mult(this.maxspeed);
            steer.sub(this.velocity);
            steer.limit(this.maxforce);
        }
        return steer;
    }

    // Alignment
    // For every nearby boid in the system, calculate the average velocity
    align(boids) {
        let neighbordist = 50;
        let sum = createVector(0, 0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position, boids[i].position);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(boids[i].velocity);
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(this.maxspeed);
            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }

    // Cohesion
    // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
    cohesion(boids) {
        let neighbordist = 50;
        let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position, boids[i].position);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(boids[i].position); // Add location
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            return this.seek(sum); // Steer towards the location
        } else {
            return createVector(0, 0);
        }
    }
}