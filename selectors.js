function addSelectors() {

    createP('Curve Type').position(820, 0);
    var curveLine = createSelect();
    curveLine.position(820, 40);
    curveLine.option('One', int(0));
    curveLine.option('All', int(1));
    curveLine.option('None', int(2));
    curveLine.selected('One');
    curveLine.changed(function () {
        curveType = this.value();
    });


    createP('Body Addition').position(820, 70);
    var add = createSelect();
    add.position(820, 110);
    add.option('Singular', 0);
    add.option('Circle', 1);
    add.selected('Singular');
    add.changed(function () {
        addType = this.value();
    });

    createP('Mass').position(820, 140);
    var mass = createInput(1000);
    mass.size(50);
    mass.position(820, 180);
    mass.input(function () {
        currentMass = this.value();
    });

    createP('Velocity (x, y)').position(820, 210);
    var vx = createInput(0);
    vx.size(50);
    vx.position(820, 250);
    vx.input(function () {
        currentVelocity[0] = float(this.value());
    });
    var vy = createInput(0);
    vy.size(50);
    vy.position(890, 250);
    vy.input(function () {
        currentVelocity[1] = float(this.value());
    });

    var pause = createButton('Pause');
    pause.position(820, 300);
    pause.mousePressed(function () {
        paused = !paused;
        if (paused) {
            this.html('Play');
        } else {
            this.html('Pause');
        }
    });

    var reset = createButton('Reset');
    reset.position(820, 350);
    reset.mousePressed(function () {
        bodies = [];
        curveShape = [];
    });
}