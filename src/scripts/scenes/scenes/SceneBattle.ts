import { Scene } from "../Scene";
import { SceneMenu } from "./SceneMenu";
import { ObjectIterator } from "../../objects/ObjectItteratior";
import { Settings } from "../../utilities/Settings";

import { renderTemplate } from "../../utilities/Render";

import { BattleUIManager } from "../../managers/BattleUIManager";
import { BattleGrid } from "../../misc/BattleGrid";
import { CellState } from "../../misc/Cell";

import { UnitState } from "../../units/Unit";
import { Unit } from "../../units/Unit";

import { BromeWarcrest } from "../../units/ally/BromeWarcrest";
import { SunWisp } from "../../units/ally/SunWisp";
import { Indominus } from "../../units/ally/Indominus";
import { SunriseCleric } from "../../units/ally/SunriseCleric";
import { GryphonFledgling } from "../../units/ally/GryphonFledgling";
import { SilverguardSquire } from "../../units/ally/SilverguardSquire";

import { MaehvSkinsolder } from "../../units/enemy/MaehvSkinsolder";
import { AbyssalCrawler } from "../../units/enemy/AbyssalCrawler";
import { BloodSiren } from "../../units/enemy/BloodSiren";
import { ShadowWatcher } from "../../units/enemy/ShadowWatcher";
import { AbyssalJuggernaut } from "../../units/enemy/AbyssalJuggernaut";
import { VorpalReaver } from "../../units/enemy/VorpalReaver";

import { calculateAngle } from "../../utilities/Vector";
import { getScreenDimensions, shuffleArray } from "../../utilities/Math";

class SceneBattle extends Scene {
    private unitQueue;
    private unitIterator;
    private activeUnit: Unit;
    private battleUIManager: BattleUIManager;
    private battleGrid: BattleGrid;
    private canTurn = false;
    private shifts: [number, number][] = [
        [-1, 0],
        [-1, -1],
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1]
    ];

    private allyUnits = {
        bromeWarcrest: Unit.instantiate(new BromeWarcrest()),
        sunWisp: Unit.instantiate(new SunWisp()),
        silverguardSquire: Unit.instantiate(new SilverguardSquire()),
        sunriseCleric: Unit.instantiate(new SunriseCleric()),
        gryphonFledgling: Unit.instantiate(new GryphonFledgling()),
        indominus: Unit.instantiate(new Indominus()),
    }

    private enemyUnits = {
        maehvSkinsolder: Unit.instantiate(new MaehvSkinsolder()),
        abbysalCrawler: Unit.instantiate(new AbyssalCrawler()),
        bloodSiren: Unit.instantiate(new BloodSiren()),
        shadowWatcher: Unit.instantiate(new ShadowWatcher()),
        vorpalReaver: Unit.instantiate(new VorpalReaver()),
        abyssalJuggernaut: Unit.instantiate(new AbyssalJuggernaut()),
    }

    constructor() {
        super();
        this.music.setVolume(0);
        this.battleUIManager = new BattleUIManager();
    }

    public load() {
        this.viewportRootElement.classList.add("scene--fade-in");
        this.viewportRootElement.classList.remove("scene--to-next");

        this.music.setVolume(.25, 2);
        renderTemplate("#js-battle-background", this.viewportRootElement);
        this.battleUIManager.renderUI()
        this.battleGrid = new BattleGrid();
        this.initUnits();
        this.bindEvents();

        this.playGlobalMusic("./assets/battlemusic-2.wav")
    }

    private initUnits() {
        const screenSize = getScreenDimensions();
        const gridSize = {width: 1524, height:569};
        const paddings = {vertical: 200 , horizontal: 120};
        const renderX = screenSize.width / 2 - gridSize.width / 2 + 50 + 39.5;
        const renderY = screenSize.height / 2  - gridSize.height / 2 + 30 - 7.5;

        this.renderUnits(this.allyUnits, renderX, renderY, 96, false);
        this.renderUnits(this.enemyUnits, renderX + 1352.5, renderY, 96, true);

        this.unitQueue = [
            this.allyUnits.bromeWarcrest,
            this.enemyUnits.maehvSkinsolder,
            this.allyUnits.sunWisp,
            this.enemyUnits.abbysalCrawler,
            this.allyUnits.silverguardSquire,
            this.enemyUnits.bloodSiren,
            this.allyUnits.sunriseCleric,
            this.enemyUnits.shadowWatcher,
            this.allyUnits.gryphonFledgling,
            this.enemyUnits.vorpalReaver,
            this.allyUnits.indominus,
            this.enemyUnits.abyssalJuggernaut,
        ];

        this.battleUIManager.renderQueue(this.unitQueue);

        this.unitIterator = new ObjectIterator(this.unitQueue);

        this.activeUnit = this.unitQueue[0];
        this.battleUIManager.updateUI(this.activeUnit);

        setTimeout(() => {
            this.unitQueue[0].toggleActive();
            this.canTurn = true;
        }, 1000);
    }

    private renderUnits(units: Record<string, Unit>, firstX: number, firstY: number, gap: number, enemy: boolean) {
        const unitsArray = Object.values(units);
        unitsArray.forEach((unit, index) => {
            if (enemy) {
                this.battleGrid.bindUnit(index, 8, unit);
                unit.setEnemy();
            }
            else {
                this.battleGrid.bindUnit(index, 0, unit);
                unit.setAlly();

            }
            unit.moveToInstant(firstX, firstY + gap * index);
            unit.idle();
        });
    }

    private removeUnitFromGroup(unit: Unit, unitGroup) {
        for (const key in unitGroup) {
            if (unitGroup[key] === unit) {
                delete unitGroup[key];
                break;
            }
        }
    }

    protected bindEvents(): void {
        document.addEventListener('keyup', (event) => {
            if (event.code === "Space") {
                if (!this.activeUnit.enemy) {
                this.unitDefenceUp();
            }
            }
        })

        document.addEventListener('mouseup', (event) => {
            if (!this.canTurn) return;

            const target = event.target as HTMLElement;
            const cellElement = target.parentElement;
            const i = Number(target.parentElement.getAttribute("data-i"));
            const j = Number(target.parentElement.getAttribute("data-j"));

            if (cellElement &&
                cellElement.classList.contains('cell') &&
                this.activeUnit.state == UnitState.Idle &&
                !cellElement.classList.contains('cell--blocked')) {
                this.unitMoveTo(i, j);
            }
            if (cellElement &&
                cellElement.classList.contains('cell') &&
                this.activeUnit.state == UnitState.Idle &&
                cellElement.classList.contains('cell--blocked')) {
                if (this.cellToRun) {
                    this.unitAttack(this.cellToRun);
                    handleMouseMove(event);
                    this.cellToRun = null;
                }
            }

        })

        const handleMouseMove = (event) => {
            const target: HTMLElement = event.target as HTMLElement;
            let i: number;
            let j: number;
            if (target.parentElement.classList.contains('cell')) {
                i = Number(target.parentElement.getAttribute("data-i"));
                j = Number(target.parentElement.getAttribute("data-j"));
                const cell = this.battleGrid.getCell(j, i);
                const unit = cell.unit;
                if (unit && (this.activeUnit.enemy && !unit.enemy || !this.activeUnit.enemy && unit.enemy && this.canTurn)) {
                    this.hoverEnemy(event, unit, cell, i, j)
                }
                const handleMouseOut = (event: MouseEvent) => {
                    this.cellToRun = null;
                    if (unit) {
                        unit.unhover();
                        this.clearNearCells(i, j);
                    }
                    document.body.style.cursor = "default";
                    cell.cell.rootElement.removeEventListener('mouseout', handleMouseOut)
                }

                cell.cell.rootElement.addEventListener('mouseout', handleMouseOut)
            }
        }

        document.addEventListener('mousemove', handleMouseMove)

        document.addEventListener('unitrunend', (event) => {
            if (this.activeUnit.runToAttack) {
                if (this.activeUnit.transform.xDirection == -1 && this.unitToAttack.transform.x > this.activeUnit.transform.x || this.activeUnit.transform.xDirection == 1 && this.unitToAttack.transform.x < this.activeUnit.transform.x) {
                    this.activeUnit.flipX();
                }
                this.activeUnit.attack();
                setTimeout(() => {
                    this.unitToAttack.takeDamage(this.activeUnit.getDamage());
                }, this.activeUnit.attackTime / 2);
                if (this.activeUnit.enemy) {

                    setTimeout(() => {
                        this.canTurn = true;
                    }, this.activeUnit.attackTime + 1000);
                }
                else {
                    this.canTurn = true;
                }
            }
            else {
                this.nextUnitTurn();
            }
        })

        document.addEventListener('unitdied', (event: CustomEvent) => {
            try {
                const unitDied = event.detail.unit;
                this.battleGrid.findUnit(unitDied).cell.unblock();
                const { i, j } = this.battleGrid.findIJByUnit(unitDied);
                this.battleGrid.bindUnit(i, j, null);

                if (unitDied.enemy) {
                    this.removeUnitFromGroup(unitDied, this.enemyUnits);
                    if (Object.values(this.enemyUnits).length == 0) {
                        this.battleEnd(true)
                    }
                }
                else {
                    this.removeUnitFromGroup(unitDied, this.allyUnits);
                    if (Object.values(this.allyUnits).length == 0) {
                        this.battleEnd(false)
                    }
                }

                if (this.unitIterator.isBefore(unitDied, this.activeUnit)) {
                    this.unitIterator.previous();
                }

                this.unitQueue = this.unitQueue.filter(unit => unit !== unitDied);
                this.unitIterator.updateObject(this.unitQueue);
                this.battleUIManager.updateQueue(this.unitQueue);
                this.battleUIManager.removeUnitFromQueue(unitDied);
            }
            catch {

            }
        })

    }


    private cellToRun = null;
    private unitToAttack = null;

    private clearNearCells(i: number, j: number) {
        this.shifts.forEach(([dx, dy]) => {
            const newI = i + dx;
            const newJ = j + dy;
            if (newI >= 0 && newI <= 8 && newJ >= 0 && newJ <= 5) {
                const cellToRun = this.battleGrid.getCell(newJ, newI);
                if (cellToRun) {
                    cellToRun.cell.removeGoAndAttack();
                }
            }
        });
    }

    private hoverEnemy(event: MouseEvent, unit: Unit, cell, i: number, j: number) {
        let iShift: number;
        let jShift: number;

        const angle = calculateAngle(
            cell.cell.transform.x + 82,
            cell.cell.transform.y + 45,
            event.clientX,
            event.clientY
        );

        this.clearNearCells(i, j);

        const normalizedAngle = ((angle % 360) + 360) % 360;
        const index = Math.floor((normalizedAngle + 22.5) / 45) % 8;

        let cursorStyle: string;
        [iShift, jShift] = this.shifts[index];

        if (iShift === 0 && jShift === 0) {
            cursorStyle = 'default';
        } else if (iShift < 0 && jShift < 0) {
            cursorStyle = 'nw-resize';
        } else if (iShift < 0 && jShift === 0) {
            cursorStyle = 'ew-resize';
        } else if (iShift < 0 && jShift > 0) {
            cursorStyle = 'sw-resize';
        } else if (iShift === 0 && jShift < 0) {
            cursorStyle = 'ns-resize';
        } else if (iShift === 0 && jShift > 0) {
            cursorStyle = 'ns-resize';
        } else if (iShift > 0 && jShift < 0) {
            cursorStyle = 'ne-resize';
        } else if (iShift > 0 && jShift === 0) {
            cursorStyle = 'ew-resize';
        } else if (iShift > 0 && jShift > 0) {
            cursorStyle = 'se-resize';
        }

        document.body.style.cursor = cursorStyle;

        try {
            const cellToRun = this.battleGrid.getCell(j + jShift, i + iShift);
            if ((cellToRun.unit == this.activeUnit || cellToRun.cell.state != CellState.Blocked) && this.canTurn) {
                unit.hover();
                cellToRun.cell.addGoAndAttack();
                this.cellToRun = cellToRun;
                this.unitToAttack = unit;
            }
        }
        catch { }
    }

    private nextUnitTurn(): void {
        if (this.canTurn || this.activeUnit.enemy) {
            this.canTurn = false;
            this.activeUnit.toggleActive();

            this.unitIterator.next();
            this.activeUnit = this.unitIterator.getCurrent();
            this.battleUIManager.nextQueueUnit(this.activeUnit)

            setTimeout(() => {
                this.battleUIManager.updateUI(this.activeUnit);
            }, 500);

            setTimeout(() => {
                this.activeUnit.toggleActive();
                if (this.activeUnit.enemy) {
                    if (!this.viewportRootElement.classList.contains("battle--end")) {
                        this.aIStartMove();
                    }
                }
                else {
                    this.canTurn = true;
                }
            }, 1000);
        }
    }

    private aIStartMove(): void {
        this.canTurn = false;
        const randomUnit = this.getRandomUnit(this.allyUnits);
        const randomCell = this.getRandomCellNearUnit(randomUnit);

        if (randomCell) {
            this.unitToAttack = randomUnit;
            this.unitAttack(this.battleGrid.getCell(randomCell.i, randomCell.j));
        }
        else {
            if (Object.values(this.allyUnits).length === 1) {
                this.unitDefenceUp();
                return;
            }
            else {
                this.aIStartMove()
                return;
            }

            this.nextUnitTurn();
        }
    }

    private getRandomUnit(unitGroup) {
        const keys = Object.keys(unitGroup);
        const randomIndex = Math.floor(Math.random() * keys.length);
        console.log(unitGroup[keys[randomIndex]])
        return unitGroup[keys[randomIndex]];
    }

    private getRandomCellNearUnit(unit: Unit) {
        const { i, j } = this.battleGrid.findIJByUnit(unit);

        const tempShifts = this.shifts;
        console.log(tempShifts);

        let found = false;

        for (let k = 0; k < tempShifts.length; k++) {
            const shift = tempShifts[k];
            const newI = i + shift[0];
            const newJ = j + shift[1];

            if (newI >= 0 && newI < this.battleGrid.grid.length && newJ >= 0 && newJ < this.battleGrid.grid[newI].length) {
                const cell = this.battleGrid.getCell(newI, newJ);
                if (cell.cell.state !== CellState.Blocked || cell.unit == this.activeUnit) {
                    found = true;
                    return { i: newI, j: newJ };
                    break;
                }
            }
        }

        if (!found) {
            return null
        }
    }


    private unitDefenceUp(): void {

        if ((this.canTurn || this.activeUnit.enemy) && this.activeUnit.state == UnitState.Idle) {
            this.activeUnit.defenceUp();
            this.battleUIManager.updateUI(this.activeUnit);

            setTimeout(() => {
                this.nextUnitTurn();
            }, 300);

            this.playGlobalUISound("./assets/defense.mp3")
        }
    }

    private unitMoveTo(i: number, j: number): void {
        this.battleGrid.findUnit(this.activeUnit).cell.unblock();

        const currentIJ = this.battleGrid.findIJByUnit(this.activeUnit);
        this.battleGrid.bindUnit(currentIJ.i, currentIJ.j, null);
        this.battleGrid.bindUnit(j, i, this.activeUnit);

        this.battleGrid.findUnit(this.activeUnit).cell.block();
        this.activeUnit.moveTo(Number(this.battleGrid.getCell(j, i).cell.rootElement.getAttribute("data-x")), Number(this.battleGrid.getCell(j, i).cell.rootElement.getAttribute("data-y")));
    }

    private unitAttack(bindedUnitCell) {
        if (bindedUnitCell.unit && (this.activeUnit.enemy && !bindedUnitCell.unit.enemy || !this.activeUnit.enemy && bindedUnitCell.unit.enemy && (this.canTurn || this.activeUnit.enemy))) {
            return
        }
        this.canTurn = false;
        this.activeUnit.runToAttack = true;
        const { i, j } = this.battleGrid.findIJByCell(bindedUnitCell.cell);

        this.clearNearCells(i, j);
        if (bindedUnitCell.unit != this.activeUnit) {
            this.unitMoveTo(j, i);
        }
        else {
            if (this.activeUnit.transform.xDirection == -1 && this.unitToAttack.transform.x > this.activeUnit.transform.x || this.activeUnit.transform.xDirection == 1 && this.unitToAttack.transform.x < this.activeUnit.transform.x) {
                this.activeUnit.flipX();
            }
            this.activeUnit.attack();
            setTimeout(() => {
                this.unitToAttack.takeDamage(this.activeUnit.getDamage());
            }, this.activeUnit.attackTime / 2);

            setTimeout(() => {
                this.canTurn = true;;
            }, this.activeUnit.attackTime);

        }
    }

    private battleEnd(enemy: boolean) {
        this.canTurn = false;
        this.viewportRootElement.classList.add("battle--end");
        this.music.setVolume(0, 1);
        this.activeUnit.toggleActive();

        renderTemplate("#js-battle-end", this.viewportRootElement, (fragment) => {
            const imageElement: HTMLImageElement = fragment.querySelector(".battle-end-header__image");
            const titleElement: HTMLImageElement = fragment.querySelector(".battle-end-header__title");
            const buttonReplay: HTMLElement = fragment.querySelector("#js-button-replay");
            const buttonMainMenu: HTMLElement = fragment.querySelector("#js-button-to-main-menu");
            buttonReplay.classList.add("freeze")
            buttonMainMenu.classList.add("freeze")
            setTimeout(() => {
                buttonReplay.classList.remove("freeze")
                buttonMainMenu.classList.remove("freeze")
            }, 1000);

            const handleHover = (event) => {
                this.playLocalUISound("./assets/button-hover.mp3");
            }

            const resetScene = () => {
                this.viewportRootElement.classList.add("scene--to-next");
                this.viewportRootElement.classList.remove("scene--fade-in");
                this.viewportRootElement.classList.remove("battle--end");
                this.playGlobalUISound("./assets/button-to-battle.mp3");
            }

            const handleMainMenu = (event) => {
                resetScene();
                const eventToDispatch = new CustomEvent("loadnextscene", {
                    detail: { scene: new SceneMenu() }
                });
                setTimeout(() => {
                    document.dispatchEvent(eventToDispatch);
                }, 1000);
            }

            const handleReplay = (event) => {
                resetScene();

                const eventToDispatch = new CustomEvent("loadnextscene", {
                    detail: { scene: new SceneBattle() }
                });
                setTimeout(() => {
                    document.dispatchEvent(eventToDispatch);
                }, 1000);

            }
            buttonReplay.addEventListener("mouseenter", handleHover);
            buttonMainMenu.addEventListener("mouseenter", handleHover);
            buttonReplay.addEventListener("mouseup", handleReplay);
            buttonMainMenu.addEventListener("mouseup", handleMainMenu);

            if (enemy) {
                imageElement.src = "./assets/crest-ally.png";
                titleElement.textContent = "Победили левые";
            }
            else {
                imageElement.src = "./assets/crest-enemy.png";
                titleElement.textContent = "Победили правые";
            }
        });

        if (!Settings.allowMusic) return
        this.playGlobalUISound('./assets/battle-end.m4a')
    }

    private playGlobalMusic(source: string) {
        if (!Settings.allowMusic) return
        this.music.setSource(source);
        this.music.playLoop();
    }

}

export { SceneBattle }