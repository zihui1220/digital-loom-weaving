let socket;
let colors = [];
let gridSize = 40;
let hasInteracted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  socket = io.connect(window.location.origin);

  socket.on('drawing', (data) => {
    drawWeave(data.x, data.y, data.color);
    hasInteracted = true;
  });

  colorMode(HSB, 360, 100, 100, 1);
  background(40, 5, 95);
}

function draw() {
  if (!hasInteracted) {
    displayGuide();
  }
}

function displayGuide() {
  push();
  textAlign(CENTER, CENTER);
  textSize(20);
  textFont('Helvetica');
  fill(0, 0, 50, 0.5);
  noStroke();
  text("Digital Loom: Click or Drag to Weave Together", width / 2, height / 2);
  pop();
}

function mouseDragged() {
  handleInteraction();
  return false;
}

function mousePressed() {
  handleInteraction();
}

function handleInteraction() {
  if (!hasInteracted) {
    background(40, 5, 95); 
    hasInteracted = true;
  }

  let x = Math.floor(mouseX / gridSize) * gridSize;
  let y = Math.floor(mouseY / gridSize) * gridSize;

  let h = random(0, 360);
  let s = 70;
  let b = 90;
  let col = `hsla(${Math.floor(h)}, ${s}%, ${b}%, 0.8)`;

  drawWeave(x, y, col);

  let data = {
    x: x,
    y: y,
    color: col
  };
  socket.emit('drawing', data);
}

function drawWeave(x, y, col) {
  push();
  translate(x + gridSize / 2, y + gridSize / 2);
  stroke(col);
  strokeWeight(3);
  noFill();

  let r = random([0, HALF_PI]);
  rotate(r);

  arc(-gridSize / 2, -gridSize / 2, gridSize, gridSize, 0, HALF_PI);
  arc(gridSize / 2, gridSize / 2, gridSize, gridSize, PI, PI + HALF_PI);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(40, 5, 95);
  hasInteracted = false;
}