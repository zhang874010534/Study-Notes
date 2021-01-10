<template>
    <div
        class="login-box"
        :class="{'pc-login-box': platformInfo.platform =='pc'}"
        v-show="showLogin"
    >
        <!-- <div class="img-box">
            <img :src="IMG_CDN_URL + '/launch_top_label.png'" class="top" />
        </div>
        <div class="img-box">
            <img :src="IMG_CDN_URL + '/launch_center_label_1.png'" class="middle" />
        </div>
        <div class="img-box">
            <img :src="IMG_CDN_URL + '/launch_bottom_logo1.png'" class="bottom" />
        </div> -->
        <div class="img-box">
            <img src='@/assets/img/loading-lottie.png' class="bottom" />
        </div>
        <div id="lottie"></div>
    </div>
</template>

<script>
import lottie from 'lottie-web'
import lottieJson from '@/assets/json/loading-lottie.json'
import { wxLogin } from 'utils/util.js'
export default {
    name: 'Login',
    
    data() {
        return {
            
        }
    },

    mounted(){
        let animaition=lottie.loadAnimation({
            container: document.querySelector('#lottie'), // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: lottieJson // the path to the animation json
        });
        animaition.setSpeed(2.3)
    },

    computed: {
        showLogin() {
            return this.$store.state.showLogin
        },
        showLoginMethod() {
            return this.$store.state.showLoginMethod
        },
    },

    watch: {
        showLoginMethod: {
            handler(val) {
                if (this.platformInfo.browser === 'wx' && val) {
                    wxLogin()
                }
            },
            immediate: true
        }
    },

    methods: {
        
    },
}
</script>
    
<style scoped lang="stylus">
.login-box{
    align-content: space-between;
    background-color: #333333;
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
    left: 50%;
    justify-content: center;
    position: fixed;
    top: 0rem;
    transform: translateX(-50%);
    width: 7.5rem;
    z-index: 999;
    .img-box{
        width: 100%;
        height :100%;
        img{
            width :100%;
            height :100%;
        }
    }
    // .top{
    //     height: 2.4rem;
    //     margin-top: 1.2rem;
    //     vertical-align: top;
    //     width: 3.4rem;
    // }
    // .middle{
    //     height: 1.84rem;
    //     vertical-align: top;
    //     width: 5.6rem;
    // }
    // .bottom{
    //     height: 5.78rem;
    //     transform: translateX(16%);
    //     vertical-align: top;
    //     width: 4.34rem;
    // }
}
// .pc-login-box{
//     .top{
//         max-height: 135px;
//         max-width: 191px;
//         margin-top: 67.5px;
//     }
//     .middle{
//         max-height: 103.5px;
//         max-width: 315px;
//         margin-top: 67.5px;
//     }
//     .bottom{
//         max-height: 325px;
//         max-width: 244px;
//         margin-top: 67.5px;
//     }
// }
#lottie {
    width:20%;
    height:20%;
    transform: translate3d(0,0,0);
    text-align: center;
    opacity: 1;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 3;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

</style>
