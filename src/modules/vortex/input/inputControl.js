class inputControl {
    constructor() {
        this.activeSchema = {}
    }

    AddKeyDown(name, scene) {
        this.scenes[name] = scene;
    }

    setCurrentScene(name) {
        console.log(name);
        console.log(this.scenes);
        this.currentScene = this.scenes[name];
        return this.currentScene;
    }
}

export const InputControl = new inputControl();