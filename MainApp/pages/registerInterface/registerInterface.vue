<template>
	<formwork title="用户注册界面" show-right-icon="true" right-skip-url="/pages/loginInterface/loginInterface">
		<form @submit="submit">
			<view class="mainBox">
				<uni-file-picker limit="1" :image-styles="imageStyle" class="fileUpload" @success="success" :del-icon="false" :autoUpload="false"></uni-file-picker>
				<radio-group class="radio-group" @change="selectRadio">
					<!-- 男生 -->
					<radio icon-color="#ffffff" active-background-color="#0055ff" value="男生">
						<label style="color: aqua;">男生</label>
						<image src="../../static/img/man.png" style="height: 23px;width:23px;"></image>
					</radio>
					<!-- 女生 -->
					<radio icon-color="#000000" active-background-color="#ffaaff" value="女生">
						<label style="color:#ff00ff;">女生</label>
						<image src="../../static/img/schoolgirl.png" style="height: 23px;width: 23px;"></image>
					</radio>
				</radio-group>
				<!-- 选择年龄 -->
				<picker mode="selector" :range="range" class="picker" @change="chooseEvent">
					<view>年龄{{age}}</view>
				</picker>
				<!-- 用户名输入框 -->
				<input placeholder="示例:媛媛" name="name" maxlength="4" placeholder-style="color:aqua;">
				<!-- 密码输入框 -->
				<input placeholder="示例:12345" name="password" maxlength="15" placeholder-style="color:aqua;">
				<!-- 注册按钮 -->
				<button form-type="submit" hover-class="hoverClass" v-if="showRegister">确认注册</button>
				<!-- 重置按钮 -->
				<button form-type="reset" hover-class="hoverClass" v-if="showRegister">重置信息</button>
			</view>
		</form>
	</formwork>
</template>

<script>
	export default {
		data() {
			return {
				imageStyle: {
					"height": 160,
					"width": 160,
					"border": {
						"radius": "50%",
						"color": "rgba(0,0,0,0)"
					}
				},
				range: [],
				age: null,
				showRegister: true,
				phoneBrand: null,
				deviceId: null,
				gender: null,
				name: null,
				password: null,
				avatarPath: null
			};
		},
		onLoad() {
			let res = uni.getSystemInfoSync();
			this.phoneBrand = res.system;
			this.deviceId = res.deviceId;
			for (let i = 10; i < 45; i++) {
				this.range.push(i);
			};
		},
		methods: {
			submit(res) {
				console.log("用户点击了提交按钮");
				this.name = res.detail.value.name;
				this.password = res.detail.value.password;
				if (this.gender && this.age && this.name && this.password && this.avatarPath) {
					this.showRegister = false;
					uni.showToast({
						title: "因资金不足-云服务已关闭！待捐款",
						icon: "error"
					});
					// uniCloud.callFunction({
					// 	name: "submitData",
					// 	data: {
					// 		avatarPath: this.avatarPath,
					// 		gender: this.gender,
					// 		age: this.age,
					// 		name: this.name,
					// 		password: this.password,
					// 		deviceId: this.deviceId
					// 	},
					// 	success: (res) => {
					// 		console.log("云函数成功返回了：", res);
					// 		uni.showToast({
					// 			title: "提交成功！",
					// 			icon: "success"
					// 		});
					// 		uni.setStorage({
					// 			key: "avatarPath",
					// 			data: this.avatarPath
					// 		});
					// 		uni.setStorage({
					// 			key: "name",
					// 			data: this.name
					// 		});
					// 		uni.setStorage({
					// 			key: "password",
					// 			data: this.password
					// 		})
					// 		uni.setStorage({
					// 			key: "gender",
					// 			data: this.gender
					// 		});
					// 		setTimeout(() => {
					// 			uni.reLaunch({
					// 				url: "/pages/loginInterface/loginInterface"
					// 			})
					// 		}, 2000)
					// 	},
					// 	fail: (err) => {
					// 		console.log("云函数返回了错误", err);
					// 		this.showRegister = true;
					// 	}
					// });
				} else {
					uni.showToast({
						title: "信息填写不规范！",
						icon: "error"
					});
					this.showRegister = true;
					if (this.avatarPath) {
						uni.showToast({
							title: "因资金不足-云服务已关闭！待捐款",
							icon: "error"
						});
						// uniCloud.callFunction({
						// 	name: "deletePicture",
						// 	data: {
						// 		url: this.avatarPath
						// 	},
						// 	success: () => {
						// 		console.log("成功删除头像：");
						// 		setTimeout(() => {
						// 			uni.navigateBack({
						// 				delta: 1
						// 			})
						// 		}, 100);
						// 	},
						// 	fail: (err) => {
						// 		console.log("云函数错误", err);
						// 	}
						// });
					}
				}
			},
			chooseEvent(res) {
				console.log("当前选中了", this.age = this.range[res.detail.value]);
			},
			selectRadio(res) {
				console.log(this.gender = res.detail.value);
			},
			//头像上传成功，开始调用云函数提交信息
			success(res) {
				this.avatarPath = res.tempFilePaths[0];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hoverClass {
		opacity: 0.1;
	}

	.mainBox {
		height: 84vh;
		width: 100vw;
		padding: 10px;

		// 文件上传组件
		.fileUpload {
			display: flex;
			flex-direction: row;
			justify-content: center;
		}

		//选项按钮两个
		.radio-group {
			text-align: center;

			label {
				font-family: KaiTi;
			}
		}

		// 选择年龄
		picker {
			margin-top: 20px;
			box-shadow: 0 2px 15px rgba(0, 0, 0, 0.7);
			border-radius: 10px;
			height: 5vh;
			line-height: 5vh;

			view {
				color: #55ffff;
				font-family: KaiTi;
				text-align: center;
				font-size: 20px;
			}
		}

		input {
			margin-top: 20px;
			border-radius: 10px;
			box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);
			height: 8vh;
			color: aqua;
			font-family: my_font_bold;
			text-align: center;
		}

		input:hover {
			font-size: 24px;
			box-shadow: 0 0px 25px 14px rgba(0, 0, 0, 0.6);
			color: yellow;
		}

		button {
			background-image: linear-gradient(to left, #aa00ff, #0055ff);
			box-shadow: 0 0 20px 9px rgba(0, 0, 0, 0.5);
			border: none;
			font-family: my_font_bold;
			color: white;
			margin-top: 20px;
		}


	}
</style>