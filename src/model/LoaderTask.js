import ITask from './ITask';

class LoaderTask extends ITask {
    constructor(loader) {
        super();
        this.loader = loader;
    }

    start() {
        this.loader.load();

        return this;
    }

    get onProgress() {
        return this.loader.onProgress;
    }

    get onError() {
        return this.loader.onError;
    }

    get onComplete() {
        return this.loader.onComplete;
    }

    get progress() {
        return this.loader.progress;
    }

    get total() {
        return this.loader._queue.length();
    }

    destroy() {
        this.loader = null;
    }
}

export default LoaderTask;
