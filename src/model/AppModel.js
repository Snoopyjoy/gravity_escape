/*
 * @Author: hexiaoliang
 * @Date: 2019-08-21 20:19:33
 * @Last Modified by: hexiaoliang
 * @Last Modified time: 2019-08-29 11:09:42
 */
import * as PIXI from 'pixi.js';
let instance;

class AppModel extends PIXI.utils.EventEmitter {
    constructor() {
        super();
        this.loader = new PIXI.Loader();
    }

    static getIns() {
        if (!instance) {
            instance = new AppModel();
        }

        return instance;
    }
}

export default { getIns: AppModel.getIns };
