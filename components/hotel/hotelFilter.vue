<template>
  <div class="hotelFilter">
<!-- 酒店类型筛选 -->
      <el-row class="hotel-filter">

        <el-col :span="4"><div class="price-filter"><span >价格</span>
            <span>0-{{price}}</span>
          </div><el-slider v-model="price" :max=4000 :step="10" @change="priceChange"></el-slider>
        </el-col>
        <el-col :span="4"><div class="filter">住宿等级</div>
      <el-dropdown placement='top' @command="handleHotellevel" :hide-on-click="false">
        <span class="el-dropdown-link">
          <span class="dropdown-link-text">
          {{params.hotellevel.length>0?`已选${params.hotellevel.length}项`:'不限'}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item :command="index"
          v-for="(value,index) in hotelFilterList.levels" :key="index" >
          <i class="iconfont" 
          
          :class="params.hotellevel.indexOf(value.level)!=-1 ?'iconright-1':'iconcircle'" ></i>{{value.level}}星</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

        </el-col>
        <el-col :span="4"><div class="filter">住宿类型</div>
        <el-dropdown placement='top' @command="handleHoteltype">
        <span class="el-dropdown-link">
          <span class="dropdown-link-text">
             {{params.hoteltype.length>0?`已选${params.hoteltype.length}项`:'不限'}}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="i"
          v-for="(v,i) in hotelFilterList.types" :key="i">
          <i class="iconfont"
          :class="params.hoteltype.indexOf(v.id)!=-1 ?'iconright-1':'iconcircle'" ></i>{{v.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
        </el-col>

        <el-col :span="4"><div class="filter">酒店设施</div>
        <el-dropdown placement='top' @command="handleHotelbrand">
        <span class="el-dropdown-link">
          <span class="dropdown-link-text">
              {{params.hotelbrand.length>0?`已选${params.hotelbrand.length}项`:'不限'}}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="i" 
           v-for="(v,i) in hotelFilterList.assets" :key="i">
          <i class="iconfont"
          :class="params.hotelbrand.indexOf(v.id)!=-1 ?'iconright-1':'iconcircle'" ></i>{{v.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
        </el-col>

        <el-col :span="4"><div class="filter">酒店品牌</div>
        <el-dropdown placement='top' @command="handleHotelasset">
        <span class="el-dropdown-link">
          <span class="dropdown-link-text">
             {{params.hotelasset.length>0?`已选${params.hotelasset.length}项`:'不限'}}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="height: 220px; overflow: auto; ">
          <el-dropdown-item :command="i" 
           v-for="(v,i) in hotelFilterList.brands" :key="i">
          <i class="iconfont"
          :class="params.hotelasset.indexOf(v.id)!=-1 ?'iconright-1':'iconcircle'" ></i>{{v.name}}</el-dropdown-item>
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
          params:{
            hotellevel:[],
            hoteltype:[],
            hotelbrand:[],
            hotelasset:[],
          }
        }
    },
    methods: {
       //重置筛选器
      revoke() {
        console.log(this.$route.query.cityName);
      this.$router.push({ path: "/hotel?cityName="+this.city})
      },
      priceChange(value){
        console.log(value);
      },

      // 点击下拉选项时触发：判断点击时获取的下标是否在hotellevel数组中，如果有就说明已经勾选过了，需要取反，去掉数组的成员，反之则把这个成员加入数组中，
      handleHotellevel(command) {
        let index
        // 找的是id  所以加1
        if(this.params.hotellevel.indexOf(command+1)!=-1 ){
          // 找到在新数组的存储的下标
          index=this.params.hotellevel.indexOf(command+1)
          console.log(index);
          this.params.hotellevel.splice(index,1)
        }else{
          this.params.hotellevel.push(command+1)
        }
      },
      handleHoteltype(command){
        let index
        if(this.params.hoteltype.indexOf(command+1)!=-1 ){
          index=this.params.hoteltype.indexOf(command+1)
          this.params.hoteltype.splice(index,1)
        }else{
          this.params.hoteltype.push(command+1)
        }
      },
       handleHotelbrand(command){
        let index
        if(this.params.hotelbrand.indexOf(command+1)!=-1 ){
          index=this.params.hotelbrand.indexOf(command+1)
          this.params.hotelbrand.splice(index,1)
        }else{
          this.params.hotelbrand.push(command+1)
        }
      },
       handleHotelasset(command){
        let index
        console.log(this.hotelFilterList);
        if(this.params.hotelasset.indexOf(command+1)!=-1 ){
          index=this.params.hotelasset.indexOf(command+1)
          this.params.hotelasset.splice(index,1)
        }else{
          this.params.hotelasset.push(command+1)
        }
      }
    },
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