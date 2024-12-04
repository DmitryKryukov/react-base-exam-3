import { IUnit, Unit } from "../Unit";

class ShadowWatcher extends Unit implements IUnit {
    protected _id: string = "swu2"
    protected _name = "Shadow Watcher"

    public speed: number = 50;
    
    protected spriteSrcList: Record<string, string> = { 
        idleStateSrc: "./assets/shadow_watcher_idle.gif",
        runStateSrc: "./assets/shadow_watcher_run.gif",
        attackStateSrc: "./assets/shadow_watcher_attack.gif", 
        dieStateSrc: "./assets/shadow_watcher_die.gif",
    };

    protected voiceTrackArray = {
        voiceGreating: "./assets/shadow_watcher_greeting.m4a",
        voiceRun: "./assets/shadow_watcher_greeting.m4a",
        voiceAttack: "./assets/shadow_watcher_attack.m4a",
    };

    protected sfxTrackArray = {
        sfxAttack: "./assets/shadow_watcher_sfx_attack.m4a",
        sfxTakeDamage: "./assets/shadow_watcher_sfx_take_damage.m4a",
    };


    protected portraitSource: string = "./assets/shadow_watcher_portrait.png";

    protected hp: number = 15;
    protected sp: number = 25;

    public attackTime: number = 1040;
    protected attackDamageMin: number = 2;
    protected attackDamageMax: number = 8;

    constructor(){
        super();
        this.transform.size.x = 240;
        this.transform.size.y = 240;
        this.transform.x = 250;
        this.transform.y = 250;
        
        this.rootElement.style.setProperty("--sprite-x", "0");
        this.rootElement.style.setProperty("--sprite-y", "13px");

        this.rootElement.style.setProperty("--shadow-x", "-33%");
        this.rootElement.style.setProperty("--shadow-y", "-48%");
    }
}

export { ShadowWatcher };
