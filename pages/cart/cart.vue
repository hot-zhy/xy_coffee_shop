<template>
	<view style="background: #f5f5f5;">
		<uniNavBar :leftText="isedit?'完成':'编辑'" :statusBar="true" :border="false" :shadow="false" @clickLeft="isedit=!isedit" :fixed="true" title="购物车"></uniNavBar>
		<!-- 购物车为空 -->
		<!-- <view class="py-5 d-flex a-center j-center border" style="background-color: #f5f5f5;">
			<u-icon name="car-fill" size="28"></u-icon>
			<text class="text-light-muted mx-2">购物车空空如也~</text>
			<view class="px-2 py-1 border border-light-secondary rounded" hover-class="bg-light-secondary">去逛逛</view>
		</view> -->
		<!-- 购物车商品列表 -->
		<view class="bg-white px-2 mx-2 mt-2" style="border-radius: 20upx;">
			<!-- 列表 -->
			<view v-for="(item,index) in list" :key="index" class="d-flex a-center py-3 border-bottom border-light-secondary">
				<label class="radio d-flex a-center j-center flex-shrink" style="width: 80upx;height: 80upx;" @click="selectItem(index)">
					<radio color="#966034" :value="item.xyCoffeeId" :checked="item.checked" /><text></text>
				</label>
				<image :src="item.xyCoffeePicturePath" mode="widthFix" style="width: 150upx;height: 150upx;" class="border border-light-secondary rounded p-2 flex-shrink"></image>
				<view class="flex-1 d-flex flex-column pl-2">
					<view class="text-dark" style="font-size: 35upx;">
						{{item.xyCoffeeName}}
					</view>
					<!-- 规格属性 -->
					<view class="d-flex text-light-muted mb-1">
						<text class="mr-1">规格:{{item.xyCoffeeSize}}</text>
					</view>
					<view class="mt-auto d-flex j-sb">
						<price>{{item.xyCoffeePrice}}</price>
						<view class="a-self-end">
							<uni-number-box :min="item.minnum" :value="item.num" @change="changeNum($event,item,index)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 100upx;"></view>
		<!-- 合计 -->
		<view class="d-flex a-center position-fixed left-0 right-0 bottom-0 border-top border-light-secondary" style="height: 100upx;z-index: 1000;">
			<label class="radio d-flex a-center j-center flex-shrink" style="width: 120upx;" @click="doSelectAll" >
				<radio color="#966034" :checked="checkedAll" :disabled="disableSelectAll"/><text></text>
			</label>
			<template v-if="!isedit">
				<view class="flex-1 d-flex a-center j-center font-md">
					合计<price>{{totalPrice}}</price>
				</view>
				<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-md" hover-class="main-bg-hover-color" style="height: 80%;border-radius: 50upx">
					结算
				</view>
			</template>
			<template v-else>
				<view class="flex-1 d-flex a-center j-center font-md main-bg-color text-white mr-1" style="height: 80%;border-radius: 50upx;" hover-class="main-bg-hover-color">
					移入收藏
				</view>
				<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-md bg-danger" hover-class="main-bg-hover-color" style="height: 80%;border-radius: 50upx" @tap="doDelGoods">
					删除
				</view>
			</template>
		</view>
		
		
		
		<commonPopup :popupClass="popupShow" @hide="doHidePopup">
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
				<view class="main-bg-color text-white font-md d-flex a-center j-center mx-1 p-1" hover-class="main-bg-hover-color" style="border-radius: 50rpx;" @tap.stop="doHidePopup">
					确定
				</view>
			</view>
		</commonPopup>
	</view>
</template>

<script>
	import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue';
	import price from '@/components/common/price.vue';
	import numberBox from '@/uni_modules/uni-number-box/components/uni-number-box/uni-number-box.vue';
	import {mapState,mapGetters,mapActions,mapMutations} from 'vuex';
	import card from '@/components/common/card.vue';
	import zcmRadioGroup from '@/components/common/radio-group.vue';
	import commonPopup from '@/components/common/common-popup.vue';
	export default {
		components:{
			uniNavBar,
			price,
			numberBox,
			card,
			zcmRadioGroup,
			commonPopup
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
				isedit:false,
			}
		},
		computed:{
			...mapState({
				list:state=>state.cart.list,
				popupShow:state=>state.cart.popupShow
			}),
			...mapGetters([
				'checkedAll',
				'totalPrice',
				'disableSelectAll'
			])
		},
		methods: {
			...mapActions([
				'doSelectAll',
				'doDelGoods',
				'doShowPopup',
				'doHidePopup'
			]),
			...mapMutations([
				'selectItem'
			]),
			changeNum(e,item,index){
				item.num=e
			}
		}
	}
</script>

<style>
page{
	background-color: #f5f5f5;
}
</style>
