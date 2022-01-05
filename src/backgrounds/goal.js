import Background from "./background.js";

export default class Goal extends Background {
    constructor(canvas, xPos, direction, fillColor) {
        super(canvas);
        this.direction = direction;
        this.x = xPos;
        this.fillColor = fillColor
        this.fillStart;
        this.init();
    }

    init() {
        switch(this.direction) {
            case 1:
                this.fillStart = this.x;
                break;
            case -1:
                this.fillStart = this.x - this.canvas.width;
                break;
        }
    }

    draw() {
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillRect(this.fillStart, 0, this.canvas.width, this.canvas.height);
    }
}