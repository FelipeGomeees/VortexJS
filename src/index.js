
// From the package
import { Vortex } from "./modules/vortex.js";

// Custom made scene
import firstScene from "./scenes/game6.js";

window.addEventListener("DOMContentLoaded", Vortex.Start({
    scene: firstScene,
    preload: {
        sprites: [
            { key: "player", url: "./assets/img/player.png" },
            { key: "enemy", url: "./assets/img/enemy.png" },
            { key: "target", url: "./assets/img/target.png" },
        ],
        audio: [
            { key: "bounce", url: "./assets/audio/bounce.wav" },
            { key: "defeat", url: "./assets/audio/defeat.wav" },
            { key: "victory", url: "./assets/audio/victory.wav" },
        ]
    }
}));
