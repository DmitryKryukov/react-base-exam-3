import { ObjectPool } from "../utilities/ObjectPool";
import { SpriteObject } from "../objects/SpriteObject";
import { renderTemplate } from "../utilities/Render";


enum CellState {
    Idle,
    Blocked
}

class Cell extends SpriteObject {
    protected sprite: string;
    public state: CellState;

    constructor() {
        super();
        this._rootElement.classList.add('cell');
        this.transform.size.x = 164;
        this.transform.size.y = 90;
        this.state = CellState.Idle
        this.spriteRenderer.spriteSrc = "./assets/cell.png";
    }

    public render(){
        super.render();
        this.rootElement.style.width = `${this.transform.size.x}px`;
        this.rootElement.style.height = `${this.transform.size.y}px`;
        this.rootElement.setAttribute("data-x", (this.rootElement.offsetLeft + this.transform.size.x / 2).toString());
        this.rootElement.setAttribute("data-y", (this.rootElement.offsetTop +  this.transform.size.y / 2 - 10).toString());
       
        
        this.spriteElement.style.left = `0px`;
    }

    public renderCell(x: number, y: number) {
        this.spriteRenderer.spriteSrc = "./assets/cell.png";
        this.moveToInstant(x, y);
    }

    public moveToInstant(x: number, y: number) {
        super.moveTo(x, y);
    }

    public block() {
        this.spriteRenderer.spriteSrc = "./assets/cell-blocked.png";
        this.rootElement.classList.add("cell--blocked");
        this.state = CellState.Blocked;
        this.render();
    }

    public unblock() {
        this.spriteRenderer.spriteSrc = "./assets/cell.png";
        this.rootElement.classList.remove("cell--blocked");
        this.state = CellState.Idle;
        this.render();
    }

    public addGoAndAttack() {
        this.rootElement.style.background = "red";
        this.rootElement.style.opacity = ".8";
    }

    public removeGoAndAttack() {
        this.rootElement.style.background = "";
        this.rootElement.style.opacity = "";
    }

    public static instantiate(object: Cell): Cell {
        ObjectPool.push(object);
        return object;
    }
}



export { Cell, CellState };
