<template>
	<view class="row p-2 border-bottom border-light-secondary animated fadeIn faster">
		<view class="span-6">
			<!-- <image :src="item.titlePic" mode="widthFix" class="w-100"></image> -->
			<image src="../../static/images/c5.jpg" mode="widthFix" class="w-100"></image>
		</view>
		<view class="span-14 pl-3 d-flex flex-column">
			<view class="font-md font-weight">
				{{item.xyCoffeeName}}
			</view>
			<view class="font text-light-muted line-h-md mb-auto">{{item.xyCoffeeBrief}}</view>
			<price>{{item.xyCoffeePrice}}</price>
			<view class="font-sm text-light-muted">{{item.xyCoffeeStock}}库存量</view>
		</view>
	</view>
</template>

<script>
	import price from '@/components/common/price.vue';
	export default{
		components:{
			price
		},
		props:{
			item:Object,
			index:Number
		}
	}
</script>

<style>
</style>