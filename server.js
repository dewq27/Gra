const http = require('http');
const fs = require('fs');
const io = require('socket.io');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const db = new PouchDB('test2');
const clientIdCounter = { value: 0 }; // To manage unique IDs for players
const gracz = [];

// Initialize the database
async function init() {
    try {
        // Create an index on the 'type' field to optimize queries
        await db.createIndex({
            index: {
                fields: ['type']
            }
        });

        const result = await db.find({
            selector: { type: 'user' }
        });

        if (result.docs.length === 0) {
            // Create a new user document
            const defaultUser = {
                _id: 'user_test',
                type: 'user',
                nick: 'test',
                pass: 'qwe',
                x: 20,
                y: 25
            };
            await db.put(defaultUser);
            console.log('Initialized database with default user "test"');
        } else {
            console.log('Users already exist in the database');
        }
    } catch (err) {
        console.error('Error during database initialization:', err);
    }
}

// Run the init function to check the database on startup
init();

const app = http.createServer((req, res) => {
    let path = req.url === '/' ? '/index.html' : req.url;
    path = '.' + path;

    fs.stat(path, (err, stats) => {
        if (err) {
            res.writeHead(404);
            res.end();
        } else {
            fs.createReadStream(path).pipe(res);
        }
    });
}).listen(3000, () => {
    console.log('Server running on port 3000');
});

const socket = io(app);

setInterval(() => {
    gracz.forEach(player => {
        console.log(player.nick);
    });
    console.log(""); // Just to separate logs
}, 1000);

socket.on('connection', (client) => {
    client.on('check_login', async (data) => {
        console.log(data.nick + " " + data.pass);
        try {
            const result = await db.find({
                selector: { nick: data.nick, type: 'user' }
            });

            if (result.docs.length === 0) {
                client.emit('errLogin', { msg: "Nie znaleziono użytkownika" });
            } else {
                const user = result.docs[0];
                if (data.pass !== user.pass) {
                    console.log(user.nick + ' hasło się nie zgadza!!');
                    client.emit('errLogin', { msg: "Podano złe hasło" });
                } else {
                    client.emit('zalogowano', { nick: user.nick });
                    console.log(user.nick + ' zalogowano!!');
                    client.data.gracz = user.nick;

                    const date = new Date();
                    const wiadomosc = {
                        tresc: `<li style="color:red;">${date.getHours()}:${date.getMinutes()} Gracz ${data.nick}: Dołączył do gry</li>`
                    };
                    client.broadcast.emit('new', wiadomosc);
                }
            }
        } catch (err) {
            client.emit('errLogin', { msg: "Błąd połączenia z bazą danych" });
            console.error(err);
        }
    });

    client.on('exit', (data) => {
        client.broadcast.emit('msg', { tresc: "Gracz wyszedł" });
    });

    client.on('gracz', async (data) => {
        try {
            const result = await db.find({
                selector: { nick: data.nick, type: 'user' }
            });

            if (result.docs.length === 0) {
                console.log("Nie ma takiego gracza");
            } else {
                const user = result.docs[0];
                const playerId = clientIdCounter.value++;
                const player = { id: playerId, nick: user.nick, x: user.x, y: user.y };
                gracz.push(player);

                console.log(`${data.nick} Dołączył do gry`);
                client.emit('msg', { tresc: `Witaj ${data.nick}!!!` });
                client.emit('setPosition', { id: playerId, x: player.x * 32, y: player.y * 32 });
                client.broadcast.emit('rysuj', { nick: player.nick, x: player.x * 32, y: player.y * 32 });

                gracz.forEach((p, i) => {
                    if (i !== playerId) {
                        client.emit('rysuj', { nick: p.nick, x: p.x * 32, y: p.y * 32 });
                    }
                });
            }
        } catch (err) {
            console.error("Błąd podczas dołączania gracza", err);
        }
    });

    client.on('msg', (data) => {
        const date = new Date();
        console.log(data.tresc);
        client.broadcast.emit('msg', data);
    });

    client.on('xy', async (data) => {
        client.broadcast.emit("yx", data);
        try {
            const result = await db.find({
                selector: { nick: data.gracz, type: 'user' }
            });

            if (result.docs.length > 0) {
                const user = result.docs[0];
                user.x = data.x;
                user.y = data.y;

                await db.put(user);
                console.log('Zaktualizowano');
            } else {
                console.log("Nie można było zaktualizować");
            }
        } catch (err) {
            console.error("Błąd podczas aktualizacji pozycji", err);
        }
    });

    client.on('disconnect', () => {
        console.log("force quit\n");
        const playerNick = client.data.gracz;

        if (playerNick) {
            console.log(`gracz ${playerNick} wyszedł z gry`);
            client.broadcast.emit('wyszedl', playerNick);

            const index = gracz.findIndex(p => p.nick === playerNick);
            if (index !== -1) {
                gracz.splice(index, 1);
                clientIdCounter.value--;
            }
        }
    });
});
