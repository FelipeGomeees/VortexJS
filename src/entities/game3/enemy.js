import { checkOutsideBounds } from "../../helpers/checkOutsideBounds.js";
import { Vector2 } from "../../modules/vortex.js";
import { RenderService } from "../../modules/vortex.js";
import { AudioControl } from "../../modules/vortex.js";

const size = new Vector2(30, 30);
const bounds = new Vector2(800, 600);

const position = Vector2.RandomWithin(bounds.Subtract(size));
const direction = Vector2.RandomBetween(new Vector2(-1, 1), new Vector2(-1, 1))

export const enemy = {
    position: position,
    size: size,
    color: "#00FF00",
    speed: 4,
    direction: direction,
};

export const enemyAI = (entity) => {
    const bounce = checkOutsideBounds(entity, new Vector2(RenderService.vw, RenderService.vh));
    if (!bounce.Equals(new Vector2(0,0))) {
        if (bounce.x) {
            entity.direction.x *= -1
        }
        if (bounce.y) {
            entity.direction.y *= -1
        }
        AudioControl.Play('bounce');
        console.log(bounce, 'bouce');
    }
};
