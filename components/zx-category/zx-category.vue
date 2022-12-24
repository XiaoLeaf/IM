<template>
	<view class="zx-category-root">
		<view class="zx-category-box" :style="{ padding: info.inner.t * 2 + 'rpx ' + info.inner.lr * 2 + 'rpx ' + info.inner.b * 2 + 'rpx'}">
			<image @click="onClickCategory(item)" v-for="(item, index) in info.list" :key="index" webp="true" lazy-load="true" mode="widthFix" :src="item.banner" class="zx-category-img" :style="{ 'border-radius' : info.image.radius * 2 + 'rpx', 'margin-bottom': info.inner.gap * 2 + 'rpx'}"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zx-category",
		
		props: {
			info: {
				type: Object,
				default() {
					return {
						
					}
				}
			}
		},
		
		data() {
			return {
				
			}
		},
		
		methods: {
			onClickCategory(category) {
				this.$util.miniAppRoute('/goods/pages/index/index?cid=' + category.id + '&name=' + category.name)
			}
		}
	}
</script>

<style lang="less" scoped>
	.zx-category-root {
		box-sizing: border-box;
		
		.zx-category-box {
			box-sizing: border-box;
			
			.zx-category-img {
				.wper-100();
				vertical-align: middle;
			}
		}
	}
</style>
