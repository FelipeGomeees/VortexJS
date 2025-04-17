import { SceneControl, MovementService, InputControl, RenderService } from "../../vortex.js";

class vortex {

    Setup() {
        let scene = SceneControl.currentScene;
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

            if (scene.entities.length) {
                InputControl.Update(this.canvas);
                const nextMovement = MovementService.Update(scene);
                nextMovement.forEach((entity) => {
                    const target = scene.GetEntity(entity.tag);
                    if (target) {
                        target.obj.position = entity.nextPosition;
                    }
                })
                RenderService.Update(scene);
            }

            const delta = currentTime - lastTime;
            lastTime = currentTime;
    
            scene.loop(delta);
    
            requestAnimationFrame(loop);
        }
    
        requestAnimationFrame(loop);
    }

    Start(options) {

        RenderService.Setup(options);

        InputControl.SetupInputs();
    
        if (options.scene) {
            SceneControl.setCurrentScene(options.scene.name)
            this.Setup();
            this.GameLoop();
        }
    }
}

export const Vortex = new vortex();