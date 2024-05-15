<template>
	<formwork title="修改用户数据界面">
		<view class="mainBox">
			<scroll-view>
				<view class="mainBox">
					<view class="contentBox" v-for="(item,index) in arr" :key="index" @click="clickItem(index,item._id)" v-if="showContentBox">
						<view class="userId">用户id:{{item._id}}</view>
						<view class="username">用户名：{{item.name}}</view>
						<view class="password">用户密码：{{item.password}}</view>
						<view class="profile">用户头像：{{item.avatarPath}}</view>
						<view class="deviceId">用户设备id:{{item.deviceId}}</view>
						<view class="gender">用户性别：{{item.gender}}</view>
						<view class="age">用户年龄：{{item.age}}</view>
						<text class="registertime">用户注册时间:</text>
						<uni-dateformat :date="item.regesterTime"></uni-dateformat>
						<view class="loginCount">用户登录次数：{{item.loginCount}}</view>
						<text class="loginTime">用户最近登录时间:</text>
						<uni-dateformat :date="item.loginTime"></uni-dateformat>
					</view>
					<form v-if="showForm" @submit="submit">
						<view class="formBox">
							<uni-file-picker limit="1" :image-styles="imageStyle" class="fileUpload" @success="success" :del-icon="false" @fail="uploadFail"></uni-file-picker>
							<input placeholder="示例:媛媛" name="name" maxlength="4" placeholder-style="color:aqua;">
							<input placeholder="示例:12345" name="password" maxlength="15" placeholder-style="color:aqua;">
							<input name="ban" placeholder="填写封号/解封" placeholder-style="color:aqua;">
							<!-- 注册按钮 -->
							<button type="primary" class="register" form-type="submit" hover-class="hoverClass" v-if="showSubmitBtn">确认提交</button>
							<!-- 重置按钮 -->
							<button type="warn" class="resettings" form-type="reset" hover-class="hoverClass" v-if="showSubmitBtn">重置信息</button>
						</view>
					</form>
				</view>
			</scroll-view>
		</view>
	</formwork>
</template>

<script>
	export default {
		data() {
			return {
				id: null,
				ban: null,
				name: null,
				password: null,
				avatarPath: null,
				showSubmitBtn: true,
				arr: [],
				showContentBox: true,
				showForm: false,
				imageStyle: {
					"height": 160,
					"width": 160,
					"border": {
						"radius": "50%",
						"color": "#8000ff"
					}
				},
			};
		},
		onLoad() {
			uni.showToast({
				title: "因资金不足-云服务已关闭！待捐款",
				icon: "error"
			});
			// uniCloud.callFunction({
			// 	name: "getData",
			// 	success: (e) => {
			// 		console.log(this.arr = e.result.data);
			// 	},
			// 	fail: (err) => {
			// 		console.log("获取数据失败", err);
			// 	}
			// });
		},
		methods: {
			uploadFail(err) {
				console.log("头像上传失败", err);
			},
			success(e) {
				console.log("头像上传成功！");
				this.avatarPath = e.tempFilePaths[0];
				uni.showToast({
					title: "头像上传成功"
				});
			},
			clickItem(index, id) {
				console.log("点击当前项目", index, id);
				this.showContentBox = false;
				this.showForm = true;
				this.id = id;
			},
			submit(e) {
				console.log("用户点击了提交按钮");
				this.ban = e.detail.value.ban;
				this.name = e.detail.value.name;
				this.password = e.detail.value.password;
				uni.showToast({
					title: "正在上传头像",
					icon: 'loading',
					duration: 2000,
					success: () => {
						if (this.name && this.password && this.avatarPath && this.ban) {
							//隐藏提交按钮
							this.showSubmitBtn = false;
							uni.showToast({
								title: "验证通过，开始提交信息",
								icon: "success"
							});
							uniCloud.callFunction({
								name: "modifyData",
								data: {
									avatarPath: this.avatarPath,
									name: this.name,
									password: this.password,
									ban: this.ban,
									id: this.id
								},
								success: (e) => {
									console.log("修改数据成功", e);
									uni.showToast({
										title: "修改数据成功"
									});
									uni.reLaunch({
										url: "/pages/adminPage/adminPage"
									});
								},
								fail: (err) => {
									console.log("修改数据失败", err);
									uni.showToast({
										title: "修改数据失败",
										icon: "error"
									})
								}
							})
						} else {
							//显示提交按钮
							this.showSubmitBtn = true;
						}
					},
					fail: (err) => {
						console.log("云函数返回错误", err);
						this.showSubmitBtn = true;
						uni.showToast({
							title: "云函数返回错误",
							icon: "error"
						});
						uni.showToast({
							title: "因资金不足-云服务已关闭！待捐款",
							icon: "error"
						});
						// uniCloud.callFunction({
						// 	name: "deletePicture",
						// 	data: {
						// 		url: this.avatarPath
						// 	},
						// 	success: (res) => {
						// 		console.log("成功删除图片", res);
						// 		uni.showToast({
						// 			title: "成功删除图片"
						// 		})
						// 	},
						// 	fail: (err) => {
						// 		console.log("删除失败", err);
						// 	}
						// });

					}
				});


			}

		}
	}
</script>

<style lang="scss" scoped>
	.hoverClass {
		opacity: 0.1;
	}

	.mainBox {
		height: 87vh;

		.contentBox {
			border-bottom: 5px solid deepskyblue;
			border-top: 5px solid deepskyblue;
			color: #00ff00;
			border-radius: 10px;
			padding: 10px;

			.userId {
				color: yellow;
				font-family: my_font_light;
				font-size: 15px;
			}

			.username {
				color: #ffaa7f;
				font-family: my_font_light;
				font-size: 15px;
			}

			.password {
				color: aqua;
				font-family: my_font_light;
				font-size: 15px;
			}

			.profile {
				color: #ffffff;
				font-family: my_font_light;
				font-size: 15px;
			}

			.deviceId {
				color: #aaff00;
				font-family: my_font_light;
				font-size: 15px;
			}

			.gender {
				color: #00ff00;
				font-family: my_font_light;
				font-size: 15px;
			}

			.age {
				color: #ffaaff;
				font-family: my_font_light;
				font-size: 15px;
			}

			.registertime {
				color: #ffff7f;
				font-family: my_font_light;
				font-size: 15px;
			}

			.loginCount {
				color: #00ff00;
				font-family: my_font_light;
				font-size: 15px;
			}

			.loginTime {
				color: #b3ff00;
				font-family: my_font_light;
				font-size: 15px;
			}
		}

		.formBox {
			border: 1px solid #574dcc;
			height: 88vh;
			padding: 10px;

			// 文件上传组件
			.fileUpload {
				display: flex;
				flex-direction: row;
				justify-content: center;
			}

			input {
				margin-top: 20px;
				border-radius: 10px;
				box-shadow: 0 0 14px 6px rgba(0, 0, 0, 0.3);
				height: 8vh;
				color: aqua;
				font-family: my_font_bold;
				text-align: center;
			}

			button {
				background-image: linear-gradient(to left, #55ffff, #aa00ff);
				box-shadow: 0 0 14px 6px rgba(0, 0, 0, 0.4);
				border: none;
				font-family: my_font_bold;
				color: white;
				margin-top: 20px;
				color: #55ffff;
			}


		}
	}
</style>