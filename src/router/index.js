import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import login1 from '@/components/login1'
import staff from '@/components/staff'
import ddxx from '@/components/xxb/ddxx'
import pjxx from '@/components/xxb/pjxx'
import yhxx from '@/components/xxb/yhxx'
import ygxx from '@/components/xxb/ygxx'
import cdxx from '@/components/xxb/cdxx'
import ygxxxg from '@/components/xxb/ygxxxg'
import ygxxxg1 from '@/components/xxb/ygxxxg1'
import register from '@/components/register'
import pingjia from '@/components/pingjia'
import home from '@/components/home'
import addfood from '@/components/xxb/addfood'
import sousuo from '@/components/home/sousuo'
import homehome from '@/components/home/homehome'

Vue.use(Router)

export default new Router({

	mode: 'history',
	routes: [{
			path: '/home',
			component: home,
			children: [{
					path: 'homehome',
					component: homehome

				},
				{
					path: 'sousuo',
					component: sousuo
				}
			]
		},
		{
			path: '/',
			name: 'login',
			component: login
		},
		{
			path: '/login1',
			name: 'login1',
			component: login1
		},
		{
			path: '/staff',
			name: 'staff',
			component: staff,
			children: [{
					path: 'yhxx',
					component: yhxx
				}, {
					path: 'ygxx',
					component: ygxx
				},
				{
					path: 'ygxxxg',
					component: ygxxxg
				}, {
					path: 'cdxx',
					component: cdxx
				}, {
					path: 'addfood',
					component: addfood
				},
				{
					path: 'ddxx',
					component: ddxx
				},
				{
					path: 'ygxxxg1',
					component: ygxxxg1
				},
				{
					path: 'pjxx',
					component: pjxx
				},
			]

		},
		{
			path: '/register',
			name: 'register',
			component: register
		},
		{
			path: '/pingjia',
			name: 'pingjia',
			component: pingjia
		},

	]
})