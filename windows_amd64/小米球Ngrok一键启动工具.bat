@echo OFF
color 0a
Title С����Ngrok�������� by:����
Mode con cols=109 lines=30
:START
ECHO.
Echo                  ==========================================================================
ECHO.
Echo                                         С����NgrokNgrok�ͻ�����������
ECHO.
Echo                                         ����:���� QQ��752102401
ECHO.
Echo                                         �ٷ�QQȺ��150134730
ECHO.
Echo                                                �ٷ���վ��
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
Echo                                      ������Ҫ������������ƣ��硰httptun�� 
Echo                             ͬʱ�������������ÿո�ָ�硰httptun httpstun tcptun��
Echo				     **********************************************
Echo                              ****�����������������ngrok.conf�ļ�������****
Echo				     **********************************************
ECHO.
ECHO.
ECHO.
set /p tuns=   ��������Ҫ������������ƣ�
ECHO.
ECHO.
echo.
ngrok.exe -config ngrok.conf -log=ngrok.log start %tuns%
PAUSE
goto TUNNEL

