import Background from "../gameObjects/background.js";
import Player from "../gameObjects/player.js";
import Wall from "../gameObjects/wall.js";
import InputHandler from "./input.js";
import Render from "./render.js";


// INIT
const canvas = document.getElementById("canvas");
const groundHeight = 20;
const background = new Background(canvas, groundHeight);

// Player 1
let player1 = new Player(
    canvas,                 // canvas
    40,                     // x
    40,                     // y
    1,                      // mass
    30,                     // radius
    groundHeight,           // groundHeight
    "rgb(255, 100, 100)",   // color
    "player1"               // name
);
// Player x
let playerx = new Player(
    canvas,                 // canvas
    40,                     // x
    600,                    // y
    .5,                      // mass
    20,                     // radius
    groundHeight,           // groundHeight
    "green",                // color
    "playerx"               // name
);

// Player 2
let player2 = new Player(
    canvas,                 // canvas
    1460,                     // x
    40,                     // y
    1,                      // mass
    30,                     // radius
    groundHeight,           // groundHeight
    "rgb(100, 100, 255)",   // color
    "player2"               // name
);

// Wall
let wall = new Wall(
    canvas,                 // canvas
    (canvas.width / 2),     // x
    0,                      // y
    10,                     // mass
    25,                     // width
    "rgb(100,100,100)",     // color
    "wall",
);    

// GAME OBJECTS
let objects = [
    wall,
    player1,
    player2,
    playerx,
];

// BACKGROUND OBJECTS
let backgrounds = [
    background,
];

// Player 1 Controller
new InputHandler(
    player1, 
    "w",            // up
    "a",            // left
    "s",            // down
    "d",            // right
);

// Player 2 Controller
new InputHandler(
    player2,        
    "ArrowUp",      // up
    "ArrowLeft",    // left
    "ArrowDown",    // down
    "ArrowRight",   // right
);

let fps = 0; // gameLoopCalls / seconds
let fpsDisp = document.getElementById("fps");
function updateFPS(fps) {
    fpsDisp.innerText = "FPS: " + fps.toFixed(1);
}

// GAME LOOP
let lastTime = 0;
let deltaTime = 0;
let counter = 0;
let tot = 0;
function gameLoop(time) {
    deltaTime = (time - lastTime) / 100;
    lastTime = time;

    tot += deltaTime;
    counter++;
    if(counter == 10) {
        updateFPS(10 / (tot / 10));
        counter = 0;
        tot = 0;
    }

    // Physics
    objects.forEach(obj => {
        if (typeof obj.update === "function") { 
            obj.update(deltaTime, objects);
        }
    });
    
    // Render
    Render.drawObjects(objects);
    Render.drawBackground(backgrounds);


    // repeat loop
    requestAnimationFrame(gameLoop);
}



// LOOP CALL
gameLoop(0);