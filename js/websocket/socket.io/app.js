// 创建一个http的server
let app = require('http').createServer();

// 支持跨域
let io =require('socket.io')(app,{ cors: true});

let PORT = 8848;
app.listen(PORT);

let clientCount = 0;


console.log('port',PORT);
io.on('connection',function(socket){
  clientCount ++;
  socket.nickname = 'user' + clientCount;
  // 这是进行了广播
  io.emit('enter',socket.nickname + 'comes in');
  socket.on('message',function(str){
    io.emit('message', socket.nickname + 'says' + str);
  })
  socket.on('disconnect',function(){
    io.emit('leave', socket.nickname + 'left');
  })
})