import * as PIXI from 'pixi.js';
import * as Messager from '../../../controller/Messager';
import  { Consts } from '../../../config/Consts';
import Button from '../../../ui/components/Button';
import ProcessBar from '../../../ui/components/ProcessBar';
const messager = Messager.getIns();

class LoadingView {
    constructor(loader) {
        this.loader = loader;
    }

    show() {
        const sheet = this.loader.resources.res_0.spritesheet;

        const processBar = new ProcessBar({
            texture: sheet.textures['daojujindutiaodi.png'],
            left: 12,
            right: 12,
        },
        {
            texture: sheet.textures['daojujindutiao.png'],
            left: 12,
            right: 12,
            x: 2,
            y: 2,
        });

        messager.emit(messager.types.ADD_TO_LAYER, { target: processBar, layer: Consts.LAYER_GAME });
    }

    dispose() {

    }
}

export default LoadingView;
