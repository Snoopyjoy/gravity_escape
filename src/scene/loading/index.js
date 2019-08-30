/**
 * @fileOverview view
 * @createTime 2019-03-12 21:13
 * @author 何小亮<hel13140302@126.com> {@link https://github.hxl2lgy.top}
 * @version 0.0.1
 */
import { Consts } from '../../model/Consts';
import Scene from '../../controller/Scene';
import LoadingView from './view/LoadingView';
import LoadingData from './model/LoadingData';
import * as PIXI from 'pixi.js';
import ParallelTasks from '../../model/ParallelTasks';
import LoaderTask from '../../model/LoaderTask';

const name = Consts.SCENE_LOADING;

class LoadingModule extends Scene {
    constructor({ loader, name }) {
        super({ loader, name });
        this.view.once('show', () => {
            const loader1 = new PIXI.Loader();

            loader1.add('res2', '/res/img/pp-1.json');
            loader1.add('res3', '/res/img/pp-0.json');
            const loadTask = new LoaderTask(loader1);
            const pTask = new ParallelTasks(loadTask);

            // pTask.addLoader(loader1);
            pTask.onProcess.add((target) => {
                console.log(target.progress);
            });
            // loader1.load();
            pTask.start();
        });
    }

    get viewClass() {
        return LoadingView;
    }

    get modelClass() {
        return LoadingData;
    }

    static get name() {
        return name;
    }

    destroy() {
        super.destroy();
    }
}
export default LoadingModule;
