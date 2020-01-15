@echo OFF
color 0a
Title 小米球Ngrok启动工具 by:刺球
Mode con cols=109 lines=30
:START
ECHO.
Echo                  ==========================================================================
ECHO.
Echo                                         小米球NgrokNgrok客户端启动工具
ECHO.
Echo                                         作者:刺球 QQ：752102401
ECHO.
Echo                                         官方QQ群：150134730
ECHO.
Echo                                                官方网站：
ECHO.
Echo 					     http://ngrok.ciqiuwl.cn/
ECHO.
Echo                                         https://manager.xiaomiqiu.com/
ECHO.
Echo                  ==========================================================================
Echo.
echo.
echo.
:TUNNEL
Echo                                      输入需要启动的隧道名称，如“httptun” 
Echo                             同时启动多个隧道请用空格分割，如“httptun httpstun tcptun”
Echo				     **********************************************
Echo                              ****启动隧道名称需先在ngrok.conf文件中配置****
Echo				     **********************************************
ECHO.
ECHO.
ECHO.
set /p tuns=   请输入需要启动的隧道名称：
ECHO.
ECHO.
echo.
ngrok.exe -config ngrok.conf -log=ngrok.log start %tuns%
PAUSE
goto TUNNEL

