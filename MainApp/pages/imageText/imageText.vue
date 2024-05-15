<template>
	<formwork title="用户图文区" show-left-icon="true" left-skip-url="/pages/index/index">
		<view class="main">
			<scroll-view scroll-y="true" class="scrollView">
				<view v-for="(item,index) in arr" :key="index" class="totalBox">
					<view class="img_name_time_box">
						<image :src="item.avatarPath" class="profile" mode="aspectFill"></image>
						<view class="author_timeBox">
							<view class="nameText">{{item.name}}</view>
							<uni-dateformat :date="item.commentTime"></uni-dateformat>
						</view>
					</view>
					<view class="title_content_Box">
						<view class="titleText">{{item.title}}</view>
						<view class="contentText">{{item.content}}</view>
					</view>
					<image :src="item.picture" class="picture"></image>
				</view>
			</scroll-view>
		</view>
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
			// 		console.log("云函数成功返回了", this.arr = res.result.data);
			// 	},
			// 	fail: (err) => {
			// 		console.log("云函数错误", err);
			// 	}
			// });
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.hoverClass {
		opacity: 0.1;
	}

	.main {
		height: 91vh;
		padding-top: 20px;

		.scrollView {
			height: 91vh;
			color: aqua;

			.totalBox {
				border-radius: 10px;
				box-sizing: border-box;
				border: 3px solid rgba(255, 255, 255, 0.3);
				border-bottom: none;
				box-shadow: 0 8px 14px #aa55ff;

				.img_name_time_box {
					width: 100vw;
					height: 10vh;
					display: flex;
					align-items: center;

					.profile {
						height: 50px;
						width: 50px;
						border-radius: 50%;
					}

					.author_timeBox {
						font-family: my_font_bold;

						.nameText {
							color: #ffffff;
						}

						.dateText {
							color: white;
						}
					}
				}

				.title_content_Box {
					text-align: left;
					height: 10vh;
					font-family: my_font_light;
					display: flex;
					flex-direction: column;
					justify-content: center;

					.titleText {
						color: yellow;
					}

					.contentText {
						color: #aaff00;
					}
				}

				.picture {
					width: 100%;
					border-radius: 10px;
				}
			}





		}
	}
</style>