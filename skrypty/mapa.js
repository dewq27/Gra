var gracz ={


	img: new Image(),
	map: new Image(),

	blok:[],
	gracze : []
};


var init_map = function () {
	

	for (var i = 0;i<100;i++) gracz.blok[i] = [];
	for (var i = 0;i<100;i++){
	  for (var j = 0;j<100;j++) gracz.blok[i][j] = true;
	}
	bloki();
	
	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");

	ctx.font = "20pt Times New Roman";
	ctx.fillStyle = "green";
	ctx.fillText('Laduje mape',260,236);

	gracz.img.src='moja_grafika/chars.png';
 	gracz.map.src='moja_grafika/mapa.png';
  gracz.map.onload =function(){
			// $("#info").delay(1000).toggle(2000).delay(6000).toggle(2000);
      
			socket.emit('gracz',{nick : gracz.name});
			socket.on('setPosition', function (data) {
			gracz.pos_x = data.x;
			gracz.pos_y = data.y;
			
			gracz.animacja = 0;
			gracz.animacja_czas = 1;
			gracz.poruszanie = true,
			gracz.menu = false,
			gracz.pressed = false,
			gracz.menu_opcja = 1,
			gracz.szybkosc = 25,
					$("#czat").show();
      
			draw();
		});
	
		gracz.img.onload =function(){
		draw();
			$("#czat").show();
		}
 	}

 	
 }

