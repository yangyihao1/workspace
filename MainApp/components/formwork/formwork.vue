<template>
	<view class="formwork">
		<!-- 顶部导航栏 -->
		<view class="top_navigation">
			<view>{{title}}</view>
			<uni-icons :color="leftIconColor" class="left_icons" size="39" :type="leftIconType" v-if="convertedShowLeftIcon" @click="clickLeft" :leftSkipUrl="leftSkipUrl" v-show="leftOpacity"></uni-icons>
			<uni-icons :color="rightIconColor" class="right_icons" size="39" :type="rightIconType" v-if="convertedShowRIghttIcon" @click="clickRight" :rightSkipUrl="rightSkipUrl" v-show="rightOpacity"></uni-icons>
		</view>
		<!--  主要部分-->
		<view class="layout">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rightOpacity: true,
				leftOpacity: true
			}
		},
		name: "formwork",
		props: {
			title: {
				type: String,
				default: "顶部导航栏"
			},
			leftSkipUrl: {
				type: String,
				default: ""
			},
			rightSkipUrl: {
				type: String,
				default: ""
			},
			leftIconType: {
				type: String,
				default: "arrow-left"
			},
			rightIconType: {
				type: String,
				default: "arrow-right"
			},
			showLeftIcon: {
				type: [String, Boolean],
				default: false
			},
			showRightIcon: {
				type: [String, Boolean],
				default: false
			},
			rightIconColor: {
				type: String,
				default: "aqua"
			},
			leftIconColor: {
				type: String,
				default: "aqua"
			}
		},
		computed: {
			// 使用计算属性将字符串类型的字符串'false'转换为布尔值false
			convertedShowLeftIcon: {
				get() {
					//
					return typeof this.showLeftIcon === 'false' ? false : Boolean(this.showLeftIcon)
				}
			},
			convertedShowRIghttIcon: {
				get() {
					//
					return typeof this.showRightIcon === 'false' ? false : Boolean(this.showRightIcon);
				}
			},
			convertIsAlign: {
				get() {
					return typeof this.isAlign === "false" ? false : Boolean(this.isAlign)
				}
			}
		},
		emits: ['clickLeft', 'clickRight'],
		methods: {
			clickLeft() {
				this.leftOpacity = false;
				setTimeout(() => {
					this.leftOpacity = true;
				}, 200)
				this.$emit('clickLeft', "你点击了左侧图标");
				if (this.leftSkipUrl) {
					uni.reLaunch({
						url: this.leftSkipUrl
					});
				}
			},
			clickRight() {
				this.rightOpacity = false;
				setTimeout(() => {
					this.rightOpacity = true;
				}, 200)
				this.$emit("clickRight", "你点击了右侧图标");
				if (this.rightSkipUrl) {
					uni.reLaunch({
						url: this.rightSkipUrl
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.formwork {
		background: linear-gradient(to top, #55ffff, #8000ff 70%);

		// 顶部导航栏
		.top_navigation {
			//布局样式
			height: 9vh;
			line-height: 12vh;
			text-align: center;
			position: relative;
			//字体样式
			font-family: my_font_bold;
			font-size: 20px;
			//渐变色文字
			background: linear-gradient(30deg, #00FFFF 40%, #aaff00, #ffaaff 70%);
			-webkit-background-clip: text;
			color: transparent;
			//盒子阴影
			box-shadow: 0 15px 18px rgba(0, 0, 0, 0.6);

			.left_icons {
				position: absolute;
				top: 0;
				left: 0;
			}

			.right_icons {
				position: absolute;
				top: 0;
				right: 0;
			}
		}

		//主要部分
		.layout {
			height: 91vh;
			box-sizing: border-box;
		}
	}
</style>