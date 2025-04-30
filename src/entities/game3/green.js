import { checkOutsideBounds } from "../../helpers/checkOutsideBounds.js";
import { Vector2 } from "../../modules/vortex.js";
import { RenderService } from "../../modules/vortex.js";
import { AudioControl } from "../../modules/vortex.js";

const size = new Vector2(30, 30);
const bounds = new Vector2(800, 600);

export function newChaser() {
    const position = Vector2.RandomWithin(bounds.Subtract(size));
    const direction = Vector2.RandomBetween(new Vector2(1, 1), new Vector2(-1, -1))
    const randomSpeed = Math.random() > 0.5 ? 2 : 3;
    return {
        position: position,
        size: size,
        color: "#00FF00", 
        speed: randomSpeed ,
        direction: direction,
    }
}

export const chaserAI = (entity, toChase) => {
    const toTarget = toChase.position.Subtract(entity.position).Normalize();

    entity.direction = toTarget;
};
