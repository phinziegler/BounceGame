import Background from "../gameObjects/background.js";
import Player from "../gameObjects/player.js";
import Wall from "../gameObjects/wall.js";
import InputHandler from "./input.js";
import Render from "./render.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const groundHeight = 20;

const background = new Background(canvas, groundHeight);
const P1 = new Player(canvas, 40, 40, 20, 1, groundHeight, "rgb(255, 100, 100)");                // canvas, x, y, radius, mass, color
const wall = new Wall(canvas, (canvas.width / 2), 0, 15, "rgb(100,100,100)");   // canvas, x, y, width, color
let objects = [
    wall,
    background,
    P1,
];

new InputHandler(P1);

// Game Loop
let lastTime = 0;
let deltaTime = 0;
function gameLoop(time) {
    // console.log(time / 1000);
    deltaTime = (time - lastTime) / 1000;
    lastTime = time;

    // call render
    Render.drawObjects(objects);

    // call position updates
    objects.forEach(obj => {
        if (typeof obj.update === "function") { 
            obj.update(deltaTime);
        }
    });
    
    requestAnimationFrame(gameLoop);
}


// Game Init
gameLoop(0);