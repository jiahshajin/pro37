 
var  dog,dogImg,happyDog,database,foodS,foodStock
var fedTime,lastFed;
var feed,addFood;
var foodObj;
 var bedroomImg
 var washroomImg
 var gardenImg
 var gameState
 var bedroom,washroom,garden
function preload()
{
  //load images here

  dogImg=loadImage("images/dogImg.png")
  happyDog=loadImage("images/happydog.png")
  bedroomImg=loadImage("images/Bed Room.png")
  washroomImg=loadImage("images/Wash Room.png")
  gardenImg=loadImage("images/Garden.png")
   

  
}

function setup() {
  
  createCanvas(550,550);

  database = firebase.database();

dog=createSprite(390,390,20,20)
dog.addImage(dogImg)
dog.scale=0.19

  foodStock=database.ref('Food');
 foodStock.on("value",readStock);
 
 readState=database.ref('gameState');
readState.on("value",function(data){
  gameState=data.val();

})

 
 feed=createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);
  

  addFood=createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

foodObj = new Food();




}


function draw() { 
  background(46,139,87) 
  foodObj.display()
 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed=data.val();
  })
  
   
   
  
   
fill(255,255,254);
textSize(15);
if (lastFed>=12) {
  text("Last Feed :"+ lastFed%12 + "PM",350,30);
}
else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
}
else{
  text("Last Feed :"+ lastFed + "AM",350,30)
}
  
 if(gameState!="Hungry"){
   feed.hide();
   addFood.hide();
  // dog.remove();
 }
 else{
   feed.show()
   addFood.show();
   dog.addImage(dogImg);
 }

 currentTime=hour();
 if(currentTime==(lastFed+1)){
   update("Playing");
   foodObj.garden();
 }else if(currentTime==(lastFed+2)){
   update("Sleeping");
   foodObj.bedroom();
 }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+6)){
   update("Bathing");
   foodObj.washroom();
 }  
 else{
   update("Hungry")
   foodObj.display();
   dog.display();
 }

 // drawSprites();
  //add styles here

   
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  
})

}
 
 function update(state){
   database.ref('/').update({
     gameState:state
   })
 }
