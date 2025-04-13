class sceneControl {
    constructor() {
        this.scenes = {};
        this.currentScene = null;
    }

    addScene(name, scene) {
        this.scenes[name] = scene;
    }

    setCurrentScene(name) {
        this.currentScene = this.scenes[name];
        return this.currentScene;
    }
}

export const SceneControl = new sceneControl();