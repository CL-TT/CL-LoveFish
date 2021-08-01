//碰撞检测函数
//检测大鱼和果实的碰撞
//检测大鱼和小鱼的碰撞
//

function ffCollision(){    //大鱼和果实的碰撞检测
	if(!data.gameover){   //游戏不结束才执行这个碰撞检测
	    for(var i=0;i<fruit.num;i++){     //要遍历每一个果实
			if(fruit.active[i]){
			   var length = calLength2(fruit.x[i],fruit.y[i],bigFish.x,bigFish.y);    //这个值是个平方值
	           if(length < 900){
	       	      fruit.dide(i);
	       	      data.num++;           //她的思路是吃到一个果实 num就自加1

	              bigFish.bigBodycount++;            //这是判断大鱼身体变化是哪一种
	              if(bigFish.bigBodycount >= 7){
	                 bigFish.bigBodycount = 7;
	              }

	       	      if(fruit.fruitType[i] == "blue"){    //吃到的是蓝色果实 double就变成2
	       	      	 data.double = 2;
	       	      }

	       	      wave.born(fruit.x[i],fruit.y[i]);
	           }
			}
	       
		}
	}
}


function bsCollision(){   //大鱼和小鱼的碰撞检测
	   //只有当游戏不结束的时候才执行大鱼和小鱼的检测
	    if(!data.gameover && data.num > 0){
	       var length = calLength2(bigFish.x,bigFish.y,smallFish.x,smallFish.y);
		   if(length < 900){
			 smallFish.smallBodycount = 0;   //就让小鱼身体图片从新开始计数
			 //data.reset();
			 bigFish.bigBodycount = 0;
			 data.addScore();

			 halo.born(smallFish.x,smallFish.y);
		   }
		}
}