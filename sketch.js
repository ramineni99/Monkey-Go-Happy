//Global Variables

var banana, bananaImage;
var jungle, jungleImage;
var monkey, monkeyWalking;
var monkeyDead;
var stone, stoneImage,ground;
var count;
var gameOver,restart,gameOverImage,restartImage;
var PLAY,END,gameState;
function preload(){
  bananaImage = loadImage("Banana.png");
  jungleImage = loadImage("jungle.jpg");
  stoneImage = loadImage("stone.png");
  monkeyCollided = loadImage("Monkey_01.png");
  monkeyWalking = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkeyDead = loadAnimation("Monkey_01.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}


function setup() {
  createCanvas(600,300);
  PLAY =1;
  END=0;
  gameState = PLAY;
   jungle = createSprite(300,150);
  jungle.addImage("jungle",jungleImage);
  jungle.scale = 1.2;
  monkey = createSprite(150,250);
  monkey.addAnimation("monkeyWalking",monkeyWalking);
  monkey.addAnimation("monkeyDead",monkeyCollided);
  monkey.scale = 0.15;
  ground = createSprite(300,290,600,30);
  gameOver = createSprite(300,150);
  restart = createSprite(300,200);
  gameOver.addImage("gameOver",gameOverImage);
  restart.addImage("restart",restartImage);
  ground.visible = false;
  restart.visible = false;
  gameOver.visible = false;
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  bananaGroup = new Group();
  obstacleGroup = new Group();
  count = 0;
}


function draw(){
 background(255);
  if(gameState == PLAY){
   if(keyDown("space")&&monkey.y>=228){
      monkey.velocityY= -14;
  }
       monkey.velocityY = monkey.velocityY + 0.5;
     jungle.velocityX = -5;
   if(jungle.x<0) {
    jungle.x = jungle.width/2;
 }
  spawnBananas();
  spawnRocks();
     if(monkey.isTouching(bananaGroup)){
       count = count+1;
      bananaGroup.destroyEach();
     }
     if(monkey.isTouching(obstacleGroup)){
       gameState = END;
       console.log(monkey.y);
     }
   
     
  }
 else if(gameState == END){
    background(0);
    restart.visible = true;
    gameOver.visible = true;
  obstacleGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach(0);
   jungle.velocityX=0;
   ground.velocityX=0
     obstacleGroup.setLifetimeEach(-1);
   bananaGroup.setLifetimeEach(-1);
   monkey.velocityY=0;
   monkey.changeAnimation("monkeyDead",monkeyCollided); 
    if(mousePressedOver(restart)){
       reset();
       }
   
  }
  monkey.collide(ground);

  createEdgeSprites();
  drawSprites();
    fill("black");
  textSize(15);
 text("Score:"+count,500,50);
}
function spawnRocks(){
if(frameCount % 120 == 0) {
    stone = createSprite(600,240);
    stone.addImage("stoneImage",stoneImage);
    stone.scale = 0.21;
    stone.velocityX = -5;
    obstacleGroup.add(stone);
    stone.lifetime = 200;
    }
}
function spawnBananas() {
  if(frameCount % 120 == 0) {
    banana = createSprite(600,120);
    banana.addAnimation("bananaImage",bananaImage);
    banana.velocityX = -5;      
    banana.scale = 0.05;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  monkey.changeAnimation("monkeyWalking",monkeyWalking);

  count = 0;
}