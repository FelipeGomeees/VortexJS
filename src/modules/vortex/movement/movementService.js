class movementService {
    constructor() {
        this.isActive = true;

    }

    Update(scene) {
        if (!this.isActive) return;
        return scene.entities.map((entity) => {
            const velocity = entity.obj.direction.Normalize().Scale(entity.obj.speed);
            return {
                reference: entity.obj,
                nextPosition: entity.obj.position.Add(velocity) 
            };
        })
    }
}

export const MovementService = new movementService();