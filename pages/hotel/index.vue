<template>
  <div class="container" title="机票模块首页文件">
    <!-- 头部城市筛选 -->
    <topFilter/>

    <!-- 酒店筛选和地图 -->
    <div v-if="hotelList && hotelList.length > 0" >
      <hotelFilter :hotelList='hotelList' :hotelFilterList='hotelFilterList' :scenics='scenics' />
    </div>

    <!-- 酒店列表 -->
    <div v-if="hotelList && hotelList.length > 0">
      <hotelList :hotelList='hotelList' />
    </div>

    <!-- 分页 -->
      <el-row style="margin:10px">
       <el-col :span="24">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[2,4,6,8,10]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
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
      hotelList:null,
      hotelFilterList:null,
      scenics:[],  //每个城市的风景区  给过滤页过滤
      cityId:'',
      total:0,
      markers:[]
    }
  },
  components: {
    topFilter,hotelFilter,hotelList
  },
  watch: {
        $route(){
            console.log(this.$route);
             this.getScenicsList()
        },
        cityId(){
          this.getcityfilter()
        }
  },
  methods: {
     // 分页方法：
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      // 改变当前页时   _limit  	条数  _start  开始数据（分页） city城市id
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


    // 获取每个城市的风景区地点
    async getScenicsList(){
        if(this.$route.query.cityName){
            console.log(this.$route.query.cityName.split('市')[0]);
            let name=this.$route.query.cityName.split('市')[0]
            let res =await scenicsList(name)
            // 给过滤页
            console.log(res);
            this.scenics=res.data.data[0].scenics
            // 给酒店详情的请求
            if(res){
               this.cityId=res.data.data[0].id
               console.log(this.cityId);
            }
            // console.log(cityId);
            console.log(this.scenics,'区域列表');
        }
    },
    
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
    
    
    console.log( this.$route.query);
     // 获取每个城市的风景区地点
    this.getScenicsList()

    // 调用请求渲染酒店列表
    // this.getHotels()

    // 发送酒店选项的请求
    this.$axios({
      url:'/hotels/options',
    }).then(res=>{
      console.log(res);
      console.log( this.$route.query);
      this.hotelFilterList=res.data.data
      console.log(this.hotelFilterList);
    })


    // console.log(this.hotelList);
  },

}

</script>

<style lang="less" scoped>
 
</style>