import { Scene, Entity, Vector2 } from "../modules/vortex.js";

const $S = new Scene("firstMap", "#000000");
const pressedKeys = {};

let player = new Entity(new Vector2(50, 50), new Vector2(100, 100), "#FF0000");

$S.setSetup(() => {
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

        let speed = 4;
        if (pressedKeys["shift"]) speed = 8;
        const velocity = normalized.Scale(speed);

        player.position = player.position.Add(velocity);
    }
    const fps = 1000 / delta;
    // console.log(`${fps.toFixed(1)} FPS`)
});


export default $S;