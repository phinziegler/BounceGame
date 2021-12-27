import Background from "../gameObjects/background.js";
import Player from "../gameObjects/player.js";
import Wall from "../gameObjects/wall.js";
import Render from "./render.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const P1 = new Player(canvas, 40, 80, 40, "rgb(255, 100, 100)");                // canvas, x, y, radius, color
const wall = new Wall(canvas, (canvas.width / 2), 0, 15, "rgb(100,100,100)");   // canvas, x, y, width, color
const background = new Background(canvas, 40);
let objects = [
    wall,
    background,
    P1,
];

// Game Loop
let lastTime = 0;
let deltaTime = 0;
function gameLoop(time) {
    deltaTime = time - lastTime;

    // call render
    Render.drawObjects(objects);

    // call position updates
    
    requestAnimationFrame(gameLoop);
}


// Game Init
gameLoop()