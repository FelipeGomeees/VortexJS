import { MovementControl } from "../../vortex.js";

export class Scene {
    entities = [];
    constructor(entity, behaviour, isActive) {
        this.entity = entity;
        this.behaviour = behaviour;
        this.isActive = isActive;

        MovementControl.AddMovement(movement);
    }

    Action(callback) {
        callback();
    }
}