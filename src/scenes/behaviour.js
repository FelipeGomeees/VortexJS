import { Scene, Entity, Vector2 } from "../modules/vortex.js";

const $S = new Scene("firstMap", "#000000");
const pressedKeys = {};

let player = new Entity(new Vector2(50, 50), new Vector2(100, 100), "#FF0000");

const bulletDirection = new Vector2(1, 0);

const bulletBehaviour = () => {

}


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

    if (pressedKeys["d"]) player.direction = new Vector2(1, 0);
    if (pressedKeys["a"]) player.direction = new Vector2(-1, 0);
    if (pressedKeys["w"]) player.direction = new Vector2(0, -1);
    if (pressedKeys["s"]) player.direction = new Vector2(0, 1);
    if (pressedKeys["shift"]) {
        player.speed = 8;
    } else {
        player.speed = 4;
    }

    if (!player.direction.Equals(new Vector2(0, 0))) {
        const normalized = inputDirection.Normalize();

        let speed = 4;
        if (pressedKeys["shift"]) speed = 8;
        const velocity = normalized.Scale(speed);
        const bulletVelocity = bulletDirection.Scale(speed);

        player.position = player.position.Add(velocity);
        bullet.position = bullet.position.Add(bulletVelocity);
    }
    const fps = 1000 / delta;
    // console.log(`${fps.toFixed(1)} FPS`)
});


export default $S;