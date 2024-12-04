import { Scene } from "./Scene";
class SceneManager {
    private currentScene: Scene;
    constructor() {
        document.addEventListener("loadnextscene", (event: CustomEvent)=> {
            this.loadScene(event.detail.scene);
        })
    }
    
    public loadScene(scene: Scene): void {
        if (this.currentScene) this.currentScene.unload();

        this.currentScene = scene;
        this.currentScene.load();
    }

}
export { SceneManager }