<template>
	<formwork title="管理员首页" isAlign="true">
		<view class="navigatorBox">
			<navigator hover-class="btn-hover" url="/pages/adminPage/deleteData/deleteData">删除数据库记录</navigator>
			<navigator hover-class="btn-hover" url="/pages/adminPage/deleteComment/deleteComment">删除文章</navigator>
			<navigator hover-class="btn-hover" url="/pages/adminPage/modifyData/modifyData">修改数据/封号处理</navigator>
			<navigator hover-class="btn-hover" url="/pages/index/index">进入主界面</navigator>
			<navigator hover-class="btn-hoveer" url="/pages/adminPage/modifyNotice/modifyNotice">修改公告</navigator>
		</view>
	</formwork>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onLoad() {

		}

	}
</script>

<style lang="scss" scoped>
	.navigatorBox {
		height: 87vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		navigator {
			//布局样式
			height: 8vh;
			width: 90vw;
			line-height: 8vh;
			margin-bottom: 14px;
			text-align: center;
			font-family: my_font_light;
			//颜色阴影
			color: white;
			border-radius: 10px;
			box-shadow: 0 2px 20px #000000;
		}
	}
</style>