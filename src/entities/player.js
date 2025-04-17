import { Entity, Vector2, InputControl } from "../modules/vortex.js";

export const player = new Entity({
    position: new Vector2(50, 50),
    size: new Vector2(100, 100), 
    color: "#FF0000",
    speed: 4,
    // speedModifiers: [],
    direction: new Vector2(0, 0),
});

export const playerMovement = () => {
    player.direction = new Vector2(0, 0);

    if (InputControl.IsPressed("d")) player.direction = player.direction.Add(new Vector2(1, 0));
    if (InputControl.IsPressed("a")) player.direction = player.direction.Add(new Vector2(-1, 0));
    if (InputControl.IsPressed("w")) player.direction = player.direction.Add(new Vector2(0, -1));
    if (InputControl.IsPressed("s")) player.direction = player.direction.Add(new Vector2(0, 1));

    // if (!player.direction.Equals(new Vector2(0, 0))) {
    //     player.direction = player.direction.Normalize();
    // }
};
