var PLAY=1;
var END=0;
var gameState=1;
var ground
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(50,350,20,20);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.1;
  //monkey.debug=true;
  
  ground=createSprite(200,385,400,10);
  
  
  bananaGroup=new Group();
  obstaclesGroup=new Group();
}


function draw() {
 background("greenYellow");
  
  if(gameState===PLAY){
    
    stroke("black");
    textSize(20);
    fill("purple");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("survivalTime: "+survivalTime,100,50);
    
    //jump when the space key is pressed
      if(keyDown("space")) {
        monkey.velocityY = -12;
       
    } 
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
    
  
  
  
  spawnBanana();
  spawnObstacles();
    
  
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
   }
  
  if(obstaclesGroup.isTouching(monkey)){
    gameState = END;
  }
  
  }
  
  else if(gameState===END){
    
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    bananaGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
    } 
    
  
  
  monkey.collide(ground);
  
  drawSprites();
  
}
  
function spawnBanana() {
  //write code here to spawn the bananas
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,180,20,20);
    //banana.debug=true;
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 133;
    monkey.depth = banana.depth + 1;
    bananaGroup.add(banana);

  }
}

//write code here to spawn the obstacles
  function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(400,355,10,40);
    obstacle.velocityX = -4;
    
    //obstacle.debug = true;
    
    //add image to the obstacle 
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 100;
    
    obstaclesGroup.add(obstacle);
  }
}

