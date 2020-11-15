<template>
    <div class="container" title="酒店搜索组件">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>广州市酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
   <!-- 搜索表单  -->
    <el-form ref="form" :model="form" :inline="true" style="margin-top:20px" label="left">

      <el-form-item>
        <el-input v-model="form.city" placeholder="切换城市" ></el-input>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="离店日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-input
        placeholder="人数未定"
        suffix-icon="el-icon-user"
        v-model="form.userNum">
      </el-input>
      </el-form-item>
  
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查看价格</el-button>
      </el-form-item>

    </el-form>
    <div id="map"></div> 
  </div>
</template>

<script>
export default {
    data () {
    return {
      
      form:{
        city:'',
        date:'',
        userNum:''
      }
    }
  },
  methods: {
    onSubmit(){
      console.log(this.form);
    },
  },
  mounted () {
         // 创建了一个回调函数, 高德地图加载完毕后会调用
            window.onLoad = function () {
                // 所有关于地图的逻辑;
                // 全部都要写在这个回调里面;
                // 保证高德地图加载完毕;
                var map = new AMap.Map("map", {
                  zoom: 25,
                  center: [113.3245904, 23.1066805],
                  viewMode: '3D'
                });
            };

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
        },

}
</script>

<style lang="less" scoped>

.container{
  width:1000px;
  margin:0 auto;
  padding-top: 20px;

  #map {width:420px; height: 260px; }  
}
</style>