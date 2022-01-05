import Background from "./background.js";

export default class Ground extends Background {
    constructor(canvas, yPos, lineHeight, lineColor, fillColor) {
        super(canvas);
        this.y = canvas.height - yPos;
        this.lineHeight = lineHeight;
        this.lineColor = lineColor;
        this.fillColor = fillColor
    }

    draw() {
        this.ctx.fillStyle = this.lineColor;
        this.ctx.fillRect(0, this.y, this.canvas.width, this.lineHeight);
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillRect(0, this.y + this.lineHeight, this.canvas.width, this.canvas.height);
    }
}