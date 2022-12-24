<template>
	<view id="zx-tabs" class="zx-tabs-root" :class="[sticky ? 'sticky-tabs' : '']" :style="{top: stickyTop + 'px'}">
		<block v-if="isScroll">
			<scroll-view :scroll-x="true" :scroll-with-animation="true" :scroll-left="scrollLeft" class="zx-tabs-scroll">
				<view class="zx-tabs-content">
					<block v-for="(item, index) in list" :key="index">
						<view @click="onClickTabsItem(index)" :id="'tab-item-' + index" class="zx-tabs-item" :class="[index == current ? 'zx-tabs-item-highlight' : '']">
							<image v-if="item.icon" webp="true" lazy-load="true" :style="{width: iconSize + 'rpx', height: iconSize + 'rpx'}" class="item-icon" mode="aspectFill" :src="item.icon"></image>
							<view class="item-title">{{ item.title }}</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</block>
		<block v-else>
			<view class="zx-tabs-no-scroll">
				<view class="zx-tabs-no-content">
					<block v-for="(item, index) in list" :key="index">
						<view @click="onClickTabsItem(index)" :id="'tab-item-' + index" class="zx-tabs-no-item" :class="[index == current ? 'zx-tabs-item-highlight' : '']">
							<image v-if="item.icon" webp="true" lazy-load="true" :style="{width: iconSize + 'rpx', height: iconSize + 'rpx'}" class="item-icon" mode="aspectFill" :src="item.icon"></image>
							<view class="item-title">{{ item.title }}</view>
						</view>
					</block>
				</view>
			</view>
		</block>
		
	</view>
</template>

<script>
	export default {
		name:"zx-tabs",
		
		props: {
			sticky: {
				type: Boolean,
				default: true
			},
			
			list: {
				type: Array,
				default() {
					return []
				}
			},
			
			isScroll: {
				type: Boolean,
				default: false
			},
			
			iconSize: {
				type: Number,
				default: 40
			},
			
			column: {
				type: Boolean,
				default: false
			},
			
			activeColor: {
				type: String,
				default: ''
			},
			
			inActiveColor: {
				type: String,
				default: ''
			},
			
			stickyTop: {
				type: Number,
				default: 0
			},
		},
		
		data() {
			return {
				winWidth: 0.0, //屏幕宽度
				current: 0, //当前选中项
				tabQueryInfo: '', //存放对tab菜单查询后的节点信息
				parentLeft: 0, // 父元素(tabs组件)到屏幕左边的距离
				componentWidth: 0, // 组件宽度，单位为px
				scrollLeft: 0, // 滚动scroll-view的左边滚动距离
			}
		},
		
		created() {
			let systemInfo = uni.getSystemInfoSync()
			this.winWidth = systemInfo.windowWidth
		},
		
		mounted() {
			this.$nextTick(() => {
				this.fetchTabsInfo()
			})
		},
		
		methods: {
			/**
			 * 选中菜单
			 */
			onClickTabsItem(index) {
				this.current = index
				this.$nextTick(() => {
					this.scrollByIndex()
				})
				this.$emit('change', this.current)
			},
			
			/**
			 * 查询tab的布局信息
			 */
			getTabRect() {
				// 创建节点查询
				let query = this.createSelectorQuery()
				// 历遍所有tab，这里是执行了查询，最终使用exec()会一次性返回查询的数组结果
				for (let i = 0; i < this.list.length; i++) {
					// 只要size和rect两个参数
					query.select(`#tab-item-${i}`).fields({
						size: true,
						rect: true
					})
				}
				// 执行查询，一次性获取多个结果
				query.exec(
					function(res) {
						this.tabQueryInfo = res
						// 初始化滚动条和移动bar的位置
						// if (this.cid) {
						// 	this.scrollByIndex()
						// }
					}.bind(this)
				)
			},
			
			/**
			 * 滚动scroll-view，让活动的tab处于屏幕的中间位置
			 */
			scrollByIndex() {
				// 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
				let tabInfo = this.tabQueryInfo[this.current]
				if (!tabInfo) return
				// 活动tab的宽度
				let tabWidth = tabInfo.width
				// 活动item的左边到tabs组件左边的距离，用item的left减去tabs的left
				let offsetLeft = tabInfo.left - this.parentLeft
				// 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
				let scrollLeft = offsetLeft - (this.componentWidth - tabWidth) / 2
				this.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft
				// console.log('scrollLeft====>',this.scrollLeft)
			},
			
			/**
			 * 获取顶部tabs组件信息
			 */
			fetchTabsInfo() {
				let that = this
				let query = this.createSelectorQuery()
				query.select('#zx-tabs').boundingClientRect(data => {
					that.componentWidth = data.width
					if (!that.tabQueryInfo) {
						that.getTabRect()
					}
				}).exec()
			}
		}
	}
</script>

<style lang="less" scoped>
	.sticky-tabs {
		z-index: 990;
		position: sticky;
		top: var(--window-top);
	}
	
	.zx-tabs-root {
		padding: @padding-xs / 2 0;
		.wper-100();
		background-color: #FFFFFF;
		
		.zx-tabs-scroll {
			.wper-100();
			
			.zx-tabs-content {
				.wper-100();
				.flex-c-aic();
				
				.zx-tabs-item {
					.flex-c-aic-jcc();
					flex-shrink: 0;
					font-size: @font-size-base;
					color: @text-secondary-color;
					font-weight: normal;
					padding: @padding-xs / 2 @padding-xs;
					position: relative;
					text-align: center;
					
					.item-icon {
						margin-right: @common-blank;
					}
					
					.item-title {
						
					}
				}
				
				.zx-tabs-item-highlight {
					color: @primary-color;
					font-weight: 700;
					
					&::after {
						position: absolute;
						bottom: 2rpx;
						left: 30%;
						width: 40%;
						content: '';
						height: 4rpx;
						border-radius: 4rpx;
						background-color: @primary-color;
					}
				}
			}
		}
		
		.zx-tabs-no-scroll {
			.wper-100();
			
			.zx-tabs-no-content {
				.wper-100();
				.flex-c();
				
				.zx-tabs-no-item {
					flex: 1;
					.flex-c-aic-jcc();
					flex-shrink: 0;
					font-size: @font-size-base;
					color: @text-secondary-color;
					font-weight: normal;
					padding: @padding-xs / 2 @padding-xs;
					position: relative;
					text-align: center;
					
					.item-icon {
						margin-right: @common-blank;
					}
					
					.item-title {
						
					}
				}
				
				.zx-tabs-item-highlight {
					color: @primary-color;
					font-weight: 700;
					
					&::after {
						position: absolute;
						bottom: 2rpx;
						left: 30%;
						width: 40%;
						content: '';
						height: 4rpx;
						border-radius: 4rpx;
						background-color: @primary-color;
					}
				}
			}
		}
	}
</style>
