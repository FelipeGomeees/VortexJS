class spriteControl {
    constructor() {
        this.sprites = new Map();
    }

    async Load(key, src) {
        const img = new Image();
        img.src = src;
    
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
}

export const SpriteControl = new spriteControl();
