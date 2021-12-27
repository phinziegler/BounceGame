import GameObject from "./gameObject.js";

export default class Wall extends GameObject {
    constructor(canvas, x, y, width, color) {
        super(canvas, x, y);
        this.color = color;
        this.width = width;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x - (this.width / 2), 0, this.width, this.gameHeight);
    }
}