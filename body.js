class Body {
    constructor(pos, vel, mass, color, ID) {
        this.position = pos;

        this.velocity = [vel[0], vel[1]];

        this.mass = mass;
        this.logMass = Math.log2(mass);

        this.color = color;
        this.ID = ID;

        this.maxAcc = 0;

        this.curveShape = [];
    }

    updateEuler(step) {
        this.velocity[0] += this.acceleration[0] * step;
        this.velocity[1] += this.acceleration[1] * step;

        this.position[0] += this.velocity[0] * step;
        this.position[1] += this.velocity[1] * step;

        this.curveShape.push([this.position[0], this.position[1]]);

        if (this.curveShape.length >= 250) {
            this.curveShape.splice(0, 1);
        }
    }

    show(curveType) {
        if (curveType == 1) {
            strokeWeight(2);
            stroke(this.color[0], this.color[1], this.color[2]);
            noFill();
            beginShape();

            for (var i = 0; i < this.curveShape.length; i++) {
                curveVertex(this.curveShape[i][0], this.curveShape[i][1]);
            }

            endShape();
        }

        fill(this.color[0], this.color[1], this.color[2]);
        noStroke();
        ellipse(this.position[0], this.position[1], this.logMass, this.logMass);
    }

    calcAccelerationEuler(bodies, g, maxAcceleration) {
        this.acceleration = [0, 0];

        for (var i = 0; i < bodies.length; i++) {
            if (bodies[i].getID() != this.ID) {
                var acc = g * bodies[i].getMass() / Math.pow(getDistance(this.position, bodies[i].getPosition()), 3);

                if (acc > maxAcceleration) {
                    acc = maxAcceleration;
                }

                this.acceleration[0] -= acc * (this.position[0] - bodies[i].getPosition()[0]);
                this.acceleration[1] -= acc * (this.position[1] - bodies[i].getPosition()[1]);
            }
        }
    }

    getPosition() {
        return this.position;
    }

    getMass() {
        return this.mass;
    }

    getID() {
        return this.ID;
    }

}