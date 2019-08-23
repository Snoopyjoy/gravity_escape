/**
 * @fileOverview test
 * @createTime 2019-03-06 11:34
 * @author 何小亮<hel13140302@126.com> {@link https://github.hxl2lgy.top}
 * @version 0.0.1
 */
import * as axios from 'axios';

//'http://23u757033f.zicp.vip:40360/api'
function startRequest(){
    axios.post('http://172.10.150.69:6303/api', {
        method: 'user.login',
        data: { user_id: '1001', token: 'string', uuid: 'string', app_resource: '0', game: '2' },
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
}

export {
    startRequest
};
