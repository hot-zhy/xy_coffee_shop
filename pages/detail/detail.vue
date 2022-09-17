<template>
	<view>
		<!-- 商品详情大图 -->
		<swipperImage :resdata="detail.xyCoffeeAppearancePictures" height="700" preview></swipperImage>
		<!-- 基础详情 -->
		<view class="p-2">
			<view class="font-lg j-start">{{detail.xyCoffeeName}}</view>
			<view class="font text-light-muted mb-3 line-h-sm">{{detail.xyCoffeeBrief}}</view>
			<view class="d-flex a-center j-sb">
				<price priceSize="font-lg" unitSize="font">{{detail.xyCoffeePrice}}</price>
				<view class="j-end text-light-muted">库存{{detail.xyCoffeeStock}}</view>
			</view>
		</view>
		<!-- 属性选择 -->
		<view class="my-2">
			<uniCard :margin="0">
				<uni-list-item @click="show('express')">
					<view class="d-flex">
						<view class="mr-2 text-light-muted">配送</view>
						<view>顺丰￥12,满200包邮</view>
					</view>
				</uni-list-item>
				<uni-list-item  @click="show('attr')">
					<view class="d-flex">
						<view class="mr-2 text-light-muted">选择</view>
						<view>已选454g/包</view>
					</view>
				</uni-list-item>
			</uniCard>
		</view>
		<view class="ml-2 mb-2">{{detail.xyCoffeeDetail}}</view>
		<view v-for="(item,index) in detail.xyCoffeeDetailPictures" :key="index">
			<image src="/static/images/R.jpg" mode=""></image>
		</view>
		
		<!-- 底部操作条 -->
		<bottom-btn @show="show('attr')"></bottom-btn>
		<!-- 弹出框 -->
		<commonPopup :popupClass="popup.attr" @hide="hide('attr')">
			<!-- 商品信息 -->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="/static/images/aixds-2e1n0.webp" mode="widthFix"
				style="width: 180rpx;height: 180rpx;" class="border rounded"></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">2365</price>
					<text class="d-block">
						库存13
					</text>
				</view>
			</view>
			<!-- 表单部分 -->
			<card headTitle="规格选择" :headTitleWeight="false" :headBorderBottom="false">
				<zcm-radio-group :label="label" :selected.sync='label.selected'></zcm-radio-group>
			</card>
			<view class="position-fixed bottom-0 right-0 left-0">
				<!-- 数量选择 -->
				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box :min="1" :value="detail.num" @change="detail.num=$event"></uni-number-box>
				</view>
				<!-- 按钮 -->
				<view class="main-bg-color text-white font-md d-flex a-center j-center mx-1 p-1" hover-class="main-bg-hover-color" style="border-radius: 50rpx;" @tap.stop="addCart">
					加入购物车
				</view>
			</view>
		</commonPopup>
		<!-- 收货地址 -->
		<commonPopup :popupClass="popup.express" @hide="hide('express')">
			<!-- 收货地址 -->
			<view style="height: 100rpx;" class="d-flex a-center j-center font-md border-bottom border-light-secondary">
				收货地址
			</view>
			<!-- 地址集合 -->
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<uni-list-item v-for="i in 10" :key="i">
					<view class="d-flex">
						<u-icon name="map" size="20"></u-icon>
						<view class="ml-1 font-md font-weight">赵晗瑜</view>
					</view>
					<view class="font text-light-muted">上海市普陀区中山北路3663号华东师范大学</view>
				</uni-list-item>
			</scroll-view>
			<!-- 按钮 -->
			<view class="main-bg-color text-white font-md d-flex a-center j-center mx-1 p-1" hover-class="main-bg-hover-color" style="border-radius: 50rpx;" @tap.stop="hide('express')">
				选择新地址
			</view>
	
		</commonPopup>
		
	</view>
</template>

<script>
	import swipperImage from '@/components/index/swipper-image.vue';
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	import divider from '@/components/common/divider.vue';
	import uParse from '@/components/uni-ui/uParse/src/wxParse.vue';
	import bottomBtn from '@/components/detail/bottom-btn.vue';
	import commonPopup from '@/components/common/common-popup.vue';
	import price from '@/components/common/price.vue';
	import zcmRadioGroup from '@/components/common/radio-group.vue';
	import card from "@/components/common/card.vue";
	import uniNumberBox from '@/uni_modules/uni-number-box/components/uni-number-box/uni-number-box.vue';
	import uniCard from '@/uni_modules/uni-card/components/uni-card/uni-card.vue';
	import {mapMutations} from 'vuex';
	export default {
		components:{
			swipperImage,
			uniListItem,divider,
			uParse,
			bottomBtn,
			commonPopup,
			price,
			zcmRadioGroup,
			card,
			uniNumberBox,
			uniCard
		},
		data() {
			return {
				label:{
					title:"规格",
					selected:0,
					list:[
						{name:"272g"},
						{name:"454g"}
					]
				},
				popup:{
					attr:"none",
					express:"none"
				},
				detail:{
				},
			}
		},
		onLoad(option) {
			this.detail.xyCoffeeId=option.index
			uni.request({
				url: 'http://localhost:8080/coffee/detail/'+option.index,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.detail=res.data.data
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			...mapMutations([
				'addGoodsToCart'
			]),
			hide(key){
				this.popup[key]='hide'
				setTimeout(()=>{
					this.popup[key]='none'
				},200)
			},
			show(key){
				this.popup[key]='show'
			},
			addCart(){
				// 组织数据
				let goods=this.detail
				goods['checked']=false
				goods['xyCoffeeSize']=272
				this.addGoodsToCart(goods)
				this.hide('attr')
				uni.showToast({
					title: '加入成功'
				});
				
			}
		}
	}
</script>

<style>
	.uparse .p{
		padding: 0!important;
	}
	.uparse .view{
		line-height: 0;
	}
	._popup ,._mask{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
	}
	._popup{
		z-index: 2000;
		display: none;
	}
	._mask{
		z-index: 2002;
		background: rgba(0,0,0,0.5);
	}
	._popup ._body{
		position: fixed;
		bottom: -1035rpx;
		width: 92%;
		padding: 0 4%;
		height: 1035rpx;
		z-index: 2003;
		border-radius: 20rpx 20rpx 0 0;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
	}
	._popup.show{
		display: block;
	}
	.show ._mask{
		animation: showPopupMask 0.2s linear both;
	}
	.show ._body{
		animation: showPopupBody 0.2s linear both;
	}
	._popup.hide{
		display: block;
	}
	.hide ._mask{
		animation: hidePopupMask 0.2s linear both;
	}
	.hide ._body{
		animation: hidePopupBody 0.2s linear both;
	}
	@keyframes showPopupBody{
		0%{ transform: translateY(0); }
		100%{ transform: translateY(-100%);  }
	}
	@keyframes hidePopupBody{
		0%{ transform: translateY(-100%); }
		100%{ transform: translateY(0);  }
	}
	@keyframes showPopupMask{
		0%{ opacity: 0; }
		100%{ opacity: 1; }
	}
	@keyframes hidePopupMask{
		0%{ opacity: 1; }
		100%{ opacity: 0; }
	}
	._popup.none{
		display: none;
	}
	
</style>
