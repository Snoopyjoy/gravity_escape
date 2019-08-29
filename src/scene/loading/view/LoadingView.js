import * as PIXI from 'pixi.js';
import LayerManager from '../../../view/LayerManager';
import  { Consts } from '../../../model/Consts';
import ProcessBar from '../../../view/components/ProcessBar';
import ViewPosition from '../../../model/ViewPosition';

class LoadingView extends PIXI.utils.EventEmitter {
    constructor(loader, model) {
        super();
        this.loader = loader;
        this.itemMap = new Map();
        this.model = model;
        this.layerManager = LayerManager.getIns();
    }

    show() {
        const sheet = this.loader.resources.res_0.spritesheet;

        const processBar = new ProcessBar({
            texture: sheet.textures['daojujindutiaodi.png'],
            left: 12,
            right: 12,
            width: 284,
        },
        {
            texture: sheet.textures['daojujindutiao.png'],
            left: 12,
            right: 12,
            width: 280,
            x: 2,
            y: 2,
        });
        const procPos = new ViewPosition(ViewPosition.PositionTypes.local,
            ViewPosition.AlignTypes.center, ViewPosition.AlignTypes.center
        );

        const bg = new PIXI.Sprite(sheet.textures['loadingdi2.png']);
        const bgPos = new ViewPosition(ViewPosition.PositionTypes.local,
            ViewPosition.AlignTypes.center, ViewPosition.AlignTypes.center,
            0, 0, null, null, 'cover'
        );

        this.itemMap.set('processBar', processBar);
        this.itemMap.set('bg', bg);

        this.layerManager.addToLayer({ target: bg, layer: Consts.LAYER_GAME, pos: bgPos });
        this.layerManager.addToLayer({ target: processBar, layer: Consts.LAYER_GAME, pos: procPos });

        this.emit('show');

        this.loader.add('hd_bg', '/res/img/loadingdi.png');
        this.loader.load(() => {
            const hdBg = new PIXI.Sprite(this.loader.resources.hd_bg.texture);

            this.itemMap.set('hdBg', hdBg);
            this.layerManager.addToLayer({ target: hdBg, layer: Consts.LAYER_GAME, pos: bgPos, index: 1 });
            this.removeChild('bg');
        });
    }

    removeChild(childName) {
        const childObj = this.itemMap.get(childName);

        this.layerManager.removeFromLayer({ target: childObj, layer: Consts.LAYER_GAME });
        this.itemMap.delete(childName);
    }

    destroy() {
        if (this.itemMap && this.itemMap.size > 0) {
            this.itemMap.forEach((item) => {
                this.layerManager.removeFromLayer({ target: item, layer: Consts.LAYER_GAME });
                item.destroy();
            });
        }
        this.itemMap.clear();
        this.itemMap = null;
        this.layerManager = null;
    }
}

export default LoadingView;
