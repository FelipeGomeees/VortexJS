import { SpriteControl } from "../sprite/spriteControl.js";

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

        if (scene.debug) {
            this.ctx.fillStyle = "#000";
            this.ctx.font = "12px monospace";
        
            const lines = [];
        
            lines.push(`Scene: ${scene.name}`);
            lines.push(`Entities: ${scene.entities.length}`);
        
            scene.entities.forEach((ett, index) => {
                const entity = ett.obj;
                lines.push(`
[${index}] Tag: ${ett.tag || "none"} |
Pos: (${entity.position?.x.toFixed(2) ?? "?"}, ${entity.position?.y.toFixed(2) ?? "?"}) | 
Direction: (${entity.direction?.x.toFixed(2) ?? "?"}, ${entity.direction?.y.toFixed(2) ?? "?"})
Size (${entity.size?.x.toFixed(2) ?? "?"}, ${entity.size?.y.toFixed(2) ?? "?"})`);
            });
        
            // Draw each line on the canvas
            lines.forEach((line, i) => {
                this.ctx.fillText(line, 10, 20 + i * 14);
            });
        }
    
        scene.entities.forEach(ett => {
            const entity = ett.obj;
            const spriteInfo = SpriteControl.Get(ett.attachedSprite);
    
            if (spriteInfo) {
                this.ctx.drawImage(
                    spriteInfo,
                    entity.position.x,
                    entity.position.y,
                    entity.size.x,
                    entity.size.y,
                );
                return;
            }
    
            this.ctx.fillStyle = entity.color || "#f00";
            this.ctx.fillRect(
                entity.position.x,
                entity.position.y,
                entity.size?.x || 16,
                entity.size?.y || 16
            );
        });

        scene.ui.forEach(ui => this.renderUIEntity(ui.obj, this.ctx));
    }
    

    HandleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    
        const scaleX = this.canvas.width / this.vw;
        const scaleY = this.canvas.height / this.vh;
    
        const scale = Math.min(scaleX, scaleY);
    
        this.ctx.setTransform(scale, 0, 0, scale, 0, 0);
    }

    renderUIEntity(entity, ctx, parentPosition = { x: 0, y: 0 }) {
        if (!entity.visible) return;
    
        const position = {
            x: parentPosition.x + entity.position.x,
            y: parentPosition.y + entity.position.y,
        };
    
        if (entity.color) {
            ctx.fillStyle = entity.color;
            ctx.fillRect(
                position.x,
                position.y,
                entity.size?.x || 16,
                entity.size?.y || 16
            );
        }
        if (entity.text) {
            console.log(entity.text.font);
            const font = entity.text.font || "Arial";
            const size = entity.text.size || 16;
            const color = entity.text.color || "#000";
            ctx.font = `${size}px ${font}`;
            ctx.fillStyle = color;
            ctx.fillText(entity.text.content, position.x, position.y + size);
        }
    
        if (Array.isArray(entity.children)) {
            entity.children.forEach(child => this.renderUIEntity(child, ctx, position));
        }
    }
    
}

export const RenderService = new renderService();  