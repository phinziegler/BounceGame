import Vector from "../tools/vector.js";
import GameObject from "./gameObject.js";

export default class Player extends GameObject{
    constructor(canvas, x, y, mass, radius, groundHeight, color, name = "null") {
        super(canvas, x, y, mass);
        this.color = color;
        this.radius = radius;
        
        // this.mass = mass;
        this.groundHeight = groundHeight;
        
        this.jumpGravity = -650;   // m/s
        this.gravity = -981;
        this.accelConst = 1000;  // m/s^2
        this.friction = .980;   // flat
        this.jumpForce = 850;
        
        this.acceleration = new Vector(0, this.gravity);

        this.canJump = false;
        this.isJumping = false;
        this.name = name;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.gameHeight - this.position.y, this.radius, 0, Math.PI * 2);    // draw circle
        this.ctx.fill();

        if(!this.canJump) {
            this.ctx.fillStyle = "rgba(0,0,0,.2)";
            this.ctx.beginPath();
            this.ctx.arc(this.position.x, this.gameHeight - this.position.y, this.radius, 0, Math.PI * 2);    // draw circle
            this.ctx.fill();
        }
    }

    update(deltaTime, objects) {

        // console.log(this.acceleration.y);

        
        const oldVelX = this.velocity.x;
        const oldVelY = this.velocity.y;
        
        this.deltaTime = deltaTime; // in seconds
        
        // Update Velocity
        this.velocity.x = this.velocity.x + (this.acceleration.x * deltaTime);  // v = at
        this.velocity.y = this.velocity.y + (this.acceleration.y * deltaTime);  // v = at
        this.velocity.x = this.velocity.x * this.friction;                      // Friction
        
        if(this.isJumping) {
            this.holdJump(deltaTime);
        }
        if(this.earlyJumpEnd) {
            if(this.velocity.y <= 100) {
                // console.log("done increasing grav");
                if(this.fastFalling) {
                    // console.log("here");
                    this.fastFall();
                }
                else {
                    this.acceleration.y = this.gravity;
                }
                this.earlyJumpEnd = false;
            }
            else {
                this.acceleration.y = this.gravity * 1.5 *((this.velocity.y / (this.jumpForce - 200)) + 1);   // INCREASE GRAVITY FOR EARLY JUMP END
            }
        }
        
        // Update Position... dX = (v0 + v / 2) * t
        this.position.x = this.position.x + (((oldVelX + this.velocity.x) / 2) * deltaTime);
        this.position.y = this.position.y + (((oldVelY + this.velocity.y) / 2) * deltaTime);
        
        this.collide(objects);
    }

    stopX() {
        this.acceleration.x = 0;
    }
    
    endFastFall() {
        this.fastFalling = false;
        if(!this.isJumping) {
            this.acceleration.y = this.gravity;
        }
    }
    
    fastFall() {
        this.fastFalling = true;
        this.acceleration.y = this.gravity * 2;
    }
    moveLeft() {
        this.acceleration.x = -this.accelConst;
    }

    moveRight() {
        this.acceleration.x = this.accelConst;
    }

    jump() {
        if(this.canJump) {
            this.velocity.y = this.jumpForce;
            this.jumpTime = 0;
            this.canJump = false;
            this.isJumping = true;
        }
    }
    holdJump(deltaTime) {
        this.jumpTime += deltaTime;
        this.acceleration.y = this.jumpGravity;
        if(this.velocity.y <= 100) {
            this.endJump();
            return;
        }

    }
    endJump() {
        if(this.velocity.y > 100) {
            this.earlyJumpEnd = true;
        }
        if(this.fastFalling) {
            this.fastFall();
        }
        else {
            this.acceleration.y = this.gravity;
        }
    }

    collide(objects) {
        this.collideRight();
        this.collideLeft();
        this.collideTop();
        this.collideGround();
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

    collideTop() {
        if(this.position.y >= this.gameHeight - this.radius) {
            this.position.y = this.gameHeight - this.radius;
            this.velocity.y *= -0.5;
        }
    }

    collideGround() {
        if(this.position.y <= this.groundHeight + this.radius) {
            this.position.y = this.groundHeight + this.radius;
            this.velocity.y *= -0.2;
            this.canJump = true;
            // this.acceleration.y = gravity;
        }
    }

    collideObject(objects) {
        objects.forEach(obj => {
            if(obj != this) {
                let dist = obj.distanceFrom(this.position.x, this.position.y);
                if(dist <= this.radius) {
                    if(this.velocity.x != 0) {
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

    distanceFrom(x, y) {
        let x0 = this.position.x;
        let y0 = this.position.y;

        let nX = Math.pow(x - x0, 2);
        let nY = Math.pow(y - y0, 2);

        let distance = Math.abs(Math.sqrt(nX + nY)) - this.radius;
        // console.log(distance);
        return distance;
    }

}