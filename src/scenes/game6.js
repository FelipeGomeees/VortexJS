import { InputControl, MovementService, RenderService, Scene, SceneControl, SpriteControl, Vector2 } from "../modules/vortex.js";
import { player, playerMovement } from "../entities/game3/player.js";
import { newEnemy, enemyAI } from "../entities/game3/red.js";
import { checkCollision } from "../helpers/checkCollision.js";
import { AudioControl, Entity } from "../modules/vortex.js";
import { target } from "../entities/game3/target.js";
import { newSpinner, spinnerAI } from "../entities/game3/blue.js";
import { newChaser, chaserAI } from "../entities/game3/green.js";
import { newExpander, expanderAI } from "../entities/game3/purple.js";
import { FontControl } from "../modules/vortex/font/fontControl.js";
import { UIEntity } from "../modules/vortex/ui/ui.js";

const patrolScene = new Scene("enemyTest", "#faf", false);

let thisPlayer, thisTarget;
let thisEnemies = []

let points = 0;
let highScore = 0;

const UIScore = new UIEntity(
    {
        position: new Vector2(0, 0),
        size: new Vector2(100, 100), 
        color: "rgba(0, 0, 0, 0)", 
        visible: true,
        text: {
            font: 'pixel',
            size: 32,
            color: "#fff",
            content: ` SCORE: ${points} | HIGH SCORE: ${highScore}`,
        }
    })
    

let isPaused = false;
let pauseDelay = false;

let thisUI;

let theme;

patrolScene.setSetup(() => {

    FontControl.Load('pixel', 'src/assets/font/PixelifySans-Regular.ttf' );

    const overlay = new UIEntity({
        position: new Vector2(0, 0),
        size: new Vector2(RenderService.vw, RenderService.vh), 
        color: "rgba(0, 0, 0, 0.5)", 
        speed: 0,
        direction: new Vector2(0, 0),
        visible: false,
        children: [new UIEntity(
            {
                position: new Vector2(RenderService.vw / 2 - 100, RenderService.vh / 4),
                size: new Vector2(0, 0), 
                color: "rgba(0, 0, 0, 0)", 
                visible: true,
                text: {
                    font: 'pixel',
                    size: 32,
                    color: "#fff",
                    content: "PAUSED",
                }
            })
        ],
    });

    AudioControl.Load('bounce', 'src/assets/audio/bounce.wav');
    AudioControl.Load('defeat', 'src/assets/audio/defeat.wav');
    AudioControl.Load('victory', 'src/assets/audio/victory.wav');
    AudioControl.Load('stage', 'src/assets/audio/shop.mp3');
    AudioControl.Load('pause', 'src/assets/audio/pause.wav');

    SpriteControl.Load("player", "src/assets/img/player.png");
    SpriteControl.Load("enemy", "src/assets/img/enemy.png");
    SpriteControl.Load("target", "src/assets/img/checkpoint.png");
    SpriteControl.Load("spinner", "src/assets/img/blue.png");
    SpriteControl.Load("chaser", "src/assets/img/green.png");
    SpriteControl.Load("expander", "src/assets/img/purple.png");
    SpriteControl.Load("expander-big", "src/assets/img/purple2.png");

    thisUI = patrolScene.AddUIEntity({ tag: 'overlay', obj: overlay });
    patrolScene.AddUIEntity({ tag: 'score', obj: UIScore });

    thisPlayer = patrolScene.AddEntity({ tag: 'player', obj: player, canMove: true, attachedSprite: 'player' });

    generateEnemy();

    thisTarget = patrolScene.AddEntity({ tag: 'target', obj: target, canMove: false, attachedSprite: 'target' });

    console.log(newEnemy());
    console.log(newEnemy());
    thisTarget.obj.position = new Vector2(RenderService.vw - 50, RenderService.vh - 50)

    setTimeout(() => {
        theme = AudioControl.Play('stage', {
            volume: 0.2,
            loop: true,
        });   
    }, 1000);
});

patrolScene.setLoop(() => {
    if ( InputControl.IsPressed('enter')) {
        if (pauseDelay) {
            return;
        }
        pauseDelay = true;
        if (!isPaused) {
            MovementService.isActive = false;
            thisUI.obj.visible = true;
            theme.SetVolume(0.04);
            isPaused = true;
            AudioControl.Play('pause');
            setTimeout(() => {
                pauseDelay = false;
            }, 100);
        } else {
            MovementService.isActive = true;
            thisUI.obj.visible = false;
            theme.SetVolume(0.2);
            isPaused = false;
            AudioControl.Play('pause');
            setTimeout(() => {
                pauseDelay = false;
            }, 100);
        }
    }
    if (isPaused) {
        return;
    }
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
            points = 0;
            UIScore.SetText(` SCORE: ${points} | HIGH SCORE: ${highScore}`);
            resetEnemies();
            thisEnemies.push(patrolScene.AddEntity({ tag: 'enemy', obj: newEnemy(), canMove: true, attachedSprite: 'enemy' }));
        }
    }

    if (checkCollision(thisPlayer.obj, thisTarget.obj)) {
        AudioControl.Play('victory');
        points++;
        highScore = Math.max(points, highScore);
        UIScore.SetText(`SCORE: ${points} | HIGH SCORE: ${highScore}`);
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
