import { Vector2 } from "../modules/vortex.js";

export function checkOutsideBounds(entity, bounds) {
    let out = new Vector2(0, 0);

    if (entity.position.x < 0) out.x = -1;
    else if (entity.position.x + entity.size.x > bounds.x) out.x = 1;

    if (entity.position.y < 0) out.y = -1;
    else if (entity.position.y + entity.size.y > bounds.y) out.y = 1;

    return out;
}