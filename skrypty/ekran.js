var draw = function () {
  	var gracze = [];
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var mapa = ctx.drawImage(gracz.map,Math.abs(gracz.pos_x)-24,gracz.pos_y-16,640,480,0,0,2*640,2*480);
	ctx.drawImage(gracz.img, gracz.animacja_czas*32, gracz.animacja*32,32,32,320,236,32,32);

	
	draw_player();
	 
	
	ctx.font = "20pt Times New Roman";
	ctx.fillStyle = "white";
	ctx.fillText('x:'+parseInt(gracz.pos_x/32)+' y'+parseInt(gracz.pos_y/32),10,30);
// 	ctx.fillText(gracz.img,10,60);	
}
var login = function () {
  
  // Szybciej sie wgrywa
  gracz.img.src='moja_grafika/chars.png';
  gracz.map.src='moja_grafika/mapa.png';
  
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  ctx.fillStyle = "black";
  ctx.fillRect(0,0,640,480);
  
  ctx.font = "20pt Times New Roman";
  ctx.fillText('Witaj',10,30);
  $('#login').focus();

  
  /*
  *
  *       Zle haslo
  */
  socket.on('errLogin', function (data) {
    $('.error').hide(0).text(data.msg).show(400).delay(5000).hide(400);
  });
  /*
  *
  *       Zalogowano poprawnie
  */
  socket.on('zalogowano', function (data) {

    gracz.name = data.nick;
    $('#login_div').remove();

    init_map();        
  });
  
  
  socket.on('rysuj', function (data) {
      gracz.gracze[gracz.gracze.length] = {
	nick : data.nick,
	x : data.x,
	y : data.y
	
      }
    
  });
 
    socket.on ('yx', function (data){
// 	 var i=0;

var przesun;
	for (i = 0; i < gracz.gracze.length;i += 1){
	  if (gracz.gracze[i] && gracz.gracze[i].nick === data.gracz)
	  {
	    if (data.dir === "right"){
	    
// 		gracz.gracze[i].x += 32;
		  
	    przesun = gracz.gracze[i];
	    var krok = 0;
	    var idz =  setInterval (function () {
	      krok += 1;
	      przesun.x ++;
	      if (krok > 31) clearInterval(idz);
	    draw();  
	    },25);
	    draw();
	    
	 
	    
	    
	    
	    
// 	    alert('ddd');
	    }
	    else if (data.dir === "left"){
// 	    gracz.gracze[i].x -= 32;
	    przesun = gracz.gracze[i];
	    var krok = 0;
	    var idz =  setInterval (function () {
	      krok += 1;
	      przesun.x --;
	      if (krok > 31) clearInterval(idz);
	    draw();  
	    },25);
	    
	    
	    
	    draw();
// 	    alert('ddd');
	    }
	    else if (data.dir === "top"){
// 	    gracz.gracze[i].y -= 32;
	    przesun = gracz.gracze[i];
	    var krok = 0;
	    var idz =  setInterval (function () {
	      krok += 1;
	      przesun.y --;
	      if (krok > 31) clearInterval(idz);
	    draw();  
	    },25);
	    
	    draw();
// 	    alert('ddd');
	    }
	    else if (data.dir === "down"){
// 	    gracz.gracze[i].y += 32;
	    przesun = gracz.gracze[i];
	    var krok = 0;
	    var idz =  setInterval (function () {
	      krok += 1;
	      przesun.y ++;
	      if (krok > 31) clearInterval(idz);
	    draw();  
	    },25);
	    
	    draw();
// 	    alert('ddd');
	    }
	  }

	
	}
}); 
  
}



var draw_player = function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var i=0;
  for (i = 0; i < gracz.gracze.length;i += 1){
    if (gracz.gracze[i]) 
  

  var x =  parseInt(gracz.gracze[i].x) - parseInt(gracz.pos_x) ;
  var y = parseInt(gracz.gracze[i].y) - parseInt(gracz.pos_y) ;
  ctx.drawImage(gracz.img, 0, 0,32,32,x*2+32*10,y*2+32*7+10,32,32);
  ctx.fillText('x:'+  parseInt(gracz.gracze[i].x)+' y'+parseInt(gracz.gracze[i].y),10,60+i*20);	
 }
}
var sciemnij = function() {
  var i = 0;
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var fade = function() {
  if(i>0.6) {
    clearInterval(c); 
    gracz.menu=true;
    gracz.poruszanie=false;
    gracz.pressed=false;
    menu();
  }
  else {
    draw(); 
    ctx.fillStyle = 'rgba(0,0,0,'+i+')';
    ctx.fillRect(0,0,640,480);
    }
  i+=0.1;
  }
  var c = setInterval(fade,60);
}
var rozjasnij = function(){
  var i = 0.6.toFixed(1);
  var k;
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var fade = function(){
  i-=0.1.toFixed(1);
  k=parseFloat(i.toFixed(1));
  draw();
  ctx.fillStyle = 'rgba(0,0,0,'+i+')';
  ctx.fillRect(0,0,640,480);
  if(k === 0.0){
    clearInterval(c); 
    gracz.poruszanie=true;
    gracz.pressed=false;
    draw();
    gracz.menu_opcja=1;
    }
  }
  var c = setInterval(fade,100);
}
var wyjdz = function(){
  var i = 0;
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var fade = function() {
  if(i>1) {
    clearInterval(c); 
    gracz.destroy;
    }
  else {
    ctx.fillStyle = 'rgba(0,0,0,'+i+')';
    ctx.fillRect(0,0,640,480);
  }
  i+=0.1;
 }
  var c = setInterval(fade,60);
}