import { Vector2 } from "../vector2/vector2.js";

export class Entity {
    constructor({
        position = new Vector2(0, 0),
        size = new Vector2(0, 0),
        color,
        speed = 4,
        direction = new Vector2(0, 0),
    }) {
        this.position = position;
        this.size = size;
        this.color = color;
        this.speed = speed,
        this.direction = direction;
    }

    
}