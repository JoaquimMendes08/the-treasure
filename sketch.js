var vida = 5;
var success = false
var victoryImg;
var gameOverImg


function preload(){
  victoryImg = loadImage ('success.png');
  gameOverImg = loadImage('game over.png');
  chesT = loadImage('chest.png');
  canonR = loadImage("canonfr.png");
  canonL = loadImage("canonfl.png");
  ball = loadImage("ball.png");
  openChest = loadImage("open-chest.png")

  chaves = loadAnimation('key 1.png', 'key 2.png', 'key 3.png');
  moeda = loadAnimation('coin1.png', 'coin2.png', 'coin3.png', 'coin4.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
  //-------------------------------------- sprites --------------------------------------------------------------------
    
  chest = createSprite(windowWidth / 1.05, windowHeight / 2, 20, 20);
  chest.addImage(chesT);
  chest.scale = 0.3;
  //chest.debug = true
  chest.setCollider("rectangle", 0, 0, 90, 120)
  
  safe = createSprite(windowWidth / 15, windowHeight - 50);
  safe.visible = false
  player = createSprite(windowWidth / 15, windowHeight - 50);
  player.scale = 0.35;
  player.shapeColor = "#00ff00";
  //player.debug = true
  player.setCollider("rectangle", 0, 0, 70, 70)

  chave = createSprite(windowWidth / 1.05, windowHeight / 1.1);
  chave.scale = 0.3;
  chave.addAnimation("clé", chaves);
  //chave.velocityY = random(15,20);
  //chave.velocityX = random(15,20);
  //chave.debug = true
  chave.setCollider("rectangle", 0, 0, 50, 80)

  canonfr = createSprite(windowWidth / 50, windowHeight - windowHeight + 70);
  canonfr.addImage(canonR)
  canonfr.scale = 0.5
  //canonfr.debug = true
  canonfr.setCollider("rectangle", 0, 0, 200, 260)

  canonfl = createSprite(windowWidth / 1.02, windowHeight - windowHeight + 70);
  canonfl.addImage(canonL)
  canonfl.scale = 0.5
  //canonfl.debug = true
  canonfl.setCollider("rectangle", 0, 0, 200, 260);

  coin = createSprite(windowWidth / 1.05, windowHeight / 2.1, 20, 20);
  coin.addAnimation("coan", moeda);
  coin.scale = 0.5;
  coin.visible = false

  //-------------------------------------- walls -----------------------------------------------------------------------
  wallR = createSprite(windowWidth / 1, windowHeight - 350, 10, windowHeight);
  wallL = createSprite(windowWidth / 150, windowHeight - 350, 10, windowHeight);
  wallT = createSprite(windowWidth / 2, windowHeight - 710, windowWidth, 10);
  wallB = createSprite(windowWidth / 2, windowHeight - 20, windowWidth, 10);
  wallT.visible = false;
  wallB.visible = false;
  wallL.visible = false;
  wallR.visible = false;
  //------------------------------------- game over / success ------------------------------------------------------------
  victory = createSprite(windowWidth / 2, windowHeight - 350);
  victory.scale = 0.7;
  victory.visible = false
  victory.addImage(victoryImg);

  gameOver = createSprite(windowWidth / 2, windowHeight - 350);
  gameOver.scale = 1
  gameOver.visible = false
  gameOver.addImage(gameOverImg);
  //--------------------------------------- groups -----------------------------------------------------------------------------------
  balls = new Group()

}

//createEdgeSprites();

function draw() {
    background("#0265C0");
  // --------------------------------------------- colliders/bounceOffs --------------------------------------------
    player.collide(wallT);
    player.collide(wallB);
    player.collide(wallR);
    player.collide(wallL);
    player.collide(canonfl);
    player.collide(canonfr);
    coin.collide(canonfl);
    balls.bounceOff(safe);
  //----------------------------------------------------- ifs ------------------------------------------------------------
    

    if(player.isTouching(chave)){
      chave.x = player.x
      chave.y = player.y 
    }

    if(chave.isTouching(chest) && player.isTouching(chest)){
      victory.visible = true;
      chest.addImage(openChest);
      chest.scale = 0.4
    }

    if(balls.isTouching(player)){
      vida -= 1;
      player.x = windowWidth / 15;
      player.y = windowHeight - 50;
    }
    if(player.isTouching(balls) || vida == 0){
      player.shapeColor = "#ff0000"
      gameOver.visible = true
      chave.velocityX = 0
      chave.velocityY = 4
    }
    if(gameOver.visible == false && victory.visible == false){
      player.shapeColor = "#00ff00"
      spawnL();
      spawnR();
      move();
    }
    if(gameOver.visible == false && victory.visible == true){
      move();
      chave.x = chest.x;
      chave.y = chest.y;
      chave.scale = 0.15;
      coin.visible = true;
      coin.velocityY = -2;
      success = true;
      if(balls.isTouching(player)){
        vida -= 0;
      }
    }
    if(vida == 0 && (keyDown('space'))){
      restart();
    }
    if(success == true && (keyDown('space'))){
      restart();
    }
  //---------------------------------------------------- functions() --------------------------------------------
  
  drawSprites(); 
  //---------------------------------------------------- texts --------------------------------------------------------------------------
    fill("white");
    textSize(40);
    text("❤️: " + vida, windowWidth / 1.3, windowHeight - 650);
}

function spawnR(){
  if(frameCount % 7 == 0){
    ballR = createSprite(windowWidth / 20, windowHeight - windowHeight + 100);
    ballR.velocityX = 10;
    ballR.velocityY = random(-4, 20);
    ballR.scale = 0.5;
    ballR.addImage(ball);
    ballR.lifetime = 200;
    balls.add(ballR);
  }
}
function spawnL(){
  if(frameCount % 7 == 0){
    ballL = createSprite(windowWidth / 1.02, windowHeight - windowHeight + 100);
    ballL.velocityX = random(-20, 4);
    ballL.velocityY = 10;
    ballL.scale = 0.5;
    ballL.addImage(ball);
    ballL.lifetime = 200;
    balls.add(ballL);
  }
}
function move(){
  if (keyDown("down")){
    player.y += 10;
  }
  if (keyDown("up")){
    player.y += -10;
  }
  if (keyDown("right")){
    player.x += 10;
  }
  if (keyDown("left")){
    player.x += -10;
  }
}

function restart(){
  player.x = windowWidth / 15;
  player.y = windowHeight - 50;
  player.shapeColor = "#00FF00";
  spawnL();
  spawnR();
  move();
  gameOver.visible = false;
  victory.visible = false;
  coin.visible = false;
  vida = 5;
  chave.scale = 0.3;
  chave.x = windowWidth / 1.05;
  chave.y = windowHeight / 1.1;
  chave.velocityY = 0;
  chest.addImage(chesT);
  chest.scale = 0.3
}