import Background from "../gameObjects/background.js";
import Player from "../gameObjects/player.js";
import Wall from "../gameObjects/wall.js";
import InputHandler from "./input.js";
import Render from "./render.js";

export default class GameEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.objects = [];
        this.backgrounds = [];

        // Loop Variables
        this.lastTime = 0;
        this.counter = 0;
        this.tot = 0;
        this.fps = 0;
        this.frameCount = 20;
        this.paused = false;

        this.started = false;
    }

    init() {
        this.started = true;
        const canvas = this.canvas;
        const groundHeight = 20;
        const background = new Background(canvas, groundHeight);

        // Detect Spacebar press
        document.addEventListener("keydown", (e) => {
            if (e.key == " ") {
                this.togglePause();
            }
        });

        // Detect Click
        canvas.addEventListener("click", () => {
            this.togglePause();
        });

        // Player 1
        let player1 = new Player(
            this.canvas,                 // canvas
            40,                     // x
            40,                     // y
            1,                      // mass
            30,                     // radius
            groundHeight,           // groundHeight
            "rgb(255, 100, 100)",   // color
            "player1"               // name
        );

        // Player x
        let playerx = new Player(
            this.canvas,                 // canvas
            40,                     // x
            600,                    // y
            .5,                     // mass
            20,                     // radius
            groundHeight,           // groundHeight
            "green",                // color
            "playerx"               // name
        );

        // Player 2
        let player2 = new Player(
            this.canvas,                 // canvas
            1460,                   // x
            40,                     // y
            1,                      // mass
            30,                     // radius
            groundHeight,           // groundHeight
            "rgb(100, 100, 255)",   // color
            "player2"               // name
        );

        // Wall
        let wall = new Wall(
            this.canvas,                 // canvas
            (canvas.width / 2),     // x
            0,                      // y
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
            playerx,
        ];

        // BACKGROUND OBJECTS
        this.backgrounds = [
            background,
        ];

        // Player 1 Controller
        new InputHandler(
            player1,
            "w",            // up
            "a",            // left
            "s",            // down
            "d",            // right
        );

        // Player 2 Controller
        new InputHandler(
            player2,
            "ArrowUp",      // up
            "ArrowLeft",    // left
            "ArrowDown",    // down
            "ArrowRight",   // right
        );

        // this.step(0);
    }

    // TOGGLE PAUSE
    togglePause() {
        if (this.paused) {
            this.paused = false;
            return;
        }
        this.paused = true;
    }

    // GAMELOOP
    step(time) {
        let deltaTime = (time - this.lastTime) / 100;
        this.lastTime = time;

        // Physics
        if (!this.paused) {
            this.objects.forEach(obj => {
                if (typeof obj.update === "function") {
                    obj.update(deltaTime, this.objects);
                }
            });
            
            // Render
            Render.drawObjects(this.objects);
            Render.drawBackground(this.backgrounds);
        }

        // Render Pause
        if (this.paused) {
            Render.pause();
        }

        if (!this.started) {
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

}