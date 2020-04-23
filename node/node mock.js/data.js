const express = require('express')
const router = express.Router();
const Mock = require('mockjs');

// 这是子路径
router.get('/', (req, res, next) => {
  let data = Mock.mock({
    resultCode: 200,
    resultJson: {
      'id|10000-20000': 10000,//id: 10000-20000之间的随机一个数字
      'name': '@cname',//name: 随机生成一个中文名
      'star|0-5': '☆',//star: 指定的字符串重复0-5次生成
      'image': '',//image: 
      'locked|1-2': false,//locked: 随机生成 true 或 false
      'address|1': ['北京市', '贵州省', '浙江省'],// role: 北京、贵州、杭州 随机三选一
      'phone': /^(13|14|15|18)[0-9]\d{8}$/,//phone: 符合正则的随机字符串
      'order|10': [//order: 重复10次指定内容组成一个数组
        {
          'id|+1': 10000,//id从10000开始，每次+1
          'orderName': '@ctitle',//orderName: 随机生成一个中文标题
          'orderTime': '@datetime',//orderTime: 随机生成一个 yyyy-MM-dd HH:mm:ss 格式的时间
        }
      ],
      'loginTime': function () {//loginTime: 函数的生成的特定返回值
        return new Date().getTime();
      }
    },
    resultMessage: '查询成功'
  });
  res.json(data)
});

module.exports = router;
