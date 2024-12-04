import { ObjectPool } from "../utilities/ObjectPool";
import { EngineObject } from "./EngineObject";
import { ITransform, Transform } from "./Transform";
import { Debug } from "../utilities/Debug";

interface IGameObject {
    readonly id: string;
    readonly transform: ITransform;
    readonly rootElement: HTMLElement;
    render(): void;
}

class GameObject extends EngineObject implements IGameObject {
    protected _transform: ITransform;
    protected _rootElement: HTMLElement;
    protected _viewportElement: HTMLElement;

    constructor() {
        super();
        this._viewportElement = document.querySelector('main');
        this._transform = new Transform();
        this._rootElement = document.createElement('div');
        this._rootElement.className = 'transform';
    }

    get transform() {
        return this._transform;
    }

    get rootElement() {
        return this._rootElement;
    }

    public render(): void {
        this.rootElement.style.width = `${this.transform.size.x}px`;
        this.rootElement.style.height = `${this.transform.size.y}px`;
        this.rootElement.style.width = `100px`;
        this.rootElement.style.height = `100px`;
        this.rootElement.style.top = `${this.transform.y}px`;
        this.rootElement.style.left = `${this.transform.x}px`;

        if (!this._viewportElement.contains(this.rootElement)) {
            this._viewportElement.appendChild(this.rootElement);
        }
    }

    public static instantiate(object: IGameObject): IGameObject {
        ObjectPool.push(object);
        return object;
    }
}

export { IGameObject, GameObject };
