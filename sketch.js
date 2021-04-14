var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var duck1,duck2,duck3,duck4,ducks;

function preload (){

  duck1Image=loadImage("images/duck1.jpg");
  duck2Image=loadImage("images/duck2.jpg");
  duck3Image=loadImage("images/duck3.jpg");
  duck4Image=loadImage("images/duck4.jpg");
  pondImage=loadImage("images/pond.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
