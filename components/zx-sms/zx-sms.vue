<template>
	<view class="sms-root">
		<button @click="$u.debounce(onClickCodeBtn, 400, true)" :disabled="disabled" class="sms-code-btn">{{ codeBtnStr }}</button>
		<u-popup v-model="showCaptcha" mode="center" :mask-close-able="false">
			<view class="captcha-popup-root">
				<view class="captcha-popup-box">
					<view class="captcha-popup-title flex-c-aic-jcb">
						<view>请输入图形验证码</view>
					</view>
					<view class="captcha-close-box">
						<u-icon @click="onClickClose" name="close" size="32" color="#999"></u-icon>
					</view>
					<zx-captcha @click="onClickSubmit" :loading="captchaLoading"></zx-captcha>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name:"zx-sms",
		
		props: {
			type: {
				type: [String, Number],
				default: ''
			},
			
			tel: {
				type: String,
				default: ''
			},
			
			checkTel: {
				type: Boolean,
				default: false
			},
			
			needCaptcha: {
				type: Boolean,
				default: false
			},
			
			locale: {
				type: String,
				default: 'zh-Hans'
			}
		},
		
		data() {
			return {
				captcha: '',
				timer: '',
				codeBtnStr: '获取验证码',
				disabled: false,
				showCaptcha: false,
				captchaLoading: false,
			}
		},
		
		updated() {
			
		},
		
		beforeMount() {
			
		},
		
		methods: {
			onClickCodeBtn() {
				if (this.checkTel && !this.tel) {
					this.$util.showNoIconToast('填写手机号码')
					return
				}
				if (this.needCaptcha) {
					this.showCaptcha = true
				} else {
					this.fetchAuthCode()
				}
			},
			
			fetchAuthCode() {
				let params = {
					type: this.type
				}
				if (this.checkTel) {
					params.tel = this.tel
				}
				if (this.needCaptcha) {
					params.vcode  = this.captcha
				}
				this.$util.postRequest(this.$api.auth.code, params, false,
					res => {
						this.countDown()
						this.$util.showNoIconToast(res.info)
						this.captchaLoading = false
						this.showCaptcha = false
					},
					err => {
						this.$util.showNoIconToast(err.info)
						clearInterval(this.timer)
						this.codeBtnStr = '获取验证码'
						this.disabled = false
						this.captchaLoading = false
						this.showCaptcha = false
					})
			},
			
			countDown() {
				let num = 60
				this.codeBtnStr = num + ' s'
				this.timer = setInterval(() => {
					num--
					if (num <= 0) {
						this.codeBtnStr = '获取验证码'
						this.disabled = false
						clearInterval(this.timer)
					} else {
						this.codeBtnStr = num + ' s'
						this.disabled = true
					}
				}, 1000)
			},
			
			onClickClose() {
				this.showCaptcha = false
			},
			
			onClickSubmit(event) {
				this.captcha = event.captcha
				this.captchaLoading = true
				this.fetchAuthCode()
			},
		}
	}
</script>

<style lang="less">
	.sms-root {
		margin-left: 20rpx;
	}
	
	.sms-code-btn {
		line-height: 1;
		padding: 12rpx 16rpx;
		margin: 0;
		color: #05C575;
		font-size: 24rpx;
		background-color: transparent;
		border: 1px solid #05C575;
		border-radius: 16rpx;
		/* #ifdef H5 */
		.num-ff();
		/* #endif */
		
		&::after {
			border: none;
		}
	}
	
	/* #ifdef H5 */
	/deep/.u-mode-center-box {
		background-color: transparent;
	}
	/* #endif */
	
	.captcha-popup-root {
		padding: 40rpx;
		box-sizing: border-box;
	}
	
	.captcha-popup-title {
		padding: 20rpx 30rpx 0 30rpx;
		color: #333;
		font-size: 30rpx;
		font-weight: 500;
		line-height: normal;
	}
	
	.captcha-close-box {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
	}
	
	.captcha-popup-box {
		position: relative;
		width: 80vw;
		border-radius: 16rpx;
		overflow: hidden;
		background-color: #FFFFFF;
		padding: 20rpx;
		box-sizing: border-box;
	}
</style>