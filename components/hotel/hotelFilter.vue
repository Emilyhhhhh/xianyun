<template>
  <div class="hotelFilter">
<el-row class="areaFilter">
  <el-col :span="14">
      <!-- 左边的区域部分 -->
    <div class="grid-content">
      <div class="search-area">
        <div class="left">区域：</div>
        <div class="right">
            <div class="spans" :class="{active:flag}">
              <span v-for="(v,i) in scenics" :key="i">{{v.name}}</span>
            </div>
              <a href="#" @click.prevent.self="showTag"><i  class="el-icon-d-arrow-right"></i>
          等{{scenics.length}}个区域
        </a>
        </div>
      </div>
      <!-- 左边的均价部分 -->
      <div class="search-price">
    <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top-start">
        <div class="price">均价 <sup class="icon-mask">?</sup> :</div>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" placement="bottom-start">
        <div>
          <i class="iconfont iconhuangguan" v-for="n in 3" :key="n"></i>
          <span class="price-budget">¥332</span>
        </div>
    </el-tooltip>
       <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" placement="bottom-start">
        <div>
          <i class="iconfont iconhuangguan" v-for="n in 4" :key="n"></i>
          <span class="price-budget">¥332</span>
        </div>
    </el-tooltip>
        <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" placement="bottom-start">
        <div>
          <i class="iconfont iconhuangguan" v-for="n in 5" :key="n"></i>
          <span class="price-budget">¥332</span>
        </div>
    </el-tooltip>
      </div>
    </div>
    </el-col>
      <el-col :span="10">
 <!-- 右边的地图 -->
      <div id="mapBox"></div>
    </el-col>

      </el-row>
      
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
          <!-- <i class="iconfont iconright-1"></i> -->
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
    props: ['hotelFilterList','scenics','hotelList'],
    data () {
        return {
              flag:true,
              price:4000,   //定义初始值
              city:'',
              marker:[]
        }
    },
   
    methods: {

      showTag(){
            this.flag = !this.flag
      },

      //重置筛选器
      revoke() {
        console.log(this.$route.query.cityName);
      // this.$router.push({ path: "/hotel?cityName="+city})
      },

      onComplete (data) {
       // data是具体的定位信息
       // console.log(data.addressComponent.city);
       console.log(this.$route.query);
       if(!this.$route.query){
         this.$router.push({ path: "/hotel?cityName="+data.addressComponent.city})
       }
       return data.addressComponent.city
      },
       

      // 封装定位的函数
      getLocation(){
        AMap.plugin('AMap.Geolocation', ()=> {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          buttonOffset: new AMap.Pixel(10, 20),
          zoomToAccuracy: true,  
          panToLocation:false,   
          buttonPosition: 'RB'
        })
            //  定位状态
        geolocation.getCurrentPosition((status,result)=>{
            if(status=='complete'){
              console.log(this);
                this.onComplete(result)
            }else{
                onError(result)
            }
        });
          function onError (data) {
            // 定位出错
            console.log(data);
          }
        })
      }
    },
    watch: {
      '$route':{
          handler(){
            console.log(this.$route);
            this.$router.push({ path: "/hotel?cityName="+this.$route.query.cityName})
            }
      }
    },
    mounted () {
      let {$router,hotelList,marker,getLocation} =this
      console.log($router);
      console.log(this);

      // 这里的this指向不是vue了
      window.onLoad  = function(){
       this.map = new AMap.Map("mapBox", {
        // center: [113.318977, 23.114155],  //定中心
        zoom: 12,
      });

      //点标记
      if(hotelList){
        hotelList.forEach(item => {
          // 创建点标记
        let res= new AMap.Marker({
            // 地理位置经纬度
          position:[item.location.longitude,item.location.latitude],
          title: item.name
        })
        // console.log(res);
        marker.push(res)
      })
         console.log(marker);
            // console.log(this.marker);
            // 添加到地图当中
            map.add(marker);//添加到地图
      }
      
        //  定位
        console.log(this);
        getLocation()
      }
      // api 地址
      var url =
          "https://webapi.amap.com/maps?v=1.4.15&key=5caf2a13effa985a9ccf8005f99adfaf&callback=onLoad";
      // 创建一个 script dom 元素
      var jsapi = document.createElement("script");

      // 设定 script 标签属性
      jsapi.charset = "utf-8";
      jsapi.src = url;

      // 将api文件引入到页面中, 加载完毕以后就会调用回调函数 onLoad
      document.head.appendChild(jsapi);
    }
}
</script>

<style lang="less" scoped>
 #mapBox {width:420px; height: 260px; }  
  .map{
      height: 260px;

  }

.grid-content{
    color: #666;
    font-size: 14px;

.search-area{
    display: flex;
    margin-bottom: 20px;
    .left{
        width: 50%;
    }
    .right{
        overflow: visible;
        .active{
        height: 40px;
            overflow: hidden;
        }
        .el-icon-d-arrow-right{
            color: orange;
            transform: rotate(90deg)
        }
    }
}
    /deep/ span{
        margin-right: 15px;
    }
    .search-price{
        display: flex;
        &>div{
            margin-right: 30px;
        }
        .price{
           .icon-mask{
                background-color: #ccc;
                color: #fff;
                display: inline-block;
                width: 1.2em;
                height: 1.2em;
                text-align: center;
                border-radius: 100%;
            }
        }
        .iconfont{
        color: orange;
        font-size: 16px;
    }
    }
}
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