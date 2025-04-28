import { RenderService, Scene, SceneControl, SpriteControl, Vector2 } from "../modules/vortex.js";
import { player, playerMovement } from "../entities/game3/player.js";
import { newEnemy, enemyAI } from "../entities/game3/red.js";
import { checkCollision } from "../helpers/checkCollision.js";
import { AudioControl, Entity } from "../modules/vortex.js";
import { target } from "../entities/game3/target.js";
import { newSpinner, spinnerAI } from "../entities/game3/blue.js";

const patrolScene = new Scene("enemyTest", "#eee", false);

let thisPlayer, thisTarget;
let thisEnemies = []

let points = 0;
let highScore = 0;

patrolScene.setSetup(() => {
    AudioControl.Load('bounce', 'src/assets/audio/bounce.wav');
    AudioControl.Load('defeat', 'src/assets/audio/defeat.wav');
    AudioControl.Load('victory', 'src/assets/audio/victory.wav');
    AudioControl.Load('stage', 'src/assets/audio/stage.mp3');

    SpriteControl.Load("player", "src/assets/img/player.png");
    SpriteControl.Load("enemy", "src/assets/img/enemy.png");
    SpriteControl.Load("target", "src/assets/img/checkpoint.png");
    SpriteControl.Load("spinner", "src/assets/img/blue.png");

    thisPlayer = patrolScene.AddEntity({ tag: 'player', obj: player, canMove: true, attachedSprite: 'player' });

    thisEnemies.push(patrolScene.AddEntity({ tag: 'spinner', obj: newSpinner(), canMove: true, attachedSprite: 'spinner' }));

    thisTarget = patrolScene.AddEntity({ tag: 'target', obj: target, canMove: false, attachedSprite: 'target' });

    console.log(newEnemy());
    console.log(newEnemy());
    thisTarget.obj.position = new Vector2(RenderService.vw - 50, RenderService.vh - 50)

    setTimeout(() => {
        AudioControl.Play('stage');   
    }, 1000);
});

patrolScene.setLoop(() => {
    playerMovement(thisPlayer.obj);

    for (const thisEnemy of thisEnemies) {
        if (thisEnemy.tag == 'enemy') {
            enemyAI(thisEnemy.obj);
        } else if (thisEnemy.tag == 'spinner') {
            spinnerAI(thisEnemy.obj);
        }
        if (checkCollision(thisPlayer.obj, thisEnemy.obj)) {
            AudioControl.Play('defeat');
            console.log("💥 Player hit the enemy!")
            patrolScene.RemoveEntityByTag('enemy');
            patrolScene.RemoveEntityByTag('spinner');
            thisEnemies = [];
            thisEnemies.push(patrolScene.AddEntity({ tag: 'enemy', obj: newEnemy(), canMove: true, attachedSprite: 'enemy' }));
        }
    }

    if (checkCollision(thisPlayer.obj, thisTarget.obj)) {
        AudioControl.Play('victory');
        points++;
        highScore = Math.max(points, highScore);
        console.log("💥 Player hit the target!");
        thisPlayer.obj.position = new Vector2(50, 50);
        
        const randomEnemy = Math.random() > 0.5 ? 'enemy' : 'spinner';
        if (randomEnemy == 'enemy') {
            thisEnemies.push(patrolScene.AddEntity({ tag: 'spinner', obj: newSpinner(), canMove: true, attachedSprite: 'spinner' }));
        } else {
            thisEnemies.push(patrolScene.AddEntity({ tag: 'enemy', obj: newSpinner(), canMove: true, attachedSprite: 'enemy' }));
        }
    }
});

export default patrolScene;
