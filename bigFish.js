//1大鱼是画在画布1上的
//2为画布1添加事件监听  鼠标移动的事件 让大鱼的坐标跟着鼠标的坐标移动而改变
//3大鱼的旋转 大鱼有角度 鼠标有角度  让其差生角度差  Math.atan2(y,x) 反正切求角度差
//4大鱼和果实的碰撞检测   每一帧都要检测
//
//

var bigfishObj = function(){
	bigfishObj.prototype.x;       //大鱼的横纵坐标
	bigfishObj.prototype.y;
	bigfishObj.prototype.angle;   //大鱼的角度

	bigfishObj.prototype.bigTailtime = 0;
    bigfishObj.prototype.bigTailcount = 0;

    bigfishObj.prototype.bigEyetime = 0;
    bigfishObj.prototype.bigEyecount = 0;
    bigfishObj.prototype.bigEyeinterval = 1000;

    bigfishObj.prototype.bigBodycount = 0;

	//bigfishObj.prototype.bigEye = new Image();      //大鱼眼睛
	bigfishObj.prototype.bigBody = new Image();     //大鱼身体
	//bigfishObj.prototype.bigTail = new Image();     //大鱼尾巴

	bigfishObj.prototype.init = function(){
       this.x = canWidth * 0.5;
       this.y = canHeight * 0.5;
       this.angle = 0;

       //this.bigEye.src = "image/bigEye0.png";
       this.bigBody.src = "image/bigSwim0.png";
       //this.bigTail.src = "image/bigTail0.png";
	}

	bigfishObj.prototype.drawBigfish = function(){
       c1.clearRect(0,0,canWidth,canHeight);       //这是清除画布上的内容
       
       this.x = lerpDistance(mouseX,this.x,0.95);           //百分比越小就越接近目标的值
       this.y = lerpDistance(mouseY,this.y,0.95);

       var deltaX = mouseX - this.x;
       var deltaY = mouseY - this.y;   //这两个分别为鼠标和大鱼的横纵坐标差
       var aoa = Math.atan2(deltaY,deltaX) + Math.PI;    //这计算的是鼠标和大鱼的角度差
       this.angle = lerpAngle(aoa,this.angle,0.6);      //让大鱼的角度去尽量接近这个角度差

       this.bigTailtime += interval;
       if(this.bigTailtime > 50){
          this.bigTailcount = (this.bigTailcount + 1)%8;
          this.bigTailtime %= 50;
       }

       this.bigEyetime += interval;
       if(this.bigEyetime > this.bigEyeinterval){
       	  this.bigEyecount = (this.bigEyecount + 1)%2;
          if(this.bigEyecount == 0){   //让睁眼的时间长一点
          	 this.bigEyeinterval = Math.random() * 1500 + 2000;   //[2000,3500)
          }
          else{   //让闭眼的时间短一点
          	 this.bigEyeinterval = 300;
          }
          this.bigEyetime %= this.bigEyeinterval;
       }
       

       //大鱼整体绘制的过程
       c1.save(); 
       c1.translate(this.x,this.y);      //平移
       c1.rotate(this.angle);            //大鱼旋转的角度
       var countTail = this.bigTailcount;
       c1.drawImage(bigTailPic[countTail],-bigTailPic[countTail].width*0.5+30,-bigTailPic[countTail].height*0.5);
       var countBody = this.bigBodycount;
       if(data.double == 1){
       	 c1.drawImage(bigBodyorange[countBody],-bigBodyorange[countBody].width*0.5,-bigBodyorange[countBody].height*0.5);
       }
       else{
         c1.drawImage(bigBodyblue[countBody],-bigBodyblue[countBody].width*0.5,-bigBodyblue[countBody].height*0.5);
       }
       var countEye = this.bigEyecount;
       c1.drawImage(bigEyePic[countEye],-bigEyePic[countEye].width*0.5,-bigEyePic[countEye].height*0.5);
       c1.restore();
	}
}