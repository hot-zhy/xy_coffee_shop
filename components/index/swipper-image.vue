<template>
	<view class="">
		<!-- 轮播图组件 -->
		<swiper indicator-dots autoplay :interval="3000" :duration="1000" circular :style="getStyle">
			<block v-for="(item,index) in resdata">
				<swiper-item>
					<view class="swiper-item" @tap="event(item,index)" >
						<image src="/static/images/MEMO品牌VI_pdf_1662746925891_9.jpg" lazy-load :style="getStyle"></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
	
	</view>
</template>

<script>
	export default{
		props:{
			resdata:Array,
			height:{
				type:String,
				default:"350"
			},
			preview:{
				type:Boolean,
				default:false
			}
		},
		computed:{
			getStyle(){
				return `height:${this.height}rpx`
			},
			getUrls(){
				return this.resdata.map((v)=>v.src)
			}
		},
		methods:{
			event(item,index){
				if(this.preview){
					return uni.previewImage({
						current:index,
						urls:this.getUrls,
						indicator:"default"
					})
				}
			}
		}
	}
</script>

<style>
</style>