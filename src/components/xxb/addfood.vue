<template>
	<div class="addFood">
		<el-form label-width="80px" size="small">
			<el-form-item prop="name" label="菜品名称">
				<el-input v-model="name"></el-input>
			</el-form-item>
			<el-form-item label="菜品价格">
				<el-input v-model="price"></el-input>
			</el-form-item>
			<el-form-item label="菜品号">
				<el-input v-model="number"></el-input>
			</el-form-item>
			<el-form-item label="菜品描述">
				<el-input v-model="ms"></el-input>
			</el-form-item>
			<el-form-item label="类型">
				<el-input v-model="lx"></el-input>
			</el-form-item>
			<el-form-item label="图片附件上传">
				<el-upload action="" :auto-upload=false :limit=1 list-type="picture-card" :on-change="onchange" :on-remove="handleRemove">
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addFoods">立即添加</el-button>
				<el-button @click="quxiao">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {

			return {
				name: '',
				price: '',
				img: '',
				ms: '',
				number: '',
				lx: '',
				src: '',
			};

		},
		methods: {
			getdata() {
				axios.post('/api/user/img').then((res) => {
					console.log(res)

				}).catch((err) => {
					console.log(err);
				})
			},
			onchange(file, fileList) {
				var windowURL = window.URL || window.webkitURL;
				this.src = windowURL.createObjectURL(file.raw);
				this.param = new FormData();
				this.param.append('img', file.raw);
				var config = {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				};
				axios.post("/api/user/img", this.param, config).then((res) => {
					this.img = res.data
					console.log(this.img)
				})

			},
			handleRemove(file, filesList) {
				this.param.delete('img')
			},
			addFoods() {
				var data1 = {
					'name': this.name,
					'img': this.img,
					'number': this.number,
					'ms': this.ms,
					'lx': this.lx,
					'price': this.price,
				}
				axios.post("/api/user/addFoods", data1).then((res) => {
					setTimeout(function() {
						this.$router.replace('/staff/cdxx');
					}.bind(this), 1000)
				})

			},
			quxiao() {
				this.name = '',
					this.img = '',
					this.number = '',
					this.ms = '',
					this.lx = '',
					this.price = ''
				setTimeout(function() {
					this.$router.replace('/staff/cdxx');
				}.bind(this), 1000)
			}

		}

	}
</script>
<style>
	.addFood {
		padding: 20px;
		width: 40%;
		margin: 20px 100px;
		height: 100%;
		text-align: left;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 158px;
		height: 158px;
		line-height: 158px;
		text-align: center;
	}
	
	.avatar {
		width: 158px;
		height: 158px;
		display: block;
	}
</style>