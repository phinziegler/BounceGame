import Vector from "../tools/vector.js";

// Abstract Version of a Game Object
export default class GameObject {
    constructor(canvas, engine, x, y, mass, name) {
        this.canvas = canvas;
        this.gameWidth = canvas.width;
        this.gameHeight = canvas.height;
        this.ctx = canvas.getContext("2d");
        this.position = new Vector(x, y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.mass = mass;
        this.name = name;
        this.engine = engine;
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

    // COLLIDE OBJECTS
    collideObject(objects) {
        objects.forEach(obj => {
            if (obj != this) {
                let dist = obj.distanceFrom(this.position.x, this.position.y);
                if (dist < this.distanceParameter()) {
                    let faster = this;
                    let slower = obj;
                    if (this.velocity.magnitude() < obj.velocity.magnitude()) {
                        faster = obj;
                        slower = this;
                    }
                    faster.separate(dist, slower);  // move the faster object out of the slower object
                    this.doImpulse(obj);
                }
            }
        });
    }
    
    /* SEPARATE --- prevent objects from intersecting before executing an impulse
    currently has no way of handling a situation where moving along the normal of
    collision fails or is unoptimal */
    separate(dist, obj) {
        let normal = obj.surfaceNormalTo(this);
        // let dist = obj.distanceFrom(this.position.x, this.position.y);
        while (dist < this.distanceParameter()) {
            
            this.position.x += normal.x;
            this.position.y += normal.y;
            
            dist = obj.distanceFrom(this.position.x, this.position.y);
        }
    }
    
    // DO IMPULSE --- how do the objects react to a collision?
    doImpulse(obj) {
        let v1 = this.velocity;
        let v2 = obj.velocity;
        let m1 = this.mass;
        let m2 = obj.mass;

        // 1 find unit normal and unit tangent vectors
        let norm = obj.surfaceNormalTo(this);
        let tan = new Vector(-norm.y, norm.x);

        // 2 find projections of velocity onto tangent and normal
        let v1n = norm.dotProduct(v1);
        let v2n = norm.dotProduct(v2);

        let v1t = tan.dotProduct(v1);
        let v2t = tan.dotProduct(v2);

        // 3 Remember that v1t' = v1t ... 

        // 4 Find new Normal velocities
        let v1nf = ((v1n * (m1 - m2)) + (2 * m2 * v2n)) / (m1 + m2);
        let v2nf = ((v2n * (m2 - m1)) + (2 * m1 * v1n)) / (m1 + m2);

        // 5 Convert scalars into vectors
        let vectorV1nf = norm.multiply(v1nf);
        let vectorV2nf = norm.multiply(v2nf);

        let vectorV1tf = tan.multiply(v1t);     // remember step 3
        let vectorV2tf = tan.multiply(v2t);     // remember step 3

        let v1f = vectorV1nf.add(vectorV1tf);
        let v2f = vectorV2nf.add(vectorV2tf);

        this.velocity = v1f;
        obj.velocity = v2f;
    }
    
    positionRelativeTo(obj) {
        throw new Error("positionRelativeTo() unimplemented");
    }
    
    // shortest distance from this object to an x,y position.
    distanceFrom(x, y) {
        throw new Error("distanceFrom() unimplemented");
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
        return uNormal;
    }


}