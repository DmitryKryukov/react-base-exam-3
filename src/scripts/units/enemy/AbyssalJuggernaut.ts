import { IUnit, Unit } from "../Unit";

class AbyssalJuggernaut extends Unit implements IUnit {
    protected _id: string = "aju"
    protected _name = "Abyssal Juggernaut"

    public speed: number = 50;
    
    protected spriteSrcList: Record<string, string> = { 
        idleStateSrc: "./assets/abyssal_juggernaut_idle.gif",
        runStateSrc: "./assets/abyssal_juggernaut_run.gif",
        attackStateSrc: "./assets/abyssal_juggernaut_attack.gif", 
        dieStateSrc: "./assets/abyssal_juggernaut_die.gif",
    };

    protected voiceTrackArray = {
        voiceGreating: "./assets/abyssal_juggernaut_greeting.m4a",
        voiceRun: "./assets/abyssal_juggernaut_greeting.m4a",
        voiceAttack: "./assets/abyssal_juggernaut_attack.m4a",
    };

    protected sfxTrackArray = {
        sfxAttack: "./assets/abyssal_juggernaut_sfx_attack.m4a",
        sfxTakeDamage: "./assets/abyssal_juggernaut_sfx_take_damage.m4a",
    };

    protected portraitSource: string = "./assets/abyssal_juggernaut_portrait.png";

    protected hp: number = 30;
    protected sp: number = 0;

    public attackTime: number = 1120;
    protected attackDamageMin: number = 9;
    protected attackDamageMax: number = 9;

    constructor(){
        super();
        this.transform.size.x = 300;
        this.transform.size.y = 300;
        this.transform.x = 250;
        this.transform.y = 250;

        this.rootElement.style.setProperty("--sprite-x", "0");
        this.rootElement.style.setProperty("--sprite-y", "32px");

        this.rootElement.style.setProperty("--shadow-x", "-55%");
        this.rootElement.style.setProperty("--shadow-y", "-73%");
    }
}

export { AbyssalJuggernaut };
