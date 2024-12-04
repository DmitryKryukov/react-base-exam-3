import { Scene } from "../Scene";
import { renderTemplate } from "../../utilities/Render";
import { Settings } from "../../utilities/Settings";
import { AudioManager } from "../../managers/AudioManager";
import { SceneBattle } from "./SceneBattle";

class SceneMenu extends Scene {
    private freeze = true;

    constructor() {
        super();
        this.music.setSource("./assets/main-menu.mp3");
        this.uiSound.setSource("./assets/button-hover.mp3");
    }

    public load() {
        this.freeze = false;
        this.viewportRootElement.classList.add("scene--fade-in");
        this.viewportRootElement.classList.remove("scene--to-next");
        renderTemplate("#js-main-menu", this.viewportRootElement);
        this.updateElements();
        this.bindEvents();
        if (Settings.allowMusic) {
            this.elements.buttonToggleMusicElement.checked = true;
        }
    }

    protected updateElements() {
        this.elements = {
            menuMainElement: document.querySelector(".menu--main"),
            menuSettingsElement: document.querySelector(".menu--settings"),

            buttonPlayElement: document.getElementById("js-button-play"),
            buttonToggleMusicElement: document.getElementById("js-toggle-music"),
            buttonSettingsElement: document.getElementById("js-button-settings"),

            buttonToggleMusicHolderElement: document.querySelector(".toggle-holder:has(#js-toggle-music)"),

            buttonBackElement: document.getElementById("js-button-back"),
            buttonTogglePixelizationElement: document.getElementById("js-toggle-pixelization"),
            buttonToggleFSEffectsElement: document.getElementById("js-toggle-fs-effects"),
            buttonToggleMixBlendElement: document.getElementById("js-toggle-mix-blend"),

            buttonTogglePixelizationHolderElement: document.querySelector(".toggle-holder:has(#js-toggle-pixelization)"),
            buttonToggleFSEffectsHolderElement: document.querySelector(".toggle-holder:has(#js-toggle-fs-effects)"),
            buttonToggleMixBlendHolderElement: document.querySelector(".toggle-holder:has(#js-toggle-mix-blend)"),
        };
    }

    protected bindEvents(): void {
        const {
            buttonPlayElement,
            buttonToggleMusicElement,
            buttonSettingsElement,
            buttonToggleMusicHolderElement,
            buttonBackElement,
            buttonTogglePixelizationElement,
            buttonToggleMixBlendElement,
            buttonToggleFSEffectsElement,
            buttonTogglePixelizationHolderElement,
            buttonToggleFSEffectsHolderElement,
            buttonToggleMixBlendHolderElement
        } = this.elements;

        buttonToggleMusicElement.addEventListener('change', this.handleToggleMusic);
        
        const hoverElements = [
            buttonPlayElement,
            buttonToggleMusicHolderElement,
            buttonSettingsElement,
            buttonBackElement,
            buttonTogglePixelizationHolderElement,
            buttonToggleFSEffectsHolderElement,
            buttonToggleMixBlendHolderElement
        ];

        hoverElements.forEach(element => {
            element.addEventListener('mouseover', this.handleButtonOver);
        });

        buttonPlayElement.addEventListener("click", this.handlePlay);
        buttonSettingsElement.addEventListener("click", this.handleSettings);
        buttonBackElement.addEventListener('click', this.handleBack);

        const toggleEvents = [
            { holder: buttonToggleMusicHolderElement, toggle: buttonToggleMusicElement, handler: this.handleToggleMusic },
            { holder: buttonTogglePixelizationHolderElement, toggle: buttonTogglePixelizationElement, handler: this.handlePixelization },
            { holder: buttonToggleMixBlendHolderElement, toggle: buttonToggleMixBlendElement, handler: this.handleMixBlend },
            { holder: buttonToggleFSEffectsHolderElement, toggle: buttonToggleFSEffectsElement, handler: this.handleFSEffects }
        ];

        toggleEvents.forEach(({ holder, toggle, handler }) => this.setupToggleEvent(holder, toggle, handler));
    }

    private setupToggleEvent(holderElement: HTMLElement, toggleElement: HTMLInputElement, handler: EventListener): void {
        holderElement.addEventListener("click", (event) => {
            toggleElement.checked = !toggleElement.checked;
            handler(event);
        });
    }

    private handleButtonOver = (event: Event) => {
        this.playLocalUISound("./assets/button-hover.mp3");
    }

    private handleToggleMusic = (event: Event) => {
        const isChecked = (event.target as HTMLInputElement).checked;
        this.updateMusicSettings(isChecked);
    }

    private handlePlay = (event: Event) => {
        if (this.freeze) return;
        this.elements.menuMainElement.classList.add("freeze");
        this.elements.menuSettingsElement.classList.add("freeze");
        this.viewportRootElement.classList.add("scene--to-next");
    
        const eventToDispatch = new CustomEvent("loadnextscene", {
            detail: { scene: new SceneBattle() }
        });
        setTimeout(() => {
            document.dispatchEvent(eventToDispatch);
        }, 1000);
    
        if (!Settings.allowMusic) return;
        
        this.freeze = true;
    
        this.playGlobalUISound("./assets/button-to-battle.mp3");
    
        this.music.setVolume(0, 0.5);
    }
    

    private handleSettings = (event: Event) => {
        this.elements.menuMainElement.classList.remove("menu--show");
        this.elements.menuSettingsElement.classList.add("menu--show");
        this.playGlobalUISound("./assets/button-to-settings.mp3");
        this.temporaryFreezeMenus();
    }

    private handleBack = (event: Event) => {
        this.elements.menuMainElement.classList.add("menu--show");
        this.elements.menuSettingsElement.classList.remove("menu--show");
        this.playGlobalUISound("./assets/button-to-settings.mp3");
        this.temporaryFreezeMenus();
    }

    private temporaryFreezeMenus(time?: number) {
        this.elements.menuMainElement.classList.add("freeze");
        this.elements.menuSettingsElement.classList.add("freeze");
        this.playGlobalUISound("./assets/button-to-settings.mp3");
        setTimeout(() => {
            this.elements.menuMainElement.classList.remove("freeze");
            this.elements.menuSettingsElement.classList.remove("freeze");
        }, time || 500);
    }

    private handlePixelization = (event: Event) => {
        document.body.classList.toggle("not-pixelization");
        this.playLocalUISound("./assets/toggle-change.mp3");
    }

    private handleMixBlend = (event: Event) => {
        document.body.classList.toggle("not-blend-modes");
        this.playLocalUISound("./assets/toggle-change.mp3");
    }

    private handleFSEffects = (event: Event) => {
        document.body.classList.toggle("not-fs-effects");
        this.playLocalUISound("./assets/toggle-change.mp3");
    }

    private updateMusicSettings(isChecked: boolean) {
        Settings.allowMusic = !Settings.allowMusic;

        const uiSound = new AudioManager();
        uiSound.setSource("./assets/toggle-change.mp3");

        if (Settings.allowMusic) {
            this.music.playLoop();
            Settings.musicVolumeFactor = 1;
        } else {
            Settings.musicVolumeFactor = 0;
        }

        uiSound.playOnce();
        uiSound.setVolume(Settings.musicVolumeFactor, 0.5);
        this.music.setVolume(Settings.musicVolumeFactor * 0.25, 0.5);
    }
}

export { SceneMenu };
