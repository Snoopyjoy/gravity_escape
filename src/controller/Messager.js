/*
 * @Author: hexiaoliang
 * @Date: 2019-08-22 20:23:35
 * @Last Modified by: hexiaoliang
 * @Last Modified time: 2019-08-28 16:54:18
 */

import * as PIXI from 'pixi.js';
import EventTypes from './EventTypes';

let instance;

class Messager extends PIXI.utils.EventEmitter {
    constructor() {
        if (instance) {
            throw new Error('please use getIns() function to get instance');
        }
        super();
    }

    get types() {
        return EventTypes;
    }

    static getIns() {
        if (!instance) {
            instance = new Messager();
        }

        return instance;
    }
}

export default Messager;
