import { RenderService, Scene, SceneControl, SpriteControl, Vector2 } from "../modules/vortex.js";
import { player, playerMovement } from "../entities/game3/player.js";
import { newEnemy, enemyAI } from "../entities/game3/red.js";
import { checkCollision } from "../helpers/checkCollision.js";
import { AudioControl, Entity } from "../modules/vortex.js";
import { target } from "../entities/game3/target.js";
import { newSpinner, spinnerAI } from "../entities/game3/blue.js";
import { newChaser, chaserAI } from "../entities/game3/green.js";
import { newExpander, expanderAI } from "../entities/game3/purple.js";

const patrolScene = new Scene("enemyTest", "#faf", false);

let thisPlayer, thisTarget;
let thisEnemies = []

let points = 0;
let highScore = 0;

patrolScene.setSetup(() => {
    AudioControl.Load('bounce', 'src/assets/audio/bounce.wav');
    AudioControl.Load('defeat', 'src/assets/audio/defeat.wav');
    AudioControl.Load('victory', 'src/assets/audio/victory.wav');
    AudioControl.Load('stage', 'src/assets/audio/shop.mp3');

    SpriteControl.Load("player", "src/assets/img/player.png");
    SpriteControl.Load("enemy", "src/assets/img/enemy.png");
    SpriteControl.Load("target", "src/assets/img/checkpoint.png");
    SpriteControl.Load("spinner", "src/assets/img/blue.png");
    SpriteControl.Load("chaser", "src/assets/img/green.png");
    SpriteControl.Load("expander", "src/assets/img/purple.png");
    SpriteControl.Load("expander-big", "src/assets/img/purple2.png");

    thisPlayer = patrolScene.AddEntity({ tag: 'player', obj: player, canMove: true, attachedSprite: 'player' });

    generateEnemy();

    thisTarget = patrolScene.AddEntity({ tag: 'target', obj: target, canMove: false, attachedSprite: 'target' });

    console.log(newEnemy());
    console.log(newEnemy());
    thisTarget.obj.position = new Vector2(RenderService.vw - 50, RenderService.vh - 50)

    setTimeout(() => {
        AudioControl.Play('stage', {
            volume: 0.2,
        });   
    }, 1000);
});

patrolScene.setLoop(() => {
    playerMovement(thisPlayer.obj);

    for (const thisEnemy of thisEnemies) {
        if (thisEnemy.tag == 'enemy') {
            enemyAI(thisEnemy.obj);
        } else if (thisEnemy.tag == 'spinner') {
            spinnerAI(thisEnemy.obj);
        } else if (thisEnemy.tag == 'chaser') {
            chaserAI(thisEnemy.obj, thisPlayer.obj);
        } else if (thisEnemy.tag == 'expander') {
            expanderAI(thisEnemy);
        }
        if (checkCollision(thisPlayer.obj, thisEnemy.obj)) {
            AudioControl.Play('defeat');
            console.log("💥 Player hit the enemy!")
            console.log('points', points);
            console.log('highScore', highScore);
            points = 0;
            // thisPlayer.obj.position = new Vector2(50, 50);
            resetEnemies();
            thisEnemies.push(patrolScene.AddEntity({ tag: 'enemy', obj: newEnemy(), canMove: true, attachedSprite: 'enemy' }));
        }
    }

    if (checkCollision(thisPlayer.obj, thisTarget.obj)) {
        AudioControl.Play('victory');
        points++;
        highScore = Math.max(points, highScore);
        console.log("💥 Player hit the target!");
        thisPlayer.obj.position = new Vector2(50, 50);

        resetEnemies();
        for (let i = -1; i < points; i++) {
            generateEnemy();
        }
    }
});

export default patrolScene;

function generateEnemy() {
    const randomEnemy = Math.random();
    if (randomEnemy <= 0.25) {
        thisEnemies.push(patrolScene.AddEntity({ tag: 'spinner', obj: newSpinner(), canMove: true, attachedSprite: 'spinner' }));
    } else if (randomEnemy > 0.25 && randomEnemy <= 0.5) {
        thisEnemies.push(patrolScene.AddEntity({ tag: 'enemy', obj: newSpinner(), canMove: true, attachedSprite: 'enemy' }));
    } else if (randomEnemy > 0.5 && randomEnemy <= 0.75) {
        thisEnemies.push(patrolScene.AddEntity({ tag: 'chaser', obj: newChaser(), canMove: true, attachedSprite: 'chaser' }));
    } else if (randomEnemy > 0.75) {
        thisEnemies.push(patrolScene.AddEntity({ tag: 'expander', obj: newExpander(), canMove: true, attachedSprite: 'expander' }));
    }
}

function resetEnemies() {
    patrolScene.RemoveEntityByTag('enemy');
    patrolScene.RemoveEntityByTag('spinner');
    patrolScene.RemoveEntityByTag('chaser');
    patrolScene.RemoveEntityByTag('expander');
    thisEnemies = [];
}
