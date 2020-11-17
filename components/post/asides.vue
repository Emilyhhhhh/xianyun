<template>
  <div class="all">
    <div class="menus-w">
      <div
        v-for="(item, i) in cities"
        :key="i"
        class="menus"
        @mouseenter="showCities(item.type, i)"
        @mouseleave="moveout()"
      >
        {{ item.type }}

        <div id="showCity" ref="city" @mouseenter="moveInc(i)" :style="{top:-i*41 +'px'}">
          <a
            href=""
            v-for="(item, i) in children"
            :key="i"
            class="showCity_item"
            @click="postCity(item.city)"
            
          >
            <i class="i_index">{{ i + 1 }}</i
            ><strong>{{ item.city }}</strong
            ><span>{{ item.desc }}</span>
          </a>
        </div>
      </div>

      <h2 class="recommend">推荐城市</h2>
      <a href="#">
        <img src="@/static/pic_sea.jpeg" alt="" class="link" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$axios({
      url: "/posts/cities",
      params: "",
    }).then((res) => {
      /* 
      console.log(res);
      console.log(res.data.data); */
      this.cities = res.data.data;
      //console.log(this.cities);
    });
  },
  data() {
    return {
      type: "",
      cities: "",
      children: [],
    };
  },
  methods: {
    postCity(city) {
      this.$router.push("//post?city=" + city);
    },
    moveInc(i) {},
    moveout() {
      for (let i in this.$refs.city) {
        this.$refs.city[i].style.display = "none";
      }
    },
    showCities(str, i) {
      if (this.cities) {
        // console.log(this.$refs.city[i]);

        this.$refs.city[i].style.display = "block";
        //console.log(this.cities[0].type);
        for (let i = 0; i < this.cities.length; i++) {
          if (str == this.cities[i].type) {
            this.children = this.cities[i].children;
            //console.log(this.children);
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
#showCity {
  display: none;
  margin-left: -1px;
  background: #fff;
  border: 1px solid #ddd;
  box-sizing: border-box;
  height: 202px;
  width: 350px;
  position: absolute;
  top: 0px;
  left: 260px;
  padding: 10px 20px;
  z-index: -1;
  .showCity_item {
    strong:hover {
      text-decoration: underline;
    }
    span:hover {
      text-decoration: underline;
    }

    cursor: pointer;
    display: block;
    width: 308px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    .i_index {
      font-size: 24px;
      color: orange;
      :hover {
        text-decoration: underline;
      }
    }

    strong {
      margin: 0 10px;
      color: orange;
    }
    span {
      color: #999;
    }
  }
}
.all {
  position: relative;
  .menus-w {
    width: 260px;
    border: 1px solid #ddd;
    border-right: none;
    border-bottom: none;
    box-shadow: 0 0 1px #f5f5f5;
    z-index: 2;
    .menus {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      padding: 0 20px;
      font-size: 14px;
      position: relative;
      z-index: 2;
      &::before{
          display: none;
        content: "";
        width: 1px;
        height: 40px;
        border-left: 1px solid #fff;
        position: absolute;
        right: -2px;
        top: 0;
      }
      &::after {
        display: block;
        content: "";
        width: 10px;
        height: 10px;
        border-right: 1px solid #999;
        border-top: 1px solid #999;
        transform: rotate(45deg);
        position: absolute;
        right: 20px;
        top: 15px;
      }
    }
    .menus:hover {
      border-right-color: red;
      color: orange;
      &::after {
        border-right: 1px solid orange;
        border-top: 1px solid orange;
      }
      &::before{
          display: block;
      }
    }

    .recommend {
      font-weight: 400;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
    }
    .link {
      width: 100%;
    }
  }
}
</style>