import "phaser";
import {GameScene} from "./scenes/MainGame";
import {WelcomeScene} from "./scenes/Welcome";
import GameConfig = Phaser.Types.Core.GameConfig;
import {FailureScene} from "./scenes/Failure";
import {WinnerScene} from "./scenes/Winner";

const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
export const DEFAULT_HEIGHT = 720 // any height you want
export const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT

const config: GameConfig = {
    title: "The HRT Game",
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    parent: "game",
    backgroundColor: "#18216D",
    scene: [WelcomeScene, FailureScene, WinnerScene, GameScene],
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
};

export class StarfallGame extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

window.onload = () => {
    var game = new StarfallGame(config);
};

