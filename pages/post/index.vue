
<template>
  <div class="container" title="旅游攻略模块首页文件">
    <el-row>
      <!-- 右部分 -->
      <el-col :span="6" class="left">
        <div class="left-up">
          <span>热门城市 </span>
          <span>推荐城市</span>
          <span>奔向城市</span>
          <span>主题推荐</span>
        </div>
        <!-- 右部分 下 推荐城市 -->
        <div class="left-below">
          <div class="left-below-1">推荐城市</div>
          <div>
            <a href="">
              <img src="images/pic_sea.jpeg" alt="" />
              2
            </a>
          </div>
        </div>
      </el-col>

      <!-- 左部分 -->
      <el-col :span="17" class="right">
        <!-- 输入框 -->
        <div class="right-frame">
          <searchtab @sendList="getList"></searchtab>
        </div>

        <!-- 推荐攻略    -->
        <div class="strategy">
          <searchlist :reList="newList"></searchlist>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import searchtab from "@/components/post/search";
import searchlist from "@/components/post/searchList";
export default {
  data() {
    return {
      newList: "",
    };
  },
  components: {
    searchtab,
    searchlist,
  },
  methods: {
    getList(data) {
      this.newList = data;
      console.log(this.newList, this.newList.length);
    },
  },
};
</script>

<style lang="less" scoped>
// 右部分
.left {
  background-color: rgba(102, 204, 255, 0.274);
}
// 右部分 上文框

.left-up {
  border: 1px solid #dddddd;
  > span {
    display: block;
    padding: 0 20px;
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid#dddddd;
  }
}

// 左部分
.right {
  margin: 0 20px;
}
</style>