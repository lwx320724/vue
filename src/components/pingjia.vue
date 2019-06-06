<template>
	<div class="div1">
		<mt-header class="mtheader" title="我的评价" fixed>
			<router-link to="/home/homehome" slot="left">
				<mt-button icon="back">返回</mt-button>
			</router-link>
			<mt-button slot="right" @click="fabu">发布</mt-button>
		</mt-header>
		<div>
			<span style="font-size: 2rem; color: gold;">{{score1}}</span>
			<span style="font-size: 1rem; color: gold;">分</span>
			<div>
				<span style="font-size: 1rem; color: gray;">{{pjia}}</span>
			</div>
			<ul class="star">
				<li v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" @click="stars(index)" track-by="index">☆</li>
			</ul>
			<hr />
			<textarea class="text" placeholder="好吃吗？快来写下你的感受把~"></textarea>
		</div>
	</div>

</template>

<script>
	import axios from 'axios';
	import { setCookie, getCookie } from '../../src/js/cookieUtil'
	export default {
		data() {
			return {
				score1: 5,
				score: 5,
				pjia: '',
			}
		},
		computed: {
			itemClasses() {
				var result = []; // 返回的是一个数组,用来遍历输出星星
				for(var i = 0; i < this.score1; i++) { // 整数星星使用on
					result.push('off'); // 一个整数星星就push一个CLS_ON到数组
				}
				var score = this.score - this.score1;
				for(var i = 0; i < score; i++) { // 整数星星使用on
					result.push('on'); // 一个整数星星就push一个CLS_ON到数组
				}
				if(this.score1 == 5) {
					this.pjia = '完美'
				}
				if(this.score1 == 4) {
					this.pjia = '比较好'
				}
				if(this.score1 == 3) {
					this.pjia = '一般般'
				}
				if(this.score1 == 2) {
					this.pjia = '比较差'
				}
				if(this.score1 == 1) {
					this.pjia = '超烂啊'
				}
				return result;
			}
		},
		methods: {
			stars: function(index) {
				this.score1 = index + 1;
			},
			fabu() {
				var text = document.getElementsByClassName("text")[0].value;
				var fen = this.score1;
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
					'time': today,
					'fen': fen,
					'text': text
				}
				if(text == '') {
					alert("请输入对我们的评价")

				} else {
					axios.post("/api/user/pingjia", data1).then((res) => {
						setTimeout(function() {
							this.$router.replace('/home/homehome');
						}.bind(this), 1000)

					})

				}

			}
		}

	}
</script>

<style>
	.star {
		font-size: 0;
	}
	
	.star-item {
		margin-top: 0.5rem;
		display: inline-block;
		background-repeat: no-repeat;
		width: 2rem;
		height: 2rem;
		margin-right: 0.6rem;
		background-size: 100%;
	}
	
	.star-item.on {
		background-image: url(../images/星星空.png);
	}
	
	.star-item.off {
		background-image: url(../images/星星满.png);
	}
	
	.text {
		border: 0;
		width: 100%;
		height: 200px;
	}
</style>