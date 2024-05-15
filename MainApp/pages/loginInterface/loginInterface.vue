<template>
	<formwork title="用户登录界面" show-left-icon="true" left-skip-url="/pages/registerInterface/registerInterface" show-right-icon="true" right-skip-url="/pages/index/index">
		<view class="mainBox">
			<form @submit="submit">
				<!-- 显示用户头像 -->
				<view class="avatarPathBox">
					<image :src="avatarPath" mode="aspectFill"></image>
				</view>
				<!-- 输入用户名 -->
				<input placeholder="示例:媛媛" placeholder-style="color:aqua;" name="name" maxlength="4">
				<!-- 输入密码 -->
				<input placeholder="示例:12345" name="password" maxlength="15" placeholder-style="color:aqua;">
				<!-- 按钮 -->
				<button form-type="submit" v-if="showLoginBtn">确认登录</button>
				<button form-type="reset" v-if="showLoginBtn">重置信息</button>
			</form>
		</view>

	</formwork>
</template>

<script>
	export default {
		data() {
			return {
				avatarPath: null,
				gender: null,
				name: null,
				password: null,
				showLoginBtn: true
			};
		},
		onLoad() {
			uni.getSystemInfo({
				success: (e) => {
					console.log("获取到用户设备id", e.deviceId);
					uni.setStorage({
						key: "deviceId",
						data: e.deviceId,
						success: (res) => {
							console.log("成功存储用户设备id", res);
						},
						fail: (err) => {
							console.log("存储用户设备id失败", err);
						}
					})
				},
				fail: (err) => {
					console.log("获取用户设备id失败", err);
				}
			});
			// 获取登录字段login，判断是否登录过
			uni.getStorage({
				key: "login",
				success: (res) => {
					console.log("用户无需再登录", res.data);
					// uni.reLaunch({
					// 	url: "/pages/index/index"
					// });
				},
				fail: (err) => {
					console.log("用户未登录过", err);
				}
			})
			//获取用户头像
			uni.getStorage({
				key: "avatarPath",
				success: (res) => {
					console.log("拿到了头像", this.avatarPath = res.data);
				},
				fail: (err) => {
					console.log("没有拿到用户头像", err);
				}
			});
			//获取用户名
			uni.getStorage({
				key: "name",
				success: (res) => {
					console.log("获取用户名", this.name = res.data);
				},
				fail: (err) => {
					console.log("获取用户名失败", err);
				}
			});
			//获取用户密码
			uni.getStorage({
				key: "password",
				success: (res) => {
					console.log("成功获取到密码", this.password = res.data);
				},
				fail: (err) => {
					console.log("获取密码失败", err);
				}
			});
		},
		methods: {
			submit(res) {
				if (res.detail.value.name && res.detail.value.password) {
					console.log("输入有效");
					this.showLoginBtn = false;
					if (this.name === res.detail.value.name && this.password === res.detail.value.password) {
						uni.showToast({
							title: "因资金不足-云服务已关闭！待捐款",
							icon: "error"
						});
						// uniCloud.callFunction({
						// 	name: "updateLoginCount",
						// 	data: {
						// 		name: this.name,
						// 		password: this.password
						// 	},
						// 	success: (res) => {
						// 		console.log("登录次数+1", res);
						// 		uni.showToast({
						// 			title: "密码正确！登录成功",
						// 			icon: "success"
						// 		});
						// 		setTimeout(() => {
						// 			uni.reLaunch({
						// 				url: "/pages/index/index"
						// 			});
						// 		}, 1000);
						// 	},
						// 	fail: (err) => {
						// 		console.log("登录次数更新失败", err);
						// 	}
						// });

					} else if (res.detail.value.name === "管理员" && res.detail.value.password === "yangyihao") {
						uni.setStorage({
							key: "login",
							data: "yangyihaoAdmin"
						});
						uni.showToast({
							title: "欢迎管理员回来！",
							duration: 2000
						});

						setTimeout(() => {
							uni.reLaunch({
								url: "/pages/adminPage/adminPage"
							});
						}, 2000);
					} else {
						this.showLoginBtn = true;
						uni.showToast({
							title: "密码错误！",
							icon: "error"
						});
					}
				} else {
					console.log("输入无效");
					uni.showToast({
						title: '输入无效'
					});
					this.showLoginBtn = true;
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	.mainBox {
		height: 84vh;
		width: 100vw;
		padding: 10px;

		// 用户头像
		.avatarPathBox {
			width: 100vw;
			height: 130px;
			text-align: center;
			margin-bottom: 20px;

			image {
				height: 130px;
				width: 130px;
				border-radius: 50%;
			}
		}

		input {
			margin-bottom: 20px;
			height: 7vh;
			border-radius: 10px;
			box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.3);
			text-align: center;
			color: #00ffff;
			font-family: my_font_bold;
			font-size: 14px;
		}

		input:hover {
			font-size: 20px;
			box-shadow: 0 2px 24px 10px rgba(0, 0, 0, 0.4);
			color: yellow;
		}

		button {
			margin-top: 25px;
			font-family: my_font_bold;
			box-shadow: 4px 5px 5px #55ffff;
			background: linear-gradient(to left, #00ffff, #ffff7f);
			color: #005500;
		}
	}
</style>