import {App} from "./App";

const game = new App();
const resize = () => {
    game.resize(
        window.innerWidth,
        window.innerHeight);
};

game.start().then(() => {
    window.addEventListener("resize", resize);
    resize();
});