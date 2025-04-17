import { Scene } from "../modules/vortex.js";
import { player, playerMovement } from "../entities/player.js";
import { enemy, enemyAI } from "../entities/enemy.js";
import { checkCollision } from "../helpers/checkCollision.js";

const patrolScene = new Scene("enemyTest", "#222");

patrolScene.setSetup(() => {
    patrolScene.AddEntity({ tag: 'player', obj: player, canMove: true });
    patrolScene.AddEntity({ tag: 'enemy', obj: enemy, canMove: true });
});

patrolScene.setLoop(() => {
    playerMovement();
    enemyAI();

    if (checkCollision(player, enemy)) {
        console.log("💥 Player hit the enemy!");
    }
});

export default patrolScene;
