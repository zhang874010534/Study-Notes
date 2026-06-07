<template>
    <div class="button-wrapper" @touchmove="touchmove" @touchstart="touchstart"
        @touchend="touchend" @click="clickButton"
        :style="style"
        ref="buttonWrapper"
    >
        <van-button >
            <img :src="imgUrl" alt=""
                class="icon"
            >
            <span class="button-text" >
                {{ text }}
            </span>
        </van-button>
    </div>

</template>
<script>
const img = require('@/assets/images/order-icon.png')
import { Button } from 'vant';
export default {
    components: {
        'van-button': Button
    },
    props: {
        text: {
            type: String,
            default: '预订记录'
        },
        imgUrl: {
            type: String,
            default: img
        }
    },
    data() {
        return {
            clientX: 0,
            clientY: 0,
            canMove: false,
            time: null,
            buttonWrapper: null,
            width: 0,
            height: 0
        }
    },
    
    computed: {
        style() {
            return `
                ${this.clientX ? 'right:auto;left:' + this.clientX : '' }${this.clientY ? ';bottom:auto;top:' + this.clientY : ''}
            `
        }
    },
    methods: {
        touchstart(e) {
            this.buttonWrapper = this.$refs.buttonWrapper
            const computedStyle = getComputedStyle(this.buttonWrapper)
            this.width = parseInt(computedStyle.width)
            this.height = parseInt(computedStyle.height)
            this.time = setTimeout(() => {
                this.canMove = true
                this.setPosition(e)
            }, 500);
        },
        touchmove(e) {
            if(this.canMove) {
                this.setPosition(e)
            }
        },
        touchend() {
            this.canMove = false
            clearTimeout(this.time)
        },
        setPosition(e) {
            this.clientX = e.touches[0].clientX - this.width / 2 + 'px'
            this.clientY = e.touches[0].clientY - this.height / 2 + 'px'
        },
        clickButton(e) {
            this.$emit('click', e)
        }
    }
}
</script>
<style lang="less" scoped>
.button-wrapper {
    position: fixed;
    right: 0;
    bottom: 278px;
    user-select: none;
}

.van-button  {
    padding: 14px;
    height: auto;
    box-shadow: 2px 4px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px 0px 0px 8px;
    ::v-deep .van-button__text {
        display: flex;
        flex-direction: column;
        align-items: center;
        .button-text {
            margin-top: 6px;
        }
    }
    .icon {
        width: 34px;
        object-fit: contain;
    }
}
</style>