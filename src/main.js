/**
 * @fileOverview main.js
 * @createTime 2019-02-13 20:31
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */
import './view/css/normalize.css';
import './view/css/style.css';
import * as PIXI from 'pixi.js';
// import { scaleToWindow } from './utils/ScaleToWindow';
import { getWindowSize } from './utils/DeviceInfo';
import Config from './config/Config';
import App from './controller/App';
import { Consts } from './model/Consts';
import Fps from './utils/Fps';

const windowSize = getWindowSize();
const windowWidth = windowSize.width;
const windowHeight = windowSize.height;
const windowWH = windowWidth / windowHeight;
const stageW = Config.width;
const stageWH = windowWH > Config.maxWH ? Config.maxWH : windowWH;
const stageH = (Config.width / stageWH) >> 0;

const app = new PIXI.Application({ resizeTo: window, width: stageW,
    height: stageH, backgroundColor: 0xccffff, antialias: true });

document.body.appendChild(app.view);
// scaleToWindow(app.view);

const gameApp = App.getIns(app);

gameApp.changeScene(Consts.SCENE_LOADING);

// eslint-disable-next-line no-undef
if (IS_DEV) {
    Fps.create();
}
// PIXI.loader
//     .add(ximg)
//     .load(setup);

// function setup() {
//     const bunny = new PIXI.Sprite(
//         PIXI.loader.resources[ximg].texture,
//     );

//     bunny.anchor.set(0.5);

//     // move the sprite to the center of the screen
//     bunny.x = app.screen.width / 2;
//     bunny.y = app.screen.height / 2;

//     app.stage.addChild(bunny);
// }

// console.log(atlas);
// console.log(texture);

// PIXI.SpritesheetLoader.use(atlas, () => {

// });
// PIXI.Loader.shared
//     .add('atlas1', '/res/img/pp-0.json')
//     .add('atlas2', '/res/img/pp-1.json')
//     .load((loaderInstance, resources) => {
//         const spr3 = PIXI.Sprite.from('ui7.png');
//         const sheet = PIXI.Loader.shared.resources.atlas2.spritesheet;
//         const anim = new PIXI.AnimatedSprite(sheet.animations.xingxing);

//         anim.x = app.screen.width / 2;
//         anim.y = app.screen.height / 2;
//         anim.anchor.set(0.5);
//         anim.animationSpeed = 0.2;
//         anim.play();

//         spr3.y = 150;
//         app.stage.addChild(spr3, anim);
//     });

