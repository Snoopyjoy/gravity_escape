/**
 * @fileOverview application
 * @createTime 2019-03-12 20:20
 * @author 何小亮<hel13140302@126.com> {@link https://github.hxl2lgy.top}
 * @version 0.0.1
 */

import LayerManager from '../view/LayerManager';
import SceneManager from './SceneManager';
import ProcessManager from '../model/ProcessManager';
import * as PIXI from 'pixi.js';
import Config from '../config/Config';
import AppModel from '../model/AppModel';

let instance;

class App {
    constructor(app) {
        this.sceneManager = SceneManager.getIns();
        this.layerManager = LayerManager.getIns(app, Config.layers);
        this.processManager = ProcessManager.getIns();
        this.app = app;
        this.data = AppModel.getIns();
    }

    changeScene(scene) {
        this.sceneManager.changeScene(scene);
    }

    static getIns(app = null) {
        if (!instance) {
            if (app === null) throw new Error('App instance need app!');
            instance = new App(app);
        }

        return instance;
    }
}

export default { getIns: App.getIns };
