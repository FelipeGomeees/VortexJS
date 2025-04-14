import { Scene, SceneControl, Entity, Vector2 } from "../modules/vortex.js";

const $S = new Scene("forest", "#000000");
const pressedKeys = {};

let player = new Entity(new Vector2(50, 50), new Vector2(100, 100), "#FF0000");

$S.setSetup(() => {
    SceneControl.setCurrentScene("forest");
    //
    $S.addEntity(player);

    document.onkeydown = (e) => {
        pressedKeys[e.key.toLowerCase()] = true;
    };
    
    document.onkeyup = (e) => {
        pressedKeys[e.key.toLowerCase()] = false;
    };
});

$S.setLoop((delta) => {
    let inputDirection = new Vector2(0, 0);

    if (pressedKeys["d"]) inputDirection = inputDirection.Add(new Vector2(1, 0));
    if (pressedKeys["a"]) inputDirection = inputDirection.Add(new Vector2(-1, 0));
    if (pressedKeys["w"]) inputDirection = inputDirection.Add(new Vector2(0, -1));
    if (pressedKeys["s"]) inputDirection = inputDirection.Add(new Vector2(0, 1));

    if (!inputDirection.Equals(new Vector2(0, 0))) {
        const normalized = inputDirection.Normalize();
        const speed = 5;
        const velocity = normalized.Scale(speed);

        player.position = player.position.Add(velocity);
    }
});


export default $S;