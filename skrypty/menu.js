

var menu = function () {
	
	var canvas = document.getElementById("canvas");
 	var ctx = canvas.getContext("2d");
	var menq = new Image();
	if (gracz.menu_opcja === 0) gracz.menu_opcja = 4;
	if (gracz.menu_opcja === 5) gracz.menu_opcja = 1;
	draw();
	ctx.font = "20pt Times New Roman";
	switch(gracz.menu_opcja){
	
		case 1:	
//		
		ctx.fillStyle = 'rgba(0,0,0,0.6)';
 		ctx.fillRect(0,0,640,480);
 		ctx.fillStyle = 'rgb(255,255,255)';
		ctx.fillText('Ekwipunek',10,200);
		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.fillText('Statystyki',10,230);
		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.fillText('Statystyki serwera',10,260);
		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.fillText('Wyjscie',10,290);     	
		gracz.pressed=false
	break;
		case 2:	
	//	draw();
		ctx.fillStyle = 'rgba(0,0,0,0.6)';
 		ctx.fillRect(0,0,640,480);
		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.fillText('Ekwipunek',10,200);
 		ctx.fillStyle = 'rgb(255,255,255)';
		ctx.fillText('Statystyki',10,230);
		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.fillText('Statystyki serwera',10,260);
		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.fillText('Wyjscie',10,290);     	
		gracz.pressed=false
	break;
		case 3:	
	//	draw();
		ctx.fillStyle = 'rgba(0,0,0,0.6)';
 		ctx.fillRect(0,0,640,480);
		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.fillText('Ekwipunek',10,200);
		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.fillText('Statystyki',10,230);
 		ctx.fillStyle = 'rgb(255,255,255)';
		ctx.fillText('Statystyki serwera',10,260);
		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.fillText('Wyjscie',10,290);     	
		gracz.pressed=false
	break;
		case 4:	
	//	draw();
		ctx.fillStyle = 'rgba(0,0,0,0.6)';
 		ctx.fillRect(0,0,640,480);
		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.fillText('Ekwipunek',10,200);
		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.fillText('Statystyki',10,230);
		ctx.fillStyle = 'rgba(255,255,255,0.2)';
		ctx.fillText('Statystyki serwera',10,260);
 		ctx.fillStyle = 'rgb(255,255,255)';
		ctx.fillText('Wyjscie',10,290);     	
		gracz.pressed=false
	break;


	}


}
