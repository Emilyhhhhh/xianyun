
<template>
  <div class="container">
    <el-row>
      <!-- 右部分 -->
      <el-col :span="6" class="left">
        <asides></asides>
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
import asides from "@/components/post/asides";
export default {
  data() {
    return {
      newList: "",
    };
  },
  components: {
    searchtab,
    searchlist,
    asides,
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
.right {
  margin-left: 40px;
}
</style>