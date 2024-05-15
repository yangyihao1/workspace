<template>
	<formwork title="删除图文界面" show-left-icon="true" left-skip-url="/pages/adminPage/adminPage">
		<scroll-view scroll-y="true">
			<view class="mainBox">
				<view class="box" v-for="(item,index) in arr" :key="index" @click="clickItem(item._id,index,item.picture)">
					<view class="box_1">
						<image :src="item.avatarPath" mode="aspectFill" class="profile"></image>
						<view class="author_timeBox">
							<view class="authorText">{{item.name}}</view>
							<uni-dateformat :date="item.commentTime" style="color: aqua;"></uni-dateformat>
						</view>
					</view>
					<view class="title_content_Box">
						<view class="titleText">{{item.title}}</view>
						<view class="contentText">{{item.content}}</view>
					</view>
					<view class="imageBox">
						<image :src="item.picture"></image>
					</view>
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
			// 	name: "getImageTextData",
			// 	success: (res) => {
			// 		console.log("获取到图文数组", this.arr = res.result.data);
			// 	},
			// 	fail: (err) => {
			// 		console.log("没有获取到数组图文", err);
			// 	}
			// });
		},
		methods: {
			clickItem(id, index, picture) {
				console.log(id, index, picture);
				uni.showModal({
					title: "确定要刷新该图文吗？",
					success: (res) => {
						if (res.confirm) {
							console.log("点击了确定按钮");
							uni.showToast({
								title: "因资金不足-云服务已关闭！待捐款",
								icon: "error"
							});
							// uniCloud.callFunction({
							// 	name: "deleteImageText",
							// 	data: {
							// 		id
							// 	},
							// 	success: (res) => {
							// 		console.log(res);
							// 		uni.showToast({
							// 			title: "删除图文成功！"
							// 		});
							// 		uniCloud.callFunction({
							// 			name: "deletePicture",
							// 			data: {
							// 				url: picture
							// 			},
							// 			success: (e) => {
							// 				console.log("删除成功", e);
							// 				uni.showToast({
							// 					title: "删除成功！"
							// 				})
							// 			},
							// 			fail: (err) => {
							// 				console.log("删除失败", err);
							// 			}
							// 		});
							// 		setTimeout(() => {
							// 			uni.navigateBack({
							// 				delta: 1
							// 			})
							// 		}, 1000);

							// 	},
							// 	fail: (err) => {
							// 		console.log("删除图文失败！", err);
							// 		uni.showToast({
							// 			title: "删除图文失败！",
							// 			icon: 'error'
							// 		});
							// 	}
							// });
							console.log("打印图片路径", picture);
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainBox {
		height: 87vh;
		font-family: my_font_light;

		.box {
			border: 3px solid #5555ff;
			border-radius: 10px;
			height: 60vh;

			.box_1 {
				height: 10vh;
				display: flex;
				align-items: center;

				.profile {
					height: 60px;
					width: 60px;
					border-radius: 50%;
				}

				.author_timeBox {
					height: 7vh;

					.authorText {
						color: aqua;
					}

					.dateText {
						color: aqua;
					}
				}

			}

			.title_content_Box {
				color: aqua;
			}

			.imageBox {
				height: 43vh;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10px;
				}
			}
		}
	}
</style>