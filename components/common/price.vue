<template>
	<view class="d-flex main-text-color font-md line-h" :class="priceSize">
		<text style="align-self: flex-start;" :class="unitSize" >￥</text><slot />
	</view>
</template>

<script>
	export default{
		props:{
			priceSize:{
				type:String,
				default:"font-md"
			},
			unitSize:{
				type:String,
				dafault:"font-sm"
			}
		}
	}

</script>

<style>
</style>