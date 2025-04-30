export class AudioTrack {
    constructor(buffer, context, { volume = 1, loop = false, position = null } = {}) {
      this.context = context;
      this.buffer = buffer;
  
      this.source = this.context.createBufferSource();
      this.source.buffer = buffer;
      this.source.loop = loop;
  
      this.gainNode = this.context.createGain();
      this.gainNode.gain.value = volume;
  
      if (position) {
        const [x, y] = position;
        this.panner = this.context.createPanner();
        this.panner.setPosition(x, y, 0);
        this.source.connect(this.panner).connect(this.gainNode).connect(this.context.destination);
      } else {
        this.source.connect(this.gainNode).connect(this.context.destination);
      }
  
      this.isPlaying = false;
    }
  
    Play() {
      if (!this.isPlaying) {
        this.source.start();
        this.isPlaying = true;
      }
    }
  
    Stop() {
      try {
        this.source.stop();
      } catch (e) {
        console.warn('Track already stopped or not started', e);
      }
      this.isPlaying = false;
    }
  
    SetVolume(volume) {
      this.gainNode.gain.value = volume;
    }
  
    SetPosition(x, y) {
      if (!this.panner) {
        this.panner = this.context.createPanner();
        this.source.disconnect();
        this.source.connect(this.panner).connect(this.gainNode).connect(this.context.destination);
      }
      this.panner.setPosition(x, y, 0);
    }
  
    SetLoop(loop) {
      this.source.loop = loop;
    }
  }
  