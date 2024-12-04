import { IUnit, Unit } from "../Unit";

class Indominus extends Unit implements IUnit {
    protected _id: string = "ius"
    protected _name = "Indominus"

    public speed: number = 30;
    
    protected spriteSrcList: Record<string, string> = { 
        idleStateSrc: "./assets/indominus_idle.gif",
        runStateSrc: "./assets/indominus_run.gif",
        attackStateSrc: "./assets/indominus_attack.gif", 
        dieStateSrc: "./assets/indominus_die.gif",
    };

    protected voiceTrackArray = {
        voiceGreating: "./assets/indominus_greeting.mp3",
        voiceRun: "./assets/indominus_run.mp3",
        voiceAttack: "./assets/indominus_attack.mp3",
    };

    protected sfxTrackArray = {
        sfxAttack: "./assets/indominus_sfx_attack.m4a",
        sfxTakeDamage: "./assets/indominus_sfx_take_damage.m4a",
    };

    protected portraitSource: string = "./assets/indominus_portrait.png";

    protected hp: number = 30;
    protected sp: number = 0;

    public attackTime: number = 2030;
    protected attackDamageMin: number = 6;
    protected attackDamageMax: number = 12;

    constructor(){
        super();
        this.transform.size.x = 300;
        this.transform.size.y = 300;
        this.transform.x = 250;
        this.transform.y = 250;

        this.rootElement.style.setProperty("--sprite-x", "0");
        this.rootElement.style.setProperty("--sprite-y", "16px");

        this.rootElement.style.setProperty("--shadow-x", "-58%");
        this.rootElement.style.setProperty("--shadow-y", "-50%");
    }
}

export { Indominus };
