import GameObject from "./gameObject.js";

export default class Wall extends GameObject {
    constructor(canvas, x, y, width, color) {
        super(canvas, x, y);
        this.color = color;
    }

    draw() {

    }
}