import {Container, Point, Sprite} from "pixi.js";

export class Deck extends Container<Sprite>
{
    private readonly _dx: number = 0.5;
    private _assignedChildren: Sprite[] = [];

    public getCurrentPosition(cont: Container): Point
    {
        let result;
        if (this.children.length) {
            result = this.getPositionByIndex(this.children.length - 1);
        } else {
            result = this.getPositionByIndex(0);
        }
        return cont.toLocal(this.toGlobal(result));
    }

    public getNextPosition(relativelyCont: Container): Point
    {
        const result = this.getPositionByIndex(this.children.length + this._assignedChildren.length - 1);
        return relativelyCont.toLocal(this.toGlobal(result));
    }

    public assignChild(sprite: Sprite): void
    {
        this._assignedChildren.push(sprite);
    }

    public unAssignAll(): void
    {
        this._assignedChildren = [];
    }

    public addChild<U extends Sprite[]>(...children): U[0]
    {
        children.forEach(child => {
            const index = this._assignedChildren.indexOf(child);
            if (index != -1) {
                this._assignedChildren.splice(child, 1);
            }
        });
        return super.addChild(...children);
    }

    public getTopChild(): Sprite | null
    {
        return this.children.length ? this.getChildAt(this.children.length - 1) : null;
    }

    protected onChildrenChange(): void
    {
        this.children?.forEach(item =>
        {
            item.position.copyFrom(this.getPositionByIndex(this.getChildIndex(item)));
        });
    }

    protected getPositionByIndex(index: number): Point
    {
        return new Point(index * this._dx, index * this._dx);
    }
}