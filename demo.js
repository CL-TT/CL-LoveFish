//1两个画布 要弄清楚每一个画布需要绘制的内容 哪些元素绘制在哪个画布上
//2 画布1 
//3 画布2  背景图片，
//
//4 先绘制了游戏的背景图片
//5 绘制海葵
//6 生成食物和向上漂浮
//7 绘制大鱼 大鱼随鼠标移动和旋转 大鱼和果实的碰撞检测
//8 绘制小鱼 小鱼随大鱼的移动和旋转



//***************全局变量****************
//定义了全局变量那么它的值就可以为其他函数所用
var canvas1;
var canvas2;

var c1;
var c2;

var canWidth;
var canHeight;

var bgPic = new Image();

//要计算出每一帧的时间间隔
var lastTime;   //上一帧时间
var interval;   //时间间隔

var mouseX;    //鼠标的横纵坐标
var mouseY;

var smallTailPic = [];          //定义一个数组存储小鱼尾巴的图片
var smallEyePic = [];           //定义一个数组存储小鱼眼睛的图片
var smallBodyPic = [];          //定义一个数组存储小鱼身体的变化的图片

var bigTailPic = [];
var bigEyePic = [];

var bigBodyorange = [];
var bigBodyblue = [];

var ane;
var fruit;
var bigFish;
var smallFish;

var data;

var wave;

var halo;



//***************页面一刷新就加载的函数*************
window.onload = function(){
	lastTime = Date.now();   //这是上一帧的时间
    interval = 0;            //先设置时间间隔为0  
	init();
	gameloop();
}



//****************这是初始化函数****************
function init(){
   canvas1 = document.getElementById('canvas1');
   canvas2 = document.getElementById('canvas2');

   c1 = canvas1.getContext('2d');
   c2 = canvas2.getContext('2d');

   c1.font = '36px 宋体';
   c1.textAlign = "center";

   canWidth = canvas1.width;
   canHeight = canvas1.height;   //获取画布的宽度和高度

   mouseX = canWidth * 0.5;      //让鼠标的初始位置在画布的中间
   mouseY = canHeight * 0.5;
   
   //什么事件 执行这个事件的方法 是冒泡还是捕获
   canvas1.addEventListener('mousemove',onMouseMove,false); //是canvas这个元素添加事件监听 事件会在鼠标指针移动时发生

   bgPic.src = "image/background.jpg";   //获得背景图片的路径
   
   ane = new aneObj();
   ane.init();
   
   fruit = new fruitObj();
   fruit.init();

   bigFish = new bigfishObj();
   bigFish.init();

   smallFish = new smallfishObj();
   smallFish.init();
   //drawBackgroup(c2,bgPic);
   //***************小鱼图片的遍历************************
   for(var i=0;i<8;i++){
   	  smallTailPic[i] = new Image();
   	  smallTailPic[i].src = "image/bigTail"+i+".png";
   }

   for(var i=0;i<2;i++){
   	  smallEyePic[i] = new Image();
   	  smallEyePic[i].src = "image/babyEye"+i+".png";
   }

   for(var i=0;i<20;i++){
   	  smallBodyPic[i] = new Image();
   	  smallBodyPic[i].src = "image/babyFade"+i+".png";
   }

   //****************大鱼图片的遍历********************
   for(var i=0;i<8;i++){
   	  bigTailPic[i] = new Image();
   	  bigTailPic[i].src = "image/bigTail"+i+".png";
   }

   for(var i=0;i<2;i++){
   	  bigEyePic[i] = new Image();
   	  bigEyePic[i].src = "image/bigEye"+i+".png";
   }
   //*******************大鱼吃果实身体变化的图片数组的遍历**********************
   for(var i=0;i<8;i++){
   	  bigBodyorange[i] = new Image();
   	  bigBodyorange[i].src = "image/bigSwim"+i+".png";
   	  bigBodyblue[i] = new Image();
   	  bigBodyblue[i].src = "image/bigSwimBlue"+i+".png";
   }

   
   //*****************************************
   data = new dataObj();

   wave = new waveObj();
   wave.init();

   halo = new haloObj();
   halo.init();
}


//********************这是重复刷新页面的函数 渲染页面************************
function gameloop(){
	window.requestAnimFrame(gameloop);       //功能和计时器差不多 性能比setTimeout 和 setInterval更好
    var nowTime = Date.now();
    interval = nowTime - lastTime;
    lastTime = nowTime;
    if(interval >= 40){      //这是防止果实一直变大
    	interval = 40;
    }
    //console.log(interval);
    drawBackgroup(c2,bgPic);        //这个地方要注意****

    ane.drawAne();

    fruit.drawFruit();
    fruit.update();             //每一帧都要判断屏幕上是否是固定的果实数量
    
    c1.clearRect(0,0,canWidth,canHeight);
    bigFish.drawBigfish();

    ffCollision();       //大鱼和果实的碰撞检测函数
    bsCollision();       //大鱼和小鱼的碰撞检测函数

    smallFish.drawSmallfish();

    data.draw();

    wave.draw();

    halo.draw();
}


//*************************绘制背景图片的函数*************************
function drawBackgroup(c2,bgPic){
	c2.drawImage(bgPic,0,0,canWidth,canHeight);
}



//*************************鼠标移动要执行的函数****************************
function onMouseMove(e){
    if(!data.gameover){   //游戏不结束的时候才能移动
      if(e.offSetX || e.layerX){
   	     mouseX = e.offSetX == undefined ? e.layerX : e.offSetX;      //如果这个鼠标的值不存在 就用layerx 存在就用offsetx
   	     mouseY = e.offSetY == undefined ? e.layerY : e.offSetY;
      }
    }
   
}

