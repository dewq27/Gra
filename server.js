var http = require('http'),
    fs = require('fs'),
    io = require('socket.io'),
    databaseUrl = "localhost/test",   // "username:password@example.com/mydb",
    collections = ["users", "reports"],
    db = require("mongojs").connect(databaseUrl, collections),
    id = 0,
    gracz = [];

var app = http.createServer(function (req, res) {
    var path =  req.url;
    if (req.url === '/') {
        path = '/index.html';
    }
    path = '.' + path;
    fs.stat(path, function (err, stats) {
        if (err) {
            res.writeHead(404);
            res.end();
        } else {
            fs.createReadStream(path).pipe(res);

        }
    });

}).listen(3000);
var socket = io.listen(app);

setInterval(function () {
    var i ;
    for (i = 0 ; i < gracz.length; i ++){
    console.log(gracz[i].nick);
    console.log("");
    }

},1000);


socket.on('connection', function (client) {
    client.on('check_login', function (data) {
        console.log(data.nick + " " + data.pass);
        db.users.find({nick: data.nick}, function (err, users) {
            if (err || !users) {
                client.emit('errLogin', {msg : "Brak połączenia z bazą danych, spróbuj ponownie później"});
            } else {
                (users.forEach)(function (gracz) {
                    if (data.pass !== gracz.pass) {
                        console.log(gracz.nick + '  hasło się nie zgadza!!');
                        client.emit('errLogin', {msg : "Podano złe hasło"});
                    } else {
                        client.emit('zalogowano', {nick : gracz.nick});
                        console.log(gracz.nick + '  zalogowano!!');
                        client.set("gracz", gracz.nick, function() {


			var date = new Date(),
                            hour = date.getHours(),
                            min = date.getMinutes(),
                            wiadomosc = {
                                tresc : "<li style{color:red;}>" + hour + ":" + min + " Gracz " + data.nick + ": " + "Dołączył do gry" + "</li>"
                            };
                        client.broadcast.emit('new', wiadomosc);
});
                    }
                });
            }
        });

    });

    client.on('exit', function (data) {
        client.broadcast.emit('msg', {tresc: "Gracz wyszedł"});

    });

    client.on('gracz', function (data) {
        var send_pos = function (graczdb) {
                client.emit('rysuj', {nick : graczdb.nick, x : graczdb.x * 32, y: graczdb.y * 32 });
            },
            set_gracz = function (graczdb) {
                gracz[id] = {
                    id : id,
                    nick : graczdb.nick,
                    x : graczdb.x,
                    y : graczdb.y
                };
            };
        db.users.find({nick: data.nick}, function (err, users) {
            if (err || !users) {
                console.log("Nie ma takiego gracza");
            } else {
                users.forEach(function (graczdb) {
                    gracz[id] = {
                        id : id,
                        nick : graczdb.nick,
                        x : graczdb.x,
                        y : graczdb.y
                    };
                    console.log(data.nick + " Dolaczyl do gry");
                    client.emit('msg', {tresc: 'Witaj ' + data.nick + "!!!"});
                    client.emit('setPosition', {id : id, x: gracz[id].x * 32, y: gracz[id].y * 32});


                    client.broadcast.emit('rysuj', {nick : gracz[id].nick, x : gracz[id].x * 32, y: gracz[id].y * 32 });
                    var i;
                    for (i = 0; i < id; i += 1) {
                        db.users.find({nick: gracz[i].nick}, function (err, users) {
                            if (err || !users) {
                                console.log("Nie ma takiego gracza");
                            } else {
                                users.forEach(function (graczdb) {
                                    client.emit('rysuj', {nick : graczdb.nick, x : graczdb.x * 32, y: graczdb.y * 32 });
                                });
                            }
                        });
                    }

                    id += 1;

                });
            }
        });
    });
    client.on('msg', function (data) {
        var date = new Date(),
            hour = date.getHours(),
            min = date.getMinutes();
        console.log(data.tresc);
        client.broadcast.emit('msg', data);
    });
    client.on('xy', function (data) {
        client.broadcast.emit("yx", data);
        db.users.update({nick : data.gracz}, {$set: {x : data.x, y: data.y}}, function (err, saved) {
            if (err || !saved) {
                console.log("Nie mozna bylo dodac");
            } else {
                console.log('Dodano');
            }
        });
    });

    client.on('disconnect', function () {
	console.log("force quit\n");
	client.get('gracz', function(err, data) {
	  console.log("gracz " + data + "wyszedl z gry");
	  
	client.broadcast.emit('wyszedl', data);
	for (var i= 0; i<gracz.length; i++) {
	  if (data === gracz[i].nick)
	    gracz.splice(i,1);
	    id = id -1;
	}

        })


    });
});

