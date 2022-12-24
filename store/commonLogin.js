import zxLogin from '@/components/zx-login/zx-login.vue'

export default {
	install(Vue) {
		const Profile = Vue.extend(zxLogin)
		
		//弹出弹窗
		Vue.prototype.$openLogin = (params) => {
			const instance = new Profile()
			instance._props._specia = params
			instance.vm = instance.$mount()
			const LoginEle = document.body.lastElementChild
			if (LoginEle.className === 'zx-login-popup') return
			setTimeout(() => {
				document.body.appendChild((instance.vm.$el))
			})
			return instance
		}
		
		//关闭弹窗
		Vue.prototype.$closeLogin = (params) => {
			const instance = new Profile()
			instance.vm = instance.$mount()
			const LoginEle = document.body.lastElementChild
			if (LoginEle.className !== 'zx-login-popup') return
			document.body.removeChild(LoginEle)
			return instance
		}
	}
}