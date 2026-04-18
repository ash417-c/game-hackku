// client/client.js
const ws = new WebSocket("ws://localhost:8080");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let players = {};

ws.onmessage = (event) => {
    players = JSON.parse(event.data);
};

window.addEventListener("keydown", (e) => {
    let dx = 0, dy = 0;

    if (e.key === "w") dy = -5;
    if (e.key === "s") dy = 5;
    if (e.key === "a") dx = -5;
    if (e.key === "d") dx = 5;

    ws.send(JSON.stringify({ type: "input", dx, dy }));
});

// render loop
function draw() {
    ctx.clearRect(0, 0, 500, 500);

    for (let id in players) {
        const p = players[id];
        ctx.fillRect(p.x, p.y, 20, 20);
    }

    requestAnimationFrame(draw);
}
draw();