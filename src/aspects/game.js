import Goal from "../backgrounds/goal.js";
import Ground from "../backgrounds/ground.js";
import Player from "../gameObjects/player.js";
import Wall from "../gameObjects/wall.js";
import PlayerController from "./playerController.js";
import Render from "./render.js";

export default class GameEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.objects = [];
        this.backgrounds = [];
        this.groundHeight = 20;
        this.toDraw = [];

        this.goalDist = 200;

        this.leftTime = 0;
        this.rightTime = 0;

        this.score = 1;
        this.leftWin = 0;
        this.rightWin = 2;

        // Loop Variables
        this.lastTime = 0;
        this.counter = 0;
        this.tot = 0;
        this.fps = 0;
        this.frameCount = 20;
        this.paused = false;
        this.started = false;
    }

    getObjects() {
        return this.objects;
    }

    // INITIALIZE GAME
    init() {
        this.started = true;
        const canvas = this.canvas;
        let ground = new Ground(this.canvas, this.groundHeight, 3, "black", "grey");
        let goalLeft = new Goal(this.canvas, this.goalDist, -1, "rgba(255,100,100,.25)");
        let goalRight = new Goal(this.canvas, canvas.width - this.goalDist, 1, "rgba(100,100,255,.25)");

        // Detect Spacebar press
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case " ":
                    this.togglePause();
                    break;
                case "b":
                    this.addBall();
                    break;
            }
        });

        // Detect Click
        canvas.addEventListener("click", () => {
            this.togglePause();
        });

        // Player 1
        let player1 = new Player(
            this.canvas,            // canvas
            this,                   // engine
            40,                     // x
            40,                     // y
            1,                      // mass
            30,                     // radius
            this.groundHeight,           // groundHeight
            "rgb(255, 100, 100)",   // color
            "player1"               // name
        );

        // Player 2
        let player2 = new Player(
            this.canvas,            // canvas
            this,                   // engine
            1460,                   // x
            40,                     // y
            1,                      // mass
            30,                     // radius
            this.groundHeight,           // groundHeight
            "rgb(100, 100, 255)",   // color
            "player2"               // name
        );

        // Wall
        let wall = new Wall(
            this.canvas,            // canvas
            this,                   // engine
            (canvas.width / 2),     // x
            0,                      // y
            this.goalDist,
            canvas.width - this.goalDist,
            10,                     // mass
            25,                     // width
            "rgb(100,100,100)",     // color
            "wall",
        );

        // GAME OBJECTS
        this.objects = [
            wall,
            player1,
            player2,
        ];

        // BACKGROUND OBJECTS
        this.backgrounds = [
            ground,
            goalLeft,
        ];

        this.toDraw = [
            goalLeft,
            goalRight,
            wall,
            ground,
            player1,
            player2,
        ];

        // Player 1 Controller
        new PlayerController(
            player1,
            "w",            // up
            "a",            // left
            "s",            // down
            "d",            // right
        );

        // Player 2 Controller
        new PlayerController(
            player2,
            "ArrowUp",      // up
            "ArrowLeft",    // left
            "ArrowDown",    // down
            "ArrowRight",   // right
        );
    }

    // TOGGLE PAUSE
    togglePause() {
        if (this.paused) {
            this.paused = false;
            return;
        }
        this.paused = true;
    }

    // CreateBall
    addBall() {
        let ball = new Player(
            this.canvas,                                        // canvas
            this,                                               // engine
            this.canvas.width * Math.random(),                  // x
            this.canvas.height,                                 // y
            .35,                                                // mass
            15,                                                 // radius
            this.groundHeight,                                  // groundHeight
            Render.randomColor(),                               // color
            "obj" + this.objects.length                         // name
        );
        this.objects.push(ball);
        this.toDraw.push(ball);
    }

    // GAMELOOP
    step(time) {
        let deltaTime = (time - this.lastTime) / 100;
        this.lastTime = time;

        if (this.started) {
            // Physics --- dont run when game paused
            if (!this.paused) {
                this.objects.forEach(obj => {
                    if (typeof obj.update === "function") {
                        obj.update(deltaTime, this.objects);
                    }
                });
            }

            // Render
            Render.draw(this.toDraw);
            Render.score(50, 0, 2, this.score, 600, 30,2);

            // Render Pause
            if (this.paused) {
                Render.pause();
            }


        }
        else {
            Render.preRender();
        }

        // Render FPS
        this.tot += deltaTime;
        this.counter++;
        if (this.counter == this.frameCount) {
            this.fps = this.frameCount / (this.tot / 10);  // divide by 10 to get to seconds.
            this.tot = 0;
            this.counter = 0;
        }
        Render.fps("FPS: " + this.fps.toFixed(1), 14, "rgba(0, 0, 0, .5)");
    }

    goalRight(deltaTime) {
        if(!this.paused) {
            this.score += (deltaTime / 10);
        }
        if (this.score >= this.rightWin) {
            this.rightLose();
            this.score = this.rightWin;

        }
    }
    goalLeft(deltaTime) {
        if(!this.paused) {
            this.score -= (deltaTime / 10);
        }
        if (this.score <= this.leftWin) {
            this.leftLose();
            this.score = this.leftWin;
        }
    }

    rightLose() {
        console.log("Left Wins!")
    }

    leftLose() {
        console.log("Right Wins!")
    }

}