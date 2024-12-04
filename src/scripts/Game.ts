import { SceneManager } from "./scenes/SceneManager";
import { SceneMenu } from "./scenes/scenes/SceneMenu";
import { SceneBattle } from "./scenes/scenes/SceneBattle";
import { SceneLoad } from "./scenes/scenes/SceneLoad";

class Game {
    private sceneManager: SceneManager;

    constructor() {
        this.sceneManager = new SceneManager;
        this.sceneManager.loadScene(new SceneLoad);
    }
}

export { Game };