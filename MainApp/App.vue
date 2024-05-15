<script>
	export default {
		onLaunch: function() {},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style lang="scss">
	// 公共样式
	.main {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
	}

	view {
		box-sizing: border-box;
	}

	:root {
		box-sizing: border-box;
	}

	@font-face {
		font-family: my_font_bold;
		src: url("static/font/NotoSerifSC-Black.otf");
	}

	@font-face {
		font-family: my_font_light;
		src: url("static/font/NotoSerifSC-Regular.otf");
	}
</style>