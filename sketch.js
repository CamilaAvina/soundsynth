let hh, clap, bass; //high hat
let hPat, cPat, bPat; // high hat pattern (array) 0= on 1= close
let hPhrase, cPhrase, bPhrase; // high hat phrase  defines patteren and how it is interprest
let drum; //part , part and phrases work together to transport to drive the phrases
let bpmCTRL;
let beatLength;
let cellWidth;


function setup() {
  createCanvas(320, 60);
  // background(random(255),random(250),random(200));
  //      for(let i = 0; i<10; i++){
  //    line(0,0,500,i*150);
  //    stroke(random(255)-i*15,random(255)-i*10,random(255)-i*20);
  //    line(800,500, i*150,0);
  //     line(0,500, i*150,0);
  //     line(650,0, i*150,0);
  beatLength = 16;
  cellWidth= width/beatLength;
  hh = loadSound('assets/hh_sample.mp3', () => {});

  clap = loadSound('assets/clap_sample.mp3', () => {});

  bass = loadSound('assets/bass_sample.mp3', () => {});

  hPat = [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0];
  cPat = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
  bPat = [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0];


  hPhrase = new p5.Phrase('hh', (time) => {
      hh.play(time)
    },
    hPat);
  cPhrase = new p5.Phrase('clap', (time) => {
      clap.play(time)
    },
    cPat);
  bPhrase = new p5.Phrase('bass', (time) => {
      bass.play(time)
    },
    bPat);

  drums = new p5.Part();


  drums.addPhrase(hPhrase);
  drums.addPhrase(cPhrase);
  drums.addPhrase(bPhrase);
  bpmCTRL = createSlider(30, 600, 80, 1);
  bpmCTRL.position(10, 70);
  bpmCTRL.input(() => {
    drums.setBPM(bpmCTRL.value())
  })
  drums.setBPM('60');
  background(80);
  stroke('grey');
  strokeWeight(2);

  for (let i = 0; i < beatLength + 1; i++) {
    line(i *cellWidth, 0, i *cellWidth, height);
  }
  for (let i = 0; i < 4; i++) {
    line(0, i * height / 3, width, i * height / 3);
  }
noStroke();
  for (i = 0; beatLength; i++) {
    if (hPat[i]==1){
    ellipse(i *cellWidth + 0.5 *cellWidth, height/6 , 10);
  }
    if (cPat[i]==1){
    ellipse(i *cellWidth + 0.5 *cellWidth, height/2 , 10);
  }
  if (bPat[i]==1){
    ellipse(i *cellWidth + 0.5 *cellWidth, height*5/6 , 10);
  }
}


}


function keyPressed() {
  if (key === ' ') {
    if (hh.isLoaded() && clap.isLoaded() && bass.isLoaded()) {
      if (!drums.isPlaying) {
        drums.loop();
      } else {
        drums.stop();
      }
    }
  }
}
