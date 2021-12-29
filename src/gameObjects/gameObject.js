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

    // how to draw the object
    draw() {
        throw new Error("draw() unimplemented");
    }

    // on frame update
    update() {
        throw new Error("update() unimplemented"); 
    }
    
    // COLLIDE OBJECTS --- currently has no way of handling a situation where moving along the normal of collision fails or is unoptimal
    collideObject(objects) {
        objects.forEach(obj => {
            if(obj != this) {
                let dist = obj.distanceFrom(this.position.x, this.position.y);
                if(dist <= this.distanceParameter()) {
                    let normal = obj.collisionNormal(this.position.x, this.position.y);
                    while(dist <= this.distanceParameter()) {
                        this.position.x += normal.x;
                        this.position.y += normal.y;
                        dist = obj.distanceFrom(this.position.x, this.position.y);
                    }
                    this.performImpulse(obj, normal);
                }
            }
        });
    }

    // shortest distance from this object to an x,y position.
    distanceFrom(x, y) {
        throw new Error("distanceFrom() unimplemented");
    }

    // CALCULATE IMPULSE --- also sets the velocity accordingly
    calculateImpulse(obj, objVelx, objVely, normal) {

        let vel1 = this.velocity.magnitude();
        let vel2 = new Vector(objVelx, objVely).magnitude();

        // v1_f = v1_i * [(m1-m2)/(m2+m1)] + v2_i * [(2*m2)/(m2+m1)]
        let vf = (vel1 * ((this.mass - obj.mass) / (this.mass + obj.mass))) + (vel2 * ((2 * obj.mass)/(this.mass + obj.mass)));

        // this.velocity.x = newX;
        // this.velocity.y = newY;

        let myNorm = this.collisionNormal(obj.position.x, obj.position.y);
        console.log(myNorm);
        console.log("normal =" + normal);

        // FIND the angle b/w myNorm and normal, then direction is a new vector -angle from 
        myNorm.angleWith(normal);

        // let direction = myNorm.add(normal);
        // direction = direction.multiply(0.5);
        // console.log(direction);

        this.velocity.x = vf * direction.x;
        this.velocity.y = vf * direction.y;
    }

    // defines how an object handle collisions -- include collideObject in this.
    collide() {
        throw new Error("collide() unimplemented");
    }

    // if the distance parameter is >= to a distance, there is a collision.
    distanceParameter() {
        throw new Error("distanceParameter() unimplemented");
    }

    // called by collide objects when the impulse is ready to be done.
    performImpulse(obj, normal) {
        let oldx = this.velocity.x;
        let oldy = this.velocity.y;
        this.calculateImpulse(obj, obj.velocity.x, obj.velocity.y, normal);
        obj.calculateImpulse(this, oldx, oldy, normal);
    }

    // Returns the normal vector of a collision (points in the direction a colliding object should move to escape contact)
    collisionNormal(x, y) {
        throw new Error("collisionNormal() unimplemented");
    }
}