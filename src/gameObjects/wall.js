import Vector from "../tools/vector.js";
import GameObject from "./gameObject.js";

export default class Wall extends GameObject {
    constructor(canvas, engine, x, y, leftGoal, rightGoal, mass, width, color, name) {
        super(canvas, engine, x, y, mass, name);
        this.color = color;
        this.width = width;

        // CONSTANTS
        this.friction = .998;
        this.leftGoal = leftGoal;
        this.rightGoal = rightGoal;
    }

    // DRAW
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x - (this.width / 2), 0, this.width, this.gameHeight);
    }

    // FRAME UPDATE
    update(deltaTime, objects) {
        const oldVelX = this.velocity.x;
        const oldVelY = 0;

        // Points
        if (this.position.x + (this.width / 2) > this.rightGoal) {
            this.engine.goalRight(deltaTime);
        }
        if (this.position.x - (this.width / 2) < this.leftGoal) {
            this.engine.goalLeft(deltaTime);
        }

        this.velocity.y = 0;
        
        this.deltaTime = deltaTime; // in seconds
        
        // Update Velocity
        this.velocity.x = this.velocity.x + (this.acceleration.x * deltaTime);  // v = at
        this.velocity.x = this.velocity.x * this.friction;
        
        // Update Position... dX = (v0 + v / 2) * t
        this.position.x = this.position.x + (((oldVelX + this.velocity.x) / 2) * deltaTime);
        this.position.y = this.position.y + (((oldVelY + this.velocity.y) / 2) * deltaTime);


        this.collide(objects);
    }

    
    // COLLISION
    collide(objects) {
        this.collideRight();
        this.collideLeft();
        this.collideObject(objects);
    }
    collideRight() {
        if(this.position.x >= this.gameWidth - (this.width / 2)) {
            this.position.x = this.gameWidth - (this.width / 2);
            this.velocity.x *= -1;
        }
    }
    collideLeft() {
        if(this.position.x <= (this.width / 2)) {
            this.position.x = this.width / 2;
            this.velocity.x *= -1;
        }
    }
    
    ////////////////////////
    /// OBJECT COLLISION /// 
    ////////////////////////

    // parameter to determine if a distance is colliding with the wall
    distanceParameter() {
        return this.width/2;
    }

    // distance from an input point to self -- only uses horizontal distance
    distanceFrom(x, y) {
        let left = Math.abs(this.position.x - (this.width / 2) - x);
        let right = Math.abs(this.position.x + (this.width / 2) - x);
        return Math.min(left, right);
    }

    positionRelativeTo(obj) {
        let pos = new Vector(this.position.x, obj.position.y);
        return pos;
    }
}