/*
 * @Author: hexiaoliang
 * @Date: 2019-08-23 17:25:31
 * @Last Modified by: hexiaoliang
 * @Last Modified time: 2019-08-27 17:14:15
 */
import * as PIXI from 'pixi.js';
const PROCESS = Symbol('process');

class ProcessBar extends PIXI.Container {
    constructor(baseData, barData,) {
        super();
        const base = new PIXI.NineSlicePlane(baseData.texture,
            baseData.left || 0, baseData.top || 0, baseData.right || 0, baseData.bottom || 0);
        const bar = new PIXI.NineSlicePlane(barData.texture,
            barData.left || 0, barData.top || 0, barData.right || 0, barData.bottom || 0);

        if (baseData.x) base.x = baseData.x;
        if (baseData.y) base.y = baseData.y;
        if (baseData.width) base.width = baseData.width;
        if (barData.x) bar.x = barData.x;
        if (barData.y) bar.y = barData.y;
        this.maxWidth = barData.width || bar.width;
        bar.width = 0;
        this.base = base;
        this.bar = bar;
        this.addChild(base, bar);
        this[PROCESS] = 0;
    }

    set process(val) {
        val = Number(val) || 0;
        val = val < 0 ? 0 : val;
        val = val > 1 ? 1 : val;
        this[PROCESS] = val;
        this.bar.width = (val * this.maxWidth) >> 0;
    }

    get process() {
        return this[PROCESS];
    }

    destroy() {
        this.base.destroy();
        this.bar.destroy();
        super.destroy();
    }
}

export default ProcessBar;
