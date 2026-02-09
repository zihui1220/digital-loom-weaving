let socket;
let myColor;
const step = 30; 
let hasInteracted = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
   
    socket = io.connect(window.location.origin);

    colorMode(HSB, 360, 100, 100, 1);
    myColor = color(random(360), 80, 90); 

    socket.on('drawing', (data) => {
        let incomingCol = color(data.col.h, data.col.s, data.col.b);
        drawPattern(data.x, data.y, data.type, incomingCol);
        hasInteracted = true;
    });
}

function draw() {
    if (!hasInteracted) {
        background(245); 
        displayGuide();
    }
}

function displayGuide() {
    push();
    textAlign(CENTER, CENTER);
    textSize(24);
    noStroke();
    fill(0, 0, 0, 0.5); 
    text("Click or drag to weave patterns together", width / 2, height / 2);
    pop();
}

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
    if (!hasInteracted) {
        hasInteracted = true;
        background(245); 
    }

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
    hasInteracted = false; 
}