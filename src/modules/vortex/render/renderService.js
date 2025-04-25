import { SpriteControl } from "./spriteControl.js";

class renderService {
    constructor() {
        this.vw = 0;
        this.vh = 0;   
    }

    Setup(options) {
        this.vw = options.width || 1280;
        this.vh = options.height || 720;

        this.canvas = document.getElementById("vortex").appendChild(document.createElement("canvas"));
        this.ctx = this.canvas.getContext("2d");

        const body = document.body;
        body.style.margin = '0';
        body.style.overflow = 'hidden';

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const scaleX = this.canvas.width / this.vw;
        const scaleY = this.canvas.height / this.vh;

        const scale = Math.min(scaleX, scaleY);

        this.ctx.setTransform(scale, 0, 0, scale, 0, 0);

        window.addEventListener("resize", () => this.HandleResize());
    }

    Update(scene) {
        this.ctx.clearRect(0, 0, this.vw, this.vh);
        this.ctx.fillStyle = scene.bgColor;
        this.ctx.fillRect(0, 0, this.vw, this.vh);
    
        scene.entities.forEach(ett => {
            const entity = ett.obj;
            const spriteInfo = SpriteControl.GetAttached(entity);
    
            if (spriteInfo) {
                const { key, offset } = spriteInfo;
                const sprite = SpriteControl.Get(key);
                if (sprite) {
                    this.ctx.drawImage(
                        sprite,
                        entity.position.x + offset.x,
                        entity.position.y + offset.y,
                        entity.size.x,
                        entity.size.y,
                    );
                    return;
                }
            }
    
            // Fallback to color render (e.g., no sprite attached)
            this.ctx.fillStyle = entity.color || "#f00";
            this.ctx.fillRect(
                entity.position.x,
                entity.position.y,
                entity.size?.x || 16,
                entity.size?.y || 16
            );
        });
    }
    

    HandleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    
        const scaleX = this.canvas.width / this.vw;
        const scaleY = this.canvas.height / this.vh;
    
        const scale = Math.min(scaleX, scaleY);
    
        this.ctx.setTransform(scale, 0, 0, scale, 0, 0);
    }
}

export const RenderService = new renderService();