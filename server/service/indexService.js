/**
 * Created at 18/4/22
 * @Autor fozero
 * @Github https://github.com/fozero
 */
import config from '../common/config';
import proxy from '../common/proxy';

// test
export async function test(ctx,parameter) {
    try{
        let url = config.website + config.csUrl.test;
        let csData = await proxy(url, {
            method: 'POST',
            timeout: 30000
        });
        console.log("test result: " + csData);
        return csData;
    }catch (e){
        console.log('test 报错 ： ' + e);
        return null;
    }
}