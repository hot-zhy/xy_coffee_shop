<template>
	<view>
		<!-- 头部 -->
		<view class="position-relative d-flex a-center" style="height: 320rpx;">
			<image src="../../static/images/MEMO品牌VI_pdf_1662746925891_6.jpg" mode="widthFix"
				style="height: 320rpx;width:100%;opacity: 0.85;"></image>
			<view class="d-flex a-center position-absolute left-0 right-0">
				<image src="../../static/images/R.jpg" mode=""
					style="height: 145rpx;width: 145rpx;border:5rpx solid;border-color:black;"
					class="rounded-circle ml-4"></image>
				<button class="ml-2 font-weight font-lg" type="default" lang="zh_CN" @tap="getUserProfile">登录</button>
			</view>
		</view>
		<!-- 图标分类 -->
		<uniCard>
			<uniListItem>全部订单</uniListItem>
			<view class="d-flex a-center">
				<view class="flex-1 d-flex flex-column a-center j-center py-3" hover-class="bg-light-secondary">
					<u-icon name="clock" size="20"></u-icon>
					<view class="">待付款</view>
				</view>
				<view class="flex-1 d-flex flex-column a-center j-center py-3" hover-class="bg-light-secondary">
					<u-icon name="car" size="20"></u-icon>
					<view class="">待收货</view>
				</view>
				<view class="flex-1 d-flex flex-column a-center j-center py-3" hover-class="bg-light-secondary">
					<u-icon name="chat" size="20"></u-icon>
					<view class="">待评价</view>
				</view>
				<view class="flex-1 d-flex flex-column a-center j-center py-3" hover-class="bg-light-secondary">
					<u-icon name="rmb-circle" size="20"></u-icon>
					<view class="">退款/售后</view>
				</view>
			</view>
		</uniCard>
		<uniCard>
			<uniListItem>我的地址</uniListItem>
			<uniListItem>联系商家</uniListItem>
		</uniCard>

	</view>
</template>

<script>
	import uniCard from '@/uni_modules/uni-card/components/uni-card/uni-card.vue';
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	export default {
		components: {
			uniCard,
			uniListItem
		},
		data() {
			return {
				nickname:"",
				avatar:"",
				encryptData:"",
				iv:"",
				code:''
			}
		},
		created() {
			wx.login({
				success:function(res){
					wx.setStorageSync('code',res.code)
					wx.request({
						url:'http://localhost:8080/user/session?code='+res.code,
						method:'POST',
						success(res) {
							wx.setStorageSync('sessionId',res.data.data.sessionId)
						}
					})
				}
			})
		},
		methods: {
			getUserProfile(){
				wx.login({
					success:function(res){
						wx.setStorageSync('code',res.code)
						wx.request({
							url:'http://localhost:8080/user/session?code='+res.code,
							method:'POST',
							success(res) {
								wx.setStorageSync('sessionId',res.data.data.sessionId)
							}
						})
					}
				})
				wx.getUserInfo({
					success(res) {
						var encryptedData=res.encryptedData;
						var iv=res.iv;
						wx.request({
							url:'http://localhost:8080/user/login',
							method:"POST",	
							data:{
								'encryptedData':encryptedData,
								'iv':iv,
								'sessionId':wx.getStorageSync('sessionId')
							},
							success(res) {
								console.log(res);
							}
						})
					}
				})
			}
		}
}
</script>

<style>
	page {
		background-color: #f3f3f3;
	}
</style>
