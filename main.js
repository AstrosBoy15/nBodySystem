var bodies = [];

var currentID = 0;
var currentBody, lastBody;

var maxAcceleration = 50;
var g = 1000;

var canvasWidth = 800
var canvasHeight = 600;

var paused = false;
var mousePressed = false;

var curveShape = [];

var curveType = 0, addType = 0;

var currentMass = 1000;
var currentVelocity = [0, 0];

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    addSelectors();
}

function draw() {
    background(25, 25, 25);

    mouse();

    if (!paused) {
        tick();
    }

    if (curveType == 0) {
        strokeWeight(2);
        stroke(255);
        noFill();
        beginShape();

        for (var i = 0; i < curveShape.length; i++) {
            curveVertex(curveShape[i][0], curveShape[i][1]);
        }

        endShape();
    }

    for (var i = 0; i < bodies.length; i++) {
        bodies[i].show(curveType);
    }
}

function tick() {
    for (var i = 0; i < bodies.length; i++) {
        bodies[i].calcAccelerationEuler(bodies, g, maxAcceleration);
    }

    for (var i = 0; i < bodies.length; i++) {
        bodies[i].updateEuler(0.01);
        if (bodies[i].getPosition()[0] < 0 || bodies[i].getPosition()[0] > canvasWidth || bodies[i].getPosition()[1] < 0
            || bodies[i].getPosition()[1] > canvasHeight) {
            bodies.splice(i, 1);
        }
    }


    if (bodies.length > 0) {
        if (!bodies.includes(currentBody)) {
            currentBody = bodies[bodies.length - 1];
            lastBody = currentBody;
            curveShape = [];
        } else if (currentBody != lastBody) {
            lastBody = currentBody;
            curveShape = [];
        } else {
            curveShape.push([bodies[bodies.length - 1].getPosition()[0], bodies[bodies.length - 1].getPosition()[1]]);

            if (curveShape.length >= 1000) {
                curveShape.splice(0, 1);
            }
        }
    }
}

function getDistance(pos1, pos2) {
    return Math.pow(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2), 0.5);
}

function createBody(pos, vel, mass, color) {
    currentID++;

    if (!color) {
        color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
    }

    currentBody = new Body(pos, vel, mass, color, currentID);

    return currentBody;
}

function mouse() {
    if (mouseIsPressed) {
        if (mouseX > 0 && mouseY > 0 && mouseX < canvasWidth && mouseY < canvasHeight) {
            if (!mousePressed) {
                if (mouseButton === LEFT) {
                    if (addType == 0) {
                        bodies.push(createBody([mouseX, mouseY], currentVelocity, currentMass));
                    } else if (addType == 1) {
                        createCircle(8, 100, currentVelocity, mouseX, mouseY);
                    } else {
                        console.log(addType)
                    }
                }
            }

            mousePressed = true;
        }
    } else {
        mousePressed = false;
    }
}

function createCircle(n, r, v, x, y) {
    for (var i = 0; i < n; i++) {
        bodies.push(createBody([Math.cos(2 * Math.PI / n * i) * r + x, Math.sin(2 * Math.PI / n * i) * r + y],
            [-Math.sin(2 * Math.PI / n * i) * currentVelocity[0], Math.cos(2 * Math.PI / n * i) * currentVelocity[1]], currentMass));
    }
}