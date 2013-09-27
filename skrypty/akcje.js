/*globals $, console, io, resize, socket, window, host*/

$(document).ready(function () {
    'use strict';
    var canvas, ctx, gracz, bloki, draw_player, draw, init_map, menu, sciemnij, rozjasnij, wyjdz, login,
        go_top, go_down, go_left, go_right;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    gracz = {
        name: "",
        login: false,
        img: new Image(),
        map: new Image(),
        poruszanie: false,
        blok: [],
        gracze: [],
	walka: false,
    };
    bloki = function () {
        var x = [
            [12, 21], [13, 21], [14, 21], [14, 20], [15, 20], [16, 20], [17, 20], [18, 21], [19, 21],
            [20, 21], [21, 20], [22, 19], [23, 18], [24, 18], [25, 18], [26, 18], [27, 19], [28, 19],
            [29, 19], [30, 20], [31, 20], [32, 20], [33, 20], [34, 21], [35, 20], [36, 19], [37, 19],
            [39, 19], [40, 20], [41, 19], [42, 18], [43, 18], [44, 18], [38, 19], [45, 17], [46, 17],
            [47, 17], [48, 17], [49, 18], [50, 18], [51, 18], [52, 19], [53, 19], [54, 19], [55, 19],
            [56, 19], [57, 19], [58, 20], [59, 21], [59, 22], [60, 23], [60, 24], [60, 25], [60, 26],
            [61, 27], [61, 27], [61, 28], [61, 29], [61, 30], [61, 31], [61, 32], [60, 33], [60, 34],
            [59, 35], [58, 35], [59, 36], [59, 37], [59, 38], [59, 39], [58, 40], [58, 41], [57, 42],
            [56, 43], [55, 44], [54, 45], [53, 46], [52, 47], [51, 47], [50, 47], [45, 48], [46, 48],
            [47, 48], [48, 48], [49, 48], [44, 49], [43, 50], [42, 51], [41, 52], [40, 53], [39, 53],
            [38, 54], [37, 55], [36, 56], [35, 56], [34, 57], [33, 58], [32, 59], [31, 59], [30, 59],
            [25, 60], [26, 60], [27, 60], [28, 60], [29, 60], [24, 59], [23, 59], [22, 59], [21, 58],
            [20, 57], [20, 54], [20, 55], [20, 56], [21, 53], [22, 52], [23, 51], [24, 50], [25, 49],
            [26, 45], [26, 46], [26, 47], [25, 44], [25, 43], [24, 42], [23, 42], [20, 41], [21, 41],
            [22, 41], [19, 40], [18, 39], [16, 39], [17, 39], [15, 38], [14, 37], [13, 36], [12, 35],
            [11, 34], [10, 33], [9, 30], [9, 31], [9, 32], [10, 29], [11, 28], [10, 24], [10, 25],
            [10, 26], [10, 27], [11, 23], [11, 22], [26, 48]
        ], i;
        for (i = 0; i < x.length; i += 1) {
            gracz.blok[x[i][0]][x[i][1]] = false;
        }
    };
    draw_player = function () {
        var i, x, y;
        for (i = 0; i < gracz.gracze.length; i += 1) {
            if (gracz.gracze[i]) {
                x = gracz.gracze[i].x - gracz.pos_x;
                y = gracz.gracze[i].y - gracz.pos_y;
                ctx.drawImage(gracz.img, 0, 0, 32, 32, x * 2 + 32 * 10, y * 2 + 32 * 7 + 10, 32, 32);
                ctx.fillText('x:' + gracz.gracze[i].x + ' y' + gracz.gracze[i].y, 10, 60 + i * 20);
            }
        }
    };
    draw = function () {
	if (gracz.walka === true) {
	 boss();
	 gracz.walka = false;
	window.removeEventListener('keydown', doKeyDown, true);
	} else {

	  ctx.drawImage(gracz.map, Math.abs(gracz.pos_x) - 24, gracz.pos_y - 16, 640, 480, 0, 0, 2 * 640, 2 * 480);
	  ctx.drawImage(gracz.img, gracz.animacja_czas * 32, gracz.animacja * 32, 32, 32, 320, 236, 32, 32);
	  draw_player();
	  ctx.font = "20pt Times New Roman";
	  ctx.fillStyle = "white";
	  ctx.fillText('x:' + parseInt(gracz.pos_x / 32, 10) + ' y' + parseInt(gracz.pos_y / 32, 10), 10, 30);
	}
    };

 var boss = function () {
  $("#czat").hide();
  
  var nick = gracz.name,
      hp = 100,
      max = 100,
      opcja = 0,
      boss = new Image(),
      gracz_czas = 30, 
      time = 0,
      potwor_hp = 400,
      potwor_max_hp = 400,
      potwor_czas = 60,
      end = false;
  
      
      boss.src = "moja_grafika/boss.png";
//  gracz.img.src='moja_grafika/chars.png';
  
  
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
    
  },potwor_czas+5000);
  
  
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
      ctx.fillStyle = "black";
      ctx.fillRect(448,38,185,14);
      ctx.fillStyle = "red";
      ctx.fillRect(450,40,potwor_hp*180/potwor_max_hp,10);
//ctx.drawImage(gracz.img, gracz.animacja_czas*32, gracz.animacja*32,32,32,320,236,32,32);
  
  }

  var sterowanie_walka = function (evt) {
//   console.log(opcja);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d"); 

  
    ctx.font = "20pt Times New Roman";
  
    switch (evt.keyCode) {
    case 13: {
      
      if (opcja === 0) {
// 	  alert('Atakuj');
	  var dmg = Math.floor((Math.random()*100)+50); 
	  console.log(dmg);
	  potwor_hp -= dmg;
	  if (potwor_hp <= 0) {
	    
	    window.removeEventListener("keydown", sterowanie_walka, true);
	    
	    
	  }
      }
      
      if (opcja === 1) {
	alert("magia");
      }
      time = 0;
	  
      window.removeEventListener("keydown", sterowanie_walka, true);
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
	    window.addEventListener("keydown", sterowanie_walka, true);
	    ctx.font = "20pt Times New Roman";
	    ctx.fillStyle = "white";
	    ctx.fillText('Atak',5,360);
	    ctx.fillStyle = "black";
	    ctx.fillText('Magia',5,390);
	} else {
	  if (hp === 0) clearInterval (add);
	  time += 1; 
// 	  console.log(time);
	  draw_walka();

	  ctx.fillStyle = "white";
	  ctx.fillRect(520,349,time,5);
	}
       }, gracz_czas);
     }
    }
   
 time_check();

}
walka()

};




    init_map = function () {
    //var boss = new Image () ;
    //boss.src = "moja_grafika/boss_small.png";



        /*
         *
         * Inicjalizacja tablicy z przeszkodami
         *
         */
        var i, j;
        for (i = 0; i < 100; i += 1) {
            gracz.blok[i] = [];
        }
        for (i = 0; i < 100; i += 1) {
            for (j = 0; j < 100; j += 1) {
                gracz.blok[i][j] = true;
            }
        }
        bloki();


        ctx.font = "20pt Times New Roman";
        ctx.fillStyle = "green";
        ctx.fillText('Laduje mape', 260, 236);
        gracz.img.src = 'moja_grafika/chars.png';
        gracz.map.src = 'moja_grafika/mapa.png';
        gracz.map.onload = function () {
            $("#info").delay(1000).toggle(2000).delay(6000).toggle(2000);
            socket.emit('gracz', {nick: gracz.name});
            socket.on('setPosition', function (data) {
                gracz.pos_x = data.x;
                gracz.pos_y = data.y;
                gracz.animacja = 0;
                gracz.animacja_czas = 1;
                gracz.poruszanie = true;
                gracz.pressed = false;
                gracz.szybkosc = 25;
                $("#czat").show();
                draw();
            });
            gracz.img.onload = function () {
                draw();
                $("#czat").show();
            };
        };

    };
    /*
    *
    *
    * Login
    *
    */

    login = function () {


        // Szybciej sie wgrywa            da
        gracz.img.src = 'moja_grafika/chars.png';
        gracz.map.src = 'moja_grafika/mapa.png';
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 640, 480);
        ctx.font = "20pt Times New Roman";
        ctx.fillText('Witaj', 10, 30);
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
            gracz.login = true;
            init_map();
        });


	socket.on('wyszedl', function(data){
	  for(var i = 0 ;i< gracz.gracze.length;i++) {
	    if (data === gracz.gracze[i].nick) {
	    	gracz.gracze.splice(i,1);
	    }
	}

	} )

        socket.on('rysuj', function (data) {
            if (gracz.login !== false && data.nick !== gracz.nick) {
//         alert("aaa");
                gracz.gracze[gracz.gracze.length] = {
                    nick: data.nick,
                    x: data.x,
                    y: data.y
                };
                draw();
            }
        });
        socket.on('yx', function (data) {
            var i, przesun, krok, idz, right, left, top, down;
            if (gracz.login !== false) {
                right = function () {
                    krok += 1;
                    przesun.x += 1;
                    if (krok > 31) {
                        clearInterval(idz);
                    }
                    draw();
                };
                left = function () {
                    krok += 1;
                    przesun.x -= 1;
                    if (krok > 31) {
                        clearInterval(idz);
                    }
                    draw();
                };
                top =  function () {
                    krok += 1;
                    przesun.y -= 1;
                    if (krok > 31) {
                        clearInterval(idz);
                    }
                    draw();
                };
                down = function () {
                    krok += 1;
                    przesun.y += 1;
                    if (krok > 31) {
                        clearInterval(idz);
                    }
                    draw();
                };
                for (i = 0; i < gracz.gracze.length; i += 1) {
                    if (gracz.gracze[i] && gracz.gracze[i].nick === data.gracz) {
                        if (data.dir === "right") {
                            przesun = gracz.gracze[i];
                            przesun.dir = "right";
                            krok = 0;
                            idz = setInterval(right, 25);
                            draw();
                        } else if (data.dir === "left") {
                            //	    gracz.gracze[i].x -= 32;
                            przesun = gracz.gracze[i];
                            krok = 0;
                            idz = setInterval(left, 25);
                            draw();
                        } else if (data.dir === "top") {
//	    gracz.gracze[i].y -= 32;
                            przesun = gracz.gracze[i];
                            krok = 0;
                            idz = setInterval(top, 25);

                            draw();
                        } else if (data.dir === "down") {
//	    gracz.gracze[i].y += 32;
                            przesun = gracz.gracze[i];
                            krok = 0;
                            idz = setInterval(down, 25);

                            draw();
                        }
                    }
                }
            }
        });
    };
    /*

    Odkomentowac!!!!!


     */

    login();
    go_down = function () {
        if (gracz.blok[parseInt(gracz.pos_x / 32, 10)][parseInt(gracz.pos_y / 32, 10) + 1] === true) {
            var pom, c, inny_gracz = false, i, idz;
            for (pom = 0; pom < gracz.gracze.length; pom += 1) {
//       console.log (gracz.pos_y/32+1 + "   "+ gracz.gracze[pom].y/32);
                if (parseInt(gracz.pos_y / 32, 10) + 1 === parseInt(gracz.gracze[pom].y / 32, 10) && parseInt(gracz.pos_x / 32, 10) === parseInt(gracz.gracze[pom].x / 32, 10)) {
                    inny_gracz = true;
                }
            }
            if (inny_gracz !== true) {
                i = 0;
                socket.emit('xy', { gracz: gracz.name, x: parseInt(gracz.pos_x / 32, 10), y: parseInt((gracz.pos_y + 32) / 32, 10), dir: 'down'});
                idz = function () {
                    gracz.pos_y += 1;
                    if (i % 11 === 0) {
                        gracz.animacja_czas = parseInt(i / 10, 10);
                    }
                    i += 1;
                    if (i > 31) {
                        clearInterval(c);
                        gracz.pressed = false;
                        gracz.animacja_czas = 1;

                        //socket.emit('xy', { gracz: gracz.name,x: parseInt(gracz.pos_x/32), y: gracz.pos_y/32 });
                    }
                    draw();
                };
                c = setInterval(idz, gracz.szybkosc);
            } else {
                gracz.pressed = false;
            }
        } else {
            gracz.pressed = false;
        }

    };

    go_top = function () {
        if (gracz.blok[parseInt(gracz.pos_x / 32, 10)][parseInt(gracz.pos_y / 32, 10) - 1] === true) {
            var pom, c, inny_gracz = false, i, idz;
            for (pom = 0; pom < gracz.gracze.length; pom += 1) {
//	 console.log (gracz.pos_y/32+1 + "   "+ gracz.gracze[pom].y/32);
                if (gracz.pos_y / 32 - 1 === gracz.gracze[pom].y / 32 && parseInt(gracz.pos_x / 32, 10) === parseInt(gracz.gracze[pom].x / 32, 10)) {
                    inny_gracz = true;
                }
            }
            if (inny_gracz !== true) {
	      
		if (parseInt(gracz.pos_x / 32, 10) === 15 && parseInt(gracz.pos_y / 32, 10)+1 === 23) {
		    gracz.walka = true;

		    $("#czat").hide();
		}
	      
	      
                i = 0;
                socket.emit('xy', { gracz: gracz.name, x: parseInt(gracz.pos_x / 32, 10), y: parseInt((gracz.pos_y - 32) / 32, 10), dir: 'top'});
                idz = function () {
                    gracz.pos_y -= 1;
                    if (i % 11 === 0) {
                        gracz.animacja_czas = parseInt(i / 10, 10);
                    }
                    i += 1;
                    if (i > 31) {
                        clearInterval(c);
                        gracz.pressed = false;
                        gracz.animacja_czas = 1;
//					socket.emit('xy', { gracz: gracz.name,x: parseInt(gracz.pos_x/32), y: gracz.pos_y/32 });
                    }
                    draw();
                };
                c = setInterval(idz, gracz.szybkosc);
            } else {
                gracz.pressed = false;
            }
        } else {
            gracz.pressed = false;
        }
    };

    go_right = function () {
        if (gracz.blok[parseInt(gracz.pos_x / 32, 10) + 1][parseInt(gracz.pos_y / 32, 10)] === true) {
            var pom, c, inny_gracz = false, i, idz;
            for (pom = 0; pom < gracz.gracze.length; pom += 1) {
                if (gracz.pos_y / 32 === gracz.gracze[pom].y / 32 && parseInt(gracz.pos_x / 32 + 1, 10) === parseInt(gracz.gracze[pom].x / 32, 10)) {
                    inny_gracz = true;
                }
            }
            if (inny_gracz !== true) {
                i = 0;
                socket.emit('xy', { gracz: gracz.name, x: parseInt((gracz.pos_x + 32) / 32, 10), y: parseInt(gracz.pos_y / 32, 10), dir: 'right'});
                idz = function () {
                    if (i % 11 === 0) {
                        gracz.animacja_czas = parseInt(i / 10, 10);
                    }
                    gracz.pos_x += 1;
                    i += 1;
                    if (i > 31) {
                        clearInterval(c);
                        gracz.pressed = false;
                        gracz.animacja_czas = 1;
//	socket.emit('xy', { gracz: gracz.name,x: parseInt(gracz.pos_x/32), y: gracz.pos_y/32 });
                    }
                    draw();
                };
                c = setInterval(idz, gracz.szybkosc);
            } else {
                gracz.pressed = false;
            }
        } else {
            gracz.pressed = false;
        }
    };

    go_left = function () {
        if (gracz.blok[parseInt(gracz.pos_x / 32, 10) - 1][parseInt(gracz.pos_y / 32, 10)] === true) {
            var pom, c, inny_gracz = false, i, idz;
            for (pom = 0; pom < gracz.gracze.length; pom += 1) {
//console.log (gracz.pos_y/32+1 + "   "+ gracz.gracze[pom].y/32);
                if (gracz.pos_y / 32 === gracz.gracze[pom].y / 32 && parseInt(gracz.pos_x / 32 - 1, 10) === parseInt(gracz.gracze[pom].x / 32, 10)) {
                    inny_gracz = true;
                }
            }
            if (inny_gracz !== true) {
                i = 0;
                socket.emit('xy', { gracz: gracz.name, x: parseInt((gracz.pos_x - 32) / 32, 10), y: parseInt(gracz.pos_y / 32, 10), dir: 'left'});
                idz = function () {
                    gracz.pos_x -= 1;
                    if (i % 11 === 0) {
                        gracz.animacja_czas = parseInt(i / 10, 10);
//	alert(parseInt(gracz.animacja_czas));
                    }
                    i += 1;
                    if (i > 31) {
                        clearInterval(c);
                        gracz.pressed = false;
                        gracz.animacja_czas = 1;
// socket.emit('xy', { gracz: gracz.name,x: parseInt(gracz.pos_x/32), y: gracz.pos_y/32 });
                    }
                    draw();
                };
                c = setInterval(idz, gracz.szybkosc);
            } else {
                gracz.pressed = false;
            }
        } else {
            gracz.pressed = false;
        }
    };


    function doKeyDown(evt) {
        switch (evt.keyCode) {
        case 13:
            $("#czat_input").focus();
            break;
        case 38:  //góra strzalka w gore
            if (gracz.pressed === false) {						 //jezeli sprawdzacz jest false czyli niewcisniety
                gracz.pressed = true;
                gracz.animacja = 3;							//ustaw na wcisniety
                if (go_top() === true) {
                    gracz.pressed = false;
                }	//idz w gore, jezeli funkcja go top sie skonczyla zwroc true i ustaw sprawdzacz na false, czyli niewcisniety
            }

            break;
        case 87:  //góra W
            if (gracz.pressed === false) {
                gracz.pressed = true;
                gracz.animacja = 3;
                if (go_top() === true) {
                    gracz.pressed = false;
                }
            }

            break;

        case 40: //dół strzałka w dół
            if (gracz.pressed === false) {
                gracz.pressed = true;
                gracz.animacja = 0;
                if (go_down() === true) {
                    gracz.pressed = false;
                }
            }
            break;
        case 83: //dół S
            if (gracz.pressed === false) {
                gracz.pressed = true;
                gracz.animacja = 0;
                if (go_down() === true) {
                    gracz.pressed = false;
                }
            }
            break;
        case 37: //lewo strzałka w lewo
            if (gracz.pressed === false) {
                gracz.pressed = true;
                gracz.animacja = 1;
                if (go_left() === true) {
                    gracz.pressed = false;
                }
            }
            break;
        case 65: //lewo A
            if (gracz.pressed === false) {
                gracz.pressed = true;
                gracz.animacja = 1;
                if (go_left() === true) {
                    gracz.pressed = false;
                }
            }
            break;

        case 39: //prawo strzałka w prawo
            if (gracz.pressed === false) {
                gracz.pressed = true;
                gracz.animacja = 2;
                if (go_right() === true) {
                    gracz.pressed = false;
                }
            }
            break;

        case 68://prawo D
            if (gracz.pressed === false) {
                gracz.pressed = true;
                gracz.animacja = 2;
                if (go_right() === true) {
                    gracz.pressed = false;
                }
            }
            break;
        }
    }


    window.addEventListener('keydown', doKeyDown, true);

             /*
             *
             *	Czat
             *
             *
             */
    function sendMsg(evt) {
        var date, hour, min, socket_msg, msg;
//		alert(evt.keyCode);
        switch (evt.keyCode) {
        case 13:
            msg = $("#czat_input").val();
            if (msg !== "") {
                date = new Date();
                hour = date.getHours();
                min = date.getMinutes();
                socket_msg = "<li>" + hour + ":" + min + " " + gracz.name + ": " + msg + "</li>";
                $("#czat_content li:first").prepend(socket_msg);
                $("#czat_input").val("");
                socket.emit('msg', { tresc: socket_msg });
                window.removeEventListener('keydown', sendMsg, true);
                window.addEventListener('keydown', doKeyDown, true);
                $("#czat_input").blur();
                break;
            } else {
                window.removeEventListener('keydown', sendMsg, false);
                window.addEventListener('keydown', doKeyDown, true);
                $("#czat_input").blur();
            }
            break;
        }
    }
    $("#czat").hide();
    $("#czat_input").focus(function () {
        console.log('focus');
        window.removeEventListener('keydown', doKeyDown, true);
        window.addEventListener('keydown', sendMsg, true);
    });
    $("#czat_input").blur(function () {
        console.log("blur");
    });
    socket.on('msg', function (data) {
        $("#czat_content li:first").prepend(data.tresc);
    });
    socket.on('new', function (data) {
        if (gracz.login !== false) {
            $("#czat_content li:first").prepend(data.tresc);
            draw();
        }
    });

    window.onbeforeunload = function () {
        if (gracz.login === true) {
            socket.emit('exit', {nick: gracz.nick, id: gracz.id});
        socket.disconnect();
        }
    };



    socket.on('forceDisconnect', function(){
        socket.disconnect();
    });

});


