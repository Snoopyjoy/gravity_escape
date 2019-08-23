import * as PIXI from 'pixi.js';
const PROCESS = Symbol('process');

class LoadingData extends PIXI.utils.EventEmitter {
    constructor() {
        super();
        this.process = 0;
    }

    set process(val) {
        this[PROCESS] = val;
    }

    get process() {
        return this[PROCESS];
    }
}

export default LoadingData;
