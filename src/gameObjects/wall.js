import GameObject from "./gameObject.js";

export default class Wall extends GameObject {
    constructor(canvas, x, y, mass, width, color) {
        super(canvas, x, y, mass);
        this.color = color;
        this.width = width;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x - (this.width / 2), 0, this.width, this.gameHeight);
    }

    update() {
        
    }

    distanceFrom(x, y) {
        let left = Math.abs(this.position.x - (this.width / 2) - x);
        let right = Math.abs(this.position.x + (this.width / 2) - x);
        return Math.min(left,right);
    }
}