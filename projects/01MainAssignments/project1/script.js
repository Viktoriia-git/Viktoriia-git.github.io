let font;
let points;
let bounds;
let scatteredPoints = [];
let scatteredIndices = [];

function preload() {
  font = loadFont("Barriecito-Regular.ttf"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  points = font.textToPoints("ZHdK", 0, 0, 10, {
    sampleFactor: 7, 
    simplifyThreshold: 0,
  });
  bounds = font.textBounds("ZHdK", 0, 0, 10);

	scatteredPoints = points.map(p => ({
    x: p.x,
    y: p.y,
    originalX: p.x,
    originalY: p.y,
    velocityX: 0,
    velocityY: 0,
    scattered: false, 
    returning: false  
  }));
}

function draw() {
  background(0);
  let scaleFactor = 0.5;
  
  let scaleW = (width / bounds.w) * scaleFactor;
  let scaleH = (height / bounds.h) * scaleFactor;
  let w = bounds.w * scaleW;
  let h = bounds.h * scaleH;
  let fontX = -bounds.x * scaleW + width / 2 - w / 2; 
  let fontY = -bounds.y * scaleH + height / 2 - h / 2;
  translate(fontX, fontY);

  noStroke();

  for (let i = 0; i < scatteredPoints.length; i++) {
    let p = scatteredPoints[i];
    
    if (p.scattered) {
      p.x += p.velocityX;
      p.y += p.velocityY;

      p.velocityX *= 0.7;
      p.velocityY *= 0.5;
    }

		if (p.returning) {
     
      p.x = lerp(p.x, p.originalX, 0.1);
      p.y = lerp(p.y, p.originalY, 0.1);

      if (dist(p.x, p.y, p.originalX, p.originalY) < 0.5) {
        p.x = p.originalX;
        p.y = p.originalY;
        p.returning = false;
        p.scattered = false; 
      }
    }
		
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
    let oscillator = sin(angle / 2 + a); 
    let x = (radius + oscillator * 10) * cos(a); 
    let y = (radius + oscillator * 10) * sin(a);
    
    fill(randomColor);
    let dynamicSize = 4 + map(dist(mouseX, mouseY, x, y), 0, width / 2, 10, 0);
    circle(x, y, dynamicSize);
  }
}

function keyPressed() {
  if (key === ' ') {
    for (let i = 0; i < scatteredPoints.length; i++) {
      let p = scatteredPoints[i];
      if (!p.scattered && random() < 0.3) {
        p.scattered = true;
        p.velocityX = random(-5, 5);
        p.velocityY = random(-5, 5);
        if (!scatteredIndices.includes(i)) {
          scatteredIndices.push(i); 
        }
      }
    }
  }
}

function mousePressed(){
	for (let i = scatteredIndices.length - 1; i >= 0; i--) {
    let index = scatteredIndices[i];
    let p = scatteredPoints[index];

    if (p.scattered) {
      p.returning = true;
      p.velocityX = 0;    
      p.velocityY = 0;
    }

    scatteredIndices.splice(i, 1); // Видаляємо точку з розсіяних після запуску повернення
  }
}