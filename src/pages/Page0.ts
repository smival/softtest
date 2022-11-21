import {Container, Sprite, Texture} from "pixi.js";
import {TweenMax} from "gsap";
import {Deck} from "../view/Deck";
import {BasePage} from "./BasePage";

export class Page0 extends BasePage
{
    private _timer: NodeJS.Timer;
    private readonly _nextItemDelay: number = 1000; //msec
    private readonly _itemAnimTime: number = 2; // sec
    private readonly _cardTexture = Texture.from("card.png");
    private readonly _cardsCount: number = 144;
    private readonly _animLayer: Container = new Container();
    private readonly _deck0: Deck = new Deck();
    private readonly _deck1: Deck = new Deck();

    private _cards: Sprite[] = [];

    public create(): void
    {
        let n = 0;
        if (!this._cards.length) {
            while (n < this._cardsCount) {
                const sprite = Sprite.from(this._cardTexture);
                this._cards.push(sprite);
                n++;
            }
        }
        this._cards.forEach(item =>
        {
            this._deck0.addChild(item);
        })
        this._deck0.position.x = -150;
        this._deck1.position.x = 150;
        this.addChild(this._deck0);
        this.addChild(this._deck1);
        this.addChild(this._animLayer);

        this._timer = setInterval(() =>
        {
            this.makeNewAnimation(this._deck0, this._deck1);
        }, this._nextItemDelay);
        this.makeNewAnimation(this._deck0, this._deck1);
    }

    protected makeNewAnimation(fromDeck: Deck, toDeck: Deck): void
    {
        const sprite = fromDeck.getChildAt(fromDeck.children.length - 1);
        toDeck.assignChild(sprite);
        const toPoint = toDeck.getNextPosition(this._animLayer);
        const fromPoint = fromDeck.getCurrentPosition(this._animLayer);

        this._animLayer.addChild(sprite);
        sprite.position.copyFrom(fromPoint);

        TweenMax.to(sprite.scale, this._itemAnimTime/4, {x: 1.2, y:1.2});
        TweenMax.to(sprite.scale, this._itemAnimTime/2, {x: 1, y:1, delay: this._itemAnimTime/4});
        TweenMax.to(sprite, this._itemAnimTime, {x: toPoint.x, y: toPoint.y,
            onComplete: () => this.onFinishAnimation(sprite, toDeck)});
    }

    protected onFinishAnimation(obj: Sprite, to: Deck): void
    {
        to.addChild(obj);
    }

    public update(dt: number): void {}
    public clean()
    {
        super.clean();
        this._cards.forEach(item => TweenMax.killTweensOf(item));
        clearInterval(this._timer);
    }
}