import { AudioTrack } from "./audioTrack.js";

class audioControl {
    constructor() {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.buffers = new Map();
    }

    async Load(name, url) {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
      this.buffers.set(name, audioBuffer);
    }

    async LoadAll(soundList) {
      const promises = soundList.map(({ name, url }) => this.Load(name, url));
      await Promise.all(promises);
    }
  
    Play(name, options = {}) {
      const buffer = this.buffers.get(name);
      if (!buffer) {
        console.warn(`Sound "${name}" not found`);
        return null;
      }
    
      const track = new AudioTrack(buffer, this.context, options);
      track.Play();
      return track;
    }
    
  
    StopAll() {
      this.context.close().then(() => {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
      });
    }
  
    GetContext() {
      return this.context;
    }
  }

export const AudioControl = new audioControl();
  