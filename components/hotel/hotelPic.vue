<template>
  <swiper :options="swiperOptions">
    <div class="swiper-slide" v-for="(item, key) in img" :key="key">
      <img :data-src="item.url" :data-srcset="item.url" class="swiper-lazy" />
      <div class="swiper-lazy-preloader"></div>
    </div>

    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

// import style (>= Swiper 6.x)
import "swiper/swiper-bundle.css";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      img: [
        {
          url:
            "https://ak-d.tripcdn.com/images/200b1600000107qte864E_R_1080_808_R5_D.jpg",
          //   url: "@/assets/01.jpg",
        },
        {
          url:
            "https://ak-d.tripcdn.com/images/200s1600000108sh8C7F9_R_1080_808_R5_D.jpg",
          //   url: "@/assets/02.jpg",
        },
        {
          url:
            "https://ak-d.tripcdn.com/images/200t1600000103l8hB3C8_R_1080_808_R5_D.jpg",
          //   url: "@/assets/03.jpg",
        },
        {
          url:
            "https://ak-d.tripcdn.com/images/20041600000100vrf918A_R_1080_808_R5_D.jpg",
          //   url: "@/assets/04.jpg",
        },
        {
          url:
            "https://ak-d.tripcdn.com/images/20021e000001fdmo935C6_R_1080_808_R5_D.jpg",
          //   url: "@/assets/05.jpg",
        },
        {
          url:
            "https://ak-d.tripcdn.com/images/200l16000001026duBBD7_R_1080_808_R5_D.jpg",
          //   url: "@/assets/06.jpg",
        },
        {
          url:
            "https://ak-d.tripcdn.com/images/200u160000010599x484C_R_1080_808_R5_D.jpg",
          //   url: "@/assets/07.jpg",
        },
        {
          url:
            "https://ak-d.tripcdn.com/images/200r1600000103pi2895F_R_1080_808_R5_D.jpg",
          //   url: "@/assets/08.jpg",
        },
      ],
      swiperOptions: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        speed: 700,
        allowTouchMove: false,
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 3,
        },
        centeredSlides: true,
        spaceBetween: 50,
        slidesOffsetBefore: 40,
        loop: true,
        slidesPerView: "auto",
        on: {
          slideChangeTransitionEnd: function () {
            this.slides
              .transition(this.params.autoplay.delay + this.params.speed)
              .transform("translate3d(-60px, 0, 0)");
          },
          slideChangeTransitionStart: function () {
            this.slides
              .transition(this.params.speed)
              .transform("translate3d(0, 0, 0)");
          },
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return '<div class="' + className + '"><span></span><i></i></div>';
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  width: 1000px;
  padding-bottom: 40px;
}
.swiper-slide {
  width: 640px;
  height: 480px;
  transition-timing-function: linear;
}
// @media only screen and (max-width: 1200px) {
//   .swiper-slide {
//     width: 770px;
//   }
// }
// @media only screen and (max-width: 980px) {
//   .swiper-slide {
//     width: 471px;
//   }
// }
// @media only screen and (max-height: 480px) {
//   .swiper-slide {
//     width: 471px;
//   }
// }
.swiper-slide img {
  width: 100%;
  border-radius: 4px;
}
.swiper-slide .title {
  position: absolute;
  transform: rotate(90deg);
  transform-origin: left top;
  left: -3px;
  font-size: 11px;
  color: rgb(102, 102, 102);
}
.swiper-button-next,
.swiper-button-prev {
  width: 86px;
  height: 112px;
  background-size: 86px 112px;
  margin-top: -56px;
  outline: none;
}
.swiper-button-next {
  background-image: url("../../static/cursor-next.png");
  &::after {
    content: "";
  }
}
.swiper-button-prev {
  background-image: url("../../static/cursor-prev.png");
  &::after {
    content: "";
  }
}
/deep/.swiper-pagination-bullet {
  background: none;
  opacity: 1;
  margin: 0 6px !important;
  width: 9px;
  height: 9px;
  position: relative;
  outline: none;
  vertical-align: middle;
}
/deep/.swiper-pagination-bullet span {
  width: 3px;
  height: 3px;
  background: #ccc;
  display: block;
  border-radius: 50%;
  margin-top: 3px;
  margin-left: 3px;
}
/deep/.swiper-pagination-bullet i {
  background: rgb(90, 86, 86);
  height: 8px;
  width: 20px;
  border-radius: 4px;
  position: absolute;
  top: 0px;
  transform: scaleX(0);
  transform-origin: left;
  z-index: 3;
  transition-timing-function: linear;
}
/deep/.swiper-pagination-bullet-active span {
  width: 8px;
  height: 8px;
  margin-top: 0;
  margin-left: 0;
  background: rgb(90, 86, 86);
  position: relative;
  z-index: 1;
}
/deep/.swiper-pagination-bullet:hover span {
  width: 8px;
  height: 8px;
  margin-top: 0;
  margin-left: 0;
  background: rgb(90, 86, 86);
  position: relative;
  z-index: 1;
}
/deep/.swiper-pagination-bullet-active i {
  animation: middle 6s;
}
/deep/.swiper-pagination-bullet&:first-child.swiper-pagination-bullet-active i {
  animation: first 6s;
}
/deep/.swiper-pagination-bullet&:last-child.swiper-pagination-bullet-active i {
  animation: last 6s;
}
@keyframes first {
  0% {
    transform: scaleX(0.5);
    left: 0px;
  } /*091*/
  100% {
    transform: scaleX(1);
    left: 2px;
  } /*0915*/
}
@keyframes last {
  0% {
    transform: scaleX(0.7);
    left: -10px;
  } /*1090*/
  20% {
    transform: scaleX(0.3);
    left: 2px;
  } /*090*/
  100% {
    transform: scaleX(0.3);
    left: 0px;
  } /*090*/
}
@keyframes middle {
  0% {
    transform: scaleX(0.7);
    left: -10px;
  } /*1091*/
  20% {
    transform: scaleX(0.45);
    left: 2px;
  } /*092*/
  100% {
    transform: scaleX(1);
    left: 2px;
  } /*0913*/
}
</style>