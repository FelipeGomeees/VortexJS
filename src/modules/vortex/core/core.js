import { SceneControl } from "../../vortex.js";

class vortex {

    Setup() {
        let scene = SceneControl.currentScene;
        console.log(SceneControl);
        scene.setup();
    }

    GameLoop() {
        let lastTime = performance.now();
        let scene = SceneControl.currentScene;
    
        const loop = (currentTime) => {
            if (SceneControl.refresh) {
                scene = SceneControl.currentScene;
                this.Setup(scene);
            }
            this.ctx.clearRect(0, 0, this.vw, this.vh);
            this.ctx.fillStyle = scene.bgColor;
            this.ctx.fillRect(0, 0, this.vw, this.vh);

            if (scene.entities.length) {
                scene.entities.forEach(entity => {
                    this.ctx.fillStyle = entity.color;
                    this.ctx.fillRect(entity.position.x, entity.position.y, entity.size.x, entity.size.y);
                });
            }

            const delta = currentTime - lastTime;
            lastTime = currentTime;
    
            scene.loop(delta);
    

            requestAnimationFrame(loop);
        }
    
        requestAnimationFrame(loop);
    }

    Start(options) {
        const canvas = document.getElementById("vortex").appendChild(document.createElement("canvas"));
        this.ctx = canvas.getContext("2d");

        const body = document.body;
        body.style.margin = '0';
        body.style.overflow = 'hidden';

        this.vw = options.width || 1280;
        this.vh = options.height || 720;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / this.vw;
        const scaleY = canvas.height / this.vh;

        const scale = Math.min(scaleX, scaleY);

        this.ctx.setTransform(scale, 0, 0, scale, 0, 0);

        window.addEventListener("resize", () => this.HandleResize());
    
        if (options.scene) {
            SceneControl.setCurrentScene(options.scene.name)
            this.Setup();
            this.GameLoop();
        }
    }

    HandleResize() {
        const canvas = this.ctx.canvas;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        const scaleX = canvas.width / this.vw;
        const scaleY = canvas.height / this.vh;
    
        const scale = Math.min(scaleX, scaleY);
    
        this.ctx.setTransform(scale, 0, 0, scale, 0, 0);
    }
    
}

export const Vortex = new vortex();