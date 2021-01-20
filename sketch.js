var bg,bgImage
var player
var obstaclesGroup
var obstaclesImage

var gameState = "play";

function preload(){
  bgImage=loadImage("bg.jpg")
  obstaclesImage=loadImage("shark_image.png")
  playerImage=loadAnimation("swim1.png","swim3.png","swim4.png","swim2.png")


}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bg=createSprite(width/2,height/2,800,400)
  bg.shapeColor="lightgreen"
  bg.velocityX=-3
  bg.addImage("background",bgImage)
  bg.scale=3
  
  player=createSprite(100,height-50)
  player.addAnimation("player" ,playerImage)
  player.scale=0.4
  player.setCollider("rectangle",0,0,80,30)
  player.debug=true
  
  ground=createSprite(width/2,height-10,width,20)
  ground.visible=false
  obstaclesGroup=createGroup()
  
  edges=createEdgeSprites()
  
}

function draw() {
  background(220);
  
  if(gameState == "play"){

  if(bg.x <0){
    bg.x=bg.width/2
  }
  
  if(keyDown("up")&& player.y >=250){
    player.velocityY = -10
  }
  
  player.velocityY = player.velocityY+0.8
  
  player.collide(edges[0])
          
  console.log(player.y)
  spawnObstacles()
    
    if(obstaclesGroup.isTouching(player)){
      gameState = "end";
    }
    
  }
  
  if(gameState == "end"){
    bg.velocityX = 0;
    player.velocityY=0
  ground.velocityX=0
  obstaclesGroup.setVelocityXEach(0)
  obstaclesGroup.setLifetimeEach(0)
  player.visible=false
  }
  
  player.collide(ground);
drawSprites()
}

function spawnObstacles(){
  if(frameCount % 70 === 0){
    var obstacles=createSprite(700,440,20,20)
    obstacles.addImage("Obstacle" ,obstaclesImage)
    obstacles.velocityX=-6
    obstacles.shapeColor="red"
    obstaclesGroup.add(obstacles)
    obstacles.scale=0.2
    obstacles.lifetime=120
  }
}





