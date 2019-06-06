<template>
	<div>
		<div class="title">
			用户注册
		</div>
		<div class="input_group">
			<label>用户名：</label>
			<input class="myinput" type="text" placeholder="请输入用户名" v-model="username" />
		</div>
		<div class="input_group">
			<label>密码：</label>
			<input class="myinput" type="password" placeholder="请输入密码" v-model="userpass" />
		</div>
		<div class="input_group">
			<label>手机号：</label>
			<input class="myinput" type="number" placeholder="请输入手机号" v-model="userphone" />
		</div>
		<div class="input_group">
			<label>地址：</label>
			<input class="myinput" type="text" placeholder="请输入地址" v-model="useraddress" />
		</div>
		<button class="ok_btn" @click="addUser">注册</button>
		<button class="cancel_btn" @click="backLogin">{{backText}}</button>
	</div>
</template>
<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				backText: '返回',
				username: '',
				userpass: '',
				userphone: '',
				useraddress: ''
			}
		},
		methods: {
			backLogin() {

				this.$router.replace('/')

			},
			addUser() {
				if(this.username == "" || this.userpass == "" || this.userphone == "" || this.useraddress == "") {
					alert("请输入用户名或密码")
				} else {
					var data1 = {
						'name': this.username,
						'password': this.userpass,
						'phone': this.userphone,
						'address': this.useraddress
					}
					axios.post('/api/user/addUser', data1).then((res) => {
						/*接口的传值是(-1,该用户已存在)*/
						if(res.data == -1) {
							alert("该用户名已经存在");
							this.username = ''
							this.userpass = ''
							this.userphone = ''
							this.useraddress = ''
						} else if(res.status == 200) {
							alert("注册成功");
							this.username = ''
							this.userpass = ''
							this.userphone = ''
							this.useraddress = ''
							setTimeout(function() {
								this.$router.replace('/');
							}.bind(this), 1000)
						}
					})
				}
			}

		}
	}
</script>

<style scoped>
	.title {
		color: #273444;
		font-size: 1.5em;
		text-align: center;
		margin: 0 0 20px 0;
	}
	
	.input_group {
		display: flex;
		justify-items: center;
		align-items: flex-start;
		padding: 10px;
		line-height: 40px;
	}
	
	.input_group label {
		width: 30%;
	}
	
	.input_group input {
		width: 65%;
	}
	
	.cancel_btn,
	.ok_btn {
		box-sizing: border-box;
		border: none 0;
		height: 44px;
		line-height: 44px;
		width: 75%;
		background: #4187db;
		font-size: 16px;
		border-radius: 3px;
		transition: all 0.5s ease;
		cursor: pointer;
		outline: none;
		color: #fff;
		margin: 0 auto;
		margin-bottom: 15px;
	}
	
	.cancel_btn {
		background-color: red;
	}
</style>