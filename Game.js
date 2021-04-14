class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    duck1 = createSprite(100,200);
    duck1.addImage("duck1",duck1Image);
    duck1.scale=0.2;

    duck2 = createSprite(300,200);
    duck2.addImage("duck2",duck2Image);
    duck2.scale=0.2;

    duck3 = createSprite(500,200);
    duck3.addImage("duck3",duck3Image);
    duck3.scale=0.2;

    duck4 = createSprite(700,200);
    duck4.addImage("duck4",duck4Image);
    duck4.scale=0.2;

    ducks=[duck1,duck2,duck3,duck4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("black");
      image(pondImage,0,displayHeight-30,displayWidth,displayHeight);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 180;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        ducks[index-1].x = x;
        ducks[index-1].y = y;

        if (index === player.index){
          ducks[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = ducks[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
     if(player.distance>3800){
       gameState=2
     }
    drawSprites();
  }
  end(){
  console.log("The Game Ended");
  }
}
