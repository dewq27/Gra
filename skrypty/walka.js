/*

  var nick = "dewq";
  var hp = 100;
  var max = 100;
  var opcja = 0;
  var gracz = new Image();
  var boss = new Image();
  boss.src = "moja_grafika/boss.png";
  gracz.src = 'moja_grafika/chars.png';

  var gracz_czas = 30;
  var time = 0;


  var potwor_hp = 400;
  var potwor_max_hp = 400;
  var potwor_czas = 60;

  var potwor_atak = setInterval(function () {
    if (hp < 0) {
      hp = 0;

      clearInterval(potwor_atak);

      alert("Game over :(");
      return;
   }
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
    var dmg = Math.floor((Math.random()*10)+1);
    console.log("Potwor: " + dmg);
    hp -= dmg;
    draw_walka();
    if (time === 100 && opcja === 0 ) {
    ctx.fillStyle = "white";
    ctx.fillRect(520,349,time,5);
    ctx.font = "20pt Times New Roman";
    ctx.fillStyle = "white";
    ctx.fillText('Atak',5,360);
    ctx.fillStyle = "black";
    ctx.fillText('Magia',5,390);
    ctx.fillStyle = "black";
    ctx.fillText('Magia',5,390);

    }
    else if (time === 100 && opcja === 1) {
    ctx.fillStyle = "white";
    ctx.fillRect(520,349,time,5);
    ctx.font = "20pt Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText('Atak',5,360);
    ctx.fillStyle = "white";
    ctx.fillText('Magia',5,390);

    }

  },potwor_czas+2000);


  var draw_walka = function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,640,480);
  ctx.fillStyle = "#0075FF";
  ctx.fillRect(0,330,640,150);
  ctx.fillStyle = "black";
  ctx.font = "15pt Times New Roman";
  ctx.fillText(nick,400,350);
  ctx.fillStyle = "black";
  ctx.fillRect(516,338,107,18);
  ctx.fillStyle = "red";
  ctx.fillRect(520,340,hp*100/max,10);
  ctx.font = "12pt Times New Roman";
  ctx.fillStyle = "white";
  ctx.fillText(hp + "/" + max,540,350);
//     ctx.fillStyle = "black";
//     ctx.fillRect(516,350,106,14);
      ctx.drawImage(boss,450,50);
//      ctx.drawImage(gracz.img, gracz.animacja_czas * 32, gracz.animacja * 32, 32, 32, 320, 236, 32, 32);
      ctx.drawImage(gracz, 32, 2*32, 32, 32,0,150,64,64,0);
    ctx.fillStyle = "black";
   ctx.fillRect(448,38,185,14);
  ctx.fillStyle = "red";
   ctx.fillRect(450,40,potwor_hp*180/potwor_max_hp,10);
//ctx.drawImage(gracz.img, gracz.animacja_czas*32, gracz.animacja*32,32,32,320,236,32,32);

}

var sterowanie = function (evt) {
//   console.log(opcja);
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");


    ctx.font = "20pt Times New Roman";

    switch (evt.keyCode) {
    case 13: {

      if (opcja === 0) {
// 	  alert('Atakuj');
	  var dmg = Math.floor((Math.random()*100)+1);
	  console.log(dmg);
	  potwor_hp -= dmg;
          if (potwor_hp <= 0) {
              socket.emit ('win' );
          }

      }

      if (opcja === 1) {
	alert("magia");
      }
      time = 0;

      window.removeEventListener("keydown",sterowanie,true);
      walka()
      break;
    }
    // dol
    case 83: {
      opcja += 1;
      if (opcja > 1) opcja = 1;

      break;
    }
    // gora
    case 87: {
      opcja -= 1;
      if (opcja < 0) opcja = 0;
      break;

    }

  }

  if (opcja === 0) {
    draw_walka();
    ctx.fillStyle = "white";
    ctx.fillRect(520,349,time,5);
    ctx.font = "20pt Times New Roman";
    ctx.fillStyle = "white";
    ctx.fillText('Atak',5,360);
    ctx.fillStyle = "black";
    ctx.fillText('Magia',5,390);

  }
  else if (opcja === 1){
    draw_walka();
    ctx.fillStyle = "white";
    ctx.fillRect(520,349,time,5);
    ctx.font = "20pt Times New Roman";
    ctx.fillStyle = "black";
    ctx.fillText('Atak',5,360);
    ctx.fillStyle = "white";
    ctx.fillText('Magia',5,390);
  }
}

var walka = function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

   var time_check = function () {
     if (time < 100 ) {
       var add = setInterval (function () {

	 if (time === 100 ) {
	   clearInterval (add);
// 	   alert("Twoja kolej!!");
	   window.addEventListener("keydown",sterowanie,true);
	    ctx.font = "20pt Times New Roman";
	    ctx.fillStyle = "white";
	    ctx.fillText('Atak',5,360);
	    ctx.fillStyle = "black";
	    ctx.fillText('Magia',5,390);
	}
	 else {
	 if (hp === 0) 	   clearInterval (add);
	  time += 1;
// 	  console.log(time);
	  draw_walka();

	  ctx.fillStyle = "white";
	  ctx.fillRect(520,349,time,5);
	}
       },gracz_czas);
     }
    }
    draw_walka();
    time_check();

}

      walka();
*/
