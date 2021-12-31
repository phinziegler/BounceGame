import Vector from "../tools/vector.js";

// Abstract Version of a Game Object
export default class GameObject {
    constructor(canvas, x, y, mass, name) {
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.ctx = canvas.getContext("2d");
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.mass = mass;
        this.name = name;
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

    get position() {
        return this._position;
    }

    set position(pos) {
        this._position = pos;
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
            if (obj != this) {
                let dist = obj.distanceFrom(this.position.x, this.position.y);
                if (dist <= this.distanceParameter()) {
                    let faster = this;  // the faster object is the one considered to be colliding into the slower object
                    let slower = obj;
                    if (this.velocity.magnitude() < obj.velocity.magnitude()) {
                        faster = obj;
                        slower = this;
                    }
                    faster.separate(dist, slower);
                    faster.performImpulse(slower);
                }
            }
        });
    }

    separate(dist, obj) {
        // console.log(obj.name)
        let normal = obj.surfaceNormalTo(this);
        // let dist = obj.distanceFrom(this.position.x, this.position.y);
        while (dist <= this.distanceParameter()) {
            
            this.position.x += normal.x;
            this.position.y += normal.y;

            dist = obj.distanceFrom(this.position.x, this.position.y);
        }
    }

    // called by collide objects when the impulse is ready to be done.
    performImpulse(obj) {   // obj is the object the faster (this) object is colliding with.
        // let oldx = this.velocity.x;
        // let oldy = this.velocity.y;
        this.doImpulse(obj, obj.velocity.x, obj.velocity.y);
        // obj.doImpulse(this, oldx, oldy, normal);
        // this.receiveImpulse;
    }

    positionRelativeTo(obj) {
        throw new Error("positionRelativeTo() unimplemented");
    }

    // shortest distance from this object to an x,y position.
    distanceFrom(x, y) {
        throw new Error("distanceFrom() unimplemented");
    }

    // CALCULATE IMPULSE --- also sets the velocity accordingly
    doImpulse(obj, objVelx, objVely) {

        let oldVel = this.velocity;

        /* conservation of kinetic energy and momentum
         * v1_f = v1_i * [(m1-m2)/(m2+m1)] + v2_i * [(2*m2)/(m2+m1)] */
        let vel1 = this.velocity.magnitude();
        let vel2 = new Vector(objVelx, objVely).magnitude();
        let vfmag1 = (vel1 * ((this.mass - obj.mass) / (this.mass + obj.mass))) + (vel2 * ((2 * obj.mass) / (this.mass + obj.mass)));
        let vfmag2 = (vel2 * ((obj.mass - this.mass) / (this.mass + obj.mass))) + (vel1 * ((2 * this.mass) / (this.mass + obj.mass)));



        let direction = this.bounceDirection(obj);

        // The final direction should be shifted based on how much energy is transfered into the recieving object... EG the ball hits the wall at an upward angle... The balls direction should be shifted slightly towards the wall, since no y energy is consumed by the wall.

        this.velocity.x = direction.x * Math.abs(vfmag1);
        this.velocity.y = direction.y * Math.abs(vfmag1); // this cannot be right bro
        // console.log(obj.name + " Y vel = :" + obj.velocity.y);
        // console.log(this.name + " direction = (" + direction.x.toFixed(2) + ", " + direction.y.toFixed(2) + ")\n" + "old vel y = " + oldy + ", new vel y = " + this.velocity.y);


        // SAME AS VFMAG2 --- 
        // let p1 = vel1 * this.mass;
        // let p1f = this.velocity.magnitude() * this.mass;
        // let p2 = vel2 * obj.mass;
        // let p2f = p1 + p2 - p1f;    // the momentum obj should have with its new velocity values.
        // let objVelMag = p2f / obj.mass;
        // --------------------

        // Which direction should the obj move? in the direction opposite its normal?
        // if(vel2 < vfmag2) { // gained speed
        let surfNorm = obj.surfaceNormalTo(this);
        console.log("here");
        let objDirection = surfNorm.reverse();      // dont reverse direction when the objects are moving at similar speeds??

        if (obj.name = "player2") {
            console.log
        }
        obj.velocity.x = objDirection.x * vfmag2;
        obj.velocity.y = objDirection.y * vfmag2;
        // }
        // else {
        //     // obj.velocity.x = direction.x * Math.abs(vfmag2);
        //     // obj.velocity.y = direction.y * Math.abs(vfmag2);
        // }

        // obj.takeImpulse(vfmag1, oldVelVec.unitVector());


    }

    bounceDirection(obj) {
        let normal = obj.surfaceNormalTo(this);
        let reversedVel = this.velocity.reverse();
        let proj = reversedVel.projectOnto(normal.unitVector());
        let angledProj = normal.unitVector().multiply(proj.magnitude());
        let v = this.velocity.add(angledProj);
        let vfinal = v.add(angledProj);
        let direction = vfinal.unitVector();
        return direction;
    }

    takeImpulse(magnitude, velVector) {
        throw new Error("takeImpulse() unimplemented");
    }

    // defines how an object handle collisions -- include collideObject in this.
    collide() {
        throw new Error("collide() unimplemented");
    }

    // if the distance parameter is >= to a distance, there is a collision.
    distanceParameter() {
        throw new Error("distanceParameter() unimplemented");
    }


    // Returns the normal vector of a collision (points in the direction a colliding object should move to escape contact)
    surfaceNormalTo(obj) {
        let pos = this.positionRelativeTo(obj);
        let normal = new Vector(obj.position.x - pos.x, obj.position.y - pos.y);
        let uNormal = normal.unitVector();

        if(obj.name == "player1") {
            console.log(uNormal);
        }

        return uNormal;
    }
}