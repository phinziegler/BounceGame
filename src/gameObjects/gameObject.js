import Vector from "../tools/vector.js";

// Abstract Version of a Game Object
export default class GameObject {
    constructor(canvas, x, y) {
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.ctx = canvas.getContext("2d");
        this.position = new Vector(x, y);
    }

    draw() {
        throw new Error("draw() unimplemented");
    }
}