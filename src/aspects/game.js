import Player from "../gameObjects/player.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let objects = [];
objects.push(new Player);

// Game Loop
let lastTime = 0;
let deltaTime = 0;
function gameLoop(time) {
    deltaTime = time - lastTime;

    // call render 
    // call position updates
    
    Window.requestAnimationFrame(gameLoop);
}


// Game Init
gameLoop()