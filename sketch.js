var flappyBird, flappyBirdImage;
var backgroundImage;
var railing, railingImage;
var pillar, pillarImage;
var score;
var pillarGroup;
var playAgain, playAgainImage, gameOver, gameOverImage;
var BirdGAMEOVER;
var PLAY = 1; 
var END = 0;
var Gamestate = PLAY;




function preload(){
 flappyBirdImage = loadAnimation("bird1.png", "bird2.png");
 backgroundImage = loadImage("backgroundImage.png");
 railingImage = loadImage("railing.png");
 pillarImage = loadImage("pillar.png");
 playAgainImage = loadImage("playAgain.png");
 gameOverImage = loadImage("gameOver.png");
 BirdGAMEOVER = loadAnimation("bird1.png");
}
function setup(){
 createCanvas(windowWidth,windowHeight);
 flappyBird = createSprite(600,windowHeight/2,20,20);
 flappyBird.debug = (false);
 flappyBird.setCollider("circle",0,0,15);
 flappyBird.scale = 2;
 flappyBird.addAnimation("flappyBirdImage", flappyBirdImage);
 flappyBird.addAnimation("BirdGAMEOVER", BirdGAMEOVER);
 railing = createSprite(windowWidth/2,windowHeight-10);
 railing.addImage("railingImage",railingImage);
 railing.x = railing.width/2
 railing.scale = 6.0;
 railing.velocityX = -5;
 playAgain = createSprite(windowWidth/2, windowHeight/4, 50,50);
 playAgain.addImage("playAgainImage",playAgainImage)
 gameOver = createSprite(windowWidth/2, windowHeight/2, 50,50);
 gameOver.addImage("gameOverImage",gameOverImage)
 playAgain.visible = false;
 gameOver.visible = false;

 score = -1;
 pillarGroup = new Group()
}
function draw(){
  background(backgroundImage);
  if (Gamestate === PLAY){
    if(railing.x<200) {
      railing.x = railing.width/2
    }
    if(keyDown("space")){
      flappyBird.velocityY = -5;
    }
    if(flappyBird.isTouching(pillarGroup)||flappyBird.isTouching(railing)){
      Gamestate = END;
    }
    flappyBird.velocityY = flappyBird.velocityY+0.2
    
    spawnPillar();
    
  }
  else if (Gamestate === END){
    gameOverFN();
  }
  
  drawSprites();
  textSize(25);
  fill("white")
  text("Score: "+score,windowWidth-140, 50)
}
function spawnPillar(){
  var n = Math.round(random(1,3))
  if(n===1) {

  if(frameCount % 200 === 0){
    pillar = createSprite(windowWidth+10,100);
  
    pillar.debug = false;
    pillar.setCollider("rectangle",0, 0,100, 500)
    pillar.addImage("pillarImage",pillarImage);
    pillar.velocityX = -5;
    pillarGroup.add(pillar);
    gameOver.depth = pillar.depth + 1;
  playAgain.depth = pillar.depth + 1;
  }
  if(frameCount % 200 === 0){
    pillar = createSprite(windowWidth+10,windowHeight);

    pillar.addImage("pillarImage",pillarImage);
    pillar.debug = false;
    pillar.setCollider("rectangle",0, 0,100, 500)
    pillar.velocityX = -5;
    pillarGroup.add(pillar);
    gameOver.depth = pillar.depth + 1;
  playAgain.depth = pillar.depth + 1;
  }
  if (frameCount % 200 === 0){
    score = score+1;

  }
}
else if(n===2) {
  if(frameCount % 200 === 0){
    pillar = createSprite(windowWidth+10,0);
  
    pillar.debug = false;
    pillar.setCollider("rectangle",0, 0,100, 500)
    pillar.addImage("pillarImage",pillarImage);
    pillar.velocityX = -5;
    pillarGroup.add(pillar);
    gameOver.depth = pillar.depth + 1;
  playAgain.depth = pillar.depth + 1;
  }
  if(frameCount % 200 === 0){
    pillar = createSprite(windowWidth+10,windowHeight-100);

    pillar.addImage("pillarImage",pillarImage);
    pillar.debug = false;
    pillar.setCollider("rectangle",0, 0,100, 500)
    pillar.velocityX = -5;
    pillarGroup.add(pillar);
    gameOver.depth = pillar.depth + 1;
  playAgain.depth = pillar.depth + 1;
  }
  if (frameCount % 200 === 0){
    score = score+1;

  }
} 
//console.log(n)
else if(n===3) {
  if(frameCount % 200 === 0){
    pillar = createSprite(windowWidth+10,200);
  
    pillar.debug = false;
    pillar.setCollider("rectangle",0, 0,100, 500)
    pillar.addImage("pillarImage",pillarImage);
    pillar.velocityX = -5;
    pillarGroup.add(pillar);
    gameOver.depth = pillar.depth + 1;
  playAgain.depth = pillar.depth + 1;
  }
  if(frameCount % 200 === 0){
    pillar = createSprite(windowWidth+10,windowHeight+100);

    pillar.addImage("pillarImage",pillarImage);
    pillar.debug = false;
    pillar.setCollider("rectangle",0, 0,100, 500)
    pillar.velocityX = -5;
    pillarGroup.add(pillar);
    gameOver.depth = pillar.depth + 1;
  playAgain.depth = pillar.depth + 1;
  }
  if (frameCount % 200 === 0){
    score = score+1;

  }
}
}
function gameOverFN(){
  gameOver.visible = true;
  playAgain.visible = true;
  railing.velocityX = 0;
  railing.velocityY = 0;
  flappyBird.velocityY = 0;
  flappyBird.velocityX = 0;
  flappyBird.changeAnimation("BirdGAMEOVER", BirdGAMEOVER);
  pillarGroup.setVelocityXEach(0);
  
  if (mousePressedOver(playAgain)){
    Restart();
  }
}
function Restart(){
  Gamestate = PLAY;
  score = -1;
  gameOver.visible = false;
  playAgain.visible = false;
  flappyBird.x = 600;
  flappyBird.y = windowHeight/2;
  pillarGroup.destroyEach();
  flappyBird.changeAnimation("flappyBirdImage", flappyBirdImage);
  railing.velocityX = -5;
}
