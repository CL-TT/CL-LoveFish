//****************绘制海葵*********************
//
//海葵摆动  要用到贝塞尔 二次曲线  起始点 控制点  结束点
//******************这种方式是原型模式********************

function aneObj(){
	aneObj.prototype.rootx = [];        //这是起始点  它的纵坐标就是画布的高度
	aneObj.prototype.endX = [];
	aneObj.prototype.endY = [];         //结束点的横纵坐标
	//aneObj.prototype.length = [];
	aneObj.prototype.num = 50;
	aneObj.prototype.angle = 0;
	aneObj.prototype.amp = [];   //每个海葵都有自己单独的振幅

	aneObj.prototype.init = function(){
       for(var i=0;i<this.num;i++){
		 this.rootx[i] = i * 20 + Math.random()*22;
		 this.endX[i] = this.rootx[i];
		 this.endY[i] = canHeight - 250 + Math.random()*50;
		 this.amp[i] = Math.random()*50+80;
		 //this.length[i] = 180 + Math.random()*50;
	   }
	}

	aneObj.prototype.drawAne = function(){
       this.angle += interval * 0.001;
       var length = Math.sin(this.angle);   //[-1,1] 的值
       c2.save();
	   c2.lineWidth = 19;    //线宽
	   c2.strokeStyle = '#3b154e';
	   c2.lineJoin = 'round';   //这是在闭合时候的样式
	   c2.lineCap = 'round';
	   c2.globaAlpha = 0.5;    //透明度
	   for(var i=0;i<this.num;i++){
	      c2.beginPath();
	      c2.moveTo(this.rootx[i],canHeight);     //二次贝塞尔曲线的起始点
          this.endX[i] = this.rootx[i] + length*this.amp[i];
	      c2.quadraticCurveTo(this.rootx[i],canHeight-150,this.endX[i],this.endY[i]);          //前面两个是控制点   后面两个是结束点
	      //c2.lineTo(this.x[i],canHeight-this.length[i]);
	      c2.closePath();
	      c2.stroke();
	   }
	   c2.restore();
	}
}






















