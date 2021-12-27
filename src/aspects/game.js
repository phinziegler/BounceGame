import Player from "../gameObjects/player.js";
import Wall from "../gameObjects/wall.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const P1 = new Player(canvas, 40, 40, 40, "rgb(255, 100, 150)")
const wall = new Wall(canvas, 200, 200, 20, "black");
let objects = [P1, wall];

// Game Loop
let lastTime = 0;
let deltaTime = 0;
function gameLoop(time) {
    deltaTime = time - lastTime;

    // call render
    objects.forEach(object => object.draw());
    
    // call position updates
    
    requestAnimationFrame(gameLoop);
}


// Game Init
gameLoop()