import { Entity, Vector2, SpriteControl } from "../../modules/vortex.js";

SpriteControl.Load("target", "src/assets/img/checkpoint.png");

export const target = {
    position: new Vector2(0, 0),
    size: new Vector2(30, 30), 
    color: "#FFFF00",
    speed: 0,
    // speedModifiers: [],
    direction: new Vector2(0, 0),
};