// 导入路由
const http = require('http');
const express = require('express');
const server = express();
const data = require('./data.js');
// 这是主路径
server.use('/user', data);
//启动服务
http.createServer(server).listen(3000);
console.log(`Express server start, http://localhost:3000`);



