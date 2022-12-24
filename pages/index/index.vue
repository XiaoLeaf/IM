<template>
	<view class="page-root">
		<view @click="$util.miniAppRoute('/im/online')" class="">在线用户</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		
		onLoad() {
			setTimeout(() => {
				console.log('client_id====>',this.client_id)
				console.log('socket====>',this.$socket)
				console.log('readyState====>',this.readyState)
			}, 1000)
		},

		methods: {
			
		}
	}
</script>

<style lang="less">
	page {
		.hper-100();
		background-color: @background-color;
	}
</style>
