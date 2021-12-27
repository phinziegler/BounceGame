export default class Render {
    constructor() {}

    static drawObjects(objectList) {
        objectList.forEach(object => {
            object.draw();
        });
    }

}