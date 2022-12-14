import {Container, Sprite, Texture} from "pixi.js";
import {Emitter} from "@pixi/particle-emitter";
import {BasePage} from "./BasePage";

export class Page2 extends BasePage
{
    private _emitter: Emitter;
    private _emitContainer: Container = new Container();
    private _campFire: Sprite = Sprite.from(Texture.from("fire.png"));

    public create(): void
    {
        super.create(150, 400);

        this._emitContainer.position.set(80, 310);

        if (!this._emitter) {
            this._emitter = new Emitter(this._emitContainer,
                {
                    lifetime: {
                        min: 0.1,
                        max: 0.75
                    },
                    frequency: 0.001,
                    spawnChance: 0.05,
                    emitterLifetime: 0,
                    maxParticles: 10,
                    addAtBack: false,
                    pos: {
                        x: 0,
                        y: 0
                    },
                    behaviors: [
                        {
                            type: "alpha",
                            config: {
                                alpha: {
                                    list: [
                                        {
                                            time: 0,
                                            value: 0.62
                                        },
                                        {
                                            time: 1,
                                            value: 0
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            type: "moveSpeedStatic",
                            config: {
                                min: 500,
                                max: 500
                            }
                        },
                        {
                            type: "scale",
                            config: {
                                scale: {
                                    list: [
                                        {
                                            time: 0,
                                            value: 0.25
                                        },
                                        {
                                            time: 1,
                                            value: 0.75
                                        }
                                    ]
                                },
                                minMult: 1
                            }
                        },
                        {
                            type: "color",
                            config: {
                                color: {
                                    list: [
                                        {
                                            time: 0,
                                            value: "fff191"
                                        },
                                        {
                                            time: 1,
                                            value: "ff622c"
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            type: "rotation",
                            config: {
                                accel: 0,
                                minSpeed: 50,
                                maxSpeed: 50,
                                minStart: 265,
                                maxStart: 275
                            }
                        },
                        {
                            type: 'textureSingle',
                            config: {
                                texture: Texture.from("fireParticle.png")
                            }
                        },
                        {
                            type: "spawnShape",
                            config: {
                                type: "torus",
                                data: {
                                    x: 0,
                                    y: 0,
                                    radius: 10,
                                    innerRadius: 0,
                                    affectRotation: false
                                }
                            }
                        }
                    ]
                });
        }

        this._emitter.emit = true;
        this._campFire.position.set(0, 230);
        this.addChild(this._campFire);
        this.addChild(this._emitContainer);
    }

    public update(dt: number): void
    {
        super.update(dt);
        this._emitter.update(dt);
    }

    public clean()
    {
        super.clean();
        this._emitter.emit = false;

    }
}