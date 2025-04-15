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

    const movementKeyPressed = pressedKeys["d"] || pressedKeys["a"] || pressedKeys["w"] || pressedKeys["s"];

    if (pressedKeys["d"]) player.direction = player.direction.Add(new Vector2(1, 0));
    if (pressedKeys["a"]) player.direction = player.direction.Add(new Vector2(-1, 0));
    if (pressedKeys["w"]) player.direction = player.direction.Add(new Vector2(0, -1));
    if (pressedKeys["s"]) player.direction = player.direction.Add(new Vector2(0, 1));

    if (!movementKeyPressed) player.speedModifiers.push(['*', 0]);

    if (!player.direction.Equals(new Vector2(0, 0))) {
        if (pressedKeys["shift"]) player.speedModifiers.push(['*', 2]);
    }
    const fps = 1000 / delta;
    // console.log(`${fps.toFixed(1)} FPS`)w
});


export default currentScene;