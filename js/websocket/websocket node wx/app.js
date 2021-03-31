// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebsocketServe = WebSocket.Server;

// 实例化
const wss = new WebsocketServe({
  port : 8848
})

let clientCount = 0;
wss.on('connection',function(ws){
  console.log('connection');
  clientCount ++;
  ws.name = 'user' + clientCount;
  let obj = {};
  obj.type = 'enter';
  obj.data = ws.name + 'enter';
  broadcast(JSON.stringify(obj));
  ws.on('message',function(message){
    console.log('received',message);
    let obj = {};
    obj.type = 'message';
    obj.data = ws.name + message;
    broadcast(JSON.stringify(obj)); 
    // ws.send('echo' + message);
  })
  ws.on('close',function(){
    let obj = {};
    obj.type = 'logout';
    obj.data = ws.name + 'logout';
    broadcast(JSON.stringify(obj)); 
  })
})
function broadcast(str){
  wss.clients.forEach(function(connection){
    connection.send(str)
  })
}