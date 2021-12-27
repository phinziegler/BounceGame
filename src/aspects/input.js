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
            }
        });
        //KEYUP
        document.addEventListener("keyup", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    if (player.acceleration.x >= 0) {
                        player.stop();
                    }
                    break;

                case "ArrowLeft":
                    if (player.acceleration.x <= 0) {
                        player.stop();
                    }
                    break;
            }
        });





    }
}