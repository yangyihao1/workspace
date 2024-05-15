<template>
	<formwork title="发布动态界面" show-left-icon="true" left-skip-url="/pages/index/index">
		<form @submit="submit">
			<view class="main">
				<input placeholder="标题:被很多女生暗恋该怎么办？" name="title" placeholder-style="color:aqua;" />
				<view class="img_textarea_box">
					<textarea placeholder="具体内容:那年我英俊潇洒,双手插兜··" name="content" placeholder-style="color:aqua;"></textarea>
					<uni-file-picker :auto-upload="false" limit="1" :image-styles="imageStyle" class="fileUload" @success="success" @fail="uploadfail" :delIcon="false"></uni-file-picker>
				</view>
				<button form-type="submit" v-if="showReleaseBtn">确认提交</button>
				<button form-type="reset">清空内容</button>
			</view>
		</form>
	</formwork>
</template>

<script>
	export default {
		data() {
			return {
				title: null,
				content: null,
				picture: null,
				name: null,
				gender: null,
				avatarPath: null,
				showReleaseBtn: true,
				imageStyle: {
					"width": 150,
					"height": 150,
					"border": {
						"color": "rgba(0,0,0,0)",
						"radius": "10%"
					}
				}
			};
		},
		onLoad() {
			//获取用户头像提交到数据库
			uni.getStorage({
				key: "avatarPath",
				success: (res) => {
					console.log("获取到用户头像", this.avatarPath = res.data);
				},
				fail: (err) => {
					console.log("未获取到用户头像-请注册", err)
				}
			});
			//获取用户名到数据库
			uni.getStorage({
				key: "name",
				success: (res) => {
					console.log("获取到用户名", this.name = res.data);
				},
				fail: (err) => {
					console.log("未获取到用户名", err);
				}
			});
			//获取用户性别到数据库
			uni.getStorage({
				key: "gender",
				success: (res) => {
					console.log("获取到用户性别", this.gender = res.data);
				}
			});
		},
		methods: {
			uploadfail(err) {
				console.log("上传图片失败", err);
			},
			//图片上传成功
			success(res) {
				this.picture = res.tempFilePaths[0];
			},
			submit(res) {
				this.title = res.detail.value.title;
				this.content = res.detail.value.content;
				this.showReleaseBtn = false;
				uni.showToast({
					title: "正在上传图片-请稍等",
					icon: "loading",
					duration: 2000
				});
				setTimeout(() => {
					if (this.picture && this.title && this.content && this.name && this.avatarPath && this.gender) {
						console.log("图片上传完毕");
						uni.showToast({
							title: "因资金不足-云服务已关闭！待捐款",
							icon: "error"
						});
						// uniCloud.callFunction({
						// 	name: "submitComment",
						// 	data: {
						// 		title: this.title,
						// 		content: this.content,
						// 		picture: this.picture,
						// 		name: this.name,
						// 		gender: this.gender,
						// 		avatarPath: this.avatarPath
						// 	},
						// 	success: (res) => {
						// 		console.log("云函数成功返回了", res.result);
						// 		uni.showToast({
						// 			title: "提交成功！"
						// 		});
						// 		setTimeout(() => {
						// 			uni.reLaunch({
						// 				url: "/pages/commentSectioin/commentSectioin"
						// 			});
						// 		}, 1000)

						// 	},
						// 	fail: (err) => {
						// 		console.log("云函数返回了错误", err);
						// 		uni.showToast({
						// 			title: "图片上传失败",
						// 			icon: "error"
						// 		})
						// 	}
						// });
					};
				}, 2200)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		height: 84vh;
		padding: 15px;

		input {
			box-shadow: 0 0 14px 8px #aaffff;
			border-radius: 10px;
			color: yellow;
			text-align: center;
			height: 6vh;
			margin-top: 20px;
			font-family: my_font_bold;
		}

		input:hover {
			color: #55ffff;
			font-size: 20px;
		}

		.img_textarea_box {
			box-shadow: 0 0 14px 8px #aaffff;
			border-radius: 10px;
			height: 44vh;
			margin-top: 20px;

			textarea {
				color: yellow;
				font-family: fangsong;
				font-weight: bold;
				height: 24vh;
				width: 100%;
			}

			textarea:hover {
				color: aqua;
				font-size: 20px;
			}

			// 图片选择
			.fileUload {
				height: 20vh;
				display: flex;
				justify-content: center;
			}
		}

		button {
			background-image: linear-gradient(to left, #00aeff, #aa55ff);
			box-shadow: 0 0 20px 2px #5cebff;
			width: 90vw;
			margin-top: 20px;
			color: #ffffff;
			font-family: my_font_bold;
		}
	}
</style>