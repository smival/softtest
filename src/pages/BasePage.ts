import {Container} from "pixi.js";

export class BasePage extends Container {
    create(): void {}

    update(dt: number): void {}

    clean(): void {
        this.removeChildren();
    }
}