import "phaser";
export class FailureScene extends Phaser.Scene {
    title: Phaser.GameObjects.Text;
    subtitle: Phaser.GameObjects.Text;
    hint: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: "FailureScene"
        });
    }
    create(): void {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;


        var titleText: string = "Oh No! You failed";
        var subtitleText: string = "Don't drop the oestrogen!";
        this.title = this.add.text(screenCenterX - 200, screenCenterY - 50, titleText,
            { font: '48px Arial', color: '#FBFBAC'});
        this.subtitle = this.add.text(screenCenterX - 170, screenCenterY, subtitleText,
            { font: '24px Arial', color: '#FBFBAC' });
        var hintText: string = "Click to replay";
        this.hint = this.add.text(screenCenterX - 90, screenCenterY + 50, hintText,
            { font: '24px Arial', color: '#FBFBAC' });
        this.input.on('pointerdown', function (/*pointer*/) {
            this.scene.start("GameScene");
        }, this);
    }
};