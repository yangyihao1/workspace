<template>
	<formwork title="删除数据界面" show-left-icon="true" left-skip-url="/pages/adminPage/adminPage">
		<scroll-view>
			<view class="mainBox">
				<view class="contentBox" v-for="(item,index) in arr" :key="index" @click="clickItem(index,item._id,item.avatarPath)">
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
			</view>
		</scroll-view>
	</formwork>
</template>

<script>
	export default {
		data() {
			return {
				arr: []
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
			// 		console.log("获取到用户数据表", this.arr = e.result.data);
			// 	},
			// 	fail: (err) => {
			// 		console.log("云函数返回了错误", err);
			// 	}
			// });
		},
		methods: {
			clickItem(index, id, avatarPath) {
				console.log(index, id, avatarPath);
				uni.showModal({
					title: "确认删除吗？",
					success: (res) => {
						console.log(res);
						if (res.confirm === true) {
							console.log("用户点击了确定按钮");
							uni.showToast({
								title: "因资金不足-云服务已关闭！待捐款",
								icon: "error"
							});
							// uniCloud.callFunction({
							// 	name: "deleteData",
							// 	data: {
							// 		id
							// 	},
							// 	success: (res) => {
							// 		console.log(res);
							// 		uni.showToast({
							// 			title: "已成功删除该用户！",
							// 			duration: 500
							// 		});
							// 		uniCloud.deleteFile({
							// 			fileList: [avatarPath],
							// 			success: (res) => {
							// 				console.log(res);
							// 				uni.showToast({
							// 					title: "已成功删除头像！",
							// 					duration: 2000
							// 				});
							// 			},
							// 			fail: (err) => {
							// 				console.log("删除用户头像失败", err);
							// 				uni.showToast({
							// 					title: "删除用户头像失败！",
							// 					duration: 500,
							// 					icon: "error"
							// 				});
							// 			}

							// 		})
							// 	},
							// 	fail: (err) => {
							// 		console.log("删除用户信息失败", err);
							// 		uni.showToast({
							// 			title: "删除用户信息失败！",
							// 			icon: "error",
							// 			duration: 500
							// 		});
							// 	}
							// });
						}
					},
					fail: (err) => {
						console.log(err);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
				font-family: fangsong;
				font-size: 20px;
			}

			.username {
				color: #ffaa7f;
				font-family: fangsong;
				font-size: 20px;
			}

			.password {
				color: aqua;
				font-family: fangsong;
				font-size: 20px;
			}

			.profile {
				color: #ffffff;
				font-family: fangsong;
				font-size: 20px;
			}

			.deviceId {
				color: #aaff00;
				font-family: fangsong;
				font-size: 20px;
			}

			.gender {
				color: #00ff00;
				font-family: fangsong;
				font-size: 20px;
			}

			.age {
				color: #ffaaff;
				font-family: fangsong;
				font-size: 20px;
			}

			.registertime {
				color: #ffff7f;
				font-family: fangsong;
				font-size: 20px;
			}

			.loginCount {
				color: #00ff00;
				font-family: fangsong;
				font-size: 20px;
			}

			.loginTime {
				color: #ff5500;
				font-family: fangsong;
				font-size: 20px;
			}
		}
	}
</style>