<template>
    <view class="content">
        <!--      <view :style="[{ height: customBar + 'px'},{ 'line-height' : customBar+20 + 'px'}]"></view> -->
        <view class="search-customBar" :style="[{ height: customBar + 'px'},{ 'line-height' : customBar+20 + 'px'}]">
            <view class="new-top">
                <!-- <image class="search-bak" src="../../static/search-bak-icon.png" mode="" @click="bakpage"></image> -->
				<!-- logo -->
				<image src="../../static/logo1.png" mode="" class="search-bak" style="border-radius: 100%;"></image>
                <view class="new-search-box" style="width: 62%;">
                    <image src="../../static/new-search.png" mode=""></image>
                    <input type="text" placeholder="请输入搜索内容" disabled="true" @click="search"/>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                customBar: '',
                goods: '',
                showfocus:false
            }
        },
        created() {
            this.customBar = getApp().globalData.customBar;
            this.showfocus = true;
        },
        methods: {
            bakpage() {
                uni.navigateBack({
                    delta: 1
                })
            },
            search() {
                uni.navigateTo({
                	url:'/pages/search/search'
                })
            }
        }

    }
</script>

<style>
    .content {
        position: relative;
    }

    .search-customBar {
        position: fixed;
        width: 100%;
        height: auto;
        left: 0;
        top: 0;
        background-color: #f7f7f7;
        overflow: hidden;
        z-index: 99;
    }

    .new-top {
        width: 74%;
        height: auto;
        padding: 0 22rpx;
        box-sizing: border-box;
        overflow: hidden;
    }

    .search-bak {
        position: absolute;
        left: 0;
        bottom: 6rpx;
        width: 67rpx;
        height: 67rpx;
        padding: 0 10rpx 5rpx 0rpx;
		border-radius: 100%;
    }

    .new-search-box {
        position: absolute;
        left: 68rpx;
        bottom: 12rpx;
        width: 71%;
        height: 66rpx;
        line-height: 66rpx;
        background: #FFF;
        border-radius: 33rpx;
        overflow: hidden;
    }

    .new-search-box image {
        float: left;
        width: 32rpx;
        height: 32rpx;
        margin: 18rpx 20rpx 0 30rpx;
    }

    .new-search-box input {
        /* float: left; */
        font-size: 26rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999;
        margin-top: 12rpx;
    }
</style>
