import { Debug } from "../utilities/Debug";
import { ObjectPool } from "../utilities/ObjectPool";
import { GameObject } from "./GameObject";
import { ITransform } from "./Transform";
import { SpriteRenderer } from "./SpriteRenderer";

interface ISpriteObject {
    readonly id: string;
    readonly transform: ITransform;
    readonly spriteRenderer: SpriteRenderer;
    readonly rootElement: HTMLElement;
    readonly spriteElement: HTMLImageElement;
    render(): void;
}

class SpriteObject extends GameObject implements ISpriteObject {

    protected _spriteRenderer: SpriteRenderer;
    protected _spriteElement: HTMLImageElement;

    constructor() {
        super();
        this._spriteRenderer = new SpriteRenderer();
        this.spriteRenderer.spriteSrc = (Debug.isDebug || this.isDebug) ? './assets/Brome_Warcrest_Idle.gif' : null;

        this._spriteElement = document.createElement('img');
        this._spriteElement.className = 'sprite';
    }

    get spriteRenderer() {
        return this._spriteRenderer;
    }

    get spriteElement() {
        return this._spriteElement;
    }

    public render(): void {
        super.render()
        this.spriteElement.style.width = `${this.transform.size.x}px`;
        this.spriteElement.style.height = `${this.transform.size.y}px`;
        this.spriteElement.style.left = `-${this.transform.size.x / 2  -50}px`;
        this.spriteElement.style.bottom = "0";

        this.spriteElement.style.transform = `scale(${this.transform.xDirection}, ${this.transform.yDirection})`;
        this.spriteElement.src = this.spriteRenderer.spriteSrc;
        this.spriteElement.draggable = false;
        if (!this.rootElement.contains(this.spriteElement)) {
            this.rootElement.appendChild(this.spriteElement);
        }
    }

    public moveTo(x: number, y: number) {
        this._transform.x = x + this._transform.pivot.x;
        this._transform.y = y + this._transform.pivot.y;
        this.spriteElement.style.zIndex = String(1000 + this.transform.y);
        
        this.render();
    }

    public flipX() {
        this._transform.xDirection *= -1;
        this.render();
    }

    public flipY() {
        this._transform.yDirection *= -1;
        this.render();
    }

    public static instantiate(object: SpriteObject): SpriteObject {
        ObjectPool.push(object);
        return object;
    }

}

export { ISpriteObject, SpriteObject };
