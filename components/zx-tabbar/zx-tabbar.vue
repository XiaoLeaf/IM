<template>
	<view class="zx-tabbar-root">
		<zx-tabbar-root :list="tabbarArr" :border-top="false" icon-size="48" :active-color="themeColor" inactive-color="#999" @change="onChange"></zx-tabbar-root>
	</view>
</template>

<script>
	export default {
		name:"zx-tabbar",
		
		props: {
			tabbarArr: {
				type: Array,
				default: []
			}
		},
		
		data() {
			return {
				
			}
		},
		
		created() {
			
		},
		
		methods: {
			onChange(index) {
				console.log('index=====>',index)
				this.$emit('change', index)
			}
		}
	}
</script>

<style lang="less">
	.zx-tabbar-root {
		
	}
</style>
