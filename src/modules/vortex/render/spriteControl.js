import { Vector2 } from "../vector2/vector2.js";

class spriteControl {
    constructor() {
        this.sprites = new Map();
        this.attachments = new Map();
    }

    async Load(key, src) {
        const img = new Image();
        img.src = src;
    
        console.log(key, src);
        console.log(img);
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });
    
        this.sprites.set(key, img);
        return img;
    }

    Get(key) {
        return this.sprites.get(key);
    }

    async LoadAll(spriteList) {
        const promises = spriteList.map(({ key, src }) => this.Load(key, src));
        await Promise.all(promises);
    }

    Attach(key, entity, offset = new Vector2(0, 0)) {
        if (!this.sprites.has(key)) {
            throw new Error(`Sprite "${key}" not loaded.`);
        }

        this.attachments.set(entity, {
            key,
            offset
        });
    }

    Detach(entity) {
        this.attachments.delete(entity);
    }

    GetAttached(entity) {
        return this.attachments.get(entity);
    }

    GetAllAttachments() {
        return this.attachments.entries();
    }
}

export const SpriteControl = new spriteControl();
