<template>
  <div class="hotelFilter">
    <!-- 酒店列表渲染 -->
    <div class="hotelList" v-if="hotelList && hotelList.length > 0">
      <el-row class="hotelList-row" v-for="(v, i) in hotelList" :key="i">
        <el-col :span="8">
          <div class="img-wrapper">
            <!-- 🚩🚩动态路由跳转 -->
            <nuxt-link :to="`/hotel/hotelDetail?id=${v.id}`">
              <img :src="v.photos" alt="" />
            </nuxt-link>
          </div>
        </el-col>

        <el-col :span="10">
          <h4 class="hotel-cn-name">{{ v.name }}</h4>
          <div class="hotel-en-name">
            {{ v.alias }}
            <span v-if="v.hotellevel">
              <i
                class="iconfont iconhuangguan"
                v-for="(value, index) in v.hotellevel.level"
                :key="index"
                style="color: orange; font-size: 16px"
              ></i>
            </span>
            {{ v.hoteltype.name }}
          </div>

          <div class="rate">
            <el-col :span="10">
              <el-rate
                v-model="v.stars"
                disabled
                show-score
                text-color="#f7ba2a"
                :score-template="`${v.stars}`"
              >
              </el-rate>
            </el-col>
            <el-col :span="7">
              <span style="color: orange">{{ v.good_remarks }} </span> 条评价
            </el-col>
            <el-col :span="7"
              ><span style="color: orange">{{ v.common_remarks }}</span>
              篇游记</el-col
            >
          </div>

          <div class="location-row">
            <i class="iconfont iconlocation"></i>
            位于: {{ v.address }}
          </div>
        </el-col>
        <el-col :span="6">
          <ul class="price-col" v-if="v.products">
            <li v-for="(value, index) in v.products" :key="index">
              <div class="price-col-left">{{ value.name }}</div>
              <div class="price-col-right">
                <span style="color: orange">￥{{ value.price }}</span> 起<i
                  class="el-icon-arrow-right"
                  style="margin-left: 5px"
                ></i>
              </div>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hotelList"],
};
</script>

<style lang="less" scoped>
.hotelList {
  .hotelList-row {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }
  .img-wrapper {
    width: 420px;
    img {
      width: 320px;
      height: 210px;
    }
  }
  .hotel-cn-name {
    font-weight: 400;
    font-size: x-large;
  }
  .hotel-en-name {
    color: #999;
  }
  .rate {
    margin: 10px 0;
    display: flex;
    .el-rate__icon {
      font-size: 20px;
    }
  }
  .location-row {
    color: #666;
  }
  .price-col {
    display: flex;
    flex-direction: column;
    color: #606266;
    li {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #c7c7c7;
      padding: 12px;
      cursor: pointer;
      margin: 0 20px;
      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>