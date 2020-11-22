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
        <el-dropdown placement='top' @command="handleHoteltype"  :hide-on-click="false">
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
        <el-dropdown placement='top' @command="handleHotelasset"  :hide-on-click="false">
        <span class="el-dropdown-link">
          <span class="dropdown-link-text">
              {{params.hotelasset.length>0?`已选${params.hotelasset.length}项`:'不限'}}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="i" 
           v-for="(v,i) in hotelFilterList.assets" :key="i">
          <i class="iconfont"
          :class="params.hotelasset.indexOf(v.id)!=-1 ?'iconright-1':'iconcircle'" ></i>{{v.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
        </el-col>

        <el-col :span="4"><div class="filter">酒店品牌</div>
        <el-dropdown placement='top' @command="handleHotelbrand" :hide-on-click="false">
        <span class="el-dropdown-link">
          <span class="dropdown-link-text">
             {{params.hotelbrand.length>0?`已选${params.hotelbrand.length}项`:'不限'}}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" style="height: 220px; overflow: auto; ">
          <el-dropdown-item :command="i" 
           v-for="(v,i) in hotelFilterList.brands" :key="i">
          <i class="iconfont"
          :class="params.hotelbrand.indexOf(v.id)!=-1 ?'iconright-1':'iconcircle'" ></i>{{v.name}}</el-dropdown-item>
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
            hotelasset:[],
            hotelbrand:[],
            price_lt:4000
          }
        }
    },
    watch: {
      params:{
        handler(){
          this.change()
           
      },
      deep:true
    }
    },
    methods: {
       //重置筛选器
      revoke() {
        console.log(this.$route.query.cityName);
        for (const key in this.params) {
          console.log(key);
          if(key!='price_lt'){
            this.params[key]=[]
          }
        }
        console.log(this.params);
        if(this.$route.query){
            this.$router.push({ path: "/hotel?cityName="+this.city})
        }
      this.$emit('revoke')
      },
      // 价格改变时触发
      priceChange(value){
        console.log(value);
        this.params.price_lt=value
      },

      // 封装酒店筛选的步骤
      handlefilter(arr,index){
        let arrIndex
        // 找的是id  所以加1
        if(arr.indexOf(index+1)!=-1 ){
          // 找到在新数组的存储的下标
          arrIndex=arr.indexOf(index+1)
          console.log(arrIndex);
          arr.splice(arrIndex,1)
        }else{
          arr.push(index+1)
        }
        console.log(arr);
      },

      // 修改数据添加到url上
      change() {
      let str=''
      if(this.params.price_lt){
      str+= "price_lt=" + this.params.price_lt + "&";
      }
      console.log(str);
      if (this.params.hotellevel) {
        this.params.hotellevel.forEach((e, index) => {
          str += "hotellevel=" + e + "&";
        });
      }
      console.log(str);

      if (this.params.hoteltype) {
        this.params.hoteltype.forEach((e, index) => {
          str += "hoteltype=" + e + "&";
        });
      }
      console.log(str);

      if (this.params.hotelbrand) {
        this.params.hotelbrand.forEach((e, index) => {
          str += "hotelbrand=" + e + "&";
        });
      }
      console.log(str);

      if (this.params.hotelasset) {
        this.params.hotelasset.forEach((e, index) => {
          str += "hotelasset=" + e + "&";
        });
      }
      console.log(str);

      let cityName=this.$route.query.cityName
      console.log(str,'修改数据添加到url上');
      this.$router.replace(`/hotel?cityName=${cityName}&` + str);
      this.$emit('changeUrl')
    },

      // 点击下拉选项时触发：判断点击时获取的下标是否在hotellevel数组中，如果有就说明已经勾选过了，需要取反，去掉数组的成员，反之则把这个成员加入数组中，
      handleHotellevel(command) {
        this.handlefilter(this.params.hotellevel,command)
      },
      handleHoteltype(command){
        this.handlefilter(this.params.hoteltype,command)
      },
      handleHotelasset(command){
      this.handlefilter(this.params.hotelasset,command)
      },
      // 这个 下标不一样不能封装
      handleHotelbrand(command){
         let arrIndex
        if(this.params.hotelbrand.indexOf(command+4)!=-1 ){
          arrIndex=this.params.hotelbrand.indexOf(command+4)
          this.params.hotelbrand.splice(arrIndex,1)
        }else{
          this.params.hotelbrand.push(command+4)
        }
      },
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