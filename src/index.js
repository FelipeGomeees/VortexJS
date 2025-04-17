
// From the package
import { Vortex } from "./modules/vortex.js";

// Custom made scene
import firstScene from "./scenes/game1.js";

window.addEventListener("DOMContentLoaded", Vortex.Start({
    scene: firstScene,
}));
