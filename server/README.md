# node-koa2

> 使用koa2搭建的node中间层服务，基于此服务可以快速开发

# quickstart
- git clone git@github.com:fozero/node-koa2.git
- cd node-koa2 & npm install
- npm install -g nodemon
- nodemon run.js
- 浏览器访问http://localhost:3001/


# 目录结构说明
```
|-common
    |-config.js    #项目配置文件
    |-helper.js    #node公共方法
    |-proxy.js     #http请求
|-router          
    |-index.js      #页面路由
|-views
    |-index.html    #静态页面
|-public            #静态资源路径
    |-robots.txt    
    |-static
|-service            #后端接口请求
    |-indexService.js   
|-app.js              #koa配置
|-package.json        #项目依赖
|-run.js              #start
```

# 联系我

- 如有问题，欢迎给我提[issues](https://github.com/fozero/node-koa2/issues)
- [https://github.com/fozero](https://github.com/fozero)