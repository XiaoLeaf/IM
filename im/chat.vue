<template>
	<view v-if="loaded" class="page-root">
		<zx-navbar>
			<view slot="title" class="navbar-middle">
				<view class="middle-title">{{ initInfo.title }}</view>
			</view>
			<view slot="right" class="navbar-right" :style="{ 'width': '110px' }"></view>
		</zx-navbar>
		<view class="page-box" :style="pageBoxStyle">
			<block v-for="(item, index) in messageList" :key="index">
				<view class="chat-message-item-else" :class="[item.self ? 'chat-message-item-self' : '']">
					<image webp="true" lazy-load="true" class="chat-icon" mode="aspectFill" :src="initInfo.userList[item.to_uid].icon"></image>
					<view class="chat-content" :class="[item.self ? '' : 'chat-content-self']">
						<view class="content-txt">
							<u-parse :html="item.content"></u-parse>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="chat-footer-root">
			<view class="chat-footer-box">
				<view class="chat-footer-input-box">
					<u-field v-model="message" :border-bottom="false" :fixed="true" :trim="false" type="textarea" :field-style="fieldStyle" :clearable="false" :label-width="0"></u-field>
				</view>
				<button @click="onClickSend" class="chat-footer-send">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loaded: false,
				messageList: [], //消息列表
				uid: '', //对方用户ID
				initInfo: '', //初始化信息
				fieldStyle: {
					padding: '12rpx 20rpx',
					backgroundColor: '#f1f1f1',
					borderRadius: '8rpx',
					minHeight: '44rpx',
					lineHeight: '44rpx',
				},
				message: '', //当前需要发送的消息
			}
		},

		onLoad(options) {
			this.uid = options.uid ? options.uid : ''
			this.fetchSingleChatInit()
		},
	
		computed: {
			pageBoxStyle() {
				let boxStyle = {}
				if (this.androidUpdate) {
					boxStyle = {
						paddingTop: (this.statusH + 49) + 'px'
					}
				} else {
					boxStyle = {
						paddingTop: 'calc(49px + constant(safe-area-inset-top))',
						paddingTop: 'calc(49px + env(safe-area-inset-top))'
					}
				}
				return boxStyle
			}
		},

		methods: {
			/**
			 * socket消息监听
			 */
			socketMessagerListener() {
				this.$socket.onMessage(res => this.onSocketMessage(res))
			},

			/**
			 * 消息接收
			 */
			onSocketMessage(message) {
				let data = JSON.parse(message.data)
				switch (data.action) {
					case 'chat':
					{
						this.messageList.push(data.data)
						console.log('messageList==>',this.messageList)
					}
						break;
					default:
						break;
				}
			},

			/**
			 * 单聊-初始化
			 */
			fetchSingleChatInit() {
				this.$util.postRequest(this.$api.im.single_chat_init, this.fetchInitParams(), true,
					res => {
						this.initInfo = res.data
						this.messageList = res.data.list
						this.loaded = true
						this.socketMessagerListener()
					},
					err => {
						this.$util.showNoIconToast(err.info)
						setTimeout(() => {
							this.$util.navigaeBack()
						}, 1500)
					})
			},

			/**
			 * 初始化参数
			 */
			fetchInitParams() {
				let params = {
					to_uid: this.uid
				}
				return params
			},

			/**
			 * 点击发送
			 */
			onClickSend() {
				if (!this.message) {
					return
				}
				this.fetchSingleChatSend()
			},

			/**
			 * 请求发送
			 */
			fetchSingleChatSend() {
				this.$util.postRequest(this.$api.im.single_chat_send, this.fetchSendParams(), false,
					res => {
						// this.$util.showNoIconToast(res.info)
						this.message = ''
						this.messageList.push(res.data.sendMsg)
					},
					err => {
						this.$util.showNoIconToast(err.info)
					})
			},

			/**
			 * 发送-参数
			 */
			fetchSendParams() {
				let params = {
					to_uid: this.uid,
					type: 0,
					content: encodeURIComponent(this.message)
				}
				return params
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: @background-color;
	}
	
	.page-box {
		padding-bottom: @padding-xs / 2;
	}

	/deep/.u-field {
		padding: 0 !important;
	}

	.chat-footer-root {
		z-index: 999999;
		position: fixed;
		bottom: 0;
		left: 0;
		.wper-100();
		.pbsafe();
		background-color: #fff;

		.chat-footer-box {
			padding: @padding-xs;
			box-sizing: border-box;
			.flex-c-aic();

			.chat-footer-input-box {
				flex: 1;
				padding-right: @padding-xs;
				box-sizing: border-box;
				overflow: hidden;
			}

			.chat-footer-send {
				border-radius: @border-radius-base;
				padding: 12rpx 50rpx;
				margin: 0;
				color: #fff;
				background-color: @primary-color;
				font-size: @font-size-sm;
				line-height: 44rpx;

				&::after {
					border: none;
				}
			}
		}
	}
</style>
