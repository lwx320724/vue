<template>
	<div class="app-containers">

		<div class="bd" >
			<mt-header class="mtheader" title="中餐" fixed style="color: #000000; background-color: white;z-index: 999;">
				<router-link to="/" slot="left">
					<mt-button icon="back">返回</mt-button>
				</router-link>
				<img slot="right" src="../images/搜索.png" width="24" height="24" style="color: white;" @click="sousuo()">
			</mt-header>
			<transition>
				<router-view></router-view>
			</transition>

		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import { setCookie, getCookie } from '../../src/js/cookieUtil'
	export default {
		data() {
			return {

			};
		},

		methods: {
			sousuo() {
				

			}
		}

	};
</script>

<style>

</style>