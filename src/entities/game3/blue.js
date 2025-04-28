import { checkOutsideBounds } from "../../helpers/checkOutsideBounds.js";
import { Vector2 } from "../../modules/vortex.js";
import { RenderService } from "../../modules/vortex.js";
import { AudioControl } from "../../modules/vortex.js";

const size = new Vector2(30, 30);

export function newSpinner() {
    const position = Vector2.RandomBetween(
        new Vector2(RenderService.vw / 2 - 125, RenderService.vh / 2 - 125),
        new Vector2(RenderService.vw / 2 + 125, RenderService.vh / 2 + 125)
    )
    const direction = Vector2.RandomBetween(new Vector2(1, 1), new Vector2(-1, -1))
    const randomRotation = Math.random() > 0.5 ? 0.05 : -0.05;
    const randomSpeed = Math.random() > 0.5 ? 4 : 8;
    return {
        position: position,
        size: size,
        color: "#00FF00", 
        speed: randomSpeed,
        direction: direction,
        state: {
            rotation: randomRotation,
        }
    }
}

export const spinnerAI = (entity) => {
    entity.direction = Vector2.Rotate(entity.direction, entity.state.rotation);
    // const bounce = checkOutsideBounds(entity, new Vector2(RenderService.vw, RenderService.vh));
    // if (!bounce.Equals(new Vector2(0,0))) {
    //     if (bounce.x) {
    //         entity.direction.x *= -1
    //     }
    //     if (bounce.y) {
    //         entity.direction.y *= -1
    //     }
    //     AudioControl.Play('bounce', {
    //         volume: 0.4
    //     });
    //     console.log(bounce, 'bouce');
    // }
};
