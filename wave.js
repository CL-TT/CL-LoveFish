//大鱼吃果实特效
//
//
//

function waveObj(){
	waveObj.prototype.x = [];   //白圈的横纵坐标
	waveObj.prototype.y = [];
	waveObj.prototype.alive = [];
	waveObj.prototype.r = [];   //白圈的半径
	waveObj.prototype.num = 10;

	waveObj.prototype.init = function(){
       for(var i=0;i<this.num;i++){
          this.alive[i] = false;       //开始不可以用
          this.r[i] = 0;
       }
	}

	waveObj.prototype.draw = function(){
       c1.save();
       for(var i=0;i<this.num;i++){
       	  if(this.alive[i]){
       	  	this.r[i] += interval * 0.05;
            var alpha = 1 - this.r[i]/50;   //  达到50时值就变成0 完全透明 白圈就消失了  透明度和半径是反比的关系
            if(this.r[i] > 50){    //如果白圈的半径大于50 那么白圈就没用了
            	this.alive[i] = false;
            }
       	  	c1.strokeStyle = "rgba(255,255,255,"+alpha+")";
       	  	c1.lineWidth = 2;
       	  	c1.beginPath();
       	  	c1.shadowColor = "white";
       	  	c1.shadowBlur = 10;
       	  	c1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2,true);   //绘制那个白圈
       	  	c1.stroke();
       	  	c1.closePath();
       	  }
       }
       c1.restore();
	}

	waveObj.prototype.born = function(x,y){
       for(var i=0;i<this.num;i++){
          if(!this.alive[i]){
          	this.x[i] = x;        //获取到果实消失时的坐标
          	this.y[i] = y;
          	this.alive[i] = true;    //让这个标志变为真   然后可以执行draw方法
          	this.r[i] = 20;
          	return;    //因为一次只找一个
          }
       }
	}
}