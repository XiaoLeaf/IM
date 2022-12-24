<template>
	<view class="page-root">
		<zx-navbar :back="false">
			
		</zx-navbar>
		<view class="page-box zx-login-root" :style="pageBoxStyle">
			<view class="login-content">
				<view class="content-header">
					<view class="tel-title">{{ type == 1 ? '验证码登录' : '密码登录' }}</view>
				</view>
				<block v-if="type == 1">
					<view class="content-form">
						<view class="content-tips">未注册的登录后将自动生成账号</view>
						<view class="content-form-item">
							<view class="content-field-box">
								<u-field v-model="loginForm.tel" :maxlength="12" :border-bottom="false" type="number" label="手机号" :field-style="fieldStyle" :placeholderStyle="placeholderStyle" placeholder="手机号"></u-field>
							</view>
						</view>
						<view class="content-form-item">
							<view class="content-field-box">
								<u-field v-model="loginForm.code" :maxlength="6" :border-bottom="false" type="number" label="验证码" :field-style="fieldStyle" :placeholderStyle="placeholderStyle" placeholder="验证码">
								</u-field>
							</view>
							<view class="code-btn-box">
								<zx-sms class="code-btn" :checkTel="true" :type="$api.CODE_TYPE.LOGIN_CODE" :tel="loginForm.tel"></zx-sms>
							</view>
						</view>
						<view class="login-btn-box">
							<view>
								<button @click="onClickSubmitLogin" class="primary-btn submit-btn">立即登录</button>
							</view>
							<view class="tools-box">
								<view @click="type = 2">密码登录</view>
							</view>
						</view>
					</view>
				</block>
				<block v-else>
					<view class="content-form">
						<view class="content-tips"></view>
						<view class="content-form-item">
							<view class="content-field-box">
								<u-field v-model="loginForm.tel" label-width="100" :border-bottom="false" type="number" label="账号" :field-style="fieldStyle" :placeholderStyle="placeholderStyle" placeholder="手机号">
								</u-field>
							</view>
						</view>
						<view class="content-form-item">
							<view class="content-field-box">
								<u-field v-model="loginForm.pwd" label-width="100" :border-bottom="false" label="密码" :field-style="fieldStyle" :password="true" type="password" :placeholderStyle="placeholderStyle" placeholder="密码">
								</u-field>
							</view>
						</view>
						<view class="login-btn-box">
							<view>
								<button @click="onClickSubmitPwdLogin" class="primary-btn submit-btn">立即登录</button>
							</view>
							<view class="tools-box">
								<view @click="type = 1">验证码登录</view>
							</view>
						</view>
					</view>
				</block>
				<view class="deal-box">
					<u-icon @click="onClickDeal" :name="agreeDeal ? 'checkmark-circle-fill' : 'checkmark-circle'" :color="agreeDeal ? themeCol : '#999'" size="32"></u-icon>
					<view class="deal-txt">登录注册代表同意<text @click="showCmsPage('agreement')" class="deal-str">《用户协议》</text>和<text @click="showCmsPage('policy')" class="deal-str">《隐私政策》</text></view>
				</view>
			</view>
		</view>
		<u-popup v-model="showDeal" mode="bottom" border-radius="20">
			<view class="zx-login-deal-root">
				<view class="">
					<view class="login-content">
						<view class="content-header">
							<view class="tel-title">{{ exampleInfo.title }}</view>
							<u-icon @click="showDeal = false" name="close-circle" size="50" color="#333"></u-icon>
						</view>
					</view>
				</view>
				<view class="example-box">
					<scroll-view class="example-scroll" :scroll-y="true">
						<u-parse :html="exampleInfo.content"></u-parse>
					</scroll-view>
				</view>
			</view>
		</u-popup>
		<u-modal v-model="showAgree" z-index="1000000" title="温馨提示" content="请先同意《用户协议》和《隐私政策》" :show-cancel-button="true" :confirm-color="themeCol" cancel-color="#999" @confirm="onClickPopupAgreeDeal" @cancel="showAgree = false"></u-modal>
	</view>
</template>

<script>
	export default {
		name: "zx-login",

		props: {
			specia: String,
			
			show: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				// show: true,
				showDeal: false,
				type: 1, 
				loginForm: {
					tel: '18850528169',
					code: '',
					pwd: ''
				}, //登录表单
				pwdForm: {
					username: '',
					pwd: ''
				}, //密码登录表单
				agreeDeal: false,
				timer: '', //计时器
				disabled: false, //是否禁用验证码按钮
				placeholderStyle: 'color:#999;fontSize:28rpx;fontWeight:normal;', //placeholder样式
				codeBtnStr: '获取验证码', //验证码按钮文案
				fieldStyle: {
					fontSize: '32rpx',
					color: '#333',
					fontWeight: '700'
				},
				themeCol: '#05C575',
				exampleInfo: '',
				showAgree: false, //是否显示同意协议弹窗
			}
		},
		
		mounted() {
			let tempAgreeDeal = uni.getStorageSync(this.$api.agreeDeal)
			this.agreeDeal = tempAgreeDeal ? tempAgreeDeal : false
		},

		methods: {
			/**
			 * 同意协议
			 */
			onClickDeal() {
				this.agreeDeal = !this.agreeDeal
				uni.setStorageSync(this.$api.agreeDeal, this.agreeDeal)
			},
			
			/**
			 * 立即登录
			 */
			onClickSubmitLogin() {
				if (!this.agreeDeal) {
					this.showAgree = true
				} else {
					this.fetchCodeLogin()
				}
			},
			
			/**
			 * 弹窗-同意协议
			 */
			onClickPopupAgreeDeal() {
				this.agreeDeal = true
				uni.setStorageSync(this.$api.agreeDeal, true)
				if (this.type == 1) {
					this.fetchCodeLogin()
				} else {
					this.fetchPwdLogin()
				}
			},
			
			/**
			 * 提交登录
			 */
			fetchCodeLogin() {
				let params = {
					tel: this.loginForm.tel,
					code: this.loginForm.code
				}
				this.$util.postRequest(this.$api.auth.tel_login, params, true,
					res => {
						setTimeout(() => {
							this.$set(this.loginForm, 'code', '')
						}, 1500)
						this.initUserInfo(res)
					},
					err => {
						this.$util.showNoIconToast(err.info)
					}, '登录中...')
			},

			/**
			 * 提交密码登录
			 */
			onClickSubmitPwdLogin() {
				if (!this.agreeDeal) {
					this.showAgree = true
					return
				}
				this.fetchPwdLogin()
			},
			
			/**
			 * 密码登录
			 */
			fetchPwdLogin() {
				let params = {
					username: this.loginForm.tel,
					pwd: this.loginForm.pwd
				}
				this.$util.postRequest(this.$api.auth.pwd_login, params, true,
					res => {
						setTimeout(() => {
							this.$set(this.loginForm, 'pwd', '')
						}, 1500)
						this.initUserInfo(res)
					},
					err => {
						this.$util.showNoIconToast(err.info)
					}, '登录中...')
			},
			
			/**
			 * 初始化用户信息
			 */
			initUserInfo(res) {
				this.$util.showNoIconToast(res.info)
				uni.setStorageSync(this.$api.authorization, res.data.authorization)
				uni.setStorageSync(this.$api.userInfo, res.data.userRow)
				
				//更新本地用户列表记录
				let userList = uni.getStorageSync(this.$api.userList)
				userList = userList ? JSON.parse(userList) : []
				let currentUser = Object.assign({}, res.data.userRow)
				currentUser.authorization = res.data.authorization
				if (userList.length > 0) {
					//查询本地是否存在当前用户记录,不存在新增，存在更新
					let index = this.$util.localExistCurrentUser(Object.assign([], userList), currentUser)
					if (index >= 0) {
						//存在记录-更新
						this.$util.updateLocalUserWithIndex(Object.assign([], userList), index, currentUser)
					} else {
						//记录不存在-新增
						this.$util.insertLocalUserWithUser(Object.assign([], userList), currentUser)
					}
				} else {
					//直接新增记录
					this.$util.insertLocalUserWithUser(Object.assign([], userList), currentUser)
				}
				
				setTimeout(() => {
					this.$u.vuex('authorization', res.data.authorization)
					this.$u.vuex('currentUserId', res.data.userRow.id)
					this.$u.vuex('hasPayPwd', res.data.userRow.is_pay_pwd)
					this.$u.vuex('loginStatus', true)
					this.$nextTick(() => {
						uni.$emit(this.$api.connectSocket)
					})
					this.$util.miniAppRoute('/pages/index/index')
				}, 1500)
			},
			
			/**
			 * 显示协议弹窗
			 */
			showCmsPage(iden) {
				let params = {
					iden: iden
				}
				this.$util.postRequest(this.$api.cms.page, params, true,
					res => {
						this.exampleInfo = res.data.row
						this.showDeal = true
					},
					err => {
						this.$util.showNoIconToast(err.info)
					})
			}
		}
	}
</script>

<style lang="less">
	page {
		.hper-100();
		background-color: @background-color;
	}
	
	.zx-login-popup {
		max-width: 640px;
		margin: 0 auto;
		z-index: 10080;
	}
	
	.zx-login-root {
		padding-bottom: 100rpx;
		background: linear-gradient(#fff, #f9f9f9);
		.flex-col();
	}
	
	.login-content {
		padding: @padding-xs * 2;
		box-sizing: border-box;
		border-top-left-radius: 52rpx;
		border-top-right-radius: 52rpx;
		.flex-col-aic-jce();
		.wper-100();
	
		.content-header {
			.wper-100();
			.flex-c-aic-jcb();
	
			.back-icon {
				width: 76rpx;
				height: 76rpx;
				vertical-align: middle;
			}
	
			.tel-title {
				color: @text-primary-color;
				font-size: 44rpx;
				font-weight: 700;
				padding-left: @padding-xs / 2;
			}
		}
	
		.content-form {
			margin-top: 40rpx;
			.wper-100();
	
			.content-tips {
				color: @text-thirdly-color;
				font-size: @font-size-sm;
				height: 40rpx;
				.flex-c-aic();
			}
	
			.content-form-item {
				.wper-100();
				.flex-c-aic();
	
				/deep/.u-field {
					width: 100%!important;
					padding: 20rpx!important;
					box-sizing: border-box;
	
					/deep/.u-flex-1 {
						flex: 1;
					}
	
					/deep/.u-label-text {
						color: @text-primary-color;
						font-size: @font-size-xl;
						font-weight: 700;
					}
	
					/deep/.fild-body {
						flex: 1;
						padding: 0;
						box-sizing: border-box;
					}
				}
				
				/deep/.u-field-inner {
					.wper-100();
				}
	
				&:not(:first-child) {
					margin-top: @common-blank * 4;
				}
	
				.content-field-box {
					box-sizing: border-box;
					flex: 1;
					overflow: hidden;
					flex: 1;
					border: 1px solid #DEDEDE;
					border-radius: 16rpx;
				}
	
				.code-btn-box {
					// margin-left: @common-blank * 4;
	
					/deep/ .sms-code-btn {
						line-height: 84rpx !important;
						padding: 0 @padding-xs + 10rpx !important;
					}
				}
			}
	
			.login-btn-box {
				padding: @common-blank * 6 0 0;
				box-sizing: border-box;
				.wper-100();
	
				// >view {
				// 	&:not(:first-child) {
				// 		margin-top: @common-blank * 4;
				// 	}
				// }
	
				.submit-btn {
					font-weight: 700;
					font-size: @font-size-xl;
				}
	
				.tools-box {
					.flex-c-aic-jce();
					color: @text-secondary-color;
					font-size: @font-size-sm;
					padding: @common-blank * 2 0;
				}
			}
		}
	
		.deal-box {
			padding: @common-blank * 4 0 0;
			.wper-100();
			.flex-c-aic-jcc();
		
			.deal-txt {
				// flex: 1;
				padding-left: @padding-xs / 2;
				box-sizing: border-box;
				color: @text-thirdly-color;
				font-size: @font-size-sm;
		
				.deal-str {
					color: @primary-color;
				}
			}
		}
	}

	.zx-login-deal-root {
		.flex-col();
		height: 90vh;
		
		.login-content {
			padding: @padding-xs * 2 @padding-xs;
		}
		
		.content-header .tel-title {
			font-size: 40rpx;
		}
		
		.example-box {
			flex: 1;
			padding: 0 @padding-xs * 2 @padding-xs;
			box-sizing: border-box;
			min-height: 0;
			color: #666;
			font-size: 28rpx
		}
		
		.example-scroll {
			height: 100%;
		}
	}
</style>
