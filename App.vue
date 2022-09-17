<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	export default {
		globalData:{
		    customBar:'',
			statusBarHeight: 0, // 状态导航栏高度
			navHeight: 0, // 总体高度
			navigationBarHeight: 0, // 导航栏高度(标题栏高度)
		},
		onLaunch: function() {
			console.log('App Launch')
			// 状态栏高度
			    this.globalData.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			
			    // #ifdef MP-WEIXIN
			    // 获取微信胶囊的位置信息 width,height,top,right,left,bottom
			    const custom = wx.getMenuButtonBoundingClientRect()
			    // console.log(custom)
			
			    // 导航栏高度(标题栏高度) = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
			    this.globalData.navigationBarHeight = custom.height + (custom.top - this.globalData.statusBarHeight) * 2
			    // console.log("导航栏高度："+this.globalData.navigationBarHeight)
			
			    // 总体高度 = 状态栏高度 + 导航栏高度
			    this.globalData.navHeight = this.globalData.navigationBarHeight + this.globalData.statusBarHeight
			
			    // #endif
		},
		onShow: function() {
		    let that = this;
		    uni.getSystemInfo({
		    　success:function(e){
		    　　that.globalData.statusBar = e.statusBarHeight
		    　　// #ifndef MP
		    　　if(e.platform == 'android') {
		    　　　　that.globalData.customBar = e.statusBarHeight + 50
		    　　}else {
		    　　　　that.globalData.customBar = e.statusBarHeight + 45
		    　　}
		    　　// #endif
		    　　// #ifdef MP-WEIXIN
		    　　let custom = wx.getMenuButtonBoundingClientRect()   
		    　　that.globalData.customBar = custom.bottom + custom.top - e.statusBarHeight
		    　　// #endif
		    　　// #ifdef MP-ALIPAY
		    　　that.globalData.customBar = e.statusBarHeight + e.titleBarHeight
		    　　// #endif
		    　}
		    })
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
		    into (){
		       
		    }
		}
	}
</script>

<style>
	@import "/common/animate.css";
	@import "/common/uni.css";
	@import "/common/icon.css";
	@import "/common/common.css";
	@import "/common/zcm-main.css";
</style>
