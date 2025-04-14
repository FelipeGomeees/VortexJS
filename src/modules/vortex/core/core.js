import { SceneControl } from "../../vortex.js";

class vortex {

    Setup(scene) {
        SceneControl.currentScene = null;
        scene.setup();
    }

    GameLoop(scene) {
        let lastTime = performance.now();
    
        const loop = (currentTime) => {
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

        this.vw = 1280;
        this.vh = 720;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / this.vw;
        const scaleY = canvas.height / this.vh;

        const scale = Math.min(scaleX, scaleY);

        this.ctx.setTransform(scale, 0, 0, scale, 0, 0);
    
        this.ctx.setTransform(scale, 0, 0, scale, 0, 0); 
    
        if (options.scene) {
            this.Setup(options.scene);
            this.GameLoop(options.scene);
        }
    }

    static SetScene(scene) {

    }
    
}

export const Vortex = new vortex();