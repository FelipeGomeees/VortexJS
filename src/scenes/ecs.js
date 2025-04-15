import { Scene, Vector2 } from "../modules/vortex.js";
import { player } from "../entities/player.js";

const currentScene = new Scene("firstMap", "#000000");
const pressedKeys = {};

currentScene.setSetup(() => {
    currentScene.addEntity(player);

    document.onkeydown = (e) => {
        pressedKeys[e.key.toLowerCase()] = true;
    };
    
    document.onkeyup = (e) => {
        pressedKeys[e.key.toLowerCase()] = false;
    };
});

currentScene.setLoop((delta) => {
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


export default currentScene;