let express = require('express');
let fs = require('fs');
var bodyParser = require('body-parser');
let app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  fs.readFile('./demo.json', (err, data) => {
    res.send(data.toString());
  });
});
app.get('/api/isLogin', (req, res) => {
  res.send({
    data: {
      name: '1'
    }
  });
});
app.post('/api/login', (req, res) => {
  console.log(req.body);
  res.send({
    msg: '登录成功'
  });
});

app.listen(3001, () => {
  console.log('server is work');
});
