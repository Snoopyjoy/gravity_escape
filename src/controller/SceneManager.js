/**
 * @fileOverview sceneCenter
 * @createTime 2019-03-13 09:57
 * @author 何小亮<hel13140302@126.com> {@link https://github.hxl2lgy.top}
 * @version 0.0.1
 */
import LoadingModule from '../scene/loading/index';
const CURRENT_SCENE = Symbol('SceneManager#currentScene');
let instance;

class SceneManager {
    constructor() {
        this.sceneMap = new Map();
        this.sceneMap.set(LoadingModule.name, LoadingModule);
        this[CURRENT_SCENE] = null;
    }

    static getIns() {
        if (!instance) {
            instance = new SceneManager();
        }

        return instance;
    }

    get currentScene() {
        return this[CURRENT_SCENE];
    }

    changeScene(scene) {
        if (this.currentScene) {
            this[CURRENT_SCENE].destroy();
            this[CURRENT_SCENE] = null;
        }
        const SceneRef = this.sceneMap.get(scene);

        if (!SceneRef) throw new Error(`scene ${scene} is not exist`);

        this[CURRENT_SCENE] = new SceneRef({ name: scene });
        this[CURRENT_SCENE].startUp();

        return this[CURRENT_SCENE];
    }
}

export default { getIns: SceneManager.getIns };
