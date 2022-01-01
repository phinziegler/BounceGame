const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(190,190,190,1)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

export default class Render {
    constructor() {
    }
    static drawObjects(objectList) {
        ctx.fillStyle = "rgba(190,190,190,1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        objectList.forEach(object => {
            object.draw();
        });
    }
    static drawBackground(objectList) {
        objectList.forEach(object => {
            object.draw();
        });
    }
    static fps(fps, size, color) {
        ctx.fillStyle = color;
        ctx.font = size + "px monospace";
        ctx.textBaseline = "hanging";
        let text = ctx.measureText(fps);
        ctx.fillText(fps, canvas.width - text.width - size, size / 2);
    }
    static pause() {
        ctx.fillStyle = "rgba(0,0,0,.35)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        Render.pauseSymbol();
    }

    static play() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo((canvas.width / 2) - (canvas.width / 10), (canvas.height / 2) - (canvas.width / 10));
        ctx.lineTo((canvas.width / 2) + (canvas.width / 10), (canvas.height / 2));
        ctx.lineTo((canvas.width / 2) - (canvas.width / 10), (canvas.height / 2) + (canvas.width / 10));
        ctx.closePath();
        ctx.fill();
    }

    static pauseSymbol() {
        let rectWidth = 20;
        let rectHeight = 100;
        let separation = 20;

        let halfWidth = rectWidth / 2;
        let halfHeight = rectHeight / 2;
        let wMiddle = canvas.width / 2;
        let hMiddle = canvas.height / 2;
        ctx.fillStyle = "white";

        ctx.fillRect(wMiddle - halfWidth - separation, hMiddle - halfHeight, rectWidth, rectHeight);
        ctx.fillRect(wMiddle - halfWidth + separation, hMiddle - halfHeight, rectWidth, rectHeight);

    }

}