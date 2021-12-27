import Vector from "../tools/vector.js";
import GameObject from "./gameObject.js";

export default class Player extends GameObject{
    constructor(canvas, x, y, radius, mass, groundHeight, color) {
        super(canvas, x, y);
        this.color = color;
        this.radius = radius;
        
        this.velocity = new Vector(0,0);
        this.mass = mass;
        this.groundHeight = groundHeight;
        
        this.gravity = -9.81;
        this.accelConst = 10;
        this.friction = .985;
        
        this.acceleration = new Vector(0, this.gravity);

        this.canJump = false;
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

    update(deltaTime) {

        const oldVelX = this.velocity.x;
        const oldVelY = this.velocity.y;

        // Update Velocity
        this.velocity.x = this.velocity.x + (this.acceleration.x * deltaTime);  // v = at
        this.velocity.y = this.velocity.y + (this.acceleration.y * deltaTime);  // v = at
        this.velocity.x = this.velocity.x * this.friction;                      // Friction

        
        // Update Position... dX = (v0 + v / 2) * t
        this.position.x = this.position.x + (((oldVelX + this.velocity.x) / 2) * deltaTime);
        this.position.y = this.position.y + (((oldVelY + this.velocity.y) / 2) * deltaTime);
        
        this.collide();
    }

    stopX() {
        this.acceleration.x = 0;
    }
    
    endFastFall() {
        this.acceleration.y = this.gravity;
    }
    
    fastFall() {
        this.acceleration.y = this.gravity * 4;
    }
    moveLeft() {
        this.acceleration.x = -this.accelConst;
    }

    moveRight() {
        this.acceleration.x = this.accelConst;
    }

    jump() {
        if(this.canJump) {
            this.velocity.y = 90;
            this.canJump = false;
        }
    }


    collide() {
        this.collideRight();
        this.collideLeft();
        this.collideGround();
    }

    collideRight() {
        if(this.position.x >= this.gameWidth) {
            this.position.x = this.gameWidth;
            this.velocity.x *= -1;
            this.acceleration.x = 0;
            this.canJump = true;
        }
    }

    collideLeft() {
        if(this.position.x <= 0) {
            this.position.x = 0;
            this.velocity.x *= -1;
            this.acceleration.x = 0;
            this.canJump = true;
        }
    }

    collideGround() {
        if(this.position.y <= this.groundHeight + this.radius) {
            this.position.y = this.groundHeight + this.radius;
            this.velocity.y *= -.35;
            this.canJump = true;
        }
    }

}