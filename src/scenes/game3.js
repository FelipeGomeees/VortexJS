import { RenderService, Scene, Vector2 } from "../modules/vortex.js";
import { player, playerMovement } from "../entities/game3/player.js";
import { enemy, enemyAI } from "../entities/game3/enemy.js";
import { checkCollision } from "../helpers/checkCollision.js";
import { AudioControl, Entity } from "../modules/vortex.js";

const patrolScene = new Scene("enemyTest", "#eee");

export const target = new Entity({
    position: new Vector2(0, 0),
    size: new Vector2(30, 30), 
    color: "#FFFF00",
    speed: 0,
    // speedModifiers: [],
    direction: new Vector2(0, 0),
});

patrolScene.setSetup(() => {
    AudioControl.Load('bounce', 'src/assets/audio/bounce.wav');
    AudioControl.Load('defeat', 'src/assets/audio/defeat.wav');
    AudioControl.Load('victory', 'src/assets/audio/victory.wav');

    patrolScene.AddEntity({ tag: 'player', obj: player, canMove: true });
    patrolScene.AddEntity({ tag: 'enemy', obj: enemy, canMove: true });
    patrolScene.AddEntity({ tag: 'target', obj: target, canMove: false });

    target.position = new Vector2(RenderService.vw - 50, RenderService.vh - 50);
});

patrolScene.setLoop(() => {
    playerMovement();
    enemyAI();

    if (checkCollision(player, enemy)) {
        AudioControl.Play('defeat');
        console.log("💥 Player hit the enemy!");
        player.position = new Vector2(50, 50);
        patrolScene.AddEntity({ tag: 'enemy', obj: enemy, canMove: true });
    }

    if (checkCollision(player, target)) {
        AudioControl.Play('victory');
        console.log("💥 Player hit the target!");
        player.position = new Vector2(50, 50);
        patrolScene.AddEntity({ tag: 'enemy', obj: enemy, canMove: true });
    }
});

export default patrolScene;
