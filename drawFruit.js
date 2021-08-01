//*********************绘制果实**************************
//缺点是果实的位置会重叠   后期要改进的地方
//
//
//1有两张果实 黄色和蓝色的
//2把所有的果实放在一个池子也就是容器里
//3果实是附在海葵上的
//4果实的状态 出生 成熟 离开海葵向上漂浮
//5规定漂浮的果实的数量  果实飘走后 就要有新的果实往上飘浮

function fruitObj(){
   fruitObj.prototype.num = 25;        //果实的数量
   fruitObj.prototype.active = [];     //果实的状态    blue值
   fruitObj.prototype.orange = new Image();     //两种果实的图片
   fruitObj.prototype.blue = new Image();
   fruitObj.prototype.x = [];         //果实的横纵坐标
   fruitObj.prototype.y = [];
   fruitObj.prototype.length = [];    //果实的长度
   fruitObj.prototype.speed = [];     //果实增长和上升的速度
   fruitObj.prototype.fruitType = [];  //果实出生时的类型
   fruitObj.prototype.vessleofFruit = [];      //定义一个容器储存产生的果实
   //fruitObj.prototype.aneNo = [];        //这是记录海葵的编号的数组  是为了让果实在海葵摆动的时候依然能跟得上它

   fruitObj.prototype.init = function(){
   	  for(var i=0;i<this.num;i++){
   	  	 this.active[i] = false;           //先让果实的状态是静止的

   	  	 this.x[i] = 0;
   	  	 this.y[i] = 0;
   	  	 //this.aneNo[i] = 0; 
   	  	 this.length[i] = 0;    //让果实初始化的时候为0
   	  	 this.speed[i] = Math.random() * 0.017 + 0.003;
   	  	 this.fruitType[i] = "";


   	  	 //this.born(i);          //找到一个位置让果实出生
   	  }

   	  this.orange.src = "image/fruit.png";
   	  this.blue.src = "image/blue.png";
   }
   
   fruitObj.prototype.drawFruit = function(){
      for(var i=0;i<this.num;i++){   //果实要找到一个对应自己的海葵
         
         //this.vessleofFruit.push(fruitpic);

         if(this.active[i]){
         	if(this.fruitType[i] == "blue"){
      	       var pic = this.blue;
            }
            else{
      	       var pic = this.orange;
            }

         	if(this.length[i] < 12){    //给果实增加一个范围 不能让他一直增长上去
         	   this.length[i] += this.speed[i] * interval;
            }
            else{
               this.y[i] -= this.speed[i] * 4 * interval;
            }
            
            var fruitpic = c2.drawImage(pic,this.x[i] - this.length[i]*0.5,this.y[i] - this.length[i]*0.5,this.length[i],this.length[i]);
            this.vessleofFruit.push(fruitpic);

            if(this.y[i] < -10){
         	   this.active[i] = false;
            }
         }


         
      }
   }

   fruitObj.prototype.update = function(){          //更新果实的方法  保持屏幕上有一定数量的果实
   	  var number = 0;
      for(var i=0;i<this.num;i++){
      	if(this.active[i]){    //要把漂浮向上的果实记个数 要知道有多少
           number++;
      	}
      	if(number < 12){     //如果屏幕上的果实少于15个那么就出生一个果实
      	   this.sendFruit();
           return;
      	}
      }

      var cnt = 0

      for( var i = 0 ; i < vessleofFruit.length ; i ++ )
        if(this.y[i] < -7){
            vessleofFruit[cnt++] = vessleofFruit[i];
        }

	    while( vessleofFruit.length > cnt ){
	        vessleofFruit.pop();
	    }

	    console.log(this.vessleofFruit.length);
   }

   fruitObj.prototype.born = function(i){
   	  if(!data.gameover){
	   	  var aneId = Math.floor(Math.random() * ane.num);   //[0,50)  //给海葵编号 取不到50
	   	  //this.aneNo[i] = Math.floor(Math.random() * ane.num);
	      this.x[i] = ane.endX[aneId];                     
	      this.y[i] = canHeight - ane.endY[aneId] + 200;
	      this.length[i] = 0;                //让果实出生的时候长度也为0
	      this.active[i] = true;
	      var rom = Math.random();
	      if(rom < 0.15){
	      	this.fruitType[i] = "blue";
	      }
	      else{
	      	this.fruitType[i] = "orange";
	      }
	  }

   }

   fruitObj.prototype.dide = function(i){
   	  this.active[i] = false;
   }

   fruitObj.prototype.sendFruit = function(){
      for(var i=0;i<this.num;i++){
      	 if(this.active[i] == false){
      	 	this.born(i);
      	 	return;
      	 }
      }
   }
}