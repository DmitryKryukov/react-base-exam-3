import { IUnit, Unit } from "../Unit";

class SilverguardSquire extends Unit implements IUnit {
    protected _id: string = "ssu"
    protected _name = "Silverguard Squire"

    public speed: number = 50;
    
    protected spriteSrcList: Record<string, string> = { 
        idleStateSrc: "./assets/silverguard_squire_idle.gif",
        runStateSrc: "./assets/silverguard_squire_run.gif",
        attackStateSrc: "./assets/silverguard_squire_attack.gif", 
        dieStateSrc: "./assets/silverguard_squire_die.gif",
    };

    protected voiceTrackArray = {
        voiceGreating: "./assets/silverguard_squire_greeting.mp3",
        voiceRun: "./assets/silverguard_squire_run.mp3",
        voiceAttack: "./assets/silverguard_squire_attack.mp3",
    };

    protected sfxTrackArray = {
        sfxAttack: "./assets/silverguard_squire_sfx_attack.m4a",
        sfxTakeDamage: "./assets/silverguard_squire_sfx_take_damage.m4a",
    };

    protected portraitSource: string = "./assets/silverguard_squire_portrait.png";

    protected hp: number = 15;
    protected sp: number = 5;

    public attackTime: number = 910;
    protected attackDamageMin: number = 2;
    protected attackDamageMax: number = 5;

    constructor(){
        super();
        this.transform.size.x = 240;
        this.transform.size.y = 240;
        this.transform.x = 250;
        this.transform.y = 250;

        this.rootElement.style.setProperty("--sprite-x", `${-7 * this.transform.xDirection}px`);
        this.rootElement.style.setProperty("--sprite-y", "17px");
        
        this.rootElement.style.setProperty("--shadow-x", "-38%");
        this.rootElement.style.setProperty("--shadow-y", "-47%");
    }
    public flipX(){
        super.flipX();
        this.rootElement.style.setProperty("--sprite-x", `${-7 * this.transform.xDirection}px`);
    }
}

export { SilverguardSquire };
