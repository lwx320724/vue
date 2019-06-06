<template>
	<div class="backlogin">
		<div class="login_box">
			<div class="title">用户登录</div>
			<div>
				<input class="myinput" type="text" placeholder="手机号/用户名" v-model="username" />
			</div>
			<div>
				<input @keyup.13="login" class="myinput" type="password" placeholder="口令" v-model="password" />
			</div>
			<div class="login_other">
				<a href="/login1">员工登录</a>
			</div>
			<button :disabled="disablebtn" class="login" @click="login">{{loginText}}</button>
			<button :disabled="disablebtn" class="zhuce" @click="zhuce">{{zhuceText}}</button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import {setCookie,getCookie}from '../../src/js/cookieUtil'

	export default {
		name: "backlogin",
		data() {

			return {
				username: "",
				password: "",
				disablebtn: false,
				loginText: "登录",
				zhuceText: "注册"
			};
		},
		methods: {
			login() {
				if(this.username == "" || this.password == "") {
					alert("请输入用户名或密码")
				} else {
					var vm = this;
					this.disablebtn = true;
					this.loginText = "登录中";
					axios.post("/api/user/selectUser", {
							name: this.username,
							password: this.password
						})
						.then(function(res) {
							if(res.data == -1) {
								alert("用户名不存在");
								vm.disablebtn = false;
								vm.loginText = "登录";
								return;
							}
							if(res.data == 0) {
								alert("用户名或密码错误");
								vm.disablebtn = false;
								vm.loginText = "登录";
								return;
							}
							if(res.status == 200) {
								vm.disablebtn = false;
								vm.loginText = "登录";
								setCookie('name', vm.username);
								vm.$router.replace('/home/homehome');
							}

						})

				}

			},

			zhuce() {
				this.$router.replace("/register");
			}
		}
	};
</script>

<style scoped>
	.backlogin {
		margin: 0;
		padding: 0;
	}
	
	.login_box {
		width: 320px;
		margin: 50px auto;
	}
	
	.login_box .myinput {
		width: 100%;
		border: 1px solid #cad3de;
		height: 40px;
		line-height: 40px;
		margin: 5px 0 10px;
		border-radius: 3px;
		padding: 0 10px;
		outline: none;
		box-sizing: border-box;
	}
	
	.login_box .myinput:focus {
		border: 1px solid #4289dc;
	}
	
	.login_other {
		overflow: hidden;
	}
	
	.login_other a {
		float: right;
		color: #727f8f;
	}
	
	.login_other a:hover {
		color: #273444;
	}
	
	.login_other input,
	.login_other label {
		float: left;
		color: #727f8f;
	}
	
	.login_other input {
		margin: 4px 5px 0 0;
	}
	
	.login,
	.zhuce {
		box-sizing: border-box;
		border: none 0;
		height: 44px;
		line-height: 44px;
		width: 100%;
		background: #4187db;
		font-size: 16px;
		border-radius: 3px;
		margin-right: 40px;
		transition: all 0.5s ease;
		cursor: pointer;
		outline: none;
		color: #fff;
		margin-top: 15px;
	}
	
	.zhuce {
		background-color: red;
	}
	
	.login:hover {
		background: #2668b5;
	}
	
	.login[disabled] {
		opacity: 0.8;
	}
	
	.login[disabled]:hover {
		background: #4187db;
	}
	
	.title {
		color: #273444;
		font-size: 1.5em;
		text-align: center;
		margin: 0 0 20px 0;
	}
	
	@media only screen and (max-width: 768px) {
		.login_box {
			width: 280px;
			margin: 50px auto;
		}
	}
</style>