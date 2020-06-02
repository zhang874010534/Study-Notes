// const fs=require('fs')
// fs.readFile('./dd.txt',function(error,data){
//   if(error){
//     console.log(1)
//   }
//   console.log(data.toString())
// })
const http = require('http');
const fs=require('fs')
const url=require('url')

// const os=require('os')
// console.log(os.cpus())
let server = http.createServer();
// const dd=require('./1.js')
// console.log(dd)

server.on('request', function (req, res) {
  console.log('收到请求');
  // let arr = [
  //   { name: '你好', age: 2 },
  //   { name: '1', age: 2 },
  //   { name: '1', age: 2 }
  // ];
  // if (req.url === '/products'){
  //   res.setHeader('Content-type', 'application/json');
  //   res.end(JSON.stringify(arr));
  // }
  let {pathname}=url.parse(req.url)
  if(pathname==='/submit'){
    res.statusCode=302
    res.setHeader('Location','/')
    res.end('')
  }
  if(req.url!=='/'){
    fs.readFile('.'+req.url,function(err,data){
      // res.setHeader('Content-type','text/html')
      // res.setHeader('Content-type','text/plain;charset=utf-8')
      res.end(data)
    })
  }else{
    res.end()
  }
  // res.setHeader('Content-type','text/html')
  // res.end('<p>啊啊啊</p>')
  // 请求的客户端端口
  // console.log(req.socket.remotePort)
});
server.listen(3000, function () {
  console.log('服务器启动成功');
});
