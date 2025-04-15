import { Entity, Vector2 } from "../modules/vortex";

export const player = new Entity({
    position: new Vector2(50, 50),
    size: new Vector2(100, 100), 
    color: "#FF0000",
    speed: 4,
    speedModifiers: [],
    direction: new Vector2(0, 0),
});