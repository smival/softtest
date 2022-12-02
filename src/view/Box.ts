import {Container} from "pixi.js";
import {Button} from "./Button";

export enum BoxLayout
{
    Vertical,
    Horizontal
}

export class Box extends Container<Button>
{
    private _spacing: number = 10;
    private _layout: BoxLayout = BoxLayout.Vertical;

    onChildrenChange(): void
    {
        let lastPos = 0;
        this.children?.forEach(item =>
        {
            switch (this._layout) {
                case BoxLayout.Horizontal:
                    item.position.set(lastPos, item.position.y);
                    lastPos += item.width + this._spacing;
                    break;
                case BoxLayout.Vertical:
                    item.position.set(item.position.x, lastPos);
                    lastPos += item.height + this._spacing;
                    break;
            }
        });
    }

    public addChild<U extends Button[]>(...children): U[0]
    {
        children.forEach(child => child.position.set(0, 0));
        return super.addChild(...children);
    }

    public get layout(): BoxLayout
    {
        return this._layout;
    }

    public set layout(value: BoxLayout)
    {
        if (value == this._layout) {
            return;
        }
        this._layout = value;
        this.onChildrenChange();
    }

}