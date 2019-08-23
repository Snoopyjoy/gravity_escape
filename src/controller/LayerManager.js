/**
 * @fileOverview LayerManager
 * @createTime 2019-03-12 19:54
 * @author 何小亮<hel13140302@126.com> {@link https://github.hxl2lgy.top}
 * @version 0.0.1
 */
import { createLayer } from './Layer';
import * as Messager from './Messager';
const messager = Messager.getIns();

const LAYERS = {};

function getLayer(name) {
    return LAYERS[name];
}

function init(app, layers) {
    layers.forEach((layerName) => {
        const layerIns = createLayer();

        LAYERS[layerName] = layerIns;
        app.stage.addChild(layerIns);
    });
    messager.on(messager.types.ADD_TO_LAYER, addToLayerHandler);
}

function addToLayerHandler({ target, layer }) {
    const layerContainer = getLayer(layer);

    if (!layerContainer) {
        throw new Error(`Layer ${layer} not exist!`);
    }

    layerContainer.addChild(target);
}

function hideLayer(name) {
    const layer = this.getlayer(name);

    layer.visible = false;
}

function showLayer(name) {
    const layer = this.getlayer(name);

    layer.visible = true;
}

export { init, getLayer, hideLayer, showLayer };
