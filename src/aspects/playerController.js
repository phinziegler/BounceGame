export default class PlayerController {
    constructor(player, up, left, down, right) {
        
        //KEYDOWN
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case right:
                    player.moveRight();
                    break;

                case left:
                    player.moveLeft();
                    break;
                    
                case up:
                    player.jump();
                    break;

                case down:
                    player.fastFall();
                    break;
            }
        });

        //KEYUP
        document.addEventListener("keyup", (e) => {
            switch (e.key) {
                case right:
                    if (player.acceleration.x >= 0) {
                        player.stopX();
                    }
                    break;

                case left:
                    if (player.acceleration.x <= 0) {
                        player.stopX();
                    }
                    break;

                case up:
                    player.endJump();
                    break;

                case down:
                    player.endFastFall();
                    break;
            }
        });
    }
}