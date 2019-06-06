var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
	if(typeof ret === 'undefined') {
		res.send('err');
	} else {
		res.send('ok');
	}
};

// 增加用户接口
router.post('/addUser', (req, res) => {
	var sql = $sql.user.add;
	var sql_name = $sql.user.select_name;
	var params = req.body;
	console.log(params);
	conn.query(sql_name, params.name, function(err, result) {
		if(err) {
			console.log(err);
			return;
		}
		if(result[0] == undefined) {
			conn.query(sql, [params.name, params.password, params.phone, params.address], function(err, result) {
				if(err) {
					console.log(err);
					return;
				}
				if(result) {
					jsonWrite(res, result);
				}
			})
		} else {
			res.send('-1');
		}
	})
});
//查询用户信息是否正确
router.post('/selectUser', (req, res) => {
	var params = req.body;
	var sql_name = $sql.user.select_name;
	var sql_password = $sql.user.select_password;
	conn.query(sql_name, params.name, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		if(result[0] == undefined) {
			res.send('-1') //查询不出username，data返回-1
		} else {
			conn.query(sql_password, [params.password, params.name], function(err, result) {
				if(err) {
					console.log(err)
					return;
				}
				if(result[0] == undefined) {
					res.send('0') //username正确后，password错误，data返回 0
					return;
				} else {
					jsonWrite(res, result);
				}

			})
		}
	})
});

router.post('/selectlogin', (req, res) => {
	var params = req.body;
	conn.query('SELECT * FROM user', function(err, result) {
		console.log(result)
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})
});

router.post('/selectlogin1', (req, res) => {
	var params = req.body;
	conn.query('SELECT * FROM staffs', function(err, result) {
		console.log(result)
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})
});

router.post('/selectfood', (req, res) => {
	var params = req.body;
	conn.query('SELECT * FROM food', function(err, result) {
		console.log(result)
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})
});

router.post('/selectStaff', (req, res) => {
	var params = req.body;
	var sql_number = $sql.user.select_staffnumber;
	var sql_password = $sql.user.select_staffpassword;
	conn.query(sql_number, params.number, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		if(result[0] == undefined) {
			res.send('-1') //查询不出username，data返回-1
		} else {
			conn.query(sql_password, [params.password, params.number], function(err, result) {
				if(err) {
					console.log(err)
					return;
				}
				if(result[0] == undefined) {
					res.send('0') //username正确后，password错误，data返回 0
					return;
				} else {
					jsonWrite(res, result);
				}

			})
		}
	})
});

router.post('/addFoods', (req, res) => {
	var sql = $sql.user.addfood
	var params = req.body;
	console.log(params);
	conn.query(sql, [params.name, params.img, params.price, params.number, params.lx, params.ms], function(err, result) {
		if(err) {
			console.log(err);
			return;
		}
		if(result) {
			jsonWrite(res, result);
		}
	})
});

router.post("/img", (req, res) => {
	var form = new formidable.IncomingForm();//_dirname 被执行的js文件的绝对路径
	//设置文件上传存放地址
	var targetFile = path.join(__dirname, '../../static/images');
	form.uploadDir = targetFile;
	//执行里面的回调函数的时候，表单已经全部接收完毕了。

	form.parse(req, function(err, fields, files) {
		if(err) throw err;
		var oldpath = files.img.path;
		var newpath = path.join(path.dirname(oldpath), files.img.name);
		var imgurl = path.join('../../../static/images', files.img.name);
		fs.rename(oldpath, newpath, (err) => {
			if(err) throw err;
		})
		res.end(imgurl); //这里能获取到图片的信息        

	})

})

router.post("/delete", (req, res) => {
	var params = req.body;
	var sql = 'DELETE FROM ' + params.biao + ' where name = "' + params.name + '"';
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})

})
router.post("/update", (req, res) => {
	var params = req.body;
	var sql = 'UPDATE ' + params.biao + ' set price = "' + params.price + '"' + ' where name = "' + params.name + '"';
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})

})

router.post("/selectfoodxx", (req, res) => {
	var params = req.body;
	var sql = 'SELECT * FROM ' + params.biao + ' where name = "' + params.name + '"';
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})

})

router.post("/data", (req, res) => {
	//	res.end(JSON.stringify(req.body));
	var params = req.body;
	var shop = '';
	var zt="未付款";
	var m = 0;
	for(var i = 0; i < params.data.length; i++) {
		var shop1 = shop;
		var m1 = m;
		shop = shop1 + params.data[i].shop + params.data[i].num + '份 ';
		m = m1 + params.data[i].num * params.data[i].price;
	}
	var sql = 'insert into dingdan(id, name, lr, price, time, zt) values (0, ?, ?, ?, ?, ?)'
	conn.query(sql, [params.name, shop, m, params.time, zt], function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})

})

router.post("/selectddxx", (req, res) => {
	var params = req.body;
	var sql = 'SELECT * FROM dingdan ';
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})

})

router.post("/selectddxxname", (req, res) => {
	var params = req.body;
	var sql = 'SELECT * FROM dingdan where name = "' + params.name + '"';
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})

})

router.post("/pingjia", (req, res) => {
	var params = req.body;
	var sql = 'insert into pingjia(id, name, time, fen, text) values (0, ?, ?, ?, ?)';
	conn.query(sql, [params.name, params.time, params.fen, params.text], function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})

})

router.post("/selectpingjia", (req, res) => {
	var params = req.body;
	var sql = 'SELECT * FROM pingjia ';
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})

})

router.post("/staffs", (req, res) => {
	var params = req.body;
	var sql = 'insert into staffs(id, number, name, sex, password, phone, address, job) values (0, ?, ?, ?, ?, ?, ?, ?)';
	var sql_name = 'SELECT * from staffs where number = ?';

	conn.query(sql_name, params.number1, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		if(result[0] == undefined) {
			conn.query(sql, [params.number1, params.name, params.resource, params.pass, params.phone, params.address, params.job], function(err, result) {
				if(err) {
					console.log(err)
					return;
				}
				res.end(JSON.stringify(result));
			})

		} else {
			res.send('-1');
		}
	})

})

router.post("/selectstaffxg", (req, res) => {
	var params = req.body;
	var sql = 'SELECT * FROM staffs where number= "' + params.number + '"';
	console.log(params.number)
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})

})

router.post("/updatestaffmm", (req, res) => {
	var params = req.body;
	var sql = 'update staffs set password = "' + params.pass + '" where number = "' + params.number1 + '"';
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})

})

router.post("/updatestaffxx", (req, res) => {
	var params = req.body;
	var sql = 'update staffs set phone = "' + params.phone + '" , address = "' + params.address + '" where number = "' + params.number1 + '"';
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})

})

router.post("/deletestaff", (req, res) => {
	var params = req.body;
	var sql = 'DELETE FROM ' + params.biao + ' where number = "' + params.number + '"';
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})

})

router.post("/deletepj", (req, res) => {
	var params = req.body;
	var sql = 'DELETE FROM ' + params.biao + ' where id = "' + params.id + '"';
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})

})

router.post("/updateddzt", (req, res) => {
	var params = req.body;
	var sql = 'update dingdan set zt = "' + params.zt + '" where id = "' + params.id + '"';
	conn.query(sql, function(err, result) {
		if(err) {
			console.log(err)
			return;
		}
		res.end(JSON.stringify(result));
	})

})

module.exports = router;