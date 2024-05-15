<template>
	<view class="main">
		<view class="upgrade_popup_box">
			<image class="header_background" src="/static/img/upgrade_bg_two.png" mode="aspectFit"></image>
			<view class="main_content_box">
				<view class="find_version_text">发现新版本{{ new_version }}</view>
				<view class="upadate_content_text">
					具体更新内容
				</view>
				<!-- 详细更新内容 -->
				<view class="content_text" v-html="content"></view>
				<!-- （1）点击立即更新downLoad为DownlaodStatus为false,隐藏立即更新按钮-->
				<button hover-class="btn_hover" @click="click_btn_update" v-if="show_update_btn === true">
					立即更新
				</button>
				<!-- 按钮隐藏后显示进度条和文字盒子-->
				<view class="progress_box" v-else>
					<!-- 正在下载中 0%文字 -->
					<view class="downLoadText">{{ downLoadText }}{{ progress }}%</view>
					<!-- 核心进度条-->
					<view class="progress" :style="setwidth"></view>
					<!--  -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "upgrade",
		//定义自定义组件的属性
		props: {
			appInfo: {
				content: {
					default: ""
				},
				new_version: {
					default: ""
				},
				apkUrl: {
					default: ""
				}
			}
		},
		data() {
			return {
				content: null,
				show_update_btn: true,
				new_version: null,
				apkUrl: null,
				progress: 0,
				audioObj: {}
			};
		},
		//定义需要index.vue传入的对象

		// 实时更新进度条和文字状态
		computed: {
			// 实时计算更新进度条
			setwidth() {
				return {
					// 进度条总宽度100%
					width: this.progress + "%"
				};
			},
			downLoadText() {
				if (this.progress === 0) {
					return "开始下载";
				} else if (this.progress <= 20) {
					return "正在下载中";
				} else if (this.progress <= 50) {
					return "努力下载中";
				} else if (this.progress <= 80) {
					return "最后冲刺下载";
				} else if (this.progress <= 90) {
					return "加速下载";
				} else if (this.progress === 100) {
					this.audioObj.stop();
					return "下载完毕";
				} else {
					return "加速下载中"
				}
			},
		},
		//取出index.vue父组件传递的对象
		mounted() {
			if (this.appInfo !== undefined && this.appInfo.content !== null && this.appInfo.new_version !== null && this.appInfo.apkUrl !== null) {
				this.content = this.appInfo.content;
				this.new_version = this.appInfo.new_version;
				this.apkUrl = this.appInfo.apkUrl;
				console.log("拿到了index传入的数据" + this.content + this.new_version + this.apkUrl);
				uni.showToast({
					title: "拿到更新数据",
					icon: "none"
				});

			} else {
				console.log("没有拿到数据", typeof this.appInfo);
				uni.showToast({
					title: "缺少数据无法更新！",
					icon: "error"
				});
			};
		},
		methods: {
			// 点击立即更新后，隐藏按钮
			click_btn_update() {
				let audioObj = uni.createInnerAudioContext();
				audioObj.autoplay = true;
				audioObj.src = "/static/music/1.mp3";
				audioObj.onPlay(() => {
					console.log("开始播放");
				});
				audioObj.onError(err => {
					console.log(err)
				});
				this.audioObj = audioObj;
				// 如果apk安装包真实存在
				if (this.apkUrl) {
					uni.showToast({
						title: "检测到apk安装包！",
						icon: "success",
					});
					//不显示立即更新按钮，显示进度条
					this.show_update_btn = false;
					//
					let downloadTask = uni.downloadFile({
						url: this.apkUrl,
						success: (res) => {
							if (res.statusCode === 200) {
								console.log("下载安装包成功啦！");
								uni.showToast({
									title: "下载安装包成功啦！",
									icon: "success",
									duration: 500
								});
								uni.showToast({
									title: "开始安装apk",
									icon: "none",
									duration: 500
								});
								//开始安装apk
								plus.runtime.install(res.tempFilePath, {
									force: true
								}, (res) => {
									console.log("安装成功", res);
									uni.showToast({
										title: "安装apk成功",
										duration: 2000,
										icon: "success"
									});

								}, (err) => {
									console.log("安装失败！", err);
									uni.showToast({
										title: "警告！安装失败了！",
										icon: "error",
										duration: 2000
									});
								});
							} else {
								console.log("下载安装包失败！");
								uni.showToast({
									title: "下载安装包失败！",
									duration: 2000,
								});
							}
						},

					});
					//监听下载进度
					downloadTask.onProgressUpdate(res => {
						//返回百分比，比如1代表1%
						this.progress = res.progress;
					});
					//
				} else {
					console.log("apk安装包为空！");
					uni.showToast({
						title: "apk安装包为空！",
						icon: "error",
						duration: 2000
					});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: transparent;
	}

	.btn_hover {
		opacity: 0.1;
	}

	// 层级最底层
	.main {
		position: absolute;
		width: 100vw;
		height: 90vh;
		background-color: transparent;
		z-index: 1;

		// 渐变色弹窗背景--倒数第二层
		.upgrade_popup_box {
			position: absolute;
			top: 25%;
			right: 10%;
			width: 80vw;
			height: 55vh;
			box-shadow: 0 0 25px 12px rgba(146, 255, 235, 0.9);
			background: linear-gradient(30deg, #84ffe9, #ffff7f);
			border-radius: 10px;
			z-index: 2;

			// 第二层和渐变色背景同一层
			.header_background {
				position: absolute;
				z-index: -1;
				left: -5%;
				top: -30%;
				transform: rotate(3deg);
			}

			// 所有文字盒子+进度条盒子--倒数第三层
			.main_content_box {
				width: 80vw;
				height: 55vh;
				z-index: 3;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: center;

				// 发现新版本---倒数第四层
				.find_version_text {
					font-size: 30px;
					font-family: my_font_bold;
					// 颜色阴影
					color: #84ffe9;
					text-shadow: 2px 3px 6px #000000;
					//布局样式
					z-index: 4;
					text-align: center;
				}

				// 更新内容标题----倒数第四层
				.upadate_content_text {
					font-size: 20px;
					color: #55ffff;
					text-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
					z-index: 4;
					font-family: my_font_bold;
					text-align: center;
					margin: 10px 0;
				}

				// 更新内容--倒数第四层
				.content_text {
					//字体样式
					font-family: my_font_light;
					font-size: 15px;
					//文字盒子宽高
					width: 70vw;
					height: 19vh;
					//颜色阴影
					color: #00557f;
					box-shadow: 0 0 20px 9px rgba(0, 0, 0, 0.2);
					//文字布局
					text-align: left;
					line-height: 4vh;
					padding: 5px;
					border-radius: 10px;
					z-index: 4;
				}

				// 点击立即更新按
				button {
					//布局
					font-family: my_font_bold;
					border: none;
					width: 70vw;
					height: 7vh;
					line-height: 7vh;
					z-index: 4;
					margin: 20px 0;
					font-size: 15px;
					//颜色阴影
					background: linear-gradient(to right, #ffff7f, #00ffff);
					box-shadow: 0 0 20px 9px rgba(0, 0, 0, 0.2);
					color: #586eff;
					text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
				}

				// 进度条盒子
				.progress_box {
					height: 7vh;
					border-radius: 10px;
					background: linear-gradient(30deg, #ffaaff, #aaffff);
					box-shadow: 0 0px 20px lightslategray;
					width: 70vw;
					margin: 20px 0;
					z-index: 5;
					position: relative;

					// 显示进度条
					.progress {
						position: absolute;
						width: 100%;
						height: 100%;
						top: 0;
						background: linear-gradient(to right, #ffaaff, #ffff7f, #00ffff);
						border-radius: 10px 0px 0px 10px;
						box-shadow: 0 0px 10px 5px #55ffff, 0 0px 20px 10px #aaffff;
						z-index: 6;
					}

					//进度条文字样式
					.downLoadText {
						//颜色阴影字体
						font-family: my_font_bold;
						//布局
						position: absolute;
						z-index: 7;
						width: 70vw;
						line-height: 7vh;
						text-align: center;
						font-size: 15px;
						color: #8b00d0;
						text-shadow: 0 1px 4px #00ffff;
					}
				}
			}
		}
	}
</style>