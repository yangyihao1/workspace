<template>
	<formwork title="修改通知栏内容界面" show-left-icon="true" left-skip-url="/pages/index/index">
		<view class="mainBox">
			<view class="noticeBox" v-if="showNoticeBox" @click="clickItem(noticeObj._id)">
				<view class="id">通知id:{{noticeObj._id}}</view>
				<view class="title">通知标题：{{noticeObj.title}}</view>
				<view class="content">通知内容：{{noticeObj.content}}</view>
				<view class="time">通知时间：{{noticeObj.time}}</view>
			</view>
			<form @submit="submit" v-if="showFormbox">
				<view class="formBox">
					<input placeholder="通知标题:v1.2.3版本即将发布" name="title" placeholder-style="color:aqua;">
					<input placeholder="通知内容:感谢各位大哥大姐的援助" name="content" placeholder-style="color:aqua;">
					<input placeholder="通知时间: 2023年23日" name="time" placeholder-style="color:aqua;">
					<button form-type="submit" hover-class="hoverClass">确认提交</button>
					<button form-type="reset" hover-class="hoverClass">重置信息</button>
				</view>
			</form>
		</view>
	</formwork>
</template>

<script>
	export default {
		data() {
			return {
				id: null,
				noticeObj: {},
				showNoticeBox: true,
				showFormbox: false
			};
		},
		onLoad() {
			uni.showToast({
				title: "因资金不足-云服务已关闭！待捐款",
				icon: "error"
			});
			// uniCloud.callFunction({
			// 	name: "getNoticeData",
			// 	success: (e) => {
			// 		console.log("获取通知数组成功", this.noticeObj = e.result.data[0]);
			// 	},
			// 	fail: (err) => {
			// 		console.log("获取通知数组失败", err);
			// 	}
			// });
		},
		methods: {
			clickItem(id) {
				console.log(id);
				this.showFormbox = true;
				this.showNoticeBox = false;
				this.id = id;
			},
			submit(e) {
				console.log(e.detail.value);
				if (e.detail.value.title && e.detail.value.content && e.detail.value.time) {
					uni.showToast({
						title: "正在上传中",
						icon: "loading"
					});
					uni.showToast({
						title: "因资金不足-云服务已关闭！待捐款",
						icon: "error"
					});
					// uniCloud.callFunction({
					// 	name: "modifyNotice",
					// 	data: {
					// 		id: this.id,
					// 		title: e.detail.value.title,
					// 		content: e.detail.value.content,
					// 		time: e.detail.value.time
					// 	},
					// 	success: (e) => {
					// 		console.log(e);
					// 		uni.showToast({
					// 			title: "修改成功！"
					// 		});
					// 		this.showFormbox = false;
					// 		setTimeout(() => {
					// 			uni.reLaunch({
					// 				url: "/pages/index/index"
					// 			})
					// 		}, 1000)
					// 	},
					// 	fail: (err) => {
					// 		console.log("修改失败", err);
					// 		uni.showToast({
					// 			title: "修改失败",
					// 			icon: "error"
					// 		})
					// 	}
					// });
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hoverClass {
		opacity: 0.1;
	}

	.mainBox {
		height: 91vh;
		padding: 20px;


		.noticeBox {
			color: aqua;
			font-family: my_font_light;

			.id {
				color: #ffaa00;
				border-bottom: 1px solid #55aaff;
				margin: 20px 0;
			}

			.content {
				color: #ffff7f;
				border-bottom: 1px solid #55aaff;
				margin: 20px 0;
			}

			.title {
				color: #00ff00;
				border-bottom: 1px solid #55aaff;
			}

			.time {
				color: #00ff00;
				border-bottom: 1px solid #55aaff;
			}
		}

		.formBox {
			position: relative;
			top: 10%;
			height: 65vh;
			box-shadow: 0 0 20px 10px #aaffff;
			border-radius: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding: 10px;

			input {
				height: 7vh;
				box-shadow: 0 0 16px 7px #55aaff;
				border-radius: 10px;
				text-align: center;
				font-family: my_font_light;
				color: #00ff00;
			}

			input:hover {
				font-weight: bold;
				font-size: 20px;
				color: #ffaa00;
			}

			button {
				width: 100%;
				background: linear-gradient(to left, #03d1ff, #8306ff);
				box-shadow: 0 0 16px 7px #55aaff;
				color: #ffffff;
				font-family: my_font_light;
			}
		}
	}
</style>