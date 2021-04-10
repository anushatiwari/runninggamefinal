var player, playerAnimation
var background1, backgroundImage, ground
var rock1Image, rock2Image, rock3Image, coinImage
var coinGroup, largeCoinGroup, rockGroup
var score=0
var lifeCount=3
var gameState="play"
var playerRest
function preload(){
  playerAnimation=loadAnimation("player1.png","player3.png","player2.png")
  backgroundImage=loadImage("background.png")
  rock1Image=loadImage("rock1.png")
  rock2Image=loadImage("rock2.png")
  rock3Image=loadImage("rock3.png")
  coinImage=loadImage("coin.png")
  playerRest=loadAnimation("player2.png")
}
function setup() {
  createCanvas(800,400);
  background1=createSprite(400,290,1500,100)
  ground=createSprite(400,390,800,10)
  background1.addImage(backgroundImage)
  background1.scale=2.34
  player=createSprite(50, 345, 50, 50);
  player.addAnimation("player",playerAnimation)
  player.addAnimation("rest",playerRest)
  player.scale=.4
  ground.visible=false
  coinGroup=new Group()
  largeCoinGroup=new Group()
  rockGroup=new Group()
  player.debug=true
}

function draw() {
  background(0);  
  if(gameState==="play"){
    background1.velocityX=-4
    if (background1.x<100){
      background1.x=background1.width/2
    }
    if (keyDown("space") && player.y>300){
      player.velocityY=-13
    }
    player.velocityY=player.velocityY+.5
  
    console.log(player.y)
    spawnRocks()
    spawnCoins()
    spawnLargeCoins()
    if(coinGroup.isTouching(player)){
    score=score+1
    coinGroup.destroyEach()
    }
    if(largeCoinGroup.isTouching(player)){
      score=score+5
      largeCoinGroup.destroyEach()
        }
    for(var i=0;i<rockGroup.length;i++){
      if(rockGroup.get(i).isTouching(player)){
        lifeCount=lifeCount-1
        rockGroup.get(i).destroy()
      }
    }
    if(lifeCount===0){
      gameState="end"
    }
  }
  else if(gameState==="end"){
player.changeAnimation("rest",playerRest)
background1.velocityX=0
rockGroup.setVelocityXEach(0)
coinGroup.setVelocityXEach(0)
largeCoinGroup.setVelocityEach(0)
rockGroup.setLifetimeEach(-1)
coinGroup.setLifetimeEach(-1)
largeCoinGroup.setLifetimeEach(-1)
  }

  player.collide(ground)
  drawSprites();
  textSize(25)
  stroke("black")
  fill("black")
  text("Score:"+score, 675,50)
  text("Life:"+lifeCount, 125, 50)
  if (gameState==='end') {
    textSize(50)
    text("Game Over", 280,200)
  }
}

function spawnRocks(){
if (frameCount%120===0){
  var rock1 = createSprite(800,360,50,50)
  rock1.setCollider("rectangle",0,0,620,450)
  rock1.velocityX=-5
  var rand=Math.round(random(1,3))
  switch(rand){
    case 1:
      rock1.addImage(rock1Image)
      break;
    case 2:
      rock1.addImage(rock2Image)
      break;
    case 3:
      rock1.addImage(rock3Image)
    default: break;
  }
  rock1.scale=.13
  rock1.lifetime=170
  rockGroup.add(rock1)
  rock1.debug=true
}
}

function spawnCoins(){
  if(frameCount%140===0){
    var coin=createSprite(800,200,50,50)
    coin.velocityX=-6
    coin.y=Math.round(180,290)
    coin.addImage(coinImage)
    coin.scale=.05
    coinGroup.add(coin)
    coin.lifetime=170
  }
}

function spawnLargeCoins(){
  if(frameCount%270===0){
    var largecoin=createSprite(800,200,50,50)
    largecoin.velocityX=-6
    largecoin.y=Math.round(180,290)
    largecoin.addImage(coinImage)
    largecoin.scale=.08
    largecoin.lifetime=170
    largeCoinGroup.add(largecoin)
  }
}