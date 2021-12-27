import Vector from "../tools/vector";

// Abstract Version of a Game Object
export default class GameObject {
    constructor(x, y) {
        this.position = new Vector(x, y);
    }

    draw() {
        throw new Error("draw() unimplemented");
    }
}