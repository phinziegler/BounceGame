export default class InputHandler {
    constructor(player) {

        let keyStack = [];
        //KEYDOWN
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowRight":
                    player.moveRight();
                    keyStack.push("ArrowRight");
                    break;

                case "ArrowLeft":
                    player.moveLeft();
                    keyStack.push("ArrowLeft");
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
                        // player.stopX();
                    }
                    break;

                case "ArrowLeft":
                    if (player.acceleration.x <= 0) {
                        // player.stopX();
                    }
                    break;
                case "ArrowDown":
                    player.endFastFall();
                    break;
            }
        });





    }
}