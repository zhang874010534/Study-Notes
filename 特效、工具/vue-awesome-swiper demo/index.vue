<template>
  <div class="container index">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
        <router-link to=""><img :src="item.src" alt=""/></router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
export default {
  name: 'index',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptions: {
        // 自动播放
        autoplay: true,
        // 衔接
        loop: true,
        // 分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // 前后箭头
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
        // Some Swiper option/callback...
      },
      swiperList: [
        {
          src: '/imgs/slider/slide-1.jpg'
        },
        {
          src: '/imgs/slider/slide-2.jpg'
        },
        {
          src: '/imgs/slider/slide-3.jpg'
        },
        {
          src: '/imgs/slider/slide-4.jpg'
        },
        {
          src: '/imgs/slider/slide-5.jpg'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.index {
  .swiper-container {
    --swiper-theme-color: #ff6600; /* 设置Swiper风格 */
    --swiper-navigation-color: gray; /* 单独设置按钮颜色 */
    --swiper-navigation-size: 30px; /* 设置按钮大小 */
    height: 451px;
    a {
      display: inline-block;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
