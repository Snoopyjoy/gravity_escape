class ITask {
    get onProgress() {
        throw new Error('please complete onProgress');
    }

    get onComplete() {
        throw new Error('please complete onComplete');
    }

    get progress() {
        throw new Error('please complete progress func');
    }

    get total() {
        throw new Error('please complete total func');
    }

    destroy() {
        throw new Error('please complete destroy func');
    }
}

export default ITask;
