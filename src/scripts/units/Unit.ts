import { ObjectPool } from "../utilities/ObjectPool";
import { SpriteObject } from "../objects/SpriteObject";
import { ITransform } from "../objects/Transform";
import { SpriteRenderer } from "../objects/SpriteRenderer";
import { calculateDistance } from "../utilities/Vector";
import { AudioManager } from "../managers/AudioManager";
import { Settings } from "../utilities/Settings";
import { renderTemplate } from "../utilities/Render";
import { getRandomInt } from "../utilities/Math";

enum UnitState {
    Idle,
    Run,
    Attack,
    Die
}

interface IUnit {
    readonly id: string;
    readonly transform: ITransform;
    readonly spriteRenderer: SpriteRenderer;
    readonly rootElement: HTMLElement;
    readonly spriteElement: HTMLImageElement;

    readonly name: string;
    readonly description: string;

    isActive: boolean;

    readonly state: UnitState;
    idle(): void;
    run(): void;
    attack(): void;
    die(): void;
    render(): void;
}

class Unit extends SpriteObject implements IUnit {

    public enemy = false;

    protected _name: string;
    protected _description: string;

    protected spriteSrcList: Record<string, string> = {
        idleStateSrc: "",
        runStateSrc: "",
        attackStateSrc: "",
        dieStateSrc: "",
    };

    protected _shadowElement: HTMLElement;
    protected _shadowImageElement: HTMLImageElement;

    public speed: number = 80;

    public isActive: boolean = false;

    protected voice: AudioManager;
    protected voiceTrackArray = {
        voiceGreating: "src",
        voiceRun: "src",
        voiceAttack: "src"
    };
    protected sfx: AudioManager;
    protected sfxTrackArray = {
        sfxAttack: "src",
        sfxTakeDamage: "src",
    };

    protected _state: UnitState;

    protected _uiElement: HTMLElement;

    protected unitUINameElement: HTMLElement;
    protected unitUIHPElement: HTMLElement;
    protected unitUIDefenceElement: HTMLElement;

    protected hp: number = 25;
    protected sp: number = 25;
    protected defence: number = 0;

    protected attackDamageMin: number = 1;
    protected attackDamageMax: number = 5;

    protected portraitSource: string = "";
    public runToAttack: boolean = false;
    public attackTime: number = 2000;

    constructor() {
        super();

        this._shadowElement = document.createElement('div');
        this._shadowElement.className = 'shadow';
        this._shadowImageElement = document.createElement('img');
        this._shadowImageElement.className = 'shadow__inner';

        this._uiElement = document.createElement('div');
        this._uiElement.className = 'unit-ui-wrapper';

        this.voice = new AudioManager();
        this.sfx = new AudioManager();
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._name;
    }

    get state() {
        return this._state;
    }

    get shadowElement() {
        return this.shadowElement
    }


    public render(): void {
        super.render()
        this._shadowElement.style.width = `${this.transform.size.x}px`;
        this._shadowElement.style.height = `${this.transform.size.y}px`;
        this._shadowImageElement.src = this.spriteRenderer.spriteSrc;
        this._shadowImageElement.draggable = false;
        this._shadowImageElement.style.transform = `skew(-45deg, 0) scaleY(0.5) scaleX(${this.transform.xDirection})`;

        if (!this.rootElement.contains(this._shadowElement)) {
            this.rootElement.appendChild(this._shadowElement);
        }

        if (!this.rootElement.contains(this._uiElement)) {
            this.rootElement.appendChild(this._uiElement);
        }

        if (!this._shadowElement.contains(this._shadowImageElement)) {
            this._shadowElement.appendChild(this._shadowImageElement);
        }
        this.renderUI();
        this.rootElement.classList.add("unit");

    }
    public renderUI(): void {
        this._uiElement.innerHTML = "";
        renderTemplate("#js-unit-interface", this._uiElement, (fragment) => {
            this.unitUINameElement = fragment.querySelector(".unit-ui-wrapper__name");
            this.unitUIHPElement = fragment.querySelector(".unit-ui-wrapper__hp");
            this.unitUIDefenceElement = fragment.querySelector(".unit-ui-wrapper__defence");
            this.unitUINameElement.textContent = this.name;
            this.unitUIHPElement.textContent = this.hp.toString();
            this.unitUIDefenceElement.textContent = this.defence.toString();
            this.unitUIDefenceElement.parentElement.classList.toggle('hide', this.defence == 0);
        })
    }

    public idle(): void {
        this.spriteRenderer.spriteSrc = this.spriteSrcList.idleStateSrc;
        this._state = UnitState.Idle;
        this.render();
    }

    public run(): void {
        this.spriteRenderer.spriteSrc = this.spriteSrcList.runStateSrc;
        this._state = UnitState.Run;
        this.render();

        if (!Settings.allowMusic) return
        this.voice.setSource(this.voiceTrackArray.voiceRun);
        this.voice.playOnce()
    }

    public attack(): void {
        this.runToAttack = false;
        this.spriteRenderer.spriteSrc = this.spriteSrcList.attackStateSrc;
        this._state = UnitState.Attack;
        this.render();

        setTimeout(() => {
            this.toIdle();

        }, this.attackTime);


        if (!Settings.allowMusic) return
        this.voice.setSource(this.voiceTrackArray.voiceAttack);
        this.voice.playOnce()
    }

    public die(): void {
        this.spriteRenderer.spriteSrc = this.spriteSrcList.dieStateSrc;
        this._state = UnitState.Die;
        this.render();
        const eventToDispatch = new CustomEvent("unitdied", {
            detail: { unit: this }
        });
        this.rootElement.classList.add("unit--died");
        document.dispatchEvent(eventToDispatch);
    }

    private handleToIdle = (event) => {
        this.toIdle();
    }

    private toIdle() {
        this.rootElement.removeEventListener('transitionend', this.handleToIdle);
        const eventToDispatch = new CustomEvent("unitrunend", {
            detail: {}
        });
        if (this.state != UnitState.Attack) {
            this.idle();
            document.dispatchEvent(eventToDispatch);
        }
        else {
            this.idle();
            setTimeout(() => {
                document.dispatchEvent(eventToDispatch);
            }, 1000);

        }

    }

    public moveTo(x: number, y: number) {
        if (this._transform.x == x + this._transform.pivot.x && this._transform.y == y + this._transform.pivot.y) return;
        if (this.state != UnitState.Idle) return;

        if ((x < this.transform.x && this.transform.xDirection == 1) || (x > this.transform.x && this.transform.xDirection == -1)) {
            this.flipX();
        }

        this.run();

        this.rootElement.style.setProperty("--run-speed", `${calculateDistance(x + this.transform.pivot.x, y + this.transform.pivot.y, this.transform.x, this.transform.y) / this.speed / 10}s`)

        super.moveTo(x, y);

        this.rootElement.addEventListener('transitionend', this.handleToIdle);
    }

    public moveToInstant(x: number, y: number) {
        super.moveTo(x, y);
    }

    public toggleActive(): void {
        this.isActive = !this.isActive;
        this._rootElement.classList.toggle('unit--active', this.isActive);
        if (this.isActive) {
            this.defence = 0;
            this.renderUI();
            if (!Settings.allowMusic) return
            this.voice.setSource(this.voiceTrackArray.voiceGreating);
            this.voice.playOnce()
        }
    }

    public defenceUp(): void {
        this.defence = 1;
        this.rootElement.classList.add("unit--defence-up");
        this.renderUI();
        setTimeout(() => {
            this.rootElement.classList.remove("unit--defence-up");
        }, 300);
    }
    public defenceDown(): void {
        this.defence = 0;
        this.renderUI();
    }

    public getHp(): number {
        return this.hp;
    }

    public getDefence(): number {
        return this.defence;
    }

    public getAttackString(): string {
        return `${this.attackDamageMin}—${this.attackDamageMax}`;
    }
    public getPortraitSource(): string {
        return this.portraitSource;
    }

    public static instantiate(object: Unit): Unit {
        ObjectPool.push(object);
        return object;
    }

    public hover() {
        this.rootElement.classList.add("unit--hovered");
    }

    public unhover() {
        this.rootElement.classList.remove("unit--hovered");
    }

    public setEnemy() {
        this.flipX();
        this.enemy = true;
        this.rootElement.classList.add("unit--enemy");
        this.rootElement.style.setProperty("--active-color", "red");
    }

    public setAlly() {
        this.enemy = false;
        this.rootElement.classList.add("unit--ally");
        this.rootElement.style.setProperty("--active-color", "gold");
    }

    public takeDamage(damage: number) {
        console.log(this.name + ' получил пизды')
        this.defence -= damage;
        if (this.defence < 0) {
            this.hp -= Math.abs(this.defence);
            this.defence = 0;
        }
        this.hp = Math.max(this.hp, 0);
        this.renderUI();
        this._uiElement.querySelector('.unit-ui-taken-damage').textContent = `−${damage}`;
        this.rootElement.classList.add("unit--damaging");
        if (Settings.allowMusic) {
            this.sfx.setSource(this.sfxTrackArray.sfxTakeDamage);
            this.sfx.playOnce()
        }
        setTimeout(() => {
            this.rootElement.classList.remove("unit--damaging");
            if (this.hp == 0) {
                this.die();
            }
        }, 1000);
    }

    public getDamage(): number {
        console.log(this.name + ' даёт пизды')
        if (Settings.allowMusic) {
            this.sfx.setSource(this.sfxTrackArray.sfxAttack);
            this.sfx.playOnce()
        }
        return getRandomInt(this.attackDamageMin, this.attackDamageMax);
    }
}



export { IUnit, Unit, UnitState };
