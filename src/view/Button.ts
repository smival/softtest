import {Container, Graphics, Text} from "pixi.js";

export class Button extends Container
{
    private _disabledColor: number = 0x336699;
    private _enabledColor: number = 0x337d47;

    private _text: string = "Label";

    private readonly _textField: Text;
    protected _shape: Graphics;
    protected _padding = 10;
    protected _enabled = false;

    constructor(name: string, private _color: number = NaN)
    {
        super();
        this.name = name;
        if (isNaN(this._color)) this._color = this._enabledColor;

        this._textField = new Text('', {
            fontFamily: 'Roboto Condensed',
            fontSize: 24,
            fill: 0xFFFF,
            align: 'center'
        });
        this._textField.position.x = this._padding;
        this._textField.position.y = this._padding;

        this.addChild(this._textField);

        this.buttonMode = true;
        this.updateTFAndShape();
        this.enabled = true;
    }

    public setText(text: string): Button
    {
        this._text = text;
        this.updateTFAndShape();
        return this;
    }

    protected updateTFAndShape(): void
    {
        const oldVal = this._textField.text;
        const newVal = this._text;
        if (oldVal === newVal) {
            return;
        }

        this._textField.text = newVal;
        this.updateShape();
    }

    protected updateShape(): void
    {
        this._shape = this.drawShape(this._shape, 0, this._enabled ? this._color : this._disabledColor);
    }

    protected drawShape(graphics: Graphics, index, color: number = NaN): Graphics
    {
        if (graphics) {
            this.removeChild(graphics);
            graphics.clear();
        } else {
            graphics = new Graphics();
        }

        graphics.beginFill(!isNaN(color) ? color : this._enabledColor);
        graphics.drawRoundedRect(0, 0,
            this._textField.width + this._padding * 2,
            this._textField.height + this._padding * 2, 15);
        graphics.endFill();

        this.addChildAt(graphics, index);
        return graphics;
    }

    public get enabled(): boolean
    {
        return this._enabled;
    }

    public set enabled(value: boolean)
    {
        if (value == this._enabled) {
            return;
        }
        this._enabled = value;
        this.interactive = this.interactiveChildren = value;
        this.updateShape();
    }
}