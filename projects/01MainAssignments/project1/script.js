let font;
let points;
let bounds;

function preload() {
  font = loadFont("Barriecito-Regular.otf"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  points = font.textToPoints("ZHdK", 0, 0, 10, {
    sampleFactor: 7,
    simplifyThreshold: 0,
  });
  bounds = font.textBounds("ZHdK", 0, 0, 10);
}

function draw() {
  background(0);
  let scaleFactor = 0.5;
	
	let scalePulse = map(sin(frameCount * 0.035), -1, 1, 0.4, 1.1); 
  translate(width / 2, height / 2);
  scale(scalePulse);
  translate(-width / 2, -height / 2);

  
  let scaleW = (width / bounds.w) * scaleFactor;
  let scaleH = (height / bounds.h) * scaleFactor;
  let w = bounds.w * scaleW;
  let h = bounds.h * scaleH;
  let fontX = -bounds.x * scaleW + width / 2 - w / 2; 
  let fontY = -bounds.y * scaleH + height / 2 - h / 2;
	
  translate(fontX, fontY);

  noStroke();

  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    push();
    translate(p.x * scaleW, p.y * scaleH);
    drawWavyCircles(frameCount * 0.05, i);
    pop();
  }
}

function drawWavyCircles(angle, index) {
  let radius = 10; 
  let pointCount = 8; 
  let baseColor = color(255, 0, 0);
  let randomColor = lerpColor(baseColor, color(0, 0, 255), noise(index * 0.05, frameCount * 0.1));
  
  for (let a = 0; a < TWO_PI; a += TWO_PI / pointCount) {
    let oscillator = sin(angle/2 + a); 
    let x = (radius + oscillator * 10) * cos(a); 
    let y = (radius + oscillator * 10) * sin(a);
    
    fill(randomColor);
    let dynamicSize = 4 + map(dist(mouseX, mouseY, x, y), 0, width / 2, 10, 0);
    circle(x, y, dynamicSize);
  }
}
