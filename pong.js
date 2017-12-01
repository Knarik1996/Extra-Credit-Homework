const canvas=document.getElementById("canvas");
const context=canvas.getContext("2d");
const a=canvas.width;
const b=canvas.height;

let winner="none"; //will be used later to indicate the winner of one battle
let p1score=0;	   //the scores of the first player and of the second one
let p2score=0;

/*
	Math.random() --> returns a random number in the interval [0, 1)
	Math.round(n) --> ordinary rounding of the given number n (5.5 -> 6, 5.3 -> 5)
	Math.floor(n) --> rounds the number n to the least integer(5.9 -> 5, -5.1 -> -6)
*/
const PlusOrMinus=function() // returns -1 or 1
{
	return Math.round(Math.random())*2-1;
}
const rand = function(num) {
	return Math.floor(Math.random() * num) + 1;
};

//the background image and the images for numbers from 0 to 10
const bimage=new Image();
bimage.src="https://wallpapertag.com/wallpaper/full/0/f/2/143805-widescreen-good-background-1920x1200-xiaomi.jpg";
const image0=new Image();
image0.src="data:image/png;base64,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";
const image1=new Image();
image1.src="https://i.imgur.com/d3Mna9P.jpg";
const image2=new Image();
image2.src="https://images-na.ssl-images-amazon.com/images/I/31xzJGNQCxL._SY300_.jpg";
const image3=new Image();
image3.src="http://pngimg.com/uploads/number3/number3_PNG14961.png";
const image4=new Image();
image4.src="https://vignette.wikia.nocookie.net/phobia/images/d/d0/4.jpg/revision/latest?cb=20161127143001";
const image5=new Image();
image5.src="https://images-na.ssl-images-amazon.com/images/I/51qmhup9BKL._SY355_.jpg";
const image6=new Image();
image6.src="https://vignette.wikia.nocookie.net/opartshunter/images/1/18/6.jpg/revision/latest?cb=20130603053127";
const image7=new Image();
image7.src="https://vignette.wikia.nocookie.net/phobia/images/f/fe/7.jpg/revision/latest?cb=20170121103340";
const image8=new Image();
image8.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqYsgo-C-LXeZ7oJg0O6ME8xO4SHQ34MGSGD0JPi2K3H5XK9gZ";
const image9=new Image();
image9.src="http://pngimg.com/uploads/number9/number9_PNG19114.png";
const image10=new Image();
image10.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnArKtIvWpp_fgpXY5Gkpe-Sj5cplpSKE3J1vLBAEKYYiM_wCn";
const imagedash=new Image();
imagedash.src="https://vignette.wikia.nocookie.net/skype-family/images/c/cf/Em_dash_u2014_icon_256x256.png/revision/latest?cb=20150611020238";



const gamedata={
	ispaused: false,//will be used to pause for some time when one of the players wins a battle
	player1:{
		x:280,
		y:620,
		width:100,
		height:1, //a very small height is important because due to it we will not consider side collisions
		color:"black"
	},
	player2:{
		x:280,
		y:30,
		width:100,
		height:1,
		color:"green"
	},
	ball:{
		x:rand(640)+20, //the ball will appear somewhere on canvas regarding its x coordinate
		y:Math.round(Math.random())*450 + rand(100)+50, //the first part indicates whether the ball is in the upper part of the canvas or not
		r:10, //radius
		xdelta:PlusOrMinus() * (rand(3)+5), //chooses randomly the direction
		ydelta:rand(3)+5,
		color:"blue"
	}
}
if(gamedata.ball.y>b/2)
	gamedata.ball.ydelta*=-1; //if the y coordinate of the ball is in the lower part of the canvas, the ball should move upwards
const p1=gamedata.player1; 
const p2=gamedata.player2; //for convenience
const ball=gamedata.ball;

const draw=function()
{
	context.drawImage(bimage, 0, 0, 708, b);//every time we draw our background image over everything
	
	//in this way we draw a circle
	context.beginPath();
	context.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI, false);
	context.fillStyle = ball.color;
	context.fill();
	context.lineWidth = 5;
	
	//our actual players drawn
	context.fillStyle=p1.color;
	context.fillRect(p1.x, p1.y, p1.width, p1.height);
	context.fillStyle=p2.color;
	context.fillRect(p2.x, p2.y, p2.width, p2.height);
}

//it seems to be complicated but this function just draws the score pictures in the right part of the canvas in accordance to the scores of the players
const drawscore=function()
{
	context.drawImage(imagedash, 780, 300, 200, 100);
	if(p1score===0)
	{
		context.clearRect(780, 400, 200, 200); //clear draw, clear draw, clear draw
		context.drawImage(image0, 780, 400, 200, 200);
	}
	else if(p1score===1)
	{
		context.clearRect(780, 400, 200, 200);
		context.drawImage(image1, 780, 400, 200, 200);
	}
	else if(p1score===2)
	{
		context.clearRect(780, 400, 200, 200);
		context.drawImage(image2, 780, 400, 200, 200);
	}
	else if(p1score===3)
	{
		context.clearRect(780, 400, 200, 200);
		context.drawImage(image3, 780, 400, 200, 200);
	}
	else if(p1score===4)
	{
		context.clearRect(780, 400, 200, 200);
		context.drawImage(image4, 780, 400, 200, 200);
	}
	else if(p1score===5)
	{
		context.clearRect(780, 400, 200, 200);
		context.drawImage(image5, 780, 400, 200, 200);
	}
	else if(p1score===6)
	{
		context.clearRect(780, 400, 200, 200);
		context.drawImage(image6, 780, 400, 200, 200);
	}
	else if(p1score===7)
	{
		context.clearRect(780, 400, 200, 200);
		context.drawImage(image7, 780, 400, 200, 200);
	}
	else if(p1score===8)
	{
		context.clearRect(780, 400, 200, 200);
		context.drawImage(image8, 780, 400, 200, 200);
	}
	else if(p1score===9)
	{
		context.clearRect(780, 400, 200, 200);
		context.drawImage(image9, 780, 400, 200, 200);
	}
	else if(p1score===10)
	{
		context.clearRect(780, 400, 200, 200);
		context.drawImage(image10, 780, 400, 200, 200);
	}
	if(p2score===0)
	{
		context.clearRect(780, 100, 200, 200);
		context.drawImage(image0, 780, 100, 200, 200);
	}
	else if(p2score===1)
	{
		context.clearRect(780, 100, 200, 200);
		context.drawImage(image1, 780, 100, 200, 200);
	}
	else if(p2score===2)
	{
		context.clearRect(780, 100, 200, 200);
		context.drawImage(image2, 780, 100, 200, 200);
	}
	else if(p2score===3)
	{
		context.clearRect(780, 100, 200, 200);
		context.drawImage(image3, 780, 100, 200, 200);
	}
	else if(p2score===4)
	{
		context.clearRect(780, 100, 200, 200);
		context.drawImage(image4, 780, 100, 200, 200);
	}
	else if(p2score===5)
	{
		context.clearRect(780, 100, 200, 200);
		context.drawImage(image5, 780, 100, 200, 200);
	}
	else if(p2score===6)
	{
		context.clearRect(780, 100, 200, 200);
		context.drawImage(image6, 780, 100, 200, 200);
	}
	else if(p2score===7)
	{
		context.clearRect(780, 100, 200, 200);
		context.drawImage(image7, 780, 100, 200, 200);
	}
	else if(p2score===8)
	{
		context.clearRect(780, 100, 200, 200);
		context.drawImage(image8, 780, 100, 200, 200);
	}
	else if(p2score===9)
	{
		context.clearRect(780, 100, 200, 200);
		context.drawImage(image9, 780, 100, 200, 200);
	}
	else if(p2score===10)
	{
		context.clearRect(780, 100, 200, 200);
		context.drawImage(image10, 780, 100, 200, 200);
	}
}

//this is the difficult part
const update=function()
{
	/*the case when the ball hits the first player from the top
	  in order to understand draw a circle and a rectangle on the paper
	  the last condition assures that the ball comes from the top to the bottom
	  the one before is to exclude the change of direction in case the ball is somehow under the rectangle*/
	if(ball.x>=p1.x && ball.x<=p1.x+p1.width && ball.y+ball.r>=p1.y && ball.y<p1.y && ball.ydelta>0)
		ball.ydelta=-ball.ydelta;
	
	//the case when the ball hits the first player from the corner from the left
	//the part with xdelta is very important because it indicates that the ball comes from the left
	//last condition is important because in this way we can avoid double or multiple changes of direction in case when an awkward move is done
	//the first condition is just the distance between the center of the circle and the corner with Math.pow(a, 2) used for the square
	else if(Math.pow((p1.x-ball.x), 2) + Math.pow((p1.y-ball.y), 2) <= ball.r*ball.r && ball.xdelta>0 && ball.ydelta>0)
	{
		ball.ydelta=-ball.ydelta;
		ball.xdelta=-ball.xdelta;		
	}
	
	//the same for the right corner
	else if(Math.pow((ball.x-p1.x-p1.width), 2) + Math.pow((p1.y-ball.y), 2) <= ball.r*ball.r && ball.xdelta<0 && ball.ydelta>0)
	{
		ball.ydelta=-ball.ydelta;
		ball.xdelta=-ball.xdelta;
	}
	
	//same logic for the second player
	if(ball.x>=p2.x && ball.x<=p2.x+p2.width && ball.y-ball.r<=p2.y+p2.height && ball.y>p2.y+p2.height)
		ball.ydelta=-ball.ydelta;
	else if(Math.pow((p2.x-ball.x), 2) + Math.pow((p2.y-ball.y), 2) <= ball.r*ball.r && ball.xdelta>0 && ball.ydelta<0)
	{
		ball.ydelta=-ball.ydelta;
		ball.xdelta=-ball.xdelta;		
	}
	else if(Math.pow((ball.x-p2.x-p2.width), 2) + Math.pow((ball.y-p2.y), 2) <= ball.r*ball.r && ball.xdelta<0 && ball.ydelta<0)
	{
		ball.ydelta=-ball.ydelta;
		ball.xdelta=-ball.xdelta;
	}
	
	//collision with the side walls
	if(ball.x+ball.r>=700)
		ball.xdelta=-ball.xdelta;
	if(ball.x-ball.r<=0)
		ball.xdelta=-ball.xdelta;
	
	//actual movement of the ball
	ball.x=ball.x+ball.xdelta;
	ball.y=ball.y+ball.ydelta;

	//the condition when somebody is a winner
	if(ball.y-ball.r>=b+10)
		winner="player2";
	else if(ball.y+ball.r<=-10)
		winner="player1";
	if(winner==="player2") //if the winner is the second player, start again, but the ball is his
	{
		p2score++;
		p1.x=280;
		p2.x=280;
		ball.x=rand(640)+20;
		ball.y=rand(100)+50;
	}
	if(winner==="player1")//same logic
	{
		p1score++;
		p1.x=280;
		p2.x=280;
		ball.x=rand(640)+20;
		ball.y=450 + rand(100)+50;
	}
}

const Akey = 65;
const Dkey = 68;
const leftkey = 37; //can be found on the Internet
const rightkey = 39;

document.addEventListener('keydown', function(event){
	//movement of the second player by A for the left and D for the right
	if(event.keyCode===Akey)
	{
		p2.x=p2.x-20;
		if(p2.x<=0)
			p2.x=0;
	}
	if(event.keyCode===Dkey)
	{
		p2.x=p2.x+20;
		if(p2.x>=700-p2.width)
			p2.x=700-p2.width;
	}
	
	//the movement of the first player by the left arrow and the right arrow
	if(event.keyCode===leftkey)
	{
		p1.x=p1.x-20;
		if(p1.x<=0)
			p1.x=0;
	}
	if(event.keyCode===rightkey)
	{
		p1.x=p1.x+20;
		if(p1.x>=700-p1.width)
			p1.x=700-p1.width;
	}
}, false);

//animation
const loop=function()
{
	//if the game is not paused, it should go on
	if(gamedata.ispaused===false)
	{
		draw();	
		update();
		drawscore();
	}
	
	
	if(winner!=="none") //if somebody has won a battle
	{
		gamedata.ispaused=true; //the game is paused
		setTimeout(function(){
			gamedata.ispaused=false; //after 1500 miliseconds the game continues
			winner="none"; //again there is no winner
		}, 1500)
	}
	
	//the game is until somebody gets 10

	if(p1score===10)
	{
		alert("player1 has won");
		p1score=0; //the whole game starts again
		p2score=0;
	}
	else if(p2score===10)
	{
		alert("player2 has won");
		p2score=0;
		p1score=0;
	}
	
	requestAnimationFrame(loop); //animation
};
loop();