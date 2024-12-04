import { Scene } from "../Scene";
import { renderTemplate } from "../../utilities/Render";
import { SceneMenu } from "./SceneMenu";
import { AssetManager } from "../../managers/AssetsManager";

class SceneLoad extends Scene {
    private assetLoader: AssetManager;

    constructor() {
        super();
        this.assetLoader = new AssetManager([
            './assets/battlemap1_background.png',
            './assets/battlemap2_middleground.png',

            './assets/fog.gif',
            './assets/game-logo.png',
            './assets/main-menu-background.png',

            './assets/battlemusic-2.wav',
            './assets/main-menu.mp3',

            './assets/button-hover.mp3',
            './assets/button-to-battle.mp3',
            './assets/button-to-settings.mp3',
            './assets/toggle-change.mp3',
        ]);

    }

    public load() {
        renderTemplate("#js-load", this.viewportRootElement);
        this.updateElements();
        this.bindEvents();
        this.assetLoader.loadAssets(() => {
            const eventToDispatch = new CustomEvent("loadnextscene", {
                detail: { scene: new SceneMenu() }
            });
            document.dispatchEvent(eventToDispatch);
        });
    }

    protected updateElements() {
        this.elements = {
        };
    }

    protected bindEvents(): void {

    }

}

export { SceneLoad };