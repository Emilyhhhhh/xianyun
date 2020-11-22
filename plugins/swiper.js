import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'


Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
import SwiperCore, { Autoplay, EffectCube, EffectCoverflow, Navigation, Scrollbar, Pagination, Lazy } from 'swiper';
SwiperCore.use([Autoplay, EffectCube, EffectCoverflow, Navigation, Scrollbar, Pagination, Lazy]);