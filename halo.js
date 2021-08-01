//这是大鱼喂小鱼果实产生彩色圈
//
//

function haloObj(){
   haloObj.prototype.x = [];
   haloObj.prototype.y = [];
   haloObj.prototype.r = [];
   haloObj.prototype.alive = [];
   haloObj.prototype.num = 5;

   haloObj.prototype.init = function(){
   	  
      for(var i=0;i<this.num;i++){
      	 this.x[i] = 0;
   	     this.y[i] = 0;
   	     this.r[i] = 0;
   	     this.alive[i] = false;
   	  }
   }

   haloObj.prototype.draw = function(){
   	  c1.save();
   	  for(var i=0;i<this.num;i++){
         if(this.alive[i]){
         	this.r[i] += interval*0.05;
         	var alpha = 1 - this.r[i]/100;
         	if(this.r[i] >= 100){
         		this.alive[i] = false;
         		break;
         	}
            c1.beginPath();
            c1.lineWidth = 4;
            c1.strokeStyle = "rgba(225,69,0,"+alpha+")";
            c1.shadowBlur = 10;
            c1.shadowColor = "rab(225,69,0)";
            c1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2,true);
            c1.closePath();
            c1.stroke();
         }
   	  }
   	  c1.restore();
   }

   haloObj.prototype.born = function(a,b){
   	  for(var i=0;i<this.num;i++){
   	  	 if(!this.alive[i]){
   	  	 	this.x[i] = a;
   	  	 	this.y[i] = b;
   	  	 	this.r[i] = 10;
   	  	 	this.alive[i] = true;
   	  	 	return;
   	  	 }
   	  }
   }
}