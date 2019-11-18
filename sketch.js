// let wave;
// let wav2;
// let wav3;
// let wav4;
// let wav5;
//
// let button;
// let butt2;
// let butt3;
// let butt4;
// let butt5;
// let playing;
//
// //let slider;
// let env;
// let env2;
// let env3;
// let env4;
// let env5;
//
//
// function setup() {
//   createCanvas(800, 600);
//    background(220);
//    env = new p5.Envelope();
//    env.setADSR(0.5, 0.25, 0.5, 0.1);
//    env.setRange(0.8, 0);
//    env2 = new p5.Envelope();
//    env2.setADSR(1.0, 1.0, 0.5, 0.1);
//    env2.setRange(0.5, 0);
//    env3 = new p5.Envelope();
//    env3.setADSR(1.0, 1.0, 0.5, 0.1);
//    env3.setRange(0.5, 0);
//    env4 = new p5.Envelope();
//    env4.setADSR(1.0, 1.0, 0.5, 0.1);
//    env4.setRange(0.5, 0);
//    env5 = new p5.Envelope();
//    env5.setADSR(1.0, 1.0, 0.5, 0.1);
//    env5.setRange(0.5, 0);
//
//   wave = new p5.Oscillator();
//   wav2 = new p5.Oscillator();
//   wav3 = new p5.Oscillator();
//   wav4 = new p5.Oscillator();
//   wav5 = new p5.Oscillator();
// //  slider = createSlider(100,1200,440);
//   wave.setType('sine');
//   wave.start();
//   wave.amp(env);
//   wave.freq(300);
//   button = createButton('');
//   button.size(150,50,50,50);
//   button.mousePressed(toggle);
//   wav2.setType('triangle');
//   wav2.start();
//   wav2.amp(env2);
//   wav2.freq(400);
//   butt2 = createButton('');
//   butt2.size(150,50,50,50);
//   butt2.mousePressed(toggle);
//   wav3.setType('triangle');
//   wav3.start();
//   wav3.amp(env2);
//   wav3.freq(500);
//   butt3 = createButton('');
//   butt3.size(150,50,50,50);
//   butt3.mousePressed(toggle);
//   wav4.setType('triangle');
//   wav4.start();
//   wav4.amp(env2);
//   wav4.freq(600);
//   butt4 = createButton('');
//   butt4.size(150,50,50,50);
//   butt4.mousePressed(toggle);
//   wav5.setType('triangle');
//   wav5.start();
//   wav5.amp(env2);
//   wav5.freq(700);
//   butt5 = createButton('');
//   butt5.size(150,50,50,50);
//   butt5.mousePressed(toggle);
// }
// function draw() {
//
// //  wave.freq();
//   //wave2.freq();
//   if (playing){
//     background(random(255),random(250),random(200));
//     for(let i = 0; i<10; i++){
//   line(0,0,500,i*150);
//   stroke(random(255)-i*15,random(255)-i*10,random(255)-i*20);
//   line(800,500, i*150,0);
//    line(0,500, i*150,0);
//    line(650,0, i*150,0);
// }
// }
//   //  wave.amp(0.5);
//
//   // }else {
//   //   background(200);
//   // }
// }
// function toggle(){
// if (!playing){
//     playing = true;
//       env.play();
//     } else {
//       playing = false;
//         env2.play();
//
//   }
// }

let capture;
let tracker
let w = 640,
    h = 580;
let attackLevel = 1.0;
let releaseLevel = 0;

let attackTime = 0.001;
let decayTime = 0.2;
let susPercent = 0.2;
let releaseTime = 0.5;
let env, triOsc;
let button;
let playing;

function setup() {
    capture = createCapture({
        audio: false,
        video: { width: w,
            height: h
        }
    }), function() {
        console.log('capture ready.')
    };
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();
  //this is so the camera can be used and canvas size
    colorMode(HSB);
    tracker = new clm.tracker();//clm is in html code t be able to use recognition
    tracker.init();
    tracker.start(capture.elt);
    env = new p5.Envelope();
    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
     env.setRange(attackLevel, releaseLevel);
 button = createButton('click on me!!');
 button.size(150,70);
 button.mousePressed(toggle);
  triOsc = new p5.Oscillator('triangle');
  triOsc.amp(env);
  triOsc.start();
  triOsc.freq(220);

//   button.mousePressed(playEnv);
}

function draw() {
    image(capture, 0, 0, w, h);
    var positions = tracker.getCurrentPosition(); //recognition to current location


    noFill();
    stroke(255);
    beginShape();
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    } //if face move the drawing moves draws outline
    endShape();

    noStroke();
    for (var i = 0; i < positions.length; i++) {
        fill(map(i, 0, positions.length, 0, 360), 50, 100);
        ellipse(positions[i][0], positions[i][1], 4, 4);
        text(i, positions[i][0], positions[i][1]); // numbers of x and y
      //color and circle color changing over time by the cordinates taking the value i  hues changing using the color wheel
    }

  // estimate smiling amount through distance of corners of mouth
    if (positions.length > 0) {//if face there use it if not undefined
        var mouthLeft = createVector(positions[44][0], positions[44][1]);
        var mouthRight = createVector(positions[50][0], positions[50][1]);//smile frequency
        var smile = mouthLeft.dist(mouthRight);

        // line shows a bar showing smiling amount
        rect(20, 20, smile * 3, 20);

      // //  uncomment for a surprise
      //   noStroke();
      //   fill(0, 255, 255);
      //   ellipse(positions[62][0], positions[62][1], 50, 50);
    }
    if (playing){
       background(random(255),random(250),random(200));
       for(let i = 0; i<10; i++){
     line(0,0,500,i*150);
     stroke(random(255)-i*15,random(255)-i*10,random(255)-i*20);
     line(800,500, i*150,0);
      line(0,500, i*150,0);
      line(650,0, i*150,0);
   }
}
}
function toggle()  {
  if (!playing){
     playing = true;
     env.play();

     } else {
       playing = false;


   }
 }
