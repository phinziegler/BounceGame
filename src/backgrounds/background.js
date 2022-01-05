export default class Background {
    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
    }

    draw() {
        throw new Error("draw unimplemented");
    }
}