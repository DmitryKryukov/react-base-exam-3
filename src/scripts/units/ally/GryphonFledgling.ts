import { IUnit, Unit } from "../Unit";

class GryphonFledgling extends Unit implements IUnit {
    protected _id: string = "gfu"
    protected _name = "Gryphon Fledgling"
    
    protected spriteSrcList: Record<string, string> = { 
        idleStateSrc: "./assets/gryphon_fledgling_idle.gif",
        runStateSrc: "./assets/gryphon_fledgling_run.gif",
        attackStateSrc: "./assets/gryphon_fledgling_attack.gif", 
        dieStateSrc: "./assets/gryphon_fledgling_die.gif",
    };

    protected voiceTrackArray = {
        voiceGreating: "./assets/gryphon_fledgling_greeting.mp3",
        voiceRun: "./assets/gryphon_fledgling_run.mp3",
        voiceAttack: "./assets/gryphon_fledgling_attack.mp3",
    };

    protected sfxTrackArray = {
        sfxAttack: "./assets/gryphon_fledgling_sfx_attack.m4a",
        sfxTakeDamage: "./assets/gryphon_fledgling_sfx_take_damage.m4a",
    };

    protected portraitSource: string = "./assets/gryphon_fledgling_portrait.png";

    public attackTime: number = 2380;
    protected attackDamageMin: number = 7;
    protected attackDamageMax: number = 12;

    constructor(){
        super();
        this.transform.size.x = 300;
        this.transform.size.y = 300;
        this.transform.x = 250;
        this.transform.y = 250;

        this.rootElement.style.setProperty("--sprite-x", "0");
        this.rootElement.style.setProperty("--sprite-y", "16px");

        this.rootElement.style.setProperty("--shadow-x", "-46%");
        this.rootElement.style.setProperty("--shadow-y", "-66%");
    }
}

export { GryphonFledgling };
