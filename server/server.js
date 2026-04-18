// server/server.js
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

let players = {};

wss.on("connection", (ws) => {
    const id = Math.random().toString(36).slice(2);
    players[id] = { x: 100, y: 100 };

    ws.id = id;

    ws.on("message", (msg) => {
        const data = JSON.parse(msg);

        if (data.type === "input") {
            const p = players[id];
            p.x += data.dx;
            p.y += data.dy;
        }
    });

    ws.on("close", () => {
        delete players[id];
    });
});

// game loop
setInterval(() => {
    const state = JSON.stringify(players);

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(state);
        }
    });
}, 1000 / 30);

console.log("Server running on ws://localhost:8080");