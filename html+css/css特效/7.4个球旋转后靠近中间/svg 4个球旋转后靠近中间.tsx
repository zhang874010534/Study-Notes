import { defineComponent, StyleValue, VNode, PropType } from 'vue'
// import { makeStringProps } from '../../utils/props'
import { BEM } from '@/packages/utils/bem'

type LoadingType = 'circular' | 'box' | 'ball-rotate'
export default defineComponent({
    name: 'WLoading',
    props: {
        type: {
            type: String as PropType<LoadingType>,
            default: 'circular',
        },
        // 图标大小
        size: {
            type: String,
            default: '32px',
        },
        // 颜色
        color: {
            type: String,
            default: '',
        },
        // 文字垂直排列
        vertical: {
            type: Boolean,
            default: false,
        },
        // 文字大小
        textSize: {
            type: String,
            default: '14px',
        },
        // 文字颜色
        textColor: {
            type: String,
            default: '#8D8E99',
        },
    },
    setup(props, ctx) {
        return () => {
            const { type, color, textColor, vertical, size } = props
            const loadingStyle: StyleValue = {}
            color && (loadingStyle.stroke = color)
            const textStyle: StyleValue = {
                fontSize: props.textSize,
            }
            textColor && (textStyle.color = textColor)
            if (type === 'box') {
                return (
                    <div class='w-loading'>
                        <span class='w-loading__spinner'>
                            <span class='w-loading__box'></span>
                            <span class='w-loading__shadow'></span>
                        </span>
                    </div>
                )
            }
            let svgContent: VNode
            if (type === 'circular') {
                svgContent = (
                    <svg viewBox='25 25 50 50' class='w-loading__circular'>
                        <circle cx='50' cy='50' r='20' fill='none' style={loadingStyle} />
                    </svg>
                )
            }
            if (type === 'ball-rotate') {
                svgContent = (
                    <svg
                        viewBox='0 0 328 328'
                        xmlns='http://www.w3.org/2000/svg'
                        class={BEM('screen-loading-content')}
                    >
                        <g>
                            <circle cx='164' cy='164' r='16' fill='#4285F4'>
                                <animate
                                    attributeName='cy'
                                    dur='1.95s'
                                    calcMode='spline'
                                    repeatCount='indefinite'
                                    values='164;16;164'
                                    keyTimes='0; 0.5; 1'
                                    keySplines='.42 0 .58 1; .42 0 .58 1;'
                                />
                            </circle>
                            <circle cx='164' cy='164' r='16' fill='#00BDD4'>
                                <animate
                                    attributeName='cx'
                                    dur='1.95s'
                                    calcMode='spline'
                                    repeatCount='indefinite'
                                    values='164;312;164'
                                    keyTimes='0; 0.5; 1'
                                    keySplines='.42 0 .58 1; .42 0 .58 1;'
                                />
                            </circle>
                            <circle cx='164' cy='164' r='16' fill='#FF6C00 '>
                                <animate
                                    attributeName='cy'
                                    dur='1.95s'
                                    calcMode='spline'
                                    repeatCount='indefinite'
                                    values='164;312;164'
                                    keyTimes='0; 0.5; 1'
                                    keySplines='.42 0 .58 1; .42 0 .58 1;'
                                />
                            </circle>
                            <circle cx='164' cy='164' r='16' fill='#FF9800'>
                                <animate
                                    attributeName='cx'
                                    dur='1.95s'
                                    calcMode='spline'
                                    repeatCount='indefinite'
                                    values='164;16;164'
                                    keyTimes='0; 0.5; 1'
                                    keySplines='.42 0 .58 1; .42 0 .58 1;'
                                />
                            </circle>
                        </g>
                    </svg>
                )
            }
            return (
                <div class={['w-loading', vertical ? 'w-loading--vertical' : 'w-loading--flex']}>
                    <span
                        class={[
                            'w-loading__spinner',
                            type === 'circular' && 'w-loading__spinner--circular',
                        ]}
                        style={{ width: size, height: size }}
                    >
                        {svgContent}
                    </span>
                    {ctx.slots.default && (
                        <span class='w-loading_text' style={textStyle}>
                            {ctx.slots.default()}
                        </span>
                    )}
                </div>
            )
        }
    },
})
