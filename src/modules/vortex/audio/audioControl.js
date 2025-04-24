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
  
    Play(name, options = {}) {
      const buffer = this.buffers.get(name);
      if (!buffer) {
        console.warn(`Sound "${name}" not found`);
        return;
      }
  
      const source = this.context.createBufferSource();
      source.buffer = buffer;
  
      const gainNode = this.context.createGain();
      gainNode.gain.value = options.volume !== undefined ? options.volume : 1;
  
      source.loop = options.loop === true;
  
      if (options.position) {
        const [x, y] = options.position;
        const panner = this.context.createPanner();
        panner.setPosition(x, y, 0);
        source.connect(panner).connect(gainNode).connect(this.context.destination);
      } else {
        source.connect(gainNode).connect(this.context.destination);
      }
  
      source.start(0);
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
  