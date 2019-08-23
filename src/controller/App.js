/**
 * @fileOverview application
 * @createTime 2019-03-12 20:20
 * @author 何小亮<hel13140302@126.com> {@link https://github.hxl2lgy.top}
 * @version 0.0.1
 */

import * as LayerManager from './LayerManager';
import * as SceneManager from './SceneManager';
import * as PIXI from 'pixi.js';
import { Config } from '../config/Config';
import AppData from '../model/AppData';

let instance;

class App {
    constructor(app) {
        LayerManager.init(app, Config.layers);
        SceneManager.init(app);
        this.sceneManager = SceneManager;
        this.layerManager = LayerManager;
        this.app = app;
        this.currentScene = null;
        this.sceneMap = {};
        this.loader = new PIXI.Loader();
        this.data = new AppData();
    }

    changeScene(scene) {
        SceneManager.changeScene(scene);
    }
}

function init(app) {
    if (!instance) {
        instance = new App(app);
    }

    return instance;
}

function getApp() {
    return instance;
}

export { init, getApp };
