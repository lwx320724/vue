<template>
	<div class="jz">
		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			<el-form-item label="员工号" prop="number1">
				<el-input type="number1" v-model="ruleForm2.number1" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input type="name" v-model="ruleForm2.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="resource">
				<el-radio-group v-model="ruleForm2.resource">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="初始密码" prop="pass">
				<el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="phone">
				<el-input type="phone" v-model="ruleForm2.phone" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="地址" prop="address">
				<el-input type="address" v-model="ruleForm2.address" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="职务" prop="job">
				<el-input type="job" v-model="ruleForm2.job" autocomplete="off"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
				<el-button @click="resetForm('ruleForm2')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.ruleForm2.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var validatename = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入姓名'));
				} else {
					callback();
				}
			};
			var validatejob = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入职务'));
				} else {
					callback();
				}
			};
			var validateaddress = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入地址'));
				} else {
					callback();
				}
			};
			var validatenumber1 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入员工号'));
				} else {
					callback();
				}
			};
			var validatephone = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入手机号'));
				} else {
					callback();
				}
			};
			var validateresource = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入性别 '));
				} else {
					callback();
				}
			};

			return {

				ruleForm2: {
					pass: '',
					checkPass: '',
					resource: '',
					number1: '',
					name: '',
					phone: '',
					address: '',
					job: ''

				},
				rules2: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					resource: [{
						validator: validateresource,
						trigger: 'blur'
					}],
					number1: [{
						validator: validatenumber1,
						trigger: 'blur'
					}],
					name: [{
						validator: validatename,
						trigger: 'blur'
					}],
					phone: [{
						validator: validatephone,
						trigger: 'blur'
					}],
					address: [{
						validator: validateaddress,
						trigger: 'blur'
					}],
					job: [{
						validator: validatejob,
						trigger: 'blur'
					}],
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						var data1 = this.ruleForm2;
						axios.post("/api/user/staffs", data1).then((res) => {
							console.log(res.data)
							if(res.data == -1) {
								alert("不能添加")
							} else {
								alert("添加成功")
								setTimeout(function() {
									this.$router.replace('/staff/ygxx');
								}.bind(this), 1000)
							}

						});
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style>
	.jz {
		width: 350px;
		height: 100%;
		margin: 10px 20px;
	}
</style>