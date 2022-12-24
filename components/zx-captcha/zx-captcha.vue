<template>
	<view class="login-form-box captcha-root">
		<view class="login-form-item">
			<view class="login-form-item-box">
				<view class="form-item-content">
					<view class="input-box">
						<u-field v-model="captcha" :label-width="0" :border-bottom="false" :placeholder-style="zxPlaceholderStyle" :field-style="fieldStyle" placeholder="请输入图形验证码"></u-field>
					</view>
					<image @click="$u.debounce(onClickRefreshCaptcha, 400, true)" webp="true" lazy-load="true" class="content-img" mode="widthFix" :src="captchaImg"></image>
				</view>
			</view>
			<view class="form-btn-box catptcha-btn-box">
				<button @click="onClickSubmit" :loading="loading" hover-class="none" class="form-btn">{{ loading ? '' : '提交' }}</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-captcha",
		
		props: {
			loading: {
				type: Boolean,
				default: false
			}
		},
		
		data() {
			return {
				captcha: '',
				captchaImg: '',
				fieldStyle: {
					color: '#313131',
					fontSize: '32rpx'
				},
			}
		},
		
		beforeMount() {
			this.refreshCaptcha()
		},
		
		methods: {
			onClickRefreshCaptcha() {
				
			},
			
			refreshCaptcha() {
				this.captcha = ''
				this.captchaImg = this.indexConfig.captcha_url + '?imei=' + uni.getStorageSync(this.$api.unionUser) + '&time=' + Date.now()
			},
			
			onClickRefreshCaptcha() {
				this.refreshCaptcha()
			},
			
			onClickSubmit() {
				if (!this.captcha) {
					this.$util.showNoIconToast('填写图形验证码')
					return
				}
				this.$emit('click', {captcha: this.captcha})
			}
		}
	}
</script>

<style lang="less">
	.captcha-root {
		padding: 0!important;
	
		/deep/ .u-flex {
			display: flex!important;
			align-items: center!important;
		}
		
		/deep/ .u-flex-1 {
			flex: 1!important;
		}
		
		.login-form-item {
			box-shadow: none;
			// padding: @padding-xs + 10rpx;
			margin-bottom: 0;
			
			/deep/ .u-field {
				padding: 0 20rpx!important;
				box-sizing: border-box;
				background-color: #f9f9f9;
				border-radius: 12rpx;
				overflow: hidden;
				
				.u-field__input-wrap {
					height: 60rpx!important;
				}
			}
		}
		
		.catptcha-btn-box {
			margin-top: 40rpx;
			
			.form-btn {
				// font-size: @font-size-base;
				width: 100%;
				line-height: 100rpx;
				border-radius: 100rpx;
				color: #FFFFFF;
				padding: 0;
				margin: 0;
				font-size: 40rpx;
				font-weight: 500;
				// box-shadow: 0px 2px 2px 0px rgba(155, 124, 71, 0.83);
				background-color: #05C575;
			}
		}
	}
	
	.login-form-box {
		padding: 50rpx 32rpx;
		box-sizing: border-box;
		
		/deep/ .u-flex {
			display: flex!important;
			align-items: center!important;
		}
		
		/deep/ .u-flex-1 {
			flex: 1!important;
		}
		
		.login-form-item {
			width: 100%;
			background-color: #FFFFFF;
			border-radius: 30rpx;
			overflow: hidden;
			// box-shadow: 0px 3rpx 8rpx 0px rgba(93, 94, 114, 0.16);
			padding: 40rpx 30rpx;
			box-sizing: border-box;
			// .flex-c-aic();
			margin-bottom: 10rpx;
			position: relative;
			
			.login-form-item-box {
				display: flex;
				align-items: center;
			}
			
			.form-item-content {
				flex: 1;
				overflow: hidden;
				display: flex;
				align-items: center;
				
				/deep/ .u-field {
					padding: 0 10rpx!important;
					box-sizing: border-box;
					background-color: #f9f9f9;
					border-radius: 12rpx;
					overflow: hidden;
					
					.u-field__input-wrap {
						height: 60rpx!important;
					}
				}
				
				.input-box {
					display: flex;
					align-items: center;
					flex: 1;
					overflow: hidden;
					
					/deep/.fild-body {
						flex: 1;
						padding: 0!important;
						box-sizing: border-box;
					}
				}
				
				.content-img {
					margin-left: 25rpx;
					width: 180rpx;
					height: 60rpx;
					border-radius: 12rpx;
					overflow: hidden;
					vertical-align: middle;
					// background-color: @primary-color;
				}
			}
		}
	}
</style>