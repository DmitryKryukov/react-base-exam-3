import './styles.scss';
import { Game } from './scripts/Game';
class App {
    private game: Game;
    constructor() {
        this.game = new Game();
    }
}

const app = new App();
export { App };