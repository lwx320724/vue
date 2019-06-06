<template>
	<div style="margin: 0; padding: 0;">
		<div><span style="font-size: 1.5rem;">你好</span>
			<span>{{xm}}</span>
			<span style="float: right;margin-right: 10px;cursor:pointer" @click="fhui()">退出</span>

		</div>
		<el-container style="height: 500px; border: 1px solid #eee">
			<el-aside width="200px" style="background-color: rgb(238, 241, 246)">
				<el-menu :default-openeds="['1', '3']">
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-message"></i>信息表</template>
						<el-menu-item-group>
							<el-menu-item index="1-1" @click="yhxx()">用户表</el-menu-item>
							<el-menu-item index="1-2" @click="ygxx()">员工表</el-menu-item>
							<el-menu-item index="1-3" @click="cdxx()">菜单表</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-menu"></i>订单</template>
						<el-menu-item-group>
							<el-menu-item index="2-1" @click="ddxx()">订单</el-menu-item>
							<el-menu-item index="2-2" @click="pjxx()">评价</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<transition>
				<router-view></router-view>
			</transition>
		</el-container>
	</div>
</template>
<style>
	.el-aside {
		color: #333;
	}
</style>

<script>
	import axios from 'axios';
	import { setCookie, getCookie } from '../../src/js/cookieUtil'
	export default {
		data() {
			return {
				list: [],
				xm: ''

			}
		},
		methods: {
			getdata() {
				axios.post('/api/user/selectlogin1').then((res) => {
					this.list = res.data;
					var user = getCookie("name");
					if(user == "") {
						this.$router.replace("/login1");
					} else {
						for(var i = 0; i < this.list.length; i++) {
							if(this.list[i].number == user) {
								this.xm = this.list[i].name;
							}
						}
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			yhxx() {
				this.$router.replace("/staff/yhxx");
			},
			ygxx() {
				this.$router.replace("/staff/ygxx");
			},
			cdxx() {
				this.$router.replace("/staff/cdxx");
			},
			ddxx() {
				this.$router.replace("/staff/ddxx");
			},
			pjxx() {
				this.$router.replace("/staff/pjxx");
			},
			fhui() {
				setCookie('name', '');
				this.$router.replace("/login1");
			}
		},
		mounted() {
			this.getdata();
		}
	};
</script>