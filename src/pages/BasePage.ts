import {Container, Rectangle} from "pixi.js";

export abstract class BasePage extends Container {
    public readonly contentArea: Rectangle = new Rectangle();
    protected _totalTime: number = 0;

    public create(contentWidth: number = 600, contentHeight: number = 600): void
    {
        this.contentArea.width = contentWidth;
        this.contentArea.height = contentHeight;
    }

    public update(dt: number): void {
        this._totalTime += dt;
    }

    public clean(): void {
        this._totalTime = 0;
        this.removeChildren();
    }

    public get width(): number
    {
        return this.contentArea.width;
    }

    public get height(): number
    {
        return this.contentArea.height;
    }
}