<script>
	const version = '1.0.0'

	export default {
		globalData: {
			version: version, //当前版本号
		},

		onLaunch(options) {
			let auth = uni.getStorageSync(this.$api.authorization)
			if (auth) {
				this.$u.vuex('loginStatus', true)
				this.$u.vuex('authorization', auth)
				let userInfo = uni.getStorageSync(this.$api.userInfo)
				this.$u.vuex('currentUserId', userInfo.id)
				this.$u.vuex('hasPayPwd', userInfo.is_pay_pwd)
				this.$nextTick(() => {
					uni.$emit(this.$api.connectSocket)
				})
			} else {
				this.$util.miniAppRoute('/login/index', 3)
			}
			/**
			 * 存储当前版本号
			 */
			uni.setStorageSync(this.$api.version, version)

			/**
			 * 用户唯一标识符
			 */
			if (!uni.getStorageSync(this.$api.unionUser)) {
				uni.setStorageSync(this.$api.unionUser, this.$u.guid(32, false))
			}
			
			// let that = this
			// plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
			// 	that.$util.postRequest(that.$api.any.check_app_update, {}, false,
			// 		res => {
			// 			let updateInfo = res.data
			// 			if (updateInfo.url) {
			// 				uni.showModal({
			// 					title: '更新提示',
			// 					content: updateInfo.content,
			// 					confirmColor: '#05C575',
			// 					confirmText: '立即更新',
			// 					showCancel: false,
			// 					success: (modalRes) => {
			// 						if (modalRes.confirm) {
			// 							if (updateInfo.type == 1) {
			// 								plus.runtime.openURL(updateInfo.url)
			// 							} else {
			// 								uni.downloadFile({
			// 									url: updateInfo.url,
			// 									success: res => {
			// 										if (res.statusCode === 200) {
			// 											plus.runtime.install(res.tempFilePath, {force: false},
			// 											(res) => {
			// 												plus.runtime.restart()
			// 											},
			// 											(err) => {
			// 												that.$util.showNoIconToast('更新失败')
			// 											})
			// 										} else {
			// 											that.$util.showNoIconToast('更新失败')
			// 										}
			// 									}
			// 								})
			// 							}
			// 						} else {
										
			// 						}
			// 					}
			// 				})
			// 			}
			// 		},
			// 		err => {
						
			// 		})
			// })

			/**
			 * 获取设备信息
			 * sudo keytool -genkey -alias nftmall.keystore -keyalg RSA -sigalg SHA1WithRSA -validity 20000 -keysize 1024 -keystore nftmall.keystore -v
			 */
			let res = uni.getSystemInfoSync()
			let osName = ''
			let ua = res.ua
			if (ua.indexOf('iPhone') >= 0) {
				osName = '1' //ios
			} else if (ua.indexOf('Mac OS') >= 0) {
				osName = '4' //mac
			} else if (ua.indexOf('Android') >= 0) {
				osName = '2' //android
			} else if (ua.indexOf('windows') >= 0) {
				osName = '3' //windows
			}
			this.$u.vuex('osName', osName)
			if (res.deviceType != 'pc') {
				let safeBottom = res.screenHeight - res.safeArea.height - res.safeArea.top
				this.$u.vuex('safeBottom', safeBottom > 34 ? 34 : safeBottom)
			}
		},

		onShow() {
			// this.monitorNetWork()
		},
		
		onPageNotFound(err) {
			// console.log('onPageNotFound====>',err)
			this.$util.miniAppRoute('/pages/index/index')
		},

		methods: {
			/**
			 * 获取全局配置
			 */
			fetchIndexConfig() {
				this.$util.postRequest(this.$api.app_cms.get_config, {}, false,
					res => {
						// console.log('res====>',JSON.stringify(res.data))
						uni.setStorageSync(this.$api.indexConfigVersion, res.data.version)
						this.$options.globalData.indexConfig = res.data.config
						this.$u.vuex('indexConfig', res.data.config)
					},
					err => {

					})
			}
		}
	}
</script>

<style lang="less">
	/* #ifndef APP-PLUS */
	@import "common/default.less";

	.u-badge {
		min-width: 32rpx;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 20rpx !important;
	}

	.u-tabbar__content__item__text {
		bottom: 2px !important;
		font-size: 12px !important;
	}

	image {
		height: auto;
	}

	/deep/.uni-body {
		max-width: 640px;
		margin: 0 auto;
		font-size: 50px;
	}

	// /deep/ .u-mask {
	// 	max-width: 640px;
	// 	margin: 0 auto;
	// }

	/deep/.uni-tabbar {
		max-width: 640px;
		margin: 0 auto;
	}

	/* #endif */
</style>

<style lang="scss">
	@import "./static/iconfont/iconfont.css";
	/* #ifndef APP-PLUS */
	@import "uview-ui/index.scss";
	/* #endif */
</style>
