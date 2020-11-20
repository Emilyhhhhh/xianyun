<template>
  <div class="hotelFilter">
<!-- 酒店类型筛选 -->
      <el-row class="hotel-filter">

        <el-col :span="4"><div class="price-filter"><span >价格</span>
            <span>0-{{price}}</span>
          </div><el-slider v-model="price" :max=4000></el-slider>
        </el-col>

        <el-col :span="4"><div class="filter">住宿等级</div>
      <el-dropdown placement='top'>
        <span class="el-dropdown-link">
          <span class="dropdown-link-text">已选4项</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">

          <el-dropdown-item 
          v-for="(v,i) in hotelFilterList.levels" :key="i" ><i class="iconfont iconcircle"></i>{{v.level}}星</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
        </el-col>

        <el-col :span="4"><div class="filter">住宿类型</div>
        <el-dropdown placement='top'>
        <span class="el-dropdown-link">
          <span class="dropdown-link-text">已选4项</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <i class="iconfont iconright-1"></i> -->
          <el-dropdown-item 
          v-for="(v,i) in hotelFilterList.types" :key="i" ><i class="iconfont iconcircle"></i>{{v.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
        </el-col>

        <el-col :span="4"><div class="filter">酒店设施</div>
        <el-dropdown placement='top'
        @change="childChange(child)">
        <span class="el-dropdown-link">
          <span class="dropdown-link-text">已选4项</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <i class="iconfont iconright-1"></i> -->
          <el-dropdown-item 
          v-for="(v,i) in hotelFilterList.assets" :key="i" ><i class="iconfont iconcircle"></i>{{v.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
        </el-col>

        <el-col :span="4"><div class="filter">酒店品牌</div>
        <el-dropdown placement='top'>
        <span class="el-dropdown-link">
          <span class="dropdown-link-text">已选4项</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="height: 220px; overflow: auto; ">
          <!-- <i class="iconfont iconright-1"></i> -->
          <el-dropdown-item 
          v-for="(v,i) in hotelFilterList.brands" :key="i" ><i class="iconfont iconcircle"></i>{{v.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
        </el-col>

        <el-col :span="4">
          <div class="filter">
            <el-button type="primary" @click="revoke">撤销条件</el-button>
          </div>
        </el-col>

      </el-row>
  </div>
</template>

<script>
export default {
    props: ['hotelFilterList','city'],
    data () {
        return {
              price:4000,   //定义初始值     
        }
    },
    watch: {

    },
    methods: {
       //重置筛选器
      revoke() {
        console.log(this.$route.query.cityName);
      this.$router.push({ path: "/hotel?cityName="+this.city})
      },

     
    },
    mounted () {}

}
</script>

<style lang="less" scoped>
// 酒店类型筛选
.hotel-filter{
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 5px 0px;
  color: #666;
 
  .el-col{
    padding: 10px 20px;
    &:not(:first-child){
      border-left: 1px solid #ddd;
    }
    font-size: 14px;
  }
}
  .price-filter{
      display: flex;
      justify-content: space-between;

  }
  .el-dropdown{
    width: 100%;
    margin-top: 15px;
    font-size: 13px;
  }
  .el-dropdown-link{
    display: flex;
    justify-content: space-between;
    .dropdown-link-text{
      flex: 1;
    }
    .el-icon-arrow-down{
      margin-top: 3px;
    }

  }
</style>