/**
 * Created at 18/4/22
 * @Autor fozero
 * @Github https://github.com/fozero
 */
import Router from  'koa-router';
import {test} from '../service/indexService'
const index = new Router();

index
    .get('/',async ctx=>{
        let parameter = ctx.query;
        ctx.body=ctx.render('/index',{msg:'hello2'})
    })
    .get('/test',async ctx=>{
        let parameter = ctx.query;
        let result = await test(ctx,parameter);
        console.log("result:"+result)
        ctx.body=result;
    })
export default index;















