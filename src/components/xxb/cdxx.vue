<template>
	<el-container>
		<el-header style="text-align: right; font-size: 12px">
			<span>菜单表</span>
			<el-button size="mini" @click="tianjia">添加</el-button>
		</el-header>
		<el-main>
			<el-table :data="list">
				<el-table-column prop="name" label="菜名">
				</el-table-column>
				<el-table-column prop="number" label="菜品号">
				</el-table-column>
				<el-table-column prop="lx" label="类型">
				</el-table-column>
				<el-table-column prop="price" label="单价">
				</el-table-column>
				<el-table-column prop="img" label="图片">
					<template slot-scope="scope">
						<img :src="scope.row.img" width="60%" />
					</template>
				</el-table-column>
				<el-table-column prop="ms" label="描述">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.row)">编辑价格</el-button>
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
				axios.post('/api/user/selectfood').then((res) => {
					this.list = res.data;
				}).catch((err) => {
					console.log(err);
				})
			},
			tianjia(){
				this.$router.replace('/staff/addfood')
			},
			handleEdit(row) {
				var price=prompt("请输入价格");
				var data1 = {
					'name': row.name,
					'price': price,
					'biao': 'food',
				}
				axios.post('/api/user/update',data1).then((res)=>{
				this.getdata();
				})
			},
			handleDelete(row) {
				var data1 = {
					'name': row.name,
					'biao': 'food',
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