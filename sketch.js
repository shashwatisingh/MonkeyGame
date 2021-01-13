
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);  
  
  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  //create groups 
  bananasGroup= new Group();
  obstacleGroup= new Group();
  
}

function draw() {
  background(255);
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
    if(keyDown("space")){
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
        
    monkey.collide(ground);
    
  var survivalTime = 0;
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50);
  
  //call them in draw function
  spawnBanana();
  spawnObstacle();
  
drawSprites();  
  
  if (monkey.isTouching(obstacleGroup)){
    monkey.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.destroyEach();
    bananasGroup.destroyEach();
    
  }
 

  
  
}
 function spawnBanana() {
  //write code here to spawn the banana
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,100,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    bananasGroup.add(banana);
  }
  
}
 function spawnObstacle() {
  //write code here to spawn the obstacle
  if (frameCount % 120 === 0) {
    var obstacle = createSprite(600,328,20,20);
    //obstacle won't have random y position
    //obstacle.y = Math.round(random(120,200));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
  
}
