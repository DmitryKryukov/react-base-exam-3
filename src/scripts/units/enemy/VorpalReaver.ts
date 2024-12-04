import { IUnit, Unit } from "../Unit";

class VorpalReaver extends Unit implements IUnit {
    protected _id: string = "vru"
    protected _name = "Vorpal Reaver"
    
    protected spriteSrcList: Record<string, string> = { 
        idleStateSrc: "./assets/vorpal_reaver_idle.gif",
        runStateSrc: "./assets/vorpal_reaver_run.gif",
        attackStateSrc: "./assets/vorpal_reaver_attack.gif", 
        dieStateSrc: "./assets/vorpal_reaver_die.gif",
    };

    protected voiceTrackArray = {
        voiceGreating: "./assets/vorpal_reaver_greeting.m4a",
        voiceRun: "./assets/vorpal_reaver_greeting.m4a",
        voiceAttack: "./assets/vorpal_reaver_attack.m4a",
    };

    protected sfxTrackArray = {
        sfxAttack: "./assets/vorpal_reaver_sfx_attack.m4a",
        sfxTakeDamage: "./assets/vorpal_reaver_sfx_take_damage.m4a",
    };

    protected portraitSource: string = "./assets/vorpal_reaver_portrait.png";

    public attackTime: number = 1028;
    protected attackDamageMin: number = 9;
    protected attackDamageMax: number = 12;

    constructor(){
        super();
        this.transform.size.x = 300;
        this.transform.size.y = 300;
        this.transform.x = 250;
        this.transform.y = 250;

        this.rootElement.style.setProperty("--sprite-x", "0");
        this.rootElement.style.setProperty("--sprite-y", "16px");

        this.rootElement.style.setProperty("--shadow-x", "-57%");
        this.rootElement.style.setProperty("--shadow-y", "-57%");
    }
}

export { VorpalReaver };
