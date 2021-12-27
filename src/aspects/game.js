

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