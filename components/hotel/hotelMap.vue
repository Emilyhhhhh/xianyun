<template>
  <div class="hotelMap">
    <div class="left">
      <div id="container" class="Amap"></div>
    </div>
    <div class="right">
      <!-- <div class="tab">
        <span class="tab1 active">风景</span>
        <span class="tab2">交通</span>
      </div> -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="风景" name="first">
          <ul>
            <li
              v-for="(item, index) in playList"
              :key="index"
              v-show="playList"
              class="poi-list-item"
              @mouseenter="handlerMark(poiplayMark[index])"
            >
              <span style="flex: 1">{{ item.name }}</span
              ><span>{{ item.distance }}公里</span>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="交通" name="second">
          <ul>
            <li
              v-for="(item, index) in trafficList"
              :key="index"
              v-show="trafficList"
              class="poi-list-item"
              @mouseenter="handlerMark(poiTrafficMark[index])"
            >
              <span style="flex: 1">{{ item.name }}</span
              ><span>{{ item.distance }}公里</span>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotelLocation: [],
      poiplayMark: [],
      poiTrafficMark: [],
      map: "",
      activeName: "first",
      playList: [],
      trafficList: [],
    };
  },
  methods: {
    handlerMark(e) {
      // console.log(e);
      e.emit("mouseover", { target: e });
      // this.map.setZoom(14);
    },
    initList(res) {
      const arr = res.map((item) => {
        const position = item.location.split(",");
        const p1 = [position[0], position[1]];
        const distance =
          AMap.GeometryUtil.distance(p1, this.hotelLocation).toFixed(0) / 1000;
        const data = {
          name: item.name,
          distance,
        };
        return data;
      });
      return arr;
    },
    async handleClick(tab, event) {
      // this.map.setFitView(this.hotelLocation, false, 0, 14);
      this.map.setZoomAndCenter(10, [...this.hotelLocation]);
      // console.log(tab, event);
      if (tab.name === "first") {
        // console.log(556);

        setTimeout(() => {
          this.map.setZoomAndCenter(14, [...this.hotelLocation]);
        }, 300);
        this.map.remove(this.poiTrafficMark);
        this.setMark(this.map, this.poiplayMark);
      }
      if (tab.name === "second") {
        // console.log(222);
        //切换tab栏的时候把覆盖物清掉再重新渲染
        this.map.remove(this.poiplayMark);
        setTimeout(() => {
          this.map.setZoomAndCenter(14, [...this.hotelLocation]);
        }, 300);
        if (this.trafficList.length == 0) {
          const obj = await this.searchPlay("交通设施服务");
          this.poiTrafficMark = [...obj.markobj];
          this.trafficList = [...obj.aisdeobj];
        }
        await this.setMark(this.map, this.poiTrafficMark);
      }
    },
    defineUrl() {
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=3f634bfb09388d334f76a49bbbca1b74&callback=onLoad";
      // 创建一个 script dom 元素
      var jsapi = document.createElement("script");
      // 设定 script 标签属性
      jsapi.charset = "utf-8";
      jsapi.src = url;
      // 将api文件引入到页面中, 加载完毕以后就会调用回调函数 onLoad
      document.head.appendChild(jsapi);
    },
    async createMap() {
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        // zoom: 14,
      });

      await this.getLocation();
      this.map.setZoomAndCenter(14, [...this.hotelLocation]);
      // console.log(this.hotelLocation);
      const obj = await this.searchPlay("风景名胜");
      this.poiplayMark = [...obj.markobj];
      this.playList = [...obj.aisdeobj];
      // console.log(this.poiplayMark);
      // console.log(22);
      await this.setMark(this.map, this.poiplayMark);
      // console.log(this.poiplayMark);
    },
    //搜索周围服务游乐设施
    searchPlay(type) {
      let poiobj = new Object();
      return new Promise((reslove) => {
        const location = this.hotelLocation[0] + "," + this.hotelLocation[1];
        this.$axios({
          url: "https://restapi.amap.com/v3/place/text",
          params: {
            key: "050e3062145d1c9b16007ba6fb4aa011",
            output: "json",
            keywords: "",
            offset: 10,
            location,
            // city: "广州",
            // types: "风景名胜",
            types: type,

            page: 1,
            // extensions: "all",
          },
        }).then((res) => {
          // console.log(res.data.pois);

          poiobj.aisdeobj = this.initList(res.data.pois);
          poiobj.markobj = res.data.pois.map((item, index) => {
            let content = `<div style='width:24px;height:36px; position: relative;text-align:center;line-height: 24px;color: #fff;'>${
              index + 1
            }<img src="http://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png" style="position: absolute;width:100%;height:100%;top:0;left:0;z-index:-1"></div>`;
            const position = item.location.split(",");
            let data = new AMap.Marker({
              position: [position[0], position[1]],
              content,
            });
            data.title = item.name;
            return data;
          });

          // console.log(poiobj);
          reslove(poiobj);
        });
      });
    },
    getLocation() {
      return new Promise((reslove) => {
        this.$axios({
          url: "/hotels",
          params: { id: this.$route.query.id },
        }).then((res) => {
          // console.log(res.data.data[0]);
          const data = res.data.data[0].location;
          this.hotelLocation = [data.longitude, data.latitude];
          reslove();
        });
      });
    },
    setMark(map, markobj) {
      return new Promise((reslove) => {
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30),
          autoMove: true,
          size: 100,
        });
        // function markerEnter(e) {
        //   infoWindow.setContent(e.target.title);
        //   infoWindow.open(map, e.target.getPosition());
        //   // map.setZoom(5);
        //   map.setFitView(e.target, false, 0, 14);
        // }
        map.add(markobj);
        markobj.forEach((item) => {
          //此处mouseenter无效
          // item.emit("mouseover", { target: item });
          // item.on("mouseover", markerEnter);
          //这种方法绑定事件默认会有选中最后一个
          item.on("mouseover", function (item) {
            infoWindow.setContent(item.target.title);
            infoWindow.open(map, item.target.getPosition());
            // map.setZoom(5);
            map.setFitView(item.target, false, 0, 14);
          });
          item.on("mouseout", function (item) {
            infoWindow.close();
          });
        });
        reslove();
      });
    },
  },
  mounted() {
    window.onLoad = () => {
      this.createMap();
    };
    this.defineUrl();
  },
};
</script>

<style lang="less" scoped>
.hotelMap {
  width: 1000px;
  margin-top: 30px;
  display: flex;
  .left {
    width: 660px;
    height: 360px;
    text-align: left;
    margin-right: 10px;
    #container {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    width: 330px;
    height: 354px;
    .tab {
      height: 38px;
      // background-color: gray;
      border-bottom: 2px solid gray;
      .tab1,
      .tab2 {
        display: inline-block;
        height: 38px;
        line-height: 38px;
      }
      .tab1 {
        margin-right: 20px;
      }
      .active {
        border-bottom: 2px solid skyblue;
        color: skyblue;
      }
    }
    ul {
      width: 330px;
      height: 315px;
      overflow: auto;
      margin-top: 5px;
      .poi-list-item {
        display: flex;
        margin: 0 20px 20px 10px;
        cursor: pointer;
        font-size: 14px;
        color: #666;
      }
      li {
        list-style: none;
      }
    }
  }
  /deep/.amap-info-content {
    font-size: 12px;
  }
}
</style>