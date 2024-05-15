<template>
	<formwork title="用户首页">
		<view class="mainBox">
			<!-- 用来感谢某用户的赞助支持，使得本软件能坚持运营下去。 -->
			<uni-notice-bar :speed="30" :text="noticeObj.title" show-icon="true" scrollable="true" background-color="#8000ff" color="aqua"></uni-notice-bar>
			<upgrade v-if="showUpdate" :appInfo="appInfo"></upgrade>
			<view class="versionText" hover-class="hoverClass">当前版本号：{{old_version}}</view>
			<form @submit="submit">
				<view class="publishCommentBox" v-show="showPublishBox">
					<input placeholder="问题:软件突然闪退了" class="title" name="title" placeholder-style="color:aqua;font-family:my_font_light;" />
					<textarea placeholder="补充:昨天还好好的,今天一打开软件就" class=" content" name="content" placeholder-style="color:aqua;font-family:my_font_light;"></textarea>
					<view class="btnBox">
						<button form-type="submit" class="submit" hover-class="hoverClass">提交</button>
						<button form-type="reset" class="reset" hover-class="hoverClass">清空内容</button>
					</view>
				</view>
			</form>
			<view class="imageBox" v-if="showAlipayCode">
				<image src="../../static/img/alipayCode.png"></image>
			</view>
			<view class="imageBox" v-if="showWechatCode">
				<image src="../../static/img/wechatCode.png"></image>
			</view>
			<!-- 青色悬浮按钮 -->
			<uni-fab :content="contentOne" :pattern="patternOne" @trigger="triggerOne" v-if="showLeftBottomFab" @fabClick="fabClickOne"></uni-fab>
			<!-- 橙色悬浮按钮 -->
			<uni-fab horizontal="right" :content="contentTwo" :pattern="patternTwo" @trigger="triggerTwo" v-if="showRightFab" @fabClick="fabClickTwo"></uni-fab>
		</view>
	</formwork>
</template>

<script>
	export default {
		data() {
			return {
				showWechatCode: false,
				showAlipayCode: false,
				noticeObj: {},
				showRightFab: true,
				showPublishBox: false,
				//要传递给自定义组件的对象
				appInfo: {
					new_version: null, //新的版本号，从云函数里获取
					content: null, //app更新的内容
					apkUrl: null, //apk的下载链接
				},
				old_version: null, //旧的版本号，通过uni.getAppBaseInfo()获得
				showUpdate: false,
				showLeftBottomFab: true,
				contentOne: [ //图标路径
					{
						iconPath: "/static/img/commentSection.png",
						text: "图文区"
					},
					{
						iconPath: "/static/img/post_comments.png",
						text: "发布动态"
					},
					{
						iconPath: "/static/img/checkUpdate.png",
						text: "检查更新"
					},
					{
						iconPath: "/static/img/logoutandlogin.png",
						text: "退出登录"
					}
				],
				contentTwo: [ //图标
					{
						iconPath: "/static/img/commentSection.png",
						text: "评论区"
					},
					{
						iconPath: "/static/img/post_comments.png",
						text: "反馈评论"
					},
					{
						iconPath: "/static/img/wechat_icon.png",
						text: "微信赞助"
					},
					{
						iconPath: "/static/img/alipay.png",
						text: "支付宝"
					}
				],
				//绿色悬浮按钮
				patternOne: {
					buttonColor: "#73ffb9",
					backgroundColor: "#000",
					color: "#73ffba"
				},
				//橙色悬浮按钮
				patternTwo: {
					buttonColor: "#ffa600",
					backgroundColor: "#000",
					color: "#55ffff"
				},
				deviceId: ""
			}
		},
		onLoad() {
			this.noticeObj = {
				"content": "希望更多的兄弟姐妹们能够出一份力，让此软件的云服务能够支撑下去。",
				"title": "因无人资助，决定关闭云服务，希望更多的兄弟姐妹们能够出一份力，让此软件的云服务能够支撑下去。",
				"time": "2024年5月14日"
			}
			// uniCloud.callFunction({
			// 	name: "getNoticeData",
			// 	success: (e) => {
			// 		console.log("获取通知栏数据成功", this.noticeObj = e.result.data[0]);
			// 		uni.setStorage({
			// 			key: "noticeObj",
			// 			data: e.result.data[0],
			// 			success: () => {
			// 				console.log("存储通知栏信息成功！");
			// 			},
			// 			fail: (err) => {
			// 				console.log("存储通知栏数据失败", err);
			// 			}
			// 		});
			// 	},
			// 	fail: (err) => {
			// 		console.log("获取通知栏数据失败", err);
			// 	}
			// });
			//获取本地设备id
			uni.getStorage({
				key: "deviceId",
				success: (e) => {
					console.log("获取到本地设备id", this.deviceId = e.data);
				},
				fail: (err) => {
					console.log("没有获取到本地设备id", err.errMsg);
				}
			});
			//获取旧的版本号
			this.old_version = uni.getAppBaseInfo().appVersion;
			//获取登录信息
			uni.getStorage({
				key: "login",
				success: (res) => {
					console.log("获取到登录信息", res.data);
				},
				fail: (err) => {
					console.log("没有获取到登录信息", err);
					if (this.deviceId.substring(0, 5) !== "17156") {
						uni.showToast({
							title: "没有获取到登录信息-请重新登录",
							icon: 'error'
						});
						// setTimeout(() => {
						// 	uni.reLaunch({
						// 		url: "/pages/loginInterface/loginInterface"
						// 	});
						// }, 2000);
					} else {
						console.log("管理员身份无需登录");
					}

				}
			});
		},
		methods: {
			fabClickOne() {
				console.log("点击了青色悬浮按钮");
				//隐藏青色按钮
				this.showRightFab = !this.showRightFab;
			},
			fabClickTwo() {
				console.log("点击了橙色悬浮按钮");
				this.showLeftBottomFab = !this.showLeftBottomFab;
				this.showAlipayCode = false;
				this.showWechatCode = false;
				this.showPublishBox = false;
			},
			//点击才能调用云函数---对比版本号检查更新跳转升级界面
			checkUpdate() {
				uni.showToast({
					title: "正在检查更新···",
					icon: "loading",
					duration: 2000
				});
				//热更新-点击检查更新后调用云函数才能获取最新版本
				uniCloud.callFunction({
					name: "getUpdateData",
					success: (res) => {
						if (this.old_version < res.result.data[0].new_version) {
							console.log("需要更新");
							this.showLeftBottomFab = false;
							this.showRightFab = false;
							uni.showToast({
								title: "需要更新",
								icon: "none"
							});
							this.appInfo.new_version = res.result.data[0].new_version;
							this.appInfo.content = res.result.data[0].content;
							this.appInfo.apkUrl = res.result.data[0].apkUrl;
							this.showUpdate = true;

						} else {
							console.log("无需更新");
							uni.showToast({
								title: "无需更新！",
								icon: "none"
							})
						}
					}
				});
			},
			triggerOne(res) {
				if (res.index === 0) {
					console.log("用户点击了图文区");
					uni.reLaunch({
						url: "/pages/imageText/imageText"
					})
				} else if (res.index === 1) {
					console.log("点击了发布动态");
					uni.reLaunch({
						url: "/pages/submitUpdates/submitUpdates"
					})
				} else if (res.index === 2) {
					console.log("点击了检查更新");
					this.checkUpdate();
				} else if (res.index === 3) {
					console.log("点击了退出登录");
					uni.clearStorage();
					uni.reLaunch({
						url: "/pages/loginInterface/loginInterface"
					});
				}

			},
			triggerTwo(res) {
				if (res.index === 0) {
					console.log("点击了评论区");
					uni.reLaunch({
						url: "/pages/commentSection/commentSection"
					});
				} else if (res.index === 1) {
					console.log("点击了反馈评论");
					this.showPublishBox = !this.showPublishBox;
					this.showWechatCode = false;
					this.showAlipayCode = false;
				} else if (res.index === 2) {
					console.log("点击了微信赞助");
					this.showWechatCode = !this.showWechatCode;
				} else if (res.index === 3) {
					console.log("点击了支付宝赞助");
					this.showAlipayCode = !this.showAlipayCode;
				}

			},
			//提交表单标题和内容
			submit(e) {
				if (e.detail.value.title && e.detail.value.content) {
					uni.showToast({
						title: "因资金不足-云服务已关闭！待捐款",
						icon: "error"
					});
					// uniCloud.callFunction({
					// 	name: "submitFeedback",
					// 	data: {
					// 		title: e.detail.value.title,
					// 		content: e.detail.value.content
					// 	},
					// 	success: (e) => {
					// 		console.log(e);
					// 		uni.showToast({
					// 			title: "上传反馈成功！"
					// 		});
					// 		this.showPublishBox = false;
					// 		setTimeout(() => {
					// 			uni.reLaunch({
					// 				url: "/pages/commentSection/commentSection"
					// 			})
					// 		}, 1400)
					// 	},
					// 	fail: (err) => {
					// 		console.log("上传失败", err);
					// 		uni.showToast({
					// 			title: "上传反馈失败！",
					// 			icon: "error"
					// 		});

					// 	}
					// });
				} else {
					uni.showToast({
						title: "请正确填写信息！",
						icon: "error"
					});
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.hoverClass {
		opacity: 0.1;
	}

	.mainBox {
		display: flex;
		flex-direction: column;
		height: 84vh;
		align-items: center;
		justify-content: flex-start;

		.versionText {
			color: aqua;
			font-family: my_font_bold;
			font-size: 20px;
		}

		.imageBox {
			border-radius: 10px;
			position: fixed;
			top: 20%;
			height: 50vh;
			width: 80vw;
			box-shadow: 0 0 15px 10px rgba(0, 0, 0, 0.4);

			image {
				width: 100%;
				height: 100%;
				border-radius: 10px;
			}
		}

		.publishCommentBox {
			margin-top: 20px;
			border-bottom: none;
			border-radius: 10px;
			height: 30vh;
			width: 80vw;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			box-shadow: 0 0 19px 7px rgba(0, 0, 0, 0.3);

			.title {
				height: 6vh;
				text-align: center;
				color: yellow;
				border-bottom: 1px solid #796dac;
				font-family: my_font_light;
			}

			.title:hover {
				border-image: linear-gradient(to left, #ff55ff, #00ff00, #ffaa00);
				border-image-slice: 1;
				border-bottom: 3px solid transparent;
				color: #00ff00;
				font-size: 20px;
			}

			.content {
				height: 6vh;
				text-align: center;
				color: yellow;
				border-bottom: 1px solid #8e7ad0;
				font-family: my_font_light;

			}

			.content:hover {
				border-image: linear-gradient(to left, #ff55ff, #00ff00, #ffaa00);
				border-image-slice: 1;
				border-bottom: 3px solid transparent;
				font-size: 17px;
			}

			.btnBox {
				display: flex;
				flex-direction: row;

				.submit {
					background: linear-gradient(to left, #1de1ff, #aa55ff);
					border: none;
					flex: 1;
					font-family: my_font_light;
					color: #55ffff;
					height: 5vh;
					line-height: 5vh;
				}

				.reset {
					flex: 1;
					border: none;
					background: linear-gradient(to right, #ff557f, #ffffff);
					font-family: my_font_light;
					color: #000000;
					height: 5vh;
					line-height: 5vh;
				}
			}

		}

	}
</style>