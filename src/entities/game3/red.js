import { checkCollision } from "../../helpers/checkCollision.js";
import { checkOutsideBounds } from "../../helpers/checkOutsideBounds.js";
import { Vector2 } from "../../modules/vortex.js";
import { RenderService } from "../../modules/vortex.js";
import { AudioControl } from "../../modules/vortex.js";

const size = new Vector2(30, 30);
const bounds = new Vector2(800, 600);

export function newEnemy() {
    const position = Vector2.RandomWithin(bounds.Subtract(size));
    const direction = Vector2.RandomBetween(new Vector2(1, 1), new Vector2(-1, -1))
    const randomSpeed = Math.random() > 0.5 ? 4 : 8;
    return {
        position: position,
        size: size,
        color: "#00FF00", 
        speed: randomSpeed ,
        direction: direction,
    }
}

export const enemyAI = (entity, entityArray) => {
    const bounce = checkOutsideBounds(entity, new Vector2(RenderService.vw, RenderService.vh));
    // for (enemyEntity of entityArray) {
    //     const bounce2 = checkCollision(entity, enemyEntity);
    //     if (bounce2) {
    //         entity.direction.x *= -1
    //         entity.direction.y *= -1
    //         AudioControl.Play('bounce', {
    //             volume: 0.4
    //         });
    //         console.log(bounce, 'bouce');
    //     }
    //     return;
    // }
    // const bounce2 = checkCollision(entity, entity2);
    if (!bounce.Equals(new Vector2(0,0))) {
        if (bounce.x) {
            entity.direction.x *= -1
        }
        if (bounce.y) {
            entity.direction.y *= -1
        }
        AudioControl.Play('bounce', {
            volume: 0.4
        });
        console.log(bounce, 'bouce');
    }
};
