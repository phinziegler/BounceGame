import GameEngine from "./aspects/game.js";
import Render from "./aspects/render.js";

const canvas = document.getElementById("canvas");
let engine = new GameEngine(canvas);
const reset = document.getElementById("reset");
let canStart = true;


reset.addEventListener("mousedown", () => {
    if(!canStart) {
        engine.init();
        // engine = new GameEngine(canvas);
        // engine.init();
    }
});
document.addEventListener("keydown", (e) => {
    if(canStart) {
        engine.init();
        canStart = false;
    }
});

function loop(time) {
    engine.step(time)
    requestAnimationFrame(loop);
}


Render.preRender();
loop();

