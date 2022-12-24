<template>
	<view v-if="loaded" class="page-root">
		<zx-navbar>
			<view slot="title" class="navbar-middle">
				<view class="middle-title">{{ titleStr }}</view>
			</view>
			<view slot="right" class="navbar-right detail-navbar-right" :style="{ 'width': capsule ? capsule.width + 20 + 'px' : '110px' }"></view>
		</zx-navbar>
		<view class="page-box" :style="pageBoxStyle">
			<view class="mescroll-box">
				<mescroll-uni :fixed="false" :safearea="true" @init="mescrollInit" @down="downCallback" @up="upCallback">
					<view class="announce-box">
						<block v-for="(announce, index) in announceList" :key="announce.id">
							<announce :announce="announce" class="wper-100"></announce>
						</block>
					</view>
				</mescroll-uni>
			</view>
		</view>
	</view>
</template>

<script>
	import announce from '@/core/components/article/index.vue'
	export default {
		components: {
			announce
		},
		
		data() {
			return {
				loaded: false,
				cid: 0, //分类id
				page: 1, //页码
				mescroll: '',
				hasNext: false, //是否还有下一页数据
				announceList: '', //公告列表
				titleStr: ''
			}
		},

		onLoad(options) {
			this.cid = options.cid ? options.cid : 0
			this.fetchAnnounceList(true)
		},

		methods: {
			/**
			 * mescroll初始化
			 */
			mescrollInit(mescroll) {
				this.mescroll = mescroll
				this.mescroll.endSuccess(this.announceList.length, this.hasNext)
				if (!this.hasNext) {
					this.mescroll.hideUpScroll()
				}
			},

			/**
			 * 下拉刷新
			 */
			downCallback() {
				this.page = 1
				this.fetchAnnounceList(false)
			},

			/**
			 * 上拉加载
			 */
			upCallback() {
				if (this.hasNext) {
					this.page++
					this.fetchAnnounceList(false)
				}
			},

			/**
			 * 获取公告列表
			 */
			fetchAnnounceList(loading) {
				this.$util.postRequest(this.$api.cms.get_list, this.fetchParameters(), loading,
					res => {
						if (this.page == 1) {
							this.titleStr = res.data.title
							uni.setNavigationBarTitle({
								title: res.data.title
							})
						}
						this.announceList = this.page == 1 ? res.data.list : this.announceList.concat(res.data.list)
						this.hasNext = Boolean(res.data.hasNext)
						if (this.mescroll) {
							this.mescroll.endSuccess(res.data.list.length, this.hasNext)
							if (!this.hasNext) {
								this.mescroll.hideUpScroll()
							}
						}
						this.loaded = true
					},
					err => {
						if (this.mescroll) {
							this.mescroll.endErr()
						}
						if (this.page != 1) {
							this.page--
						}
						this.$util.showNoIconToast(err.info)
					})
			},

			/**
			 * 参数
			 */
			fetchParameters() {
				let params = {
					cid: this.cid,
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

	.announce-root {
		.hper-100();
		.flex-col();
		
		.announce-box {
			padding-bottom: @padding-xs;
		}
	}
</style>
