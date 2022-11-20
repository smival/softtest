import {Container} from "pixi.js";
import {Button} from "./Button";

export enum Layout
{
    Vertical,
    Horizontal
}

export class Box extends Container<Button>
{
    private _layout = Layout.Vertical;

    onChildrenChange(): void
    {
        let lastPos = 0;
        this.children?.forEach(item =>
        {
            item.position.set(item.position.x, lastPos);
            lastPos += item.height;
        });
    }

    public get layout(): Layout
    {
        return this._layout;
    }

    public set layout(value: Layout)
    {
        this._layout = value;
    }

}