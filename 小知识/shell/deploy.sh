#!/bin/bash

echo 'build 生成生产环境代码'

rm -rf dist && npm run build

echo '上传代码到云主机'

cd dist 8 scp -i ~/.ssh/vikingship.pem -r * root@121.199.70.72:/var/www