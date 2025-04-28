import { Vector2 } from "../vector2/vector2.js";

class movementService {
    constructor() {
        this.isActive = true;
    }

    Update(scene) {
        if (!this.isActive) {
            return scene.entities.map((entity) => {
                const velocity = new Vector2(0, 0);
                return {
                    reference: entity.obj,
                    nextPosition: entity.obj.position.Add(velocity)
                };
            })
        };
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