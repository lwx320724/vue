var sqlMap = {
	// 用户
	user: {
		add: 'insert into user(id, name, password, phone, address) values (0, ?, ?, ?, ?)', //顾客注册
		select_name: 'SELECT * from user where name = ?', //查询顾客的用户名
		select_password: 'select * from user where password = ? and name = ?', //顾客登录验证
		addfood: 'insert into food(id, name, img, price,number,lx,ms) values (0, ?, ?, ?,?, ?, ?)', //添加菜
		select_foodname: 'SELECT * from food where name = ?', //菜名查重
		addstaff: 'insert into staffs(id, number, name, sex, password,phone,address,job) values (0, ?, ?, ?, ?,?,?,?)',
		select_staffnumber: 'SELECT * from staffs where number = ?',
		select_staffpassword: 'select * from staffs where password = ? and number = ?',
	}
}

module.exports = sqlMap;