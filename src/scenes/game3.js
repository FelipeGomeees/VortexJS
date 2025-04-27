import { RenderService, Scene, SceneControl, SpriteControl, Vector2 } from "../modules/vortex.js";
import { player, playerMovement } from "../entities/game3/player.js";
import { enemy, enemyAI } from "../entities/game3/enemy.js";
import { checkCollision } from "../helpers/checkCollision.js";
import { AudioControl, Entity } from "../modules/vortex.js";
import { target } from "../entities/game3/target.js";

const patrolScene = new Scene("enemyTest", "#eee", true);

let thisPlayer, thisEnemy, thisTarget;

patrolScene.setSetup(() => {
    AudioControl.Load('bounce', 'src/assets/audio/bounce.wav');
    AudioControl.Load('defeat', 'src/assets/audio/defeat.wav');
    AudioControl.Load('victory', 'src/assets/audio/victory.wav');

    SpriteControl.Load("player", "src/assets/img/player.png");
    SpriteControl.Load("enemy", "src/assets/img/enemy.png");
    SpriteControl.Load("target", "src/assets/img/checkpoint.png");

    thisPlayer = patrolScene.AddEntity({ tag: 'player', obj: player, canMove: true, attachedSprite: 'player' });
    thisEnemy = patrolScene.AddEntity({ tag: 'enemy', obj: enemy, canMove: true, attachedSprite: 'enemy' });
    thisTarget = patrolScene.AddEntity({ tag: 'target', obj: target, canMove: false, attachedSprite: 'target' });

    patrolScene.UpdateEntity('target', {
        position: new Vector2(RenderService.vw - 50, RenderService.vh - 50)
    });
});

patrolScene.setLoop(() => {
    patrolScene.UpdateEntity('player', playerMovement(thisPlayer.obj));
    patrolScene.UpdateEntity('enemy', enemyAI(thisEnemy.obj));

    if (checkCollision(player, enemy)) {
        AudioControl.Play('defeat');
        console.log("💥 Player hit the enemy!");
        player.position = new Vector2(50, 50);
        // patrolScene.AddEntity({ tag: 'enemy', obj: enemy, canMove: true });
    }

    if (checkCollision(player, target)) {
        AudioControl.Play('victory');
        console.log("💥 Player hit the target!");
        player.position = new Vector2(50, 50);
        patrolScene.AddEntity({ tag: 'enemy', obj: enemy, canMove: true });
    }
});

export default patrolScene;
