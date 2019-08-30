import * as PIXI from 'pixi.js';
import Resources from '../config/Resources.json';

const VIEW = Symbol('view');
const MODEL = Symbol('model');

class Scene {
    constructor({ loader, name }) {
        if (!loader) {
            loader = new PIXI.Loader();
        }
        this.loader = loader;
        this.loaded = false;
        const resources = Resources[name] || [];

        resources.forEach((resource, index) => {
            this.loader.add(`res_${index}`, resource);
        });

        this.loader.onProgress.add((loader, res) => {
            // console.log(loader, res);
        });

        this[MODEL] = new this.modelClass();
        this[VIEW] = new this.viewClass(loader, this.model);
    }

    startUp() {
        if (this.loaded) {
            this.show();
        }
        else {
            this.startLoad();
        }
    }

    startLoad() {
        this.loader.load(() => {
            this.loaded = true;
            this.show();
        });
    }

    show() {
        if (!this.loaded) {
            this.startUp();

            return;
        }

        this.view.show();
    }

    get view() {
        return this[VIEW];
    }

    get model() {
        return this[MODEL];
    }

    get viewClass() {
        throw new Error('view should be overridden');
    }

    get modelClass() {
        throw new Error('data should be overridden');
    }

    destroy() {
        this.view.destroy();
        this.model.destroy();
        this[VIEW] = null;
        this[MODEL] = null;
    }
}

export default Scene;
