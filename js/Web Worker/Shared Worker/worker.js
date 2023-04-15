
const connections = []
console.log(123)
self.addEventListener('connect' , (event) => {
  const port = event.ports[0];
  connections.push(port);

  port.addEventListener('message', event => {
    const message = event.data;
    // 处理消息
    // 将响应发送回窗口
    connections.forEach(connection => {
      connection.postMessage('Hello from the SharedWorker!');
    });
  });
  port.postMessage('连接成功')

  port.start();
})
