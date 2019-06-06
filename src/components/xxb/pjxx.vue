<template>
	<el-container>
		<el-header style="text-align: right; font-size: 12px">
			<span>评价表</span>
		</el-header>
		<el-main>
			<el-table :data="list">
				<el-table-column prop="name" label="顾客">
				</el-table-column>
				<el-table-column prop="fen" label="分">
				</el-table-column>
				<el-table-column prop="text" label="评价">
				</el-table-column>
				<el-table-column prop="time" label="评价时间">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="danger" @click="sc(scope.row)">删除</el-button>
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
				axios.post('/api/user/selectpingjia').then((res) => {
					this.list = res.data;
				}).catch((err) => {
					console.log(err);
				})
			},
			sc(row){
				var data1={
					"id":row.id,
					"biao":"pingjia"
				};
				axios.post('/api/user/deletepj',data1).then((res) => {
					this.getdata();
				}).catch((err) => {
					console.log(err);
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