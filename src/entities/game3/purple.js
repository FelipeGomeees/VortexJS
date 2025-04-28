import { Vector2 } from "../../modules/vortex.js";

const size = new Vector2(30, 30);
const bounds = new Vector2(800, 600);

export function newExpander() {
    const position = Vector2.RandomWithin(bounds.Subtract(size));
    const direction = Vector2.RandomBetween(new Vector2(1, 1), new Vector2(-1, -1))
    return {
        position: position,
        size: size,
        color: "#00FF00", 
        speed: 0,
        direction: direction,
    }
}

export const expanderAI = (entity) => {
    if (entity.obj.size.BiggerThan(new Vector2(140, 140))) {
        entity.attachedSprite = 'expander-big';
        entity.obj.state.isLarge = true;
        return;
    };
    entity.attachedSprite = 'expander';
    entity.obj.size = entity.obj.size.Add(new Vector2(0.2, 0.2));
};
