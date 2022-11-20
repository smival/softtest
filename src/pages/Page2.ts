import {Container, Sprite, Texture} from "pixi.js";
import {Emitter} from "@pixi/particle-emitter";
import {BasePage} from "./BasePage";

export class Page2 extends BasePage
{
    private _emitter: Emitter;
    private _emitContainer: Container = new Container();

    public create(): void
    {
        this._emitContainer.position.x = 80;
        this._emitContainer.position.y = 80;

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

        this._emitter.emit = true;
        this.addChild(Sprite.from(Texture.from("fire.png")));
        this.addChild(this._emitContainer);
    }

    public update(dt: number): void
    {
        this._emitter.update(dt);
        console.log(`dt: ${dt}`);
    }

    public clean()
    {
        super.clean();
        this._emitter.emit = false;
        this._emitter.destroy();
    }
}