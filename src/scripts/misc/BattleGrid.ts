import { Unit } from "../units/Unit";
import { getScreenDimensions } from "../utilities/Math";
import { Cell } from "./Cell";

class BattleGrid {
    public grid;

    constructor() {
        const rows = 6;
        const cols = 9;
        this.grid = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => ({
                cell: new Cell(),
                unit: null
            }))
        );


        this.renderGrid();
    }

    private renderGrid() {
        const screenSize = getScreenDimensions();
        const gridSize = {width: 1524, height:569};
        const paddings = {vertical: 200 , horizontal: 150};
        const startX = screenSize.width / 2 - gridSize.width / 2 + paddings.vertical / 4;
        const startY = screenSize.height / 2  - gridSize.height / 2 + paddings.horizontal / 4;
        const shiftX: number = 170;
        const shiftY: number = 96;

        this.grid.forEach((row, y) => {
            row.forEach(({ cell }, x) => {
                cell.renderCell(startX + shiftX * x, startY + shiftY * y);
                cell.rootElement.setAttribute("data-i", x.toString());
                cell.rootElement.setAttribute("data-j", y.toString());
                if (x == 0 || x == 8) {
                    cell.block();
                }
            });
        });
    }

    blockCell(i: number, j: number) {
        this.grid[i][j].block();
    }

    bindUnit(i: number, j: number, unit: Unit | null) {
        this.grid[i][j].unit = unit;
    }
    getCell(i: number, j: number) {
        return this.grid[i][j];
    }

    findUnit(unit) {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j].unit != null) {
                    if (this.grid[i][j].unit === unit) {
                        return this.grid[i][j];
                    }
                }
            }
        }
        return null;
    }

    
    findIJByUnit(unit: Unit) {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j].unit != null) {
                    if (this.grid[i][j].unit === unit) {
                        return { i: i, j: j };
                    }
                }
            }
        }
        return null;
    }

    findIJByCell(cell: Cell) {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j].cell != null) {
                    if (this.grid[i][j].cell === cell) {
                        return { i: i, j: j };
                    }
                }
            }
        }
        return null;
    }
}

export { BattleGrid };