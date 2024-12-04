interface IEngineObject {
    readonly id: string;
    isDebug: boolean;
}

class EngineObject implements IEngineObject {
    protected _id: string;

    public isDebug: boolean = false;

    constructor() {
        this._id = Date.now().toString();
    }

    get id(): string {
        return this._id;
    }

    public toString() {
        return `Объект с ID — ${this.id}`
    }
}

export {IEngineObject, EngineObject}