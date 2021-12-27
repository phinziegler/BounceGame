import GameObject from "./gameObject.js";

export default class Background extends GameObject {
    constructor(canvas, height) {
        super(canvas, 0, canvas.height - height);
    }

    draw() {
        const lineWidth = 3;
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, this.position.y, this.gameWidth, lineWidth);
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(0, this.position.y + lineWidth, this.gameWidth, this.gameHeight);
    }
}