let txt;
let distanceHorizontal = 150;
let distanceVertical = 50;
let totalTextWidth = 0;
let speed = 5;
let positionOfU = [];
let positionOfC = [];
let positionOfK = [];
let isSpinning = false;
let isUStopped = false;
let isCStopped = false;
let isKStopped = false;
let textHeight = 0;

let uPostionionAfterStop = 0, cPostionionAfterStop = 0, kPostionionAfterStop = 0;

function preload() {
    font = loadFont("Barriecito-Regular.otf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    textAlign(CENTER, CENTER);

    textSize(200);
    textFont(font);
    fill(255);
    noStroke();

    txt = "LUCKY";

    for (let i = 0; i < txt.length; i++) {
        totalTextWidth += textWidth(txt[i]);
    }

    textHeight = textAscent() + textDescent();

    let totalSlots = ceil(height / (textHeight + 10));
    for (let i = 0; i < totalSlots + 1; i++) {
        positionOfU.push((i * (textHeight - 10)) - (textHeight + distanceVertical))
        positionOfC.push((i * (textHeight - 10)) - (textHeight + distanceVertical) + 60)
        positionOfK.push((i * (textHeight - 10)) - (textHeight + distanceVertical) - 60)
    }
}

function draw() {
    background(0);

    const devVariable = 5

    let letterPositions = [];


    if (abilityToDraw()) {
        let colors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0), color(255, 0, 255)]
        let t = frameCount * 0.08;

        for (let i = 0; i < txt.length; i++) {
            let x = (width - totalTextWidth) / 2 + i * distanceHorizontal;
            fill(colors[(i + floor(t)) % colors.length]);
            text(txt[i], x, height / 2);
        }
    }
    else {
        for (let i = 0; i < txt.length; i++) {
            let x = (width - totalTextWidth) / 2 + i * distanceHorizontal;

            if (txt[i] === 'U') {
                // Малюємо кілька копій букви "U"
                for (let j = 0; j < positionOfU.length; j++) {
                    let uY = positionOfU[j];
                    if (j % devVariable === 0) {
                        fill(255);
                    } else {
                        fill(100);
                    }

                    text(txt[i], x, uY + distanceVertical);


                    if (isSpinning && !isUStopped) {
                        positionOfU[j] += speed; // Рухаємо вниз
                        if (positionOfU[j] > height + distanceVertical) {
                            positionOfU[j] = -(textHeight + distanceVertical);
                        }
                    }
                }
            }


            else if (txt[i] === 'C') {

                for (let j = 0; j < positionOfC.length; j++) {
                    let cY = positionOfC[j];

                    if (j % devVariable === 0) {
                        fill(255);
                    } else {
                        fill(100);
                    }

                    text(txt[i], x, cY + distanceVertical);

                    if (isSpinning && !isCStopped) {
                        positionOfC[j] += speed;
                        if (positionOfC[j] > height + distanceVertical) {
                            positionOfC[j] = -(textHeight + distanceVertical);
                        }
                    }
                }
            }
            else if (txt[i] === 'K') {

                for (let j = 0; j < positionOfK.length; j++) {
                    let kY = positionOfK[j];

                    if (j % devVariable === 0) {
                        fill(255);
                    } else {
                        fill(100);
                    }

                    text(txt[i], x, kY + distanceVertical);

                    if (isSpinning && !isKStopped) {
                        positionOfK[j] += speed;
                        if (positionOfK[j] > height + distanceVertical) {
                            positionOfK[j] = -(textHeight + distanceVertical);
                        }
                    }
                }
            }
            else {
                fill(255);
                text(txt[i], x, height / 2);
            }

            letterPositions.push(x + textWidth(txt[i]) / 2);
        }

        push();
        stroke(255);
        strokeWeight(2);
        for (let i = 0; i < letterPositions.length - 1; i++) {
            let x1 = letterPositions[i];
            let x2 = letterPositions[i + 1];
            let lineX = (x1 + x2) / 2;
            line(lineX - 50, 320, lineX - 50, 540);
        }
        pop();

        push();
        fill(0);
        rect(0, 0, width, 320);
        rect(0, 560, width, 320);
        pop();
    }
}

function isAllStopped() {
    return isUStopped && isCStopped && isKStopped
}

function abilityToDraw() {
    let positionsOfWhiteLetters = [uPostionionAfterStop, cPostionionAfterStop, kPostionionAfterStop]
    let flag = true

    if (isAllStopped()) {
        for (const element of positionsOfWhiteLetters) {
            if (element <= 320 || (element + textHeight) >= 640) {
                flag = false
            }
        }
    }
    else {
        flag = false
    }

    return flag
}

function mousePressed() {
    isSpinning = true;
    isUStopped = false;
    isCStopped = false;
    isKStopped = false;
}

function keyPressed() {
    if (key === ' ') {
        if (!isUStopped) {
            isUStopped = true;
            uPostionionAfterStop = positionOfU[0]
        } else if (!isCStopped) {
            isCStopped = true;
            cPostionionAfterStop = positionOfC[0]
        } else if (!isKStopped) {
            isKStopped = true;
            kPostionionAfterStop = positionOfK[0]
        }
    }
}