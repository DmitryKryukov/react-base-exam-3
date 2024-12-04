import { IUnit, Unit } from "../Unit";

class SunriseCleric extends Unit implements IUnit {
    protected _id: string = "scus"
    protected _name = "Sunrise Cleric"
    
    protected spriteSrcList: Record<string, string> = {
        idleStateSrc: "./assets/sunrise_cleric_idle.gif",
        runStateSrc: "./assets/sunrise_cleric_run.gif",
        attackStateSrc: "./assets/sunrise_cleric_attack.gif", 
        dieStateSrc: "./assets/sunrise_cleric_die.gif",
    };

    protected voiceTrackArray = {
        voiceGreating: "./assets/sunrise_cleric_greeting.mp3",
        voiceRun: "./assets/sunrise_cleric_run.mp3",
        voiceAttack: "./assets/sunrise_cleric_attack.mp3",
    };

    protected sfxTrackArray = {
        sfxAttack: "./assets/sunrise_cleric_sfx_attack.m4a",
        sfxTakeDamage: "./assets/sunrise_cleric_sfx_take_damage.m4a",
    };


    protected portraitSource: string = "./assets/sunrise_cleric_portrait.png";

    protected hp: number = 15;
    protected sp: number = 25;

    public attackTime: number = 1820;
    protected attackDamageMin: number = 1;
    protected attackDamageMax: number = 10;

    constructor(){
        super();
        this.transform.size.x = 340;
        this.transform.size.y = 340;
        this.transform.x = 250;
        this.transform.y = 250;
        
        this.rootElement.style.setProperty("--sprite-x", "0");
        this.rootElement.style.setProperty("--sprite-y", "9px");

        this.rootElement.style.setProperty("--shadow-x", "-56%");
        this.rootElement.style.setProperty("--shadow-y", "-68%");
    }
}

export { SunriseCleric };
