import "phaser";
import {DEFAULT_HEIGHT} from "../app";
export class WinnerScene extends Phaser.Scene {
    title: Phaser.GameObjects.Text;
    subtitle: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: "WinnerScene"
        });
    }

    preload(): void {
        this.load.setBaseURL('/')
        this.load.image("girl", "assets/girl.png");
    }

    create(): void {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.add.sprite((450 / 2), DEFAULT_HEIGHT - (555/2), 'girl');

        var titleText: string = "YAS! You're a good girl";
        this.title = this.add.text(screenCenterX - 200, screenCenterY - 50, titleText,
            { font: '48px Arial', color: '#FBFBAC'});
        var hintText: string = "Click to replay";
        this.hint = this.add.text(screenCenterX - 90, screenCenterY + 50, hintText,
            { font: '24px Arial', color: '#FBFBAC' });
        this.input.on('pointerdown', function (/*pointer*/) {
            this.scene.start("GameScene");
        }, this);
    }
};