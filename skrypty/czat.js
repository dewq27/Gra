
$(document).ready(function(){
	$("#czat").hide();
/*	$("#czat").hover(function(){
		
//		$(this).css("height","300%");
	
	$(this).animate({
		top : "-=300", 
		height : "+=300"
		
	});
	$("#czat_input").animate({
		
		top: "+=300"
		
	});	

		}, function(){
			
	$(this).animate({
		top : "+=300", 
		height : "-=300"
		
	});
	$("#czat_input").animate({
		
		top: "-=300"
		
	});			
		});*/
		

	
		
	$("#czat_input").focus(function(){
		console.log('focus')
		window.removeEventListener('keydown',doKeyDown,true);
		window.addEventListener('keydown',sendMsg,true);
		
	});
	$("#czat_input").blur(function(){
		console.log("blur");
		
		
	});

	socket.on('msg',function(data){
		
   

		$("#czat_content li:first").prepend(data.tresc).animate({color: '#E4D8B8'},5000);
	});
	
	



	socket.on('new',function(data){
		
		$("#czat_content li:first").prepend(data.tresc).animate({color: '#E4D8B8'},5000);
		
		gracz.gracze[gracz.gracze.length] =  {
		  
		 nick : data.nick,
		 x : data.x, y : data.y
		  
		}
		
		
		draw();
	});
	
	function sendMsg(evt){
//		alert(evt.keyCode);
		switch (evt.keyCode) {
			case 13 : {
        var msg =  $("#czat_input").val();
                
        if (msg !== ""){  
        var date = new Date();
        var hour = date.getHours(), min = date.getMinutes();
        var socket_msg = "<li>" + hour + ":" + min + " " + gracz.name + ": " + msg + "</li>";
        $("#czat_content li:first").prepend(socket_msg)
        $("#czat_input").val("");
        socket.emit('msg', { tresc :socket_msg });
        window.removeEventListener('keydown',sendMsg,true);
        window.addEventListener('keydown',doKeyDown,true);
        $("#czat_input").blur();
      break;
     }
      else {
        window.removeEventListener('keydown',sendMsg,false);
        window.addEventListener('keydown',doKeyDown,true);
        $("#czat_input").blur();

      }
    }

				// var msg =  $("#czat_input").val();
				// if (msg !== ""){
				// var date = new Date();
				// var hour = date.getHours(), min = date.getMinutes();
				// 
				// var socket_msg = "<li>" + hour + ":" + min + " " + gracz.name + ": " + msg + "</li>";
				// 
				// $("#czat_content li:first").prepend(socket_msg).animate({color: '#E4FF33'},5000);
				// $("#czat_input").val("");
				// //socket.emit('xy', { gracz: gracz.name,x: parseInt(gracz.pos_x/32), y: gracz.pos_y/32 });
    // 
				// socket.emit('msg', { tresc :socket_msg });
				// window.removeEventListener('poruszanie',sendMsg,true);
				// window.addEventListener('poruszanie',doKeyDown,true);
				// $("#czat_input").blur();
				// }
				// else {
				// window.removeEventListener('poruszanie',sendMsg,true);
				// window.addEventListener('poruszanie',doKeyDown,true);
				// $("#czat_input").blur();
				// }
				// break;
		}
	}

  
});