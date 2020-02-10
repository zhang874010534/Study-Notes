var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')
var mime = require('./mime.js')
var config = require('./config')
// creeateServer第一个函数是传给request对象的  request对象有2个参数
// request（http.IncomingMessage 类）
// response（http.ServerResponse 类） 
// 


var server = http.createServer(function (request, response) {
    var urlDemo = './assets/' + request.url
    var ext = path.extname(request.url)
    ext = ext.slice(1)
    var ContentType = mime[ext] || 'text/plain'

    if (ext.match(config.fileMatch)) {
        response.setHeader('Cache-Control', 'max-age=' + config.maxAge)
    }
    fs.stat(urlDemo, (err, stats) => {
        if (err) {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            })
            response.write(request.url + " is not found")
            response.end()
        } else {
            //需要服务端先找得到这个文件才可以比较
            //判断是否需要发送请求（读取文件），不需要就直接读取缓存
            var LastModified = stats.mtime
            if (request.headers['if-modified-since'] == LastModified) {
                response.setHeader('Last-Modified', LastModified)
                response.writeHead(304, 'Not Modified')
                response.end()
            } else {
                //读文件
                fs.readFile(urlDemo, (err, data) => {
                    if (err) {
                        response.writeHead(500, {
                            'Content-Type': 'text/plain'
                        })
                        response.end()
                    } else {
                        response.setHeader('Last-Modified', stats.mtime)
                        response.writeHead(200, {
                            'Content-Type': ContentType
                        })
                        response.write(data)
                        response.end()
                    }
                })
            }

        }
    })

})
server.listen(2333)//监听端口