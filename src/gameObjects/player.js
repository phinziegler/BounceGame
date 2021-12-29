import Vector from "../tools/vector.js";
import GameObject from "./gameObject.js";

export default class Player extends GameObject{
    constructor(canvas, x, y, mass, radius, groundHeight, color, name = "null") {
        super(canvas, x, y, mass);
        this.color = color;
        this.radius = radius;
        this.groundHeight = groundHeight;
        this.name = name;
        this.canJump = false;
        this.isJumping = false;

        // CONSTANTS
        this.gravity = -9.81;       // acceleration due to gravity
        this.jumpGravity = -6.50;   // value of gravity during a jump
        this.acceleration = new Vector(0, this.gravity);    // (not a constant)s
        this.accelConst = 5;       // rate of acceleration when moving left or right
        this.friction = .999;       // friction
        this.jumpForce = 85;        // force of jump
        this.jumpCutoff = 2;        // velocity value to decide an early jump is done
        this.fastFallFactor = 3;    // fast fall gravity = gravity * this value
    }

    // DRAW
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

    // FRAME UPDATE
    update(deltaTime, objects) {
        const oldVelX = this.velocity.x;
        const oldVelY = this.velocity.y;
        
        this.deltaTime = deltaTime; // in seconds
        
        // Update Velocity
        this.velocity.x = this.velocity.x + (this.acceleration.x * deltaTime);  // v = at
        this.velocity.y = this.velocity.y + (this.acceleration.y * deltaTime);  // v = at
        this.velocity.x = this.velocity.x * this.friction;                      // Friction

        // Handle Jumping Settings
        if(this.isJumping) {
            this.holdJump();
        }
        if(this.earlyJumpEnd) {         // Doing early jump end
            
            if(this.velocity.y <= this.jumpCutoff) {    // peak of jump reached
                this.earlyJumpEnd = false;
                if(this.fastFalling) {
                    this.fastFall();        // restore gravity to fast fall gravity
                }
                else {
                    this.acceleration.y = this.gravity;     // restore gravity to default
                }
            }
            else {
                this.acceleration.y = this.gravity * 1.5 *((this.velocity.y / (this.jumpForce * .8)) + 1);   // INCREASE GRAVITY FOR EARLY JUMP END
            }
        }
        
        // Update Position... dX = (v0 + v / 2) * t
        this.position.x = this.position.x + (((oldVelX + this.velocity.x) / 2) * deltaTime);
        this.position.y = this.position.y + (((oldVelY + this.velocity.y) / 2) * deltaTime);
        
        this.collide(objects);
    }
    
    // FAST FALL
    fastFall() {
        this.fastFalling = true;
        this.acceleration.y = this.gravity * this.fastFallFactor;
    }
    endFastFall() {
        this.fastFalling = false;
        if(!this.isJumping) {
            this.acceleration.y = this.gravity;
        }
    }

    // MOVEMENT
    moveLeft() {
        this.acceleration.x = -this.accelConst;
    }
    moveRight() {
        this.acceleration.x = this.accelConst;
    }
    stopX() {
        this.acceleration.x = 0;
    }

    // JUMPING
    jump() {
        if(this.canJump) {
            this.velocity.y = this.jumpForce;
            this.jumpTime = 0;
            this.canJump = false;
            this.isJumping = true;
        }
    }
    holdJump() {
        this.acceleration.y = this.jumpGravity;
        if(this.velocity.y <= this.jumpCutoff) {
            this.endJump();
            return;
        }
    }
    endJump() {
        console.log("endJump");
        if(this.velocity.y > this.jumpCutoff) {
            this.earlyJumpEnd = true;
        }
        if(this.fastFalling) {
            this.fastFall();
        }
        else {
            this.acceleration.y = this.gravity;
        }
    }

    // COLLISIONS
    collide(objects) {
        this.collideRight();
        this.collideLeft();
        this.collideTop();
        this.collideGround();
        this.collideObject(objects);
    }
    collideRight() {
        if(this.position.x + this.radius > this.gameWidth) {
            this.position.x = this.gameWidth - this.radius;
            this.velocity.x *= -1;
        }
    }
    collideLeft() {
        if(this.position.x - this.radius <= 0) {
            this.position.x = this.radius;
            this.velocity.x *= -1;
        }
    }
    collideTop() {
        if(this.position.y > this.gameHeight - this.radius) {
            this.position.y = this.gameHeight - this.radius;
            this.velocity.y *= -0.5;
        }
    }
    collideGround() {
        if(this.position.y <= this.groundHeight + this.radius) {
            this.position.y = this.groundHeight + this.radius;
            this.velocity.y *= -0.2;
            this.canJump = true;
        }
    }

    ////////////////////////
    /// OBJECT COLLISION /// 
    ////////////////////////

    // parameter used to determine if a distance indicates a collision
    distanceParameter() {
        return this.radius;
    }

    // distance of this object to a set of x,y coordinates
    distanceFrom(x, y) {
        let x0 = this.position.x;
        let y0 = this.position.y;

        let nX = Math.pow(x - x0, 2);
        let nY = Math.pow(y - y0, 2);

        let distance = Math.abs(Math.sqrt(nX + nY)) - this.radius;
        return distance;
    }

    // returns the vector from this.pos to an incoming pos
    collisionNormal(x, y) {
        let normal = new Vector(x - this.position.x, y - this.position.y);
        return normal.unitVector();   
    }

}