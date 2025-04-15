// import { AnimationControl} from "../../vortex.js";

export class Animation {
    constructor(frames = []) {
        this.frames = frames.slice();  
        this.currentTime = 0; 
        this.currentFrameIndex = 0; 
        this.loop = true;  
    }
    
    AddFrame(sprite, duration) {
        this.frames.push({ sprite, duration });
    }

    Update(delta) {
        if (this.frames.length === 0) return null;
    
        this.currentTime += delta;
        const frame = this.frames[this.currentFrameIndex];
    
        if (this.currentTime >= frame.duration) {
            this.currentTime -= frame.duration;
            this.currentFrameIndex++;
            if (this.currentFrameIndex >= this.frames.length) {
                if (this.loop) {
                    this.currentFrameIndex = 0;
                } else {
                this.currentFrameIndex = this.frames.length - 1;
                }
            }
        }

        return this.frames[this.currentFrameIndex].sprite;
    }

    Reset() {
        this.currentTime = 0;
        this.currentFrameIndex = 0;
    }
}