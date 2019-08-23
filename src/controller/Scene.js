import * as PIXI from 'pixi.js';
import Resources from '../config/Resources.json';

class Scene {
    constructor({ loader, name }) {
        if (!loader) {
            loader = new PIXI.Loader();
        }
        this.loader = loader;
        this.loaded = false;
        this.resources = Resources[name] || [];
        this.resources.forEach((resource, index) => {
            this.loader.add(`res_${index}`, resource);
        });
        this._view = null;
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
        throw new Error('view should be overridden');
    }

    get data() {
        throw new Error('data should be overridden');
    }

    dispose() {
        throw new Error('dispose should be overridden');
    }
}

export default Scene;
