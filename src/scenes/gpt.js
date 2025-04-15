import { Scene, Entity, Vector2, Vortex } from "../modules/vortex.js";

const $S = new Scene("forest", "#000000");
const pressedKeys = {};

let player = new Entity(new Vector2(50, 50), new Vector2(100, 100), "#FF0000");

// Moving Obstacle
let movingObstacle = new Entity(new Vector2(300, 150), new Vector2(50, 50), "#FFFF00");

// Goal Area
let goalArea = null;
console.log(goalArea)

// Movement direction for the obstacle (we use velocity components for direction)
let obstacleVelocity = new Vector2(6, 6); // Initial velocity (x, y)

$S.setSetup(() => {
    $S.addEntity(player);
    $S.addEntity(movingObstacle);
    goalArea = new Entity(
        new Vector2(Vortex.vw - 200, Vortex.vh - 200),
        new Vector2(100, 100),
        "#00FF00"
    );    
    $S.addEntity(goalArea);
});

// Function to check if the player is colliding with any entity
function checkCollision(player, entity) {
    return player.position.x < entity.position.x + entity.size.x &&
           player.position.x + player.size.x > entity.position.x &&
           player.position.y < entity.position.y + entity.size.y &&
           player.position.y + player.size.y > entity.position.y;
}

// Function to move the obstacle (bouncing logic)
function moveObstacle(delta) {
    // Move the obstacle by the velocity vector
    movingObstacle.position = movingObstacle.position.Add(obstacleVelocity);

    // Bounce off the top or bottom (vertical bounds)
    if (movingObstacle.position.y <= 0 || movingObstacle.position.y + movingObstacle.size.y >= Vortex.vh) {
        obstacleVelocity.y = -obstacleVelocity.y; // Reverse vertical direction
    }

    // Bounce off the left or right (horizontal bounds)
    if (movingObstacle.position.x <= 0 || movingObstacle.position.x + movingObstacle.size.x >= Vortex.vw) {
        obstacleVelocity.x = -obstacleVelocity.x; // Reverse horizontal direction
    }
}

// Check if the player reaches the goal
function checkGoal(player, goal) {
    if (checkCollision(player, goal)) {
        alert("You Win!");
        player.position = new Vector2(50, 50); // Reset player position
    }
}

$S.setLoop((delta) => {
    let inputDirection = new Vector2(0, 0);

    if (pressedKeys["d"]) inputDirection = inputDirection.Add(new Vector2(1, 0));
    if (pressedKeys["a"]) inputDirection = inputDirection.Add(new Vector2(-1, 0));
    if (pressedKeys["w"]) inputDirection = inputDirection.Add(new Vector2(0, -1));
    if (pressedKeys["s"]) inputDirection = inputDirection.Add(new Vector2(0, 1));

    if (!inputDirection.Equals(new Vector2(0, 0))) {
        const normalized = inputDirection.Normalize();

        let speed = 4;
        if (pressedKeys["shift"]) speed = 8;
        const velocity = normalized.Scale(speed);

        // Move player
        player.position = player.position.Add(velocity);
    }

    moveObstacle(delta); // Move the obstacle (with bounce logic)

    // Check if the player collides with the moving obstacle
    if (checkCollision(player, movingObstacle)) {
        alert("You Lose! Try again.");
        player.position = new Vector2(50, 50); // Reset player position
    }

    // Check if the player reaches the goal area
    checkGoal(player, goalArea);

    const fps = 1000 / delta;
    // console.log(`${fps.toFixed(1)} FPS`);
});

export default $S;
