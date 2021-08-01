//1小鱼跟着大鱼移动
//2小鱼跟着大鱼旋转
//3小鱼尾巴的摇摆
//思路：1先是定义一个存储小鱼尾巴所有图片的数组
//
//

function smallfishObj(){
   smallfishObj.prototype.x;
   smallfishObj.prototype.y;       //小鱼的横纵坐标
   smallfishObj.prototype.angle;

   smallfishObj.prototype.smallTailtime = 0;
   smallfishObj.prototype.smallTailcount = 0;

   smallfishObj.prototype.smallEyetime = 0;
   smallfishObj.prototype.smallEyecount = 0;
   smallfishObj.prototype.smallEyeinterval = 1000;

   smallfishObj.prototype.samllBodytime = 0;
   smallfishObj.prototype.smallBodycount = 0;
   smallfishObj.prototype.samllBodyinterval = 400;

   //smallfishObj.prototype.smallEye = new Image();
   //smallfishObj.prototype.smallBody = new Image();
   //smallfishObj.prototype.smallTail = new Image();
   //smallfishObj.prototype.smallTailPic = [];   //定义一个小鱼尾巴的图片的数组

   smallfishObj.prototype.init = function(){
      this.x = canWidth * 0.5 - 50;
      this.y = canHeight * 0.5 + 50;

      this.angle = 0;

      //this.smallEye.src = "image/babyEye0.png";
      //this.smallBody.src = "image/babyFade0.png";

      //this.smallTail.src = "image/babyTail0.png";
   }

   smallfishObj.prototype.drawSmallfish = function(){
      //c1.clearRect(0,0,canWidth,canHeight);

      this.x = lerpDistance(bigFish.x,this.x,0.98);           //百分比越小就越接近目标的值
      this.y = lerpDistance(bigFish.y,this.y,0.98);

      var deltaX = bigFish.x - this.x;
      var deltaY = bigFish.y - this.y;   //这两个分别为大鱼和小鱼的横纵坐标差
      var aoa = Math.atan2(deltaY,deltaX) + Math.PI;    //这计算的是大鱼和小鱼的角度差
      this.angle = lerpAngle(aoa,this.angle,0.6);      //让小鱼的角度去尽量接近这个角度差

      this.smallTailtime += interval;    //定义一个时钟来提醒什么时候该画下一帧图片
      if(this.smallTailtime > 50){
      	 this.smallTailcount = (this.smallTailcount + 1)%8;
      	 this.smallTailtime %= 50;      //复原定时器 
      }

      this.smallEyetime += interval;
      if(this.smallEyetime > this.smallEyeinterval){
      	 this.smallEyecount = (this.smallEyecount + 1)%2;    //这个count数值要么是0要么是1所以他的数值会决定绘制哪张小鱼眼睛的图片
      	 this.smallEyetime %= this.smallEyeinterval;
      	 if(this.smallEyecount == 0){   //0是睁眼的状态  所以时间长一点
            this.smallEyeinterval = Math.random() * 1500 + 2000;   //[2000,3500)
      	 }
      	 else{
      	 	this.smallEyeinterval = 200;  //闭眼的状态  时间短一点
      	 }
      }

      this.samllBodytime += interval;
      if(this.samllBodytime > this.samllBodyinterval){
      	 this.smallBodycount = this.smallBodycount + 1;
      	 if(this.smallBodycount >= 19){
            this.smallBodycount = 19;
            data.gameover = true;
      	 }
      	 this.samllBodytime %= this.samllBodyinterval;
      }

      //这是小鱼整体绘制的过程
      c1.save(); 
      c1.translate(this.x,this.y);      //平移
      c1.rotate(this.angle);            //小鱼旋转的角度
      var countTail = this.smallTailcount;
      c1.drawImage(smallTailPic[countTail],-smallTailPic[countTail].width*0.5+23,-smallTailPic[countTail].height*0.5);
      var countBody = this.smallBodycount;
      c1.drawImage(smallBodyPic[countBody],-smallBodyPic[countBody].width*0.5,-smallBodyPic[countBody].height*0.5);
      var countEye = this.smallEyecount;
      c1.drawImage(smallEyePic[countEye],-smallEyePic[countEye].width*0.5,-smallEyePic[countEye].height*0.5);
      c1.restore();
   }
}