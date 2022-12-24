<template>
	<view class="common-root">
		<template v-for="(item, index) in common.moduleData">
			<zx-search v-if="item.type == 'ZxSearch'" :info="item.data" :key="index"></zx-search>
			<zx-slide v-if="item.type == 'ZxSlide'" :info="item.data" :key="index"></zx-slide>
			<zx-nav v-if="item.type == 'ZxNav'" :info="item.data" :key="index"></zx-nav>
			<zx-line v-if="item.type == 'ZxLine'" :info="item.data" :key="index"></zx-line>
			<zx-news v-if="item.type == 'ZxNews'" :info="item.data" :key="index"></zx-news>
			<zx-blank v-if="item.type == 'ZxBlank'" :info="item.data" :key="index"></zx-blank>
			<zx-image v-if="item.type == 'ZxImage'" :info="item.data" :key="index"></zx-image>
			<zx-cube v-if="item.type == 'ZxCube'" :info="item.data" :key="index"></zx-cube>
			<zx-goods v-if="item.type == 'ZxGoods'" :info="item.data" :key="index"></zx-goods>
			<zx-ad v-if="item.type == 'ZxAd'" :info="item.data" :key="index"></zx-ad>
			<zx-notice v-if="item.type == 'ZxNotice'" :info="item.data" :key="index"></zx-notice>
			<zx-richtext v-if="item.type == 'ZxRichText'" :info="item.data" :key="index"></zx-richtext>
			<zx-mini v-if="item.type == 'ZxMini'" :info="item.data" :key="index"></zx-mini>
			<zx-menu v-if="item.type == 'ZxMenu'" :info="item.data" :key="index"></zx-menu>
			<zx-category v-if="item.type == 'ZxCategory'" :info="item.data" :key="index"></zx-category>
			<zx-goods-flash-sale v-if="item.type == 'ZxGoodsFlashSale'" class="zx-goods-flash-sale" :info="item.data" :position="index" :key="index" @change="onGoodsFlashSaleChange"></zx-goods-flash-sale>
		</template>
		<zx-none v-if="needNone"></zx-none>
	</view>
</template>

<script>
	export default {
		name:"zx-common",
		
		props: {
			common: {
				type: Object,
				default() {
					return {
						
					}
				}
			},
			
			needNone: {
				type: Boolean,
				default: true
			}
		},
		
		data() {
			return {
				
			}
		},
		
		methods: {
			onGoodsFlashSaleChange() {
				this.$emit('change')
			}
		}
	}
</script>

<style lang="less">
	.common-root {
		
		.nomore-root {
			padding: 0 @padding-xs * 2;
			box-sizing: border-box;
			background-color: transparent;
			height: 110rpx;
			
			.nomore-box {
				.flex-c-aic-jcc();
				.hper-100();
				
				.line {
					flex: 1;
					border-bottom: 1px solid #e9e9e9;
				}
				
				.title {
					padding: 0 @padding-xs * 2;
					box-sizing: border-box;
					font-size: @font-size-sm;
					color: @text-thirdly-color;
				}
			}
		}
	}
</style>
