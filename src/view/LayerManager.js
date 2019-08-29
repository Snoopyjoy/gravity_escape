/**
 * @fileOverview LayerManager
 * @createTime 2019-03-12 19:54
 * @author 何小亮<hel13140302@126.com> {@link https://github.hxl2lgy.top}
 * @version 0.0.1
 */
import { createLayer } from './Layer';
import Utils from '../utils/Utils';

let screenWidth = 0;
let screenHeight = 0;

const LAYER_MAP = new Map();
let instance;

class LayerManager {
    constructor(app, layers) {
        screenWidth = app.screen.width;
        screenHeight = app.screen.height;
        layers.forEach((layerName) => {
            const layerIns = createLayer();

            LAYER_MAP.set(layerName, layerIns);
            app.stage.addChild(layerIns);
        });
    }

    static getIns(app = null, layers = null) {
        if (!instance) {
            if (app === null || layers === null) throw new Error('App instance need app and layers!');
            instance = new LayerManager(app, layers);
        }

        return instance;
    }

    getLayer(name) {
        return LAYER_MAP.get(name);
    }

    showLayer(name) {
        const layer = this.getLayer(name);

        if (layer) layer.visible = true;
    }

    hideLyaer(name) {
        const layer = this.getLayer(name);

        if (layer) layer.visible = false;
    }

    addToLayer({ target, layer, pos, index }) {
        const layerContainer = this.getLayer(layer);

        if (!layerContainer) {
            throw new Error(`Layer ${layer} not exist!`);
        }
        if (pos) {
            Utils.translatePosition(pos, target, layerContainer, screenWidth, screenHeight);
        }
        if (index !== undefined && index !== null) {
            layerContainer.addChildAt(target, index);
        }
        else {
            layerContainer.addChild(target);
        }
    }

    removeFromLayer({ target, layer }) {
        const layerContainer = this.getLayer(layer);

        if (!layerContainer) {
            throw new Error(`Layer ${layer} not exist!`);
        }

        layerContainer.removeChild(target);
    }
}

export default { getIns: LayerManager.getIns };
