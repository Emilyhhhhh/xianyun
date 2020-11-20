<template>
  <div class="container" title="机票模块首页文件">
    <!-- 头部城市筛选 -->
    <topFilter/>

    <!-- 城市筛选和地图 -->
    <el-row class="areaFilter">
      <el-col :span="14">
          <!-- 左边 -->
        <div class="grid-content">
          <!-- 区域部分 -->
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
          <!-- 均价部分 -->
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
              <span class="price-budget">¥521</span>
            </div>
        </el-tooltip>
            <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" placement="bottom-start">
            <div>
              <i class="iconfont iconhuangguan" v-for="n in 5" :key="n"></i>
              <span class="price-budget">¥768</span>
            </div>
        </el-tooltip>
          </div>
        </div>
        </el-col>
      <el-col :span="10">
    <!-- 右边的地图 -->
        <div id="mapBox"  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(fff, fff, fff, 0.8)"></div>
      </el-col>

    </el-row>

   <!-- 酒店筛选 -->
    <hotelFilter v-if="hotelFilterList" :hotelFilterList='hotelFilterList' 
    :city='city' />


    <!-- 酒店列表 -->
    <div v-if="hotelList && hotelList.length > 0">
      <hotelList :hotelList='hotelList' />
    </div>

    <!-- 分页 -->
      <el-row style="margin:10px">
       <el-col :span="24">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="1"
            layout="total,prev, pager, next, jumper"
            :total='total'>
          </el-pagination>
       </el-col>
      </el-row>
  </div>
</template>

<script>
import topFilter from '@/components/hotel/topFilter.vue'
import hotelFilter from '@/components/hotel/hotelFilter.vue'
import hotelList from '@/components/hotel/hotelList.vue'
import {scenicsList} from '@/myapi/user.js'
export default {
  data () {
    return {
      flag:true,
      loading:true,
      hotelList:null,
      hotelFilterList:null,
      scenics:[],  //每个城市的风景区  给过滤页过滤
      cityId:'',  //城市id参数
      total:0,
      city:'',    //广州
      marker:[],  //存坐标
    }
  },
  components: {
    topFilter,hotelFilter,hotelList
  },
  watch: {
    '$route':{
      handler(){
        //路由变化时刷新城市区域和地图
        this.getScenicsList()   
        this.createdMap()  
      }
    },
    cityId(){
      // 城市变化时过滤
      this.getcityfilter()
    },
    hotelList(){
      // 新的酒店列表变化时更新地图
        this.createdMap()
    }
  },
  methods: {
    //1.区域的显示更多和隐藏
    showTag(){
      this.flag = !this.flag
    },

    // 改变当前页时 _limit 条数  _start  开始数据（分页） city城市id
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
        console.log(this.cityId);
         this.$axios({
           url:'/hotels',
        params:{
          city:this.cityId,
          _start:val,
        }
       }).then(res=>{
         console.log(res);
        this.hotelList=res.data.data
        console.log(this.hotelList);
        this.total=res.data.total
       })
    },
    // 头部过滤：获取每个城市的风景区地点
    async getScenicsList(){
        if(this.$route.query.cityName){
            console.log(this.$route.query.cityName.split('市')[0]);
            let name=this.$route.query.cityName.split('市')[0]
            let res =await scenicsList(name)
            // 把过滤后的城市列表给过滤页
            console.log(res);
            this.scenics=res.data.data[0].scenics
            //  保存城市id
            if(res){
               this.cityId=res.data.data[0].id
               console.log(this.cityId);
            }
            // console.log(cityId);
            console.log(this.scenics,'区域列表');
        }
    },
    // 封装地图创建
    createdMap(){
      console.log('经过了地图');
          this.map = new AMap.Map('mapBox',{
           zoom: 11, //级别
           // center: [113.3245904, 23.1066805], //中心点坐标
           viewMode: "3D", 
           resizeEnable: true,//定位
           });

        //  如果是其他页面跳过来的需要获取用户的定位，根据定位获取数据
        if(!this.$route.query.cityName){
            AMap.plugin('AMap.CitySearch',()=>{
              var citySearch = new AMap.CitySearch()
                citySearch.getLocalCity( (status, result) =>{
                  if (status === 'complete' && result.info === 'OK') {
                    console.log(status, result);  
                    this.$router.push({ path: "/hotel?cityName="+result.city})
                    this.city=result.city
                    // 首次的定位弹窗功能
                    if(!this.$route.query.cityName){
                      this.$alert('定位到当前城市：广州市', '提示', {
                        confirmButtonText: '确定',
                        type:'success',
                     });
                    }
                    
                  }
                })
            })
        }
        // 调用点标记
        
        this.creatMarker()
    },

    //创建点标记
    creatMarker(){
      console.log(this.marker);
      if(this.hotelList){
        // 清空数组
        this.marker.length=0
        this.hotelList.forEach((v,i)=>{
          // 创建点标记
          let res = new AMap.Marker({
            position: new AMap.LngLat(v.location.longitude,v.location.latitude),   // 经纬度对象，也以是经纬     度构成的一维数组[116.39, 39.9]
            title: v.name,
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b'+(i+1)+'.png',
            extData:{
                id: i + 1
            }
          });
          this.marker.push(res)
        })
      }
        // 将创建的点标记添加到已有的地图实例：
        this.loading=false
        this.map.add(this.marker);
        this.map.setFitView()
        
    },
       
    // 开始城市过滤
    getcityfilter(){
      this.$axios({
        url:'/hotels',
      params:{
        city:this.cityId
      }
    }).then(res=>{
      console.log(res);
      this.hotelList=res.data.data
         this.total=res.data.total
        console.log(this.hotelList,'城市过滤');
        
    })
    }
  },

  mounted () {
     // 获取每个城市的风景区地点
    this.getScenicsList()
    
    // 发送酒店选项的请求
    this.$axios({
      url:'/hotels/options',
    }).then(res=>{
      this.hotelFilterList=res.data.data
      console.log(this.hotelFilterList,'酒店过滤');
    })
  

    this.$axios({
        url:'/cities',
    }).then(res=>{
      console.log(res,'全部数据');
    })

    // -------------------------------------------------
    window.onLoad  = ()=>{
        // 创建地图
      this.createdMap()
    }
    // 创建script
      var url = 'https://webapi.amap.com/maps?v=1.4.15&key=5caf2a13effa985a9ccf8005f99adfaf&callback=onLoad';
      var jsapi = document.createElement('script');
      jsapi.charset = 'utf-8';
      jsapi.src = url;
      document.head.appendChild(jsapi);
  },
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
.el-row {
  .el-pagination{
  /deep/ .btn-prev{
    border: 1px solid #d1d0d0;
    &:before{
      content:'上一页' ;
      float: right;
    }
    i.el-icon-arrow-left{
      display: inline-block;
    }
  }
  /deep/ .btn-next{
    border: 1px solid #d1d0d0;
    &:before{
      content:'上一页' ;
      float: left;
    }
    i.el-icon-arrow-right{
      display: inline-block;
    }
  }

  } 
}
</style>