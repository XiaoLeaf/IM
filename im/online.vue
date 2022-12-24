<template>
	<view v-if="loaded" class="page-root">
		<zx-navbar>
			<view slot="title" class="navbar-middle">
				<view class="middle-title">在线列表</view>
			</view>
			<view slot="right" class="navbar-right" :style="{ 'width': '110px' }"></view>
		</zx-navbar>
		<view class="page-box" :style="pageBoxStyle">
			<view class="mescroll-box">
				<mescroll-uni :fixed="false" :safearea="true" @init="mescrollInit" @down="downCallback" @up="upCallback">
					<view class="common-mescroll-root">
						<view class="common-mescroll-box">
							<block v-if="onLineList.length">
								<view v-for="(item, index) in onLineList" :key="item.id" class="im-user-item" @click="$util.miniAppRoute('/im/chat?uid=' + item.id)">
									<image webp="true" lazy-load="true" class="im-user-icon" mode="aspectFill" :src="item.icon"></image>
									<view class="im-user-item-box">
										<view class="im-item-box-line">
											<view class="im-item-nickname">{{ item.nickname }}</view>
										</view>
										<view class="im-item-box-line">
											<view class="im-item-lastest">最新消息最新消息</view>
											<view class="item-item-time">2022-12-23 18:00:00</view>
										</view>
									</view>
								</view>
							</block>
							<zx-empty v-else></zx-empty>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loaded: false,
				onLineList: [], //在线列表
				page: 1,
				hasNext: false,
				mescroll: ''
			}
		},

		onLoad() {
			this.fetchOnLIneUser(true)
		},

		methods: {
			/**
			 * socket消息监听
			 */
			socketMessagerListener() {
				
			},
			
			/**
			 * mescroll初始化
			 */
			mescrollInit(mescroll) {
				this.mescroll = mescroll
				this.mescroll.endSuccess(this.onLineList.length, this.hasNext)
				if (!this.hasNext) {
					this.mescroll.hideUpScroll()
				}
			},

			/**
			 * 下拉刷新
			 */
			downCallback() {
				this.page = 1
				this.fetchOnLIneUser(false)
			},

			/**
			 * 上拉加载
			 */
			upCallback() {
				if (this.hasNext) {
					this.page++
					this.fetchOnLIneUser(false)
				}
			},

			/**
			 * 获取所有在线用户
			 */
			fetchOnLIneUser(loading) {
				this.$util.postRequest(this.$api.im.get_online_user, this.fetchParams(), loading,
					res => {
						this.hasNext = Boolean(res.data.hasNext)
						if (this.mescroll) {
							this.mescroll.endSuccess(res.data.list.length, this.hasNext)
							if (!this.hasNext) {
								this.mescroll.hideUpScroll()
							}
						}
						this.onLineList = this.page == 1 ? res.data.list : this.onLineList.concat(res.data.list)
						this.loaded = true
					},
					err => {
						this.$util.showNoIconToast(err.info)
						if (this.mescroll) {
							this.mescroll.endErr()
						}
						if (this.page == 1) {
							setTimeout(() => {
								this.$util.navigateBack()
							}, 1500)
						} else {
							this.page--
						}
					})
			},

			/**
			 * 参数
			 */
			fetchParams() {
				let params = {
					page: this.page
				}
				return params
			}
		}
	}
</script>

<style lang="less">
	page {
		.hper-100();
		background-color: @background-color;
	}
</style>
