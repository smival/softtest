import {
    AbstractRenderer,
    autoDetectRenderer,
    Container,
    DisplayObject,
    InteractionEvent,
    Loader,
    Rectangle
} from "pixi.js";
import Stats from "stats.js";
import {Box, BoxLayout} from "./view/Box";
import {Button} from "./view/Button";
import {Page0} from "./pages/Page0";
import {Page1} from "./pages/Page1";
import {Page2} from "./pages/Page2";
import {BasePage} from "./pages/BasePage";

export class App
{
    private readonly _stage: Container;
    private _pagesMap: Map<string, BasePage> = new Map<string, BasePage>();
    private _renderer: AbstractRenderer;
    private _stats: Stats;
    private _uiBox: Box;
    private _contentContainer: Container;
    private _currentButton: Button;
    private _currentPage: BasePage;
    private _elapsedTime: number = Date.now();
    private _appSize: Rectangle = new Rectangle();

    constructor()
    {
        this._pagesMap.set("item0", new Page0());
        this._pagesMap.set("item1", new Page1());
        this._pagesMap.set("item2", new Page2());

        this._renderer = autoDetectRenderer({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x1099bb}
        );
        this._stage = new Container();
        this._stats = new Stats();
        this._stats.dom.style.left = "10px";
        this._stats.dom.style.top = "10px";

        document.body.appendChild(this._renderer.view);
        document.body.appendChild(this._stats.dom);
        this.render();
    }

    public resize(width: number, height: number): void
    {
        this._renderer.resize(width, height);
        this._appSize.width = width;
        this._appSize.height = height;

        this.alignAndResizePage();
    }

    public async start(): Promise<void>
    {
        const FontFaceObserver = require('fontfaceobserver');
        const font = new FontFaceObserver('Roboto Condensed');
        await Promise.all([font.load(), this.loadAssets()]);

        this._uiBox = new Box();
        this._uiBox.layout = BoxLayout.Horizontal;
        this._uiBox.addChild(new Button("item0").setText("Decks"))
            .addListener("pointerdown", (e) => this.onButtonDown(e));
        this._uiBox.addChild(new Button("item1").setText("Img&Text"))
            .addListener("pointerdown", (e) => this.onButtonDown(e));
        this._uiBox.addChild(new Button("item2").setText("Flame"))
            .addListener("pointerdown", (e) => this.onButtonDown(e));
        this._uiBox.position.set(100, 10);

        this._contentContainer = new Container<DisplayObject>();
        this.stage.addChild(this._contentContainer);
        this.stage.addChild(this._uiBox);
    }

    protected async loadAssets(): Promise<void>
    {
        return new Promise(resolve =>
        {
            Loader.shared.add(["fire.png", "card.png", "fireParticle.png", "clock.png", "emo.png", "ninja.png",
                "beer.png", "shy.png"]).load(() =>
            {
                resolve();
            });
        });
    }

    private onButtonDown(event: InteractionEvent): void
    {
        if (this._currentButton) {
            this._currentButton.enabled = true;
        }
        this._currentButton = event.target as Button;
        this._currentButton.enabled = false;
        this.showPage(this._pagesMap.get(this._currentButton.name));
    }

    private showPage(page: BasePage): void
    {
        if (this._currentPage) {
            this._currentPage.clean();
        }
        this._contentContainer.removeChildren();
        this._currentPage = page;
        page.create();
        this._contentContainer.addChild(page);
        this.alignAndResizePage();
    }

    private alignAndResizePage(): void
    {
        if (!this._currentPage) return;

        const {width, height} = this._currentPage.contentArea;
        const appWidth = this._appSize.width - 40;
        const appHeight = this._appSize.height - 40;
        let scale: number = Math.min(appWidth / width, appHeight / height);
        scale = scale > 1 ? 1 : scale;

        this._currentPage.scale.set(scale, scale);
        this._currentPage.position.x =
            this._renderer.width * 0.5 - this._currentPage.width * this._currentPage.scale.x * 0.5;
        this._currentPage.position.y =
            this._renderer.height * 0.5 - this._currentPage.height * this._currentPage.scale.y * 0.5;
    }

    public get stage(): Container
    {
        return this._stage;
    }

    public render = (): void =>
    {
        if (this._currentPage) {
            const now = Date.now();
            this._currentPage.update((now - this._elapsedTime) * 0.001);
            this._elapsedTime = now;
        }

        this._renderer.render(this._stage);
        this._stats.update();
        window.requestAnimationFrame(this.render);
    };
}