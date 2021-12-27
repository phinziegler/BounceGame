const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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

}