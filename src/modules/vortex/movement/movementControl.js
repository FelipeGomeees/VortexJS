export class movementControl {
    constructor() {
        this.entities = []
    }

    AddMovement(movement) {
        this.entities.push({
            movement,
        })
    }

    // RemoveEntity(entity) {
    //     this.entities = this.entities.filter(e => e.entity !== entity);
    // }

    Update(delta) {
        const movedEntities = this.entities.map((entity) => {
            if (entity.isActive) {
                return entity.movement.action(delta);
            } else {
                return entity
            }
        })
        return movedEntities;
    }
}

export const MovementControl = new movementControl();