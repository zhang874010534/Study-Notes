### 跳转到脚本所在目录  
cd $(dirname "$0") || exit 1  

### 对上面的脚本的解释
$0          	  当前Shell程序的文件名
dirname $0  	  获取当前Shell程序的路径
cd $(dirname $0)  进入当前Shell程序的目录
exit 1            如果获取不到则退出脚本  
