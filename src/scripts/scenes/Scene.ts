import { AudioManager } from "../managers/AudioManager";
import { renderTemplate } from "../utilities/Render";
import { Settings } from "../utilities/Settings";

class Scene {
    protected music: AudioManager;
    protected uiSound: AudioManager;
    protected viewportRootElement: HTMLElement;
    protected elements;

    constructor() {
        this.music = new AudioManager();
        this.uiSound = new AudioManager();
        this.viewportRootElement = document.querySelector("body main");
    }
    public load(){}

    protected bindEvents(){}
 
    public unload() {
        this.music.stop;
        this.viewportRootElement.innerHTML = "";
    }

    protected playGlobalUISound(source: string) {
        if (!Settings.allowMusic) return
        this.uiSound.setSource(source)
        this.uiSound.playOnce();
    }

     protected playLocalUISound(source: string) {
        if (!Settings.allowMusic) return
        const uiSound = new AudioManager;
        uiSound.setSource(source)
        uiSound.playOnce();
    }
}
export { Scene }