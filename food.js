class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('images/Food Stock.png');
    }

   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

    getFoodStock(){
      return this.foodStock;
    }

    bedroom(){
      background(bedroomImg,1609,900); 
    }

    garden(){
      background(gardenImg,650,800);
    }

    washroom(){
      background(washroomImg,690,890);
    }
     
     

    display(){
      var x=80,y=100;
      
     // imageMode(CENTER);
      image(this.image,740,180,70,70);
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+40;
        }
      }
    }
    
}
