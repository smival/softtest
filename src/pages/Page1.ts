import {TextStyleExtended, TextStyleSet} from "pixi-tagged-text/dist/types";
import TaggedText from "pixi-tagged-text";
import {BasePage} from "./BasePage";

export class Page1 extends BasePage
{
    private _timer: NodeJS.Timer;
    private readonly _blockToGen: number = 3;
    private readonly _tagsCount: number = 5;
    private _texts: string[] = [`<tag5>some random</tag5>`, `<tag1>Fahrprüfung</tag1>`, `<tag2>lorem ipsum</tag2>`,
        `<tag3>text for fun</tag3>`, `<tag4>drunken penguins</tag4>`, `<ninja/>`, `<emo/>`, `<clock/>`, `<beer/>`, `<shy/>`];
    private _textStyle: TextStyleSet = {
        default: {
            fontFamily: 'Roboto Condensed',
            fontSize: "24px",
            fill: "#FFFFCC",
            align: "left",
            valign: "middle",
            lineSpacing: 0,
            wordWrap: true,
            wordWrapWidth: 300
        },
        tag1: {fontSize: "24px"},
        tag2: {fontSize: "24px"},
        tag3: {fontSize: "24px"},
        tag4: {fontSize: "24px"},
        tag5: {fontSize: "24px"}
    };

    public create(): void
    {
        this._texts.sort(this.randomSort);
        let text = "";
        let n = this._blockToGen;
        while (n) {
            text += this._texts[n] + " ";
            n--;
        }
        n = this._tagsCount;
        while (n) {
            const style: TextStyleExtended = this._textStyle[`tag${n}`];
            if (style) {
                style.fontSize = 18 + Math.floor(Math.random() * 30);
            }
            n--;
        }
        const textField = new TaggedText(text, this._textStyle, {
            //debug: true,
            imgMap: {
                clock: "clock.png",
                emo: "emo.png",
                beer: "beer.png",
                shy: "shy.png",
                ninja: "ninja.png"
            }
        });

        this._timer = setInterval(() =>
        {
            this.clean();
            this.create();
        }, 2000);

        this.addChild(textField);
    }

    private randomSort(): number
    {
        return Math.random() > .5 ? 1 : -1;
    }

    public update(dt: number): void
    {

    }

    public clean()
    {
        super.clean();
        clearInterval(this._timer);
    }
}