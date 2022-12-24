import Vue, { provide } from 'vue'
import Vuex from 'vuex'
import { authorization } from '../config/api';
Vue.use(Vuex)

let lifeData = {};

try{
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
}catch(e){
	
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_user', 'vuex_token'];

// 保存变量到本地存储中
const saveLifeData = function(key, value){
	// 判断变量名是否在需要存储的数组中
	if(saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}
const store = new Vuex.Store({
	state: {
		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		// 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
		vuex_version: '1.0.0',
		loginStatus: false, //自定义登录态
		indexConfig: '', //全局配置信息
		themeColor: '#05C575', //主题色
		statusH: 20.0 ,//状态栏高度
		safeBottom: 0, //底部安全区域高度
		zxPlaceholderStyle: 'fontSize:24rpx;color:#999;', //placeholder样式
		osName: '', //操作系统
		showLogin: false, //是否显示登录弹窗组件
		tabbarList: [
			{
				position: 0,
				pagePath: '/pages/index/index',
				text: '首页',
				iconPath: '/static/images/tabbar/home_.png',
				selectedIconPath: '/static/images/tabbar/home.png'
			},
			{
				position: 1,
				pagePath: '/pages/finding/index',
				text: '发现',
				iconPath: '/static/images/tabbar/finding_.png',
				selectedIconPath: '/static/images/tabbar/finding.png'
			},
			{
				position: 2,
				pagePath: '/pages/my/index',
				text: '我的',
				iconPath: '/static/images/tabbar/my_.png',
				selectedIconPath: '/static/images/tabbar/my.png',
				count: 0
			}
		],
		currentUserId: 0, //当前登录用户id
		authorization: '', //当前登录用户token
		userList: [], //登录用户记录列表
		hasPayPwd: false, //登录用户是否有支付密码
		hasUpdateStatusH: false, //当次是否更新过状态栏高度
		androidUpdate: false,
		appMode: 0,
		fetchMode: false,
		client_id: 0, //IM客户端ID
		readyState: 0, //当前socket状态 0:CONNECTING 1:OPEN 2:CLOSING 3:CLOSED
	},
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(len >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		},
		
		loginStatus(state, provider) {
			state.loginStatus = provider.status 
		},
		
		indexConfig(state, provider) {
			state.indexConfig = provider.indexConfig
		},
		
		themeColor(state, provider) {
			state.themeColor = provider.themeColor
		},
		
		statusH(state, provider) {
			state.statusH = provider.statusH
		},
		
		tabbarList(state, provider) {
			state.tabbarList = provider.tabbarList
		},
		
		showLogin(state, provider) {
			state.showLogin = provider.showLogin
		},
		
		currentUserId(state, provider) {
			state.currentUserId = provider.currentUserId
		},
		
		authorization(state, provider) {
			state.authorization = provider.authorization
		},
		
		userList(state, provider) {
			state.userList = provider.userList
		},
		
		hasPayPwd(state, provider) {
			state.hasPayPwd = provider.hasPayPwd
		},
		
		hasUpdateStatusH(state, provider) {
			state.hasUpdateStatusH = provider.hasUpdateStatusH
		},
		
		androidUpdate(state, provider) {
			state.androidUpdate = provider.androidUpdate
		},
		
		appMode(state, provider) {
			state.appMode = provider.appMode
		},
		
		fetchMode(state, provider) {
			state.fetchMode = provider.fetchMode
		},
		
		client_id(state, provider) {
			state.client_id = provider.client_id
		},
		
		readyState(state, provider) {
			state.readyState = provider.readyState
		}
	}
})

export default store
