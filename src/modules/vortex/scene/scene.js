import { SceneControl } from "../../vortex.js";

export class Scene {
    entities = [];
    constructor(name = "Scene", bgColor = "#000000") {
        this.name = name;
        this.bgColor = bgColor;

        SceneControl.addScene(name, this);
    }

    AddEntity(entity) {
        this.entities.push(entity);
        return entity;
    }

    setSetup(callback) {
        this.setup = callback;
    }

    setLoop(callback) {
        this.loop = callback;
    }

    GetEntity(tag) {
        return this.entities.find(entity => entity.tag === tag)
    }

    // ChangeEntity(tag) {
    //     this.entities.find(entity => entity.tag === tag)
    // }
}