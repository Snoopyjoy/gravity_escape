/*
 * @Author: hexiaoliang
 * @Date: 2019-08-22 20:23:35
 * @Last Modified by: hexiaoliang
 * @Last Modified time: 2019-08-22 22:28:32
 */

import * as PIXI from 'pixi.js';
import EventTypes from './EventTypes';

let instance;

class Messager extends PIXI.utils.EventEmitter {
    constructor() {
        super();
        this.types = EventTypes;
    }
}

function getIns() {
    if (!instance) {
        instance = new Messager();
    }

    return instance;
}

export { getIns };
