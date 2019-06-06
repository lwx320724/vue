<template>
	<el-container>
		<el-header style="text-align: right; font-size: 12px">
			<span>用户表</span>
		</el-header>
		<el-main>
			<el-table :data="list">
				<el-table-column prop="name" label="姓名" width="120">
				</el-table-column>
				<el-table-column prop="phone" label="电话" width="140">
				</el-table-column>
				<el-table-column prop="address" label="地址">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
	</el-container>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				list: []

			}
		},
		methods: {
			getdata() {
				axios.post('/api/user/selectlogin').then((res) => {
					this.list = res.data;
				}).catch((err) => {
					console.log(err);
				})
			},
			handleDelete(row) {
				var data1 = {
					'name': row.name,
					'biao': 'user',
				}
				axios.post('/api/user/delete',data1).then((res)=>{
					this.getdata();
				})
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