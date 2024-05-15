<template>
	<formwork title="删除评论反馈界面">
		<view class="mainBox">
			<scroll-view scroll-y="true">
				<view v-for="(item,index) in arr" :key="index" class="box" @click="clickItem(index,item._id)">
					<view>用户id:{{item._id}}</view>
					<view>用户反馈标题：{{item.title}}</view>
					<view>用户反馈内容：{{item.content}}</view>
					<text>用户反馈时间</text>
					<uni-dateformat :date="item.submitTime"></uni-dateformat>
				</view>
			</scroll-view>
		</view>
	</formwork>
</template>

<script>
	export default {
		data() {
			return {
				arr: [],
				id: null
			};
		},
		onLoad() {
			uni.showToast({
				title: "因资金不足-云服务已关闭！待捐款",
				icon: "error"
			});
			// uniCloud.callFunction({
			// 	name: "getFeedBackData",
			// 	success: (e) => {
			// 		console.log("获取数据成功", this.arr = e.result.data);
			// 	},
			// 	fail: (err) => {
			// 		console.log("获取数据失败", err);
			// 	}
			// });
		},
		methods: {
			clickItem(index, id) {
				console.log(index, id);
				this.id = id;
				uni.showModal({
					title: "确认要删除该项目吗?",
					success: (e) => {
						if (e.confirm) {
							console.log("用户点击了确定按钮", e.confirm);
							uni.showToast({
								title: "因资金不足-云服务已关闭！待捐款",
								icon: "error"
							});
							// uniCloud.callFunction({
							// 	name: "deleteFeedBack",
							// 	data: {
							// 		id: this.id
							// 	},
							// 	success: (e) => {
							// 		console.log("云函数返回了", e);
							// 		uni.showToast({
							// 			title: "删除该评论成功！"
							// 		})
							// 	},
							// 	fail: (err) => {
							// 		console.log("删除该评论失败！", err);
							// 	}
							// });
						};
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainBox {
		height: 91vh;
		padding: 10px;

		.box {
			color: aqua;
			border-radius: 10px;
			border-bottom: 9px solid #981aff;
			font-family: my_font_light;
		}
	}
</style>