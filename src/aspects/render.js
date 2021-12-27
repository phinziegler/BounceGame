const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export default class Render {
    constructor() {
    }


    
    static drawObjects(objectList) {
        // const ctx = document.getElementById("canvas").getContext("2d").clear();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        objectList.forEach(object => {
            object.draw();
        });
    }

}