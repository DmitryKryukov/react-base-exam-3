import { IGameObject } from "../objects/GameObject";


class ObjectPool {
    private static _objectPool: IGameObject[] = [];

    public static get pool(): IGameObject[] {
        return this._objectPool;
    }

    public static push(object: IGameObject): void {
        this.pool.push(object);
    }

    public static size(): number {
        return this.pool.length;
    }
}

export { ObjectPool };