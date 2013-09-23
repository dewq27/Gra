

function doKeyDown(evt){
//alert(evt.keyCode);
switch (evt.keyCode) {
	case 32:							//Spacja czyli menu
	if (gracz.menu===false){			//jezeli menu wylaczone to sciemnij obraz
		if(gracz.pressed === false){ 			//jezeli sprawdzacz jest false czyli niewcisniety
			gracz.pressed = true;				//ustaw na wcisniety
			
			
			if (sciemnij());	//sciemnij obraz

			}
		break;
	}
	else {								//Jezeli menu wlaczone to rozjasnij
		if(gracz.pressed === false){ 						 
			gracz.pressed = true;
			gracz.menu=false;								
			if (rozjasnij()===true)
			 gracz.pressed = false;	//rozjasnij

		}
		break;
	}
}

if (gracz.poruszanie === true){
switch (evt.keyCode) {
	
	case 13:
		$("#czat_input").focus();
		
		break;
	case 38:  //góra strzalka w gore
		if(gracz.pressed === false){ 						 //jezeli sprawdzacz jest false czyli niewcisniety
			gracz.pressed = true;
			gracz.animacja=3;							//ustaw na wcisniety
			if (go_top()===true) gracz.pressed = false;	//idz w gore, jezeli funkcja go top sie skonczyla zwroc true i ustaw sprawdzacz na false, czyli niewcisniety
		}

		break;
		case 87:  //góra W
		if(gracz.pressed === false){ 						 
			gracz.pressed = true;			
			gracz.animacja=3;				
			if (go_top()===true) gracz.pressed = false;	
		}

		break;
	
	case 40: //dół strzałka w dół
	if(gracz.pressed === false){
			gracz.pressed = true;
			gracz.animacja=0;
		if (go_down()===true) gracz.pressed = false;
		}		
		break;
	case 83: //dół S
		if(gracz.pressed === false){
			gracz.pressed = true;
			gracz.animacja=0;
		if (go_down()===true) gracz.pressed = false;
		}		
		break;
	case 37: //lewo strzałka w lewo
	if(gracz.pressed === false){
			gracz.pressed = true;
			gracz.animacja=1;
		if (go_left()===true) gracz.pressed = false;
		}
		break;
	case 65: //lewo A
		if(gracz.pressed === false){
			gracz.pressed = true;
			gracz.animacja=1;
		if (go_left()===true) gracz.pressed = false;
		}
		break;
	
	case 39: //prawo strzałka w prawo
	if(gracz.pressed === false){
			gracz.pressed = true;
			gracz.animacja=2;
		if (go_right()===true) gracz.pressed = false;
		}
		break;

	case 68://prawo D
		if(gracz.pressed === false){
			gracz.pressed = true;
			gracz.animacja=2;
		if (go_right()===true) gracz.pressed = false;
		}
		break;
	}

  }
  else {
  	switch (evt.keyCode) {
	case 38:  //góra strzalka w gore
		if(gracz.pressed === false){ 						 //jezeli sprawdzacz jest false czyli niewcisniety
		
			if (menu(--gracz.menu_opcja)) gracz.pressed = false;	//idz w gore, jezeli funkcja go top sie skonczyla zwroc true i ustaw sprawdzacz na false, czyli niewcisniety
		}

		break;
		case 87:  //góra W
		if(gracz.pressed === false){ 						 
				if (menu(--gracz.menu_opcja)) gracz.pressed = false;
		}

		break;
	
	case 40: //dół strzałka w dół
	if(gracz.pressed === false){
			if (menu(++gracz.menu_opcja)) gracz.pressed = false;
		}		
		break;
	case 83: //dół S
		if(gracz.pressed === false){
			if (menu(++gracz.menu_opcja)) gracz.pressed = false;
		}		
		break;
  	

  	
  	case 13:  //góra strzalka w gore
		if(gracz.pressed === false){ 						 //jezeli sprawdzacz jest false czyli niewcisniety
			gracz.pressed = true;
							//ustaw na wcisniety
			if (gracz.menu_opcja === 4) wyjdz();
			if (gracz.menu_opcja === 1) {alert('tu bedzie eq');gracz.pressed=false}
			if (gracz.menu_opcja === 2) {alert('tu beda staty gracza');gracz.pressed=false}
			if (gracz.menu_opcja === 3) {alert('tu beda staty serwera');gracz.pressed=false}
					}

		break;
  	}
  }
  
}


window.addEventListener('keydown',doKeyDown,true);




