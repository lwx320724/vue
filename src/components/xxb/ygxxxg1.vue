<template>
	<div class="jz">
		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			<el-form-item label="员工号" prop="number1">
				<el-input type="number1" v-model="ruleForm2.number1" autocomplete="off" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input type="name" v-model="ruleForm2.name" autocomplete="off" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="resource">
				<el-radio-group v-model="ruleForm2.resource" disabled="disabled">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="旧密码" prop="pass" v-if="xgmm">
				<el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="checkPass" v-if="xgmm">
				<el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="phone" v-if="!xgmm">
				<el-input type="phone" v-model="ruleForm2.phone" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="地址" prop="address" v-if="!xgmm">
				<el-input type="address" v-model="ruleForm2.address" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="职务" prop="job">
				<el-input type="job" v-model="ruleForm2.job" autocomplete="off" disabled="disabled"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
				<el-button type="primary" @click="xg">修改密码</el-button>
				<el-button type="" @click="fh">返回</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
	import axios from 'axios';
	import { setCookie, getCookie } from '../../../src/js/cookieUtil'
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
					callback(new Error('请输入新密码'));
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
			var validatephone = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入手机号'));
				} else {
					callback();
				}
			};

			return {
				xgmm: false,
				qqq: '',
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
					phone: [{
						validator: validatephone,
						trigger: 'blur'
					}],
					address: [{
						validator: validateaddress,
						trigger: 'blur'
					}],
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.xgmm) {
							if(this.ruleForm2.pass == this.qqq.password) {
								alert("密码修改成功")
								var data1 = {
									"pass": this.ruleForm2.checkPass,
									"number1": this.qqq.number
								}
								axios.post("/api/user/updatestaffmm", data1).then((res) => {
									setTimeout(function() {
										this.$router.replace('/staff/ygxx');
									}.bind(this), 1000)
								});
							} else {
								alert("密码错误")
								this.ruleForm2.pass = "";
							}
						} else {
							var data2 = {
								"phone": this.ruleForm2.phone,
								"address": this.ruleForm2.address,
								"number1": this.qqq.number
							}
							axios.post("/api/user/updatestaffxx", data2).then((res) => {
								setTimeout(function() {
									this.$router.replace('/staff/ygxx');
								}.bind(this), 1000)
							});

						}
					} else {
						return false;
					}
				});
			},
			getdata() {
				var number1 = getCookie("name");
				var data1 = {
					"number": number1
				};
				axios.post('/api/user/selectstaffxg', data1).then((res) => {
					this.qqq = res.data[0];
					this.ruleForm2.resource = this.qqq.sex;
					this.ruleForm2.number1 = this.qqq.number;
					this.ruleForm2.name = this.qqq.name;
					this.ruleForm2.job = this.qqq.job;
				}).catch((err) => {
					console.log(err);
				})
			},
			xg() {
				if(this.xgmm == true) {
					this.xgmm = false;
				} else {
					this.xgmm = true
				};
			},
			fh() {
				this.$router.replace("/staff/ygxx");
			}
		},
		mounted() {
			this.getdata();
		}
	}
</script>

<style>
	.jz {
		width: 400px;
		height: 100%;
		margin: 10px 20px;
	}
</style>