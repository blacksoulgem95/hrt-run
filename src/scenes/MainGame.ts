import "phaser";
import {DEFAULT_HEIGHT, DEFAULT_WIDTH} from "../app";


export class GameScene extends Phaser.Scene {
    delta: number;
    lastStarTime: number;
    pillsGot: number;
    pillsFallen: number;
    sand: Phaser.Physics.Arcade.StaticGroup;
    info: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: "GameScene"
        });
    }

    init(params): void {
        this.delta = 5 * 1000;
        this.lastStarTime = 0;
        this.pillsGot = 0;
        this.pillsFallen = 0;
    }

    preload(): void {
        this.load.setBaseURL('')
        this.load.image("pill", "assets/estradiol.png");
        this.load.image("sand", "assets/sand.jpg");
        this.load.image('bg', 'assets/flag.png')
        // TODO
    }

    create(): void {
        let bg =this.add.image(0, 0, 'bg')
        bg.setOrigin(0, 0)
        bg.setScale(1.2)

        this.sand = this.physics.add.staticGroup({
            key: 'sand',
            frameQuantity: Math.ceil(DEFAULT_WIDTH / 20)
        });
        Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
            new Phaser.Geom.Line(20, DEFAULT_HEIGHT - 20, DEFAULT_WIDTH, DEFAULT_HEIGHT - 20));
        this.sand.refresh();
        this.info = this.add.text(10, 10, '', {
            font: 'bold 24px Arial',
            color: '#FBFBAC'
        }); // "font: '24px Arial Bold'; fill: #FBFBAC"
    }

    update(time: number): void {
        if (this.pillsFallen >= 3) {
            // this.scene.remove('GameScene')
            this.scene.start('FailureScene')
        }
        if (this.pillsGot >= 90) {
            this.scene.start('WinnerScene')
        }
        var diff: number = time - this.lastStarTime;
        if (diff > this.delta) {
            this.lastStarTime = time;
            if (this.delta > 500) {
                this.delta -= 100;
            }
            this.emitPill();
        }
        this.info.text =
            this.pillsGot + "/90 caught - " +
            this.pillsFallen + " fallen (max 3) - " +
            Math.floor((1 / this.delta) * 100000) / 10 + " speed";
    }

    private onClick(star: Phaser.Physics.Arcade.Image): () => void {
        return () => {
            star.setTint(0x00ff00);
            star.setVelocity(0, 0);
            this.pillsGot += 1;
            this.time.delayedCall(100, function (star) {
                star.destroy();
            }, [star], this);
        }
    }

    private onFall(star: Phaser.Physics.Arcade.Image): () => void {
        return () => {
            star.setTint(0xff0000);
            this.pillsFallen += 1;
            this.time.delayedCall(100, function (star) {
                star.destroy();
            }, [star], this);
        }
    }

    private emitPill(): void {
        var star: Phaser.Physics.Arcade.Image;
        var x = Phaser.Math.Between(25, DEFAULT_WIDTH - 25);
        var y = 26;
        star = this.physics.add.image(x, y, "pill");
        star.setDisplaySize(50, 50);
        star.setVelocity(0, 200);
        star.setInteractive();
        star.on('pointerdown', this.onClick(star), this);
        this.physics.add.collider(star, this.sand,
            this.onFall(star), null, this);
    }
};
