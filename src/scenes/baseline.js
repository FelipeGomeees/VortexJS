import { Scene, SceneControl, Entity, Vector2 } from "../modules/vortex.js";

const $S = new Scene("forest", "#000000");
let player = new Entity(new Vector2(50, 50), new Vector2(100, 100), "#FF0000");

$S.setSetup(() => {
    SceneControl.setCurrentScene("forest");
    //
    $S.addEntity(player);
});

$S.setLoop((delta) => {
    console.log(player.position)
    if (player.position.y < (720 - player.size.y)) {
        const direction = new Vector2(1, 0);
        const speed = 5;
        let velocity = direction.Scale(speed);

        player.position = player.position.Add(velocity);
    } else {
        player.position = player.position.Add(new Vector2(1, -1));
    }
    
});

// Vortex.Setup(() => {
//     SceneControl.setCurrentScene("forest");
// });

// Vortex.GameLoop((delta) => {});


export default $S;