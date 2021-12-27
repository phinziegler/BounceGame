export default class InputHandler {
    constructor(player) {
        
        //KEYDOWN
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    player.moveRight();
                    break;

                case "ArrowLeft":
                    player.moveLeft();
                    break;
                    
                case "ArrowUp":
                    player.jump();
                    break;

                case "ArrowDown":
                    player.fastFall();
                    break;
            }
        });

        //KEYUP
        document.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    if (player.acceleration.x >= 0) {
                        player.stopX();
                    }
                    break;

                case "ArrowLeft":
                    if (player.acceleration.x <= 0) {
                        player.stopX();
                    }
                    break;

                case "ArrowUp":
                    player.endJump();
                    break;

                case "ArrowDown":
                    player.endFastFall();
                    break;
            }
        });
    }
}