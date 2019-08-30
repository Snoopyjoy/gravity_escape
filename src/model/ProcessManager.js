/*
 * @Author: hexiaoliang
 * @Date: 2019-08-28 19:55:51
 * @Last Modified by: hexiaoliang
 * @Last Modified time: 2019-08-30 15:28:28
 */
import Config from '../config/Config';
let instance;

class ProcessManager {
    creatMultiTask(...tasks) {
        let length = 0;

        tasks.forEach((task) => {
            length += task.length;
        });
    }

    getTotal() {

    }

    static getIns() {
        if (!instance) {
            instance = new ProcessManager();
        }

        return instance;
    }
}

export default { getIns: ProcessManager.getIns };
