import * as PIXI from 'pixi.js';

class Task extends PIXI.utils.EventEmitter {
    add() {
        return this;
    }

    start() {
        return this;
    }

    onProcess() {
        return this;
    }
}

export default Task;
