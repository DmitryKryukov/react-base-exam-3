interface ITransform {
    x: number;
    y: number;
    size: { x: number; y: number };
    xDirection: -1 | 1;
    yDirection: -1 | 1;
    pivot: {x: number; y: number};
}

class Transform implements ITransform {
    public x: number;
    public y: number;
    public size: { x: number; y: number };
    public xDirection: -1 | 1;
    public yDirection: -1 | 1;
    public pivot: {x:number; y: number}

    constructor(
        x: number = 0,
        y: number = 0,
        sizeX: number = 240,
        sizeY: number = 240,
        xDirection: -1 | 1 = 1,
        yDirection: -1 | 1 = 1,
        pivot?: {x:number, y:number}
    ) {
        this.x = x;
        this.y = y;
        this.size = { x: sizeX, y: sizeY };
        this.xDirection = xDirection;
        this.yDirection = yDirection;
        this.pivot = pivot || {x: -50, y: -50};
    }
}

export { ITransform, Transform };
