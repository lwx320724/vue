<template>
	<div>
		<mt-swipe :auto="3000">
			<mt-swipe-item>
				<img src="../../../static/images/doujiao.jpg">
			</mt-swipe-item>
			<mt-swipe-item>
				<img src="../../../static/images/duojiao.jpg">
			</mt-swipe-item>
			<mt-swipe-item>
				<img src="../../../static/images/fish.jpg">
			</mt-swipe-item>
			<mt-swipe-item>
				<img src="../../../static/images/youyu.jpg">
			</mt-swipe-item>
		</mt-swipe>

		<div :class="class1?'red':'page-navbar'">
			<mt-navbar class="page-part" v-model="selected">
				<mt-tab-item id="1">点餐</mt-tab-item>
				<mt-tab-item id="2"><span @click="pj">评价</span></mt-tab-item>
				<mt-tab-item id="4"><span @click="dingdan">订单</span></mt-tab-item>
			</mt-navbar>
			<mt-tab-container v-model="selected ">
				<mt-tab-container-item id="1" class="left">
					<mt-cell v-for="n in item" :title="n.msg" :key="n.id" @click.native="pppp(n.msg)" />
				</mt-tab-container-item>
				<mt-tab-container-item id="1" class="right">
					<div v-for="item in getshopnum" class="right-1" v-if="item.lx==lx||lx1">
						<img :src="item.img" />
						<span class="span1">{{item.name}}</span>
						<span class="span0" style="font-size: 0.9rem; color: grey;">{{item.ms}}</span>
						<span class="span2">￥</span>
						<span class="span3">{{item.price}}</span>
						<span class="span4"><img src="../../images/plus_320px_1197037_easyicon.net.png" @click="xuanze(item.name,item.price)"/></span>
						<span v-if="item.mynum" class="span7">
								<span class="span5" @click="removecar(item)"><img src='../../images/减.png' /></span>
						<div class="span6">{{item.mynum}}</div>
						</span>

					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="1" class="foot">
					<div v-if="carinfo" class="car">
						<div class="carmain">
							<div class="cartop">
								<span class="gwc">购物车</span>
								<span class="qk" @click="mycar=[]">清空</span>
							</div>
							<div class="carmainbox">
								<div v-for="item in mycar" class="carbox">
									<span class="bold">{{item.shop}}</span>

									<span class="jia"><img src="../../images/plus_320px_1197037_easyicon.net.png" @click="xuanze(item.shop,item.price)"/></span>
									<span v-if="!item.mynum">
											<div class="num">{{item.num}}</div>
								        <span class="jian" @click="removecar1(item)"><img src='../../images/减.png' /></span>
									</span>
									<span class="colred">￥{{item.price*item.num}}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="footleft" @click="car">
						<div class="footlogo">
							<img src="../../images/gouwu1.png" class="footicon" />
							<div v-if="mycar.length" class="rednum">{{mycarshopnum}}</div>
						</div>
						<div class="footmain">
							<div v-if="!mycar.length">未选购商品</div>
							<div v-if="mycar.length" style="color: lightskyblue; font-size: 1.5rem;">￥ {{mycarshoppic}}</div>
						</div>
					</div>
					<div class="footright" v-if="mycar.length" @click="tijiao">
						提交
					</div>
				</mt-tab-container-item>

			</mt-tab-container>

			<mt-tab-container v-model="selected ">
				<mt-tab-container-item id="2">
					<div style="width: 100%; height: 60px; font-size: 1.5rem; margin-left: 10px;" align="left">综合评分<span style="font-size: 2.5rem; color: red;">{{a}}</span>分</div>
					<div class="pf1">
						<div class="pf pfq" @click="quanbu11" style="padding: 2px">全部({{quanbu}})</div>
						<div class="pf pfh" @click="haoping" style="background-color: #0B89FF; padding: 2px">好评({{hao}})</div>
						<div class="pf pfc" @click="chaping" style="background-color: gainsboro; color: #000000; padding: 2px;">差评({{cha}})</div>
					</div>
					<div class="pp">
						<div v-for="item in pingjia1" class="pp1" align="left" v-if="item.fen>panduan&&item.fen<panduan1">
							<hr />
							<span style="font-size: 1.5rem;">{{item.name}}</span>
							<span style=" font-size: 0.9rem;color: gray;float: right;">{{item.time}}</span>
							<div><span>评分：{{item.fen}}</span></div>
							<div class="text"><span style="font-size: 0.9rem;">{{item.text}}</span></div>
						</div>
					</div>
				</mt-tab-container-item>
			</mt-tab-container>

			<mt-tab-container v-model="selected ">
				<mt-tab-container-item id="4">
					<div class="dd">
						<span v-if="lists==''">没有数据</span>
						<div v-for="item in lists" class="dd1" align="left">
							<span style="font-size: 0.9rem;">订单内容：{{item.lr}}</span>
							<div style="font-size: 0.9rem;">总价：￥{{item.price}}</div>
							<hr>
							<span style="font-size: 0.9rem;">订单提交时间：{{item.time}}</span>
							<span style="font-size: 0.9rem;">{{item.zt}}</span>
							<div class="dp" @click="pingjia" align="center">评价</div>
						</div>
					</div>
				</mt-tab-container-item>

			</mt-tab-container>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import { setCookie, getCookie } from '../../../src/js/cookieUtil'
	export default {
		data() {
			return {
				lx: '',
				lx1: true,
				carinfo: false,
				selected: '1',
				item: [{
						msg: '家常小菜',
					},
					{
						msg: '蔬菜',
					},
					{
						msg: '荤菜',
					},
					{
						msg: '辣',
					},

				],
				items: [],
				list: [],
				lists: [],
				mycar: [],
				pingjia1: [],
				a: 0,
				quanbu: 0,
				hao: 0,
				cha: 0,
				panduan: 0,
				panduan1: 6,
				class1: false,

			};
		},
		computed: {
			//计算属性
			mycarshopnum: function() {
				var num = 0;
				for(var i = 0; i < this.mycar.length; i++) {
					num += this.mycar[i].num;
				}
				return num
			},
			mycarshoppic: function() {
				var num = 0;
				for(var i = 0; i < this.mycar.length; i++) {
					num += (this.mycar[i].price * this.mycar[i].num);
				}
				return num
			},

			getshopnum: function() {
				for(var i = 0; i < this.list.length; i++) {
					this.list[i].mynum = 0;
					for(var h = 0; h < this.mycar.length; h++) {
						if(this.list[i].name == this.mycar[h].shop) {
							this.list[i].mynum = this.mycar[h].num;
						}
					}
				}
				return this.list
			},
		},

		created: function() {
			this.getLunbo();
		},
		methods: {
			getdata() {
				axios.post('/api/user/selectfood').then((res) => {
					this.list = res.data;
				}).catch((err) => {
					console.log(err);
				});

			},
			dingdan() {
				var user = getCookie("name");
				var data = {
					'name': user
				}
				axios.post('/api/user/selectddxxname', data).then((res) => {
					this.lists = res.data;
					console.log(this.lists)
					if(this.lists == '') {
						console.log("没有数据")
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			getLunbo() {},
			handleScroll() {
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				if(scrollTop >= 200) {
					this.class1 = true;
				} else {
					this.class1 = false;
				}
			},
			xuanze(e, price) {
				if(this.mycar.length > 0) {
					for(var i = 0; i < this.mycar.length; i++) {
						if(this.mycar[i].shop == e) {
							this.mycar[i].num = this.mycar[i].num + 1;
							return;
						}
					}
				}
				if(this.mycar.indexOf({
						"shop": e,
						"num": 1,
						'price': price
					}) == -1) {
					this.mycar.push({
						"shop": e,
						"num": 1,
						'price': price
					});

				}

			},
			removecar1(e) {
				for(var i = 0; i < this.mycar.length; i++) {
					if(this.mycar[i].shop == e.shop) {
						if(this.mycar[i].num == 1) {
							this.mycar.splice(i, 1);

						} else {
							this.mycar[i].num = this.mycar[i].num - 1

						}

						break;
					}
				}
			},
			removecar(e) {
				for(var i = 0; i < this.mycar.length; i++) {
					if(this.mycar[i].shop == e.name) {
						if(this.mycar[i].num == 1) {
							this.mycar.splice(i, 1);
							e.mynum = 0;

						} else {
							this.mycar[i].num = this.mycar[i].num - 1

						}

						break;
					}
				}
			},
			car() {
				if(this.carinfo == true) {
					this.carinfo = false;
				} else {
					this.carinfo = true;

				}
			},
			tijiao() {
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth() + 1;
				var yyyy = today.getFullYear();
				var hour = today.getHours();
				var minutes = today.getMinutes();
				var seconds = today.getSeconds();
				if(dd < 10) {
					dd = '0' + dd
				}
				if(mm < 10) {
					mm = '0' + mm
				}
				if(hour < 10) {
					hour = '0' + hour
				}
				today = yyyy + '-' + mm + '-' + dd + ' ' + hour + ':' + minutes + ":" + seconds
				var user = getCookie("name");
				var data1 = {
					'name': user,
					'data': this.mycar,
					'time': today
				}
				var data2 = JSON.stringify(data1);
				var config = {
					headers: {
						'Content-Type': 'application/json'
					}
				};
				axios.post('/api/user/data', data2, config).then((res) => {}).catch((err) => {
					console.log(err);
				})
				this.mycar = [];
			},
			pingjia() {
				this.$router.replace("/pingjia");
			},
			pj() {
				axios.post('/api/user/selectpingjia').then((res) => {
					this.pingjia1 = res.data;
					var all = 0;
					this.hao = 0;
					this.cha = 0;
					for(var i = 0; i < this.pingjia1.length; i++) {
						all = all + parseFloat(this.pingjia1[i].fen);
						if(parseFloat(this.pingjia1[i].fen) >= 3) {
							this.hao = this.hao + 1;
						} else {
							this.cha = this.cha + 1;
						}
					}
					this.quanbu = this.pingjia1.length;
					this.a = Math.floor((all / this.pingjia1.length) * 10) / 10;
				}).catch((err) => {
					console.log(err);
				});
				this.panduan = 0;
				this.panduan1 = 6;

			},
			quanbu11() {
				this.panduan = 0;
				this.panduan1 = 6;
			},
			haoping() {
				this.panduan = 2;
				this.panduan1 = 6;
			},
			chaping() {
				this.panduan = 0;
				this.panduan1 = 3;
			},
			pppp(n) {
				if(n == "家常小菜") {
					this.lx1 = true;
					this.lx = '';
				};
				if(n == "蔬菜") {
					this.lx1 = false;
					this.lx = '素';
				};
				if(n == "荤菜") {
					this.lx1 = false;
					this.lx = '荤';
				};
				if(n == "辣") {
					this.lx1 = false;
					this.lx = '辣';
				}
			},

		},
		mounted: function() {
			window.addEventListener('scroll', this.handleScroll);
			this.getdata();
		}
	};
</script>

<style>
	.mint-swipe {
		position: absolute;
		left: 0;
		top: 40px;
		width: 100%;
		height: 200px;
	}
	
	.mint-swipe img {
		width: 100%;
		height: 100%;
	}
	
	.page-navbar {
		position: absolute;
		top: 240px;
		left: 0px;
		width: 100%;
	}
	
	.red {
		position: absolute;
		top: 240px;
		left: 0px;
		width: 100%;
	}
	
	.page-part {
		border-bottom: 1px solid gainsboro;
	}
	
	.red>.page-part {
		position: fixed;
		top: 40px;
		left: 0;
		width: 100%;
		z-index: 999;
	}
	
	.red>.mint-tab-container>.mint-tab-container-wrap>.left {
		position: fixed;
		top: 87px;
		left: 0;
		width: 25%;
		z-index: 998;
	}
	
	.red>.mint-tab-container>.mint-tab-container-wrap>.right {
		margin-top: 40px;
		margin-left: 25%;
	}
	
	.left {
		border-right: 1px solid gainsboro;
		overflow-y: scroll;
		width: 25%;
		height: 100%;
	}
	
	.right {
		left: 25%;
		width: 75%;
		overflow: scroll;
		height: 100%;
		margin-bottom: 100px;
	}
	
	.right>.right-1 {
		padding: 10px 0;
		width: 100%;
		height: 100px;
		border: 1px solid gainsboro;
		overflow: hidden;
	}
	
	.right-1>img {
		float: left;
		width: 40%;
		height: 100%;
	}
	
	.right-1>.span1 {
		position: absolute;
		left: 60%;
	}
	
	.right-1>.span0 {
		position: absolute;
		left: 60%;
		padding-top: 50px;
	}
	
	.right-1>.span2 {
		position: absolute;
		left: 60%;
		padding-top: 80px;
	}
	
	.right-1>.span3 {
		position: absolute;
		left: 65%;
		padding-top: 82px;
	}
	
	.right-1>.span4 {
		position: absolute;
		left: 90%;
		padding-top: 82px;
		width: 20px;
		height: 20px;
	}
	
	.right-1>.span4>img {
		width: 100%;
		height: 100%;
	}
	
	.span5 {
		position: absolute;
		left: 80%;
		padding-top: 82px;
		width: 20px;
		height: 20px;
	}
	
	.span5>img {
		width: 100%;
		height: 100%;
	}
	
	.span6 {
		position: absolute;
		left: 85%;
		padding-top: 82px;
		width: 20px;
		height: 20px;
	}
	
	.foot {
		position: fixed;
		bottom: 0;
		height: 50px;
		width: 100%;
		line-height: 50px;
		background-color: #594C46;
		display: flex;
		z-index: 999;
	}
	
	.footleft {
		flex: 2;
		display: flex;
	}
	
	.footright {
		flex: 1;
		text-align: center;
		font-size: 1.1rem;
		color: white;
		background-color: #61686A;
	}
	
	.footlogo {
		text-align: center;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #515151;
		margin: 0px 10px;
		border: 3px solid #444446;
		transform: translatey(-15px)
	}
	
	.footicon {
		width: 36px;
		height: 36px;
		margin-top: 7px;
	}
	
	.footmain {
		height: 50px;
		color: #ADADAD;
		font-size: 0.8rem;
	}
	
	.car {
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.carmain {
		position: absolute;
		width: 100%;
		bottom: 0px;
		left: 0px;
		padding-bottom: 50px;
		max-height: 70%;
	}
	
	.cartop {
		position: absolute;
		top: 0px;
		width: 100%;
		height: 50px;
		background-color: #ECEFF1;
	}
	
	.gwc {
		position: absolute;
		left: 10px;
	}
	
	.qk {
		position: absolute;
		right: 10px;
	}
	
	.carmainbox {
		margin-top: 50px;
	}
	
	.carbox {
		width: 100%;
		height: 50px;
		background-color: white;
	}
	
	.bold {
		float: left;
	}
	
	.jia {
		float: right;
		width: 20px;
		height: 20px;
	}
	
	.jia>img {
		width: 100%;
		height: 100%;
	}
	
	.num {
		float: right;
		width: 20px;
		height: 20px;
	}
	
	.jian {
		float: right;
		width: 20px;
		height: 20px;
	}
	
	.jian>img {
		width: 100%;
		height: 100%;
	}
	
	.colred {
		float: right;
		margin-right: 20px;
	}
	
	.dd {
		width: 100%;
		height: 100%;
		background-color: gainsboro;
	}
	
	.dd1 {
		margin: 10px 5px;
		padding: 10px 20px;
		background-color: white;
		height: 120px;
		border-radius: 10px;
	}
	
	.dp {
		position: relative;
		right: -80%;
		top: 10%;
		width: 70px;
		height: 25px;
		border: 1px solid gray;
		border-radius: 9px;
	}
	
	.pp {
		width: 90%;
		height: 100%;
		max-height: 100%;
		max-width: 100%;
	}
	
	.pp1 {
		margin: 5px 10px;
		padding: 5px 10px;
		width: 100%;
		max-width: 100%;
		margin: 10px 5px;
		padding: 10px 20px;
	}
	
	.text {
		margin: 20px 0;
	}
	
	.pf1 {
		width: 100%;
		height: 30px;
		margin: 0 20px;
	}
	
	.pf {
		width: 80px;
		height: 30px;
		border-radius: 5px;
		float: left;
		margin-right: 10px;
		background-color: red;
		color: white;
	}
</style>