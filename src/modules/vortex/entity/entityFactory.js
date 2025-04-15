export class EntityFactory {
    constructor(
        entity
    ) {
        this.entity = entity,
        this.entityArray = [];
    }

    Generate() {
        this.entityArray.push(this.entity);
    }

    SetBehaviour(callback) {
        callback();
    }
}