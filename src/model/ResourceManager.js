/*
 * @Author: hexiaoliang
 * @Date: 2019-08-28 19:55:51
 * @Last Modified by: hexiaoliang
 * @Last Modified time: 2019-08-29 11:11:37
 */
let instance;

class ResourceManager {
    static getIns() {
        if (!instance) {
            instance = new ResourceManager();
        }

        return instance;
    }
}

export default { getIns: ResourceManager.getIns };
