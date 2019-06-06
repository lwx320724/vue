<template>
	<el-container index="1-1">
		<el-header style="text-align: right; font-size: 12px">
			<span>员工表</span>
			<el-button size="mini" @click="tianjia">添加员工</el-button>
		</el-header>
		<el-main>
			<el-table :data="list">
				<el-table-column prop="number" label="员工号">
				</el-table-column>
				<el-table-column prop="name" label="姓名">
				</el-table-column>
				<el-table-column prop="sex" label="性别">
				</el-table-column>
				<el-table-column prop="phone" label="电话">
				</el-table-column>
				<el-table-column prop="address" label="地址">
				</el-table-column>
				<el-table-column prop="job" label="职称">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.row.number)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.row.number)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
	</el-container>
</template>

<script>
	import axios from 'axios';
	import { setCookie, getCookie } from '../../../src/js/cookieUtil';
	export default {
		data() {
			return {
				list: []

			}
		},
		methods: {
			getdata() {
				axios.post('/api/user/selectlogin1').then((res) => {
					this.list = res.data;
				}).catch((err) => {
					console.log(err);
				})
			},
			handleEdit(number) {
				var number1 = getCookie("name");
				if(number == number1) {
					this.$router.replace("/staff/ygxxxg1");
				} else {
					alert("请本人来修改")
				}

			},
			handleDelete(number) {
				var number1 = getCookie("name");
				if(number > 9000) {
					alert("不能删除");
					return;
				}
				if(number1 < 9000) {
					alert("管理员才能操作")
				} else {
					console.log(number);
					var data1={
						"biao":"staffs",
						"number":number
					};
					axios.post('/api/user/deletestaff',data1).then((res) => {
						console.log("删除成功");
						this.getdata();
					}).catch((err) => {
						console.log(err);
					})
				}
			},
			tianjia() {
				var number1 = getCookie("name");
				if(number1 < 9000) {
					alert('您的权限不够');
				} else {
					alert("又有新的员工来了嘛");
					this.$router.replace("/staff/ygxxxg");
				}

			}

		},
		mounted() {
			this.getdata();
		}
	};
</script>

<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}
</style>