class ObjectIterator<T> {
    private objects: T[];
    private currentIndex: number;

    constructor(objects: T[]) {
        this.objects = objects;
        this.currentIndex = 0;
    }
    
    public updateObject(objets:T[]) {
        this.objects = objets
    }

    public getCurrent(): T {
        return this.objects[this.currentIndex];
    }

    public next(): void {
        this.currentIndex = (this.currentIndex + 1) % this.objects.length;
    }

    public previous(): void {
        this.currentIndex = (this.currentIndex - 1 + this.objects.length) % this.objects.length;
    }
    
    public isBefore(objectX, objectY) {
        const indexX = this.objects.indexOf(objectX);
        const indexY = this.objects.indexOf(objectY);
    
        if (indexX === -1 || indexY === -1) {
            throw new Error('Один или оба объекта не найдены в массиве.');
        }
    
        return indexX < indexY;
    }
}

export { ObjectIterator }