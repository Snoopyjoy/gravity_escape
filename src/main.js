/**
 * @fileOverview main.js
 * @createTime 2019-02-13 20:31
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */
import '../static/css/style.css';
import ximg from '../static/img/x.png';
import * as PIXI from '../pixi';
import { scaleToWindow } from './utils/scaleToWindow';

const loader = PIXI.Loader.shared;
const app = new PIXI.Application(480, 800, { backgroundColor: 0x1099bb, antialias: true });

document.body.appendChild(app.view);
console.warn(ximg);

scaleToWindow(app.view);

loader
    .add(ximg)
    .load(setup);

function setup() {
    const bunny = new PIXI.Sprite(
        loader.resources[ximg].texture,
    );

    bunny.anchor.set(0.5);

    // move the sprite to the center of the screen
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;

    app.stage.addChild(bunny);
}

