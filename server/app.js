/**
 * Created at 18/4/22
 * @Autor fozero
 * @Github https://github.com/fozero
 */
import path  from 'path';//node基础模块
import Koa from 'koa';//koa
import compress from 'koa-compress';//设置gzip
import cors from 'koa-cors';//koa跨域设置
import logger from 'koa-logger';//koa日志模块
import json from 'koa-json';//koaJson模块
import server from 'koa-static';//koa静态模块
import send from 'koa-send';//发送文件
import convert from 'koa-convert';//koa转换generator中间件到anync中间件
import artTemplate from 'koa-artTemplate';//html模板引擎
import bodyParser from 'koa-bodyparser';//body解析
import session from 'koa-session';//session模块
import {KoaErr} from './common/helper';
import index from './router/index';

const app = new Koa();
app.keys = ['im a newer secret'];

// 全局错误处理
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || 500;
        if(parseInt(ctx.status) === 500){
            ctx.body = ctx.render('/500Error',{});
        }
    }
    console.log("ctx.status:"+ctx.status)
    if(parseInt(ctx.status) === 404){
        ctx.body = ctx.render('/404Error',{});
    }
});
// 使用自定义错误
app.use(async (ctx, next) => {
    ctx.Err = KoaErr;
    await next()
});
// 设置Header
app.use(async (ctx, next) => {
    await next();
    ctx.set('X-Powered-By', 'act-koa2');
});
// 设置跨域
app.use(convert(cors()));
// 传输JSON
app.use(convert(json()));
// 设置gzip
app.use(convert(compress({
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
})));
app.use(bodyParser(
    {
        extendTypes: {
            json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
        }
    }
));
var CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
};
app.use(convert(session(CONFIG,app)));
// 记录所用方式与时间
app.use(convert(logger()));
// logger
app.use(async(ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// 设置渲染引擎
app.use(artTemplate(path.resolve(__dirname, 'views')));
// 静态文件夹
app.use(convert(server(path.resolve(__dirname, 'public'))));
// 发送文件，如HTML
app.use(async (ctx, next) => {
    ctx.send = send
    await next()
});
app.use(async (ctx,next)=>{
    console.log("ctx.method:"+ctx.method)
     await next();
});

app.use(index.routes());
app.use(index.allowedMethods());

// response
app.listen(process.env.PORT || 3001, ()=>console.log('Koa start at 3001...'));

