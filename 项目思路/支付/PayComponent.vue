<template>
    <div>
        <van-popup
            v-model="showMethods"
            position="bottom"
            class="pay-popup"
        >
            <div>请支付</div>
            <div class="pay-close-btn" @click="closePay"></div>
            <div class="flex-center">
                <span class="pay-prefix">￥</span>
                <span class="pay-price">{{payPrice}}</span>
            </div>
            <div v-if="creditAmount > 0" class="flex-row pay-text">
                <div>积分抵扣</div>
                <div>-￥{{creditAmount}}</div>
            </div>
            <div class="pay-methods-box">
                <div class="flex-row pay-text" style="margin-bottom: .4rem;">
                    <div>支付方式</div>
                </div>
                <div
                    class="pay-method flex-row"
                    v-for="(item, index) in payMethodList"
                    :key="index"
                    @click="chooseMethod(item)"
                >
                    <div class="row">
                        <img class="pay-method-icon" :src="item.icon"/>
                        <div>{{item.title}}</div>
                    </div>
                    <div class="row">
                        <div class="check" :class="payMethodType === item.type ? 'check-active' : ''">
                            <van-icon
                                v-if="payMethodType === item.type"
                                name="success"
                                style="display:flex;margin-left:0.02rem;margin-top:0.02rem;"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button
                @click="payClick"
                class="pay-btn"
                :class="`hd-btn-${hdTheme}`"
            >立即支付</button>
        </van-popup>
        <van-popup v-model="showPay" :close-on-click-overlay="!!false">
            <div class='popup flex-col'>
                <div class="popup-title">请确认您的支付状态</div>
                <div class="popup-success" @click="checkOrder">已完成支付</div>
                <div class="popup-fail" @click="onClose">遇到问题，重新支付</div>
            </div>
        </van-popup>
        <van-popup
            v-model="showAliTip"
            class="alipay-tip"
            :close-on-click-overlay="!!false"
        >
            <div class='popup flex-col'>
                <img
                    class="popup-notice"
                    :src="IMG_CDN_URL + '/popup_notice_1.png'"
                    alt="logo"
                />
                <div class="popup-title">请在浏览器中打开使用支付宝</div>
                <div class="popup-fail">微信中无法使用支付宝付款</div>
                <div class="popup-success" @click="copyUrl">复制链接</div>
                <van-icon
                    @click.stop="closeTip"
                    name="cross"
                    class="tip-close"
                />
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Chaos } from '@/assets/bridge/ChaosJsBridge.js'
export default {
    name: 'PayComponent',

    props: {
        payFilter: Function,
        useCredit: {
            type: Boolean,
            default: false,
        }
    },

    data() {
        return {
            alipayUrl: '',
            showAliTip: false,
            showPay: false,
            firstShowPay: false,
            showMethods: false,
            hasPay: 0,
            query: {},
            payPrice: '',
            creditAmount: '',
            payMethodType: '',
        }
    },

    computed: {
        isMyApp() {
            return this.$store.state.platformInfo.browser === 'chaos'
        },
        isWx() {
            return this.$store.state.platformInfo.browser === 'wx'
        },
        isWxapp() {
            return window.__wxjs_environment === 'miniprogram'
        },
        payMethodList() {
            const list = [
                {
                    title: '积分支付',
                    icon: this.BASE_URL + 'img/order_creditpay.png',
                    order: 1,
                    type: 'creditpay',
                    payType: 2,
                },
                {
                    title: '微信支付',
                    icon: this.BASE_URL + 'img/order_wxpay.png',
                    type: 'wxpay',
                    order: 2,
                    payType: 2,
                },
                {
                    title: '支付宝支付',
                    icon: this.BASE_URL + 'img/order_alipay.png',
                    type: 'alipay',
                    order: 1,
                    payType: 1,
                },
            ]

            const tmp = list.filter(ele => {
                if (this.payFilter) {
                    return this.payFilter(ele)
                } else {
                    if (this.isWx || this.isWxapp) {
                        return ele.type === 'wxpay'
                    }
                    if (this.platformInfo.browser === 'weibo') {
                        return ele.type === 'alipay'
                    }
                    return this.useCredit && ~~this.payPrice === 0 ? ele.type === 'creditpay' : ele.type !== 'creditpay'
                }
            })

            tmp.sort((a, b) => b.order - a.order)
            
            return tmp
        },
    },

    watch: {
        payMethodList: {
            handler(val) {
                if (Array.isArray(val) && val.length > 0) {
                    this.payMethodType = val[0].type
                }
            },
            immediate: true,
        },
    },

    created() {
        this.query = { ...this.$route.query }
        if (~~this.$route.query.has_pay === 1) {//支付回调
            this.firstShowPay = true
            this.checkOrder()
        }
    },

    mounted() {
        window.ChaosJSBridge.register(Chaos.payResult, (res) => {
            if (~~res.status === 1) {
                this.orderSuccess()
            }
        })
    },

    methods: {
        closePay() {
            this.$emit('close-pay')
            this.showMethods = false
        },
        showPayMethods(price) {
            let payPrice = Number.parseFloat(price)
            let creditPrice = 0
            if (this.useCredit) {
                const creditAmount = Math.floor(this.userInfo.credit / 10)
                if (creditAmount > 0 && creditAmount <= payPrice) {
                    creditPrice = creditAmount
                    payPrice = payPrice - creditAmount
                } else if (creditAmount > payPrice) {
                    creditPrice = Math.floor(payPrice)
                    payPrice = payPrice - creditPrice
                }
            }
            this.showMethods = true
            this.payPrice = Number.parseFloat(Number.parseFloat(payPrice).toFixed(2))
            this.creditAmount = Number.parseFloat(creditPrice).toFixed(2)
        },
        copyUrl() {
            this.copyText(this.alipayUrl);
            this.showAliTip = false
            this.showPay = true
        },
        checkOrder() {
            this.apiRequest({
                url: 'queryOrderStatus',
                params: {
                    order_sn: this.query.special_sn || this.query.order_sn || '',
                    order_type: this.query.special_type || 1
                },
                success: res => {
                    if (res.state === 1 && res.result.has_pay === true) {
                        this.orderSuccess()
                    } else if (!this.firstShowPay) {//进页面第一次自动查询成功直接跳转，失败显示弹窗
                        this.$notify('支付中，请稍后再试')
                    }
                },
                fail: res =>  {
                    this.$notify(res.result.errmsg)
                },
                complete: () => {
                    if (this.firstShowPay) {
                        this.showPay = true
                    } else {
                        this.onClose()
                    }
                    this.firstShowPay = false
                }
            });
        },
        onClose() {
            this.showPay = false
        },
        realPay(url, params, type) {
            const payMethodItem = this.payMethodList.find(ele => ele.type === type)

            if (!payMethodItem) {
                this.$notify('支付方式出现问题，请联系客服')
                return
            }
            
            params.pay_type = payMethodItem.payType
            
            params.pay_channel = params.pay_channel ? params.pay_channel : 'h5'
            if (~~params.pay_type === 2 && this.isWx) {
                params.pay_channel = 'official_account'
            }
            if (this.isMyApp) {
                params.pay_channel = 'app'
            }
            params.pay_redirect = window.location.href
            
            this.apiRequest({
                url: url,
                params: params,
                success: res => {
                    if (res.state === 1) {
                        if (res.result.free_and_complete) {
                            this.orderSuccess()
                            return
                        }
                        if (this.isMyApp) {
                            res.result.pay_type = params.pay_type
                            window.ChaosJSBridge.call(Chaos.payAction, res.result, () => {})
                            return
                        }
                        if (this.isWx) {
                            if (payMethodItem.type === 'wxpay') {
                                this.wxPay(res)
                            }
                            if (payMethodItem.type === 'alipay') {
                                this.alipayUrl = res.result.url
                                this.showAliTip = true
                            }
                            return
                        }

                        this.showPay = true
                        if (res.result.url) {
                            window.location.href = res.result.url
                        }
                    }
                },
                fail: res => {
                    if (res.result.has_pay === true) {
                        this.$notify({
                            message: '订单已支付，稍后将跳转',
                            background: '#1989fa'
                        })
                        setTimeout(() => {
                            this.orderSuccess()
                        }, 1000)
                    } else {
                        this.$notify(res.result.errmsg)
                    }
                }
            });
        },
        orderSuccess() {
            if (this.query.has_pay) {
                this.hasPay = 0
                delete this.query.has_pay
                this.$router.replace({query: this.query})
            }
            //使用积分需要更新user信息
            this.apiRequest({
                url: 'getProfile',
                params: {},
                success: res => {
                    if (res.state === 1) {
                        this.$store.commit('updateUserInfo', res.result.data)
                    }
                },
            }, true)
            this.showMethods = false
            this.$emit('order-success')
        },
        wxPay(payRes) {
            const that = this
            function onBridgeReady() {
                window.WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId": payRes.result.appId,     //公众号名称，由商户传入     
                        "timeStamp": payRes.result.timeStamp,         //时间戳，自1970年以来的秒数     
                        "nonceStr": payRes.result.nonceStr, //随机串     
                        "package": payRes.result.package,     
                        "signType": "MD5",         //微信签名方式：     
                        "paySign": payRes.result.paySign //微信签名 
                    },
                    function(res) {
                        if (res.err_msg === "get_brand_wcpay_request:ok" ) {
                            that.orderSuccess()
                        }
                    }
                );
            }
            if (typeof window.WeixinJSBridge === undefined) {
                if ( document.addEventListener ) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            } else {
                onBridgeReady();
            }
        },
        chooseMethod(item) {
            this.payMethodType = item.type
        },
        payClick() {
            this.$emit('pay-click', this.payMethodType)
        },
    }
}
</script>
    
<style scoped lang="stylus">
.van-popup{
    border-radius: .16rem;
}
.pay-popup{
    border-radius: 0rem;
    color: #666666;
    font-size: .28rem;
    padding: .6rem .48rem;
    text-align: center;
    .pay-close-btn{
        background-color: rgba(158, 113, 0, .1);
        border-radius: 50%;
        height: .56rem;
        left: .5rem;
        position: absolute;
        top: .5rem;
        width: .56rem;
        &:before, &:after{
            background-color: rgba(180, 112, 0, 1)
            border-radius: 1rem;
            content: "";
            display: inline-block;
            height: .06rem;
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            width: .28rem;    
        }
        &:before{
            background-color: rgba(180, 112, 0, .7)
            transform: translate(-50%, -50%) rotate(45deg);
        }
        &:after{
            transform: translate(-50%, -50%) rotate(-45deg);
        }
    }
    .pay-prefix{
        font-size: .32rem;
        transform: translateY(0.2rem);
    }
    .pay-price{
        font-size: .8rem;
        margin: .8rem 0 .5rem;
    }
    .pay-btn{
        margin: .6rem auto 0;
        width: 4rem;
    }
    .pay-methods-box{
        border-top: 1px solid #EEEEEE;
        padding-top: .3rem;
        .pay-method + .pay-method{
            margin-top: .3rem;
        }
        .pay-method{
            color: #111111;
            font-size: .32rem;
            width: 100%;
            .pay-method-icon{
                height: .48rem;
                margin-right: .2rem;
                width: .48rem;
                vertical-align: top;
            }
            .row{
                align-items: center;
            }
            .check{
                border-radius: 50%;
                border: 1px solid rgba(216, 216, 216, 1);
                height: .36rem;
                width: .36rem;
            }
            .check-active{
                background: #41B035;
                border: 1px solid #41B035;
                color: white;
            }
        }
    }
}
.popup{
    font-size: .32rem;
    text-align: center;
    padding: .6rem .5rem .5rem;
    position: relative;
    .popup-notice{
        height: 3.36rem;
        margin-bottom: 0.4rem;
        width: 3.36rem;
    }
    .popup-title{
        color: #000000;
        text-align: center;
        width: 100%
    }
    .popup-success{
        background: var(--borderColor);
        border-radius: .41rem;
        color: var(--color);
        height: .8rem;
        line-height: .8rem;
        margin-top: .4rem;
        text-align: center;
        width: 4.76rem;
    }
    .popup-fail{
        font-size: .28rem;
        color: #666666;
        margin-top: .4rem;
        text-align: center;
        width: 100%;
    }
    .tip-close{
        color: #BFC4CF;
        position: absolute;
        right: .4rem;
        top: .4rem;
    }
}
.pay-text{
    color: #666666;
    font-size: .32rem;
    font-weight: bold;
    margin-bottom: .3rem;
}
</style>
