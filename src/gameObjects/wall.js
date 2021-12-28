import Vector from "../tools/vector.js";
import GameObject from "./gameObject.js";

export default class Wall extends GameObject {
    constructor(canvas, x, y, mass, width, color) {
        super(canvas, x, y, mass);
        this.color = color;
        this.width = width;
        this.friction = .998;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x - (this.width / 2), 0, this.width, this.gameHeight);
    }

    update(deltaTime, objects) {

        const oldVelX = this.velocity.x;
        const oldVelY = this.velocity.y;
        
        this.deltaTime = deltaTime; // in seconds
        
        // Update Velocity
        this.velocity.x = this.velocity.x + (this.acceleration.x * deltaTime);  // v = at
        // this.velocity.y = this.velocity.y + (this.acceleration.y * deltaTime);  // v = at
        this.velocity.x = this.velocity.x * this.friction;
        
        // Update Position... dX = (v0 + v / 2) * t
        this.prevPos.x = this.position.x;
        this.prevPos.y = this.position.y;
        this.position.x = this.position.x + (((oldVelX + this.velocity.x) / 2) * deltaTime);
        this.position.y = this.position.y + (((oldVelY + this.velocity.y) / 2) * deltaTime);

        this.collide(objects);
    }

    distanceFrom(x, y) {
        let left = Math.abs(this.position.x - (this.width / 2) - x);
        let right = Math.abs(this.position.x + (this.width / 2) - x);
        return Math.min(left, right);
    }

    collide(objects) {
        this.collideRight();
        this.collideLeft();
        // this.collideTop();
        // this.collideGround();
        this.collideObject(objects);
    }

    collideRight() {
        if(this.position.x >= this.gameWidth) {
            this.position.x = this.gameWidth;
            this.velocity.x *= -1;
            // this.canJump = true;
        }
    }

    collideLeft() {
        if(this.position.x <= 0) {
            this.position.x = 0;
            this.velocity.x *= -1;
            // this.canJump = true;
        }
    }

    collideObject(objects) {
        objects.forEach(obj => {
            if(obj != this) {
                let dist = obj.distanceFrom(this.position.x, this.position.y);
                if(dist <= this.radius) {
                    if(this.velocity.x != 0) {
                        console.log(this.velocity.x != 0);
                        while(dist <= this.radius) {
                            let unit = this.velocity.unitVector();
                            this.position.x += -unit.x;
                            this.position.y += -unit.y;
                            dist = obj.distanceFrom(this.position.x, this.position.y);
                            console.log("here");
                        }
                    }

                    let oldx = this.velocity.x;
                    let oldy = this.velocity.y;

                    this.calculateImpulse(obj, obj.velocity.x, obj.velocity.y);
                    obj.calculateImpulse(this, oldx, oldy);
                }
            }
        });
    }

    collisionNormal(x, y) {
        let normal = new Vector(x - this.position.x, 0);
        return normal.unitVector();
    }
}