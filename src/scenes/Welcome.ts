import "phaser";
export class WelcomeScene extends Phaser.Scene {
    title: Phaser.GameObjects.Text;
    subtitle: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: "WelcomeScene"
        });
    }
    create(): void {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;


        var titleText: string = "The HRT Run";
        var subtitleText: string = "Catch all the estradiol for\nyour three months subscription!\n\nClick to Start";
        this.title = this.add.text(screenCenterX - 150, screenCenterY - 50, titleText,
            { font: '48px Arial', color: '#FBFBAC', align: 'center'});
        this.subtitle = this.add.text(screenCenterX - 170, screenCenterY, subtitleText,
            { font: '24px Arial', color: '#FBFBAC', align: 'center' });
        this.input.on('pointerdown', function (/*pointer*/) {
            this.scene.start("GameScene");
        }, this);
    }
};