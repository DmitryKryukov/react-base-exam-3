import { Unit } from "../units/Unit";
import { renderTemplate } from "../utilities/Render";

class BattleUIManager {
    private queueIteration: number = 0;
    private orderIteration: number = 0;
    private battleUI: HTMLElement;
    private viewportRootElement: HTMLElement;
    private unitQueue: Unit[];

    constructor() {
        this.viewportRootElement = document.querySelector("body main");
    }

    public renderUI() {
        renderTemplate("#js-battle-ui", this.viewportRootElement)
        this.battleUI = document.querySelector(".battle-ui")
    }

    public updateUI(activeUnit: Unit) {
        this.battleUI.querySelector(".battle-ui-unit__name").textContent = activeUnit.name;
        this.battleUI.querySelector(".battle-ui-unit-ui-wrapper__hp").textContent = activeUnit.getHp().toString();
        this.battleUI.querySelector(".battle-ui-unit-ui-wrapper__defence").textContent = activeUnit.getDefence().toString();
        this.battleUI.querySelector(".battle-ui-unit-ui-wrapper__attack").textContent = activeUnit.getAttackString();
        (this.battleUI.querySelector(".battle-ui-unit__portrait") as HTMLImageElement).src = activeUnit.getPortraitSource();
        const unitPortraitElement: HTMLElement = this.battleUI.querySelector(".battle-ui-unit-wrapper");

        if (activeUnit.enemy) {
            unitPortraitElement.style.setProperty('--before-background', "linear-gradient(45deg, black, black, red)");
            (this.battleUI.querySelector(".battle-ui-unit__name") as HTMLElement).style.background = "red";
        }
        else {
            (this.battleUI.querySelector(".battle-ui-unit__name") as HTMLElement).style.background = "gold";
            unitPortraitElement.style.setProperty('--before-background', "linear-gradient(45deg, black, black, gold)");
        }
    }

    public renderQueue(unitQueue: Unit[]) {
        this.unitQueue = unitQueue
        const queueWrapperElement: HTMLElement = this.battleUI.querySelector(".battle-ui-queue-wrapper");
        queueWrapperElement.innerHTML = "";
        (this.battleUI.querySelector(".battle-ui-queue-wrapper") as HTMLElement).style.width = `${(unitQueue.length - 1) * 54 + 4}px`;

        let firstQueueElement = true;
        unitQueue.forEach(unit => {
            if (!firstQueueElement) {
                renderTemplate("#js-ui-queue-item", queueWrapperElement, (fragment) => {
                    const unitQueueWrapper: HTMLElement = fragment.querySelector(".ui-queue-item");
                    const unitPortraitElement: HTMLImageElement = fragment.querySelector(".ui-queue-item__image");
                    unitPortraitElement.src = unit.getPortraitSource();
                    unitQueueWrapper.setAttribute("data-unit-id", unit.id)
                    if (unit.enemy) {
                        unitPortraitElement.style.backgroundImage = "radial-gradient(circle at top left, red, transparent 50%)";
                    }
                    else {
                        unitPortraitElement.style.backgroundImage = "radial-gradient(circle at top left, gold, transparent 50%)";
                    }
                })
            }
            firstQueueElement = false;
        });


        renderTemplate("#js-ui-queue-item", queueWrapperElement, (fragment) => {
            (fragment.querySelector(".ui-queue-item__image") as HTMLImageElement).src = unitQueue[0].getPortraitSource();
            const unitQueueWrapper: HTMLElement = fragment.querySelector(".ui-queue-item");
            const unitPortraitElement: HTMLImageElement = fragment.querySelector(".ui-queue-item__image");
            unitQueueWrapper.setAttribute("data-unit-id", unitQueue[0].id)
            if (unitQueue[0].enemy) {
                unitPortraitElement.style.backgroundImage = "radial-gradient(circle at top left, red, transparent 50%)";
            }
            else {
                unitPortraitElement.style.backgroundImage = "radial-gradient(circle at top left, gold, transparent 50%)";
            }

        })
    }
    public setUpQueueWidth() {
        (this.battleUI.querySelector(".battle-ui-queue-wrapper") as HTMLElement).style.width = `${(this.unitQueue.length - 1) * 54 + 4}px`;
        if (this.unitQueue.length == 1 ) {
            (this.battleUI.querySelector(".battle-ui-queue-wrapper") as HTMLElement).style.width = "0px";
            (this.battleUI.querySelector(".battle-ui-queue-wrapper") as HTMLElement).style.paddingLeft = "0px";
            (this.battleUI.querySelector(".battle-ui-queue-wrapper") as HTMLElement).style.paddingRight = "0px";
        
        }
    }

    public removeUnitFromQueue(unit: Unit) {
        const elementToRemove: HTMLElement = document.querySelector(`.ui-queue-item[data-unit-id="${unit.id}"]`)
        elementToRemove.classList.add('ui-queue-item--to-remove')
        setTimeout(() => {
            elementToRemove.remove();
        }, 500);
    }

    public updateQueue(newQueue) {
        this.unitQueue = newQueue;
        this.setUpQueueWidth();
    }

    public nextQueueUnit(currentUnit: Unit) {

            this.battleUI.querySelector(".battle-ui-unit__portrait").classList.add("battle-ui-unit__portrait--out");

            setTimeout(() => {
                this.battleUI.querySelector(".battle-ui-unit__portrait").classList.remove("battle-ui-unit__portrait--out");
            }, 500);

            this.orderIteration += 1;
            (this.battleUI.querySelector(".battle-ui-queue-wrapper") as HTMLElement).style.setProperty("--transition", `translate var(--ease-out-quint) .5s .5s`);
            (this.battleUI.querySelector(".battle-ui-queue-wrapper") as HTMLElement).style.setProperty("--queue-x", `-54px`);

            setTimeout(() => {
                (this.battleUI.querySelector(".battle-ui-queue-wrapper") as HTMLElement).style.setProperty("--transition", `none`);
                (this.battleUI.querySelector(".battle-ui-queue-wrapper") as HTMLElement).style.setProperty("--queue-x", `0px`);
                (this.battleUI.querySelector(`.battle-ui-queue-wrapper .ui-queue-item[data-unit-id="${currentUnit.id}"]`) as HTMLElement).style.order = this.orderIteration.toString();
            }, 1000);
        }
    }

export { BattleUIManager }