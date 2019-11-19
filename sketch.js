// 'use strict';
 let osc;
 let waveFormSelect;

function setup(){
  createCanvas(windowWidth,windowHeight);
  background(220);
osc = new p5.Oscillator();



// osc.setType('')

waveFormSelect = createSelect();
 waveFormSelect.position (100,100);
waveFormSelect.option('square');
waveFormSelect.option('sawtooth');
waveFormSelect.option('triangle');
waveFormSelect.option('sine');
waveFormSelect.changed(setWaveForm);



}

function draw(){
  osc.freq(map(mouseX,0,width, 60, 1600));
  osc.amp(map(mouseY, 0, height,0, .2));

  background(random(255),random(250),random(200));
         for(let i = 0; i<10; i++){
       line(0,0,500,i*150);
       stroke(random(255)-i*15,random(255)-i*10,random(255)-i*20);
       line(800,500, i*150,0);
        line(0,500, i*150,0);
        line(650,0, i*150,0);}


// ellipse(150,140,20,20);
}
function setWaveForm(){

osc.setType(waveFormSelect.value());

}

function mousePressed(){
  osc.start();

}
function mouseReleased(){
  osc.stop();
}
