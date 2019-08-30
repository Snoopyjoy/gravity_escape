import ITask from './ITask';
import Signal from 'mini-signals';
import LoaderTask from './LoaderTask';

const TOTAL = Symbol('ParallelTask#total');
const LOADER_MAP = Symbol('ParallelTask#complete_task');
const TASKS = Symbol('ParallelTask#tasks');
const PROGRESS = Symbol('ParallelTask#progress');
const STEP = Symbol('ParallelTask#step');
const COMPLETE_NUM = Symbol('ParallelTask#completeNum');
const processHandler = Symbol('ParallelTask#processHandler');
const completeHandler = Symbol('ParallelTask#completeHandler');
const ON_COMPLETE = Symbol('ParallelTask#onComplete');
const ON_PRGRESS = Symbol('ParallelTask#onProgress');
const MAX_PROGRESS = 100;

class ParallelTasks extends ITask {
    constructor(...tasks) {
        super();
        this[PROGRESS] = 0;
        this[STEP] = 0;
        this[COMPLETE_NUM] = 0;
        this[TASKS] = tasks || [];
        this[LOADER_MAP] = new WeakMap();
        this[TOTAL] = tasks.length;
        this[TASKS].forEach((task) => {
            task.onProgress.add(this[processHandler], this);
            task.onComplete.add(this[completeHandler], this);
        });
        this[ON_PRGRESS] = new Signal();
        this[ON_COMPLETE] = new Signal();
    }

    start() {
        this[TASKS].forEach((task) => {
            task.start();
        });
    }

    addLoader(loader) {
        const loaderTask = new LoaderTask(loader);

        this[TASKS].push(loaderTask);
        this[TOTAL] = this[TASKS].length;
    }

    get onProcess() {
        return this[ON_PRGRESS];
    }

    get onComplete() {
        return this[ON_COMPLETE];
    }

    [processHandler](loader) {
        let delta = 0;

        if (this[LOADER_MAP].has(loader)) {
            delta = loader.progress - this[LOADER_MAP].get(loader);
        }
        else {
            delta = loader.progress;
        }
        this[LOADER_MAP].set(loader, loader.progress);

        this[STEP] += delta;
        this[PROGRESS] = Math.min(MAX_PROGRESS, this[STEP] / this[TOTAL]);
        this[ON_PRGRESS].dispatch(this);
    }

    [completeHandler]() {
        this[COMPLETE_NUM] += 1;
        if (this[COMPLETE_NUM] === this[TOTAL]) {
            this[PROGRESS] = MAX_PROGRESS;
            this[ON_COMPLETE].dispatch(this);
        }
    }

    get progress() {
        return this[PROGRESS];
    }

    get total() {
        return this[TOTAL];
    }

    destroy() {
        this[ON_PRGRESS].detachAll();
        this[ON_COMPLETE].detachAll();
        this[ON_PRGRESS] = null;
        this[ON_COMPLETE] = null;
        this[TASKS] = null;
    }
}

export default ParallelTasks;
