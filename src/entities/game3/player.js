import { SpriteControl } from "../../modules/vortex.js";
import { checkOutsideBounds } from "../../helpers/checkOutsideBounds.js"
import { RenderService } from "../../modules/vortex.js";
import { Vector2, InputControl } from "../../modules/vortex.js";

export const player = {
    position: new Vector2(50, 50),
    size: new Vector2(30, 30), 
    color: "#FF0000",
    speed: 4,
    // speedModifiers: [],
    direction: new Vector2(0, 0),
};

export const playerMovement = (entity) => {
    entity.direction = new Vector2(0, 0);

    const leaveDirection = checkOutsideBounds(entity, new Vector2(RenderService.vw, RenderService.vh));

    if (InputControl.IsPressed("d") && leaveDirection.x !== 1) {
        entity.direction = entity.direction.Add(new Vector2(1, 0));
    }

    if (InputControl.IsPressed("a") && leaveDirection.x !== -1) {
        entity.direction = entity.direction.Add(new Vector2(-1, 0));
    }

    if (InputControl.IsPressed("w") && leaveDirection.y !== -1) {
        entity.direction = entity.direction.Add(new Vector2(0, -1));
    }

    if (InputControl.IsPressed("s") && leaveDirection.y !== 1) {
        entity.direction = entity.direction.Add(new Vector2(0, 1));
    }

    if (!entity.direction.Equals(new Vector2(0, 0))) {
       entity.direction = entity.direction.Normalize();
    }
};
