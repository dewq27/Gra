
$(document).ready(function(){
	
	$("#header").css("top","-100px");
	
	
	$("#header ul li a").hover( function () {
		$(this).animate({
			top: "+=85",
			opacity : 1
		}, 500, function () {
			
			
		});
		
		
	}, function () {
		$(this).animate({
			top: "-=85",
			opacity : 0.5
		}, 200, function () {
			
			
		});
		
	});


	$('#loguj').click (function () {
    var nick = $("#login").val();
    var pass = $("#password").val();
    socket.emit('check_login',{"nick" : nick, "pass" : pass});
      
      
  });

});