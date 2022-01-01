const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(190,190,190,1)";
ctx.fillRect(0,0,canvas.width, canvas.height);

export default class Render {
    constructor() {
    }    
    static drawObjects(objectList) {
        ctx.fillStyle = "rgba(190,190,190,1)";
        ctx.fillRect(0,0,canvas.width, canvas.height);
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

}