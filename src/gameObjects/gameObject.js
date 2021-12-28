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

    get mass() {
        return this._mass;
    }

    set mass(mass) {
        this._mass = mass;
    }

    get velocity() {
        return this._velocity;
    }

    set velocity(velocity) {
        this._velocity = velocity;
    }

    draw() {
        throw new Error("draw() unimplemented");
    }

    update() {
        throw new Error("update() unimplemented"); 
    }

    distanceFrom(x, y) {
        throw new Error("distanceFrom() unimplemented");
    }

    calculateImpulse(obj) {
        // v1_f = v1_i * [(m1-m2)/(m2+m1)] + v2_i * [(2*m2)/(m2+m1)]
        let newX = (this.velocity.x * ((this.mass - obj.mass) / (this.mass + obj.mass))) + (obj.velocity.x * ((2 * obj.mass)/(this.mass + obj.mass)));
        let newY = (this.velocity.y * ((this.mass - obj.mass) / (this.mass + obj.mass))) + (obj.velocity.y * ((2 * obj.mass)/(this.mass + obj.mass)));

        this.velocity.x = newX;
        this.velocity.y = newY;
    }
}