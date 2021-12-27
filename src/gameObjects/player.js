import GameObject from "./gameObject.js";

export default class Player extends GameObject{
    constructor(canvas, x, y, radius, color) {
        super(canvas, x, y);
        this.color = color;
        this.radius = radius;
    }

    draw() {
        this.fillStyle("red");
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);    // draw circle
        this.ctx.fill();
    }
}