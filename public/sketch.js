let socket;
let myColor;
const step = 30; 

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(245); 
    socket = io();

    colorMode(HSB, 360, 100, 100, 1);
    myColor = color(random(360), 80, 90); 

    socket.on('assign_id', (num) => {
        console.log("Assigned ID: " + num);
    });

    socket.on('drawing', (data) => {
        let incomingCol = color(data.col.h, data.col.s, data.col.b);
        drawPattern(data.x, data.y, data.type, incomingCol);
    });
}

function draw() {}

function drawPattern(x, y, type, col) {
    let gx = floor(x / step) * step;
    let gy = floor(y / step) * step;

    push();
    translate(gx + step/2, gy + step/2);
    stroke(col);
    strokeWeight(3); 
    noFill();

    if (type === 0) {
        line(-step/2, 0, step/2, 0);
        line(0, -step/2, 0, step/2);
    } else if (type === 1) {
        line(-step/2, -step/2, step/2, step/2);
    } else if (type === 2) {
        line(step/2, -step/2, -step/2, step/2);
    } else if (type === 3) {
        noStroke();
        fill(col);
        rect(-step/2 + 4, -step/2 + 4, step - 8, step - 8);
    } else if (type === 4) {
        ellipse(0, 0, step * 0.7);
    }
    pop();
}

function mousePressed() {
    myColor = color(random(360), 80, 90);
    handleInput();
}

function mouseDragged() {
    if (frameCount % 3 === 0) {
        handleInput();
    }
}

function handleInput() {
    let patternType = floor(random(5));
    drawPattern(mouseX, mouseY, patternType, myColor);

    socket.emit('drawing', {
        x: mouseX,
        y: mouseY,
        type: patternType,
        col: {
            h: hue(myColor),
            s: saturation(myColor),
            b: brightness(myColor)
        }
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(245);
}