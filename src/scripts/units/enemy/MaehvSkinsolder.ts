import { IUnit, Unit } from "../Unit";

class MaehvSkinsolder extends Unit implements IUnit {
    protected _id: string = "msu"
    protected _name = "Maehv Skinsolder"
    
    protected spriteSrcList: Record<string, string> = { 
        idleStateSrc: "./assets/maehv_skinsolder_idle.gif",
        runStateSrc: "./assets/maehv_skinsolder_run.gif",
        attackStateSrc: "./assets/maehv_skinsolder_attack.gif", 
        dieStateSrc: "./assets/maehv_skinsolder_die.gif",
    };

    protected voiceTrackArray = {
        voiceGreating: "./assets/maehv_skinsolder_greeting.m4a",
        voiceRun: "./assets/maehv_skinsolder_greeting.m4a",
        voiceAttack: "./assets/maehv_skinsolder_attack.m4a",
    };

    protected sfxTrackArray = {
        sfxAttack: "./assets/maehv_skinsolder_sfx_attack.m4a",
        sfxTakeDamage: "./assets/maehv_skinsolder_sfx_take_damage.m4a",
    };

    protected portraitSource: string = "./assets/maehv_skinsolder_portrait.png";

    protected hp: number = 30;
    protected sp: number = 25;
    
    public attackTime: number = 2000;
    protected attackDamageMin: number = 6;
    protected attackDamageMax: number = 16;

    constructor(){
        super();
        this.transform.size.x = 390;
        this.transform.size.y = 390;
        this.transform.x = 250;
        this.transform.y = 250;
        
        this.rootElement.style.setProperty("--sprite-x", "0");
        this.rootElement.style.setProperty("--sprite-y", "18px");

        this.rootElement.style.setProperty("--shadow-x", "-69%");
        this.rootElement.style.setProperty("--shadow-y", "-91%");
        
    }
}

export { MaehvSkinsolder };
