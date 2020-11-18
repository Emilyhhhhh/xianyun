<template>
  <div class="container" v-if="hotels">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item
        ><a href="/">{{ hotels[0].real_city + "酒店" }}</a></el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ hotels[0].name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部部分 -->
    <header class="header">
      <h2>{{ hotels[0].name }}</h2>
      <p>{{ hotels[0].alias }}</p>
      <p><i class="el-icon-location-outline"></i> {{ hotels[0].address }}</p>
    </header>
    <!-- 酒店图展示部分 -->
    <div>
      <el-row class="show_pic">
        <el-col :span="16" class="show_pic_l">
          <img :src="pictures" alt="" />
        </el-col>
        <el-col :span="8">
          <el-row class="show_pic_s">
            <!--<el-col :span="12" class="show_pic_img" v-for="(item,i) in pictures" :key='i'>
                      <img :src='item' alt="" @click="changePic($event)">
                  </el-col> -->

            <el-col :span="12" class="show_pic_img">
              <img src="@/static/1.jpeg" alt="" @click="changePic($event)" />
            </el-col>
            <el-col :span="12" class="show_pic_img">
              <img src="@/static/2.jpeg" alt="" @click="changePic($event)" />
            </el-col>
            <el-col :span="12" class="show_pic_img">
              <img src="@/static/3.jpeg" alt="" @click="changePic($event)" />
            </el-col>
            <el-col :span="12" class="show_pic_img">
              <img src="@/static/4.jpeg" alt="" @click="changePic($event)" />
            </el-col>
            <el-col :span="12" class="show_pic_img">
              <img src="@/static/5.jpeg" alt="" @click="changePic($event)" />
            </el-col>
            <el-col :span="12" class="show_pic_img">
              <img src="@/static/6.jpeg" alt="" @click="changePic($event)" />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!-- 价格与来源部分 -->
    <div>
      <el-table :data="tableData" style="width: 100%" @row-click="toInt()">
        <el-table-column label="价格来源" width="333">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="低价房型" width="333">
          <template slot-scope="scope">
            <span>{{ scope.row.bestType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最低价格/每晚">
          <template slot-scope="scope">
            <div class="table_price">
              ¥{{ scope.row.price }}<span class="table_price_qi">起</span>
              <i class="el-icon-arrow-right"> </i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 地图组件部分预留位置 -->
    <div>我是一个地图组件的预留位置</div>
    <!-- 基本信息部分 -->
    <div class="message">
      <el-row class="message_row">
        <el-col :span="4"><div class="message_header">基本信息</div></el-col>
        <el-col :span="5"><div>入住时间: 14:00之后</div></el-col>
        <el-col :span="5"><div>离店时间: 12:00之前</div></el-col>
        <el-col :span="5"
          ><div>{{ creation_time }}/{{ renovat_time }}</div></el-col
        >
        <el-col :span="5"
          ><div>酒店规模:{{ roomCount }}间客房</div></el-col
        >
      </el-row>
      <el-row class="message_row">
        <el-col :span="4"><div class="message_header">主要设施</div></el-col>
        <el-col :span="20"
          ><el-tag
            type="info"
            v-for="(item, i) in hotelassets"
            :key="i"
            class="message_hotelassets"
            >{{ item.name }}</el-tag
          ></el-col
        >
      </el-row>
      <el-row class="message_row">
        <el-col :span="4"><div class="message_header">停车服务</div></el-col>
        <el-col :span="20"
          ><div>{{ parking == null ? "-" : parking }}</div></el-col
        >
      </el-row>
      <el-row class="message_row">
        <el-col :span="4"><div class="message_header">品牌信息</div></el-col>
        <el-col :span="20"
          ><div>{{ hotelbrand.name }}</div></el-col
        >
      </el-row>
    </div>
    <!-- 用户评论部分 -->
    <div class="comments">
      <h3>{{ all_remarks }}条真实用户评论</h3>
      <el-row>
        <el-col :span="4">
          <p>总评数:&#12288;{{ all_remarks }}</p>
          <p>好评数:&#12288;{{ good_remarks }}</p>
          <p>差评数:&#12288;{{ bad_remarks }}</p>
        </el-col>
        <el-col :span="5" class="comments_start">
          <div>
              <el-rate
            v-model="stars"
            disabled
            show-score
            text-color="#ff9900"
            class="comments_start_start"
          >
          </el-rate>
          
          </div>
          <div class="comments_start_bg">
              <span class="comments_start_bg_c">{{stars>3?"推荐":"一般"}}</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotels: "",
      pictures: "http://localhost:3000/_nuxt/static/1.jpeg",
      tableData: [],
      roomCount: "",
      renovat_time: "",
      creation_time: "",
      hotelassets: "",
      parking: "",
      hotelbrand: "",
      all_remarks: "",
      good_remarks: "",
      bad_remarks: "",
      stars: "",
    };
  },
  methods: {
    changePic(e) {
      console.log(e);
      console.log(e.path[0].currentSrc);
      this.pictures = e.path[0].currentSrc;
    },
    toInt() {
      window.open(
        "https://hotels.ctrip.com/hotels/694679.html?hotel=694679&tab=1&#abtest=200820_HTL_cdhwp:B;"
      );
    },
  },
  mounted() {
    this.$axios({
      url: "/hotels",
      params: {
        id: "245",
        //这里的id是上个页面点击传来的值
      },
    }).then((res) => {
      //console.log(res);
      this.hotels = res.data.data;
      console.log(this.hotels);
      this.tableData = res.data.data[0].products;
      //console.log(this.tableData);
      this.roomCount = res.data.data[0].roomCount;
      this.renovat_time = res.data.data[0].renovat_time;
      this.creation_time = res.data.data[0].creation_time;
      this.hotelassets = res.data.data[0].hotelassets;
      this.parking = res.data.data[0].parking;
      this.hotelbrand = res.data.data[0].hotelbrand;
      this.all_remarks = res.data.data[0].all_remarks;
      this.bad_remarks = res.data.data[0].bad_remarks;
      this.good_remarks = res.data.data[0].good_remarks;
      this.stars = res.data.data[0].stars;
    });
  },
};
</script>

<style lang="less" scoped>
.breadcrumb {
  font-size: 14px;
}
.header {
  margin-top: 20px;
  h2 {
    font-weight: 400;
  }
  p {
    font-size: 14px;
    color: #666;
  }
}
.show_pic {
  margin: 40px 0;
  height: 360px;
  .show_pic_l {
    width: 640px;
    height: 360px;
    margin-right: 25px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .show_pic_s {
    .show_pic_img {
      padding-right: 10px;
      width: 50%;
      margin-bottom: 13px;
      img {
        width: 100%;
      }
    }
  }
}

.table_price {
  color: #f90;
  font-size: 16px;
  .table_price_qi {
    color: #606266;
    font-size: 14px;
    margin-left: 3px;
  }
}

.message {
  margin: 40px 0;
  .message_header {
    font-size: 14px;
  }
  .message_row {
    box-sizing: border-box;
    height: 60px;
    border-bottom: 1px solid #eee;
    line-height: 60px;
    font-size: 14px;
    color: #666;
    .message_hotelassets {
      margin: 0 10px;
    }
  }
}

.comments {
    h3{
        margin: 40px 0;
    }
  margin: 40px 0;
        .comments_start{
            
            position: relative;
            .comments_start_start{
                position: absolute;
                top: 25px;
            }
            .comments_start_bg{
      position: absolute;
    left: 20px;
    border: 2px solid #fa3;
    text-align: center;
    line-height: 70px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    opacity: .25;
    transform: rotate(-30deg);
    .comments_start_bg_c{
        font-size: 24px;
        
        color: #fa3;
    }
  }
        }

  
}
</style>