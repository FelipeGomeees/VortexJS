import { SceneControl } from "../../vortex.js";

export class Scene {
    entities = [];
    constructor(name = "Scene", bgColor = "#000000") {
        this.name = name;
        this.bgColor = bgColor;

        SceneControl.addScene(name, this);
    }

    addEntity(entity) {
        this.entities.push(entity);
        return entity;
    }

    setSetup(callback) {
        this.setup = callback;
    }

    setLoop(callback) {
        this.loop = callback;
    }
}