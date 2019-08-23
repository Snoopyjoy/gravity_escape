/**
 * @fileOverview sceneCenter
 * @createTime 2019-03-13 09:57
 * @author 何小亮<hel13140302@126.com> {@link https://github.hxl2lgy.top}
 * @version 0.0.1
 */
import * as loading from '../scene/loading/index';
const sceneMap = new Map();
let currentScene = null;

function init() {
    sceneMap.set(loading.name, loading.Ref);
}

function changeScene(scene) {
    if (currentScene) {
        currentScene.dispose();
    }
    const SceneRef = sceneMap.get(scene);

    if (!SceneRef) throw new Error(`scene ${scene} is not exist`);

    currentScene = new SceneRef({ name: scene });
    currentScene.startUp();

    return currentScene;
}

function getCurrentScene() {
    return currentScene;
}

export { init, changeScene, getCurrentScene };
