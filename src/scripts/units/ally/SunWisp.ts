import { IUnit, Unit } from "../Unit";

class SunWisp extends Unit implements IUnit {
    protected _id: string = "swu"
    protected _name = "Sun Wisp"
    
    protected spriteSrcList: Record<string, string> = { 
        idleStateSrc: "./assets/sun_wisp_idle.gif",
        runStateSrc: "./assets/sun_wisp_run.gif",
        attackStateSrc: "./assets/sun_wisp_attack.gif", 
        dieStateSrc: "./assets/sun_wisp_die.gif",
    };

    protected voiceTrackArray = {
        voiceGreating: "./assets/sun_wisp_greeting.mp3",
        voiceRun: "./assets/sun_wisp_run.mp3",
        voiceAttack: "./assets/sun_wisp_attack.mp3",
    };

    protected sfxTrackArray = {
        sfxAttack: "./assets/sun_wisp_sfx_attack.m4a",
        sfxTakeDamage: "./assets/sun_wisp_sfx_take_damage.m4a",
    };

    protected portraitSource: string = "./assets/sun_wisp_portrait.png";

    protected hp: number = 8;
    protected sp: number = 0;


    protected attackDamageMin: number = 1;
    protected attackDamageMax: number = 3;
    public attackTime: number = 1750;

    constructor(){
        super();
        this.transform.size.x = 240;
        this.transform.size.y = 240;
        this.transform.x = 250;
        this.transform.y = 250;
    
        this.rootElement.style.setProperty("--sprite-x", "0");
        this.rootElement.style.setProperty("--sprite-y", "9px");

        this.rootElement.style.setProperty("--shadow-x", "-30%");
        this.rootElement.style.setProperty("--shadow-y", "-44%");
    }
}

export { SunWisp };
