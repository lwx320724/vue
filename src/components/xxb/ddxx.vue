<template>
	<el-container>
		<el-header style="text-align: right; font-size: 12px">
			<span>订单表</span>
		</el-header>
		<el-main>
			<el-table :data="list">
				<el-table-column prop="name" label="顾客">
				</el-table-column>
				<el-table-column prop="lr" label="点的菜">
				</el-table-column>
				<el-table-column prop="price" label="账单金额">
				</el-table-column>
				<el-table-column prop="time" label="点餐时间">
				</el-table-column>
				<el-table-column prop="zt" label="状态">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="danger" @click="fk(scope.row.id,scope.row.zt)">确认付款</el-button>
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
				axios.post('/api/user/selectddxx').then((res) => {
					this.list = res.data;
				}).catch((err) => {
					console.log(err);
				})
			},
			fk(id, zt) {
				if(zt == "未付款") {
					zt = "已付款";
					var data1 = {
						"id": id,
						"zt": zt
					};
					axios.post('/api/user/updateddzt',data1).then((res) => {
						this.getdata()
					}).catch((err) => {
						console.log(err);
					})
				}else{
					alert("已经付款了")
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