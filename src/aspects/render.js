const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// ctx.fillStyle = "rgba(190,190,190,1)";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

export default class Render {
    constructor() {
    }
    static preRender() {
        ctx.fillStyle = "rgba(190,190,190,1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.font = "25px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("press any key to start", canvas.width / 2, canvas.height / 2);
    }
    static draw(objectList) {
        ctx.fillStyle = "rgba(190,190,190,1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
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

    static randomColor() {
        let hue = Math.random() * 360;
        let sat = 100;
        let light = 50 + (Math.random() * 20);
        let col = "#" + Render.hslToHex(hue, sat, light);
        console.log(col);
        return col;
    }
    static hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
        };
        const result = `${f(0)}${f(8)}${f(4)}`;
        return result;
    }

    static score(yDisp, min, max, score, width, height, borderWidth) {
        let ratio = score / (max);
        let radius = height / 2;
        let middle = canvas.width / 2;
        let leftStart = middle - (width / 2);
        let rightStart = middle + (width / 2);
        // let position = leftStart;
        let position = (ratio * width) + leftStart;

        ctx.fillStyle = "rgba(0,0,0,.7)";
        ctx.beginPath();
        ctx.arc(leftStart, yDisp, radius, Math.PI / 2, 3 * (Math.PI / 2));    // draw circle
        ctx.arc(rightStart, yDisp, radius, 3 * (Math.PI / 2), Math.PI / 2);
        ctx.closePath();
        ctx.fill();

        // ctx.fillStyle = "black";
        // const centerWidth = 4;
        // ctx.fillRect(position - (centerWidth / 2), yDisp - radius + borderWidth, centerWidth, height - (2 * borderWidth));

        ctx.fillStyle = "rgba(255, 100, 100, .8)";
        ctx.beginPath();
        ctx.arc(leftStart, yDisp, radius - (1 * borderWidth), Math.PI / 2, 3 * (Math.PI / 2));    // draw circle
        ctx.lineTo(position, yDisp - radius + borderWidth);
        ctx.lineTo(position, yDisp + radius - borderWidth);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "rgba(100,100,255, .8)";
        ctx.beginPath();
        ctx.arc(rightStart, yDisp, radius - (1 * borderWidth), 3 * (Math.PI / 2), Math.PI / 2);;    // draw circle
        ctx.lineTo(position, yDisp + radius - borderWidth);
        ctx.lineTo(position, yDisp - radius + borderWidth);
        ctx.closePath();
        ctx.fill();
        // ctx.arc(rightStart, yDisp, radius - (2 * borderWidth), 3 * (Math.PI / 2), Math.PI / 2);
        // ctx.closePath();
        // ctx.fill();

    }

}