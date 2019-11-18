let beatLength;
let cellWidth;


function setup(){
  createCanvas(windowWidth,windowHeight);
  background(220);
  beatLength = 16;
  cellWidth= width/beatLength;



}


function preload(){


}


function draw(){
  background(random(255),random(250),random(200));
         for(let i = 0; i<10; i++){
       line(0,0,500,i*150);
       stroke(random(255)-i*15,random(255)-i*10,random(255)-i*20);
       line(800,500, i*150,0);
        line(0,500, i*150,0);
        line(650,0, i*150,0);}

// ellipse(150,140,20,20);
}
