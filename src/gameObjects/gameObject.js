import Vector from "../tools/vector.js";

// Abstract Version of a Game Object
export default class GameObject {
    constructor(canvas, x, y, mass) {
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.ctx = canvas.getContext("2d");
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.mass = mass;
    }

    draw() {
        throw new Error("draw() unimplemented");
    }

    distanceFrom(x, y) {
        throw new Error("distanceFrom(x, y) unimplemented");

    }

    calculateImpulse(obj) {
        let myMomentum = new Vector(this.velocity.x * this.mass, this.velocity.y * this.mass);
        let itMomentum = new Vector(obj.velocity.x * obj.mass, obj.velocity.y * obj.mass);
        let myKinetic = new Vector((this.mass * 1/2) * Math.pow(this.velocity.x, 2), (this.mass * 1/2) * Math.pow(this.velocity.y, 2));
        let itKinetic = new Vector((obj.mass * 1/2) * Math.pow(obj.velocity.x, 2), (obj.mass * 1/2) * Math.pow(obj.velocity.y, 2));

        myMomentum.x * itMomentum.x;
        return;
    }
}