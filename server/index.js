var userApi = require('./api/userApi');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var formidable = require('formidable');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// 后端api路由
app.use('/api/user', userApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
