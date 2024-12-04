import { IUnit, Unit } from "../Unit";
import { Settings } from "../../utilities/Settings";

class BromeWarcrest extends Unit implements IUnit {
    protected _id: string = "bwu"
    protected _name = "Brome Warcrest"
    
    protected spriteSrcList: Record<string, string> = { 
        idleStateSrc: "./assets/brome_warcrest_idle.gif",
        runStateSrc: "./assets/brome_warcrest_run.gif",
        attackStateSrc: "./assets/brome_warcrest_attack.gif", 
        dieStateSrc: "./assets/brome_warcrest_die.gif",
    };

    protected voiceTrackArray = {
        voiceGreating: "./assets/brome_warcrest_greeting.mp3",
        voiceRun: "./assets/brome_warcrest_run.mp3",
        voiceAttack: "./assets/brome_warcrest_attack.mp3",
    };

    protected sfxTrackArray = {
        sfxAttack: "./assets/brome_warcrest_sfx_attack.m4a",
        sfxTakeDamage: "./assets/brome_warcrest_sfx_take_damage.m4a",
    };

    protected portraitSource: string = "./assets/brome_warcrest_portrait.png";

    protected hp: number = 32;
    protected sp: number = 25;

    protected attackDamageMin: number = 4;
    protected attackDamageMax: number = 10;
    public attackTime: number = 2240;

    constructor(){
        super();
        this.transform.size.x = 390;
        this.transform.size.y = 390;
        this.transform.x = 250;
        this.transform.y = 250;
        
        this.rootElement.style.setProperty("--sprite-x", "0");
        this.rootElement.style.setProperty("--sprite-y", "18px");

        this.rootElement.style.setProperty("--shadow-x", "-70%");
        this.rootElement.style.setProperty("--shadow-y", "-87%");
        
    }

    public defenceUp(): void {
        super.defenceUp();
        this.defence = 2;
        this.renderUI();
    }

    public toggleActive(): void {
        this.isActive = !this.isActive;
        this._rootElement.classList.toggle('unit--active', this.isActive);
        if (this.isActive) {
            this.renderUI();
            if (!Settings.allowMusic) return
            this.voice.setSource(this.voiceTrackArray.voiceGreating);
            this.voice.playOnce()
        }
    }
}

export { BromeWarcrest };
