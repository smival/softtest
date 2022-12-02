import {BasePage} from "./BasePage";
import {ITextStyle, Text} from "@pixi/text";
import {Box, BoxLayout} from "../view/Box";
import {Sprite, Texture} from "pixi.js";

export class Page1 extends BasePage
{
    private readonly _spawnDelay: number = 2; // sec
    private readonly _blocksToGen: number = 3;
    private readonly _box: Box = new Box();

    private readonly _texts: string[] = [`random text`, `Fahrprüfung`, `lorem ipsum`,
        `text for fun`, `drunken penguins`, `ninja.png`, `emo.png`, `clock.png`, `beer.png`, `shy.png`];
    private readonly _textStyle: Partial<ITextStyle> = {
        fontFamily: 'Roboto Condensed',
        fontSize: 18,
        fill: 0xFFFF,
        align: 'center'
    };
    private readonly imageRegExp = /\.(jpe?g|png|gif)$/i;

    public create(): void
    {
        super.create();
        const randomSize = 18 + Math.floor(Math.random() * 30);

        this._box.layout = BoxLayout.Horizontal;
        this._textStyle.fontSize = randomSize;
        this._texts.sort(this.randomSort);
        let n = this._blocksToGen;
        while (n) {
            if (this.imageRegExp.test(this._texts[n])) {
                const img = Sprite.from(Texture.from(this._texts[n]));
                img.height = randomSize;
                img.scale.x = img.scale.y;
                this._box.addChild(img);
            } else {
                this._box.addChild(new Text(this._texts[n], this._textStyle));
            }
            n--;
        }
        this.addChild(this._box);
        this._box.position.set(0, 280);
    }

    private randomSort(): number
    {
        return Math.random() > .5 ? 1 : -1;
    }

    public update(dt: number): void
    {
        super.update(dt);
        if(this._totalTime >= this._spawnDelay) {
            this.clean();
            this.create();
            this._totalTime = 0;
        }
    }

    public clean()
    {
        super.clean();
        this._box.removeChildren();
    }
}