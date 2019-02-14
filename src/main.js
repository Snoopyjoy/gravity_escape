/**
 * @fileOverview main.js
 * @createTime 2019-02-13 20:31
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */
class Index{
    constructor(){
    }
    async say(){
        const result = await this.getHello();
        alert(result);
    }

    getHello(){
        return new Promise( (resolve, reject)=>{
            try{
                setTimeout(()=>{
                    resolve("hello world");
                },1000);
            }catch(err){
                reject(err);
            }
        } );
    }
}

const indexIns = new Index();
indexIns.say();