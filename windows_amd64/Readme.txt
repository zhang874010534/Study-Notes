小米球官方网站：
http://ngrok.ciqiuwl.cn/
https://manager.xiaomiqiu.com/

小米球VIP自助购买平台：
http://vip.ciqiuwl.cn/

小米球交流群：
①群:150134730
②群:150134648

================================

1、关于配置问题请参看附件中的对照图片！

2、配置文件参数小解：

auth_token：用户连接小米球Ngrok的唯一Token;
需要到https://manager.xiaomiqiu.com/ 注册获得;

httptun httpstun 为隧道名称  可以自定义;

remote_port：映射端口;

subdomain：映射前缀;

http https：协议;

如需增减隧道，按照
httptun:
      remote_port: 80
      subdomain: admin
      proto:
        http: 127.0.0.1:80
格式修改即可;

如果打开ngrok.conf发现格式是乱的，请尝试用其他
文本工具(如:Editplus、Notepad++)打开试试!