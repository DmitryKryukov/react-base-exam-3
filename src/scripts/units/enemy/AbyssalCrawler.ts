import { IUnit, Unit } from "../Unit";

class AbyssalCrawler extends Unit implements IUnit {
    protected _id: string = "acu"
    protected _name = "Abbyssal Crawler"
    
    protected spriteSrcList: Record<string, string> = { 
        idleStateSrc: "./assets/abyssal_crawler_idle.gif",
        runStateSrc: "./assets/abyssal_crawler_run.gif",
        attackStateSrc: "./assets/abyssal_crawler_attack.gif", 
        dieStateSrc: "./assets/abyssal_crawler_die.gif",
    };

    protected voiceTrackArray = {
        voiceGreating: "./assets/abyssal_crawler_greeting.m4a",
        voiceRun: "./assets/abyssal_crawler_greeting.m4a",
        voiceAttack: "./assets/abyssal_crawler_attack.m4a",
    };

    protected sfxTrackArray = {
        sfxAttack: "./assets/abyssal_crawler_sfx_attack.m4a",
        sfxTakeDamage: "./assets/abyssal_crawler_sfx_take_damage.m4a",
    };


    protected portraitSource: string = "./assets/abyssal_crawler_portrait.png";

    protected hp: number = 8;
    protected sp: number = 0;

    public attackTime: number = 700;
    protected attackDamageMin: number = 2;
    protected attackDamageMax: number = 3;

    constructor(){
        super();
        this.transform.size.x = 240;
        this.transform.size.y = 240;
        this.transform.x = 250;
        this.transform.y = 250;
    
        this.rootElement.style.setProperty("--sprite-x", `${10 * this.transform.xDirection}px`);
        this.rootElement.style.setProperty("--sprite-y", "14px");

        this.rootElement.style.setProperty("--shadow-x", "-46%");
        this.rootElement.style.setProperty("--shadow-y", "-45%");
    }

    public flipX(){
        super.flipX();
        this.rootElement.style.setProperty("--sprite-x", `${10 * this.transform.xDirection}px`);
    }
}

export { AbyssalCrawler };
