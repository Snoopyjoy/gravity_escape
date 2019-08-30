/**
 * @fileOverview LayerManager
 * @createTime 2019-03-12 19:54
 * @author 何小亮<hel13140302@126.com> {@link https://github.hxl2lgy.top}
 * @version 0.0.1
 */
import { createLayer } from './Layer';
import Utils from '../utils/Utils';

const LAYER_MAP = new Map();
const COMPONENT_MAP = new Map();

let instance;

class LayerManager {
    constructor(app, layers) {
        this.app = app;
        layers.forEach((layerName) => {
            const layerIns = createLayer();

            LAYER_MAP.set(layerName, layerIns);
            app.stage.addChild(layerIns);
        });
        this.resizeHandler = this.resize.bind(this);
        window.addEventListener('resize', this.resizeHandler);
    }

    resize() {
        COMPONENT_MAP.forEach(({ target, pos, layerContainer }) => {
            if (pos) {
                Utils.translatePosition(pos, target, layerContainer, this.stageWidth, this.stageHeight);
            }
        });
    }

    get stageWidth() {
        return this.app.renderer.width;
    }

    get stageHeight() {
        return this.app.renderer.height;
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
            Utils.translatePosition(pos, target, layerContainer, this.stageWidth, this.stageHeight);
        }

        COMPONENT_MAP.set(target, { target, pos, layerContainer });

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
        COMPONENT_MAP.delete(target);
    }
}

export default { getIns: LayerManager.getIns };
