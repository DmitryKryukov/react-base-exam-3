import { IUnit, Unit } from "../Unit";

class BloodSiren extends Unit implements IUnit {
    protected _id: string = "bsu"
    protected _name = "Blood Siren"
    
    protected spriteSrcList: Record<string, string> = { 
        idleStateSrc: "./assets/blood_siren_idle.gif",
        runStateSrc: "./assets/blood_siren_run.gif",
        attackStateSrc: "./assets/blood_siren_attack.gif", 
        dieStateSrc: "./assets/blood_siren_die.gif",
    };

    protected voiceTrackArray = {
        voiceGreating: "./assets/blood_siren_greeting.m4a",
        voiceRun: "./assets/blood_siren_greeting.m4a",
        voiceAttack: "./assets/blood_siren_attack.m4a",
    };

    protected sfxTrackArray = {
        sfxAttack: "./assets/blood_siren_sfx_attack.m4a",
        sfxTakeDamage: "./assets/blood_siren_sfx_take_damage.m4a",
    };

    protected portraitSource: string = "./assets/blood_siren_portrait.png";

    protected hp: number = 15;
    protected sp: number = 5;

    public attackTime: number = 1120;
    protected attackDamageMin: number = 2;
    protected attackDamageMax: number = 5;

    constructor(){
        super();
        this.transform.size.x = 240;
        this.transform.size.y = 240;
        this.transform.x = 250;
        this.transform.y = 250;

        this.rootElement.style.setProperty("--sprite-x", "0px");
        this.rootElement.style.setProperty("--sprite-y", "6px");
        
        this.rootElement.style.setProperty("--shadow-x", "-38%");
        this.rootElement.style.setProperty("--shadow-y", "-47%");
    }
}

export { BloodSiren };
