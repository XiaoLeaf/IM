<template>
	<view class="page-root">
		<zx-navbar>
			<view slot="title" class="navbar-middle">
				<view class="middle-title">{{ titleStr }}</view>
			</view>
			<view slot="right" class="navbar-right detail-navbar-right" :style="{ 'width': capsule ? capsule.width + 20 + 'px' : '110px' }"></view>
		</zx-navbar>
		<view class="page-box" :style="pageBoxStyle">
			<view class="webview-root">
				<web-view :src="url"></web-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '', //加载链接
				titleStr: '',
			}
		},
		
		onLoad(options) {
			this.url = options.url ? decodeURIComponent(options.url) : ''
			this.titleStr = options.title ? decodeURIComponent(options.title) : ''
		}
	}
</script>

<style lang="less">
	page {
		.hper-100();
		background-color: @background-color;
	}
	
	.webview-root {
		.hper-100();
	}
</style>
