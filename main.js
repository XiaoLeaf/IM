import Vue from 'vue'
import App from './App'
import './js_sdk/ican-H5Api/ican-H5Api'
import '.env/.env.js'

Vue.config.productionTip = false

App.mpType = 'app'

// 此处为演示Vue.prototype使用，非uView的功能部分
Vue.prototype.vuePrototype = '枣红'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store';

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

//胶囊按钮信息全局混入
let capsuleMixin = require('@/store/capsuleMixin.js');
Vue.mixin(capsuleMixin)

let statusHMixin = require('@/store/statusHMixin.js')
Vue.mixin(statusHMixin)

// 引入uView对小程序分享的mixin封装
// let mpShare = require('uview-ui/libs/mixin/mpShare.js')
// Vue.mixin(mpShare)

// 引入mescroll
let mescrollMixin = require('uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js')
Vue.mixin(mescrollMixin)

// i18n部分的配置
// 引入语言包，注意路径
import Chinese from '@/common/locales/zh.js'
import English from '@/common/locales/en.js'

// VueI18n
import VueI18n from '@/common/vue-i18n.min.js'

// VueI18n
Vue.use(VueI18n)


const i18n = new VueI18n({
	// 默认语言
	locale: 'zh',
	// 引入语言文件
	messages: {
		'zh': Chinese,
		'en': English,
	}
})

// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填
Vue.prototype._i18n = i18n

//环境变量全局引入
import env from '@/.env/.env.js'
Vue.prototype.$zxenv = env

import util from '@/utils/util.js'
Vue.prototype.$util = util

import api from '@/config/api.js'
import common from './config/common'
import en from '@/common/locales/en.js'
Vue.prototype.$api = api


/**
 * websocket
 */

const socketUrl = 'wss://im.hdb.qieweb.com/server'

//重连次数
const retryTimes = 10

//心跳计时器
let heartInterval = ''

let times = retryTimes

let websocket = ''

uni.$once(api.connectSocket, res => {
	uni.$off(api.connectSocket)
	fetchConnectSocket()
})

/**
 * 请求连接
 */
function fetchConnectSocket() {
	websocket = uni.connectSocket({
		url: socketUrl,
		success: res => {
			console.log('连接socket成功=====>', JSON.stringify(res))
		},
		fail: err => {
			console.error('连接socket失败====>', JSON.stringify(err))
		},
		complete: res => {
			console.log('连接socket完成=====>', JSON.stringify(res))
		}
	})
	websocket.onOpen(res => onSocketOpen(res))
	websocket.onError(err => onSocketError(err))
	websocket.onMessage(res => onSocketMessage(res))
	websocket.onClose(err => onSocketClose(err))
}

/**
 * websocket重连
 */
function reConnectSocket() {
	websocket = uni.connectSocket({
		url: socketUrl,
		success: res => {
			console.log('恢复连接socket成功=====>', JSON.stringify(res))
			times = retryTimes
		},
		fail: err => {
			console.error('恢复连接socket失败====>', JSON.stringify(err))
		},
		complete: res => {
			console.log('恢复连接socket完成=====>', JSON.stringify(res))
		}
	})
	websocket.onOpen(res => onSocketOpen(res))
	websocket.onError(err => onSocketError(err))
	websocket.onMessage(res => onSocketMessage(res))
	websocket.onClose(err => onSocketClose(err))
}

/**
 * socket心跳
 */
function socketHeartBeat() {
	clearInterval(heartInterval)
	heartInterval = setInterval(() => {
		sendSocketMessage({
			type: 'ping'
		})
	}, 10000)
}

/**
 * 关闭心跳
 */
function closeHeartBeat() {
	clearCurrentSocket()
}

/**
 * 清除当前socket
 */
function clearCurrentSocket(reConnect = false) {
	clearInterval(heartInterval)
	if (websocket) {
		websocket.close()
	}
	websocket = ''
	if (reConnect && times > 0) {
		times--
		reConnectSocket()
	}
	if (times <= 0) {
		util.showNoIconToast('服务器错误')
	}
}

/**
 * socket打开事件
 */
function onSocketOpen(res) {
	Vue.prototype.$socket = websocket
	times = retryTimes
	store.commit('readyState', {readyState: 1})
	//打开心跳
	socketHeartBeat()
}

/**
 * socket关闭事件
 */
function onSocketClose(err) {
	store.commit('readyState', {readyState: 3})
	console.log('websocket已断开====>', JSON.stringify(err));
}

/**
 * socket发生错误事件
 */
function onSocketError(error) {
	store.commit('readyState', {readyState: 3})
	console.error('websocket发生错误====>', JSON.stringify(error))
	clearCurrentSocket(true)
}

/**
 * 发送消息
 */
function sendSocketMessage(message) {
	websocket.send({
		data: JSON.stringify(message),
		success: res => {
			// console.log('发送消息成功=====>', JSON.stringify(res))
		},
		fail: err => {
			console.error('发送消息失败=====>', JSON.stringify(err))
			clearCurrentSocket()
		}
	})
}

/**
 * 消息接收事件
 */
function onSocketMessage(message) {
	let data = JSON.parse(message.data)
	switch (data.type) {
		case 'init': {
			store.commit('client_id', {client_id: data.client_id})
			fetchImBind(data.client_id)
		}
		break
	default:
		break
	}
}

//网络监听
uni.onNetworkStatusChange(function(res) {
	if (res.isConnected) {
		if (!websocket) {
			reConnectSocket()
		}
	} else {
		clearCurrentSocket()
	}
});

/**
 * 绑定用户
 */
function fetchImBind(client_id) {
	util.postRequest(api.im.bind, {
			client_id: client_id
		}, false,
		res => {
			
			// util.showNoIconToast(res.info)
		},
		err => {
			util.showNoIconToast(err.info)
		})
}

const app = new Vue({
	i18n,
	store,
	...App
})

app.$mount()
