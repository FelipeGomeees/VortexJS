import { Scene } from "../modules/vortex.js";
import { player, playerMovement } from "../entities/player.js";
import { enemy, enemyAI } from "../entities/enemy.js";

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

function checkCollision(a, b) {
    return (
        a.position.x < b.position.x + b.size.x &&
        a.position.x + a.size.x > b.position.x &&
        a.position.y < b.position.y + b.size.y &&
        a.position.y + a.size.y > b.position.y
    );
}

export default patrolScene;
