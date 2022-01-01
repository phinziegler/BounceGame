import GameEngine from "./aspects/game.js";
import Render from "./aspects/render.js";

const canvas = document.getElementById("canvas");
const engine = new GameEngine(canvas);
let canStart = true;

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

