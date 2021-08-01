//
//
//
//

function dataObj(){
   dataObj.prototype.num = 0;
   dataObj.prototype.double = 1;     //吃到果实。这个double就变成2
   dataObj.prototype.score = 0;      //定义分数
   dataObj.prototype.gameover = false;   //开始让游戏结束这个标志为假
   dataObj.prototype.diaphaneity = 0;    //定义一个透明度

   dataObj.prototype.draw = function(){
      var width = canvas1.width;
      var height = canvas1.height;

      c1.fillStyle = "red";
      //c1.fillText("num:"+this.num,width*0.5,height-50);
      //c1.fillText("double:"+this.double,width*0.5,height-80);
      c1.fillText("score:"+this.score,width*0.5,height-20);        //绘制分数
      
      //*************这是游戏结束弹出游戏结束提示的判断*************
      if(this.gameover){
      	 c1.save();
      	 this.diaphaneity += interval * 0.0005;
      	 if(this.diaphaneity >= 1){
      	 	this.diaphaneity = 1;
      	 }
      	 c1.fillStyle = "rgba(255,255,255,"+this.diaphaneity+")";
      	 c1.font = "60px 宋体";
      	 c1.shadowOffsetX = -12;
      	 c1.shadowOffsetY = 12;
      	 c1.shadowBlur = 14;    //这是模糊系数
      	 c1.shadowColor = "white";   //模糊的颜色
      	 c1.fillText("GAMEOVER",width*0.5,height*0.5);
      	 c1.restore();
      }
   }

   // dataObj.prototype.reset = function(){   //当大鱼把果实喂给小鱼时
   // 	  this.num = 0;
   // 	  this.double = 1;
   // }

   dataObj.prototype.addScore = function(){           //这是计算分数的方法
   	  this.score += this.num * 10 * this.double;
      this.num = 0;
      this.double = 1;
   }
}