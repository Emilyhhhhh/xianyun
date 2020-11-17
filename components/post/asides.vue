<template>
<div class="all">
     <div class="menus-w">
    <div class="menus" @mouseover="getcities" >
      热门城市
      <i></i>
    </div>
    <div class="menus">
      推荐城市
      <i></i>
    </div>
    <div class="menus">
      <span>奔向海岛</span>
      <i></i>
    </div>
    <div class="menus">
      <span>主题推荐</span>
      <i></i>
    </div>
    <h2 class="recommend">推荐城市</h2>
    <a href="#" >
      <img src="@/static/pic_sea.jpeg" alt="" class="link"/>
    </a>
  </div>
    <div class="showCity">
        askjdlaksjd
    </div>
</div>
 
</template>

<script>
export default {
  data() {
    return {
        type:"",
        children:[]
      
    };
  },
  methods: {
    getcities(type) {
        this.$axios({
            url:'/posts/cities',
            params:"",
        }).then(res=>{
            console.log(res);
        })
    },
  },
};
</script>

<style lang="less" scoped>
.all{
    position: relative;
    .menus-w {
  border-top: 1px solid #ddd;
  width: 260px;
  position: relative;
  div:hover {
    border-right-color: #fff;
    color: orange;
    i {
      border-right: 1px solid orange;
      border-top: 1px solid orange;
    }
  }
  .menus {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    padding: 0 20px;
    font-size: 14px;
    position: relative;
    z-index: 2;

    i {
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

  .recommend {
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  .link{
      width: 100%;
  }
  
}
.showCity{
      height: 170px;
      width:350px;
      background: orange;
      position: absolute;
      top: 0px;
      left: 260px;
  }
}
</style>