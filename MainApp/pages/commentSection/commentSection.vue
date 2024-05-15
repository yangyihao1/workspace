<template>
	<formwork title="评论反馈区" show-left-icon="true" left-skip-url="/pages/index/index">
		<view class="mainBox">
			<view class="box" v-for="(item,index) in arr" :key="index">
				<view class="title">反馈：{{item.title}}</view>
				<view class="content">{{item.content}}</view>
				<uni-dateformat :date="item.submitTime" class="date"></uni-dateformat>
			</view>
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
			// 	name: "getFeedBackData",
			// 	success: (e) => {
			// 		console.log("获取成功", this.arr = e.result.data);
			// 	},
			// 	fail: (err) => {
			// 		console.log("获取失败", err);
			// 	}
			// });
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.mainBox {
		height: 87vh;
		color: aqua;
		padding: 0 20px;

		.box {
			box-shadow: 0 0 10px 2px #ffffff;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 20px;

			.title {
				color: yellow;
				font-family: my_font_light;
			}

			.content {
				color: #ffaa00;
				font-family: my_font_light;
			}

			.date {
				color: #ffffff;
				font-family: my_font_light;
			}


		}

	}
</style>